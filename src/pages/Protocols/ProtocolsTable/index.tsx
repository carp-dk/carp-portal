import SortingButton from "@Components/SortingButton";
import { useProtocols } from "@Utils/queries/protocols";
import { formatDateTime, getRandomNumber } from "@Utils/utility";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddProtocolButton,
  HeaderCellContainer,
  HeaderTableCell,
  HeaderText,
  PrimaryCellText,
  SecondaryCellText,
  StyledCard,
  StyledTableRow,
  TertiaryCellText,
} from "./styles";

const SkeletonTableRow = () => {
  return (
    <StyledTableRow>
      <TableCell>
        <Skeleton width={`${getRandomNumber(40, 60)}%`} animation="wave" />
      </TableCell>
      <TableCell>
        <Skeleton width={`${getRandomNumber(50, 80)}%`} animation="wave" />
      </TableCell>
      <TableCell>
        <Skeleton width="70%" animation="wave" />
      </TableCell>
    </StyledTableRow>
  );
};

interface Props {
  openModal: () => void;
}

const ProtocolsTable = ({ openModal }: Props) => {
  const navigate = useNavigate();
  const { data: protocols, isLoading: protocolsLoading } = useProtocols();

  // State for sorting
  const [sortOrder, setSortOrder] = useState<{
    field: "name" | "createdOn";
    ascending: boolean;
  }>({ field: "createdOn", ascending: false });

  const toggleSortOrder = (field: "name" | "createdOn") => {
    setSortOrder((prevSortOrder) => ({
      field,
      ascending:
        prevSortOrder.field === field ? !prevSortOrder.ascending : true,
    }));
  };

  const sortedProtocols =
    protocolsLoading || !protocols
      ? []
      : protocols.toSorted((a, b) => {
          const compareResult =
            sortOrder.field === "name"
              ? a.name.localeCompare(b.name)
              : a.createdOn.toEpochMilliseconds() -
                b.createdOn.toEpochMilliseconds();

          return sortOrder.ascending ? compareResult : -compareResult;
        });

  const selectProtocolHandler = (protocolId: string) => {
    navigate(`/protocols/${protocolId}`);
  };

  const formatDescription = (description: string) => {
    if (description.length > 40) {
      return `${description.substring(0, 38)}...`;
    }
    return description;
  };

  if (!protocols) return null;
  return (
    <StyledCard>
      <TableContainer sx={{ paddingX: "32px", height: "70vh" }}>
        <Table
          style={{ tableLayout: "fixed" }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <StyledTableRow>
              <HeaderTableCell>
                <HeaderCellContainer>
                  <HeaderText variant="h4">Name</HeaderText>
                  <SortingButton
                    columnName="name"
                    toggleSortOrder={toggleSortOrder}
                    sortOrder={sortOrder}
                  />
                </HeaderCellContainer>
              </HeaderTableCell>
              <HeaderTableCell>
                <HeaderText variant="h4">Description</HeaderText>
              </HeaderTableCell>
              <HeaderTableCell>
                <HeaderCellContainer>
                  <HeaderText variant="h4">Created On</HeaderText>
                  <SortingButton
                    columnName="createdOn"
                    toggleSortOrder={toggleSortOrder}
                    sortOrder={sortOrder}
                  />
                </HeaderCellContainer>
              </HeaderTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {protocolsLoading ? (
              <>
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
              </>
            ) : (
              sortedProtocols.map((protocol) => (
                <StyledTableRow
                  key={protocol.id.stringRepresentation}
                  onClick={() =>
                    selectProtocolHandler(protocol.id.stringRepresentation)
                  }
                >
                  <TableCell>
                    <PrimaryCellText variant="h4">
                      {protocol.name}
                    </PrimaryCellText>
                  </TableCell>
                  <TableCell>
                    <SecondaryCellText variant="h5">
                      {protocol.description
                        ? formatDescription(protocol.description)
                        : "—"}
                    </SecondaryCellText>
                  </TableCell>
                  <TableCell>
                    <TertiaryCellText variant="h5">
                      {formatDateTime(protocol.createdOn.toEpochMilliseconds())}
                    </TertiaryCellText>
                  </TableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddProtocolButton sx={{ boxShadow: 2 }} onClick={openModal}>
        <AddRoundedIcon />
      </AddProtocolButton>
    </StyledCard>
  );
};

export default ProtocolsTable;
