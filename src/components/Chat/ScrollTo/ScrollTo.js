import React, { useRef, useEffect } from "react";

const ScrollTo = () => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return <div ref={divRef} />;
};

export default ScrollTo;
