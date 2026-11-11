import { AnnouncementSeverity } from '@carp-dk/client';
import { BannerAlert } from '@Components/MaintenanceBanner';
import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useBanner, useClearBanner, useSetBanner } from '@Utils/queries/banner';
import { formatDateTime } from '@Utils/utility';
import { useState } from 'react';
import { PrimaryButton } from '../styles';
import { SectionCard } from './styles';

const BannerEditor = () => {
  const { data: banner } = useBanner();
  const setBanner = useSetBanner();
  const clearBanner = useClearBanner();
  // null = untouched, so the form shows the live banner until edited.
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<AnnouncementSeverity | null>(null);

  const currentMessage = message ?? banner?.message ?? '';
  const currentSeverity = severity ?? banner?.severity ?? 'WARNING';
  const reset = () => {
    setMessage(null);
    setSeverity(null);
  };

  return (
    <SectionCard>
      <Typography variant="h3">Site banner</Typography>
      <Typography variant="h6" color="text.secondary">
        Shown at the top of every portal page for all signed-in users, e.g. for
        planned maintenance.
      </Typography>
      {banner?.updatedAt && (
        <Typography variant="h6" color="text.secondary">
          Last changed {formatDateTime(banner.updatedAt)}
          {banner.updatedBy ? ` by ${banner.updatedBy}` : ''}
        </Typography>
      )}
      <TextField
        multiline
        minRows={3}
        placeholder="CARP will be unavailable on Saturday 08:00–10:00 CET for maintenance."
        value={currentMessage}
        onChange={(e) => setMessage(e.target.value)}
      />
      <TextField
        select
        label="Type"
        value={currentSeverity}
        onChange={(e) => setSeverity(e.target.value as AnnouncementSeverity)}
        sx={{ width: 200 }}
      >
        <MenuItem value="INFO">Info</MenuItem>
        <MenuItem value="WARNING">Warning</MenuItem>
        <MenuItem value="CRITICAL">Critical</MenuItem>
      </TextField>
      {currentMessage.trim() && (
        <BannerAlert severity={currentSeverity} message={currentMessage} />
      )}
      <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end' }}>
        <Button
          color="error"
          disabled={!banner}
          loading={clearBanner.isPending}
          onClick={() => clearBanner.mutate(undefined, { onSuccess: reset })}
        >
          Remove banner
        </Button>
        <PrimaryButton
          variant="contained"
          disabled={
            !currentMessage.trim() || (message === null && severity === null)
          }
          loading={setBanner.isPending}
          onClick={() =>
            setBanner.mutate(
              { message: currentMessage.trim(), severity: currentSeverity },
              { onSuccess: reset },
            )
          }
        >
          {banner ? 'Update banner' : 'Publish banner'}
        </PrimaryButton>
      </Stack>
    </SectionCard>
  );
};

export default BannerEditor;
