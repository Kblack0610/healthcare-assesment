'use client';

import { Patient, Appointment, Doctor } from '@/lib/types';

interface PatientDetailProps {
  patient: Patient;
  appointments: Appointment[];
  doctors: Map<number, Doctor>;
  loading: boolean;
}

export default function PatientDetail({ patient, appointments, doctors, loading }: PatientDetailProps) {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Patient Info Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
              <span>{patient.age} years old</span>
              <span>•</span>
              <span>{patient.gender}</span>
            </div>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            ID: {patient.id}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Medical History</h3>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">
            {patient.medicalHistory || 'No medical history recorded.'}
          </p>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Appointments</h3>
          <p className="text-sm text-gray-500">
            {loading ? 'Loading...' : `${appointments.length} appointment${appointments.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500">
            <div className="animate-pulse">Loading appointments...</div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 font-medium">No appointments</p>
            <p className="text-sm">This patient has no scheduled appointments.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {appointments.map((appointment) => {
              const doctor = doctors.get(appointment.doctorId);
              return (
                <li key={appointment.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {formatDateTime(appointment.dateTime)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Doctor:</span>{' '}
                        {doctor ? (
                          <>
                            {doctor.name}
                            <span className="text-gray-400"> • {doctor.specialty}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">Unknown</span>
                        )}
                      </div>
                      {appointment.reason && (
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Reason:</span> {appointment.reason}
                        </div>
                      )}
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Scheduled
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
