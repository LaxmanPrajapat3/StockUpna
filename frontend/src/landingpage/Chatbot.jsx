
// src/components/Chatbot.jsx
import { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi! I’m Stockupna’s Smart Investment Assistant. Ask me about stocks, mutual funds, or investing!', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // ⬅️ New state to track loading

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    setIsLoading(true); // Disable send button

    const botResponse = await getBotResponse(input);

    setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
    setInput('');
    setIsLoading(false); // Re-enable send button
  };

  const getBotResponse = async (query) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      return data.reply;
    } catch (error) {
      return 'Sorry, something went wrong. Try again!';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 cursor-pointer"
        >
          <FaRobot size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-teal-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Smart Investment Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === 'user' ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about investing..."
                className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                disabled={isLoading} // Disable input while loading
              />
              <button
                type="submit"
                className={`px-4 py-2 rounded-r-md text-white ${
                  isLoading ? 'bg-teal-300 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'
                }`}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? '...' : 'Send'} {/* Show loading dots */}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
