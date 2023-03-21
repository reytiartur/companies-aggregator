import { CircularProgress, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#28a175',
    },
  },
});

const Loader = () => {
  return (
    <div className="h-screen col-span-full flex flex-col justify-center items-center" key={'loader'}>
        <ThemeProvider theme={theme}>
            <CircularProgress color='primary' size={120} thickness={7} />
        </ThemeProvider>
        <p className="text-xl font-medium text-secondary text-center mt-8 mb-40">
            Loading companies list...
        </p>
    </div>
  )
}

export default Loader