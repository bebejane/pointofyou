import { create } from "zustand";
import { shallow } from 'zustand/shallow';

export interface AudioStoreState {
  playingId: string | null,
  items: HTMLAudioElement[],
  setItems: (items: any[]) => void,
  setPlayingId: (playingId: string) => void,
  play: (id: string) => void,
  pause: (id: string) => void,
}

const useAudioStore = create<AudioStoreState>((set, get) => ({
  items: [],
  playingId: null,
  setItems: (items) => {
    set({ items })
  },
  setPlayingId: (playingId) => set({ playingId }),
  play: (id) => {
    const items = get().items
    const item = items.find(item => item.id === id);
    if (!item) return;
    item.play();
    items.forEach(item => item.pause());
    set({ playingId: id });
  },
  pause: (id) => {
    const item = get().items.find(item => item.id === id);
    if (!item) return;
    item.pause();
    set({ playingId: null });
  },
}));

export { shallow, useAudioStore };
