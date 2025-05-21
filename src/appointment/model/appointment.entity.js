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
        today.setHours(0, 0, 0, 0);
        const scheduledDate = new Date(this.scheduledAt);
        scheduledDate.setHours(0, 0, 0, 0);
        return today.getTime() === scheduledDate.getTime();
    }

    isConfirmed() {
        return this.status === 'CONFIRMED';
    }

    canRecordConsultation() {
        return this.isConfirmed() && this.isScheduledForToday();
    }
}