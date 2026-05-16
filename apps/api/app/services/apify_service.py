import os
from apify_client import ApifyClient
from typing import Dict, Any, List, Optional

class ApifyService:
    def __init__(self):
        self.api_token = os.getenv("APIFY_API_TOKEN")
        self.client = ApifyClient(self.api_token) if self.api_token else None

    def scrape_profile_data(self, profile_url: str, platform: str = "instagram") -> List[Dict[str, Any]]:
        """Bir profilin son gönderilerini ve verilerini çeker."""
        if not self.client:
            raise Exception("Apify API token missing")

        if platform == "instagram":
            run_input = {
                "directUrls": [profile_url],
                "resultsLimit": 12,
                "addParentPost": False,
            }
            run = self.client.actor("apify/instagram-scraper").call(run_input=run_input)
        elif platform == "tiktok":
            run_input = {
                "profiles": [profile_url],
                "resultsPerPage": 12,
            }
            run = self.client.actor("clockworks/tiktok-scraper").call(run_input=run_input)
        else:
            raise ValueError("Unsupported platform for profile scraping")

        results = []
        for item in self.client.dataset(run["defaultDatasetId"]).iterate_items():
            results.append(item)
        
        return results

    def search_trending_content(self, topic: str, platform: str = "instagram") -> List[Dict[str, Any]]:
        # ... mevcut kod ...
        pass

    def scrape_instagram(self, url: str) -> Dict[str, Any]:
        # ... mevcut kod ...
        pass

    def scrape_tiktok(self, url: str) -> Dict[str, Any]:
        # ... mevcut kod ...
        pass

apify_service = ApifyService()
