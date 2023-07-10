"use client";
import { useEffect } from "react";
import { useWardrobeModal } from "@/hooks/use-wardrobe-modal";

export default function SetupPage() {
    const onOpen = useWardrobeModal(state => state.onOpen);
    const isOpen = useWardrobeModal(state => state.isOpen);

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return null;
}

