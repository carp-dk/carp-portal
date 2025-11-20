import RecentDataChart from '@Components/RecentDataChart';
import { StyledCard, Subtitle, Title, TitleContainer, Top } from './styles';

const data = [
  {
    name: 'Mon.',
    data: [
      {
        type: 'activity',
        numberOfDatapoints: 12,
      },
      {
        type: 'airquality',
        numberOfDatapoints: 30,
      },
      {
        type: 'ambientlight',
        numberOfDatapoints: 20,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'batterystate',
        numberOfDatapoints: 50,
      },
      {
        type: 'freememory',
        numberOfDatapoints: 40,
      },
      {
        type: 'deviceinformation',
        numberOfDatapoints: 20,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'activity',
        numberOfDatapoints: 25,
      },
      {
        type: 'coverage',
        numberOfDatapoints: 64,
      },
      {
        type: 'batterystate',
        numberOfDatapoints: 14,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'activity',
        numberOfDatapoints: 63,
      },
      {
        type: 'coverage',
        numberOfDatapoints: 23,
      },
      {
        type: 'deviceinformation',
        numberOfDatapoints: 12,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'activity',
        numberOfDatapoints: 34,
      },
      {
        type: 'batterystate',
        numberOfDatapoints: 66,
      },
      {
        type: 'deviceinformation',
        numberOfDatapoints: 22,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'activity',
        numberOfDatapoints: 15,
      },
      {
        type: 'coverage',
        numberOfDatapoints: 23,
      },
      {
        type: 'deviceinformation',
        numberOfDatapoints: 52,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'airquality',
        numberOfDatapoints: 5,
      },
      {
        type: 'freememory',
        numberOfDatapoints: 34,
      },
      {
        type: 'deviceinformation',
        numberOfDatapoints: 11,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'freememory',
        numberOfDatapoints: 54,
      },
      {
        type: 'coverage',
        numberOfDatapoints: 33,
      },
      {
        type: 'deviceinformation',
        numberOfDatapoints: 26,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'activity',
        numberOfDatapoints: 27,
      },
      {
        type: 'coverage',
        numberOfDatapoints: 27,
      },
      {
        type: 'airquality',
        numberOfDatapoints: 9,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'airquality',
        numberOfDatapoints: 24,
      },
      {
        type: 'freememory',
        numberOfDatapoints: 15,
      },
      {
        type: 'deviceinformation',
        numberOfDatapoints: 44,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'freememory',
        numberOfDatapoints: 22,
      },
      {
        type: 'coverage',
        numberOfDatapoints: 40,
      },
      {
        type: 'deviceinformation',
        numberOfDatapoints: 62,
      },
    ],
  },
  {
    name: 'Tue.',
    data: [
      {
        type: 'activity',
        numberOfDatapoints: 14,
      },
      {
        type: 'airquality',
        numberOfDatapoints: 33,
      },
      {
        type: 'batterystate',
        numberOfDatapoints: 22,
      },
    ],
  },
];

const RecentData = () => {
  return (
    <StyledCard elevation={2}>
      <Top>
        <TitleContainer>
          <Title variant="h4">Recent Data</Title>
          <Subtitle variant="h6">
            See the overview of the two last weeks data
          </Subtitle>
        </TitleContainer>
      </Top>
      <RecentDataChart data={data} />
    </StyledCard>
  );
};

export default RecentData;
