"""
TransGuard AI – Remaining Useful Life (RUL) Estimator
Based on IEEE C57.91 Arrhenius Thermal Life Model for Mineral-Oil-Immersed Transformers.
Formula:
  F_AA = exp(15000 / 383 - 15000 / (theta_H + 273))
  RUL_years = 16.5 / (F_AA ^ 0.55) [clamped to 0.8 - 18.5 years]
"""

import math
from typing import Dict, Any

def compute_rul(winding_temp: float, scale: str = "field") -> Dict[str, Any]:
    """
    Computes Aging Acceleration Factor (F_AA) and estimated Remaining Useful Life (RUL).
    [RULE-BASED ESTIMATE – transparently disclosed]
    """
    theta_h = float(winding_temp)

    # Normalize if bench scale
    if scale == "bench":
        theta_h = 65.0 + (theta_h - 35.0) * 1.4

    # IEEE C57.91 Insulation Aging Acceleration Factor
    faa = max(0.25, min(12.5, math.exp(15000.0 / 383.0 - 15000.0 / (theta_h + 273.0))))
    rul_years = max(0.8, min(18.5, 16.5 / math.pow(faa, 0.55)))
    rul_pct = max(8, min(98, round((rul_years / 16.0) * 100.0)))

    return {
        'faa': round(faa, 4),
        'rul_years': round(rul_years, 1),
        'rul_pct': rul_pct,
        'winding_hotspot_c': round(theta_h, 1),
        'nominal_design_life_years': 30,
        'method': 'ieee_c57_91_thermal_arrhenius',
        'is_estimate': True,
        'disclaimer': '[RULE-BASED ESTIMATE] Based on IEEE C57.91 standard insulation aging model; not a validated black-box ML model.'
    }
