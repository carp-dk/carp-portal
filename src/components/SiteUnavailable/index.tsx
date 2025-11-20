import { v4 as uuidv4 } from 'uuid';
import { StyledDescription, StyledLink } from './styles';

type Props = {
  siteUnavailableDescription: string[];
  siteUnavailableLinkText: string;
  siteUnavailableLinkUrl: string;
};

const SiteUnavailable = ({
  siteUnavailableDescription,
  siteUnavailableLinkText,
  siteUnavailableLinkUrl,
}: Props) => {
  return (
    <>
      {siteUnavailableDescription.map((description) => (
        <StyledDescription variant="h3" key={uuidv4()}>
          {description}
        </StyledDescription>
      ))}
      <StyledLink to={siteUnavailableLinkUrl}>
        {siteUnavailableLinkText}
      </StyledLink>
    </>
  );
};

export default SiteUnavailable;
