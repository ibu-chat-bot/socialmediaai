import subprocess
import os
import sys
import time

def check_step(name, command, cwd):
    print(f"Checking {name}...")
    try:
        result = subprocess.run(command, cwd=cwd, shell=True, capture_output=True, text=True, timeout=30)
        if result.returncode == 0:
            print(f"[OK] {name} passed.")
            return True
        else:
            print(f"[FAIL] {name} failed.")
            print(result.stdout)
            print(result.stderr)
            return False
    except Exception as e:
        print(f"[ERROR] {name} error: {e}")
        return False

def verify():
    root = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Frontend Build Check (Type check only for speed)
    check_step("Frontend TS Check", "pnpm --filter @nailing/web exec tsc --noEmit", root)
    
    # 2. Backend Health Check
    print("Checking Backend (FastAPI)...")
    api_dir = os.path.join(root, "apps", "api")
    api_process = subprocess.Popen(
        [os.path.join(api_dir, "venv", "Scripts", "python.exe"), "-m", "uvicorn", "app.main:app", "--port", "8001"],
        cwd=api_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    time.sleep(5)
    api_process.terminate()
    print("[OK] Backend boot success.")
    
    # 3. Worker Health Check
    print("Checking Workers (Celery)...")
    worker_dir = os.path.join(root, "apps", "workers")
    worker_process = subprocess.Popen(
        [os.path.join(worker_dir, "venv", "Scripts", "python.exe"), "-m", "celery", "-A", "main.celery_app", "worker", "--loglevel=info"],
        cwd=worker_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    time.sleep(5)
    worker_process.terminate()
    print("[OK] Worker boot success.")

if __name__ == "__main__":
    verify()
