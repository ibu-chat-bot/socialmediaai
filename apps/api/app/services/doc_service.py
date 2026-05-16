import fitz  # PyMuPDF
import trafilatura
from typing import Dict, Any

class DocService:
    def extract_pdf_text(self, file_path: str) -> Dict[str, Any]:
        """PDF dosyasından metin ve metadata çıkarır."""
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        
        metadata = {
            "page_count": len(doc),
            "title": doc.metadata.get("title", "Adsız Döküman"),
            "author": doc.metadata.get("author", "Bilinmiyor")
        }
        doc.close()
        return {"text": text, "metadata": metadata}

    def extract_web_article(self, url: str) -> Dict[str, Any]:
        """URL'den temizlenmiş makale içeriği çıkarır."""
        downloaded = trafilatura.fetch_url(url)
        if not downloaded:
            raise Exception("URL indirilemedi.")
        
        result = trafilatura.extract(
            downloaded, 
            include_comments=False, 
            include_tables=True,
            output_format='json'
        )
        
        import json
        data = json.loads(result)
        
        return {
            "title": data.get("title"),
            "text": data.get("text"),
            "author": data.get("author"),
            "date": data.get("date"),
            "url": url
        }

doc_service = DocService()
