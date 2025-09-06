import React, { useState } from "react";

// Reusable Accordion Item component
const AccordionItem = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left font-semibold text-gray-200 hover:text-pink-400 transition-colors"
      >
        <h2 className="text-xl">{title}</h2>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${
            isOpen ? "rotate-180 text-pink-500" : "rotate-0 text-gray-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden pb-4 text-gray-400 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function Privacy() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-2xl text-white">
      <h1 className="text-4xl font-extrabold text-center mb-2">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ec4899, #f472b6, #8b5cf6)",
          }}
        >
          Privacy Policy
        </span>
      </h1>
      <p className="text-center text-gray-400 mb-8">Love Meet</p>

      <div className="space-y-4">
        <AccordionItem title="Information We Collect" defaultOpen={true}>
          <p>
            We collect information to provide and improve our services. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              **Information you provide:** This includes data you voluntarily submit, such as your name, email address, date of birth, profile details, photos, bios, and messages exchanged with other users.
            </li>
            <li>
              **Automatically collected information:** We automatically collect certain data when you use our app, including your device details (IP address, operating system, browser type) and usage data (your activity within the app, features used, and the pages you visit).
            </li>
          </ul>
        </AccordionItem>

        <AccordionItem title="How We Use Your Information">
          <p>
            The information we collect is used to operate, maintain, and enhance the Love Meet service. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              **Matchmaking and personalization:** To connect you with other users and to personalize your experience.
            </li>
            <li>
              **Communication:** To send you updates, security alerts, and important service announcements.
            </li>
            <li>
              **Fraud prevention:** To monitor and prevent fraudulent or malicious activity on our platform.
            </li>
          </ul>
        </AccordionItem>

        <AccordionItem title="Your Rights">
          <p>
            You have control over your information. You can:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              **Update or delete your account:** You can modify your profile information or delete your account at any time through the app settings.
            </li>
            <li>
              **Opt out of marketing:** You can opt out of receiving promotional emails or messages from us.
            </li>
            <li>
              **Request data deletion:** You have the right to request a complete deletion of your data by contacting our support team.
            </li>
          </ul>
        </AccordionItem>

        <p className="text-sm mt-8 text-center text-gray-500">
          This policy may be updated periodically. Your continued use of the app constitutes acceptance of any changes.
        </p>
      </div>
    </div>
  );
}