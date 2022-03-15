import '../styles/globals.css'
import {createTheme,ThemeProvider} from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(229,88,75)"
    },
    secondary: {
      main: "#E8E376"
    }
  }
})

function MyApp({ Component, pageProps }) {

  return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>

}

export default MyApp
