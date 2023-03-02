import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function DisplayInfo(props: {
  label: string;
  value: string | number;
}) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h6">{props.label}</Typography>
      <Typography variant="h6" fontWeight="normal">
        {props.value}
      </Typography>
    </Box>
  );
}
