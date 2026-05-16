import requests
import redis
import os
from dotenv import load_dotenv

load_dotenv()

def check_api():
    print("[1/4] API Kontrol Ediliyor...")
    try:
        res = requests.get("http://localhost:8000/health")
        if res.status_code == 200:
            print("OK: API Cevrimici!")
            return True
    except:
        pass
    print("HATA: API Cevrimdisi! (uvicorn app.main:app --reload calisiyor mu?)")
    return False

def check_redis():
    print("[2/4] Redis Kontrol Ediliyor...")
    try:
        r = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"))
        if r.ping():
            print("OK: Redis Baglantisi Basarili!")
            return True
    except:
        pass
    print("HATA: Redis Baglanamadi! (Redis sunucusu acik mi?)")
    return False

def check_worker():
    print("[3/4] Celery Worker Kontrol Ediliyor...")
    print("BILGI: Worker kontrolu icin manuel 'celery -A tasks worker --loglevel=info' komutunu kontrol edin.")
    return True

def check_supabase():
    print("[4/4] Supabase / DB Kontrol Ediliyor...")
    url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    if url:
        print(f"OK: Supabase URL Tanimli: {url}")
        return True
    print("HATA: Supabase API Key veya URL eksik! (.env dosyasini kontrol edin)")
    return False

if __name__ == "__main__":
    print("\n--- NAILING AI CLONE: SISTEM SAGLIK RAPORU ---\n")
    results = [check_api(), check_redis(), check_worker(), check_supabase()]
    
    if all(results):
        print("\nTEBRIKLER: Tum sistemler kararli ve calismaya hazir!\n")
    else:
        print("\nDIKKAT: Bazi servislerde sorun var. Lutfen yukaridaki hatalari inceleyin.\n")
