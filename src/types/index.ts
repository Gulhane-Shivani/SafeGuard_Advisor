export interface InsurancePlan {
  id: string;
  title: string;
  type: 'health' | 'life' | 'auto' | 'home';
  price: number;
  provider: string;
  features: string[];
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  policies: string[];
}
