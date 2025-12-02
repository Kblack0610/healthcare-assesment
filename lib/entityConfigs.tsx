import { Patient, Doctor, Appointment } from './types';
import { Column, FormField } from '@/components/DataTable';

// ============ PATIENTS ============
export const patientColumns: Column<Patient>[] = [
  { key: 'id', header: 'ID', className: 'whitespace-nowrap' },
  { key: 'name', header: 'Name', className: 'whitespace-nowrap font-medium text-gray-900' },
  { key: 'age', header: 'Age', className: 'whitespace-nowrap' },
  { key: 'gender', header: 'Gender', className: 'whitespace-nowrap' },
  { key: 'medicalHistory', header: 'Medical History', className: 'max-w-xs truncate' },
];

export const patientFormFields: FormField[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'age', label: 'Age', type: 'number' },
  {
    key: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' },
    ],
  },
  { key: 'medicalHistory', label: 'Medical History', type: 'textarea', rows: 3 },
];

export function patientToFormData(patient: Patient | null): Record<string, string> {
  if (!patient) return { name: '', age: '', gender: '', medicalHistory: '' };
  return {
    name: patient.name,
    age: patient.age?.toString() || '',
    gender: patient.gender || '',
    medicalHistory: patient.medicalHistory || '',
  };
}

export function parsePatientFormData(formData: Record<string, string>): Record<string, unknown> {
  return {
    name: formData.name,
    age: formData.age ? parseInt(formData.age) : undefined,
    gender: formData.gender || undefined,
    medicalHistory: formData.medicalHistory || undefined,
  };
}

// ============ DOCTORS ============
export const doctorColumns: Column<Doctor>[] = [
  { key: 'id', header: 'ID', className: 'whitespace-nowrap' },
  { key: 'name', header: 'Name', className: 'whitespace-nowrap font-medium text-gray-900' },
  { key: 'specialty', header: 'Specialty', className: 'whitespace-nowrap' },
  { key: 'bio', header: 'Bio', className: 'max-w-xs truncate' },
];

export const doctorFormFields: FormField[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'specialty', label: 'Specialty', type: 'text', required: true },
  { key: 'bio', label: 'Bio', type: 'textarea', rows: 3 },
];

export function doctorToFormData(doctor: Doctor | null): Record<string, string> {
  if (!doctor) return { name: '', specialty: '', bio: '' };
  return {
    name: doctor.name,
    specialty: doctor.specialty || '',
    bio: doctor.bio || '',
  };
}

export function parseDoctorFormData(formData: Record<string, string>): Record<string, unknown> {
  return {
    name: formData.name,
    specialty: formData.specialty,
    bio: formData.bio || undefined,
  };
}

// ============ APPOINTMENTS ============
export function createAppointmentColumns(
  patients: Patient[],
  doctors: Doctor[]
): Column<Appointment>[] {
  const getPatientName = (id: number) => patients.find((p) => p.id === id)?.name || `Patient #${id}`;
  const getDoctorName = (id: number) => doctors.find((d) => d.id === id)?.name || `Doctor #${id}`;
  const formatDateTime = (dateTime: string) => {
    try {
      return new Date(dateTime).toLocaleString();
    } catch {
      return dateTime;
    }
  };

  return [
    { key: 'id', header: 'ID', className: 'whitespace-nowrap' },
    {
      key: 'patientId',
      header: 'Patient',
      className: 'whitespace-nowrap font-medium text-gray-900',
      render: (apt) => getPatientName(apt.patientId),
    },
    {
      key: 'doctorId',
      header: 'Doctor',
      className: 'whitespace-nowrap',
      render: (apt) => getDoctorName(apt.doctorId),
    },
    {
      key: 'dateTime',
      header: 'Date/Time',
      className: 'whitespace-nowrap',
      render: (apt) => formatDateTime(apt.dateTime),
    },
    { key: 'reason', header: 'Reason', className: 'max-w-xs truncate' },
  ];
}

export function createAppointmentFormFields(
  patients: Patient[],
  doctors: Doctor[]
): FormField[] {
  return [
    {
      key: 'patientId',
      label: 'Patient',
      type: 'select',
      required: true,
      options: patients.slice(0, 100).map((p) => ({
        value: p.id.toString(),
        label: `${p.name} (ID: ${p.id})`,
      })),
    },
    {
      key: 'doctorId',
      label: 'Doctor',
      type: 'select',
      required: true,
      options: doctors.slice(0, 100).map((d) => ({
        value: d.id.toString(),
        label: `${d.name} - ${d.specialty}`,
      })),
    },
    { key: 'dateTime', label: 'Date/Time', type: 'datetime-local', required: true },
    { key: 'reason', label: 'Reason', type: 'textarea', rows: 2 },
  ];
}

export function appointmentToFormData(appointment: Appointment | null): Record<string, string> {
  if (!appointment) return { patientId: '', doctorId: '', dateTime: '', reason: '' };
  return {
    patientId: appointment.patientId.toString(),
    doctorId: appointment.doctorId.toString(),
    dateTime: appointment.dateTime,
    reason: appointment.reason || '',
  };
}

export function parseAppointmentFormData(formData: Record<string, string>): Record<string, unknown> {
  return {
    patientId: parseInt(formData.patientId),
    doctorId: parseInt(formData.doctorId),
    dateTime: formData.dateTime,
    reason: formData.reason || undefined,
  };
}
