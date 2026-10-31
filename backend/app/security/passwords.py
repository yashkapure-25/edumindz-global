from passlib.context import CryptContext
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def hash_password(password: str) -> str:
    if len(password) < 12:
        raise ValueError("Password must be at least 12 characters long")
    if len(password.encode("utf-8")) > 72:
        raise ValueError("Password must be 72 bytes or fewer")
    return password_context.hash(password)
def verify_password(password: str, password_hash: str) -> bool:
    return password_context.verify(password, password_hash)
