require 'rails_helper'

RSpec.describe "Api::V1::Products", type: :request do
  describe "GET /api/v1/products" do
    before do
      create_list(:product, 15)
    end

    it "returns a paginated list of products" do
      get api_v1_products_path, params: { page: 1, per_page: 10 }
      
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      
      expect(json_response['products'].length).to eq(10)
      expect(json_response['meta']['total_count']).to eq(15)
      expect(json_response['meta']['current_page']).to eq(1)
      expect(json_response['meta']['total_pages']).to eq(2)
    end

    it "filters products by name" do
      create(:product, name: "Special Apple")
      get api_v1_products_path, params: { search: "Apple" }
      
      json_response = JSON.parse(response.body)
      expect(json_response['products'].length).to eq(1)
      expect(json_response['products'].first['name']).to eq("Special Apple")
    end

    it "filters products by active status" do
      create(:product, active: false, name: "Inactive Item")
      get api_v1_products_path, params: { status: false }
      
      json_response = JSON.parse(response.body)
      expect(json_response['products'].length).to eq(1)
      expect(json_response['products'].first['name']).to eq("Inactive Item")
    end
  end

  describe "GET /api/v1/products/:id" do
    let(:product) { create(:product) }

    it "returns a specific product" do
      get api_v1_product_path(product)
      
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response['id']).to eq(product.id)
    end

    it "returns 404 when product is not found" do
      get api_v1_product_path(id: 999999)
      
      expect(response).to have_http_status(:not_found)
      json_response = JSON.parse(response.body)
      expect(json_response['error']).to include("Couldn't find Product")
    end
  end

  describe "POST /api/v1/products" do
    let(:valid_attributes) {
      { product: { name: "New Product", price: 10.5, stock: 100, sku: "NEW-123", active: true } }
    }

    let(:invalid_attributes) {
      { product: { name: "ab", price: -5, stock: -1, sku: "invalid sku!" } }
    }

    it "creates a product with valid attributes" do
      expect {
        post api_v1_products_path, params: valid_attributes
      }.to change(Product, :count).by(1)

      expect(response).to have_http_status(:created)
      json_response = JSON.parse(response.body)
      expect(json_response['name']).to eq("New Product")
    end

    it "returns validation errors (422) with invalid attributes" do
      expect {
        post api_v1_products_path, params: invalid_attributes
      }.to change(Product, :count).by(0)

      expect(response).to have_http_status(:unprocessable_entity)
      json_response = JSON.parse(response.body)
      expect(json_response['error']).to eq("Validation failed")
      expect(json_response['messages']).to include("Name is too short (minimum is 3 characters)")
    end

    it "returns error (422) on duplicate SKU" do
      create(:product, sku: "DUP-123")
      post api_v1_products_path, params: { product: { name: "Another", price: 10, stock: 10, sku: "DUP-123", active: true } }
      
      expect(response).to have_http_status(:unprocessable_entity)
      json_response = JSON.parse(response.body)
      expect(json_response['messages']).to include("Sku has already been taken")
    end
  end

  describe "PUT /api/v1/products/:id" do
    let(:product) { create(:product) }

    it "updates the product with valid attributes" do
      put api_v1_product_path(product), params: { product: { name: "Updated Name" } }
      
      expect(response).to have_http_status(:success)
      product.reload
      expect(product.name).to eq("Updated Name")
    end

    it "returns validation errors (422) with invalid attributes" do
      put api_v1_product_path(product), params: { product: { price: -10 } }
      
      expect(response).to have_http_status(:unprocessable_entity)
      product.reload
      expect(product.price).not_to eq(-10)
    end
  end

  describe "DELETE /api/v1/products/:id" do
    let!(:product) { create(:product) }

    it "deletes the product" do
      expect {
        delete api_v1_product_path(product)
      }.to change(Product, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
