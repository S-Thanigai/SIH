import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WaterQualityData {
  id: string;
  location: string;
  date: string;
  time: string;
  pH: number;
  turbidity: number;
  chloride: number;
  nitrite: number;
  tds: number;
  riskScore: number;
  isUnsafe: boolean;
}

export interface OutbreakAlert {
  id: string;
  location: string;
  predictionDays: number;
  probability: number;
  severity: 'Low' | 'Moderate' | 'High';
  description: string;
  date: string;
}

interface DataContextType {
  waterQualityData: WaterQualityData[];
  outbreakAlerts: OutbreakAlert[];
  addWaterQualityData: (data: Omit<WaterQualityData, 'id' | 'riskScore' | 'isUnsafe'>) => void;
  getLocationData: (location: string) => WaterQualityData[];
  getCurrentRiskScore: () => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Mock data
const initialWaterQualityData: WaterQualityData[] = [
  {
    id: '1',
    location: 'Guwahati Central',
    date: '2025-01-15',
    time: '10:30',
    pH: 7.2,
    turbidity: 2.5,
    chloride: 45,
    nitrite: 0.8,
    tds: 180,
    riskScore: 25,
    isUnsafe: false,
  },
  {
    id: '2',
    location: 'Dibrugarh East',
    date: '2025-01-14',
    time: '14:15',
    pH: 6.8,
    turbidity: 5.2,
    chloride: 78,
    nitrite: 1.5,
    tds: 220,
    riskScore: 65,
    isUnsafe: true,
  },
  {
    id: '3',
    location: 'Tezpur North',
    date: '2025-01-13',
    time: '09:45',
    pH: 7.5,
    turbidity: 1.8,
    chloride: 32,
    nitrite: 0.5,
    tds: 150,
    riskScore: 18,
    isUnsafe: false,
  },
];

const initialOutbreakAlerts: OutbreakAlert[] = [
  {
    id: '1',
    location: 'Dibrugarh East',
    predictionDays: 7,
    probability: 75,
    severity: 'High',
    description: 'High risk of waterborne disease outbreak due to elevated turbidity and nitrite levels',
    date: '2025-01-15',
  },
  {
    id: '2',
    location: 'Silchar South',
    predictionDays: 12,
    probability: 45,
    severity: 'Moderate',
    description: 'Moderate risk detected - monitor water treatment processes',
    date: '2025-01-14',
  },
];

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [waterQualityData, setWaterQualityData] = useState<WaterQualityData[]>(initialWaterQualityData);
  const [outbreakAlerts] = useState<OutbreakAlert[]>(initialOutbreakAlerts);

  const calculateRiskScore = (data: Omit<WaterQualityData, 'id' | 'riskScore' | 'isUnsafe'>) => {
    // Simple risk calculation based on parameter ranges
    let score = 0;
    
    // pH (ideal: 6.5-8.5)
    if (data.pH < 6.5 || data.pH > 8.5) score += 20;
    else if (data.pH < 7.0 || data.pH > 8.0) score += 10;
    
    // Turbidity (ideal: <1 NTU)
    if (data.turbidity > 5) score += 25;
    else if (data.turbidity > 2) score += 15;
    else if (data.turbidity > 1) score += 8;
    
    // Chloride (ideal: <250 mg/L)
    if (data.chloride > 250) score += 20;
    else if (data.chloride > 100) score += 10;
    
    // Nitrite (ideal: <1 mg/L)
    if (data.nitrite > 3) score += 30;
    else if (data.nitrite > 1) score += 15;
    
    // TDS (ideal: <500 mg/L)
    if (data.tds > 500) score += 15;
    else if (data.tds > 300) score += 8;
    
    return Math.min(score, 100);
  };

  const addWaterQualityData = (data: Omit<WaterQualityData, 'id' | 'riskScore' | 'isUnsafe'>) => {
    const riskScore = calculateRiskScore(data);
    const newData: WaterQualityData = {
      ...data,
      id: Date.now().toString(),
      riskScore,
      isUnsafe: riskScore > 50,
    };
    
    setWaterQualityData(prev => [newData, ...prev]);
  };

  const getLocationData = (location: string) => {
    return waterQualityData.filter(data => data.location === location);
  };

  const getCurrentRiskScore = () => {
    if (waterQualityData.length === 0) return 0;
    return waterQualityData[0].riskScore;
  };

  const value: DataContextType = {
    waterQualityData,
    outbreakAlerts,
    addWaterQualityData,
    getLocationData,
    getCurrentRiskScore,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};