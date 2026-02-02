"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface SelectedSeat {
  seatNo: string;
  seatName: string;
}

interface SelectedSeatContextValue {
  selectedSeat: SelectedSeat | null;
  setSelectedSeat: (seat: SelectedSeat | null) => void;
  /** Incremented on every search click so results refetch even for same seat */
  searchTrigger: number;
  triggerSearch: () => void;
}

const SelectedSeatContext = createContext<SelectedSeatContextValue | null>(null);

export function SelectedSeatProvider({ children }: { children: React.ReactNode }) {
  const [selectedSeat, setSelectedSeatState] = useState<SelectedSeat | null>(null);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const setSelectedSeat = useCallback((seat: SelectedSeat | null) => {
    setSelectedSeatState(seat);
  }, []);
  const triggerSearch = useCallback(() => {
    setSearchTrigger((t) => t + 1);
  }, []);

  return (
    <SelectedSeatContext.Provider value={{ selectedSeat, setSelectedSeat, searchTrigger, triggerSearch }}>
      {children}
    </SelectedSeatContext.Provider>
  );
}

export function useSelectedSeat() {
  const ctx = useContext(SelectedSeatContext);
  if (!ctx) {
    throw new Error("useSelectedSeat must be used within SelectedSeatProvider");
  }
  return ctx;
}
