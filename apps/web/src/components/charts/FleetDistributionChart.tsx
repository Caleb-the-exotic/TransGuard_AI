import React from 'react';
import ReactECharts from 'echarts-for-react';

interface FleetDistributionChartProps {
  healthy: number;
  warning: number;
  critical: number;
  height?: number;
}

export const FleetDistributionChart: React.FC<FleetDistributionChartProps> = ({
  healthy,
  warning,
  critical,
  height = 200
}) => {
  const total = healthy + warning + critical || 1;

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#0b1528',
      borderColor: '#1e2e54',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
      formatter: '{b}: <span style="font-weight: bold">{c}</span> ({d}%)'
    },
    legend: {
      bottom: '0%',
      left: 'center',
      textStyle: { color: '#94a3b8', fontSize: 11 },
      icon: 'circle'
    },
    series: [
      {
        name: 'Asset Health',
        type: 'pie',
        radius: ['52%', '75%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#0b1528',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#ffffff',
            formatter: '{d}%'
          }
        },
        labelLine: { show: false },
        data: [
          { value: healthy, name: 'Normal / Healthy', itemStyle: { color: '#10b981' } },
          { value: warning, name: 'Warning', itemStyle: { color: '#f59e0b' } },
          { value: critical, name: 'Critical Risk', itemStyle: { color: '#ef4444' } }
        ]
      }
    ]
  };

  return (
    <div className="w-full relative">
      <ReactECharts
        option={option}
        style={{ height: `${height}px`, width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <span className="text-xl font-bold font-mono text-white">{total}</span>
        <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Assets</span>
      </div>
    </div>
  );
};
