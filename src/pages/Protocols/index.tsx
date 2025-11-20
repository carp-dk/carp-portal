import PrivatePageLayout from '@Components/Layout/PrivatePageLayout';
import { useState } from 'react';
import AddProtocolModal from './AddProtocolModal';
import ProtocolsHeader from './ProtocolsHeader';
import ProtocolsTable from './ProtocolsTable';

const Protocols = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <PrivatePageLayout>
      <ProtocolsHeader />
      <ProtocolsTable openModal={openModal} />
      <AddProtocolModal open={modalOpen} onClose={closeModal} />
    </PrivatePageLayout>
  );
};

export default Protocols;
