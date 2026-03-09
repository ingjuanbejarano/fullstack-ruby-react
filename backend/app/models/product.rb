class Product < ApplicationRecord
  validates :name, presence: true, length: { minimum: 3, maximum: 100 }
  validates :description, length: { maximum: 1000 }, allow_blank: true
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :stock, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :sku, presence: true, uniqueness: true, format: { with: /\A[A-Z0-9\-]+\z/, message: "only allows uppercase letters, numbers, and hyphens" }
  validates :active, inclusion: { in: [true, false] }
end
