"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import useApiRequest from "@/hooks/request/useApiRequest";
import { FileText, X } from "lucide-react";
import { useCallback, useState } from "react";
import Dropzone, { DropzoneState } from "shadcn-dropzone";
import CheckCurrentCV from "./CheckCurrentCV";

const UploadCV = () => {
  const request = useApiRequest();
  const errorHandler = useErrorHandler();
  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  const [fileToUpload, setUploadedFile] = useState<null | File>(null);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFile(acceptedFiles[0]);
    console.log(acceptedFiles);
  }, []);

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      // @ts-ignore
      formData.append("cv", fileToUpload);

      const result = await request({
        url: "/cv",
        method: "POST",
        body: formData,
        auth: true,
      });

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          toast({
            title: "Success",
            description: result.data.message ?? "CV uploaded successfully",
          });
        }
      }
    } catch (error: any) {
      errorHandler(error.message);
    } finally {
      setLoading(false);
    }
  }, [fileToUpload, setLoading, request, errorHandler]);

  return (
    <div className="p-6 flex justify-center items-center">
      <div className="space-y-4 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center">Upload CV</h1>
        <Dropzone onDrop={handleDrop} dropZoneClassName="p-6">
          {(dropzone: DropzoneState) => (
            <div className="flex flex-col gap-4">
              {dropzone.isDragAccept ? (
                <div className="text-sm font-medium">Drop your files here!</div>
              ) : (
                <div className="flex items-center flex-col gap-1.5">
                  <div className="flex items-center flex-row gap-1 text-sm font-medium">
                    <span>Drag and drop your CV here or</span>
                    <span className="text-primary">browse</span>
                  </div>
                </div>
              )}
              {fileToUpload && (
                <Card
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-default"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p
                            className="font-medium truncate max-w-96"
                            title={fileToUpload.name}
                          >
                            {fileToUpload.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {(fileToUpload.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </Dropzone>
        <div className="flex justify-end gap-4 items-center">
          <CheckCurrentCV />
          <Button
            onClick={handleSubmit}
            disabled={!fileToUpload || loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Uploading..." : "Upload CV"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadCV;
