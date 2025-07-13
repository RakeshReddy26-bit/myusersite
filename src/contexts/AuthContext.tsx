import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User as CustomUser } from '../types/task';

interface AuthContextType {
  user: CustomUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const allowedRoles = ['user', 'admin', 'staff'] as const;
type Role = typeof allowedRoles[number];

function mapFirebaseUserToCustomUser(user: FirebaseUser, role: string = 'user'): CustomUser {
  const safeRole: Role = allowedRoles.includes(role as Role) ? (role as Role) : 'user';
  return {
    id: user.uid,
    email: user.email || '',
    name: user.displayName || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    referralCode: (user as any).referralCode || '',
    points: 0,
    loyaltyProfile: {
      tier: '',
      points: 0,
      discount: 0,
    },
    createdAt: user.metadata?.creationTime ? new Date(user.metadata.creationTime) : undefined,
    updatedAt: user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime) : undefined,
    role: safeRole,
  };
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      if (firebaseUser) {
        // Fetch user role from Firestore
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        let role = 'user';
        if (userSnap.exists()) {
          role = userSnap.data().role || 'user';
        } else {
          // If user doc doesn't exist, create it with default role
          await setDoc(userRef, { role: 'user', email: firebaseUser.email, name: firebaseUser.displayName });
        }
        setUser(mapFirebaseUserToCustomUser(firebaseUser, role));
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      // Create user doc in Firestore with default role
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { role: 'user', email, name });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Create user doc in Firestore if it doesn't exist
      const userRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { role: 'user', email: result.user.email, name: result.user.displayName });
      }
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    firebaseUser,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};