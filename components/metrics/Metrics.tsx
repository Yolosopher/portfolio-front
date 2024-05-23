import MicrosoftClarity from "./clarity/MicrosoftClarity";
import GoogleTag from "./google-tag/GoogleTag";

const Metrics = () => {
  return (
    <>
      <GoogleTag />
      <MicrosoftClarity />
    </>
  );
};
export default Metrics;
