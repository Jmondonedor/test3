<script>
import { AppointmentService } from '../services/appointment.service.js';
import { Appointment } from '../model/appointment.entity.js';
import ConsultationFormDialog from '../components/consultation-form-dialog.component.vue';

export default {
  name: "appointment-list",
  components: { ConsultationFormDialog },
  data() {
    return {
      appointments: [],
      loading: false,
      selectedAppointment: null,
      showConsultationDialog: false,
      appointmentService: new AppointmentService()
    };
  },
  created() {
    this.loadAppointments();
  },
  methods: {
    loadAppointments() {
      this.loading = true;
      this.appointmentService.getAll()
          .then(response => {
            const appointmentsData = Array.isArray(response.data) ? response.data :
                (response.data && response.data.appointments ? response.data.appointments : []);
            this.appointments = appointmentsData.map(appointment => new Appointment(appointment));
            this.loading = false;
          })
          .catch(error => {
            console.error('Error loading appointments:', error);
            this.loading = false;
          });
    },
    openConsultationDialog(appointment) {
      this.selectedAppointment = appointment;
      this.showConsultationDialog = true;
    },
    closeConsultationDialog() {
      this.showConsultationDialog = false;
      this.selectedAppointment = null;
    },
    onConsultationSaved() {
      this.loadAppointments();
      this.closeConsultationDialog();
    }
  }
};
</script>

<template>
  <div class="appointments-container w-full p-3" aria-labelledby="appointments-title">
    <h1 id="appointments-title">{{ $t('appointments.title') }}</h1>

    <pv-data-table
        :value="appointments"
        :loading="loading"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        tableStyle="min-width: 50rem"
        aria-label="Appointments Table"
    >
      <pv-column field="id" :header="$t('appointments.id')" sortable style="width: 10%"></pv-column>
      <pv-column field="patientCode" :header="$t('appointments.patient-code')" sortable style="width: 15%"></pv-column>
      <pv-column field="doctorCode" :header="$t('appointments.doctor-code')" sortable style="width: 15%"></pv-column>
      <pv-column field="scheduledAt" :header="$t('appointments.scheduled-at')" sortable style="width: 20%"></pv-column>
      <pv-column field="reason" :header="$t('appointments.reason')" style="width: 20%"></pv-column>
      <pv-column :header="$t('appointments.status')" style="width: 10%">
        <template #body="slotProps">
          {{ $t(`status.${slotProps.data.status}`) }}
        </template>
      </pv-column>
      <pv-column :header="$t('appointments.actions')" style="width: 10%">
        <template #body="slotProps">
          <pv-button
              :label="$t('consultation.title')"
              icon="pi pi-pencil"
              size="small"
              :disabled="!slotProps.data.canRecordConsultation()"
              @click="openConsultationDialog(slotProps.data)"
              aria-label="Record consultation"
          ></pv-button>
        </template>
      </pv-column>
    </pv-data-table>

    <consultation-form-dialog
        v-if="selectedAppointment"
        v-model:visible="showConsultationDialog"
        :appointment="selectedAppointment"
        @consultation-saved="onConsultationSaved"
        @close="closeConsultationDialog"
    />
  </div>
</template>

<style scoped>
.appointments-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>