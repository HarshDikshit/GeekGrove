import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import {doc, collection, addDoc, documentId, updateDoc, deleteDoc, getDocs, setDoc, getDoc  } from "firebase/firestore";
import { v4 } from "uuid";



export class Service{

    // add docs 
    async createUserDoc({uid,name,email,isAdmin, createdAt}){
        try {
            const dbref = doc(db, "user", uid)
            return await setDoc(dbref, {name, email,isAdmin, createdAt});
        } catch (error) {
            throw error;
        }
    }

    // get docs
    async getUserDocs({uid}){
        try {
             const dbref = doc(db,'user', uid)
            return await getDoc(dbref);
        } catch (error) {
            throw error;
        }
    }

    // uodate
    async updateDoc ({uid,email, comments, updatedAt}){
        const updateRef = doc(db,'user', uid);
        try {
            return await updateDoc(updateRef, {email,  comments, updatedAt});

        } catch (error) {
            throw error;
        }
    }

    // delete
    async deleteDoc({dbref, id}){
        const deleteRef = doc(dbref, id);
        try {
            return await deleteDoc(deleteRef);
        } catch (error) {
            throw error;
        }
    }

    // img upload
    async uploadFile({Ref, file}){
        const uploadRef= ref(storage, Ref)
        try {
            return await uploadBytes(uploadRef, file);
        } catch (error) {
            throw error;
        }
    }

    // img download url
    async getDownloadUrl({Ref}){
        const downRef= ref(storage, Ref)
        try {
            return await getDownloadUrl(downRef);
        } catch (error) {
            throw error;
        }
    }

    // img delete
    async deleteFile({Ref}){
        const deleteRef = ref(storage, Ref);
        try {
            return await deleteObject(deleteRef)
        } catch (error) {
            throw error;
        }
    }

    // ------comments--------
     async updateComments({uid, comments}){
        const commRef = collection(db,'comments');
        
        try {
            return await addDoc(commRef, {uid, comments});

        } catch (error) {
            throw error;
        }
     }
}

const service = new Service();
export default service