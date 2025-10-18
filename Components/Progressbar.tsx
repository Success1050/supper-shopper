import React from "react";

const Progressbar = ({ width = 0 }: { width?: number }) => {
  return (
    <div className="mt-4 mb-4">
      <div className="bg-[#FFFFFF26] rounded-full h-2 w-full">
        <div
          className="bg-[#1d65ef] h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(Math.max(width * 7.69, 0), 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progressbar;
