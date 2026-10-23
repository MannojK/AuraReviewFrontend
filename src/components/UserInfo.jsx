import React from "react";

const UserInfo = ({ name, username, email }) => {
  const initials = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className="bg-neutral-900 p-8 rounded-2xl border border-orange-500/50 flex flex-col sm:flex-row items-center gap-6 shadow-lg shadow-orange-900/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>

      <div className="w-28 h-28 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-4xl font-black text-black shadow-md border-4 border-black z-10">
        {initials}
      </div>

      <div className="text-center sm:text-left z-10 flex-1">
        <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">
          {name}
        </h1>
        <p className="text-orange-500 font-semibold mb-2">@{username}</p>
        <p className="text-gray-400 text-sm bg-black/40 inline-block px-3 py-1 rounded-md">
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;