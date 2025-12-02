'use client';

import { Patient } from '@/lib/types';

interface PatientListProps {
  patients: Patient[];
  selectedPatientId: number | null;
  onSelectPatient: (patient: Patient) => void;
}

export default function PatientList({ patients, selectedPatientId, onSelectPatient }: PatientListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Patients</h2>
        <p className="text-sm text-gray-500">{patients.length} total</p>
      </div>
      <ul className="divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
        {patients.map((patient) => (
          <li key={patient.id}>
            <button
              onClick={() => onSelectPatient(patient)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                selectedPatientId === patient.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="font-medium text-gray-900">{patient.name}</div>
              <div className="text-sm text-gray-500">
                {patient.age} years old • {patient.gender}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
