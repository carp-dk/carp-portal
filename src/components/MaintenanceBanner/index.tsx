import { AnnouncementSeverity } from '@carp-dk/client';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import {
  Alert,
  AlertColor,
  Box,
  Collapse,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { useBanner } from '@Utils/queries/banner';
import { renderSimpleMarkdown } from '@Utils/simpleMarkdown';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const bannerAlertSeverity: Record<AnnouncementSeverity, AlertColor> = {
  INFO: 'info',
  WARNING: 'warning',
  CRITICAL: 'error',
};

const severityTitleKey: Record<AnnouncementSeverity, string> = {
  INFO: 'common:announcement_info',
  WARNING: 'common:announcement_warning',
  CRITICAL: 'common:announcement_critical',
};

const severityIcon: Record<AnnouncementSeverity, typeof InfoOutlinedIcon> = {
  INFO: InfoOutlinedIcon,
  WARNING: ReportProblemOutlinedIcon,
  CRITICAL: ErrorOutlineRoundedIcon,
};

type BannerAlertProps = {
  severity: AnnouncementSeverity;
  message: string;
  minimized?: boolean;
  /** Shows the minimize/expand button; the admin preview leaves it out. */
  onToggleMinimized?: () => void;
};

/**
 * The banner itself, shared by the live banner and the admin preview so the
 * preview shows exactly what users will see. A solid full-width strip: the
 * title row has an equal-width slot on each side, so the title stays centred
 * whether or not the minimize button is there.
 */
export const BannerAlert = ({
  severity,
  message,
  minimized = false,
  onToggleMinimized,
}: BannerAlertProps) => {
  const { t } = useTranslation();
  const Icon = severityIcon[severity];
  // Minimized, the banner keeps the message's first line under the title.
  const firstLine = message.split('\n')[0].trim();
  // "Show more" only when there is more: further lines, or a first line
  // cut off at this width (re-measured whenever the preview resizes).
  const previewRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const hasMore = message.trim() !== firstLine || isTruncated;

  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return undefined;
    // Fires once on observe, then on every resize.
    const observer = new ResizeObserver(() =>
      setIsTruncated(preview.scrollWidth > preview.clientWidth),
    );
    observer.observe(preview);
    return () => observer.disconnect();
  }, [firstLine]);

  return (
    <Alert
      variant="filled"
      severity={bannerAlertSeverity[severity]}
      icon={false}
      role={severity === 'INFO' ? 'status' : 'alert'}
      sx={{
        borderRadius: 0,
        py: minimized ? 0.25 : 1,
        px: 2,
        transition: 'padding 250ms cubic-bezier(0.22, 1, 0.36, 1)',
        '& .MuiAlert-message': { width: '100%', py: 0, overflow: 'visible' },
        // Markdown in the message; currentColor keeps it readable on every
        // severity colour (dark text on warning, white on the others).
        '& a': {
          color: 'inherit',
          fontWeight: 700,
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        },
        '& strong': { fontWeight: 700 },
        '& code': {
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '0.9em',
          px: 0.5,
          borderRadius: 1,
          backgroundColor: 'color-mix(in srgb, currentColor 15%, transparent)',
        },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr 40px',
          alignItems: 'center',
          minHeight: 40,
        }}
      >
        <span />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            minWidth: 0,
          }}
        >
          <Icon sx={{ fontSize: 22, flexShrink: 0 }} />
          <Typography
            component="p"
            sx={{
              fontSize: '1rem',
              lineHeight: '1.5rem',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {t(severityTitleKey[severity])}
          </Typography>
        </Box>
        {onToggleMinimized && (
          <IconButton
            color="inherit"
            onClick={onToggleMinimized}
            aria-label={
              minimized
                ? t('common:show_announcement')
                : t('common:minimize_announcement')
            }
            aria-expanded={!minimized}
            sx={{ justifySelf: 'end' }}
          >
            {minimized ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
          </IconButton>
        )}
      </Box>
      <Collapse
        in={minimized && !!firstLine}
        timeout={250}
        easing="cubic-bezier(0.22, 1, 0.36, 1)"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: 1,
            maxWidth: '80ch',
            mx: 'auto',
            pb: 0.5,
          }}
        >
          <Typography
            ref={previewRef}
            component="p"
            noWrap
            sx={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 400 }}
          >
            {renderSimpleMarkdown(firstLine)}
          </Typography>
          {hasMore && onToggleMinimized && (
            <Link
              component="button"
              color="inherit"
              underline="always"
              onClick={onToggleMinimized}
              sx={{
                flexShrink: 0,
                fontSize: '1rem',
                lineHeight: '1.5rem',
                fontWeight: 700,
                textUnderlineOffset: '3px',
              }}
            >
              {t('common:show_more')}
            </Link>
          )}
        </Box>
      </Collapse>
      <Collapse
        in={!minimized}
        timeout={250}
        easing="cubic-bezier(0.22, 1, 0.36, 1)"
      >
        <Typography
          component="p"
          sx={{
            maxWidth: '80ch',
            mx: 'auto',
            pb: 0.5,
            textAlign: 'center',
            fontSize: '1rem',
            lineHeight: '1.5rem',
            fontWeight: 400,
            whiteSpace: 'pre-line',
            textWrap: 'pretty',
          }}
        >
          {renderSimpleMarkdown(message)}
        </Typography>
      </Collapse>
    </Alert>
  );
};

// Remembers which announcement this viewer minimized, so it stays minimized
// across pages and reloads, and a new announcement shows expanded again.
const MINIMIZED_KEY = 'carp-banner-minimized';

const readMinimized = () => {
  try {
    return localStorage.getItem(MINIMIZED_KEY);
  } catch {
    return null;
  }
};

const writeMinimized = (value: string | null) => {
  try {
    if (value) localStorage.setItem(MINIMIZED_KEY, value);
    else localStorage.removeItem(MINIMIZED_KEY);
  } catch {
    // Storage blocked (private mode): minimizing still works on this page.
  }
};

/** Site-wide notice set by admins (Admin → System). Renders nothing when unset. */
const MaintenanceBanner = () => {
  const { data: banner } = useBanner();
  const [minimizedId, setMinimizedId] = useState(readMinimized);

  if (!banner) {
    return null;
  }

  const bannerId = `${banner.updatedAt ?? ''}|${banner.message}`;
  const minimized = minimizedId === bannerId;
  const toggleMinimized = () => {
    const next = minimized ? null : bannerId;
    writeMinimized(next);
    setMinimizedId(next);
  };

  // Sticky so the notice stays in view while scrolling. Above page content
  // and the app bar layer, below drawers and dialogs.
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <BannerAlert
        severity={banner.severity}
        message={banner.message}
        minimized={minimized}
        onToggleMinimized={toggleMinimized}
      />
    </Box>
  );
};

export default MaintenanceBanner;
