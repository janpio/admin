"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import ClientOnly from "@/components/client-only";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal = ({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  loading,
}: AlertModalProps) => {
  return (
    <ClientOnly>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        description={description}
      >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button
            variant={"outline"}
            onClick={onClose}
            disabled={loading}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </ClientOnly>
  );
};

export default AlertModal;
