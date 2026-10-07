import { useSnackbar } from '@Utils/snackbar';
import { customPalette } from '@Utils/theme';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { Modal } from '@mui/material';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import {
  ActionButton,
  CancelButton,
  LargeImage,
  ModalActions,
  ModalBox,
  ModalDescription,
  ModalTitle,
  SignupUrl,
  ViewButton,
} from './styles';

type Props = {
  url: string;
  shortCode: string;
  isLive: boolean;
};

// Rendered at a size large enough to stay sharp when downloaded or printed;
// the modal scales it down with CSS.
const QR_SIZE = 512;
const WATERMARK = 'Inactive';
const WATERMARK_OPACITY = 0.8;

const drawWatermark = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.save();

  // Measure at a reference size, then scale so the word spans most of the
  // diagonal rather than guessing a ratio that only holds for one canvas size.
  const BASE_FONT = 100;
  ctx.font = `bold ${BASE_FONT}px sans-serif`;
  const diagonal = Math.hypot(canvas.width, canvas.height);
  const fontSize = Math.round(
    (BASE_FONT * diagonal * 0.8) / ctx.measureText(WATERMARK).width,
  );

  ctx.globalAlpha = WATERMARK_OPACITY;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-Math.PI / 4);
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = customPalette.error.main;
  ctx.fillText(WATERMARK, 0, 0);
  ctx.restore();
};

const QrCode = ({ url, shortCode, isLive }: Props) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const [dataUrl, setDataUrl] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const canvas = await QRCode.toCanvas(url, {
          width: QR_SIZE,
          margin: 2,
          // The watermark covers part of the code, so lean on the highest
          // error correction to keep an ended code scannable anyway.
          errorCorrectionLevel: isLive ? 'M' : 'H',
        });
        if (!isLive) drawWatermark(canvas);
        if (!cancelled) setDataUrl(canvas.toDataURL('image/png'));
      } catch {
        if (!cancelled) setDataUrl('');
      }
    };
    render();

    return () => {
      cancelled = true;
    };
  }, [url, isLive]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.setAttribute('download', `self-signup-${shortCode}.png`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleCopy = async () => {
    try {
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setSnackbarSuccess('QR code copied to clipboard');
    } catch {
      setSnackbarError('Could not copy the QR code');
    }
  };

  return (
    <>
      <ViewButton
        disabled={!dataUrl}
        onClick={() => setOpen(true)}
        aria-label={`View QR code for short code ${shortCode}`}
      >
        <ArrowForwardRoundedIcon fontSize="small" />
      </ViewButton>
      <Modal
        open={open}
        aria-labelledby="qr-modal-title"
        aria-describedby="qr-modal-description"
        onClose={() => setOpen(false)}
      >
        <ModalBox sx={{ boxShadow: 24 }}>
          <ModalTitle variant="h2" id="qr-modal-title">
            Self sign-up QR code
          </ModalTitle>
          <ModalDescription variant="h6" id="qr-modal-description">
            {isLive
              ? 'Scanning this opens the study in the app.'
              : 'Self sign-up has ended, so this code no longer accepts participants.'}
          </ModalDescription>
          <LargeImage src={dataUrl} alt={`QR code linking to ${url}`} />
          <SignupUrl variant="h6">{url}</SignupUrl>
          <ModalActions>
            <CancelButton variant="text" onClick={() => setOpen(false)}>
              Close
            </CancelButton>
            <ActionButton onClick={handleCopy}>
              <ContentCopyRoundedIcon fontSize="small" />
              Copy
            </ActionButton>
            <ActionButton onClick={handleDownload}>
              <DownloadRoundedIcon fontSize="small" />
              Download
            </ActionButton>
          </ModalActions>
        </ModalBox>
      </Modal>
    </>
  );
};

export default QrCode;
