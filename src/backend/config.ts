import firebase from 'firebase';
import 'firebase/firestore'

if(!firebase.apps.length) {
    firebase.initializeApp({
        apikey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectid:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
}
export default firebase