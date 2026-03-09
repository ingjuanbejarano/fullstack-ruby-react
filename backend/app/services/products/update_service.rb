module Products
  class UpdateService
    def initialize(product, params)
      @product = product
      @params = params
    end

    def call
      if @product.update(@params)
        { success: true, product: @product }
      else
        { success: false, product: @product, errors: @product.errors.full_messages }
      end
    end
  end
end
