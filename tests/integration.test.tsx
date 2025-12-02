import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable from '@/components/DataTable';

vi.spyOn(window, 'confirm').mockReturnValue(true);

interface TestItem {
  id: number;
  name: string;
}

const createProps = (data: TestItem[] = []) => ({
  title: 'Items',
  data,
  columns: [
    { key: 'id' as const, header: 'ID' },
    { key: 'name' as const, header: 'Name' },
  ],
  formFields: [{ key: 'name', label: 'Name', type: 'text' as const, required: true }],
  loading: false,
  onAdd: vi.fn().mockResolvedValue(undefined),
  onUpdate: vi.fn().mockResolvedValue(undefined),
  onDelete: vi.fn().mockResolvedValue(undefined),
  onRefresh: vi.fn(),
  itemToFormData: (item: TestItem | null) => ({ name: item?.name || '' }),
  parseFormData: (form: Record<string, string>) => ({ name: form.name }),
});

describe('DataTable CRUD operations', () => {
  it('creates item: opens form, fills it, calls onAdd', async () => {
    const props = createProps();
    const user = userEvent.setup();
    render(<DataTable {...props} />);

    await user.click(screen.getByRole('button', { name: /add item/i }));
    await user.type(screen.getByRole('textbox'), 'Test Item');
    await user.click(screen.getByRole('button', { name: /create/i }));

    expect(props.onAdd).toHaveBeenCalledWith({ name: 'Test Item' });
    expect(props.onRefresh).toHaveBeenCalled();
  });

  it('updates item: opens form with existing data, modifies, calls onUpdate', async () => {
    const props = createProps([{ id: 1, name: 'Original' }]);
    const user = userEvent.setup();
    render(<DataTable {...props} />);

    await user.click(screen.getByRole('button', { name: /edit/i }));
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Original');

    await user.clear(input);
    await user.type(input, 'Changed');
    await user.click(screen.getByRole('button', { name: /update/i }));

    expect(props.onUpdate).toHaveBeenCalledWith(1, { name: 'Changed' });
  });

  it('deletes item: confirms then calls onDelete', async () => {
    const props = createProps([{ id: 42, name: 'Doomed' }]);
    const user = userEvent.setup();
    render(<DataTable {...props} />);

    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(window.confirm).toHaveBeenCalled();
    expect(props.onDelete).toHaveBeenCalledWith(42);
  });
});
