import { Export } from "@carp-dk/client";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, CircularProgress } from "@mui/material";
import { useDownloadSummary } from "@Utils/queries/studies";
import { MRT_Cell } from "material-react-table";

type ButtonCellProps = {
  cell: MRT_Cell<Export, unknown>;
};

const DownloadButton = ({ cell }: ButtonCellProps) => {
  const downloadSummary = useDownloadSummary();
  const exportId = cell.row.original.id;
  const studyId = cell.row.original.study_id;
  const { status } = cell.row.original;
  const handleDownload = () => {
    downloadSummary.mutate({ studyId, exportId });
  };

  return (
    <Button disabled={status !== "AVAILABLE"} onClick={handleDownload}>
      {status !== "AVAILABLE" && status !== "ERROR" ? (
        <CircularProgress size={12} />
      ) : (
        <DownloadIcon />
      )}
    </Button>
  );
};

export default DownloadButton;
