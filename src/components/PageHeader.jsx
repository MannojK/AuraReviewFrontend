import React from "react";

export default function PageHeader() {
  return (
    <>
       <header className="bg-[#0E1113]">
        <div className="flex justify-between  p-2  border-green-600 ">
          <div className="text-white  justify-items font-bold p-2 text-4xl text-center">
            AuraReview
          </div>
          {/* <div class="text-white font-bold p-2 text-3xl text-center">01</div> */}
          <div className="flex justify-center p-2">
            <SearchBar />
          </div>
          {/* for the end of buttons  */}
          <div className="text-white justify-items-end flex flex-row font-bold px-2 text-3xl text-center">
            
            <div className="text-white justify-items-end font-bold p-2 pl-6 text-3xl text-center">
             <button
            className="flex items-center justify-center mx-3 w-8 h-8 rounded-full border border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faMoon : faSun}
              className="w-4 h-4 dark:text-light text-primary"
            />
          </button>
            </div>
            <div className="text-white justify-items-end font-bold p-2 pl-6 text-3xl text-center">
              <a href="/" className="link">
                <FontAwesomeIcon icon={faMessage}/>
                <span className="brand-title"></span>
              </a>
            </div>
            <div className="text-white justify-items-end font-bold p-2 pl-6 text-3xl text-center">
              <a href="/" className="link">
                <FontAwesomeIcon icon={faCalendarPlus} />
                <span className="brand-title"></span>
              </a>
            </div>
            <div className="text-white justify-items-end font-bold p-2 pl-6 text-3xl text-center">
              <a href="/" className="link">
                <FontAwesomeIcon icon={faBell}  />
                <span className="brand-title"></span>
              </a>
            </div>
            <div className="text-white justify-items-end font-bold p-2 pl-6 text-3xl text-center">
              <img
                class="inline-block size-8 rounded-full"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="Avatar"
              />
            </div>
          </div>
        </div>

        <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <hr className="border-gray-800 dark:border-white" />
      </header>
        </>

  );
}
