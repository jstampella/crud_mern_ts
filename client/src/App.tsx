import './App.css';
import { useAuthStore } from './hooks';
import { statusAuth } from './store/auth';
import { AuthRoutes, AuthenticatedRoutes } from './routes/routes';
import LayoutApp from './layout/LayoutApp';
import { useEffect } from 'react';

function App() {
  const { status, checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);
  if (status === statusAuth.checking) return <h1>Loading...</h1>;
  if (status === statusAuth.noauthentication) return <AuthRoutes />;
  if (status === statusAuth.authentication)
    return (
      <LayoutApp>
        <AuthenticatedRoutes />
      </LayoutApp>
    );
}

export default App;
