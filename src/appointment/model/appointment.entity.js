export class Appointment {
    constructor({id = '', patientCode = '', doctorCode = '', scheduledAt = '', reason = '', status = 'PENDING'}) {
        this.id = id;
        this.patientCode = patientCode;
        this.doctorCode = doctorCode;
        this.scheduledAt = scheduledAt;
        this.reason = reason;
        this.status = status;
    }

    isScheduledForToday() {
        const today = new Date();

        // Format today's date to match the scheduledAt format (YYYY-MM-DD)
        // but adjust for timezone differences
        const userTimezoneOffset = today.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
        const localDate = new Date(today - userTimezoneOffset);
        const todayString = localDate.toISOString().split('T')[0]; // Get YYYY-MM-DD part

        // Debug logs to see what we're comparing
        console.log("Today's date string (timezone adjusted):", todayString);
        console.log("Appointment scheduledAt:", this.scheduledAt);
        console.log("Match?", this.scheduledAt === todayString);

        // Direct string comparison of the date parts
        return this.scheduledAt === todayString;
    }

    isConfirmed() {
        return this.status === 'CONFIRMED';
    }

    canRecordConsultation() {
        // Debug information to check both conditions
        const isToday = this.isScheduledForToday();
        const isConfirmed = this.isConfirmed();

        console.log("Appointment ID:", this.id);
        console.log("Date:", this.scheduledAt);
        console.log("Status:", this.status);
        console.log("Is today:", isToday);
        console.log("Is confirmed:", isConfirmed);
        console.log("Can record:", isToday && isConfirmed);

        return isToday && isConfirmed;
    }
}