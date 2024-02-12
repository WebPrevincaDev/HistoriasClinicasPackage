import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import CreatePdfService from "../../services/CreatePdfService";

const cPdf = new CreatePdfService();

export default function Previsualizacion() {
  const { user } = useSelector((state) => state.auth);
  const { hcd, hcdConfig } = useSelector((state) => state.hcd);

  return (
    <WebView
      source={{ html: cPdf.create_pdf({ hcd, hcdConfig, user }) }}
      allowFileAccess={true}
    />
  );
}
