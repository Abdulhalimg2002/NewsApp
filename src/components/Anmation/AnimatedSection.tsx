import React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface IPropes{
children: ReactNode |ReactNode[];
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  stagger?: number; 


}
const directionMap = {
  up: "translate-y-10",
  down: "-translate-y-10",
  left: "translate-x-10",
  right: "-translate-x-10",
};
const AnimatedSection=({children,className,direction="up",stagger=0.2}:IPropes)=>{
      const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
    return(
      <div ref={ref} className={`flex flex-col gap-4 ${className}`}>
      {React.Children.map(children, (child, i) => (
        <div
          key={i}
          className={`transition-all duration-700 ease-out opacity-0 ${
            isVisible ? "opacity-100 translate-y-0 translate-x-0" : directionMap[direction]
          }`}
          style={{ transitionDelay: `${i * stagger}s` }}
        >
          {child}
        </div>
      ))}
    </div>
    )
}
export default AnimatedSection;