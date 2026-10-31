import argparse
import getpass
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.database import Base, engine, SessionLocal
from app.models import User, Role
from app.security.passwords import hash_password


def main():
    parser = argparse.ArgumentParser(
        description="Create the first EduMindz CRM Super Admin."
    )

    parser.add_argument("--name", required=True)
    parser.add_argument("--email", required=True)

    args = parser.parse_args()

    name = args.name.strip()
    email = args.email.strip().lower()

    if not name:
        raise SystemExit("Name cannot be empty.")

    password = getpass.getpass(
        "Create password (minimum 12 characters): "
    )
    confirm = getpass.getpass("Confirm password: ")

    if password != confirm:
        raise SystemExit("Passwords do not match.")

    try:
        password_hash = hash_password(password)
    except ValueError as error:
        raise SystemExit(str(error))

    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        if db.query(User).filter(
            User.role == Role.super_admin
        ).count():
            raise SystemExit("A Super Admin already exists.")

        if db.query(User).filter(
            User.email == email
        ).first():
            raise SystemExit("That email is already registered.")

        admin = User(
            full_name=name,
            email=email,
            password_hash=password_hash,
            role=Role.super_admin,
            is_active=True,
        )

        db.add(admin)
        db.commit()

        print(f"Super Admin created successfully: {email}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    main()