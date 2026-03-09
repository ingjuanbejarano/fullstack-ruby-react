import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductModal } from '../components/ProductModal';

describe('ProductModal Validations', () => {
  const mockOnSave = vi.fn().mockResolvedValue({ success: true });
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<ProductModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);
    expect(screen.getByText('Create New Product')).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields on submit', async () => {
    render(<ProductModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);
    
    // Default state: empty name, sku. Price and stock are 0.
    const submitBtn = screen.getByTestId('submit-btn');
    fireEvent.click(submitBtn);

    // Because the fields map to their error data-testids we can check if they trigger on blur or change
    // Since validations are on change, let's trigger them
    const nameInput = screen.getByLabelText(/Product Name/i);
    fireEvent.change(nameInput, { target: { value: 'a' } }); // invalid name
    expect(screen.getByTestId('error-name')).toHaveTextContent('Name must be at least 3 characters long');

    const skuInput = screen.getByLabelText(/SKU/i);
    fireEvent.change(skuInput, { target: { value: 'invalid sku!' } });
    expect(screen.getByTestId('error-sku')).toHaveTextContent('SKU can only contain uppercase letters, numbers, and hyphens');
    
    const priceInput = screen.getByLabelText(/Price/i);
    fireEvent.change(priceInput, { target: { value: '-5' } });
    expect(screen.getByTestId('error-price')).toHaveTextContent('Price must be strictly greater than 0');

    // The submit button should be disabled if any validation fails
    expect(submitBtn).toBeDisabled();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('submits form when all fields are valid', async () => {
    render(<ProductModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);
    
    fireEvent.change(screen.getByLabelText(/Product Name/i), { target: { value: 'Valid Product' } });
    fireEvent.change(screen.getByLabelText(/SKU/i), { target: { value: 'VALID-SKU-1' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '10.50' } });
    fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '100' } });

    const submitBtn = screen.getByTestId('submit-btn');
    
    // Note: Due to React state updates, in testing environment we might need to wait for validation to pass
    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        name: 'Valid Product',
        description: '',
        price: 10.5,
        stock: 100,
        sku: 'VALID-SKU-1',
        active: true,
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
