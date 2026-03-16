'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface RadarChartProps {
  data: Array<{
    name: string;
    value: number;
    fill: string;
  }>;
}

export default function AnxietyRadarChart({ data }: RadarChartProps) {
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.value,
    fill: item.fill,
  }));

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={chartData}>
          <PolarGrid
            stroke="hsl(var(--border))"
            strokeOpacity={0.5}
            gridType="polygon"
          />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            angle={90}
            orientation="outer"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            label={{ position: 'insideBottomLeft', offset: -5 }}
          />
          <Radar
            name="焦慮程度"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            dot={{ fill: 'hsl(var(--primary))', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
