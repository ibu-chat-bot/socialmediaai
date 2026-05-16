-- jobs tablosu
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL, -- 'youtube_import', 'ai_analysis', 'social_scrape' vb.
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled')),
    progress INTEGER DEFAULT 0, -- 0-100 arası
    message TEXT, -- 'Metadata çekiliyor...', 'AI Analiz ediliyor...' vb.
    payload_json JSONB DEFAULT '{}'::JSONB, -- Giriş verileri
    result_json JSONB DEFAULT '{}'::JSONB, -- Başarılı sonuç verileri
    error_json JSONB DEFAULT '{}'::JSONB, -- Hata detayları
    board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hızlı takip için index
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_board_id ON jobs(board_id);
