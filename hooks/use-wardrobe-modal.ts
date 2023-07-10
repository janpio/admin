import {create} from "zustand";

type UseWardrobeModalState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}


export const useWardrobeModal = create<UseWardrobeModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));