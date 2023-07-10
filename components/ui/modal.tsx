'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
    children?: React.ReactNode;
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({
    children,
    title,
    description,
    isOpen,
    onClose
}: ModalProps) => {
    const handleOnClose = (open: boolean) => {
        if(!open) {
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOnClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}


export default Modal;