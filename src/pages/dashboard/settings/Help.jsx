import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const helpCenterData = [
  {
    title: 'Account & Profile',
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'You can easily sign up on our website. Just provide a valid email or phone number and create your profile by adding photos, a bio, and preferences.'
      },
      {
        question: 'How do I edit my profile?',
        answer: 'Go to Profile > Edit Profile. From there, you can update your name, bio, photos, and preferences anytime.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'On the login screen, click "Forgot Password?". Enter your registered email, and we’ll send you a password reset link.'
      },
      {
        question: 'Can I change my profile photos?',
        answer: 'Yes. Go to Profile > Edit Profile > Photos. You can upload, remove, or rearrange your pictures.'
      },
      {
        question: 'How do I change my username or email?',
        answer: 'You can update your email address in your profile settings. For security reasons, we do not allow changes to your username.'
      },
      {
        question: 'How do I delete my account?',
        answer: 'You can permanently delete your account from the settings menu. Please note this action is irreversible.'
      },
      {
        question: 'Can I temporarily deactivate my account?',
        answer: 'Yes, you can hide your profile from public view in your account settings. Your information will be saved, but you will not be visible to other users.'
      }
    ]
  },
  {
    title: 'Connections & Messaging',
    questions: [
      {
        question: 'How do connections work?',
        answer: 'When you find a profile you are interested in, you can send them a direct message or a connection request. If they accept, you can begin chatting in the Messages section.'
      },
      {
        question: 'Why can’t I send a message?',
        answer: 'You can only message people you have connected with. If you are connected but can\'t chat, check your internet connection and clear your browser cache.'
      },
      {
        question: 'How do I disconnect from someone?',
        answer: 'Open the chat, tap the menu (⋮), and select Disconnect. They will no longer appear in your messages.'
      },
      {
        question: 'What are conversation starters?',
        answer: 'We provide optional prompts you can use to help you start a conversation if you\'re not sure what to say first.'
      },
      {
        question: 'Can I see who has viewed my profile?',
        answer: 'Yes, this is a feature of Love Meet Premium. Upgrade to Premium to unlock it.'
      },
      {
        question: 'Is there a video chat feature?',
        answer: 'Yes, we offer an in-app video chat feature. Once you are connected with a user, you can initiate a video call from the chat screen.'
      },
      {
        question: 'How do I block a user?',
        answer: 'You can block a user from their profile or a chat. This will prevent them from contacting you or seeing your profile.'
      }
    ]
  },
  {
    title: 'Safety & Privacy',
    questions: [
      {
        question: 'How do you ensure user safety?',
        answer: 'We actively monitor activity, use moderation tools, and allow users to report or block suspicious behavior to maintain a safe community.'
      },
      {
        question: 'How can I report a user?',
        answer: 'Go to their profile or chat, tap the menu (⋮), and select Report. Choose the reason and submit.'
      },
      {
        question: 'What is your privacy policy?',
        answer: 'You can view our full Privacy Policy in your account under Settings > Privacy or on our website.'
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we use encryption and advanced safety measures to protect your data. Please use caution when sharing sensitive details like your address or banking information.'
      },
      {
        question: 'What is your policy on data protection?',
        answer: 'We adhere to strict data protection standards to ensure your information is safe and is never shared with third parties without your explicit consent.'
      },
      {
        question: 'How do I handle harassment or inappropriate behavior?',
        answer: 'Please report any harassment immediately using the in-app reporting tools. We have a zero-tolerance policy for such behavior.'
      }
    ]
  },
  {
    title: 'Troubleshooting & Technical Issues',
    questions: [
      {
        question: 'The website is not loading properly. How do I fix it?',
        answer: 'Try clearing your browser’s cache and cookies, or use a different web browser. This often resolves most loading issues.'
      },
      {
        question: 'Why am I not receiving notifications?',
        answer: 'Check if notifications are enabled for our website in your browser settings. You must grant permission for us to send you notifications.'
      },
      {
        question: 'The website is running slow. What can I do?',
        answer: 'Clear your browser cache, close any unused tabs, or restart your browser. A slower internet connection can also affect performance.'
      },
      {
        question: 'Are there any system requirements?',
        answer: 'Our website works best on modern browsers such as Chrome, Firefox, Safari, and Edge. Please make sure your browser is up to date.'
      },
    ]
  },
  {
    title: 'Premium Subscription',
    questions: [
      {
        question: 'What benefits do I get with a Premium subscription?',
        answer: 'You get access to exclusive features like seeing who has viewed your profile, Super Likes, and more.'
      },
      {
        question: 'How do I subscribe to Premium?',
        answer: 'Go to Settings > Upgrade to Premium. Choose your plan and confirm payment details directly on the website.'
      },
      {
        question: 'How do I cancel my subscription?',
        answer: 'You can cancel your subscription from your account settings on our website. The cancellation will take effect at the end of your current billing period.'
      },
      {
        question: 'What is your refund policy?',
        answer: 'Payments are generally non-refundable unless required by law. If you believe you were charged by mistake, please contact us at app.lovemeet@gmail.com.'
      },
      {
        question: 'My subscription isn’t working. What should I do?',
        answer: 'Log out and log back in to refresh your account status. If it still doesn’t work, confirm your payment was successful and contact support.'
      },
      {
        question: 'What happens when my subscription expires?',
        answer: 'When your subscription expires, your account will revert to the free version. You will no longer have access to premium features, but your profile and connections will remain intact.'
      }
    ]
  }
];

export default function HelpCenter() {
  const [openSection, setOpenSection] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(helpCenterData);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(helpCenterData);
    } else {
      const results = helpCenterData.map(section => ({
        ...section,
        questions: section.questions.filter(item =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(section => section.questions.length > 0);
      setFilteredData(results);
    }
  }, [searchTerm]);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
    setOpenQuestion(null); // Close any open questions when a new section is toggled
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative">
      <Link to="/settings" className="absolute top-6 left-6">
        <motion.button
          className="text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={24} />
        </motion.button>
      </Link>

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 inline-block"
            >
              Help Center
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light mt-4">
            Find answers to our most frequently asked questions.
          </p>
        </header>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for a question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <main className="space-y-6">
          {filteredData.length > 0 ? (
            filteredData.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                className="bg-gray-900 rounded-xl shadow-lg border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              >
                <div
                  className="p-5 md:p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection(sectionIndex)}
                >
                  <h2 className="text-lg md:text-xl font-semibold text-white">
                    {section.title}
                  </h2>
                  <motion.div
                    initial={false}
                    animate={{ rotate: openSection === sectionIndex ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={24} className="text-gray-400" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openSection === sectionIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <div className="p-5 pt-0 md:p-6 md:pt-0">
                        <div className="space-y-4">
                          {section.questions.map((item, questionIndex) => (
                            <motion.div
                              key={questionIndex}
                              className="border-b border-gray-800 last:border-b-0"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: questionIndex * 0.05 }}
                            >
                              <div
                                className="p-4 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleQuestion(questionIndex)}
                              >
                                <h3 className="font-medium text-pink-400">{item.question}</h3>
                                <motion.div
                                  initial={false}
                                  animate={{ rotate: openQuestion === questionIndex ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ChevronDown size={20} className="text-gray-400" />
                                </motion.div>
                              </div>
                              <AnimatePresence>
                                {openQuestion === questionIndex && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                  >
                                    <p className="p-4 pt-0 text-sm text-gray-400 leading-relaxed">
                                      {item.answer}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">No results found.</p>
          )}
        </main>
      </div>
    </div>
  );
}