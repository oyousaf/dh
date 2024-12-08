"use client";

import React from "react";
import Snowfall from "react-snowfall";

const Snow = () => {
  const isDecember = new Date().getMonth() === 11;

  if (!isDecember) return null;

  return <Snowfall style={{ position: "fixed", zIndex: 40 }} />;
};

export default Snow;
