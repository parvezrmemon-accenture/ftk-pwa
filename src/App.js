import React, { useEffect, useState } from "react";
import OneSignal from "react-onesignal";
import "./App.css";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    // Initialize OneSignal
    async function initOneSignal() {
      await OneSignal.init({
        appId: "ab2ad7f3-98b3-4437-90a5-4404e36b253d",
        safari_web_id:
          "web.onesignal.auto.2b30b273-8f48-4327-8bae-bed77c33071b",
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: true,
        },
      });

      const isPushEnabled = await OneSignal.isPushNotificationsEnabled();
      if (!isPushEnabled) {
        await OneSignal.showSlidedownPrompt();
      }
    }

    initOneSignal().catch(console.error);

    // Capture install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallBtn(false);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React PWA with OneSignal</h1>
        <p>Install and enable notifications for full experience.</p>

        {showInstallBtn && (
          <button onClick={handleInstallClick}>Install App</button>
        )}
      </header>
    </div>
  );
}

export default App;
