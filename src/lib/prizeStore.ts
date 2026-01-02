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
  { id: '1', label: 'iPhone 15 Pro', code: 'iPhone 15 Pro', probability: 5, color: 'hsl(38 100% 50%)' },
  { id: '2', label: 'Samsung Galaxy S24', code: 'Samsung Galaxy S24', probability: 8, color: 'hsl(280 80% 55%)' },
  { id: '3', label: 'MacBook Air M3', code: 'MacBook Air M3', probability: 5, color: 'hsl(145 70% 45%)' },
  { id: '4', label: 'Sony WH-1000XM5 Headphones', code: 'Sony WH-1000XM5 Headphones', probability: 12, color: 'hsl(0 85% 55%)' },
  { id: '5', label: 'Apple Watch Series 9', code: 'Apple Watch Series 9', probability: 10, color: 'hsl(200 80% 50%)' },
  { id: '6', label: 'iPad Pro 12.9"', code: 'iPad Pro 12.9"', probability: 8, color: 'hsl(120 75% 45%)' },
  { id: '7', label: 'Google Pixel 8 Pro', code: 'Google Pixel 8 Pro', probability: 12, color: 'hsl(280 60% 50%)' },
  { id: '8', label: 'Nintendo Switch OLED', code: 'Nintendo Switch OLED', probability: 15, color: 'hsl(350 85% 55%)' },
  { id: '9', label: 'Samsung 4K Smart TV 55"', code: 'Samsung 4K Smart TV 55"', probability: 5, color: 'hsl(200 70% 45%)' },
  { id: '10', label: 'Try Again', code: '', probability: 20, color: 'hsl(240 10% 30%)' },
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
