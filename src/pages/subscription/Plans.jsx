import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaUser, FaLeaf, FaSeedling, FaFan, FaTree, FaWater, FaSun, FaStar, FaGem } from 'react-icons/fa';

const plans = [
  { name: 'Free', price: 0, details: ['See posts from other users.', 'Cannot comment on posts.', 'Cannot create new posts.', 'Cannot like posts.'], icon: FaUser },
  { name: 'Sprout', price: 500, details: ['Connect with users in your local area.', 'Basic messaging features.', 'Limited to 5 new chats per day.'], icon: FaLeaf },
  { name: 'Seedling', price: 1000, details: ['Expand your reach to the entire state.', 'Send and receive photos.', '15 new chats per day.'], icon: FaSeedling },
  { name: 'Blossom', price: 2000, details: ['Nationwide connections.', 'Video call functionality.', '30 new chats per day.'], icon: FaFan },
  { name: 'Orchard', price: 5000, details: ['Connect with users worldwide.', 'Priority customer support.', 'Unlimited new chats.'], icon: FaTree },
  { name: 'Oasis', price: 10000, details: ['All Orchard features.', 'See who likes you.', 'Incognito mode.'], icon: FaWater },
  { name: 'Paradise', price: 20000, details: ['All Oasis features.', 'Message read receipts.', 'Profile boost once a week.'], icon: FaSun },
  { name: 'Utopia', price: 50000, details: ['All Paradise features.', 'Dedicated matchmaker.', 'Exclusive access to events.'], icon: FaStar },
  { name: 'Nirvana', price: 100000, details: ['All Utopia features.', 'Personalized styling and profile optimization.', 'Guaranteed matches.'], icon: FaGem },
];

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(plans[2]); // Default to Blossom

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] text-white z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-4 flex items-center flex-shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <FaArrowLeft className="text-white" />
        </button>
        <h1 className="text-xl font-bold ml-4">Subscription Plans</h1>
      </div>

      {/* Scrollable Body */}
      <div className="overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Details */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <selectedPlan.icon className="text-[var(--primary-cyan)] text-3xl" />
              <h2 className="text-3xl font-bold text-[var(--primary-cyan)]">{selectedPlan.name}</h2>
            </div>
            <p className="text-5xl font-bold mb-4">₦{selectedPlan.price.toLocaleString()}<span className="text-lg">/month</span></p>
            <ul className="space-y-3 mb-6">
              {selectedPlan.details.map((detail, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-400" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--accent-pink)] text-white font-bold py-3 px-6 rounded-full hover:opacity-80 transition-all duration-300">
              Subscribe to {selectedPlan.name}
            </button>
          </div>

          {/* Plan List */}
          <div className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                onClick={() => setSelectedPlan(plan)}
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 cursor-pointer transition-all duration-300 flex items-center space-x-4 ${
                  selectedPlan.name === plan.name ? 'border-[var(--primary-cyan)] ring-2 ring-[var(--primary-cyan)]' : 'hover:border-white/50'
                }`}>
                <plan.icon className="text-[var(--accent-pink)] text-2xl" />
                <div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-2xl font-bold">₦{plan.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
