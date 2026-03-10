import type { Meta, StoryObj } from '@storybook/react';
import { ProductSkeleton } from '../components/ProductSkeleton';

const meta = {
  title: 'Components/ProductSkeleton',
  component: ProductSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '350px', height: '300px' }}>
      <ProductSkeleton />
    </div>
  ),
};
