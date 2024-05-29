import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import {doc, collection, addDoc, documentId, updateDoc, deleteDoc, getDocs, setDoc, getDoc, query, orderBy  } from "firebase/firestore";

export class PostUploadService{

    // set-posts
    async createPost({folderName, createdBy, post, createdAt}){
        try {
            const dbref = collection(db, folderName)
            return await addDoc(dbref, {createdBy,post, createdAt});
        } catch (error) {
            throw error;
        }
    }

    //update-slide
    async updateSlidePost({folderName, uodatedBy, post, updateAt}){
        try {
            const dbref = collection(db, folderName)
            return await addDoc(dbref, {createdBy,post, createdAt});
        } catch (error) {
            throw error;
        }
    }

     // check docs
    async getSlidesDocs(){
        try {
            const dbref = query(collection(db,'slide'), orderBy("createdAt", "desc"))
            const snapshot= await getDocs(dbref);
            return snapshot.docs.map((doc=> ({id: doc.id, ...doc.data()})))
        } catch (error) {
            throw error;
        }
    }

    // study-docs
    async getStudyDocs({token}){
        try {
            const dbref = query(collection(db,token), orderBy("createdAt", "desc"))
            const snapshot= await getDocs(dbref);
            return snapshot.docs.map((doc=> ({id: doc.id, ...doc.data()})))
        } catch (error) {
            throw error;
        }
    }


    async deleteSlidesDoc({token, id}){
        try { 
            return await deleteDoc(doc(db, token, id ));
        } catch (error) {
            throw error;
        }
    }

}

const postUploadService = new PostUploadService();
export default postUploadService