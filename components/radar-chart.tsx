'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const AVERAGE_SCORES: Record<string, number> = {
  收入: 55,
  債務: 48,
  規劃: 60,
  應急: 52,
  關係: 44,
};

interface RadarChartProps {
  data: Array<{
    name: string;
    value: number;
    fill: string;
  }>;
}

const renderLegend = () => (
  <div className="flex items-center justify-center gap-6 pt-2">
    <div className="flex items-center gap-2">
      <span
        style={{
          display: 'inline-block',
          width: 28,
          height: 3,
          backgroundColor: '#EC4899',
          borderRadius: 2,
        }}
      />
      <span style={{ fontSize: 13, color: '#6B7280' }}>我的焦慮</span>
    </div>
    <div className="flex items-center gap-2">
      <span
        style={{
          display: 'inline-block',
          width: 28,
          height: 3,
          backgroundColor: '#9CA3AF',
          borderRadius: 2,
        }}
      />
      <span style={{ fontSize: 13, color: '#6B7280' }}>大家平均</span>
    </div>
  </div>
);

export default function AnxietyRadarChart({ data }: RadarChartProps) {
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.value,
    averageValue: AVERAGE_SCORES[item.name] ?? 50,
  }));

  return (
    <div className="w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height={420}>
        <RadarChart
          data={chartData}
          margin={{ top: 10, right: 40, bottom: 10, left: 40 }}
        >
          <PolarGrid
            stroke="#CBD5E1"
            strokeWidth={1}
            gridType="polygon"
          />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: '#374151', fontSize: 13, fontWeight: 500 }}
            orientation="outer"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            axisLine={false}
          />
          {/* 大家平均（灰色，畫在下層） */}
          <Radar
            name="大家平均"
            dataKey="averageValue"
            stroke="#9CA3AF"
            strokeWidth={2}
            fill="#9CA3AF"
            fillOpacity={0.15}
            dot={false}
            activeDot={{ r: 5, fill: '#9CA3AF' }}
          />
          {/* 我的焦慮（粉紅色，畫在上層） */}
          <Radar
            name="我的焦慮"
            dataKey="value"
            stroke="#EC4899"
            strokeWidth={2.5}
            fill="#EC4899"
            fillOpacity={0.25}
            dot={false}
            activeDot={{ r: 5, fill: '#EC4899' }}
          />
          <Legend content={renderLegend} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
