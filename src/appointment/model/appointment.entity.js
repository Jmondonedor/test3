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
        // Parse the scheduledAt date (format: YYYY-MM-DD)
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Get just the YYYY-MM-DD part

        // Debug logs to see what we're comparing
        console.log("Today's date string:", todayString);
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