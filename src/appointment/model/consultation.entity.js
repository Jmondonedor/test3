export class Consultation {
    constructor({id = '', appointmentId = '', diagnosis = '', treatment = ''}) {
        this.id = id;
        this.appointmentId = appointmentId;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
    }

    isValid() {
        return this.appointmentId &&
            this.diagnosis.trim() !== '' &&
            this.treatment.trim() !== '';
    }
}