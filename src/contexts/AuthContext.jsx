import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider, 
  signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext();

// custom hook so components can call useAuth() instead of useContext(AuthContext)
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // signup / login / logout wrap Firebase's functions
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }

  function loginWithGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  // Firebase tells us whenever auth state changes (login/logout/refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // cleanup when component unmounts
  }, []);

  const value = { currentUser, signup, login, logout,loginWithGoogle };

  // don't render app until we know if user is logged in
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}