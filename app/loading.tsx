import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <Box sx={{ bgcolor: 'black', display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Box sx={{ paddingBottom: '1rem' }}>
        <Typography variant="h4" sx={{ color: 'white', marginBottom: '0.75rem' }}>Just give us a second.</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    </Box>
  );
}