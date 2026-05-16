from fastapi import APIRouter, HTTPException, Depends
from typing import List
from pydantic import BaseModel
import uuid

router = APIRouter(prefix="/boards", tags=["boards"])

# Pydantic Schemas
class NodeSchema(BaseModel):
    id: str
    type: str
    position: dict
    data: dict

class EdgeSchema(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class BoardSaveSchema(BaseModel):
    name: str
    nodes: List[NodeSchema]
    edges: List[EdgeSchema]
    viewport: dict

# MOCK DATA STORE (For now, real DB logic will be integrated in next step)
# This allows the UI to work immediately while we wire up the Postgres connection.
temp_db = {}

@router.get("/")
async def list_boards():
    return list(temp_db.values())

@router.post("/")
async def create_board(name: str = "Yeni Kanvas"):
    board_id = str(uuid.uuid4())
    new_board = {"id": board_id, "name": name, "nodes": [], "edges": [], "viewport": {"x": 0, "y": 0, "zoom": 1}}
    temp_db[board_id] = new_board
    return new_board

@router.get("/{board_id}")
async def get_board(board_id: str):
    if board_id not in temp_db:
        raise HTTPException(status_code=404, detail="Board not found")
    return temp_db[board_id]

@router.post("/{board_id}/save")
async def save_board(board_id: str, data: BoardSaveSchema):
    if board_id not in temp_db:
        temp_db[board_id] = {"id": board_id, "name": data.name}
    
    temp_db[board_id].update({
        "name": data.name,
        "nodes": data.nodes,
        "edges": data.edges,
        "viewport": data.viewport
    })
    return {"status": "saved"}
