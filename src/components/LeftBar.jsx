import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";


export default function LeftBar() {
  return (
    <div className=" dark:bg-normalbg">
      <ul>
        {/* <li className="p-2 m-0.5 mt-3 my-1.5">
          <FontAwesomeIcon icon={faHouse} /> <span className=" p-5">Home</span>
        </li> */}
        <li className="p-2 m-0.5 mt-3 my-1.5 text-white dark:text-black  hover:text-orange-400">
          <Link to="/home">
            <FontAwesomeIcon icon={faHouse} />
            <span className=" p-5">Home</span>
          </Link>
        </li>
        <li className="p-2 m-0.5 mt-3 my-1.5 text-white dark:text-black  hover:text-orange-400">
          <Link to="/popular">
            <FontAwesomeIcon icon={faFire} />
            <span className=" p-5">Popular</span>
          </Link>
        </li>
        {/* <li className="p-2 m-0.5 mt-3 my-1.5 text-white dark:text-black  hover:text-orange-400">
          <Link to="/news">
            <FontAwesomeIcon icon={faNewspaper} />
            <span className=" p-5">News</span>
          </Link>
        </li>
        <li className="p-2 m-0.5 mt-3 my-1.5 text-white dark:text-black  hover:text-orange-400">
          <Link to="/explore">
            <FontAwesomeIcon icon={faPlus} />
            <span className=" p-5">Explore</span>
          </Link>
        </li> */}
        <li className="p-2 m-0.5 mt-3 my-1.5 text-white dark:text-black  hover:text-orange-400">
          <Link to="/register">
            <FontAwesomeIcon icon={faUser} />
            <span className=" p-5">Register</span>
          </Link>
        </li>
        <li className="p-2 m-0.5 mt-3 my-1.5 text-white dark:text-black  hover:text-orange-400">
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} />
            <span className=" p-5">Login</span>
          </Link>
        </li>
        <li className="p-2 m-0.5 mt-3 my-1.5 text-white dark:text-black  hover:text-orange-400">
          <Link to="/createpost">
            <FontAwesomeIcon icon={faCompass} />
            <span className=" p-5">Start a Post</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

// <FontAwesomeIcon icon="fa-regular fa-house" />
// <FontAwesomeIcon icon="fa-brands fa-facebook" />
// <FontAwesomeIcon icon="fa-solid fa-fire" />
// <FontAwesomeIcon icon="fa-solid fa-newspaper" />
// <FontAwesomeIcon icon="fa-regular fa-compass" />
// <FontAwesomeIcon icon="fa-solid fa-plus" />
