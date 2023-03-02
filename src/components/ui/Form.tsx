import { SignInParameters, SignUpParameters } from '@/types/api.types';
import { Formik, Form as FormikForm } from 'formik';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import * as yup from 'yup';

export default function Form(props: {
  onSubmit: (values: SignInParameters | SignUpParameters) => Promise<void>;
  initialValues: SignInParameters | SignUpParameters;
  validationSchema: yup.Schema;
  children: React.ReactNode;
}) {
  return (
    <Paper component={Box} width="35%" padding={8} elevation={2}>
      <Formik
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.onSubmit}
      >
        <FormikForm>
          <Stack direction="column" spacing={4}>
            {props.children}
            <Box display="flex" justifyContent="end">
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Stack>
        </FormikForm>
      </Formik>
    </Paper>
  );
}
