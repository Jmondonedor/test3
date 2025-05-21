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
        const scheduledDate = new Date(this.scheduledAt);

        return today.getFullYear() === scheduledDate.getFullYear() &&
            today.getMonth() === scheduledDate.getMonth() &&
            today.getDate() === scheduledDate.getDate();
    }

    isConfirmed() {
        return this.status === 'CONFIRMED';
    }

    canRecordConsultation() {
        return this.isConfirmed() && this.isScheduledForToday();
    }
}