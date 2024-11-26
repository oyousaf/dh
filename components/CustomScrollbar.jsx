import React from "react";
import { Scrollbar } from "react-scrollbars-custom";

const CustomScrollbar = ({ children }) => {
  return (
    <Scrollbar
      style={{ width: "100%", height: "100%" }}
      className="bg-gray rounded-md"
      trackYProps={{
        className: "bg-tan",
      }}
      thumbYProps={{
        className: "bg-beige rounded-full hover:bg-gray transition-colors duration-200",
      }}
    >
      {children}
    </Scrollbar>
  );
};

export default CustomScrollbar;
