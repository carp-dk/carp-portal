import DeleteConfirmationModal from '@Components/DeleteConfirmationModal';
import { Export } from '@carp-dk/client';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Button } from '@mui/material';
import { useDeleteExport } from '@Utils/queries/studies';
import { MRT_Cell } from 'material-react-table';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type ButtonCellProps = {
  cell: MRT_Cell<Export, unknown>;
};

const DeleteButton = ({ cell }: ButtonCellProps) => {
  const { id: studyId } = useParams();
  const deleteSummary = useDeleteExport(studyId);
  const summaryId = cell.row.original.id;
  const { status } = cell.row.original;
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteSummary.mutate(summaryId);
    setOpen(false);
  };

  return (
    <>
      <Button
        disabled={status === 'IN_PROGRESS'}
        color="error"
        onClick={() => setOpen(true)}
      >
        <DeleteForeverRoundedIcon />
      </Button>
      <DeleteConfirmationModal
        title="Delete export"
        description="Are you sure you want to delete this export?"
        boldText="This action cannot be undone."
        checkboxLabel="I understand that this action cannot be undone."
        actionButtonLabel="Delete"
        onConfirm={() => handleDelete()}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default DeleteButton;
