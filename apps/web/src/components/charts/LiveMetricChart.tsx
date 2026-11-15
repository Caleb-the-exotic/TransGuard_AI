import React from 'react';
import ReactECharts from 'echarts-for-react';

interface LiveMetricChartProps {
  title: string;
  unit: string;
  data: Array<{ timeStr: string; v: number }>;
  color?: string;
  warnThreshold?: number;
  critThreshold?: number;
  height?: number;
}

export const LiveMetricChart: React.FC<LiveMetricChartProps> = ({
  title,
  unit,
  data,
  color = '#0284c7',
  warnThreshold,
  critThreshold,
  height = 240
}) => {
  const times = data.map(d => d.timeStr);
  const values = data.map(d => d.v);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0b1528',
      borderColor: '#1e2e54',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
      formatter: (params: any) => {
        const p = params[0];
        return `<div class="font-mono text-xs">
          <div class="text-slate-400 mb-1">${p.name}</div>
          <div class="font-bold text-white">${title}: <span style="color: ${color}">${p.value} ${unit}</span></div>
        </div>`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: times,
      axisLine: { lineStyle: { color: '#1e2e54' } },
      axisLabel: { color: '#64748b', fontSize: 10, fontFamily: 'monospace' }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#1e2e54', type: 'dashed' } },
      axisLabel: {
        color: '#64748b',
        fontSize: 10,
        fontFamily: 'monospace',
        formatter: `{value} ${unit}`
      }
    },
    series: [
      {
        name: title,
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbolSize: 6,
        data: values,
        lineStyle: { width: 2, color },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${color}40` },
              { offset: 1, color: `${color}00` }
            ]
          }
        },
        markLine: warnThreshold || critThreshold ? {
          silent: true,
          symbol: 'none',
          data: [
            warnThreshold ? {
              yAxis: warnThreshold,
              lineStyle: { color: '#f59e0b', type: 'dashed' },
              label: { show: true, formatter: 'WARN', color: '#f59e0b', fontSize: 9 }
            } : null,
            critThreshold ? {
              yAxis: critThreshold,
              lineStyle: { color: '#ef4444', type: 'solid' },
              label: { show: true, formatter: 'CRIT', color: '#ef4444', fontSize: 9 }
            } : null
          ].filter(Boolean)
        } : undefined
      }
    ]
  };

  return (
    <div className="w-full">
      <ReactECharts
        option={option}
        style={{ height: `${height}px`, width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};
