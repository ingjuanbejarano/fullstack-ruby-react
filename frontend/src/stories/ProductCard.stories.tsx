import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ProductCard } from '../components/ProductCard';

const meta = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onEdit: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveInStock: Story = {
  args: {
    product: {
      id: 1,
      name: 'Ergonomic Desk Chair',
      description: 'A comfortable chair for long hours of work.',
      price: 199.99,
      stock: 50,
      sku: 'FURN-CHAIR-001',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
};

export const InactiveOutOfStock: Story = {
  args: {
    product: {
      id: 2,
      name: 'Legacy Mechanical Keyboard',
      description: 'An old model that is no longer being produced.',
      price: 89.50,
      stock: 0,
      sku: 'TECH-KEY-002',
      active: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
};
