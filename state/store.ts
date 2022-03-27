import create from "zustand";

interface locationStateType {
  idx: number;
  setIdx: (idx: number) => void;
  region: string;
  setRegion: (region: string) => void;
  city: string;
  setCity: (city: string) => void;
  county: string;
  setCounty: (county: string) => void;
  service: string;
  setService: (serice: string) => void;
}

interface kakaoMapState {
  markers: any[];
  setMarkers: (obj: {}) => void;
  removeMarkers: () => void;
}

export const locationState = create<locationStateType>((set) => ({
  idx: 0,
  setIdx: (idx) => {
    set({ idx });
  },
  region: "",
  setRegion: (region) => {
    set({ region });
  },
  city: "",
  setCity: (city) => {
    set({ city });
  },
  county: "",
  setCounty: (county) => {
    set({ county });
  },
  service: "",
  setService: (service) => {
    set({ service });
  },
}));

export const kakaoMapState = create<kakaoMapState>((set) => ({
  markers: [],
  setMarkers: (obj) => {
    set((state) => ({
      markers: [...state.markers, obj],
    }));
  },
  resetMarkers: () => {
    set({ markers: [] });
  },
}));
