import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    """Sistemin çevrimiçi olup olmadığını test eder."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_list_boards():
    """Kanvas listeleme endpoint'ini test eder."""
    response = client.get("/boards/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_board():
    """Yeni kanvas oluşturma işlemini test eder."""
    response = client.post("/boards/?name=Test Canvas")
    assert response.status_code == 200
    assert "id" in response.json()
    assert response.json()["name"] == "Test Canvas"

def test_ai_providers():
    """AI sağlayıcılarının durumunu test eder."""
    response = client.get("/ai/providers")
    assert response.status_code == 200
    # En az bir sağlayıcı tanımlı olmalı (Mock veya gerçek)
    assert any(response.json().values())

def test_invalid_board():
    """Olmayan bir kanvasa erişimi test eder."""
    response = client.get("/boards/non-existent-id")
    assert response.status_code == 404
