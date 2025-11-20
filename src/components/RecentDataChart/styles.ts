import { Record } from '@Components/RecentDataChart';
import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 16,
});

export const SingleDayContainer = styled('div')({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
});

export const NumberOfDatapoints = styled(Typography, {
  shouldForwardProp: prop => prop !== 'highest',
})<{ highest?: boolean }>(({ highest, theme }) => ({
  color: highest ? '#FB8500' : theme.palette.text.secondary,
}));

export const Column = styled('div', {
  shouldForwardProp: prop => prop !== 'data',
})<{ data?: Record[] }>(({ data }) => ({
  display: 'grid',
  gridTemplateRows:
    data?.map((value: Record) => `${value.numberOfDatapoints}fr`).join(' ')
    || '',
  overflow: 'hidden',
  borderRadius: 4,
  width: 32,
}));

export const DataPointBlock = styled('div', {
  shouldForwardProp: prop =>
    prop !== 'color'
    && prop !== 'maxNumberOfDatapoints'
    && prop !== 'numberOfDatapoints',
})<{
  color?: string;
  maxNumberOfDatapoints: number;
  numberOfDatapoints: number;
}>(({ color, maxNumberOfDatapoints, numberOfDatapoints }) => ({
  backgroundColor: color,
  height: `calc(200px/${maxNumberOfDatapoints}*${numberOfDatapoints})`,
  width: '100%',
}));

export const DayName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
