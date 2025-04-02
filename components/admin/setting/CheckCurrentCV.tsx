import { Button } from "@/components/ui/button";
import { Confirm } from "../confirm/Confirm";
import PdfViewer from "./PdfViewer";
import CONFIG from "@/config";

const CheckCurrentCV = () => {
  return (
    <Confirm
      className="max-w-5xl w-full h-[90vh] overflow-auto"
      title=" "
      trigger={<Button variant="shine">View Current CV</Button>}
      description={<PdfViewer fileUrl={CONFIG.cv_url} />}
    />
  );
};
export default CheckCurrentCV;
