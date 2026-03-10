module ErrorHandler
  extend ActiveSupport::Concern

  included do
    rescue_from StandardError, with: :internal_server_error
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActionController::ParameterMissing, with: :parameter_missing
  end

  private

  def internal_server_error(exception)
    # Log the error for developers
    Rails.logger.error exception.message
    Rails.logger.error exception.backtrace.join("\n")

    render json: { error: 'Server Error', message: exception.message }, status: :unprocessable_entity
  end

  def record_not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def record_invalid(exception)
    render json: { error: 'Validation failed', messages: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def parameter_missing(exception)
    render json: { error: exception.message }, status: :bad_request
  end
end
