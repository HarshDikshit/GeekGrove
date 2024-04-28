    import { deleteObject, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
    import { db, storage } from "../../firebase";
    import {doc, collection, addDoc, documentId, updateDoc, deleteDoc, getDocs, setDoc, getDoc, query  } from "firebase/firestore";
    import { v4 } from "uuid";
    import postUploadService from "./post";
    import { useSelector } from "react-redux";
    



    export class Service{

        // add docs 
        async createUserDoc({uid,name,avatar, rollNo, email, createdAt}){
            try {
                const dbref = doc(db, "user", uid)
                return await setDoc(dbref, {uid, name, avatar, email, rollNo, createdAt}, {merge:true});
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
        async updateDoc ({uid,avatar, name, email, updatedAt}){
            const updateRef = doc(db,'user', uid);
            try {
                return await setDoc(updateRef, {uid, avatar, email, name, updatedAt}, {merge: true});

            } catch (error) {
                throw error;
            }
        }

        async updateProfile ({uid,avatar, name, rollNo, email, updatedAt}){
            const updateRef = doc(db,'user', uid);
            try {
                return await setDoc(updateRef, {uid, avatar, rollNo, email, name, updatedAt}, {merge: true});

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
            
            try {
                const uploadRef= ref(storage, Ref)
                return   uploadBytesResumable(uploadRef, file)
                // .on('state_changed', 
                // (snapshot) => {
                
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                
                
                // switch (snapshot.state) {
                //     case 'paused':
                //     console.log('Upload is paused');
                //     break;
                //     case 'running':
                //     console.log('Upload is running');
                //     break;
                // }
                // }, 
                // (error) => {
                // // Handle unsuccessful uploads
                // }, 
                // ()=>{
                //         getDownloadURL(uploadRef).then(async(downloadURL) => {
                //         console.log('File available at', downloadURL);
                //         await postUploadService.createPost({createdBy: currUserData, post: {title: title, description: description, token: token, file: url}, createdAt: serverTimestamp()})
                //     });
                // }
                
               
        // )
            
            } catch (error) {
                throw error;
            }
        }

        // img download url
        async getPreview({Ref}){
            const downRef= ref(storage, Ref)
            try {
                return  getDownloadURL(downRef);
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
