import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // ✅ Router import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 🔹 Router bilan o‘rab olamiz */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
