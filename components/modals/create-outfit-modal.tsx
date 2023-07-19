'use client'

import Modal from "@/components/ui/modal";
import { useOutfitModal } from "@/hooks/use-outfit-modal";
import { formattedOutfit } from "@/types";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";


interface PropsData {
    data: formattedOutfit[];
    onSubmit: () => void;
    isOpen: boolean;
    onClose: () => void;
}


const CreateOutfitModal: React.FC<PropsData> = ({data, onClose, isOpen, onSubmit}) => {
    const {setCloseModal, openModal} = useOutfitModal();
    const form = useForm({

    });

  return (
    <Modal
    title="Create Outfit"
    description="To create an outfit, please fill out the form below."
    isOpen={openModal}
    onClose={setCloseModal}
    >
        <div className="py-2 pb-4">
            <Form {...form}>
                <form></form>
            </Form>
        </div>
    </Modal>
  )
}

export default CreateOutfitModal