import React, { useState, useEffect } from "react";
import "../styles/upButton.scss";

const UpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={`up-button ${isVisible ? "visible" : "hidden"}`}
      onClick={scrollToTop}
    >
      Up
    </button>
  );
};

export default UpButton;
