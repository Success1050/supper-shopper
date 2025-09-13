import React from "react";

const Progressbar = ({ width }: { width?: number }) => {
  return (
    <div className="mt-4 mb-4">
      <div className="bg-[#FFFFFF26] rounded-full h-2">
        <div className={`bg-blue-500 h-2 rounded-full w-${width}`}></div>
      </div>
    </div>
  );
};

export default Progressbar;
