export interface Prize {
  id: string;
  label: string;
  code: string;
  probability: number;
  color: string;
}

export interface Lead {
  id: string;
  email: string;
  phone?: string;
  prize: string;
  prizeCode: string;
  timestamp: Date;
  claimed: boolean;
}

const DEFAULT_PRIZES: Prize[] = [
  { id: '1', label: 'iPhone 15 Pro', code: 'IPHONE15', probability: 2, color: 'hsl(38 100% 50%)' },
  { id: '2', label: '$500 Cash', code: 'CASH500', probability: 5, color: 'hsl(145 70% 45%)' },
  { id: '3', label: 'AirPods Pro', code: 'AIRPODS', probability: 8, color: 'hsl(280 80% 55%)' },
  { id: '4', label: '$100 Gift Card', code: 'GIFT100', probability: 15, color: 'hsl(200 80% 50%)' },
  { id: '5', label: 'Smart Watch', code: 'WATCH', probability: 10, color: 'hsl(320 70% 50%)' },
  { id: '6', label: '$50 Cash', code: 'CASH50', probability: 20, color: 'hsl(0 85% 55%)' },
  { id: '7', label: 'Bluetooth Speaker', code: 'SPEAKER', probability: 15, color: 'hsl(170 60% 45%)' },
  { id: '8', label: 'Try Again', code: '', probability: 25, color: 'hsl(240 10% 30%)' },
];

export const getPrizes = (): Prize[] => {
  const stored = localStorage.getItem('spinwheelPrizes');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('spinwheelPrizes', JSON.stringify(DEFAULT_PRIZES));
  return DEFAULT_PRIZES;
};

export const savePrizes = (prizes: Prize[]): void => {
  localStorage.setItem('spinwheelPrizes', JSON.stringify(prizes));
};

export const getLeads = (): Lead[] => {
  const stored = localStorage.getItem('spinwheelLeads');
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
};

export const saveLead = (lead: Omit<Lead, 'id' | 'timestamp' | 'claimed'>): Lead => {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    timestamp: new Date(),
    claimed: false,
  };
  leads.push(newLead);
  localStorage.setItem('spinwheelLeads', JSON.stringify(leads));
  return newLead;
};

export const spinWheel = (prizes: Prize[]): Prize => {
  const totalProbability = prizes.reduce((sum, p) => sum + p.probability, 0);
  let random = Math.random() * totalProbability;
  
  for (const prize of prizes) {
    random -= prize.probability;
    if (random <= 0) {
      return prize;
    }
  }
  
  return prizes[prizes.length - 1];
};
