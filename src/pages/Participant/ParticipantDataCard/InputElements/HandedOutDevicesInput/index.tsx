import { Add, Delete } from '@mui/icons-material';
import { Button, Card, FormControl, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
import { getIn, useFormik } from 'formik';

type Props = {
  formik: ReturnType<typeof useFormik>;
  editing: boolean;
};

const HandedOutDevicesInput = ({ formik, editing }: Props) => {
  console.log('Rendering HandedOutDevicesInput with values:', formik);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <FormControl fullWidth>
        <Stack direction="column" gap={2}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              alignSelf: 'end',
              maxWidth: '40px',
              minWidth: '40px',
              maxHeight: '40px',
              minHeight: '40px',
              padding: 0,
            }}
            onClick={() => {
              const devices = formik.values.handed_out_device.devices || [];
              formik.setFieldValue('handed_out_device.devices', [
                ...devices,
                { deviceId: '', deviceModel: '' },
              ]);
            }}
            disabled={!editing}
          >
            <Add fontSize="medium" />
          </Button>
          {(formik.values.handed_out_device?.devices as any[])
            // HandedOutDeviceType.Device[]
            ?.map((_, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{ padding: 2, borderRadius: 2 }}
                elevation={10}
              >
                <Stack direction="column" gap={1}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      alignSelf: 'end',
                      maxWidth: '40px',
                      minWidth: '40px',
                      maxHeight: '40px',
                      minHeight: '40px',
                      padding: 0,
                    }}
                    disabled={!editing}
                    onClick={() => {
                      const devices =
                        formik.values.handed_out_device.devices || [];
                      const updated = devices.filter((_, i) => i !== index);

                      formik.setFieldValue(
                        'handed_out_device.devices',
                        updated,
                      );
                    }}
                  >
                    <Delete fontSize="medium" />
                  </Button>
                  <Stack direction="row" gap={1}>
                    <TextField
                      fullWidth
                      required
                      label="Device ID"
                      name={`handed_out_device.devices.${index}.deviceId`}
                      value={
                        getIn(
                          formik.values,
                          `handed_out_device.devices.${index}.deviceId`,
                        ) || ''
                      }
                      onChange={formik.handleChange}
                      error={
                        getIn(
                          formik.touched,
                          `handed_out_device.devices.${index}.deviceId`,
                        ) &&
                        !!getIn(
                          formik.errors,
                          `handed_out_device.devices.${index}.deviceId`,
                        )
                      }
                      helperText={
                        getIn(
                          formik.touched,
                          `handed_out_device.devices.${index}.deviceId`,
                        ) &&
                        getIn(
                          formik.errors,
                          `handed_out_device.devices.${index}.deviceId`,
                        )
                      }
                      disabled={!editing}
                    />
                    <TextField
                      fullWidth
                      label="Device Model"
                      name={`handed_out_device.devices.${index}.deviceModel`}
                      value={
                        getIn(
                          formik.values,
                          `handed_out_device.devices.${index}.deviceModel`,
                        ) || ''
                      }
                      onChange={formik.handleChange}
                      disabled={!editing}
                    />
                  </Stack>
                  <DatePicker
                    disabled={!editing}
                    label="Handed Out At"
                    name={`handed_out_device.devices.${index}.handedOutAt`}
                    value={
                      getIn(
                        formik.values,
                        `handed_out_device.devices.${index}.handedOutAt`,
                      )
                        ? new Date(
                            getIn(
                              formik.values,
                              `handed_out_device.devices.${index}.handedOutAt`,
                            ),
                          )
                        : null
                    }
                    onChange={(value) =>
                      formik.setFieldValue(
                        `handed_out_device.devices.${index}.handedOutAt`,
                        value,
                      )
                    }
                    slotProps={{
                      actionBar: {
                        actions: ['clear'],
                      },
                      textField: {
                        name: `handed_out_device.devices.${index}.handedOutAtText`,
                        error:
                          getIn(
                            formik.touched,
                            `handed_out_device.devices.${index}.handedOutAt`,
                          ) &&
                          !!getIn(
                            formik.errors,
                            `handed_out_device.devices.${index}.handedOutAt`,
                          ),
                        helperText:
                          getIn(
                            formik.touched,
                            `handed_out_device.devices.${index}.handedOutAt`,
                          ) &&
                          getIn(
                            formik.errors,
                            `handed_out_device.devices.${index}.handedOutAt`,
                          ),
                        onBlur: formik.handleBlur,
                        fullWidth: true,
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Notes"
                    name={`handed_out_device.devices.${index}.notes`}
                    value={
                      getIn(
                        formik.values,
                        `handed_out_device.devices.${index}.notes`,
                      ) || ''
                    }
                    onChange={formik.handleChange}
                    disabled={!editing}
                    multiline
                    minRows={2}
                  />
                </Stack>
              </Card>
            ))}
        </Stack>
      </FormControl>
    </LocalizationProvider>
  );
};

export default HandedOutDevicesInput;
