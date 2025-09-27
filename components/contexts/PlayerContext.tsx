import React, { createContext, useContext, useState } from "react";

type PlayerContextType = {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  addPlayer: (name: string) => void;
  removePlayer: (index: number) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [players, setPlayers] = useState<string[]>([]);

  const addPlayer = (name: string) => {
    setPlayers((prev) => [...prev, name]);
  };

  const removePlayer = (index: number) => {
    setPlayers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <PlayerContext.Provider
      value={{ players, setPlayers, addPlayer, removePlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayers must be used within a PlayerProvider");
  }
  return context;
};
