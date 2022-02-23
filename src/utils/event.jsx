import { useState, useEffect, useCallback } from 'react';

export const OnLongPress = (callback = () => {}, endCallback = () => {}, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);


  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown:  () => setStartLongPress(true),
    onMouseUp:    stop,
    onMouseLeave: stop,
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd:   stop,
  };
}