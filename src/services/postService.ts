import { appFirebaseConfig } from '../constants/firebase-config';
import { doc, getDoc } from 'firebase/firestore/lite';
export class PostService {
    public getPost(dbName: string) {
        const docRef = doc(appFirebaseConfig, dbName);
        return getDoc(docRef);
    }
}