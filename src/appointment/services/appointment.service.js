import httpInstance from "../../shared/services/http.instance.js";

export class AppointmentService {
    resourceEndpoint = import.meta.env.VITE_APPOINTMENTS_ENDPOINT_PATH;

    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }

    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource);
    }

    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource);
    }

    updateStatus(id, status) {
        return httpInstance.patch(`${this.resourceEndpoint}/${id}`, { status });
    }

    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }
}