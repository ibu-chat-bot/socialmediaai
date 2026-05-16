import os
import base64
from typing import Optional, List, Dict, Any, AsyncGenerator
from openai import OpenAI
from anthropic import Anthropic
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.openai_key = os.getenv("OPENAI_API_KEY")
        self.anthropic_key = os.getenv("ANTHROPIC_API_KEY")
        self.gemini_key = os.getenv("GEMINI_API_KEY")

        self.openai_client = OpenAI(api_key=self.openai_key) if self.openai_key else None
        self.anthropic_client = Anthropic(api_key=self.anthropic_key) if self.anthropic_key else None
        if self.gemini_key:
            genai.configure(api_key=self.gemini_key)

    async def chat_stream(self, prompt: str, context: str = "", provider: str = "openai", model: Optional[str] = None) -> AsyncGenerator[str, None]:
        system_prompt = f"Sen bir viral içerik stratejistisin. Bağlam: {context}"
        if provider == "openai":
            response = self.openai_client.chat.completions.create(
                model=model or "gpt-4o",
                messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": prompt}],
                stream=True
            )
            for chunk in response:
                if chunk.choices[0].delta.content: yield chunk.choices[0].delta.content
        # ... diğer sağlayıcılar aynı kalır ...

    async def analyze_image(self, image_path: str, prompt: str = "Bu görseli detaylıca analiz et.") -> str:
        """OpenAI Vision kullanarak görseli analiz eder."""
        if not self.openai_client:
            raise Exception("OpenAI required for Vision")

        with open(image_path, "rb") as image_file:
            base64_image = base64.b64encode(image_file.read()).decode('utf-8')

        response = self.openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                    ],
                }
            ],
            max_tokens=500,
        )
        return response.choices[0].message.content

    async def transcribe_audio(self, audio_path: str) -> str:
        """OpenAI Whisper kullanarak ses dosyasını deşifre eder."""
        if not self.openai_client:
            raise Exception("OpenAI required for Whisper")

        with open(audio_path, "rb") as audio_file:
            transcript = self.openai_client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file
            )
        return transcript.text

ai_service = AIService()
