import { getDeploymentStatusColor } from '@Utils/utility';
import ClearIcon from '@mui/icons-material/Clear';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { StyledContainer, StyledSelect, StyledTextField } from './styles';

const statusOptions = [
  { value: 'Invited', label: 'Invited' },
  { value: 'DeployingDevices', label: 'Deploying' },
  { value: 'Running', label: 'Running' },
  { value: 'Stopped', label: 'Stopped' },
];

type Props = {
  searchDeployments: (searchText: string) => void;
  filterDeploymentsByStatus: (status: string) => void;
  selectedStatus: string;
  toggleAllCards: () => void;
  isAllCardsOpen: boolean;
};

const Toolbar = ({
  searchDeployments,
  filterDeploymentsByStatus,
  selectedStatus,
  toggleAllCards,
  isAllCardsOpen,
}: Props) => {
  const [searchText, setSearchText] = useState('');
  const [showClearIcon, setShowClearIcon] = useState('none');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
    searchDeployments(event.target.value);
    setShowClearIcon(event.target.value === '' ? 'none' : 'flex');
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
        slotProps={{
          input: {
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
          },
        }}
      />
      <StyledSelect
        value={selectedStatus}
        slotProps={{ input: { 'aria-label': 'Filter deployments by status' } }}
        onChange={(event) =>
          filterDeploymentsByStatus(event.target.value as string)
        }
        renderValue={(value) => {
          const selectedOption = statusOptions.find(
            (status) => status.value === value,
          );

          return (
            <Typography
              variant="h5"
              sx={{
                color:
                  value === 'all'
                    ? 'text.primary'
                    : getDeploymentStatusColor(value as string),
              }}
            >
              {selectedOption?.label ?? 'All statuses'}
            </Typography>
          );
        }}
      >
        <MenuItem value="all">
          <Typography variant="h5" color="text.primary">
            All statuses
          </Typography>
        </MenuItem>
        {statusOptions.map((status) => (
          <MenuItem key={status.value} value={status.value}>
            <Typography
              variant="h5"
              sx={{ color: getDeploymentStatusColor(status.value) }}
            >
              {status.label}
            </Typography>
          </MenuItem>
        ))}
      </StyledSelect>
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
