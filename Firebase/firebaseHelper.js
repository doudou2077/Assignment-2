import { addDoc, collection, doc, deleteDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "./firebaseSetup";

export function listentoCollection(collectionPath, onUpdate) {
    const collectionRef = collection(database, collectionPath);
    const q = query(collectionRef, orderBy("date", "desc")); // Order by date, most recent first

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Convert the date string to a Date object
            if (data.date) {
                data.date = new Date(data.date);
            }
            items.push({ id: doc.id, ...data });
        });
        onUpdate(items);
    }, (error) => {
        console.error("Error listening to collection:", error);
    });

    return unsubscribe;
}

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



