import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Logo */}
        <div className="absolute top-6 left-6 z-20">
          <img 
            src="/assets/lm-logo.png" 
            alt="Love Meet Logo" 
            className="h-5 md:h-6 w-19 md:w-24 animate-logoGlow"
          />
        </div>
        {/* Animated Background - Visible on all screens */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] z-0">
 
          
          {/* Animated Love Icons - All screens */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={`love-${i}`}
                className="absolute text-[var(--accent-pink)] opacity-40"
                style={{
                  left: `${Math.random() * 95}%`,
                  top: `${Math.random() * 95}%`,
                  fontSize: `${10 + Math.random() * 6}px`,
                  animation: `float ${4 + Math.random() * 3}s infinite ${Math.random() * 4}s`,
                  filter: 'drop-shadow(0 0 4px rgba(236, 72, 153, 0.5))'
                }}
              >
                💖
              </div>
            ))}
            
            {/* Additional heart variants */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`heart-${i}`}
                className="absolute opacity-30"
                style={{
                  left: `${Math.random() * 95}%`,
                  top: `${Math.random() * 95}%`,
                  fontSize: `${8 + Math.random() * 4}px`,
                  animation: `floatParticles ${6 + Math.random() * 2}s infinite ${Math.random() * 3}s`,
                  color: 'var(--accent-pink)'
                }}
              >
                ♥
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden relative z-10 w-full h-screen">
          {/* Background Image for Mobile - Straight */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-5"
            style={{
              backgroundImage: "linear-gradient(rgba(15, 15, 35, 0.6), rgba(26, 26, 46, 0.6)), url('/assets/they_should_be_looking_at_each_other_11zon.jpeg')"
            }}
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center z-10">
            <h1 className="text-4xl font-bold mb-6 text-gradient-primary">
              Find Your <span className="text-gradient-accent">Soulmate</span>
            </h1>
            <p className="text-lg mb-8 text-[var(--text-secondary)] max-w-md leading-relaxed">
              Where hearts connect, love grows, and forever begins. Join thousands finding their perfect match.
            </p>
            <button onClick={()=> navigate("/feeds")} className="button-primary text-lg px-8 py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300">
              Find Your Match
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex relative z-10 w-full max-w-7xl mx-auto px-8">
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center pr-12">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Find Your <br />
              <span className="text-gradient-accent">Soulmate</span>
            </h1>
            <p className="text-xl mb-8 text-[var(--text-secondary)] max-w-lg leading-relaxed">
              Where hearts connect, love grows, and forever begins. Join thousands of people finding their perfect match in our vibrant community.
            </p>
            <div className="flex gap-4">
              <button onClick={()=> navigate("/feeds")} className="button-primary text-lg px-10 py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300">
                Find Your Match
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative group cursor-pointer">
              <img 
                src="/assets/they_should_be_looking_at_each_other_11zon.jpeg"
                alt="Couple looking at each other"
                className="w-96 h-96 lg:w-[500px] lg:h-[500px] object-cover rounded-3xl shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:rotate-0"
                style={{
                  transform: 'rotate(-3deg)',
                  filter: 'drop-shadow(0 0 20px rgba(37, 99, 235, 0.3))'
                }}
              />
              <div className="absolute  bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-purple)] to-[var(--accent-pink)] rounded-3xl opacity-20 blur-xl animate-pulse group-hover:opacity-40 transition-opacity duration-500" />


              {/* <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[var(--primary-cyan)] via-transparent to-[var(--accent-pink)] opacity-0 group-hover:opacity-20 transition-all duration-500" /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
