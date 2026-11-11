import PrivatePageLayout from '@Components/Layout/PrivatePageLayout';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ResearchersTable from './ResearchersTable';
import StudiesTable from './StudiesTable';
import { Subtitle, Title } from './styles';
import System from './System';

const Admin = () => {
  const [tab, setTab] = useState<'researchers' | 'studies' | 'system'>(
    'researchers',
  );

  return (
    <PrivatePageLayout>
      <Title variant="h1">Administration</Title>
      <Subtitle variant="h5">Researchers, studies and the platform.</Subtitle>
      <Tabs value={tab} onChange={(_, value) => setTab(value)}>
        <Tab label="Researchers" value="researchers" />
        <Tab label="Studies" value="studies" />
        <Tab label="System" value="system" />
      </Tabs>
      {tab === 'researchers' && <ResearchersTable />}
      {tab === 'studies' && <StudiesTable />}
      {tab === 'system' && <System />}
    </PrivatePageLayout>
  );
};

export default Admin;
