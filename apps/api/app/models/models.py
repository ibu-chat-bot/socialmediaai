from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.db.base import Base

class Board(Base):
    __tablename__ = "boards"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, default="Yeni Kanvas")
    description = Column(String, nullable=True)
    settings = Column(JSON, default={"zoom": 1, "viewport": {"x": 0, "y": 0}})
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    nodes = relationship("Node", back_populates="board", cascade="all, delete-orphan")
    edges = relationship("Edge", back_populates="board", cascade="all, delete-orphan")

class Node(Base):
    __tablename__ = "nodes"

    id = Column(String, primary_key=True)
    board_id = Column(UUID(as_uuid=True), ForeignKey("boards.id", ondelete="CASCADE"))
    type = Column(String, nullable=False)
    title = Column(String, nullable=True)
    position_x = Column(Float, nullable=False)
    position_y = Column(Float, nullable=False)
    width = Column(Float, nullable=True)
    height = Column(Float, nullable=True)
    data_json = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    board = relationship("Board", back_populates="nodes")

class Edge(Base):
    __tablename__ = "edges"

    id = Column(String, primary_key=True)
    board_id = Column(UUID(as_uuid=True), ForeignKey("boards.id", ondelete="CASCADE"))
    source_node_id = Column(String, nullable=False)
    target_node_id = Column(String, nullable=False)
    source_handle = Column(String, nullable=True)
    target_handle = Column(String, nullable=True)
    data_json = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    board = relationship("Board", back_populates="edges")
