import { useEffect, useState } from "react";
import Cards from "./Cards"
import Button from './Button'

export default function Home() {
  const[time ,settime] = useState(new Date());
  useEffect(()=>{
    const interval = setInterval(()=>{
      settime(new Date());
    },1000);
    return () => clearInterval(interval);
  },[])

  return (
    <>
    <p style={{fontSize:40, padding:'10px',}}>Welcome Back,Admin <br /> Here's your school performance overview</p>
     <p style={{ fontSize: 20,}}>
        {time.toLocaleDateString()} |{" "}
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
    <Cards/>
    <Button/>
    
    </>
  );
}