import { getDataColor, getMaxDatapoints } from '@Utils/utility';
import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  DataPointBlock,
  DayName,
  NumberOfDatapoints,
  SingleDayContainer,
  StyledContainer,
} from './styles';

export type Record = {
  type: string;
  numberOfDatapoints: number;
};

export type Day = {
  name: string;
  data: Record[];
};

type Props = {
  data: Day[];
};

const RecentDataChart = ({ data }: Props) => {
  const maxNumberOfDatapoints = getMaxDatapoints(data);
  return (
    <StyledContainer>
      {data.map((day) => {
        const totalNumberOfDatapoints = day.data.reduce(
          (a: number, b: Record) => a + b.numberOfDatapoints,
          0,
        );
        return (
          <SingleDayContainer key={uuidv4()}>
            <NumberOfDatapoints
              highest={totalNumberOfDatapoints === maxNumberOfDatapoints}
            >
              {totalNumberOfDatapoints}
            </NumberOfDatapoints>
            <Column data={day.data}>
              {day.data.map((dataPoint) => {
                return (
                  <DataPointBlock
                    key={uuidv4()}
                    color={getDataColor(dataPoint.type)}
                    numberOfDatapoints={dataPoint.numberOfDatapoints}
                    maxNumberOfDatapoints={maxNumberOfDatapoints}
                  />
                );
              })}
            </Column>
            <DayName>{day.name}</DayName>
          </SingleDayContainer>
        );
      })}
    </StyledContainer>
  );
};

export default RecentDataChart;
