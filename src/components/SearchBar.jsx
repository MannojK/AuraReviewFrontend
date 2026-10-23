import React from "react";
export default function SearchBar({ label, placeholder, value, handleSearch }) {
  return (
   <input
  type="text"
  placeholder="Find Anything"
  value={value}
  onChange={(event) => handleSearch(event.target.value)}
  className="
    w-full
    h-10 sm:h-12
    px-4 py-1.5
    border-2 border-orange-500
    rounded-full
    text-left
    text-sm sm:text-base
    text-blue-200 dark:text-black
    bg-transparent
    focus:outline-none
    focus:ring-2 focus:ring-orange-400
    box-border
  "
/>
  ); }

// export default function SearchBar() {
//   return (
//     <div className="w-full max-w-md mx-auto">
//       <input
//         type="text"
//         placeholder="Search..."
//   className="text-blue-500 placeholder-red-500/70 bg-transparent border border-amber-500 p-2 rounded" 
//       />
//     </div>
//   );
// }

