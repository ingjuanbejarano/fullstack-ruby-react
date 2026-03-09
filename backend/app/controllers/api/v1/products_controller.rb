class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    # Search and Filter
    products = Product.all
    products = products.where("name ILIKE ?", "%#{params[:search]}%") if params[:search].present?
    
    if params[:status].present?
      is_active = ActiveModel::Type::Boolean.new.cast(params[:status])
      products = products.where(active: is_active)
    end

    # Pagination with kaminari
    page = params[:page] || 1
    per_page = params[:per_page] || 10
    
    paginated_products = products.order(created_at: :desc).page(page).per(per_page)

    render json: {
      products: paginated_products,
      meta: {
        current_page: paginated_products.current_page,
        total_pages: paginated_products.total_pages,
        total_count: paginated_products.total_count
      }
    }
  end

  def show
    render json: @product
  end

  def create
    result = ::Products::CreateService.new(product_params).call

    if result[:success]
      render json: result[:product], status: :created
    else
      render json: { error: 'Validation failed', messages: result[:errors] }, status: :unprocessable_entity
    end
  end

  def update
    result = ::Products::UpdateService.new(@product, product_params).call

    if result[:success]
      render json: result[:product]
    else
      render json: { error: 'Validation failed', messages: result[:errors] }, status: :unprocessable_entity
    end
  end

  def destroy
    result = ::Products::DestroyService.new(@product).call

    if result[:success]
      head :no_content
    else
      render json: { error: 'Deletion failed', messages: result[:errors] }, status: :unprocessable_entity
    end
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :stock, :sku, :active)
  end
end
