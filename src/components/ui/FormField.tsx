import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { TextField } from '@mui/material';
import { useField } from 'formik';

export default function FormField(props: {
  name: string;
  label: string;
  type?: string;
}) {
  const [field, { touched, error }, { setValue }] = useField(props.name);

  if (props.type !== 'date')
    return (
      <TextField
        id={props.name}
        label={props.label}
        placeholder={props.label}
        {...field}
        type={props.type ?? 'text'}
        error={Boolean(touched && error)}
        helperText={touched && error}
      />
    );
  else
    return (
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DatePicker
          value={field.value}
          onChange={(value) => {
            setValue(value.toISO());
          }}
          renderInput={(params) => (
            <TextField
              label={props.label}
              placeholder={props.label}
              error={Boolean(touched && error)}
              helperText={touched && error}
              {...params}
            />
          )}
          disableMaskedInput
        />
      </LocalizationProvider>
    );
}
