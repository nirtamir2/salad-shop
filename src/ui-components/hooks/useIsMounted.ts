import React from "react";

function useIsMounted() {
  const isMountedRef = React.useRef(true);
  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef.current;
}

export default useIsMounted;
