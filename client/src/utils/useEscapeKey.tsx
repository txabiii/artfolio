import { useState, useEffect } from "react";

export default function useEscapeKey(callback: any): void {
  useEffect(()=>{
    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === 'Escape') {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [callback]) 
}