import { addDoc, collection, doc, deleteDoc, onSnapshot, query, orderBy, setDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

// Function to listen to changes in a Firestore collection
export function listentoCollection(collectionPath, onUpdate) {
    const collectionRef = collection(database, collectionPath);
    const q = query(collectionRef, orderBy("date", "desc")); // Order by date, most recent first

    // Set up a real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });
        onUpdate(items);
    }, (error) => {
        console.error("Error listening to collection:", error);
    });
    // Return the unsubscribe function to stop listening when needed
    return unsubscribe;
}

// Function to write or update a document in Firestore
export async function writeToDB(data, collectionPath, docId = null) {
    try {
        if (docId) {
            // Update existing document
            const docRef = doc(database, collectionPath, docId);
            await setDoc(docRef, data, { merge: true });
            console.log('Document updated with ID:', docId);
            return docId;
        } else {
            // Create new document
            const collectionRef = collection(database, collectionPath);
            const docRef = await addDoc(collectionRef, data);
            console.log('Document written with ID:', docRef.id);
            return docRef.id;
        }
    } catch (err) {
        console.error('Error writing to db:', err);
        throw err;
    }
}

// Function to delete a document from Firestore
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



