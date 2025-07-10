import { Skeleton, TextField, Typography } from '@mui/material';
import { useCurrentUser } from '@Utils/queries/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  InputContainer,
  StyledCard,
  StyledFormControl,
  StyledHeader,
} from './styles';

const profileValidationSchema = yup.object({
  phoneNumber: yup.string(),
  // .required('Phone number is required'),
  affiliation: yup.string(),
  address: yup.string(),
  website: yup.string(),
});

const ProfileCardSkeleton = () => {
  return (
    <StyledCard elevation={2}>
      <StyledHeader variant="h2">Profile</StyledHeader>
      <StyledFormControl>
        <InputContainer>
          <Typography variant="h4">
            <Skeleton width={40} animation="wave" />
          </Typography>
          <Skeleton
            variant="rounded"
            width={375}
            height={56}
            animation="wave"
          />
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">
            <Skeleton width={80} animation="wave" />
          </Typography>
          <Skeleton
            variant="rounded"
            width={375}
            height={56}
            animation="wave"
          />
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">
            <Skeleton width={50} animation="wave" />
          </Typography>
          <Skeleton
            variant="rounded"
            width={375}
            height={56}
            animation="wave"
          />
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">
            <Skeleton width={66} animation="wave" />
          </Typography>
          <Skeleton
            variant="rounded"
            width={375}
            height={56}
            animation="wave"
          />
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">
            <Skeleton width={52} animation="wave" />
          </Typography>
          <Skeleton
            variant="rounded"
            width={375}
            height={56}
            animation="wave"
          />
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">
            <Skeleton width={66} animation="wave" />
          </Typography>
          <Skeleton
            variant="rounded"
            width={375}
            height={56}
            animation="wave"
          />
        </InputContainer>
      </StyledFormControl>
    </StyledCard>
  );
};

const ProfileCard = () => {
  const { data: currentUser, isLoading: currentUserIsLoading }
    = useCurrentUser();
  const profileFormik = useFormik({
    initialValues: {
      phone: '+45 12345678',
      affiliation: 'Technical University of Denmark',
      address: 'Ørsteds Pl. 345C, 2800 Kongens Lyngby',
      website: 'https://carp.cachet.dk/',
    },
    validationSchema: profileValidationSchema,
    onSubmit: (values) => {
      // setProfile.mutate({ studyId, name: values.name, description: values.description });
      // mutate profile data
      console.log(values);
    },
  });

  const handleBlur = (e) => {
    profileFormik.handleBlur(e);
    profileFormik.handleSubmit();
  };
  if (currentUserIsLoading) return <ProfileCardSkeleton />;

  return (
    <StyledCard elevation={2}>
      <StyledHeader variant="h2">Profile</StyledHeader>
      <StyledFormControl>
        <InputContainer>
          <Typography variant="h4">Role</Typography>
          <TextField
            type="text"
            name="role"
            value={currentUser?.role || ''}
            disabled
          />
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">Affiliation</Typography>
          <TextField
            type="text"
            name="affiliation"
            error={!!profileFormik.errors.affiliation}
            value={profileFormik.values.affiliation}
            onChange={profileFormik.handleChange}
            helperText={
              profileFormik.touched.affiliation
              && profileFormik.errors.affiliation
            }
            onBlur={handleBlur}
            placeholder="Affiliation"
          />
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">Email</Typography>
          <TextField
            type="text"
            name="email"
            value={currentUser?.email || ''}
            disabled
          />
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">Address</Typography>
          <TextField
            type="text"
            name="address"
            error={!!profileFormik.errors.address}
            value={profileFormik.values.address}
            onChange={profileFormik.handleChange}
            helperText={
              profileFormik.touched.address && profileFormik.errors.address
            }
            onBlur={handleBlur}
            placeholder="Address"
          />
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">Phone</Typography>
          <TextField
            type="text"
            name="phone"
            error={!!profileFormik.errors.phone}
            value={profileFormik.values.phone}
            onChange={profileFormik.handleChange}
            helperText={
              profileFormik.touched.phone && profileFormik.errors.phone
            }
            onBlur={handleBlur}
            placeholder="Phone"
          />
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">Website</Typography>
          <TextField
            type="text"
            name="website"
            error={!!profileFormik.errors.website}
            value={profileFormik.values.website}
            onChange={profileFormik.handleChange}
            helperText={
              profileFormik.touched.website && profileFormik.errors.website
            }
            onBlur={handleBlur}
            placeholder="Website"
          />
        </InputContainer>
      </StyledFormControl>
    </StyledCard>
  );
};

export default ProfileCard;
