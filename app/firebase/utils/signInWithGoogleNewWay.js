import { GoogleAuthProvider } from '@firebase/auth';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { iosClientId, androidClientId, webClientId } from '../config/google_config';

maybeCompleteAuthSession();

function login(id_token) {
  console.log('Signing in with Google...', { id_token });

  try {
    const credential = GoogleAuthProvider.credential(id_token);

    return credential;
  } catch (error) {
    throw error;
  }
}

export default function useGoogleAuthentication() {
  const [request, _, promptAsync] = useIdTokenAuthRequest({
      'webClientId': webClientId,
      iosClientId: iosClientId,
      androidClientId: androidClientId,
      scopes: ['profile', 'email'],
      permissions: ["public_profile", "email", "gender", "location"]
  
  });

  async function prompt() {
    const response = await promptAsync();

    if (response.type !== 'success') {
      throw new Error(response.type);
    }
    const credential = login(response.params.id_token);

    return [credential];
  }

  return [!!request, prompt];
}