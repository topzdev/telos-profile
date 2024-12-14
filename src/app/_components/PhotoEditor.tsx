"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PreviewFrame from "@/app/_components/PreviewFrame";
import PhotoEditorDialog from "@/app/_components/PhotoEditorDialog";
import { createImage } from "@/lib/cropImage";
import Typography from "@/components/ui/typography";

interface PhotoEditorProps {
  frame?: string;
  image?: File | null;
}

const PhotoEditor: React.FC<PhotoEditorProps> = ({
  frame = "telos-cropped-frame.png",
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [finalImage, setFinalImage] = useState("");

  useEffect(() => {
    if (image) {
      setDialog(true);
    }
  }, [image, setDialog]);

  const handleDownload = async () => {
    setLoading(true);
    setTimeout(async () => {
      const a = document.createElement("a");
      a.href = finalImage;
      a.download = "support-telos-" + Date.now() + ".png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setLoading(false);
      toast({
        title: "Photo Downloaded",
        description: "Thank you for supporting Telos!",
        duration: 3000,
      });
    }, 500);
  };

  const handleInputClick = (event: React.MouseEvent<any, MouseEvent>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        resetChanges();
        setImage(reader.result as string);
        fileInputRef.current.value = null; // Clear the file input
      };
      reader.readAsDataURL(file);
    }
  };

  const resetChanges = () => {
    setImage(null);
  };

  useEffect(() => {
    if (!dialog) {
      resetChanges();
    }
  }, [dialog, setDialog]);

  const handleRemove = () => {
    setFinalImage("");
    resetChanges();
  };

  return (
    <div className="flex flex-col w-full items-center mt-4">
      <PreviewFrame
        plain={!!finalImage}
        frame={!finalImage ? frame : null}
        onClick={!finalImage ? handleInputClick : () => {}}
      >
        {finalImage && (
          <img
            alt={"Preview Final Image"}
            className={"h-full w-full"}
            src={finalImage}
          />
        )}
      </PreviewFrame>

      <input
        ref={fileInputRef}
        type={"file"}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileInputChange}
      />

      <div className={"flex flex-col w-full gap-y-2 mt-2"}>
        {!finalImage ? (
          <Button
            disabled={loading}
            loading={loading}
            size={"lg"}
            className={"w-full"}
            onClick={handleInputClick}
          >
            Upload Photo
          </Button>
        ) : (
          <>
            <Button
              disabled={loading}
              loading={loading}
              size={"lg"}
              className={"w-full"}
              onClick={handleDownload}
            >
              Download Photo
            </Button>
            <Typography className="text-slate-400 text-xs mb-1" variant="small">
              or press and hold the image above and save it to your library
            </Typography>
            <Button
              className={"w-full"}
              size={"lg"}
              variant={"outlined"}
              onClick={handleRemove}
            >
              Upload More
            </Button>
          </>
        )}
      </div>

      <PhotoEditorDialog
        dialog={dialog}
        setDialog={setDialog}
        frame={frame}
        image={image}
        setFinalImage={setFinalImage}
      ></PhotoEditorDialog>
    </div>
  );
};

export default PhotoEditor;
