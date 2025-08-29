import ecgHeartIcon from '@Assets/images/ecg_heart.png';
import ecgHeartIconBlue from '@Assets/images/ecg_heart_blue.png';
import { Day, Record } from '@Components/RecentDataChart';
import { customPalette as palette } from '@Utils/theme';
import {
  DefaultSerializer,
  getSerializer,
  Json,
  StudyProtocolSnapshot,
} from '@carp-dk/client';
import AirRoundedIcon from '@mui/icons-material/AirRounded';
import CloudIcon from '@mui/icons-material/Cloud';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import HearingRoundedIcon from '@mui/icons-material/HearingRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import PublicIcon from '@mui/icons-material/Public';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import WatchRoundedIcon from '@mui/icons-material/WatchRounded';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Image as PdfImage,
  Font,
} from '@react-pdf/renderer';
import { useParams } from 'react-router';
import TimesItalics from 'src/assets/fonts/Times-Italic Regular.ttf';

const dataLegendColors = {
  activity: '#245B78',
  airquality: '#B26101',
  ambientlight: '#374953',
  batterystate: '#BA1A1A',
  coverage: '#D6E8F4',
  deviceinformation: '#67587A',
  freememory: '#76777A',
  location: '#D61D41',
  screenevent: '#A61A41',
  stepcount: '#A7517A',
  triggeredtask: '#1A111A',
};

export const calculateDaysPassedFromDate = (dateString: string) => {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - givenDate.getTime();
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysPassed;
};

export const formatDateTime = (
  dateString: number | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
) => {
  const date = new Date(dateString);
  return `${date.toLocaleString('en-US', options)}`;
};

export const formatDate = (dateString: number | string) => {
  const date = new Date(dateString);
  let formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  if (date.getFullYear() !== new Date().getFullYear()) {
    const year = date.toLocaleString('en-US', { year: 'numeric' });
    formattedDate += ` ${year}`;
  }
  return formattedDate;
};

export const msToDays = (ms: number) => Math.floor(ms / (1000 * 60 * 60 * 24));

