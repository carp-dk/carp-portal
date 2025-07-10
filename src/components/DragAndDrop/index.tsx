import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import { Button, CircularProgress } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import {
  EmptyFileWrapper,
  FileNameInElipse,
  FileUploadStatus,
  UploadEllipse,
  UploadFileBox,
  UploadFileBrowse,
  UploadFileBrowseWrapper,
  UploadFileText,
} from './styles';

interface FormikConfigProps {
  [key: string]: string;
}

type Props = {
  handleChange: (event: File) => void;
  fileTypes?: string[];
  name: keyof FormikConfigProps;
  formik: FormikProps<FormikConfigProps>;
  uploading: boolean;
  fileName: string;
};

const DragAndDrop = ({
  handleChange,
  fileTypes,
  name,
  formik,
  uploading,
  fileName,
}: Props) => {
  const [fileTouched, setFileTouched] = React.useState(false);
  return (
    <FileUploader
      handleChange={(e: File) => {
        if (e !== null) setFileTouched(true);
        handleChange(e);
      }}
      name={name}
      fileTypes={fileTypes}
    >
      <UploadFileBox>
        {uploading
          ? (
              <CircularProgress />
            )
          : formik.errors[name] && fileTouched
            ? (
                <>
                  <UploadEllipse error>
                    <ClearRoundedIcon />
                    <UploadFileBrowse variant="h5">Try again</UploadFileBrowse>
                  </UploadEllipse>
                  <UploadFileText variant="h5" error>
                    {formik.errors[name]}
                  </UploadFileText>
                </>
              )
            : !formik.values[name]
                ? (
                    <>
                      {name === 'image'
                        ? (
                            <ImageIcon fontSize="large" />
                          )
                        : (
                            <UploadFileRoundedIcon fontSize="large" />
                          )}
                      <EmptyFileWrapper>
                        <UploadFileText variant="h5">
                          Drag and drop
                          {' '}
                          {name}
                          ,
                        </UploadFileText>
                        <UploadFileBrowseWrapper>
                          <UploadFileText variant="h5">or</UploadFileText>
                          <UploadFileBrowse variant="h5"> Browse</UploadFileBrowse>
                        </UploadFileBrowseWrapper>
                      </EmptyFileWrapper>
                    </>
                  )
                : (
                    <>
                      <UploadEllipse>
                        <DoneRoundedIcon />
                        <FileNameInElipse variant="h5">{fileName}</FileNameInElipse>
                        <FileUploadStatus variant="h5">Uploaded</FileUploadStatus>
                      </UploadEllipse>
                      <Button onClick={() => handleChange(null)}>Remove file</Button>
                    </>
                  )}
      </UploadFileBox>
    </FileUploader>
  );
};

export default DragAndDrop;
