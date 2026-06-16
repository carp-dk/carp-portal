import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import {
  useGetByVersion,
  useGetVersionHistory,
  useProtocols,
} from '@Utils/queries/protocols';
import {
  useSetStudyDetails,
  useSetStudyProtocol,
  useStudyDetails,
  useStudyStatus,
} from '@Utils/queries/studies';
import { formatDateTime, getProtocolVersionTag } from '@Utils/utility';
import LinkIcon from '@mui/icons-material/Link';
import {
  Alert,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import * as yup from 'yup';
import StudySetupSkeleton from '../StudySetupSkeleton';
import {
  Heading,
  ProtocolInformation,
  StyledCard,
  Subheading,
} from '../styles';

const studyDetailsValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string(),
});

const studyProtocolValidationSchema = yup.object({
  protocolId: yup.string(),
});

const StudyData = () => {
  const { id: studyId } = useParams();
  const navigate = useNavigate();

  const {
    data: studyDetails,
    isLoading: studyDetailsLoading,
    error: studyDetailsError,
  } = useStudyDetails(studyId);

  const studyDetailsFormik = useFormik({
    initialValues: {
      name: studyDetails?.name ?? '',
      description: studyDetails?.description ?? '',
    },
    validationSchema: studyDetailsValidationSchema,
    onSubmit: (values) => {
      setStudyDetails.mutate({
        studyId,
        name: values.name,
        description: values.description,
      });
    },
  });

  const {
    data: protocols,
    isLoading: protocolsLoading,
    error: protocolsError,
  } = useProtocols();

  const {
    data: studyStatus,
    isLoading: studyStatusIsLoading,
    error: studyStatusError,
  } = useStudyStatus(studyId);

  const studyProtocolFormik = useFormik({
    initialValues: {
      protocolId: studyDetails?.protocolSnapshot?.id ?? '',
      protocolVersion: getProtocolVersionTag(
        studyDetails?.protocolSnapshot?.applicationData,
      ),
    },
    validationSchema: studyProtocolValidationSchema,
    onSubmit: async (values) => {
      if (values.protocolVersion == null) return;
      if (protocolDetailsIsLoading) {
        protocolDetailsPromise.then((value) => {
          let oldApplicationData = JSON.parse(value.applicationData);
          oldApplicationData = {
            ...oldApplicationData,
            protocolVersionTag: values.protocolVersion,
          };
          //@ts-expect-error applicationData is not read-only, but the type definition says it is
          value.applicationData = JSON.stringify(oldApplicationData);
          setStudyProtocol.mutate({
            studyId,
            protocol: value,
          });
        });
      } else {
        let oldApplicationData = JSON.parse(protocolDetails.applicationData);
        oldApplicationData = {
          ...oldApplicationData,
          protocolVersionTag: values.protocolVersion,
        };
        //@ts-expect-error applicationData is not read-only, but the type definition says it is
        protocolDetails.applicationData = JSON.stringify(oldApplicationData);
        setStudyProtocol.mutate({
          studyId,
          protocol: protocolDetails,
        });
      }
    },
  });

  const { data: protocolVersions, isLoading: protocolVersionsLoading } =
    useGetVersionHistory(studyProtocolFormik.values.protocolId.toString());

  const {
    data: protocolDetails,
    isLoading: protocolDetailsIsLoading,
    promise: protocolDetailsPromise,
  } = useGetByVersion(
    studyProtocolFormik.values.protocolId.toString(),
    studyProtocolFormik.values.protocolVersion,
  );

  const setStudyProtocol = useSetStudyProtocol();
  const setStudyDetails = useSetStudyDetails();

  const handleDetailsBlur = (e) => {
    studyDetailsFormik.handleBlur(e);
    studyDetailsFormik.handleSubmit();
  };

  if (
    studyDetailsLoading ||
    protocolsLoading ||
    studyStatusIsLoading ||
    protocolDetailsIsLoading ||
    protocolVersionsLoading
  )
    return <StudySetupSkeleton />;

  if (studyDetailsError || protocolsError || studyStatusError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading study details"
        error={studyStatusError ?? studyDetailsError ?? protocolsError}
      />
    );
  }

  const isProtocolSelectorEnabled = protocols && protocols.length > 0;
  const assignedProtocolVersion = getProtocolVersionTag(
    studyDetails.protocolSnapshot?.applicationData,
  );
  const assignedProtocolVersionQuery = assignedProtocolVersion
    ? `?${new URLSearchParams({ version: assignedProtocolVersion })}`
    : '';
  const protocolDetailsPath = studyDetails.protocolSnapshot
    ? `/protocols/${studyDetails.protocolSnapshot.id.stringRepresentation}${assignedProtocolVersionQuery}`
    : null;

  if (
    studyProtocolFormik.values.protocolId &&
    !studyProtocolFormik.values.protocolVersion
  ) {
    if (studyStatus.canSetStudyProtocol) {
      // TODO: d14() should be toEpochMilliseconds() when the core is fixed to return the correct type
      studyProtocolFormik.setFieldValue(
        'protocolVersion',
        protocolVersions.toSorted((a, b) => b.date.d14() - a.date.d14())[0].tag,
      );
      studyProtocolFormik.submitForm();
    }
  }
  return (
    <StyledCard elevation={2}>
      <Heading variant="h2">Study Data</Heading>
      <Subheading variant="h6">
        In order to go live you need to fill out all the required data.
      </Subheading>
      <FormLabel required>Name</FormLabel>
      <TextField
        variant="outlined"
        fullWidth
        error={!!studyDetailsFormik.errors.name}
        name="name"
        value={studyDetailsFormik.values.name}
        onChange={studyDetailsFormik.handleChange}
        helperText={
          studyDetailsFormik.touched.name && studyDetailsFormik.errors.name
        }
        onBlur={handleDetailsBlur}
      />
      <FormLabel>Description</FormLabel>
      <TextField
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        error={!!studyDetailsFormik.errors.description}
        name="description"
        value={studyDetailsFormik.values.description}
        onChange={studyDetailsFormik.handleChange}
        helperText={
          studyDetailsFormik.touched.description &&
          studyDetailsFormik.errors.description
        }
        onBlur={handleDetailsBlur}
      />
      <Stack
        spacing={2}
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '16px 0 8px 0',
        }}
      >
        <FormLabel disabled={!studyStatus.canSetStudyProtocol} required>
          Protocol
        </FormLabel>
        {protocolDetailsPath && (
          <ProtocolInformation
            variant="outlined"
            endIcon={<LinkIcon />}
            onClick={() =>
              navigate(protocolDetailsPath, {
                state: {
                  returnTo: `/studies/${studyId}/settings`,
                },
              })
            }
          >
            View protocol details
          </ProtocolInformation>
        )}
      </Stack>
      {!isProtocolSelectorEnabled || !studyStatus.canSetStudyProtocol ? (
        <TextField
          variant="outlined"
          fullWidth
          disabled
          sx={{ marginBottom: '8px' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ display: 'flex', width: '60%' }}
                >
                  <Typography noWrap>
                    {studyDetails.protocolSnapshot?.name +
                      ' (' +
                      (getProtocolVersionTag(
                        studyDetails.protocolSnapshot?.applicationData,
                      ) ?? 'latest') +
                      ')'}
                  </Typography>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" sx={{ width: '35%' }}>
                  <Typography variant="caption">
                    {/** TODO: This should be toEpochMilliseconds */}
                    {studyDetails.protocolSnapshot
                      ? formatDateTime(
                          studyDetails.protocolSnapshot?.createdOn.d14(),
                        )
                      : ''}
                  </Typography>
                </InputAdornment>
              ),
            },
          }}
        />
      ) : (
        <Stack direction={'column'} spacing={1}>
          <Select
            variant="outlined"
            fullWidth
            error={!!studyProtocolFormik.errors.protocolId}
            name="protocolId"
            value={studyProtocolFormik.values.protocolId}
            onChange={(e) => {
              studyProtocolFormik.handleChange(e);
              studyProtocolFormik.setFieldValue('protocolVersion', null);
              studyProtocolFormik.handleSubmit();
            }}
            MenuProps={{
              slotProps: {
                paper: {
                  sx: {
                    maxHeight: 400,
                  },
                },
              },
            }}
          >
            {/** TODO: This should be toEpochMilliseconds */}
            {protocols
              .toSorted((a, b) => b.createdOn.d14() - a.createdOn.d14())
              .map((protocol) => (
                <MenuItem
                  key={protocol.id.stringRepresentation}
                  value={protocol.id.stringRepresentation}
                >
                  <Stack
                    direction="row"
                    sx={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    spacing={2}
                  >
                    <Typography sx={{ width: '65%' }} noWrap>
                      {protocol.name}
                    </Typography>
                    <Typography variant="caption">
                      {/** TODO: This should be toEpochMilliseconds */}
                      {formatDateTime(protocol.createdOn.d14())}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
          </Select>
          {protocolVersions && (
            <Select
              variant="outlined"
              fullWidth
              error={!!studyProtocolFormik.errors.protocolVersion}
              name="protocolVersion"
              value={studyProtocolFormik.values.protocolVersion ?? ''}
              onChange={(e) => {
                studyProtocolFormik.handleChange(e);
                studyProtocolFormik.handleSubmit();
              }}
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: {
                      maxHeight: 400,
                    },
                  },
                },
              }}
            >
              {/** TODO: This should be toEpochMilliseconds */}
              {protocolVersions
                .toSorted((a, b) => b.date.d14() - a.date.d14())
                .map((protocolVersion) => (
                  <MenuItem
                    key={protocolVersion.tag}
                    value={protocolVersion.tag}
                  >
                    <Typography>{protocolVersion.tag}</Typography>
                  </MenuItem>
                ))}
            </Select>
          )}
          {/** TODO: This should be toEpochMilliseconds */}
          {studyStatus.canSetStudyProtocol &&
            protocolVersions &&
            studyProtocolFormik.values.protocolVersion &&
            studyProtocolFormik.values.protocolVersion !==
              protocolVersions
                .toSorted((a, b) => b.date.d14() - a.date.d14())
                .at(0)?.tag && (
              <Alert severity="warning" sx={{ borderRadius: 2 }}>
                The selected protocol version is not the latest.
              </Alert>
            )}
        </Stack>
      )}
    </StyledCard>
  );
};

export default StudyData;
