import { Patient, Doctor, Appointment } from './types';

const API_BASE_URL = '/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Patients
export async function getPatients(): Promise<Patient[]> {
  return fetchApi<Patient[]>('/patients');
}

export async function getPatient(id: number): Promise<Patient> {
  return fetchApi<Patient>(`/patients/${id}`);
}

export async function createPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
  return fetchApi<Patient>('/patients', {
    method: 'POST',
    body: JSON.stringify(patient),
  });
}

export async function updatePatient(id: number, patient: Partial<Patient>): Promise<Patient> {
  return fetchApi<Patient>(`/patients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(patient),
  });
}

export async function deletePatient(id: number): Promise<void> {
  await fetchApi(`/patients/${id}`, { method: 'DELETE' });
}

// Doctors
export async function getDoctors(): Promise<Doctor[]> {
  return fetchApi<Doctor[]>('/doctors');
}

export async function getDoctor(id: number): Promise<Doctor> {
  return fetchApi<Doctor>(`/doctors/${id}`);
}

export async function createDoctor(doctor: Omit<Doctor, 'id'>): Promise<Doctor> {
  return fetchApi<Doctor>('/doctors', {
    method: 'POST',
    body: JSON.stringify(doctor),
  });
}

export async function updateDoctor(id: number, doctor: Partial<Doctor>): Promise<Doctor> {
  return fetchApi<Doctor>(`/doctors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(doctor),
  });
}

export async function deleteDoctor(id: number): Promise<void> {
  await fetchApi(`/doctors/${id}`, { method: 'DELETE' });
}

// Appointments
export async function getAppointments(): Promise<Appointment[]> {
  return fetchApi<Appointment[]>('/appointments');
}

export async function getAppointmentsByPatient(patientId: number): Promise<Appointment[]> {
  return fetchApi<Appointment[]>(`/appointments?patientId=${patientId}`);
}

export async function getAppointmentsByDoctor(doctorId: number): Promise<Appointment[]> {
  return fetchApi<Appointment[]>(`/appointments?doctorId=${doctorId}`);
}

export async function getAppointment(id: number): Promise<Appointment> {
  return fetchApi<Appointment>(`/appointments/${id}`);
}

export async function createAppointment(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
  return fetchApi<Appointment>('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointment),
  });
}

export async function updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment> {
  return fetchApi<Appointment>(`/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(appointment),
  });
}

export async function deleteAppointment(id: number): Promise<void> {
  await fetchApi(`/appointments/${id}`, { method: 'DELETE' });
}
