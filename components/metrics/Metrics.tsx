import MicrosoftClarity from "./clarity/MicrosoftClarity";
import GoogleTag from "./google-tag/GoogleTag";
import Umami from "./umami/umami";

const Metrics = () => {
  return (
    <>
      <Umami />
      {/* <GoogleTag />
      <MicrosoftClarity /> */}
    </>
  );
};
export default Metrics;
