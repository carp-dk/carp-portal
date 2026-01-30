import { FormControl, TextField } from '@mui/material';
import { getIn, useFormik } from 'formik';

type Props = {
  formik: ReturnType<typeof useFormik>;
  editing: boolean;
};

const NoteInput = ({ formik, editing }: Props) => {
  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        multiline
        minRows={4}
        maxRows={10}
        label="Participant Note"
        name="note.note"
        value={getIn(formik.values, 'note.note') || ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={!editing}
        error={
          getIn(formik.touched, 'note.note') &&
          Boolean(getIn(formik.errors, 'note.note'))
        }
        helperText={
          getIn(formik.touched, 'note.note') &&
          getIn(formik.errors, 'note.note')
        }
      />
    </FormControl>
  );
};

export default NoteInput;
