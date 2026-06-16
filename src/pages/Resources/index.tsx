import { getCountry, getFlag } from '@Assets/languageMap';
import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import DeleteConfirmationModal from '@Components/DeleteConfirmationModal';
import StudyPageLayout from '@Components/Layout/StudyPageLayout';
import StudyHeader from '@Components/StudyHeader';
import {
  useDeleteResource,
  useDeleteTranslation,
  useStudyResources,
  useStudyTranslations,
} from '@Utils/queries/studies';
import {
  formatDateTime,
  getRandomNumber,
  PageType,
  useGetUri,
} from '@Utils/utility';
import { CarpDocument } from '@carp-dk/client';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Tooltip,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AddResourceModal from './AddResourceModal';
import EditResourceModal from './EditResourceModal';
import EditTranslationModal from './EditTranslationModal';
import {
  AddResourceButton,
  AddResourceButtonGroup,
  CountryFlagIcon,
  CountryLanguage,
  HeaderTableCell,
  HeaderText,
  LanguageWrapper,
  StyledCard,
  StyledTableRow,
} from './styles';

type ResourceRow = {
  document: CarpDocument;
  type: 'resource' | 'translation';
};

const FileNameCell = ({ row }: { row: ResourceRow }) => {
  if (row.type === 'resource') return row.document.name;

  const CountryFlag = getFlag(row.document.name);

  return (
    <LanguageWrapper>
      <CountryFlagIcon>
        <CountryFlag selected="" onSelect={undefined} />
      </CountryFlagIcon>
      <CountryLanguage>{getCountry(row.document.name)}</CountryLanguage>
    </LanguageWrapper>
  );
};

const getResourceTypeLabel = (row: ResourceRow) => {
  if (row.type === 'translation') return 'Translation';
  if (row.document.name === 'informed_consent') return 'Informed Consent';

  return 'Resource';
};

