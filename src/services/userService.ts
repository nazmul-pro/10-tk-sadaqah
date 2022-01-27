import { List } from "@ui-kitten/components";
import { IDonate, IShare, IUserModel } from "../models/userModel";
import { appFirebaseConfig } from '../constants/firebase-config';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
export class UserService {

    UserService() {

    }

    public addUser(dbName: string, deviceId: string, userModel: IUserModel) {
        return setDoc(doc(appFirebaseConfig, dbName, deviceId), {
            name: userModel.name,
            phoneNumber: userModel.phoneNumber ?? "",
            email: userModel.email ?? "",
            isActive: true,
            payments: [],
            share: []
        });
    }

    public userIsExists(dbName: string, deviceId: string) {
        const docRef = doc(appFirebaseConfig, dbName, deviceId);
        return getDoc(docRef);
    }

    public updateUser(dbName: string, deviceId: string, userModel: IUserModel) {
        const docRef = doc(appFirebaseConfig, dbName, deviceId);
        return updateDoc(docRef,{"name":userModel.name} );
    }

    public deleteUser(dbName: string, deviceId: string) {
        const docRef = doc(appFirebaseConfig, dbName, deviceId);
        return deleteDoc(docRef);
    }

    public getUserDetails(dbName: string, deviceId: string) {
        //not needed 
        const docRef = doc(appFirebaseConfig, dbName, deviceId);
        return getDoc(docRef);
    }

    public donateSadaqah(dbName: string, deviceId: string, payments: List<IDonate>) {
        const docRef = doc(appFirebaseConfig, dbName, deviceId);
        return updateDoc(docRef, { payments:payments });
    }

    public shareAppWithContacts(dbName: string, deviceId: string, shareContacts: List<IShare>) {
        const docRef = doc(appFirebaseConfig, dbName, deviceId);
        return updateDoc(docRef, { share:shareContacts });
    }
}