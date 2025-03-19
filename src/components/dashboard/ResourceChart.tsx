
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ResourceChartProps {
  title: string;
  description?: string;
  type: 'area' | 'bar' | 'pie';
  data: any[];
  className?: string;
}

const COLORS = ['#326CE5', '#00C48C', '#FFB547', '#FF647C'];

const ResourceChart: React.FC<ResourceChartProps> = ({
  title,
  description,
  type,
  data,
  className
}) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#326CE5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#326CE5" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 10 }} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 8, 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#326CE5" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 10 }} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 8, 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                }} 
              />
              <Legend 
                iconType="circle" 
                iconSize={8} 
                wrapperStyle={{ fontSize: 10, paddingTop: 10 }}
              />
              <Bar dataKey="cpu" fill="#326CE5" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="memory" fill="#00C48C" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 8, 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                }} 
                formatter={(value) => [`${value}`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-2">
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default ResourceChart;
