import { Timestamp } from "firebase/firestore"; 

const dateHandler = {
    formatDate: () => {
        const date = new Date()
        // Extract the individual components of the date and time
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")
        const seconds = String(date.getSeconds()).padStart(2, "0")
    
        // Format the date and time string
        return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`
    },
    getCurrentTimeFirestore: () => {
        const currentDate = new Date(Date.now());
        return Timestamp.fromDate(currentDate)
    }
}

export default dateHandler