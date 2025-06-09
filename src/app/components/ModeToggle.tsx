'use client'
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import './styles/ModeToggle.css';
import { useState } from "react";

export const ModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isRotating, setIsRotating] = useState(false);

  const toggleClicked = () => {
    setIsRotating(true);
    setTimeout(() => {
      toggleTheme();
      setIsRotating(false);
    }, 600);
  };

  return (
    <div onClick={toggleClicked} className='iconContainer'>
      {theme === "light" ? (
        <Moon
          className={`icon ${isRotating ? 'rotate' : 'noRotate'}`}
        />
      ) : (
        <Sun
          className={`icon ${isRotating ? 'rotate' : 'noRotate'}`}
        />
      )}
    </div>
  );
};
