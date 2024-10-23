import { Timestamp } from "firebase/firestore"

interface UserLog {
    id: string
    account_id: string
    impact_time: Date | Timestamp
    address_ip: string
    action: string
}