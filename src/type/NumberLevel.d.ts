import { NumberLevelStatus } from "./NumberLevelStatus"

interface NumberLevel {
    id?: string
    account_id?: string,
    service_id?: string,
    number_level?: number,
    status?: NumberLevelStatus,
    grant_time?: string;
    expiry?: string
}