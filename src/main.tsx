import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Loading from "./components/Loding.tsx";
import SetUploadHelp from "./pages/setUploadHelp.tsx";

// Service Worker Registrierung für PWA-Funktionalität

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("Service Worker registriert", reg.active))
      .catch((err) => console.log("Service Worker Fehler:", err));
  });
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/how-to-upload-word-sets" element={<SetUploadHelp />} />
      </Routes>
    </Suspense>
  </BrowserRouter>,
);
