import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './Redux/index';
// import store, { Presist } from './Redux/index';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      {/* <Provider store={store}> */}
        {/* <PersistGate loading={null} persistor={Presist}> */}
        <ThemeProvider>
          <ThemeSettings>
            <ProgressBarStyle />
            <ScrollToTop />
            <Router />
          </ThemeSettings>
        </ThemeProvider>
        {/* </PersistGate> */}
      {/* </Provider> */}
    </MotionLazyContainer>
  );
}
