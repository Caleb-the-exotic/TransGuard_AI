"""
TransGuard AI – Predictive Maintenance Recommendations Engine
Translates health indices and fault classifications into prioritized work orders and field actions.
"""

from typing import Dict, List, Any

def generate_recommendations(
    health_index: int,
    rul_years: float,
    faults: List[Dict[str, Any]],
    anomalies: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """
    Generates actionable prioritized recommendations for substation operators and maintenance planners.
    """
    recs = []

    if health_index < 55:
        recs.append({
            'priority': 'URGENT',
            'title': 'Emergency Outage Inspection',
            'action': 'Schedule immediate controlled shutdown. Health Index critically degraded.',
            'timeline': 'Within 24 hours',
            'reason': 'Multiple critical sensor deviations detected.'
        })
    elif health_index < 78:
        recs.append({
            'priority': 'HIGH',
            'title': 'Condition-Based Substation Visit',
            'action': 'Deploy field technician for thermal imaging and oil sampling.',
            'timeline': 'Within 7 days',
            'reason': 'Health Index indicates active warning threshold breaches.'
        })

    if rul_years < 3.0:
        recs.append({
            'priority': 'HIGH',
            'title': 'Asset Replacement Planning',
            'action': 'Initiate capital expenditure request for transformer rewinding or replacement.',
            'timeline': 'Within 3 months',
            'reason': f'Estimated Remaining Useful Life is critically short ({rul_years} years).'
        })

    for f in faults:
        recs.append({
            'priority': 'MEDIUM',
            'title': f"Targeted Diagnostic: {f['fault']}",
            'action': f['action'],
            'timeline': 'Next maintenance window',
            'reason': f"Risk: {f['risk']}"
        })

    if not recs:
        recs.append({
            'priority': 'LOW',
            'title': 'Routine Preventative Monitoring',
            'action': 'Maintain standard supervisory telemetry cycle. No intervention needed.',
            'timeline': 'Standard schedule (quarterly)',
            'reason': 'All electrical, thermal, and mechanical parameters nominal.'
        })

    return recs
