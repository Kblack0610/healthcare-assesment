'use client';

import { useState } from 'react';
import Modal from './Modal';
import Pagination from './Pagination';

const PAGE_SIZE = 20;

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'datetime-local';
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
}

export interface DataTableProps<T extends { id: number }> {
  title: string;
  data: T[];
  columns: Column<T>[];
  formFields: FormField[];
  loading: boolean;
  onAdd: (data: Record<string, unknown>) => Promise<unknown>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<unknown>;
  onDelete: (id: number) => Promise<unknown>;
  onRefresh: () => void;
  itemToFormData: (item: T | null) => Record<string, string>;
  parseFormData: (formData: Record<string, string>) => Record<string, unknown>;
}

export default function DataTable<T extends { id: number }>({
  title,
  data,
  columns,
  formFields,
  loading,
  onAdd,
  onUpdate,
  onDelete,
  onRefresh,
  itemToFormData,
  parseFormData,
}: DataTableProps<T>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paginatedData = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function openCreateModal() {
    setEditingItem(null);
    setFormData(itemToFormData(null));
    setModalOpen(true);
  }

  function openEditModal(item: T) {
    setEditingItem(item);
    setFormData(itemToFormData(item));
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const parsedData = parseFormData(formData);
      if (editingItem) {
        await onUpdate(editingItem.id, parsedData);
      } else {
        await onAdd(parsedData);
      }
      setModalOpen(false);
      onRefresh();
    } catch (error) {
      console.error('Failed to save:', error);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(`Are you sure you want to delete this ${title.slice(0, -1).toLowerCase()}?`)) return;
    try {
      await onDelete(id);
      onRefresh();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  }

  function renderFormField(field: FormField) {
    const commonProps = {
      value: formData[field.key] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [field.key]: e.target.value }),
      className: 'mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2',
    };

    switch (field.type) {
      case 'select':
        return (
          <select {...commonProps} required={field.required}>
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return <textarea {...commonProps} rows={field.rows || 3} />;
      case 'number':
        return <input type="number" {...commonProps} required={field.required} />;
      case 'datetime-local':
        return <input type="datetime-local" {...commonProps} required={field.required} />;
      default:
        return <input type="text" {...commonProps} required={field.required} />;
    }
  }

  function getCellValue(item: T, column: Column<T>): React.ReactNode {
    if (column.render) {
      return column.render(item);
    }
    const value = item[column.key as keyof T];
    if (value === null || value === undefined) return '';
    return String(value);
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading {title.toLowerCase()}...</div>;
  }

  const singularTitle = title.slice(0, -1);

  return (
    <div>
      {/* Header with Add button and pagination */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {title} ({data.length})
        </h2>
        <div className="flex items-center gap-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={data.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
            compact
          />
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add {singularTitle}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-6 py-4 text-sm text-gray-500 ${col.className || ''}`}
                  >
                    {getCellValue(item, col)}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openEditModal(item)} className="text-blue-600 hover:text-blue-900 mr-3">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bottom Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={data.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? `Edit ${singularTitle}` : `Add ${singularTitle}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label} {field.required && '*'}
              </label>
              {renderFormField(field)}
            </div>
          ))}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
