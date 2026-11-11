import { AdminResearcher } from '@carp-dk/client';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Alert, Chip } from '@mui/material';
import { useAdminResearchers } from '@Utils/queries/admin';
import { formatDateTime } from '@Utils/utility';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import { useMemo, useState } from 'react';
import InviteResearcherModal from '../InviteResearcherModal';
import { PrimaryButton, Toolbar } from '../styles';

type CellProps = { row: MRT_Row<AdminResearcher> };

const StudiesCell = ({ row }: CellProps) => {
  const { ownedStudyCount, liveStudyCount } = row.original;
  return liveStudyCount > 0
    ? `${ownedStudyCount} (${liveStudyCount} live)`
    : ownedStudyCount;
};

const StatusCell = ({ row }: CellProps) => {
  if (!row.original.enabled) return <Chip label="Disabled" size="small" />;
  if (!row.original.emailVerified) {
    return <Chip label="Email not verified" color="warning" size="small" />;
  }
  return <Chip label="Active" color="success" size="small" />;
};

/** Every researcher on the instance, from CAWS; searched and paged client-side. */
const ResearchersTable = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const {
    data: researchers,
    isLoading,
    isFetching,
    error,
  } = useAdminResearchers();

  const columns = useMemo<MRT_ColumnDef<AdminResearcher>[]>(
    () => [
      {
        accessorFn: (row) => row.fullName || '-',
        id: 'name',
        header: 'Name',
      },
      {
        accessorFn: (row) => row.email ?? row.username ?? '-',
        id: 'email',
        header: 'Email / username',
        minSize: 280,
      },
      {
        accessorKey: 'ownedStudyCount',
        header: 'Studies',
        Cell: StudiesCell,
        size: 140,
      },
      {
        accessorKey: 'enabled',
        header: 'Status',
        Cell: StatusCell,
        size: 170,
      },
      {
        accessorFn: (row) => row.createdAt ?? '',
        id: 'createdAt',
        header: 'Created on',
        Cell: ({ row }) =>
          row.original.createdAt ? formatDateTime(row.original.createdAt) : '-',
        size: 160,
      },
    ],
    [],
  );

  const table = useMaterialReactTable<AdminResearcher>({
    columns,
    data: researchers ?? [],
    getRowId: (row) => row.id,
    positionGlobalFilter: 'left',
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnFilters: false,
    enableHiding: false,
    enableColumnActions: false,
    initialState: {
      showGlobalFilter: true,
      pagination: { pageIndex: 0, pageSize: 25 },
    },
    localization: { noRecordsToDisplay: 'There are no researchers yet.' },
    state: {
      showSkeletons: isLoading,
      showProgressBars: isFetching && !isLoading,
    },
  });

  return (
    <>
      <Toolbar>
        <span>{researchers ? `${researchers.length} researchers` : null}</span>
        <PrimaryButton
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setInviteOpen(true)}
        >
          Add researcher
        </PrimaryButton>
      </Toolbar>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Could not load researchers: {error.message}
        </Alert>
      )}
      <MaterialReactTable table={table} />
      <InviteResearcherModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
};

export default ResearchersTable;
