import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import {doc,addDoc, collection, updateDoc, deleteDoc, getDocs  } from "firebase/firestore";



export class Service{

    // add docs 
    async createDoc(Ref,{dataObject}){
        try {
            const dbref = doc(db, Ref)
            return await addDoc(dbref, dataObject);
        } catch (error) {
            throw error;
        }
    }

    // get docs
    async getDocs({ref}){
        try {
             const dbref = doc(db, ref)
            return await getDocs(dbref);
        } catch (error) {
            throw error;
        }
    }

    // uodate
    async updateDoc ({dbref, id, updatedObj}){
        const updateRef = doc(dbref, id);
        try {
            return await updateDoc(updateRef, updatedObj);

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


}

const service = new Service();
export default service