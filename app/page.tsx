'use client';

import { useState, useEffect } from 'react';
import Tabs from '@/components/Tabs';
import DataTable from '@/components/DataTable';
import { Patient, Doctor, Appointment } from '@/lib/types';
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '@/lib/api';
import {
  patientColumns,
  patientFormFields,
  patientToFormData,
  parsePatientFormData,
  doctorColumns,
  doctorFormFields,
  doctorToFormData,
  parseDoctorFormData,
  createAppointmentColumns,
  createAppointmentFormFields,
  appointmentToFormData,
  parseAppointmentFormData,
} from '@/lib/entityConfigs';

const tabs = [
  {
    id: 'patients',
    label: 'Patients',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'doctors',
    label: 'Doctors',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('patients');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    try {
      setLoading(true);
      const [patientsData, doctorsData, appointmentsData] = await Promise.all([
        getPatients(),
        getDoctors(),
        getAppointments(),
      ]);
      setPatients(patientsData);
      setDoctors(doctorsData);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadPatients() {
    const data = await getPatients();
    setPatients(data);
  }

  async function loadDoctors() {
    const data = await getDoctors();
    setDoctors(data);
  }

  async function loadAppointments() {
    const data = await getAppointments();
    setAppointments(data);
  }

  function renderActiveTab() {
    switch (activeTab) {
      case 'patients':
        return (
          <DataTable<Patient>
            title="Patients"
            data={patients}
            columns={patientColumns}
            formFields={patientFormFields}
            loading={loading}
            onAdd={(data) => createPatient(data as Omit<Patient, 'id'>)}
            onUpdate={(id, data) => updatePatient(id, data)}
            onDelete={deletePatient}
            onRefresh={loadPatients}
            itemToFormData={patientToFormData}
            parseFormData={parsePatientFormData}
          />
        );
      case 'doctors':
        return (
          <DataTable<Doctor>
            title="Doctors"
            data={doctors}
            columns={doctorColumns}
            formFields={doctorFormFields}
            loading={loading}
            onAdd={(data) => createDoctor(data as Omit<Doctor, 'id'>)}
            onUpdate={(id, data) => updateDoctor(id, data)}
            onDelete={deleteDoctor}
            onRefresh={loadDoctors}
            itemToFormData={doctorToFormData}
            parseFormData={parseDoctorFormData}
          />
        );
      case 'appointments':
        return (
          <DataTable<Appointment>
            title="Appointments"
            data={appointments}
            columns={createAppointmentColumns(patients, doctors)}
            formFields={createAppointmentFormFields(patients, doctors)}
            loading={loading}
            onAdd={(data) => createAppointment(data as Omit<Appointment, 'id'>)}
            onUpdate={(id, data) => updateAppointment(id, data)}
            onDelete={deleteAppointment}
            onRefresh={loadAppointments}
            itemToFormData={appointmentToFormData}
            parseFormData={parseAppointmentFormData}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900">Healthcare Management System</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 pt-4">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="p-6">{renderActiveTab()}</div>
        </div>
      </main>
    </div>
  );
}
