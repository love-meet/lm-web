import React from 'react';
import {
  Favorite,
  People,
  TrendingUp,
  EmojiEvents,
  CardGiftcard,
  VideogameAsset,
  Star,
  Security,
  Public,
  Spa
} from '@mui/icons-material';
import { useSEO } from '../hooks/useSEO';

const features = [
  {
    icon: <People className="text-4xl" />,
    title: "Social Engagement",
    description: "Build a vibrant community through posts, likes, comments, and shares. Express yourself authentically and connect organically.",
    gradient: "from-[#ff6b9d] to-[#c44569]"
  },
  {
    icon: <TrendingUp className="text-4xl" />,
    title: "Tiered Connection System",
    description: "Unlock premium features and exclusive privileges through our seven-tier progression system. Experience deeper connections and special opportunities.",
    gradient: "from-[#4ecdc4] to-[#44a08d]"
  },
  {
    icon: <VideogameAsset className="text-4xl" />,
    title: "Love Games",
    description: "Break the ice with fun, interactive mini-games. Build chemistry and comfort through playful challenges and compatibility quizzes.",
    gradient: "from-[#ffeaa7] to-[#fab1a0]"
  },
  {
    icon: <CardGiftcard className="text-4xl" />,
    title: "Gifting System",
    description: "Express affection with virtual gifts, from hearts and flowers to premium animations. Turn digital interactions into meaningful experiences.",
    gradient: "from-[#a8e6cf] to-[#ffd3a5]"
  }
];

const stats = [
  { number: "10K+", label: "Active Users", icon: <People className="text-2xl" /> },
  { number: "50K+", label: "Connections Made", icon: <Favorite className="text-2xl" /> },
  { number: "95%", label: "User Satisfaction", icon: <Star className="text-2xl" /> },
  { number: "24/7", label: "Community Support", icon: <Security className="text-2xl" /> }
];

export default function AboutLoveMeet() {
  // SEO Configuration for About Love Meet Page
  useSEO({
    title: "About Love Meet | Redefining Modern Dating & Social Connections",
    description: "Discover Love Meet - where social media meets dating. Experience genuine connections through our innovative platform featuring social engagement, tiered connections, love games, and virtual gifting.",
    keywords: "About Love Meet, dating app, social dating platform, modern relationships, online connections, love games, virtual gifting, tiered dating system",
    canonical: "https://lovemeet.app/about",
    ogTitle: "About Love Meet | Where Social Meets Romantic",
    ogDescription: "Join Love Meet's vibrant community for meaningful connections, fun interactions, and genuine relationships in the digital age.",
    ogImage: "https://lovemeet.app/assets/lm-logo.png",
    ogUrl: "https://lovemeet.app/about"
  });

  return (
    <div className="bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-[#ff6b9d] to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-[#4ecdc4] to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#ffeaa7] to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#ff6b9d]/20 to-[#4ecdc4]/20 border border-[#ff6b9d]/30 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 bg-[#4ecdc4] rounded-full mr-3 animate-pulse"></span>
              <span className="text-[#ff6b9d] text-sm font-medium">About Love Meet</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-8">
              Redefining How People
              <span className="bg-gradient-to-r from-[#ff6b9d] via-[#4ecdc4] to-[#ffeaa7] bg-clip-text text-transparent"> Connect & Love</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#e2e8f0] max-w-4xl mx-auto leading-relaxed mb-12">
              Love Meet is more than just a dating app — it's a modern social platform designed to blend the dynamic energy of social media with the intimacy and focus of online dating.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:transform hover:scale-110 transition-all duration-300">
                  <div className="flex justify-center mb-2 text-[#4ecdc4]">
                    {stat.icon}
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-[#94a3b8] group-hover:text-[#e2e8f0] transition-colors duration-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Where <span className="bg-gradient-to-r from-[#ff6b9d] to-[#4ecdc4] bg-clip-text text-transparent">Social Meets Romantic</span>
            </h2>
            <p className="text-lg text-[#94a3b8] max-w-3xl mx-auto">
              In today's world, most dating apps focus only on matchmaking. Love Meet changes that narrative by integrating social engagement, gamified interaction, and emotional connection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Our Unique Approach</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b9d] to-[#c44569] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">💬</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Social Engagement</h4>
                    <p className="text-[#e2e8f0]">Transform dating into a dynamic community where users share moments, express themselves, and build genuine connections through organic interactions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#4ecdc4] to-[#44a08d] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">🎮</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Love Games</h4>
                    <p className="text-[#e2e8f0]">Make connecting fun and natural with icebreaker games that foster chemistry and comfort in a relaxed, enjoyable way.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#ffeaa7] to-[#fab1a0] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">🎁</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Emotional Gifting</h4>
                    <p className="text-[#e2e8f0]">Express feelings through meaningful virtual gifts that transform online interactions into personal, thoughtful experiences.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Why Love Meet Stands Out</h3>
              <ul className="space-y-3 text-[#e2e8f0]">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-[#4ecdc4] rounded-full"></span>
                  <span>Daily active engagement beyond just swiping</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-[#ff6b9d] rounded-full"></span>
                  <span>Gamified progression with meaningful rewards</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-[#ffeaa7] rounded-full"></span>
                  <span>Safe, inclusive community for all relationship types</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-[#a8e6cf] rounded-full"></span>
                  <span>Technology that brings people closer together</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Core <span className="bg-gradient-to-r from-[#ff6b9d] to-[#4ecdc4] bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-lg text-[#94a3b8] max-w-3xl mx-auto">
              Experience dating reimagined with features designed to create genuine connections and lasting relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-3xl p-8 backdrop-blur-sm border border-white/10 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 bg-gradient-to-br from-white/5 to-white/10"
              >
                <div className="relative">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {feature.icon}
                  </div>

                  <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.title}
                  </h3>

                  <p className="text-[#e2e8f0] leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-[#ff6b9d]/10 to-[#4ecdc4]/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-[#ff6b9d] to-[#4ecdc4] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-[#e2e8f0] leading-relaxed">
                To create a space where love feels alive, connections are genuine, and technology brings people closer instead of farther apart. We envision a future where dating apps nurture community, joy, and growth.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#4ecdc4]/10 to-[#ffeaa7]/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-[#4ecdc4] to-[#ffeaa7] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Growth & Innovation</h3>
              <p className="text-[#e2e8f0] leading-relaxed">
                Through subscription models, in-app purchases, and community-driven engagement, Love Meet creates a balanced ecosystem where users enjoy value while the platform sustains meaningful growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#ff6b9d]/10 via-[#4ecdc4]/10 to-[#ffeaa7]/10 rounded-3xl p-12 backdrop-blur-sm border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find Your Spark? ✨
            </h2>
            <p className="text-lg text-[#e2e8f0] mb-8 max-w-2xl mx-auto">
              Join Love Meet's thriving community where every connection has the potential to become something beautiful. Whether you're seeking romance, companionship, or genuine friendships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-[#ff6b9d] to-[#4ecdc4] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Download Love Meet
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-[#4ecdc4]/30 text-white font-semibold rounded-xl hover:bg-[#4ecdc4]/10 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}