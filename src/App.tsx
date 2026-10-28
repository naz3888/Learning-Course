import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PricingPage } from './pages/PricingPage';
import { SuccessPage } from './pages/SuccessPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/pricing" replace />} />
      </Routes>
    </BrowserRouter>
  );
}