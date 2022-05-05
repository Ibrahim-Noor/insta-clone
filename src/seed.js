 /* eslint-disable no-plusplus */

import { addDoc, collection, doc, getFirestore, writeBatch } from "firebase/firestore";

// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
    const users = [
      {
        userId: 'ode6kGwjMIh6ofJkYA7acOxir3J2',
        username: 'ibra',
        fullName: 'Ibrahim Noor',
        emailAddress: 'ibra_noor@hotmail.com    ',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'raphael',
        fullName: 'Raffaello Sanzio da Urbino',
        emailAddress: 'raphael@sanzio.com',
        following: [],
        followers: ['ode6kGwjMIh6ofJkYA7acOxir3J2'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'dali',
        fullName: 'Salvador Dalí',
        emailAddress: 'salvador@dali.com',
        following: [],
        followers: ['ode6kGwjMIh6ofJkYA7acOxir3J2'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'orwell',
        fullName: 'George Orwell',
        emailAddress: 'george@orwell.com',
        following: [],
        followers: ['ode6kGwjMIh6ofJkYA7acOxir3J2'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    const db = getFirestore(firebase);
    try{
        for (let k = 0; k < users.length; k++) {
            addDoc(collection(db, 'users'), users[k]);
        }
    } catch(e) {
        console.log(e)
    }
    // eslint-disable-next-line prefer-const
    const batch = writeBatch(db);
    for (let i = 1; i <= 5; ++i) {
        const photoRef = doc(db, 'photos', i.toString());
        batch.set(photoRef, {
          userId: '2',
          imageSrc: `/images/users/raphael/${i}.jpg`,
          caption: 'Saint George and the Dragon',
          likes: [],
          comments: [
            {
              displayName: 'dali',
              comment: 'Love this place, looks like my animal farm!'
            },
            {
              displayName: 'orwell',
              comment: 'Would you mind if I used this picture?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
    batch.commit()
  }