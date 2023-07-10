'use client';
import {useEffect, useState} from "react";
import CreateWardrobeModal from "@/components/modals/create-wardrobe-modal";


const ModalProvider = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <CreateWardrobeModal />
        </>
    )
}

export default ModalProvider;