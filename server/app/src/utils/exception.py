class InvalidTokenError(Exception):
    def __init__(self, message: str = "Invalid token or expired token."):
        self.message = message
        super().__init__(self.message)