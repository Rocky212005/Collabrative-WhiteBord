import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-[12vh] w-full bg-gray-500 flex items-center justify-between px-6">
      <h2 className="font-mono font-bold text-3xl">
        WhiteBoard
      </h2>

      <Link
        to="/login"
        className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Login
      </Link>
    </div>
  );
};

export default Navbar;