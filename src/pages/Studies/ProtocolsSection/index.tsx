import { useNavigate } from 'react-router-dom';
import { CardDescription, CardTitle, CardWrapper, StyledCard } from './styles';

const ProtocolsSection = () => {
  const navigate = useNavigate();
  return (
    <CardWrapper elevation={0} onClick={() => navigate('/protocols')}>
      <StyledCard>
        <CardTitle variant="h2">Protocols</CardTitle>
        <CardDescription variant="body2">
          Explore created protocols and see an overview of latest versions
        </CardDescription>
      </StyledCard>
    </CardWrapper>
  );
};

export default ProtocolsSection;
