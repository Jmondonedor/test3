import httpInstance from "../../shared/services/http.instance.js";

export class ConsultationService {
    resourceEndpoint = import.meta.env.VITE_CONSULTATIONS_ENDPOINT_PATH;
    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }
    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }
    getByAppointmentId(appointmentId) {
        return httpInstance.get(`${this.resourceEndpoint}?appointmentId=${appointmentId}`);
    }
    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource);
    }
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource);
    }
    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }
}