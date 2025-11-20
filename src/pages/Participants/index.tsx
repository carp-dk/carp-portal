import ActionNeededModal from '@Components/ActionNeededModal';
import StudyPageLayout from '@Components/Layout/StudyPageLayout';
import StudyHeader from '@Components/StudyHeader';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUri, PageType } from '@Utils/utility';
import AddNewDeploymentModal from './AddNewDeploymentModal';
import AddParticipantModal from './AddParticipantModal';
import ImportParticipantsModal from './ImportParticipantsModal';
import ParticipantsTable from './ParticipantsTable';

const Participants = () => {
  const [addParticipantModalOpen, setAddParticipantModalOpen] = useState(false);
  const [importParticipantsModalOpen, setImportParticipantsModalOpen]
    = useState(false);
  const [newDeploymentModalOpen, setNewDeploymentModalOpen] = useState(false);
  const [actionNeededModalOpen, setActionNeededModalOpen] = useState(false);
  const [participantsToAdd, setParticipantsToAdd] = useState([]);
  const sectionName = {
    name: 'Participants',
    uri: getUri(PageType.PARTICIPANTS),
  };
  const description = 'See all the participants of the Study.';
  const navigate = useNavigate();
  const { id: studyId } = useParams();
  const openAddParticipantModal = () => {
    setAddParticipantModalOpen(true);
  };
  const closeAddParticipantModal = () => {
    setAddParticipantModalOpen(false);
  };
  const openNewDeploymentModal = () => {
    setNewDeploymentModalOpen(true);
  };
  const openActionNeededModal = () => {
    setActionNeededModalOpen(true);
  };
  const closeNewDeploymentModal = () => {
    setNewDeploymentModalOpen(false);
  };
  const openImportParticipantsModal = () => {
    setImportParticipantsModalOpen(true);
  };
  const closeImportParticipantsModal = () => {
    setImportParticipantsModalOpen(false);
  };
  const handleSetParticipantsToAdd = (newParticipantsToAdd: []) => {
    setParticipantsToAdd(newParticipantsToAdd);
  };
  return (
    <StudyPageLayout>
      <StudyHeader path={[sectionName]} description={description} />
      <ParticipantsTable
        openActionNeededModal={openActionNeededModal}
        setParticipantsToAdd={handleSetParticipantsToAdd}
        openAddParticipantModal={openAddParticipantModal}
        openNewDeploymentModal={openNewDeploymentModal}
        openImportParticipantModal={openImportParticipantsModal}
      />
      <ImportParticipantsModal
        open={importParticipantsModalOpen}
        onClose={closeImportParticipantsModal}
      />
      <AddParticipantModal
        open={addParticipantModalOpen}
        onClose={closeAddParticipantModal}
      />
      <AddNewDeploymentModal
        participantsToAdd={participantsToAdd}
        open={newDeploymentModalOpen}
        onClose={closeNewDeploymentModal}
      />
      <ActionNeededModal
        open={actionNeededModalOpen}
        onClose={() => setActionNeededModalOpen(false)}
        title="Set the protocol"
        description="In order to create a new deployment you must set a protocol"
        actionButtonLabel="Go to Settings"
        onConfirm={() => navigate(`/studies/${studyId}/settings`)}
      />
    </StudyPageLayout>
  );
};

export default Participants;
