import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface RiskChartProps {
  riskScore: number;
  size?: number;
}

export const RiskChart: React.FC<RiskChartProps> = ({ riskScore, size = 200 }) => {
  const isUnsafe = riskScore > 50;
  
  const data = [
    { name: 'Risk', value: riskScore },
    { name: 'Safe', value: 100 - riskScore },
  ];

  const COLORS = {
    risk: isUnsafe ? '#EF4444' : riskScore > 30 ? '#F59E0B' : '#10B981',
    safe: '#E5E7EB',
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <ResponsiveContainer width={size} height={size}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={size * 0.25}
              outerRadius={size * 0.4}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell key="risk" fill={COLORS.risk} />
              <Cell key="safe" fill={COLORS.safe} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-gray-900">{riskScore}</div>
          <div className="text-sm text-gray-600">Risk Score</div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          isUnsafe 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          <div className={`w-3 h-3 rounded-full mr-2 ${
            isUnsafe ? 'bg-red-400' : 'bg-green-400'
          }`} />
          {isUnsafe ? 'Unsafe' : 'Safe'}
        </div>
      </div>
    </div>
  );
};