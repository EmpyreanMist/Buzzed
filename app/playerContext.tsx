import React, { createContext, ReactNode, useContext, useState } from "react";

type PlayerContextType = {
  players: string[];
  setPlayers: (players: string[]) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<string[]>([]);
  return (
    <PlayerContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayers must be used inside PlayerProvider");
  }
  return context;
};
