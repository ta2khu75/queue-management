import { Timestamp } from "firebase/firestore"
import { NumberLevelStatus } from "./NumberLevelStatus"

interface NumberLevel {
    id?: string
    account_id?: string,
    service_id?: string,
    number_level?: string,
    status?: NumberLevelStatus,
    grant_time?: Date | Timestamp,
    expiry?: Date | Timestamp,
    number: string,
}