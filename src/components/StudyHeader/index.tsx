import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import { useStudyDetails } from '@Utils/queries/studies';
import { Breadcrumbs, Skeleton } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';
import {
  Description,
  Path,
  PathContainer,
  StudyHeaderContainer,
} from './styles';

type Props = {
  description: string;
  path: { name: string; uri: string }[];
};

const StudyHeader = ({ description, path }: Props) => {
  const { id: studyId } = useParams();
  const { data: studyDetails, isLoading, error } = useStudyDetails(studyId);

  if (error) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading study details"
        error={error}
      />
    );
  }

  return (
    <StudyHeaderContainer>
      <Breadcrumbs separator={<NavigateNext />}>
        {isLoading ?
            (
              <Skeleton height="32px" width="220px" animation="wave" />
            ) :
            (
              <Path variant="h2">{studyDetails.name}</Path>
            )}
        {path.map((p) => {
          return (
            <Link
              to={p.uri}
              replace={false}
              key={p.name}
              style={{ textDecoration: 'none' }}
            >
              <Path variant="h2" section>
                {p.name}
              </Path>
            </Link>
          );
        })}
      </Breadcrumbs>
      <PathContainer />
      <Description variant="h5">{description}</Description>
    </StudyHeaderContainer>
  );
};

export default StudyHeader;
