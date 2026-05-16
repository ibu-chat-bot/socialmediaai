-- boards tablosu
CREATE TABLE boards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Yeni Kanvas',
    description TEXT,
    settings JSONB DEFAULT '{"zoom": 1, "viewport": {"x": 0, "y": 0}}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- nodes tablosu
CREATE TABLE nodes (
    id TEXT PRIMARY KEY, -- React Flow node ID'si (string)
    board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT,
    position_x FLOAT NOT NULL,
    position_y FLOAT NOT NULL,
    width FLOAT,
    height FLOAT,
    data_json JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- edges tablosu
CREATE TABLE edges (
    id TEXT PRIMARY KEY,
    board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
    source_node_id TEXT NOT NULL,
    target_node_id TEXT NOT NULL,
    source_handle TEXT,
    target_handle TEXT,
    data_json JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- media_assets tablosu
CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    metadata_json JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
