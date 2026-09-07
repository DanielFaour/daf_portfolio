import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal${visible ? " is-visible" : ""} ${className}`}>{children}</div>;
}
