import { addDoc, CollectionReference, deleteDoc, doc, DocumentData, getDoc, getDocs, query, QueryFieldFilterConstraint, QuerySnapshot, updateDoc } from "firebase/firestore";

export default class BaseService {
    static async create<T extends object>(collectionRef: CollectionReference<DocumentData, DocumentData>, data: T): Promise<T> {
        try {

            const docRef = await addDoc(collectionRef, data)
            const docSnap = await getDoc(doc(collectionRef, docRef.id))
            return { ...docSnap.data(), id: docSnap.id } as T & { id: string };
        } catch (err) {
            console.log(err);
            throw err
        }
    }
    static async update(collectionRef: CollectionReference<DocumentData, DocumentData>, id: string, data: object): Promise<void> {
        const docRef = doc(collectionRef, id);
        try {
            await updateDoc(docRef, { ...data })
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    static async delete(collectionRef: CollectionReference<DocumentData, DocumentData>, id: string): Promise<void> {
        const docRef = doc(collectionRef, id);
        try {

            await deleteDoc(docRef);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async query(collectionRef: CollectionReference<DocumentData, DocumentData>, queryFilter: QueryFieldFilterConstraint): Promise<QuerySnapshot<DocumentData, DocumentData>> {
        const queryInstance = query(collectionRef, queryFilter)
        try {
            const querySnapshot = await getDocs(queryInstance);
            return querySnapshot;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async getAll<T extends object>(collectionRef: CollectionReference<DocumentData, DocumentData>): Promise<T[]> {
        try {
            const data = await getDocs(collectionRef);
            return data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id } as T & { id: string })) ?? [];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async getById<T extends object>(collectionRef: CollectionReference<DocumentData, DocumentData>, id: string): Promise<T | undefined> {
        try {
            const docRef = doc(collectionRef, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { ...docSnap.data(), id: docSnap.id } as T & { id: string };
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}