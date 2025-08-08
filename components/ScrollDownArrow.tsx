import React from 'react';

const ScrollDownArrow: React.FC = () => {
  return (
    <div
      className="absolute bottom-4 -translate-x-1/2 md:hidden animate-bounce z-20 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="w-10 h-10 text-[var(--color-gold)] drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
  );
};

export default ScrollDownArrow;
