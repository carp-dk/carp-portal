import { AdminStudy } from '@carp-dk/client';
import {
  Alert,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useAdminStudies } from '@Utils/queries/admin';
import { formatDate } from '@Utils/utility';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import { useMemo, useState } from 'react';
import { Toolbar } from '../styles';

type LiveFilter = 'all' | 'live' | 'notLive';

const liveParam: Record<LiveFilter, boolean | undefined> = {
  all: undefined,
  live: true,
  notLive: false,
};

type CellProps = { row: MRT_Row<AdminStudy> };

const StudyCell = ({ row }: CellProps) => (
  <Stack>
    <Typography variant="h5">
      {row.original.name || 'Untitled study'}
    </Typography>
    {row.original.applicationName && (
      <Typography variant="h6" color="text.secondary">
        {row.original.applicationName}
      </Typography>
    )}
  </Stack>
);

const OwnerCell = ({ row }: CellProps) => {
  const { fullName, email } = row.original.owner ?? {};
  return (
    <Stack>
      <Typography variant="h5_web">{fullName || email || '-'}</Typography>
      {fullName && email && (
        <Typography variant="h6" color="text.secondary">
          {email}
        </Typography>
      )}
    </Stack>
  );
};

const StatusCell = ({ row }: CellProps) =>
  row.original.isLive ? (
    <Chip label="Live" color="success" size="small" />
  ) : (
    <Chip label="Not live" size="small" />
  );

const dateCell =
  (key: 'createdAt' | 'firstDeploymentAt') =>
  ({ row }: CellProps) =>
    row.original[key] ? formatDate(row.original[key]) : '-';

const countColumn = (
  key: 'participantCount' | 'deploymentCount' | 'fileCount',
  header: string,
): MRT_ColumnDef<AdminStudy> => ({
  accessorKey: key,
  header,
  size: 130,
  muiTableHeadCellProps: { align: 'right' },
  muiTableBodyCellProps: { align: 'right' },
});

const StudiesTable = () => {
  const [liveFilter, setLiveFilter] = useState<LiveFilter>('all');
  const {
    data: studies,
    isLoading,
    isFetching,
    error,
  } = useAdminStudies(liveParam[liveFilter]);

  const columns = useMemo<MRT_ColumnDef<AdminStudy>[]>(
    () => [
      {
        accessorFn: (row) => row.name ?? '',
        id: 'name',
        header: 'Study',
        Cell: StudyCell,
        minSize: 240,
      },
      {
        accessorFn: (row) => row.owner?.fullName ?? row.owner?.email ?? '',
        id: 'owner',
        header: 'Owner',
        Cell: OwnerCell,
        minSize: 240,
      },
      {
        accessorKey: 'isLive',
        header: 'Status',
        Cell: StatusCell,
        size: 120,
      },
      countColumn('participantCount', 'Participants'),
      countColumn('deploymentCount', 'Deployments'),
      countColumn('fileCount', 'Files'),
      {
        accessorFn: (row) => row.createdAt ?? '',
        id: 'createdAt',
        header: 'Created on',
        Cell: dateCell('createdAt'),
        size: 140,
      },
      {
        accessorFn: (row) => row.firstDeploymentAt ?? '',
        id: 'firstDeploymentAt',
        header: 'First deployment',
        Cell: dateCell('firstDeploymentAt'),
        size: 160,
      },
    ],
    [],
  );

  const table = useMaterialReactTable<AdminStudy>({
    columns,
    data: studies ?? [],
    getRowId: (row) => row.studyId,
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
    localization: {
      noRecordsToDisplay:
        liveFilter === 'all'
          ? 'There are no studies on this instance yet.'
          : 'No studies match this filter.',
    },
    state: {
      showSkeletons: isLoading,
      showProgressBars: isFetching && !isLoading,
    },
  });

  return (
    <>
      <Toolbar>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={liveFilter}
          onChange={(_, value: LiveFilter | null) =>
            value && setLiveFilter(value)
          }
          aria-label="Filter studies by status"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="live">Live</ToggleButton>
          <ToggleButton value="notLive">Not live</ToggleButton>
        </ToggleButtonGroup>
        <span>{studies ? `${studies.length} studies` : null}</span>
      </Toolbar>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Could not load studies: {error.message}
        </Alert>
      )}
      <MaterialReactTable table={table} />
    </>
  );
};

export default StudiesTable;
