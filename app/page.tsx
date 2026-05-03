"use client";

import { useState, useEffect, useRef } from "react";

type Stage = "START" | "LETTER" | "CELEBRATION";

export default function Home() {
  const [stage, setStage] = useState<Stage>("START");
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [reasonIndex, setReasonIndex] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string; delay: string }[]>([]);

  const reasons = [
    "เค้ารักเธอที่สุดเลยตูด✨",
    "เรียนจบไปด้วยกันน้าาาา วุ้นหิๆ😊",
    "อยากกินข้าวกับเธอทุกมื้อเลยยยย🍀",
    "รักนะเจ้าหมูโลกันต์❤️",
    
  ];

  // Initialize floating hearts background
  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * (30 - 10) + 10}px`,
      duration: `${Math.random() * (15 - 5) + 5}s`,
      delay: `${Math.random() * 10}s`,
    }));
    setHearts(newHearts);
  }, []);

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100; // Move up to 100px in either direction
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  const nextReason = () => {
    setReasonIndex((prev) => (prev + 1) % reasons.length);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Floating Hearts */}
      <div className="heart-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              fontSize: heart.size,
              animationDuration: heart.duration,
              animationDelay: heart.delay,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="z-10 w-full max-w-lg">
        {stage === "START" && (
          <div className="flex flex-col items-center animate-fade-in">
            <h1 className="text-3xl font-bold mb-12 text-center">A message for Voon...</h1>
            <div 
              onClick={() => setStage("LETTER")}
              className="cursor-pointer animate-pulse-slow hover:scale-110 transition-transform"
            >
              <div className="text-9xl mb-4">🎁</div>
              <p className="text-center font-medium opacity-70">Click to open</p>
            </div>
          </div>
        )}

        {stage === "LETTER" && (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-4 border-primary animate-pop-in flex flex-col items-center">
            <h1 className="text-4xl font-bold text-primary mb-6 text-center">I love you, Voon! ❤️</h1>
            
            <div className="min-h-[100px] flex items-center justify-center text-center mb-8">
              <p className="text-xl italic transition-all duration-500 animate-fade-in">
                "{reasons[reasonIndex]}"
              </p>
            </div>

            <button 
              onClick={nextReason}
              className="text-sm underline mb-10 opacity-60 hover:opacity-100 transition-opacity"
            >
              Click for another reason
            </button>

            <div className="w-full h-px bg-pink-200 mb-8" />

            <h2 className="text-2xl font-semibold mb-8 text-center">Do you love me too?</h2>

            <div className="flex gap-6 relative items-center justify-center w-full min-h-[60px]">
              <button
                onClick={() => setStage("CELEBRATION")}
                className="btn-primary"
              >
                Yes!
              </button>
              
              <button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                style={{
                  transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                  transition: 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                className="btn-secondary"
              >
                No
              </button>
            </div>
          </div>
        )}

        {stage === "CELEBRATION" && (
          <div className="flex flex-col items-center text-center animate-pop-in">
            <img src="https://slcryflqycqxevgvxkjj.supabase.co/storage/v1/object/public/photo_product/684097409_1265728435706383_8801010328084287223_n.jpg" alt="Celebration" className="w-full max-w-md rounded-2xl shadow-lg mb-6" />
            <h1 className="text-5xl font-bold text-primary mb-4">รักนะตูด</h1>
            <p className="text-2xl font-medium mb-12">
              น่ารักวะVoon! ❤️
            </p>
            <div className="flex gap-4">
              <span className="text-4xl animate-bounce">💖</span>
              <span className="text-4xl animate-bounce" style={{ animationDelay: '0.1s' }}>✨</span>
              <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌸</span>
            </div>
            
            {/* Extra confetti effect */}
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0">
               {Array.from({ length: 50 }).map((_, i) => (
                 <div 
                   key={i} 
                   className="absolute text-2xl animate-pulse"
                   style={{
                     left: `${Math.random() * 50}%`,
                     top: `${Math.random() * 1000}%`,
                     opacity: Math.random(),
                     animationDelay: `${Math.random() * 2}s`
                   }}
                 >
                   ❤️
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
