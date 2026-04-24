import { useEffect, useState } from "react";
import Cards from "./Cards"
import Button from './Button'

export default function Home() {

  return (
    <>
    <p style={{fontSize:40, padding:'10px',}}>Welcome Back,Admin <br /> Here's your school performance overview</p>
    <Cards/>
    <Button/>
    
    </>
  );
}