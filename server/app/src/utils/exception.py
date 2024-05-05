class InvalidTokenError(Exception):
    def __init__(self, message: str = "Invalid token or expired token."):
        self.message = message
        super().__init__(self.message)



def handle_status_code(status_code):
    return {
        200: "OK",
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
    }.get(status_code, "Unknown status code")

