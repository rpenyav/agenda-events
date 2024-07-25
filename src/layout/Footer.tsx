import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white mt-4 py-3">
      <div>
        <p className="mb-0 text-center">
          &copy; {new Date().getFullYear()} rafa@rafapenya.com.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
