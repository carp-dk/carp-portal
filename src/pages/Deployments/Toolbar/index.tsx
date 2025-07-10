import ClearIcon from '@mui/icons-material/Clear';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FormControlLabel, InputAdornment, Switch } from '@mui/material';
import { useState } from 'react';
import { StyledContainer, StyledTextField } from './styles';

type Props = {
  searchDeployments: (searchText: string) => void;
  toggleAllCards: () => void;
  isAllCardsOpen: boolean;
};

const Toolbar = ({
  searchDeployments,
  toggleAllCards,
  isAllCardsOpen,
}: Props) => {
  const [searchText, setSearchText] = useState('');
  const [showClearIcon, setShowClearIcon] = useState('none');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
    searchDeployments(event.target.value);
    setShowClearIcon(event.target.value === '' ?
      'none' :
      'flex');
  };

  const handleClear = (): void => {
    searchDeployments('');
    setSearchText('');
  };

  return (
    <StyledContainer>
      <StyledTextField
        variant="outlined"
        onChange={handleChange}
        value={searchText}
        placeholder="Search participant, ID number..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ display: showClearIcon }}
              onClick={handleClear}
            >
              <ClearIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        control={<Switch />}
        checked={isAllCardsOpen}
        label="Expand all"
        labelPlacement="start"
        onChange={toggleAllCards}
      />
    </StyledContainer>
  );
};

export default Toolbar;
