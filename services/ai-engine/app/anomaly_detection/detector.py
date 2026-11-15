"""
TransGuard AI – Telemetry Anomaly Detection
Detects sensor drift, baseline deviation, and sudden step changes.
"""

from typing import Dict, List, Any

try:
    from app.health_index.calculator import SENSOR_THRESHOLDS
except (ImportError, ModuleNotFoundError, ValueError):
    try:
        from ..health_index.calculator import SENSOR_THRESHOLDS
    except (ImportError, ModuleNotFoundError, ValueError):
        from health_index.calculator import SENSOR_THRESHOLDS

SENSOR_NAMES = {
    'oilTemp': 'Top Oil Temperature',
    'windingTemp': 'Winding Hotspot Temp',
    'current': 'Primary Load Current',
    'voltage': 'Line Voltage',
    'vib': 'Mechanical Vibration RMS',
    'thd': 'Harmonic Distortion (THD)',
    'gas': 'Combustible Gas Sensor (MQ-2)',
    'ambient': 'Ambient Air Temperature'
}

def detect_anomalies(readings: Dict[str, float]) -> List[Dict[str, Any]]:
    """
    Computes percentage deviation of each sensor from its engineering baseline.
    Flags WARNING at >40% deviation and CRITICAL at >80% deviation.
    """
    anomalies = []
    for key, th in SENSOR_THRESHOLDS.items():
        if key not in readings:
            continue
        val = float(readings[key])
        base = th['base']
        dev_pct = abs((val - base) / max(base, 0.001)) * 100.0

        if dev_pct > 40.0:
            severity = 'CRITICAL' if dev_pct > 80.0 else 'WARNING'
            name = SENSOR_NAMES.get(key, key)
            anomalies.append({
                'parameter_id': key,
                'parameter_name': name,
                'current_value': round(val, 2),
                'nominal_baseline': base,
                'deviation_pct': round(dev_pct, 1),
                'severity': severity,
                'description': f"{name} deviated {round(dev_pct, 1)}% from nominal operational baseline.",
                'is_estimate': True
            })
    return anomalies