const Resources = () => {
  const { id: studyId } = useParams();
  const sectionNames = [
    { name: 'Resources', uri: useGetUri(PageType.RESOURCES) },
  ];
  const {
    data: resources,
    isLoading: resourcesLoading,
    error: resourcesError,
  } = useStudyResources(studyId);
  const {
    data: translations,
    isLoading: translationsLoading,
    error: translationsError,
  } = useStudyTranslations(studyId);
  const resourceRows = useMemo<ResourceRow[]>(() => {
    const rows = [
      ...(resources?.documents.map((document) => ({
        document,
        type: 'resource' as const,
      })) ?? []),
      ...(translations?.documents.map((document) => ({
        document,
        type: 'translation' as const,
      })) ?? []),
    ];

    return rows.sort((a, b) => {
      const bDate = new Date(b.document.updated_at).getTime();
      const aDate = new Date(a.document.updated_at).getTime();

      return bDate - aDate;
    });
  }, [resources?.documents, translations?.documents]);
  const resourcesAndTranslationsLoading =
    resourcesLoading || translationsLoading;

  const [openAddResource, setOpenAddResource] = useState(false);
  const closeAddResourceModal = () => setOpenAddResource(false);
  const openAddResourceModal = () => setOpenAddResource(true);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const [resourceToDelete, setResourceToDelete] = useState<CarpDocument>(null);
  const deleteResource = useDeleteResource();
  const [translationToDelete, setTranslationToDelete] =
    useState<CarpDocument>(null);
  const deleteTranslation = useDeleteTranslation();

  const [editResourceOpen, setEditResourceOpen] = useState(false);
  const closeEditResourceModal = () => setEditResourceOpen(false);
  const openEditResourceModal = () => setEditResourceOpen(true);
  const [resourceToEdit, setResourceToEdit] = useState<CarpDocument>(null);
  const [editTranslationOpen, setEditTranslationOpen] = useState(false);
  const closeEditTranslationModal = () => setEditTranslationOpen(false);
  const openEditTranslationModal = () => setEditTranslationOpen(true);
  const [translationToEdit, setTranslationToEdit] =
    useState<CarpDocument>(null);

  const handleDeleteResource = () => {
    deleteResource.mutate({ studyId, resourceId: resourceToDelete.id });
    setOpenDeleteConfirmationModal(false);
    setResourceToDelete(null);
  };

  const handleDeleteTranslation = () => {
    deleteTranslation.mutate({
      studyId,
      translationId: translationToDelete.id,
    });
    setOpenDeleteConfirmationModal(false);
    setTranslationToDelete(null);
  };

  const confirmationModalProps = {
    open: openDeleteConfirmationModal,
    onClose: () => {
      setOpenDeleteConfirmationModal(false);
      setResourceToDelete(null);
      setTranslationToDelete(null);
    },
    onConfirm: resourceToDelete
      ? handleDeleteResource
      : handleDeleteTranslation,
    title: resourceToDelete ? 'Delete resource' : 'Delete translation',
    description: resourceToDelete
      ? 'The resource will be permanently deleted and will no longer appear on your Resources page.'
      : 'The translation will be permanently deleted and will no longer appear on your Resources page.',
    boldText: 'You can not undo this action.',
    checkboxLabel: "I'm sure I want to delete it",
    actionButtonLabel: 'Delete',
  };

  if (resourcesError && resourcesError.code !== 404) {
    return (
      <StudyPageLayout>
        <StudyHeader
          path={sectionNames}
          description="View files related to this study"
        />
        <CarpErrorCardComponent
          message="An error occurred while loading resources"
          error={resourcesError}
        />
      </StudyPageLayout>
    );
  }

  if (translationsError && translationsError.code !== 404) {
    return (
      <StudyPageLayout>
        <StudyHeader
          path={sectionNames}
          description="View JSON resources and localization files related to this study"
        />
        <CarpErrorCardComponent
          message="An error occurred while loading translations"
          error={translationsError}
        />
      </StudyPageLayout>
    );
  }

  return (
    <StudyPageLayout>
      <StudyHeader
        path={sectionNames}
        description="View JSON resources and localization files related to this study"
      />
      <StyledCard>
        <TableContainer sx={{ paddingX: '32px', height: '70vh' }}>
          <Table
            style={{ tableLayout: 'fixed' }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <StyledTableRow>
                <HeaderTableCell>
                  <HeaderText variant="h4">File name</HeaderText>
                </HeaderTableCell>
                <HeaderTableCell>
                  <HeaderText variant="h4">Type</HeaderText>
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
              {resourcesAndTranslationsLoading
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
                : resourceRows.map((row) => {
                    const isTranslation = row.type === 'translation';

                    return (
                      <StyledTableRow key={`${row.type}-${row.document.id}`}>
                        <TableCell>
                          <FileNameCell row={row} />
                        </TableCell>
                        <TableCell>{getResourceTypeLabel(row)}</TableCell>
                        <TableCell>
                          {formatDateTime(row.document.created_at) +
                            (row.document.updated_at !== row.document.created_at
                              ? ` (updated ${formatDateTime(
                                  row.document.updated_at,
                                )})`
                              : '')}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() => {
                                if (isTranslation) {
                                  setTranslationToDelete(row.document);
                                } else {
                                  setResourceToDelete(row.document);
                                }
                                setOpenDeleteConfirmationModal(true);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => {
                                if (isTranslation) {
                                  setTranslationToEdit(row.document);
                                  openEditTranslationModal();
                                } else {
                                  setResourceToEdit(row.document);
                                  openEditResourceModal();
                                }
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <AddResourceButtonGroup>
          <Tooltip title="Add file">
            <AddResourceButton
              sx={{ boxShadow: 2 }}
              onClick={openAddResourceModal}
            >
              <AddRoundedIcon />
            </AddResourceButton>
          </Tooltip>
        </AddResourceButtonGroup>
      </StyledCard>
      <AddResourceModal
        open={openAddResource}
        onClose={closeAddResourceModal}
      />
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
      {editResourceOpen && (
        <EditResourceModal
          open={editResourceOpen}
          onClose={closeEditResourceModal}
          resource={resourceToEdit}
        />
      )}
      {editTranslationOpen && (
        <EditTranslationModal
          open={editTranslationOpen}
          onClose={closeEditTranslationModal}
          translation={translationToEdit}
        />
      )}
    </StudyPageLayout>
  );
};

export default Resources;
