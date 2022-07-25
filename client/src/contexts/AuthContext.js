import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import LoadingPage from "../pages/LoadingPage/LoadingPage";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const signIn = (email, password) => {
    return new Promise((resolve) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setIsLoading(true);
          resolve(null);
        })
        .catch((error) => {
          resolve(error.code);
        });
    });
  };

  const changeTempPassword = (password) => {
    return new Promise((resolve) => {
      /*if (currentUser.hasChangedTempPassword) {
        resolve(new Error("Temp Password Already changed"));
      }*/

      updatePassword(auth.currentUser, password);
      /*.then(() => {
      currentUser.hasChangedTempPassword = true;
      updateDoc(getUserDocRef(auth.currentUser.uid), {
        hasChangedTempPassword: true,
      }).then(() => {
        resolve(null);
      });
      })
        .catch((error) => {
          throw new Error(error.code);
        });*/
    });
  };

  const logOut = () => {
    return signOut(auth);
  };

  const getUserDocRef = (uid) => {
    return doc(db, `users/`, uid);
  };

  useEffect(() => {
    const unsebscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user == null) {
          setCurrentUser(null);
          setIsLoading(false);
        } else {
          const userDocumentRef = getUserDocRef(user?.uid);

          getDoc(userDocumentRef).then((userDocFromServer) => {
            const rawCurrrentUser = userDocFromServer.data();
            rawCurrrentUser.uid = auth.currentUser.uid;
            setCurrentUser(rawCurrrentUser);
            setIsLoading(false);
          });
        }
      } catch (error) {
        console.log(error);
      }
    });

    return unsebscribe;
  }, []);

  const value = {
    currentUser,
    logOut,
    signIn,
    changeTempPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading && <LoadingPage />}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
