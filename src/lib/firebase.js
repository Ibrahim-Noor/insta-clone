import { initializeApp } from '@firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyBdsuOuKbv5jU7WMgxXRkKTKQsHfQbiFog",
    authDomain: "insta-clone-4b6a8.firebaseapp.com",
    projectId: "insta-clone-4b6a8",
    storageBucket: "insta-clone-4b6a8.appspot.com",
    messagingSenderId: "526382216562",
    appId: "1:526382216562:web:bf538c9f3e9ab7273f59eb"
}


export const firebase = initializeApp(config);
// seedDatabase(firebase)