import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { FieldValue } from '@firebase/firestore';
import { firebase } from './lib/firebase';
import './styles/app.css'
import 'react-loading-skeleton/dist/skeleton.css'


ReactDOM.render(
  <FirebaseContext.Provider value={{firebase, FieldValue}}>
      <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// client side rendered app: react (cra)
  // -> database - firebase
  // -> react-loading-skeleton
  // -> tailwind

// architecture
  // src
    // -> components
    // -> constants
    // -> context
    // -> helpers
    // -> lib (firebase home)
    // -> services (firebase functions in here)
    // -> styles (tailwind's folder (app/tailwind))