import Firebase from 'firebase';
import firebaseConfig from '@/firebase/config';

const firebaseApp = Firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
