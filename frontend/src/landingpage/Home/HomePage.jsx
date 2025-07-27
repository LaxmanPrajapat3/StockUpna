import { useRef } from "react";
import Hero from "./Hero";
import Features from "./Features";
import About from "./About";

export default function HomePage({scrollTargets}){
    const featuresRef=useRef(null);
    const aboutRef=useRef(null);
    if(scrollTargets){
        scrollTargets.features=featuresRef;
        scrollTargets.about=aboutRef;
    }
    return(
        <>
        
        
      
        <Hero/>
        <div ref={featuresRef} className="scroll-mt-16">


        <Features/>
        </div>
       <div ref={aboutRef} className="scroll-mt-16">

        <About/>
            
        </div>
      
        </>
    )
}