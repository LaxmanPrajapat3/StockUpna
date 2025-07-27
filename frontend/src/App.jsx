import HomePage from './landingpage/Home/HomePage'
import './App.css'
import { useRef } from 'react'

function App({scrollTargets}) {
  

  return (    <HomePage scrollTargets={scrollTargets}></HomePage>)
}

export default App
