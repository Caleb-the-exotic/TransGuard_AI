"""
TransGuard AI – FastAPI AI & Diagnostic Analytics Engine
Provides REST APIs for:
  - Transformer Health Index (THI) calculation
  - Remaining Useful Life (RUL) estimation
  - Telemetry anomaly detection
  - Fault classification & diagnostics
  - Prioritized predictive maintenance recommendations
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional, List
import datetime

from .health_index.calculator import compute_health_index
from .rul.estimator import compute_rul
from .anomaly_detection.detector import detect_anomalies
from .diagnostics.fault_classifier import classify_faults
from .recommendations.engine import generate_recommendations

app = FastAPI(
    title="TransGuard AI Diagnostic Engine",
    description="Industrial AI/IoT Predictive Maintenance Analytics Service for Distribution Transformers",
    version="3.0.0"
)

# CORS middleware for cross-service communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TelemetryPayload(BaseModel):
    asset_id: Optional[str] = Field(default="TG-TX-101", description="Transformer Asset ID")
    oilTemp: float = Field(default=54.2, description="Top-Oil Temperature (°C)")
    windingTemp: float = Field(default=68.5, description="Winding Hotspot Temperature (°C)")
    current: float = Field(default=120.0, description="Primary Load Current (A)")
    voltage: float = Field(default=415.0, description="Line Voltage (V)")
    vib: float = Field(default=1.2, description="Vibration RMS (m/s²)")
    thd: float = Field(default=2.5, description="Harmonic Distortion (%)")
    gas: float = Field(default=120.0, description="Combustible Gas Concentration (ppm)")
    ambient: Optional[float] = Field(default=32.0, description="Ambient Temperature (°C)")
    humidity: Optional[float] = Field(default=50.0, description="Ambient Humidity (% RH)")
    scale: Optional[str] = Field(default="field", description="Operational scale (bench | field)")

class HealthAssessmentResponse(BaseModel):
    asset_id: str
    timestamp: str
    health_index: int
    overall_status: str
    rul_years: float
    rul_pct: int
    sub_scores: Dict[str, int]
    anomalies: List[Dict[str, Any]]
    faults: List[Dict[str, Any]]
    recommendations: List[Dict[str, Any]]
    metadata: Dict[str, Any]

@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "transguard-ai-engine",
        "version": "3.0.0",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }

@app.post("/api/v1/ai/assess", response_model=HealthAssessmentResponse)
def assess_transformer_health(payload: TelemetryPayload):
    """
    Performs comprehensive predictive maintenance assessment on raw telemetry.
    Returns: Health Index, RUL, detected anomalies, fault signatures, and maintenance actions.
    """
    readings = {
        'oilTemp': payload.oilTemp,
        'windingTemp': payload.windingTemp,
        'current': payload.current,
        'voltage': payload.voltage,
        'vib': payload.vib,
        'thd': payload.thd,
        'gas': payload.gas,
        'ambient': payload.ambient or 32.0,
        'humidity': payload.humidity or 50.0
    }

    scale = payload.scale or "field"
    health_res = compute_health_index(readings, scale=scale)
    rul_res = compute_rul(payload.windingTemp, scale=scale)
    anomalies = detect_anomalies(readings)
    faults = classify_faults(readings)
    recommendations = generate_recommendations(
        health_index=health_res['health_index'],
        rul_years=rul_res['rul_years'],
        faults=faults,
        anomalies=anomalies
    )

    return HealthAssessmentResponse(
        asset_id=payload.asset_id or "UNKNOWN",
        timestamp=datetime.datetime.now(datetime.timezone.utc).isoformat(),
        health_index=health_res['health_index'],
        overall_status=health_res['overall_status'],
        rul_years=rul_res['rul_years'],
        rul_pct=rul_res['rul_pct'],
        sub_scores={
            'winding': health_res['winding_score'],
            'oil': health_res['oil_score'],
            'power_quality': health_res['pq_score'],
            'mechanical': health_res['mech_score'],
            'load': health_res['load_score']
        },
        anomalies=anomalies,
        faults=faults,
        recommendations=recommendations,
        metadata={
            'faa': rul_res['faa'],
            'weights': health_res['weights'],
            'model_type': 'transparent_rule_based_ieee_c57_91',
            'disclaimer': '[RULE-BASED ESTIMATE] Outputs are deterministic engineering calculations based on IEEE standards.'
        }
    )
