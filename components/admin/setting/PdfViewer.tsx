"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Card, CardContent } from "@/components/ui/card";

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Card className="p-4 shadow-lg w-full max-w-3xl mx-auto">
      <CardContent>
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js`}
        >
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} defaultScale={1} />
        </Worker>
      </CardContent>
    </Card>
  );
};

export default PdfViewer;
