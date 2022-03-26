import { useEffect, useRef } from "react";

const useScript = (src: string, ref:any) => {
  const dom = ref
  const scriptLoad = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = src
    document.head.appendChild(script);
  };
  useEffect(() => {
    let observer: any;
    const { current } = dom;
    if (current) {
      observer = new IntersectionObserver(scriptLoad, { threshold: 0.3 });
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, []);


};

export default useScript;
