import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, getCountFromServer, getDoc, getDocs, Query, query, QueryFieldFilterConstraint, QuerySnapshot, updateDoc } from "firebase/firestore";
import { store } from "../redux/store";
import { db } from "@/config/FirebaseConfig";
import { IsUtil } from "@/app/util/IsUtil";

export default class BaseService {
    static async create<T extends object>(collectionRef: CollectionReference<DocumentData, DocumentData>, data: T): Promise<T> {
        try {
            const docRef = await addDoc(collectionRef, data)
            const docSnap = await getDoc(doc(collectionRef, docRef.id))
            const path = collectionRef.path.split("/").pop();
            if (path && path !== "number-levels")
                this.writeLog("Tạo " + this.switchPath(path))
            return { ...docSnap.data(), id: docSnap.id } as T & { id: string };
        } catch (err) {
            console.log(err);
            throw err
        }
    }
    static switchPath = (path: string) => {
        switch (path) {
            case "services":
                return "dịch vụ"
            case "devices":
                return "thiết bị"
            case "accounts":
                return "tài khoản"
            case "roles":
                return "vai trò"
        }
    }
    static async writeLog(action: string) {
        const account = store.getState().auth.account;
        const addressIp = store.getState().address.ip
        if (account?.id && addressIp) {
            await addDoc(
                collection(db, "user-logs")
                , { account_id: account.username, action, impact_time: new Date(), address_ip: addressIp })
        }
    }


    static async update(collectionRef: CollectionReference<DocumentData, DocumentData>, id: string, data: object): Promise<void> {
        const docRef = doc(collectionRef, id);
        try {
            await updateDoc(docRef, { ...data })
            const path = collectionRef.path.split("/").pop();
            if (path && path !== "number-levels") {
                if (IsUtil.isType<Service>(data, "service_id")) {
                    this.writeLog("Cập nhập thông tin " + this.switchPath(path) + " " + data.service_id)
                } else if (IsUtil.isType<Device>(data, "device_id")) {
                    this.writeLog("Cập nhật thông tin " + this.switchPath(path) + " " + data.device_id)
                } else if (IsUtil.isType<Account>(data, "username")) {
                    this.writeLog("Cập nhật thông tin " + this.switchPath(path) + " " + data.username)
                } else if (IsUtil.isType<Role>(data, "role_name")) {
                    this.writeLog("Cập nhật thông tin " + this.switchPath(path) + " " + data.role_name)
                }
            }
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
    static async queries(collectionRef: CollectionReference<DocumentData, DocumentData>, queryFilter: QueryFieldFilterConstraint): Promise<QuerySnapshot<DocumentData, DocumentData>> {
        const queryInstance = query(collectionRef, queryFilter)
        try {
            const querySnapshot = await getDocs(queryInstance);
            return querySnapshot;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async query<T>(queryInstance: Query<DocumentData, DocumentData>): Promise<T[]> {
        try {
            const data = await getDocs(queryInstance);
            return data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id } as T & { id: string })) ?? [];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async count(collectionRef: CollectionReference<DocumentData, DocumentData>): Promise<number> {
        const snapshot = await getCountFromServer(collectionRef);
        return snapshot.data().count;
    }
    static async readAll<T extends object>(collectionRef: CollectionReference<DocumentData, DocumentData>): Promise<T[]> {
        try {
            const data = await getDocs(collectionRef);
            return data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id } as T & { id: string })) ?? [];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async readById<T extends object>(collectionRef: CollectionReference<DocumentData, DocumentData>, id: string): Promise<T | undefined> {
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