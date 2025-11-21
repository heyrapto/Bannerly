import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Form from './components/ui/Form.jsx';
import GettingStarted from './pages/GettingStarted';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './pages/NotFound.jsx';
import SignIn from './pages/SignIn.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/get-started" element={<GettingStarted />} />
        <Route path="/form" element={<Form />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </StrictMode>,
)
