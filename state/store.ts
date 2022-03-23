import create from "zustand";

interface locationStateType {
    region: string;
    setRegion: (region: string) => void;
    city: string;
    setCity: (city: string) => void;
    county: string;
    setCounty: (county: string) => void;
  }

  export const locationState = create<locationStateType>((set) => ({
    region: "",
    setRegion: (region) => {
      set({ region })
    },
    city: "",
    setCity: (city) => {
      set({ city })
    },
    county: "",
    setCounty: (county) => {
      set({ county })
    },
  }));