require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required and must be a string' });
  }

  let response = getRuleBasedResponse(query);

  if (response.includes('I’m not sure')) {
    response = await getAIResponse(query);
  }
  console.log(response);

  res.json({ reply: response });
});

function getRuleBasedResponse(query) {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('buy stocks') || lowerQuery.includes('how to buy stock')) {
    return 'To buy stocks: 1) Open a demat account with a broker like StockUpna. 2) Fund your account. 3) Search for a stock, select quantity, and place a buy order. Want tips on choosing stocks?';
  } else if (lowerQuery.includes('mutual funds') || lowerQuery.includes('what are mutual funds')) {
    return 'Mutual funds pool money from investors to buy a diversified portfolio of stocks, bonds, or other assets. They’re managed by professionals and great for beginners. Interested in types of mutual funds?';
  } else if (lowerQuery.includes('investing') || lowerQuery.includes('start investing')) {
    return 'Start investing by setting goals, learning basics, and opening a demat account. Begin with small amounts in mutual funds or blue-chip stocks. Need a beginner’s guide?';
  } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
    return 'Hi, I hope you have a good day, tell me what you want to know';
  } else {
    return 'I’m not sure about that. Try asking about stocks, mutual funds, or investing basics!';
  }
}
console.log(process.env.GOOGLE_API_KEY);

async function getAIResponse(query) {
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: query }],
            role: "user"
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || 'Sorry, no response from StockUpna. Try again!';
  } catch (error) {
    console.error('StockUpna API Error:', error.message, error.response?.data);
    return 'Sorry, I couldn’t process that. Try again!';
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
