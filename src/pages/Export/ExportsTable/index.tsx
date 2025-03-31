import { useCreateSummary } from "@Utils/queries/studies";
import { formatDateTime } from "@Utils/utility";
import { Export } from "@carp-dk/client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import DeleteButton from "../DeleteButton";
import DownloadButton from "../DownloadButton";
import StatusCell from "../StatusCell";
import TypeCell from "../TypeCell";
import {
  CreateSummaryButton,
  DeletingWarning,
  StyledContainer,
} from "./styles";

type Props = {
  exports: Export[];
  exportsLoading: boolean;
};

const ExportsTable = memo(({ exports, exportsLoading }: Props) => {
  const { id: studyId } = useParams();
  const createSummary = useCreateSummary();

  const columns = useMemo<MRT_ColumnDef<Export>[]>(
    () => [
      {
        accessorKey: "file_name",
        header: "File Name",
        minSize: 350,
      },
      {
        accessorFn: (row) => formatDateTime(new Date(row.created_at).getTime()),
        id: "createdOn",
        header: "Created on",
        sortingFn: (row1, row2) =>
          row1.original.created_at > row2.original.created_at ? 1 : -1,
        size: 160,
      },
      {
        accessorKey: "type",
        header: "Export type",
        Cell: TypeCell,
        size: 200,
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: StatusCell,
        size: 150,
      },
      {
        accessorKey: "download",
        header: "Download",
        Cell: DownloadButton,
        enableSorting: false,
        size: 100,
      },
      {
        accessorKey: "delete",
        header: "Delete",
        Cell: DeleteButton,
        enableSorting: false,
        size: 100,
      },
    ],
    [],
  );

  const table = useMaterialReactTable<Export>({
    columns: columns as MRT_ColumnDef<Export, any>[],
    data: exports ?? [],
    positionGlobalFilter: "left",
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnFilters: false,
    enableStickyFooter: true,
    enableHiding: false,
    enableColumnActions: false,
    enableTopToolbar: false,
    enableSorting: true,
    muiSkeletonProps: {
      animation: "wave",
    },
    muiPaginationProps: {
      SelectProps: {
        sx: {
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          height: "35px",
          padding: "4px 0 0 12px",
          elevation: 3,
        },
      },
    },
    state: {
      showSkeletons: exportsLoading,
    },
    initialState: {
      sorting: [
        {
          id: "createdOn",
          desc: true,
        },
      ],
    },
  });

  return (
    <StyledContainer>
      <CreateSummaryButton
        variant="outlined"
        startIcon={<AddRoundedIcon />}
        onClick={() => createSummary.mutate({ studyId, deploymentIds: null })}
      >
        New Export
      </CreateSummaryButton>
      <DeletingWarning variant="h4">
        Exports are deleted 7 days after creation.
      </DeletingWarning>
      <MaterialReactTable table={table} />
    </StyledContainer>
  );
});

export default ExportsTable;
