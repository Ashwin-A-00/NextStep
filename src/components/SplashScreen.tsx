import { useEffect, useState } from 'react';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1500); // Wait for 1.5s animation to complete
    }, 5000); // Show splash for 5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="splash-screen fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <div className="splash-logo-container relative">
        <img
          src="/logo.png"
          alt="NextStep AI"
          className="splash-logo h-40 w-auto"
        />
      </div>
    </div>
  );
}
