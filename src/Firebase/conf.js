import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import {doc, collection, addDoc, documentId, updateDoc, deleteDoc, getDocs, setDoc, getDoc, query  } from "firebase/firestore";
import { v4 } from "uuid";



export class Service{

    // add docs 
    async createUserDoc({uid,name, rollNo, email, createdAt}){
        try {
            const dbref = doc(db, "user", uid)
            return await setDoc(dbref, {uid, name, email, rollNo, createdAt});
        } catch (error) {
            throw error;
        }
    }

    // get docs
    async getUserDocs({uid}){
        try {
             const dbref = doc(db,'user', uid)
            return (await getDoc(dbref));
        } catch (error) {
            throw error;
        }
    }

     // check docs
     async getDocs(){
        try {
            const dbref = query(collection(db,'user'))
            const snapshot= await getDocs(dbref);
            return snapshot.docs.map((doc=> ({id: doc.id, ...doc.data()})))
        } catch (error) {
            throw error;
        }
    }

    // update
    async updateDoc ({uid,name, email, updatedAt}){
        const updateRef = doc(db,'user', uid);
        try {
            return await updateDoc(updateRef, {uid, email, name, updatedAt});

        } catch (error) {
            throw error;
        }
    }

    // update checks
    async updateChecksDoc ({uid,checks, updatedAt}){
        const updateRef = doc(db,'user', uid);
        try {
            return await setDoc(updateRef, {checks, updatedAt} , {merge: true});

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
     async addComments({uid, comments}){
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