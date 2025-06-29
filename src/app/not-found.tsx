'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  ArrowLeft, 
} from 'lucide-react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float-${i % 3 + 1}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {floatingElements}
        
        {/* Gradient Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* 404 Number with Glitch Effect */}
          <div className="relative mb-8">
            <h1 className="text-8xl mt-25 md:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] font-black text-purple-500/20 animate-glitch">
              404
            </div>
            <div className="absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] font-black text-pink-500/20 animate-glitch-2">
              404
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-12 space-y-4">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up">
              Oops! Page Not Found!
            </h2>
            <p className="text-lg md:text-xl text-purple-200 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              The social media content you are looking for seems to have vanished into the digital void. 
              Lets get you back to downloading and extracting!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Link
              href="/"
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              <Home size={20} />
              <span>Back to Home</span>
              <div className="w-0 group-hover:w-2 h-2 bg-white rounded-full transition-all duration-300" />
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="group cursor-pointer flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles for Advanced Animations */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        @keyframes glitch {
          0%, 98%, 100% { transform: translate(0); }
          2% { transform: translate(2px, 0); }
          4% { transform: translate(-2px, 0); }
          6% { transform: translate(0, 2px); }
          8% { transform: translate(0, -2px); }
        }
        @keyframes glitch-2 {
          0%, 96%, 100% { transform: translate(0); }
          4% { transform: translate(-2px, 0); }
          8% { transform: translate(2px, 0); }
          12% { transform: translate(0, -2px); }
          16% { transform: translate(0, 2px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
        .animate-glitch { animation: glitch 2s ease-in-out infinite; }
        .animate-glitch-2 { animation: glitch-2 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}