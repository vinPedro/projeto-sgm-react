import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./componets/rotas/AppRoutes";
import { AuthProvider } from "./componets/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        {" "}
        {}
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
