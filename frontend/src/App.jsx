import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "./components/LoginForm.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { ThemeProvider } from "./components/context/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
    </ThemeProvider>
 
  );
}

export default App;
