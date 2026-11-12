/* eslint-disable @typescript-eslint/no-explicit-any */
import GeneratedAccountLabel from '@Components/GeneratedAccountLabel';
import { useQueryParticipantAccounts } from '@Utils/queries/participants';
import { useStudyDetails } from '@Utils/queries/studies';
import { formatDateTime } from '@Utils/utility';
import { ParticipantAccountSummaryDto } from '@carp-dk/client';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import { Typography } from '@mui/material';
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_RowSelectionState,
  MRT_SortingState,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AddUserButton,
  CustomTopToolbar,
  StyledContainer,
  TopToolbarButton,
} from './styles';

interface Props {
  openNewDeploymentModal: () => void;
  openActionNeededModal: () => void;
  openAddParticipantModal: () => void;
  openAddAnonymousParticipantModal: () => void;
  openImportParticipantModal: () => void;
  setParticipantsToAdd: (participants: ParticipantAccountSummaryDto[]) => void;
}

const ParticipantsTable = ({
  openNewDeploymentModal,
  openAddParticipantModal,
  openAddAnonymousParticipantModal,
  openImportParticipantModal,
  openActionNeededModal,
  setParticipantsToAdd,
}: Props) => {
  const { id: studyId } = useParams();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [search, setSearch] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const { data: study } = useStudyDetails(studyId);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const {
    data: participantsAccounts,
    isLoading: participantsAccountsLoading,
    error: isParticipantsAccountsError,
  } = useQueryParticipantAccounts({
    studyId,
    request: {
      page: pagination.pageIndex,
      size: pagination.pageSize,
      search: search,
      isDeployed:
        columnFilters.length !== 0 ? columnFilters?.[0]?.value === 'Yes' : null,
      sortDirection: sorting?.[0]?.desc ? 'desc' : 'asc',
      sortBy:
        sorting?.[0]?.id === 'accountIdentity'
          ? 'account_identity'
          : 'is_deployed',
    },
  });

  const generatedAccountLabel = () => <GeneratedAccountLabel />;

  useEffect(() => {
    // Keep the same object when nothing is selected, so new data doesn't
    // cause an extra render of the whole table.
    setRowSelection((selection) =>
      Object.keys(selection).length === 0 ? selection : {},
    );
  }, [participantsAccounts]);

  // Built during the first render (not in an effect), so the table doesn't
  // render once without columns and then again with them.
  const columns = useMemo<MRT_ColumnDef<ParticipantAccountSummaryDto>[]>(
    () => [
      {
        accessorFn: (row) => row.accountIdentity,
        header: 'Identity',
        id: 'accountIdentity',
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => {
          if (row?.firstName !== undefined && row?.firstName !== null)
            return `${row?.firstName} ${row?.lastName}`;
          const uuidPattern =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (uuidPattern.test(row.accountIdentity)) {
            return generatedAccountLabel();
          }

          return '—';
        },
        id: 'fullName',
        header: 'Full name',
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => {
          return row?.carpUser ? 'Yes' : 'No';
        },
        id: 'carpUser',
        header: 'Carp User',
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        id: 'invitedOn',
        header: 'Invited On',
        accessorFn: (row) =>
          row.invitedOn
            ? formatDateTime(row.invitedOn, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })
            : '',
        filterSelectOptions: ['Yes', 'No'],
        filterFn: 'equals',
        filterVariant: 'select',
      },
    ],
    [],
  );

  const handleCreateNewDeployment = () => {
    if (study.protocolSnapshot === null) {
      openActionNeededModal();
      return;
    }
    const participantsIdentifiers = Object.keys(rowSelection);
    setParticipantsToAdd(
      participantsAccounts.content.filter((participant) =>
        participantsIdentifiers.includes(participant.accountIdentity),
      ),
    );
    openNewDeploymentModal();
  };

  const handleImportList = () => {
    openImportParticipantModal();
  };

  const table = useMaterialReactTable<ParticipantAccountSummaryDto>({
    columns: columns as MRT_ColumnDef<ParticipantAccountSummaryDto, any>[],
    data: participantsAccounts?.content ?? [],
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      showSkeletons: participantsAccountsLoading,
      pagination,
      sorting,
      columnFilters,
    },
    getRowId: (row) => row.accountIdentity,
    muiSearchTextFieldProps: {
      variant: 'outlined',
      placeholder: '',
      label: 'Search',
      slotProps: {
        inputLabel: {
          shrink: true,
        },
      },
    },
    renderTopToolbarCustomActions: () => {
      return (
        <CustomTopToolbar>
          <TopToolbarButton onClick={openAddAnonymousParticipantModal}>
            <AddRoundedIcon fontSize="small" />
            <Typography variant="h5">Anonymous</Typography>
          </TopToolbarButton>
          <TopToolbarButton onClick={handleImportList}>
            <FileUploadOutlinedIcon fontSize="small" />
            <Typography variant="h5">Import list</Typography>
          </TopToolbarButton>
          <TopToolbarButton
            disabled={Object.keys(rowSelection).length === 0}
            onClick={handleCreateNewDeployment}
          >
            <GroupAddRoundedIcon fontSize="small" />
            <Typography variant="h5">New deployment</Typography>
          </TopToolbarButton>
        </CustomTopToolbar>
      );
    },
    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
    },
    // On phones, let the search field and the action buttons wrap onto
    // separate lines instead of squeezing into one row
    muiTopToolbarProps: {
      sx: (theme) => ({
        [theme.breakpoints.down('sm')]: {
          '& > .MuiBox-root': { flexWrap: 'wrap' },
        },
      }),
    },
    positionGlobalFilter: 'left',
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnFilters: true,
    enableStickyFooter: true,
    enableHiding: false,
    enableColumnActions: false,
    enableSorting: true,
    muiToolbarAlertBannerProps: isParticipantsAccountsError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: {
        cursor: 'pointer',
      },
    }),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    rowCount: participantsAccounts?.total ?? 0,
    columnFilterDisplayMode: 'popover',
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
  });

  return (
    <StyledContainer>
      <MaterialReactTable table={table} />
      <AddUserButton sx={{ boxShadow: 2 }} onClick={openAddParticipantModal}>
        <AddRoundedIcon />
      </AddUserButton>
    </StyledContainer>
  );
};

export default ParticipantsTable;
