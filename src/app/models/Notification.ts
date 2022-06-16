import { NotificationType } from "../enums/NotificationType"

export interface Notification{
    type:NotificationType
    
    message:string
}