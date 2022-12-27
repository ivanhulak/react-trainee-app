import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './reset.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import './i18n';
import { Preloader } from './components/Preloader/Preloader';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense fallback={<Preloader/>}>
    <App />
  </Suspense>
);

