class ProductSerializer
  include JSONAPI::Serializer
  attributes :name, :description, :price, :stock, :sku, :active, :created_at, :updated_at
end
