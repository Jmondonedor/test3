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
        const userTimezoneOffset = today.getTimezoneOffset() * 60000;
        const localDate = new Date(today - userTimezoneOffset);
        const todayString = localDate.toISOString().split('T')[0];
        return this.scheduledAt === todayString;
    }

    isConfirmed() {
        return this.status === 'CONFIRMED';
    }

    canRecordConsultation() {
        const isToday = this.isScheduledForToday();
        const isConfirmed = this.isConfirmed();
        return isToday && isConfirmed;
    }
}