export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const getDeviceIcon = (deviceType: string, isBlue?: boolean) => {
  switch (deviceType) {
    case 'dk.cachet.carp.common.application.devices.Button':
      return (
        <RadioButtonCheckedIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    case 'dk.cachet.carp.common.application.devices.EmbracePlus':
      return (
        <WatchRoundedIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    case 'dk.cachet.carp.common.application.devices.Sens':
      return (
        <TimelineRoundedIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    case 'dk.cachet.carp.common.application.devices.HealthService':
      return (
        <HealthAndSafetyRoundedIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    case 'dk.cachet.carp.common.application.devices.MovesenseDevice':
      return isBlue ?
          (
            <img
              src={ecgHeartIconBlue}
              width="20px"
              height="20px"
              alt="heart icon"
            />
          ) :
          (
            <img src={ecgHeartIcon} width="20px" height="20px" alt="heart icon" />
          );
    case 'dk.cachet.carp.common.application.devices.Smartphone':
      return <SmartphoneIcon color="inherit" fontSize="small" />;
    case 'dk.cachet.carp.common.application.devices.PersonalComputer':
      return (
        <ComputerRoundedIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    case 'dk.cachet.carp.common.application.devices.LocationService':
      return (
        <LocationOnIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    case 'dk.cachet.carp.common.application.devices.WeatherService':
      return (
        <CloudIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    case 'dk.cachet.carp.common.application.devices.AirQualityService':
      return (
        <AirRoundedIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    case 'dk.cachet.carp.common.application.devices.ESenseDevice':
      return (
        <HearingRoundedIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    case 'dk.cachet.carp.common.application.devices.PolarDevice':
      return (
        <MonitorHeartOutlinedIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    case 'dk.cachet.carp.common.application.devices.WebBrowser':
      return (
        <PublicIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
    default:
      return (
        <DeviceHubIcon
          color={isBlue ?
            'primary' :
            'inherit'}
          fontSize="small"
        />
      );
  }
};

export const getDataColor = (dataType: string) => {
  switch (dataType) {
    case 'activity':
      return dataLegendColors.activity;
    case 'airquality':
      return dataLegendColors.airquality;
    case 'ambientlight':
      return dataLegendColors.ambientlight;
    case 'batterystate':
      return dataLegendColors.batterystate;
    case 'coverage':
      return dataLegendColors.coverage;
    case 'deviceinformation':
      return dataLegendColors.deviceinformation;
    case 'freememory':
      return dataLegendColors.freememory;
    case 'location':
      return dataLegendColors.location;
    case 'screenevent':
      return dataLegendColors.screenevent;
    case 'stepcount':
      return dataLegendColors.stepcount;
    case 'triggeredtask':
      return dataLegendColors.triggeredtask;
    default:
      return '#000000';
  }
};

export const getDeviceStatusColor = (deviceStatus: string) => {
  switch (deviceStatus) {
    case 'Registered':
      return palette.status.yellow;
    case 'Unregistered':
      return palette.status.purple;
    case 'Deployed':
      return palette.status.green;
    case 'NeedsRedeployment':
      return palette.status.red;
    default:
      return '#000000';
  }
};

export const getDeploymentStatusColor = (deploymentStatus: string) => {
  switch (deploymentStatus) {
    case 'Invited':
      return palette.status.yellow;
    case 'Running':
      return palette.status.green;
    case 'Stopped':
      return palette.status.grey;
    case 'DeployingDevices':
      return palette.status.blue;
    default:
      return '#000000';
  }
};

export const getSummaryStatusColor = (deploymentStatus: string) => {
  switch (deploymentStatus) {
    case 'AVAILABLE':
      return palette.status.green;
    case 'IN_PROGRESS':
      return palette.status.yellow;
    case 'ERROR':
      return palette.status.red;
    default:
      return '#000000';
  }
};

export const getStudyStatusColor = (studyStatus: string) => {
  switch (studyStatus) {
    case 'Ready':
      return palette.status.yellow;
    case 'Live':
      return palette.status.green;
    case 'Draft':
      return palette.status.purple;
    default:
      return '#000000';
  }
};

export const getMaxDatapoints = (days?: Day[]): number => {
  if (!days) return 0;
  return Math.max(
    ...days.map((day) =>
      day.data.reduce((a: number, b: Record) => a + b.numberOfDatapoints, 0),
    ),
  );
};

export const downloadProtocolAsJSONFile = (protocol: StudyProtocolSnapshot) => {
  const json: Json = DefaultSerializer;
  const serializer = getSerializer(StudyProtocolSnapshot);
  const jsonToDownload = json.encodeToString(serializer, protocol);
  const file = new Blob([jsonToDownload], {
    type: 'application/json',
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = `${protocol.name}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getParticipantDataName = (dataType: string) => {
  switch (dataType) {
    case 'dk.cachet.carp.input.sex':
      return 'Biological sex';
    case 'dk.cachet.carp.input.consent':
      return 'Informed Consent';
    case 'dk.cachet.carp.input.name':
      return 'Full name';
    case 'dk.cachet.carp.input.address':
      return 'Full address';
    case 'dk.cachet.carp.input.diagnosis':
      return 'Diagnosis (ICD-11)';
    case 'dk.cachet.carp.input.ssn':
      return 'Social Security Number';
    default:
      return '';
  }
};

interface ConsentObject {
  __type: string;
  identifier: string;
  endDate: string;
  consentDocument: ConsentDocument;
  signature: Signature;
}

interface Signature {
  __type: string;
  firstName: string;
  lastName: string;
  signatureImage: string;
}

interface SignatureMetaData {
  __type: string;
  identifier: string;
  requiresName: boolean;
  requiresSignatureImage: boolean;
}

interface ConsentDocument {
  __type: string;
  title: string;
  signatures: SignatureMetaData[];
  sections: Section[];
}

interface DataTypeSection {
  __type: string;
  dataName: string;
  dataInformation: string;
}

interface Section {
  __type: string;
  type: string;
  title: string;
  summary: string;
  content: string;
  dataTypes: DataTypeSection[];
}

Font.register({
  family: 'Times-Italic',
  src: TimesItalics,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  h1: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 700,
    margin: 12,
  },
  h2: {
    fontSize: 18,
    fontWeight: 500,
    margin: '12 12 0 12',
  },
  h3: {
    fontSize: 14,
    fontWeight: 400,
    margin: '12 12 0 12',
  },
  text: {
    margin: '0 12 12 12',
    fontSize: 12,
    textAlign: 'justify',
    fontWeight: 300,
  },
  italics: {
    textAlign: 'justify',
    margin: '12 12 0 12',
    fontSize: 12,
    fontFamily: 'Times-Italic',
  },
  date: {
    margin: '0 12 12 12',
    fontSize: 12,
    textAlign: 'justify',
    fontWeight: 300,
  },
  signatureName: {
    margin: '6 12 6 12',
    fontSize: 12,
    textAlign: 'justify',
    fontWeight: 300,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export const convertByteArrayToImage = async (byteArray: number[]) => {
  const imageByteArray = new Uint8Array(byteArray);
  const imageBlob = new Blob([imageByteArray], { type: 'image/png' });
  const imageBitmap = await createImageBitmap(imageBlob);

  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;

  const ctx = canvas.getContext('2d');

  ctx.drawImage(imageBitmap, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
  }
  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL('image/png');
};

export const convertICToReactPdf = async (consent: ConsentObject) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.h1}>{consent.consentDocument.title}</Text>
        {consent.consentDocument.sections.map((section) => {
          return (
            <div key={section.type}>
              <Text style={styles.h2}>{section.title}</Text>
              <Text style={styles.italics}>
                {section.summary.replaceAll('\n', ' ')}
              </Text>
              <Text style={styles.text}>{section.content}</Text>
              {section.dataTypes &&
                section.dataTypes.map((dataType) => {
                  return (
                    <div key={dataType.dataName}>
                      <Text style={styles.h3}>{dataType.dataName}</Text>
                      <Text style={styles.text}>
                        {dataType.dataInformation}
                      </Text>
                    </div>
                  );
                })}
            </div>
          );
        })}
        <PdfImage
          style={{ width: 150, marginLeft: 12, marginTop: 50 }}
          src={await convertByteArrayToImage(
            JSON.parse(consent.signature.signatureImage),
          )}
        />
        <Text
          style={styles.signatureName}
        >
          {`${consent.signature.firstName} ${consent.signature.lastName}`}
        </Text>
        <Text style={styles.date}>
          {formatDateTime(consent.endDate, {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          })}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};

export enum PageType {
  OVERVIEW,
  SETTINGS,
  PROTOCOL,
  RESOURCES,
  TRANSLATION,
  PARTICIPANTS,
  PARTICIPANT,
  DEPLOYMENTS,
  DEPLOYMENT,
  ANNOUNCEMENTS,
  EDIT_ANNOUNCEMENT,
  EXPORTS,
}

export const getUri = (pageType: PageType) => {
  const { id: studyId, deploymentId, participantId } = useParams();

  switch (pageType) {
    case PageType.OVERVIEW:
      return `/studies/${studyId}/overview`;
    case PageType.SETTINGS:
      return `/studies/${studyId}/settings`;
    case PageType.PROTOCOL:
      return `/studies/${studyId}/protocol`;
    case PageType.RESOURCES:
      return `/studies/${studyId}/resources`;
    case PageType.TRANSLATION:
      return `/studies/${studyId}/translations`;
    case PageType.PARTICIPANTS:
      return `/studies/${studyId}/participants`;
    case PageType.PARTICIPANT:
      return `/studies/${studyId}/deployments/${deploymentId}/participants/${participantId}`;
    case PageType.DEPLOYMENTS:
      return `/studies/${studyId}/deployments`;
    case PageType.DEPLOYMENT:
      return `/studies/${studyId}/deployments/${deploymentId}`;
    case PageType.ANNOUNCEMENTS:
      return `/studies/${studyId}/announcements`;
    case PageType.EDIT_ANNOUNCEMENT:
      return `/studies/${studyId}/announcements/new`;
    case PageType.EXPORTS:
      return `/studies/${studyId}/exports`;
    default:

      console.error('Unknown page type');
      return '/';
  }
};
