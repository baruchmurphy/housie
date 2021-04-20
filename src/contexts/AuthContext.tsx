import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { firestore } from '../services/firebase';

const AuthContext = React.createContext<any>({hello: 'hello'});

export function useAuth() {
    return useContext(AuthContext);
}

// interface AuthProviderProps {
//     children: React.ReactChild;
// }

export function AuthProvider({ children }: any) {
    const [authLoading, setAuthLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>();
    const [profile, setProfile] = useState({});
    const [lists, setLists] = useState<any>(null);

    const createProfile = async (user: any) => {
        try {
            const newUser = {
                uid: user.uid,
                email: user.email,
            };
            await firestore.collection('Users').doc(user.uid).set(newUser);
        } catch (error) {
            console.log(error)
        }
    };

    const getProfile = async (id: string) => {
        return firestore.collection('Users').doc(id).get().then((userProfile) => { 
            setProfile(userProfile)
            console.log(userProfile)
        })
    } 

    // const newList = async (info: any) => {
    //     return firestore.collection('Lists').doc(id).get()
    // }

    const getLists = async (createdBy: string) => {
        const listData = await firestore.collection('Lists').where('createdBy', '==', createdBy).get();
        let returnedData: any = {};
        listData.forEach((doc) => {
            returnedData = doc;
        })
        console.log('======>', returnedData.data())
        setLists(returnedData.data())
    };

    const signup = async(email: string, password: string) => {
        const { user }:any = await auth.createUserWithEmailAndPassword(email, password);
        if (user) {
            const providerData: string[] = []
            user.providerData.forEach((data: any) => {
                providerData.push(data.providerId)
            });
            const firebaseUser: any = {
                uid: user.uid,
                providerData,
                email: user.email
            };
            await createProfile(firebaseUser)
            await getProfile(user.uid)
        } else {
            console.log('failed')
        }
    };

    const resetPassword = (email: string) => {
        return auth.sendPasswordResetEmail(email)
    };

    const login = async (email: string, password: string) => {
       const userlogin = await auth.signInWithEmailAndPassword(email, password)
       try {
            if (userlogin) {
                const firestoreProfile = await firestore.collection('Users').where("email", "==", email).get()
                let docId = '';
                firestoreProfile.forEach((doc : any) => {
                    docId = doc.id
                })
                await getProfile(docId)
            } else {
                console.log('failed')
            }
        } catch (error) {
           return error
        }
    };

    const logout = () => {
       return auth.signOut()
    };

    const updateEmail = (email: string) => {
        return currentUser.updateEmail(email)
    };

    const updatePassword = (password: string) => {
        return currentUser.updatePassword(password)
    };

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(async function(user) {
            if (user) {
                setCurrentUser(user)
                setAuthLoading(false)
                if(!lists) {
                    getLists('poggers')
                } 
            } else {
                setCurrentUser(null)
                setAuthLoading(false)
            }
        });
        return unsubscribe
    }, [authLoading, lists]);



    const value = {
        currentUser,
        profile,
        authLoading,
        lists,
        setLists,
        login,
        signup,
        logout, 
        resetPassword,
        updateEmail,
        updatePassword,
    };

    return( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
