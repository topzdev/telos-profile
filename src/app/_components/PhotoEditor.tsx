"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PreviewFrame from "@/app/_components/PreviewFrame";
import PhotoEditorDialog from "@/app/_components/PhotoEditorDialog";
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
  const [manualDownloadUrl, setManualDownloadUrl] = useState<string | null>(
    null,
  );
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

    if (!finalImage) {
      toast({
        title: "Error",
        description: "Image is not ready for download.",
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    try {
      // Fetch the image as a Blob
      const response = await fetch(finalImage);
      const blob = await response.blob();

      // Create a valid Blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `support-telos-${Date.now()}.png`; // Ensure a valid filename

      // Append and trigger the click event
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Revoke the Blob URL to release memory
      setManualDownloadUrl(blobUrl);
      // URL.revokeObjectURL(blobUrl);

      toast({
        title: "Photo Downloaded",
        description: "Thank you for supporting Telos!",
        duration: 3000,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download the photo.",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
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
              or{" "}
              <a
                href={manualDownloadUrl || ""}
                download={`support-telos-${Date.now()}.png`}
                className={"underline"}
              >
                {" "}
                Click here to manually download the photo
              </a>
              &nbsp;or press and hold the image above and save it to your
              library
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
