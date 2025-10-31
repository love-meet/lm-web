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
        <NestedSection title="1. Eligibility & Account Security">
          <p>
            You must be at least 18 years of age to create an account and use Love Meet. By using our service, you represent and warrant that you have the right, authority, and capacity to enter into this Agreement and to abide by all of its terms and conditions. You are responsible for maintaining the confidentiality of your login credentials.
          </p>
        </NestedSection>
        <NestedSection title="2. User Conduct & Responsibilities">
          <p>
            You agree not to post or share content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, hateful, or racially, ethnically, or otherwise objectionable. You are solely responsible for your interactions with other users.
          </p>
        </NestedSection>
        <NestedSection title="3. Content Ownership and License">
          <p>
            You retain all ownership rights to the content you post on Love Meet. However, by posting content, you grant Love Meet a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the content in connection with the service.
          </p>
        </NestedSection>
        <NestedSection title="4. Payments & Subscriptions">
          <p>
            Certain features of the app may require payment. All payments are final and non-refundable, except as required by applicable law. We reserve the right to change our pricing with reasonable notice.
          </p>
        </NestedSection>
        <NestedSection title="5. Termination of Service">
          <p>
            We may suspend or terminate your account without notice if you violate these Terms or our Community Guidelines. You may delete your account at any time through the app's settings.
          </p>
        </NestedSection>
        <NestedSection title="6. Limitation of Liability">
          <p>
            Love Meet is provided "as is," and we make no guarantees that it will always be safe, secure, or error-free. We are not liable for any lost profits, revenues, information, or data, or consequential, special, indirect, exemplary, punitive, or incidental damages arising out of or related to these Terms or the Love Meet products.
          </p>
        </NestedSection>
      </MainSection>

      <MainSection title="Community & Safety Guidelines">
        <div className="space-y-4">
          <p>
            <strong>Be Respectful:</strong> Treat everyone with kindness. Harassment, bullying, hate speech, and any form of discrimination are strictly prohibited and will result in immediate account termination.
          </p>
          <p>
            <strong>Be Authentic:</strong> Your profile should be a true representation of you. Do not impersonate others or create fake profiles.
          </p>
          <p>
            <strong>Prohibited Content:</strong> Do not post or share content that is sexually explicit, graphically violent, or promotes illegal activities. This includes nudity, pornography, and hate speech.
          </p>
          <p>
            <strong>No Commercial Activity:</strong> Do not use Love Meet for spam, scams, or any form of commercial solicitation.
          </p>
          <p>
            <strong>Report Violations:</strong> Use our in-app reporting tools to flag any user or content that violates these guidelines. Our moderation team will review all reports and take appropriate action.
          </p>
        </div>
      </MainSection>

      <MainSection title="Child Safety & Content Moderation Policy">
        <NestedSection title="Zero-Tolerance Policy on Child Sexual Abuse and Exploitation (CSAE)">
          <p>
            Love Meet has an absolute zero-tolerance policy for any content that depicts, promotes, or facilitates Child Sexual Abuse and Exploitation (CSAE), including Child Sexual Abuse Material (CSAM). Our platform is strictly for adults (18+), and the safety of children is our highest priority.
          </p>
        </NestedSection>
        <NestedSection title="Reporting and Enforcement">
          <p>
            We utilize a combination of automated detection tools and human moderation to proactively identify and remove prohibited content. We urge our users to immediately report any suspected CSAE content or predatory behavior using our in-app reporting tools.
          </p>
          <p>
            Upon identifying a credible report or detecting such content, we will take swift and decisive action, which includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Immediate removal of the offending content.</li>
            <li>Permanent termination of the responsible user's account.</li>
            <li>Reporting the content and associated user information to law enforcement authorities, including the National Center for Missing & Exploited Children (NCMEC), as required by law.</li>
          </ul>
        </NestedSection>
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
            lovemeet.global@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}