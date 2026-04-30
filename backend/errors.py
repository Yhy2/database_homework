class ApiError(Exception):
    def __init__(self, message, *, code, http_status):
        super().__init__(message)
        self.message = message
        self.code = code
        self.http_status = http_status


class ValidationError(ApiError):
    def __init__(self, message):
        super().__init__(message, code=40001, http_status=400)


class ForbiddenError(ApiError):
    def __init__(self, message):
        super().__init__(message, code=40301, http_status=403)


class UnauthorizedError(ApiError):
    def __init__(self, message):
        super().__init__(message, code=40101, http_status=401)


class NotFoundError(ApiError):
    def __init__(self, message):
        super().__init__(message, code=40401, http_status=404)


class ConflictError(ApiError):
    def __init__(self, message):
        super().__init__(message, code=40901, http_status=409)


class ServerError(ApiError):
    def __init__(self, message="服务器内部错误"):
        super().__init__(message, code=50001, http_status=500)
