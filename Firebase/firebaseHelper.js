import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionPath) {
    try {
        const collectionRef = collection(database, collectionPath)
        const docRef = await addDoc(collectionRef, data)
        console.log('Document written with ID:', docRef.id)
        return docRef.id
    } catch (err) {
        console.error('Error writing to db:', err);
        throw err;
    }
}

export async function deleteFromDB(id, collectionPath) {
    try {
        await deleteDoc(doc(database, collectionPath, id))
        console.log('Document deleted with ID:', id)
    }
    catch (err) {
        console.log(err)
        throw err
    }
}



