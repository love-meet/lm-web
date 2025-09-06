import React, { useState } from "react";

// Component for the main sections (e.g., "Terms & Conditions")
const MainSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-700 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-white text-left text-2xl font-semibold focus:outline-none"
      >
        <span>{title}</span>
        <svg
          className={`w-6 h-6 transition-transform transform ${
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
        <div className="overflow-hidden mt-4 text-gray-300 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// Component for nested points within a section
const NestedSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pl-4 border-l-2 border-pink-500">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-pink-300 text-left text-lg font-medium focus:outline-none"
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transition-transform transform ${
            isOpen ? "rotate-180 text-pink-400" : "rotate-0 text-gray-500"
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
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden mt-2 text-gray-400 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function Terms() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white bg-gray-900 rounded-lg shadow-xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ec4899, #f472b6, #8b5cf6)",
          }}
        >
          Love Meet
        </span>{" "}
        – Legal & Community Guidelines
      </h1>

      <MainSection title="Terms & Conditions">
        <NestedSection title=" Eligibility">
          <p>
            You must be 18 years or older to use Love Meet. You agree that the
            information you provide is accurate and up to date. You are
            responsible for maintaining the confidentiality of your account.
          </p>
        </NestedSection>
        <NestedSection title=" User Responsibilities">
          <p>
            Do not post or share offensive, harmful, or illegal content. Respect
            other users; no harassment, impersonation, or discrimination. Do not
            use Love Meet for spam, scams, or commercial purposes. You are
            solely responsible for your interactions with other users.
          </p>
        </NestedSection>
        <NestedSection title=" Content Ownership">
          <p>
            You retain ownership of any content you post. By posting, you grant
            Love Meet a limited, non-exclusive license to use and display your
            content within the app. We may remove content that violates these
            Terms.
          </p>
        </NestedSection>
        <NestedSection title=" Payments & Subscriptions">
          <p>
            Some features may require payment. All payments are non-refundable
            unless required by law. Love Meet reserves the right to update
            pricing with notice.
          </p>
        </NestedSection>
        <NestedSection title="Termination">
          <p>
            Love Meet may suspend or terminate accounts that violate these
            Terms. You may delete your account at any time via your settings.
          </p>
        </NestedSection>
        <NestedSection title=" Limitation of Liability">
          <p>
            Love Meet is provided on an "as-is" basis. We are not responsible
            for any damages, losses, or disputes arising from the use of the
            app.
          </p>
        </NestedSection>
      </MainSection>

      <MainSection title="Community Guidelines">
        <div className="space-y-4">
          <p>
            <strong> Be Respectful</strong>
            <br />
            Treat everyone with kindness. Harassment, bullying, threats, or hate
            speech will not be tolerated.
          </p>
          <p>
            <strong> Be Honest</strong>
            <br />
            Use your real identity and provide accurate details. Fake profiles
            and impersonation are prohibited.
          </p>
          <p>
            <strong> Keep It Safe</strong>
            <br />
            Do not share sensitive personal or financial information with others.
            Never ask for or send money.
          </p>
          <p>
            <strong> Keep It Clean</strong>
            <br />
            Do not post or share nudity, pornography, or other offensive
            material. Illegal activities are strictly forbidden.
          </p>
          <p>
            <strong> 18+ Only</strong>
            <br />
            Love Meet is an adult-only platform. Accounts for users under 18
            will be removed.
          </p>
          <p>
            <strong> Report Issues</strong>
            <br />
            If you encounter any inappropriate behavior, please use the report
            feature. Our team will review and take appropriate action.
          </p>
        </div>
      </MainSection>

      <div className="mt-8 border-t border-gray-700 pt-6">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-300">
          If you have any questions about these guidelines or policies, please
          contact us at:
          <br />
          <a
            href="mailto:app.lovemeet@gmail.com"
            className="text-pink-400 hover:underline"
          >
            app.lovemeet@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}