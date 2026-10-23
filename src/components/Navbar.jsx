import React from "react";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMessage,
  faCalendarPlus,
  faSun,
  faMoon,
} from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };
  
    const handleReload = () => {
      window.location.reload();
    };
  

  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";
  return (
    <header className="bg-[ #030303] border-b border-gray-700 ">
      <div className="flex items-center justify-between px-4 py-2 mb-1">
        {/* LEFT - Logo */}
{/* 
        <button type="button" onClick={handleReload}>
          Reload Page
        </button> */}
        <Link to = "/home">
        {/* onClick={handleReload} */}
        <div className="text-white font-bold font-[Times-New-Roman] text-3xl dark:text-orange-400 hover:text-orange-400" >
          {/* Option A: Calling a function */}
          AuraReview
        </div>
        </Link>

        <div className="flex-1 min-w-0 flex justify-center mx-2 sm:mx-6">
          <div className="w-full max-w-xl">
            <SearchBar />
          </div>
        </div>

        {/* RIGHT - Icons + Avatar */}
        <div className="flex items-center gap-6 text-normalbg dark:text-black text-xl">
          {/* Dark Mode Button  */}
          <button
            className="flex items-center justify-center mx-2 w-8 h-8 rounded-full border border-transparent transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-800 focus:outline-none"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faMoon : faSun}
              className="w-4 h-4 text-black dark:text-white"
            />
          </button>
          {/* <FontAwesomeIcon
            icon={faMessage}
            className="cursor-pointer hover:text-orange-400 text-3xl "
          /> */}

          {/* <FontAwesomeIcon
            icon={faCalendarPlus}
            className="cursor-pointer hover:text-orange-400 text-3xl "
          /> */}
          {/* <Link to="/postdetail"> */}

          <Link to="/notificationsPage">
            <FontAwesomeIcon
              icon={faBell}
              className="cursor-pointer hover:text-orange-400 text-3xl"
            />
          </Link>
          <Link to="/profilepage">
            <img
              className="w-11 h-11 rounded-full"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
              alt="Avatar"
              width={550}
              height={550}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
