import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: any;
  id?: string;
}

export default function Container({
  children,
  className = "",
  as: Component = "div",
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={`mx-auto w-full max-w-[1200px] px-6 ${className}`.trim()}
    >
      {children}
    </Component>
  );
}

