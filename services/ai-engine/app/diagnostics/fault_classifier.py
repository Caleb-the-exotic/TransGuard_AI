"""
TransGuard AI – Fault Classification & Diagnostic Reasoning
Transparent rule-based expert diagnostic engine.
"""

from typing import Dict, List, Any

try:
    from app.health_index.calculator import SENSOR_THRESHOLDS
except (ImportError, ModuleNotFoundError, ValueError):
    try:
        from ..health_index.calculator import SENSOR_THRESHOLDS
    except (ImportError, ModuleNotFoundError, ValueError):
        from health_index.calculator import SENSOR_THRESHOLDS

def classify_faults(readings: Dict[str, float]) -> List[Dict[str, Any]]:
    """
    Classifies industrial transformer fault signatures from real-time parameters.
    Labels confidence transparently as rule-based expert system outputs.
    """
    t = SENSOR_THRESHOLDS
    detected = []

    wt = float(readings.get('windingTemp', 0))
    ot = float(readings.get('oilTemp', 0))
    vib = float(readings.get('vib', 0))
    thd = float(readings.get('thd', 0))
    gas = float(readings.get('gas', 0))

    if wt > t['windingTemp']['warn'] or ot > t['oilTemp']['warn']:
        confidence = min(96.0, 65.0 + (wt - t['windingTemp']['warn']) * 2.0)
        detected.append({
            'fault': 'Thermal Overload & Radiator Fouling',
            'confidence': round(confidence, 1),
            'risk': 'Accelerated Kraft paper tensile breakdown & oil sludging',
            'action': 'Check cooling fan contactors, clean radiator bank, verify ambient airflow.',
            'category': 'Thermal'
        })

    if vib > t['vib']['warn']:
        detected.append({
            'fault': 'Core Magnetostriction / Winding Looseness',
            'confidence': 88.0,
            'risk': 'Mechanical fatigue on core clamps and winding tie-rods',
            'action': 'Perform vibration spectrum analysis; verify tie-rod torque during next outage.',
            'category': 'Mechanical'
        })

    if thd > t['thd']['warn']:
        detected.append({
            'fault': 'Harmonic Distortion & Eddy Loss Overheating',
            'confidence': 91.0,
            'risk': 'Excessive stray eddy losses causing localized tank wall hotspotting',
            'action': 'Inspect active/passive harmonic filters at feeder breaker.',
            'category': 'Electrical'
        })

    if gas > t['gas']['warn']:
        detected.append({
            'fault': 'Combustible Gas Elevation / Suspected Arcing',
            'confidence': 85.0,
            'risk': 'Potential dielectric breakdown of mineral insulating oil',
            'action': 'Draw physical oil sample for laboratory ASTM D3612 Dissolved Gas Analysis (DGA). NOTE: MQ-2 detects ambient gas only, not dissolved oil gases.',
            'category': 'Dielectric'
        })

    return detected
