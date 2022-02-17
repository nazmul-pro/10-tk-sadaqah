import { appFirebaseConfig } from '../constants/firebase-config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
export class PostService {
    public getPost(dbName: string) {
        const collectionRef = collection(appFirebaseConfig, dbName);
        let queryPostData = query(collectionRef, orderBy('createDate', 'desc'))
        const querySnapshot = getDocs(queryPostData);
        return querySnapshot;
    }
}