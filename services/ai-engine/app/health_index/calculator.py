"""
TransGuard AI – Transformer Health Index (THI) Engine
Implements IEEE C57.91 weighted multi-parameter asset degradation scoring.
Weights:
  - Winding Hotspot Thermal Stress: 28%
  - Top-Oil Degradation / Cooling:  24%
  - Power Quality (THD Harmonics): 18%
  - Mechanical Vibration / Clamping: 16%
  - Primary Load Overcurrent:       14%
"""

from typing import Dict, Any

SENSOR_THRESHOLDS = {
    'oilTemp':     {'base': 54.2, 'warn': 75.0,  'crit': 90.0},
    'windingTemp': {'base': 68.5, 'warn': 95.0,  'crit': 115.0},
    'current':     {'base': 120.0,'warn': 180.0, 'crit': 220.0},
    'voltage':     {'base': 415.0,'warn': 430.0, 'crit': 440.0},
    'vib':         {'base': 1.2,  'warn': 2.5,   'crit': 4.0},
    'thd':         {'base': 2.5,  'warn': 5.0,   'crit': 8.0},
    'gas':         {'base': 120.0,'warn': 300.0, 'crit': 450.0},
    'ambient':     {'base': 32.0, 'warn': 45.0,  'crit': 55.0},
}

WEIGHTS = {
    'winding': 0.28,
    'oil':     0.24,
    'pq':      0.18,
    'mech':    0.16,
    'load':    0.14,
}

def calc_sub_score(val: float, base: float, crit: float) -> int:
    """Calculates non-linear health sub-score [12-100]. [RULE-BASED ESTIMATE]"""
    if val <= base:
        ratio = val / max(base, 0.001)
        return min(100, round(95 + (1.0 - ratio) * 5.0))
    ratio = (val - base) / max(0.1, crit - base)
    return max(12, min(98, round(96.0 - ratio * 65.0)))

def compute_health_index(readings: Dict[str, float], scale: str = "field") -> Dict[str, Any]:
    """
    Computes overall Transformer Health Index (THI), sub-scores, and operational status.
    All calculations are transparently labelled as [RULE-BASED ESTIMATE].
    """
    t = SENSOR_THRESHOLDS

    wt = float(readings.get('windingTemp', t['windingTemp']['base']))
    ot = float(readings.get('oilTemp', t['oilTemp']['base']))
    thd = float(readings.get('thd', t['thd']['base']))
    vib = float(readings.get('vib', t['vib']['base']))
    curr = float(readings.get('current', t['current']['base']))

    winding_score = calc_sub_score(wt, t['windingTemp']['base'], t['windingTemp']['crit'])
    oil_score     = calc_sub_score(ot, t['oilTemp']['base'], t['oilTemp']['crit'])
    pq_score      = calc_sub_score(thd, t['thd']['base'], t['thd']['crit'])
    mech_score    = calc_sub_score(vib, t['vib']['base'], t['vib']['crit'])
    load_score    = calc_sub_score(curr, t['current']['base'], t['current']['crit'])

    health_index = round(
        winding_score * WEIGHTS['winding'] +
        oil_score     * WEIGHTS['oil'] +
        pq_score      * WEIGHTS['pq'] +
        mech_score    * WEIGHTS['mech'] +
        load_score    * WEIGHTS['load']
    )

    # Sensor status checking
    def get_status(key: str, val: float) -> str:
        th = t.get(key, {})
        if val >= th.get('crit', 999999):
            return 'CRITICAL'
        if val >= th.get('warn', 999999):
            return 'WARNING'
        return 'NORMAL'

    any_crit = any(get_status(k, float(readings.get(k, 0))) == 'CRITICAL' for k in t)
    any_warn = any(get_status(k, float(readings.get(k, 0))) == 'WARNING' for k in t)

    if any_crit or health_index < 55:
        overall_status = 'CRITICAL'
    elif any_warn or health_index < 78:
        overall_status = 'WARNING'
    else:
        overall_status = 'NORMAL'

    return {
        'health_index': health_index,
        'winding_score': winding_score,
        'oil_score': oil_score,
        'pq_score': pq_score,
        'mech_score': mech_score,
        'load_score': load_score,
        'overall_status': overall_status,
        'weights': WEIGHTS,
        'method': 'ieee_c57_91_multivariable_weighted',
        'is_estimate': True,
        'disclaimer': '[RULE-BASED ESTIMATE] Preliminary engineering calculation pending site-specific DGA calibration.'
    }
