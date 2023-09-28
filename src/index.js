// scroll bar
import 'simplebar/src/simplebar.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import ReactDOM from 'react-dom';
import store, { Presist } from './Redux/index';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
//
import App from './App';

// ----------------------------------------------------------------------

ReactDOM.render(
  <HelmetProvider>
    <SettingsProvider>
      <CollapseDrawerProvider>
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate loading={null} persistor={Presist}>
              <App />
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </CollapseDrawerProvider>
    </SettingsProvider>
  </HelmetProvider>,
  document.getElementById('root')
);
