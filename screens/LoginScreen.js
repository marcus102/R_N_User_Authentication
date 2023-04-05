import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext  = useContext(AuthContext);

  async function loginHandler({email, password}) {
    setIsAuthenticating(true);
    try {
    const token = await login(email, password);
    authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!', 
        'Could not log you in - please check your credentials or try again later'
      );
      setIsAuthenticating(false);
    }
    
  }

  if (isAuthenticating) {
    return(
      <LoadingOverlay message='Logging You In...' />
    );
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;