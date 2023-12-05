import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FormProvider } from './contexts/FormContext';
import { ConfigurationsProvider } from './contexts/ConfigurationsContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigurationsProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </ConfigurationsProvider>
  </React.StrictMode>
);
