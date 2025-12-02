/**
 * Shared type definitions for the Healthcare Management System.
 * These types are the single source of truth for both frontend and backend.
 */

export interface Patient {
  id: number;
  name: string;
  age?: number;
  gender?: string;
  medicalHistory?: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  bio?: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  dateTime: string;
  reason?: string;
}

export type CreatePatient = Omit<Patient, 'id'>;
export type UpdatePatient = Partial<CreatePatient>;

export type CreateDoctor = Omit<Doctor, 'id'>;
export type UpdateDoctor = Partial<CreateDoctor>;

export type CreateAppointment = Omit<Appointment, 'id'>;
export type UpdateAppointment = Partial<CreateAppointment>;
