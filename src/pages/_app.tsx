import {
  AppBar,
  Box,
  Container,
  createStyles,
  CssBaseline,
  IconButton,
  makeStyles,

  ThemeProvider,
  Toolbar,
  Typography
} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useState } from 'react';
import { darkTheme, lightTheme } from '../theme';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

export default function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();
  const [theme, setTheme] = useState(darkTheme);
  const isDarkTheme = theme === darkTheme;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Multiple File Upload</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h6" className={classes.title}>
              Multiple File Upload
            </Typography>

            <IconButton
              aria-label={
                isDarkTheme ? 'Change to Light Theme' : 'Change to Dark Theme'
              }
              onClick={() => {
                const newTheme = isDarkTheme ? lightTheme : darkTheme;
                setTheme(newTheme);
              }}
            >
              {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container>
          <Box marginTop={10}>
            <Component {...pageProps} />
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
