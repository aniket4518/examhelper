"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
 
  handelonclick?: any
}

export const Button = ({ children, className,handelonclick  }: ButtonProps) => {
  
  return (
    <button
  
      className={className}
      onClick={handelonclick}
    >
      {children}
    </button>
  );
};
