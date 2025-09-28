import React, { createContext, useContext, useState } from "react";

type SettingsContextType = {
  ttsEnabled: boolean;
  toggleTts: () => void;
  language: "en-US" | "sv-SE";
  setLanguage: (lang: "en-US" | "sv-SE") => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [language, setLanguage] = useState<"en-US" | "sv-SE">("en-US");

  const toggleTts = () => setTtsEnabled((prev) => !prev);

  return (
    <SettingsContext.Provider
      value={{ ttsEnabled, toggleTts, language, setLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used inside SettingsProvider");
  return context;
};
