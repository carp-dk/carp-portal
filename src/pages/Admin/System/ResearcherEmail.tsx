import { Alert, Stack, TextField, Typography } from '@mui/material';
import { useAdminResearchers, useEmailResearchers } from '@Utils/queries/admin';
import { useMemo, useState } from 'react';
import { PrimaryButton } from '../styles';
import { SectionCard } from './styles';

const ResearcherEmail = () => {
  const { data: researchers, isLoading } = useAdminResearchers();
  const emailResearchers = useEmailResearchers();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [confirming, setConfirming] = useState(false);

  // Disabled accounts and accounts without an email can't (or shouldn't) be reached.
  const recipients = useMemo(
    () =>
      (researchers ?? []).flatMap((user) =>
        user.enabled && user.email ? [user.email] : [],
      ),
    [researchers],
  );

  const send = () =>
    emailResearchers.mutate(
      { recipients, subject, message },
      {
        onSuccess: () => {
          setSubject('');
          setMessage('');
          setConfirming(false);
        },
      },
    );

  return (
    <SectionCard>
      <Typography variant="h3">Email all researchers</Typography>
      <Typography variant="h6" color="text.secondary">
        {isLoading
          ? 'Loading researchers…'
          : `Sent individually to ${recipients.length} active researchers.`}
      </Typography>
      <TextField
        label="Subject"
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
          setConfirming(false);
        }}
      />
      <TextField
        label="Message"
        multiline
        minRows={5}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setConfirming(false);
        }}
      />
      {confirming && (
        <Alert severity="warning">
          This sends the email to {recipients.length} researchers and cannot be
          undone.
        </Alert>
      )}
      <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
        <PrimaryButton
          variant="contained"
          disabled={
            !subject.trim() || !message.trim() || recipients.length === 0
          }
          loading={emailResearchers.isPending}
          onClick={() => (confirming ? send() : setConfirming(true))}
        >
          {confirming
            ? `Confirm: send to ${recipients.length}`
            : 'Send to researchers'}
        </PrimaryButton>
      </Stack>
    </SectionCard>
  );
};

export default ResearcherEmail;
