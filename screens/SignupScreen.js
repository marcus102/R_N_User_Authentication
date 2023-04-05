import { useState, useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { Alert } from 'react-native';

import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  async function signupHandler({email, password}) {
    setIsAuthenticating(true);
    try {
       const token = await createUser(email, password);
       authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!', 
        'Could not create user - please check your credentials & try again later'
      );
      setIsAuthenticating(false);
    }
   
  }

  if (isAuthenticating) {
    return(
      <LoadingOverlay message='User Creation...' />
    );
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;