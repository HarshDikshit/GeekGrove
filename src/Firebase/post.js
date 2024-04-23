import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import {doc, collection, addDoc, documentId, updateDoc, deleteDoc, getDocs, setDoc, getDoc, query  } from "firebase/firestore";

export class PostUploadService{

    // set-posts
    async createPost({createdBy, post, createdAt}){
        try {
            const dbref = collection(db, "post")
            return await addDoc(dbref, {createdBy,post, createdAt});
        } catch (error) {
            throw error;
        }
    }

     // check docs
     async getPostDocs(){
        try {
            const dbref = query(collection(db,'post'))
            const snapshot= await getDocs(dbref);
            return snapshot.docs.map((doc=> ({id: doc.id, ...doc.data()})))
        } catch (error) {
            throw error;
        }
    }


}

const postUploadService = new PostUploadService();
export default postUploadService