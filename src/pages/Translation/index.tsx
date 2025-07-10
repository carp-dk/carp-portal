import { getCountry, getFlag } from '@Assets/languageMap';
import StudyPageLayout from '@Components/Layout/StudyPageLayout';
import StudyHeader from '@Components/StudyHeader';
import { CarpDocument } from '@carp-dk/client';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import DeleteConfirmationModal from '@Components/DeleteConfirmationModal';
import {
  useDeleteTranslation,
  useStudyTranslations,
} from '@Utils/queries/studies';
import {
  formatDateTime,
  getRandomNumber,
  getUri,
  PageType,
} from '@Utils/utility';
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
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddTranslationModal from './AddTranslationModal';
import EditTranslationModal from './EditTranslationModal';
import {
  AddTranslationButton,
  CountryFlagIcon,
  CountryLanguage,
  HeaderTableCell,
  HeaderText,
  LanguageWrapper,
  StyledCard,
  StyledTableRow,
} from './styles';

const Translations = () => {
  const { id: studyId } = useParams();
  const sectionName = {
    name: 'Translations',
    uri: getUri(PageType.TRANSLATION),
  };
  const {
    data: translations,
    isLoading: translationsLoading,
    error: translationsError,
  } = useStudyTranslations(studyId);

  const [openAdd, setOpenAdd] = useState(false);
  const closeAddModal = () => setOpenAdd(false);
  const openAddModal = () => setOpenAdd(true);

  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal]
    = useState(false);
  const [translationToDelete, setTranslationToDelete]
    = useState<CarpDocument>(null);
  const deleteTranslation = useDeleteTranslation();

  const [editOpen, setEditOpen] = useState(false);
  const closeEditModal = () => setEditOpen(false);
  const openEditModal = () => setEditOpen(true);
  const [translationToEdit, setTranslationToEdit]
    = useState<CarpDocument>(null);

  const handleDeleteTranslation = () => {
    deleteTranslation.mutate({
      studyId,
      translationId: translationToDelete.id,
    });
    setOpenDeleteConfirmationModal(false);
  };

  const confirmationModalProps = {
    open: openDeleteConfirmationModal,
    onClose: () => setOpenDeleteConfirmationModal(false),
    onConfirm: handleDeleteTranslation,
    title: 'Delete translation',
    description:
      'The translation will be permanently deleted and will no longer appear on your Translations page.',
    boldText: 'You can not undo this action.',
    checkboxLabel: 'I\'m sure I want to delete it',
    actionButtonLabel: 'Delete',
  };

  if (translationsError && translationsError.code !== 404) {
    return (
      <StudyPageLayout>
        <StudyHeader
          path={[sectionName]}
          description="View this study's localization files"
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
        path={[sectionName]}
        description="View this study's localization files"
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
                  <HeaderText variant="h4">Language</HeaderText>
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
              {translationsLoading
                ? [1, 2, 3].map(() => {
                    return (
                      <StyledTableRow key={uuidv4()}>
                        <TableCell>
                          <LanguageWrapper>
                            <Skeleton
                              width="28px"
                              height="20px"
                              variant="rectangular"
                              animation="wave"
                            />
                            <Skeleton
                              width={`${getRandomNumber(60, 180)}px`}
                              animation="wave"
                            />
                          </LanguageWrapper>
                        </TableCell>
                        <TableCell>
                          <Skeleton width="150px" animation="wave" />
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
                    );
                  })
                : translations?.documents.map((translation: CarpDocument) => {
                    const CountryFlag = getFlag(translation.name);
                    return (
                      <StyledTableRow key={translation.id}>
                        <TableCell>
                          <LanguageWrapper>
                            <CountryFlagIcon>
                              <CountryFlag selected="" onSelect={undefined} />
                            </CountryFlagIcon>
                            { }
                            <CountryLanguage>
                              {getCountry(translation.name)}
                            </CountryLanguage>
                          </LanguageWrapper>
                        </TableCell>
                        <TableCell>
                          {formatDateTime(translation.created_at)
                            + (translation.updated_at !== translation.created_at
                              ? ` (updated ${formatDateTime(
                                translation.updated_at,
                              )})`
                              : '')}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() => {
                                setTranslationToDelete(translation);
                                setOpenDeleteConfirmationModal(true);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => {
                                setTranslationToEdit(translation);
                                openEditModal();
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
        <AddTranslationButton sx={{ boxShadow: 2 }} onClick={openAddModal}>
          <AddRoundedIcon />
        </AddTranslationButton>
      </StyledCard>
      <AddTranslationModal open={openAdd} onClose={closeAddModal} />
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
        <EditTranslationModal
          open={editOpen}
          onClose={closeEditModal}
          translation={translationToEdit}
        />
      )}
    </StudyPageLayout>
  );
};

export default Translations;
