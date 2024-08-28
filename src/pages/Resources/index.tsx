import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import DeleteConfirmationModal from "@Components/DeleteConfirmationModal";
import StudyPageLayout from "@Components/Layout/StudyPageLayout";
import StudyHeader from "@Components/StudyHeader";
import { useDeleteResource, useStudyResources } from "@Utils/queries/studies";
import { formatDateTime, getRandomNumber } from "@Utils/utility";
import { CarpDocument } from "@carp-dk/client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AddResourceModal from "./AddResourceModal";
import EditResourceModal from "./EditResourceModal";
import {
  AddResourceButton,
  HeaderTableCell,
  HeaderText,
  StyledCard,
  StyledTableRow,
} from "./styles";

const Resources = () => {
  const { id: studyId } = useParams();
  const {
    data: resources,
    isLoading: resourcesLoading,
    error: resourcesError,
  } = useStudyResources(studyId);

  const [openAdd, setOpenAdd] = useState(false);
  const closeAddModal = () => setOpenAdd(false);
  const openAddModal = () => setOpenAdd(true);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const [resourceToDelete, setResourceToDelete] = useState<CarpDocument>(null);
  const deleteResource = useDeleteResource();

  const [editOpen, setEditOpen] = useState(false);
  const closeEditModal = () => setEditOpen(false);
  const openEditModal = () => setEditOpen(true);
  const [resourceToEdit, setResourceToEdit] = useState<CarpDocument>(null);

  const handleDeleteResource = () => {
    deleteResource.mutate({ studyId, resourceId: resourceToDelete.id });
    setOpenDeleteConfirmationModal(false);
  };

  const confirmationModalProps = {
    open: openDeleteConfirmationModal,
    onClose: () => setOpenDeleteConfirmationModal(false),
    onConfirm: handleDeleteResource,
    title: "Delete resource",
    description:
      "The resource will be permanently deleted and will no longer appear on your Resources page.",
    boldText: "You can not undo this action.",
    checkboxLabel: "I'm sure I want to delete it",
    actionButtonLabel: "Delete",
  };

  if (resourcesError && resourcesError.code !== 404) {
    return (
      <StudyPageLayout>
        <StudyHeader
          path={["Resources"]}
          description="View files related to this study"
        />
        <CarpErrorCardComponent
          message="An error occurred while loading resources"
          error={resourcesError}
        />
      </StudyPageLayout>
    );
  }

  return (
    <StudyPageLayout>
      <StudyHeader
        path={["Resources"]}
        description="View files related to this study"
      />
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
                  <HeaderText variant="h4">File name</HeaderText>
                </HeaderTableCell>
                <HeaderTableCell>
                  <HeaderText variant="h4">Created On</HeaderText>
                </HeaderTableCell>
                <HeaderTableCell>
                  <HeaderText variant="h4">Actions</HeaderText>
                </HeaderTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {resourcesLoading
                ? [1, 2, 3].map(() => (
                    <StyledTableRow key={uuidv4()}>
                      <TableCell>
                        <Skeleton
                          animation="wave"
                          width={`${getRandomNumber(50, 90)}%`}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          animation="wave"
                          width={`${getRandomNumber(40, 60)}%`}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton disabled color="error" onClick={() => {}}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton disabled onClick={() => {}}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))
                : resources?.documents.map((resource: CarpDocument) => (
                    <StyledTableRow key={resource.id}>
                      <TableCell>{resource.name}</TableCell>
                      <TableCell>
                        {formatDateTime(resource.created_at) +
                          (resource.updated_at !== resource.created_at
                            ? ` (updated ${formatDateTime(
                                resource.updated_at,
                              )})`
                            : "")}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => {
                              setResourceToDelete(resource);
                              setOpenDeleteConfirmationModal(true);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => {
                              setResourceToEdit(resource);
                              openEditModal();
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddResourceButton sx={{ boxShadow: 2 }} onClick={openAddModal}>
          <AddRoundedIcon />
        </AddResourceButton>
      </StyledCard>
      <AddResourceModal open={openAdd} onClose={closeAddModal} />
      <DeleteConfirmationModal
        open={confirmationModalProps.open}
        title={confirmationModalProps.title}
        description={confirmationModalProps.description}
        boldText={confirmationModalProps.boldText}
        checkboxLabel={confirmationModalProps.checkboxLabel}
        actionButtonLabel={confirmationModalProps.actionButtonLabel}
        onClose={confirmationModalProps.onClose}
        onConfirm={confirmationModalProps.onConfirm}
      />
      {editOpen && (
        <EditResourceModal
          open={editOpen}
          onClose={closeEditModal}
          resource={resourceToEdit}
        />
      )}
    </StudyPageLayout>
  );
};

export default Resources;
