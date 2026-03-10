require 'swagger_helper'

RSpec.describe 'API V1 Products', type: :request do
  path '/api/v1/products' do
    get('List products') do
      tags 'Products'
      produces 'application/json'
      parameter name: :search, in: :query, type: :string, description: 'Filter products by name', required: false
      parameter name: :status, in: :query, type: :string, description: 'Filter by active status (true/false)', required: false
      parameter name: :page, in: :query, type: :integer, description: 'Page number', required: false
      parameter name: :per_page, in: :query, type: :integer, description: 'Items per page', required: false

      response(200, 'successful') do
        schema type: :object,
               properties: {
                 data: {
                   type: :array,
                   items: {
                     type: :object,
                     properties: {
                       id: { type: :string },
                       type: { type: :string },
                       attributes: {
                         type: :object,
                         properties: {
                           name: { type: :string },
                           description: { type: :string, nullable: true },
                           price: { type: :string },
                           stock: { type: :integer },
                           sku: { type: :string },
                           active: { type: :boolean },
                           created_at: { type: :string },
                           updated_at: { type: :string }
                         }
                       }
                     }
                   }
                 },
                 meta: {
                   type: :object,
                   properties: {
                     current_page: { type: :integer },
                     total_pages: { type: :integer },
                     total_count: { type: :integer }
                   }
                 }
               }
        run_test!
      end
    end

    post('Create a product') do
      tags 'Products'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :product, in: :body, schema: {
        type: :object,
        properties: {
          product: {
            type: :object,
            properties: {
              name: { type: :string },
              description: { type: :string },
              price: { type: :number },
              stock: { type: :integer },
              sku: { type: :string },
              active: { type: :boolean }
            },
            required: ['name', 'price', 'stock', 'sku']
          }
        }
      }

      response(201, 'product created') do
        let(:product) { { product: { name: 'New Item', price: 10, stock: 5, sku: 'NEW-1' } } }
        run_test!
      end

      response(422, 'invalid request') do
        let(:product) { { product: { name: 'ab' } } }
        run_test!
      end
    end
  end

  path '/api/v1/products/{id}' do
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('Show a product') do
      tags 'Products'
      produces 'application/json'

      response(200, 'successful') do
        let(:id) { Product.create!(name: 'Item', price: 10, stock: 5, sku: 'SKU-001', active: true).id }
        run_test!
      end

      response(404, 'product not found') do
        let(:id) { 'invalid' }
        run_test!
      end
    end

    put('Update a product') do
      tags 'Products'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :product, in: :body, schema: {
        type: :object,
        properties: {
          product: {
            type: :object,
            properties: {
              name: { type: :string },
              description: { type: :string },
              price: { type: :number },
              stock: { type: :integer },
              sku: { type: :string },
              active: { type: :boolean }
            }
          }
        }
      }

      response(200, 'successful') do
        let(:id) { Product.create!(name: 'Item', price: 10, stock: 5, sku: 'SKU-001', active: true).id }
        let(:product) { { product: { name: 'Updated name' } } }
        run_test!
      end

      response(422, 'invalid request') do
        let(:id) { Product.create!(name: 'Item', price: 10, stock: 5, sku: 'SKU-001', active: true).id }
        let(:product) { { product: { name: '' } } }
        run_test!
      end
    end

    delete('Delete a product') do
      tags 'Products'
      produces 'application/json'

      response(204, 'successful') do
        let(:id) { Product.create!(name: 'Item', price: 10, stock: 5, sku: 'SKU-001', active: true).id }
        run_test!
      end
    end
  end
end
