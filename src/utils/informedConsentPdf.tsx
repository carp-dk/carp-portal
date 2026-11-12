// Kept out of utility.tsx and loaded with a dynamic import, so the large PDF
// renderer is only downloaded when someone downloads an informed consent.
import {
  Document,
  Font,
  Page,
  pdf,
  Image as PdfImage,
  StyleSheet,
  Text,
} from '@react-pdf/renderer';
import { formatDateTime } from '@Utils/utility';
import TimesItalics from 'src/assets/fonts/Times-Italic Regular.ttf';

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

const convertByteArrayToImage = async (byteArray: number[]) => {
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

const convertICToReactPdf = async (consent: ConsentObject) => {
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
        <Text style={styles.signatureName}>
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
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export const informedConsentToPdfBlob = async (consent: ConsentObject) =>
  pdf(await convertICToReactPdf(consent)).toBlob();
