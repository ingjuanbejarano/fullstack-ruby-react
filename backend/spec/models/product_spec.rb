require 'rails_helper'

RSpec.describe Product, type: :model do
  describe 'validations' do
    let(:product) { build(:product) }

    it 'is valid with valid attributes' do
      expect(product).to be_valid
    end

    describe 'name' do
      it 'is invalid without a name' do
        product.name = nil
        expect(product).not_to be_valid
        expect(product.errors[:name]).to include("can't be blank")
      end

      it 'is invalid if too short' do
        product.name = 'ab'
        expect(product).not_to be_valid
        expect(product.errors[:name]).to include("is too short (minimum is 3 characters)")
      end

      it 'is invalid if too long' do
        product.name = 'a' * 101
        expect(product).not_to be_valid
        expect(product.errors[:name]).to include("is too long (maximum is 100 characters)")
      end
    end

    describe 'price' do
      it 'is invalid without a price' do
        product.price = nil
        expect(product).not_to be_valid
      end

      it 'is invalid if less than or equal to 0' do
        product.price = 0
        expect(product).not_to be_valid
        product.price = -1
        expect(product).not_to be_valid
      end
    end

    describe 'stock' do
      it 'is invalid without a stock' do
        product.stock = nil
        expect(product).not_to be_valid
      end

      it 'is invalid if negative' do
        product.stock = -1
        expect(product).not_to be_valid
      end

      it 'is invalid if not an integer' do
        product.stock = 1.5
        expect(product).not_to be_valid
      end
    end

    describe 'sku' do
      it 'is invalid without an sku' do
        product.sku = nil
        expect(product).not_to be_valid
      end

      it 'is invalid if not unique' do
        create(:product, sku: 'TEST-SKU-1')
        product.sku = 'TEST-SKU-1'
        expect(product).not_to be_valid
        expect(product.errors[:sku]).to include("has already been taken")
      end

      it 'is valid with uppercase letters, numbers, and hyphens' do
        product.sku = 'VALID-SKU-123'
        expect(product).to be_valid
      end

      it 'is invalid with lowercase letters' do
        product.sku = 'invalid-sku-123'
        expect(product).not_to be_valid
      end

      it 'is invalid with special characters other than hyphens' do
        product.sku = 'INVALID_SKU_123!'
        expect(product).not_to be_valid
        expect(product.errors[:sku]).to include("only allows uppercase letters, numbers, and hyphens")
      end
    end
    
    describe 'active' do
      it 'can be false' do
        product.active = false
        expect(product).to be_valid
      end

      it 'is invalid if nil' do
        product.active = nil
        expect(product).not_to be_valid
      end
    end
  end
end
