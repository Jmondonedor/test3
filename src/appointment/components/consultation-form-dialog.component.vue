<script>
import { Consultation } from '../model/consultation.entity.js';
import { ConsultationService } from '../services/consultation.service.js';
import { AppointmentService } from '../services/appointment.service.js';

export default {
  name: "consultation-form-dialog",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    appointment: {
      type: Object,
      required: true
    }
  },
  emits: ['update:visible', 'consultation-saved', 'close'],
  data() {
    return {
      consultation: new Consultation({
        appointmentId: this.appointment?.id || '',
        diagnosis: '',
        treatment: ''
      }),
      submitted: false,
      loading: false,
      consultationService: new ConsultationService(),
      appointmentService: new AppointmentService()
    };
  },
  watch: {
    appointment(newAppointment) {
      if (newAppointment) {
        this.consultation.appointmentId = newAppointment.id;
      }
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:visible', false);
      this.$emit('close');
    },
    async saveConsultation() {
      this.submitted = true;

      if (!this.consultation.isValid()) {
        this.$toast.add({
          severity: 'error',
          summary: this.$t('consultation.error'),
          detail: this.$t('consultation.validation-error'),
          life: 3000
        });
        return;
      }

      try {
        this.loading = true;
        // Save the consultation
        await this.consultationService.create(this.consultation);

        // Update the appointment status to ATTENDED
        await this.appointmentService.updateStatus(this.appointment.id, 'ATTENDED');

        this.$toast.add({
          severity: 'success',
          summary: this.$t('consultation.success'),
          detail: this.$t('consultation.save-success'),
          life: 3000
        });

        this.$emit('consultation-saved');
        this.hideDialog();
      } catch (error) {
        console.error('Error saving consultation:', error);
        this.$toast.add({
          severity: 'error',
          summary: this.$t('consultation.error'),
          detail: this.$t('consultation.save-error'),
          life: 3000
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <pv-dialog
      :visible="visible"
      :style="{ width: '450px' }"
      :header="$t('consultation.details')"
      :modal="true"
      class="p-fluid"
      @update:visible="$emit('update:visible', $event)"
      aria-labelledby="consultation-dialog-title"
  >
    <div class="field">
      <label for="appointmentId">{{ $t('consultation.appointment-id') }}</label>
      <pv-input-text
          id="appointmentId"
          v-model="consultation.appointmentId"
          required
          readonly
          autofocus
          aria-readonly="true"
      />
    </div>

    <div class="field">
      <label for="diagnosis">{{ $t('consultation.diagnosis') }}</label>
      <pv-textarea
          id="diagnosis"
          v-model="consultation.diagnosis"
          required
          :placeholder="$t('consultation.diagnosis-placeholder')"
          rows="5"
          cols="30"
          :class="{ 'p-invalid': submitted && !consultation.diagnosis }"
          aria-required="true"
      />
    </div>

    <div class="field">
      <label for="treatment">{{ $t('consultation.treatment') }}</label>
      <pv-textarea
          id="treatment"
          v-model="consultation.treatment"
          required
          :placeholder="$t('consultation.treatment-placeholder')"
          rows="5"
          cols="30"
          :class="{ 'p-invalid': submitted && !consultation.treatment }"
          aria-required="true"
      />
    </div>

    <template #footer>
      <pv-button
          :label="$t('consultation.cancel')"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
          :disabled="loading"
          aria-label="Cancel"
      />
      <pv-button
          :label="$t('consultation.save')"
          icon="pi pi-check"
          class="p-button-primary"
          @click="saveConsultation"
          :loading="loading"
          aria-label="Save consultation"
      />
    </template>
  </pv-dialog>
</template>

<style scoped>
.field {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
</style>