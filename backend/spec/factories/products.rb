FactoryBot.define do
  factory :product do
    name { Faker::Commerce.product_name }
    description { Faker::Commerce.department }
    price { Faker::Commerce.price(range: 1.0..100.0) }
    stock { Faker::Number.between(from: 0, to: 100) }
    sku { "PROD-#{Faker::Number.unique.number(digits: 5)}-#{('A'..'Z').to_a.sample(3).join}" }
    active { true }
  end
end
