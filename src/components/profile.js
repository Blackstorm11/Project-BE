import { useState, useEffect } from 'react';
import { auth } from '../firebase';


const [userProfile, setUserProfile] = useState(null);

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserProfile({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
      } else {
        setUserProfile(null);
      }
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {userProfile ?
        <>
          <img src={userProfile.photoURL} alt="User profile" />
          <p>{userProfile.displayName}</p>
          <p>{userProfile.email}</p>
        </>
        :
        <p>Please sign in to view your profile</p>
      }
    </div>
  );  