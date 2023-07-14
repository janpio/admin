"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

import ClientOnly from "@/components/client-only";
import { Button } from "@/components/ui/button";

import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (file: string) => void;
  onRemove: (file: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <ClientOnly>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] overflow-hidden h-[200px] rounded-md"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                size={"icon"}
                onClick={() => onRemove(url)}
                variant="destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              src={url}
              alt="Uploaded Image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset="sm7sht9v"
        options={{
          folder: "wardrobe/items",
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          );
        }}
      </CldUploadWidget>
    </ClientOnly>
  );
};

export default ImageUpload;
