import GeneratedAccountLabel from "@Components/GeneratedAccountLabel";
import {
  useParticipantsAccounts,
  useParticipantsStatus,
} from "@Utils/queries/participants";
import { useStudyDetails } from "@Utils/queries/studies";
import { formatDateTime } from "@Utils/utility";
import carpStudies from "@cachet/carp-studies-core";
import { ParticipantAccount } from "@carp-dk/client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import { Typography } from "@mui/material";
import {
  MRT_ColumnDef,
  MRT_RowSelectionState,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddUserButton,
  CustomTopToolbar,
  StyledContainer,
  TopToolbarButton,
} from "./styles";
import ParticipantGroupStatus = carpStudies.dk.cachet.carp.studies.application.users.ParticipantGroupStatus;
import EmailAccountIdentity = carpStudies.dk.cachet.carp.common.application.users.EmailAccountIdentity;
import UsernameAccountIdentity = carpStudies.dk.cachet.carp.common.application.users.UsernameAccountIdentity;

interface Props {
  openNewDeploymentModal: () => void;
  openActionNeededModal: () => void;
  openAddParticipantModal: () => void;
  openImportParticipantModal: () => void;
  setParticipantsToAdd: (participants: ParticipantAccount[]) => void;
}

const ParticipantsTable = ({
  openNewDeploymentModal,
  openAddParticipantModal,
  openImportParticipantModal,
  openActionNeededModal,
  setParticipantsToAdd,
}: Props) => {
  const { id: studyId } = useParams();
  const {
    data: participantsAccounts,
    isLoading: participantsAccountsLoading,
    isError: isParticipantsAccountsError,
  } = useParticipantsAccounts(studyId);
  const { data: deploymentsStatus, isLoading: isDeploymentsStatusLoading } =
    useParticipantsStatus(studyId);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [columns, setColumns] = useState<MRT_ColumnDef<ParticipantAccount>[]>(
    [],
  );
  const { data: study } = useStudyDetails(studyId);

  const InvitedOnColumn = useCallback(
    (cell: { row: { original: { email: string; username: string } } }) => {
      if (!isDeploymentsStatusLoading) {
        console.log(deploymentsStatus);
        const deployment = deploymentsStatus.toArray().find(
          (pg): pg is ParticipantGroupStatus.InDeployment =>
            pg instanceof ParticipantGroupStatus.InDeployment &&
            pg.participants.toArray().some((participant) => {
              switch (participant.accountIdentity.constructor) {
                case EmailAccountIdentity:
                  return (
                    (
                      participant.accountIdentity as EmailAccountIdentity
                    ).emailAddress.address.toLowerCase() ===
                    cell.row.original.email?.toLowerCase()
                  );
                case UsernameAccountIdentity:
                  return (
                    (
                      participant.accountIdentity as UsernameAccountIdentity
                    ).username.name.toLowerCase() ===
                    cell.row.original.username?.toLowerCase()
                  );
                // TODO: Add case for other account identities
                default:
                  console.error("Unknown account identity type");
                  return false;
              }
            }),
        );

        if (deployment) {
          return (
            <Typography variant="h5">
              {formatDateTime(deployment.invitedOn.toEpochMilliseconds(), {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          );
        }
      }
      return null;
    },
    [deploymentsStatus],
  );
  const generatedAccountLabel = () => <GeneratedAccountLabel />;

  useEffect(() => {
    setRowSelection({});
  }, [participantsAccounts, deploymentsStatus]);
  useEffect(() => {
    setColumns([
      {
        accessorFn: (row) => row.email ?? row.username,
        header: "Identity",
      },
      {
        accessorFn: (row) => {
          if (row?.firstName !== undefined && row?.firstName !== null)
            return `${row?.firstName} ${row?.lastName}`;
          if (!row.email) {
            return generatedAccountLabel();
          }

          return "—";
        },
        id: "fullName",
        header: "Full name",
      },
      {
        accessorFn: (row) => {
          return row?.id !== null ? "Yes" : "No";
        },
        id: "user_id",
        header: "Registered",
      },
      {
        id: "invitedOn",
        header: "Invited On",
        Cell: ({ cell }) => InvitedOnColumn(cell),
      },
    ]);
  }, [deploymentsStatus]);

  const handleCreateNewDeployment = () => {
    if (study.protocolSnapshot === null) {
      openActionNeededModal();
      return;
    }
    const participantsIdentifiers = Object.keys(rowSelection);
    setParticipantsToAdd(
      participantsAccounts.filter((participant) =>
        participantsIdentifiers.includes(
          participant.email ?? participant.username,
        ),
      ),
    );
    openNewDeploymentModal();
  };

  const handleImportList = () => {
    openImportParticipantModal();
  };

  console.log(participantsAccounts);
  const table = useMaterialReactTable<ParticipantAccount>({
    columns: columns as MRT_ColumnDef<ParticipantAccount, any>[],
    data: participantsAccounts ?? [],
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      showSkeletons: participantsAccountsLoading || isDeploymentsStatusLoading,
    },
    getRowId: (row) => row.email ?? row.username,
    muiSearchTextFieldProps: {
      variant: "outlined",
      placeholder: "",
      label: "Search",
      InputLabelProps: { shrink: true },
    },
    renderTopToolbarCustomActions: () => {
      return (
        <CustomTopToolbar>
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
    },
    positionGlobalFilter: "left",
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnFilters: false,
    enableStickyFooter: true,
    enableHiding: false,
    enableColumnActions: false,
    enableSorting: true,
    muiToolbarAlertBannerProps: isParticipantsAccountsError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
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
