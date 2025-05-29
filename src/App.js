import React, { useEffect } from "react";
import OneSignal from "react-onesignal";

function App() {
  useEffect(() => {
    // Initialize OneSignal
    OneSignal.init({
      appId: "YOUR-ONESIGNAL-APP-ID", // Replace with your actual App ID
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: true, // Optional: Show the OneSignal bell UI
      },
    });

    // OPTIONAL: Show the slidedown push prompt manually
    window.OneSignal.push(() => {
      window.OneSignal.Slidedown.promptPush();
    });
  }, []);

  return (
    <div className="App">
      <h1>React PWA with OneSignal</h1>
      <p>Welcome! Push notifications are almost ready.</p>
    </div>
  );
}

export default App;
