import StyledCommitHash from './styles';

const CommitHash = () => {
  return (
    <StyledCommitHash>
      Build:
      {' '}
      <code>{import.meta.env.VITE_GIT_COMMIT}</code>
    </StyledCommitHash>
  );
};

export default CommitHash;
