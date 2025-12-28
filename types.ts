
export type UserRole = 'admin' | 'user';

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'draft';
  recipients: number;
  clickRate: number;
  reportRate: number;
  date: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  link?: string;
}

export interface SecurityTip {
  title: string;
  content: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface EmailAnalysisResult {
  riskScore: number;
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  classification: string;
  findings: string[];
  recommendations: string[];
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
