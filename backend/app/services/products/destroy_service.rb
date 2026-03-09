module Products
  class DestroyService
    def initialize(product)
      @product = product
    end

    def call
      if @product.destroy
        { success: true }
      else
        { success: false, errors: @product.errors.full_messages }
      end
    end
  end
end
