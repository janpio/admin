import { create } from "zustand";

type UseOutfitModalStore = {
    openModal: boolean;
    setOpenModal: () => void;
    setCloseModal: () => void;
}


export const useOutfitModal = create<UseOutfitModalStore>((set) => ({
    openModal: false,
    setOpenModal: () => set({ openModal: true }),
    setCloseModal: () => set({ openModal: false }),
}));