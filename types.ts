export enum Screen {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  DETAILS = 'DETAILS',
  EXECUTION = 'EXECUTION',
  PREDICTIVE = 'PREDICTIVE',
  SUCCESS = 'SUCCESS'
}

export enum OSStatus {
  PENDING = 'Pendente',
  IN_PROGRESS = 'Em Andamento',
  COMPLETED = 'Finalizada'
}

export enum OSPriority {
  HIGH = 'Alta',
  MEDIUM = 'Média',
  LOW = 'Baixa'
}

export interface ServiceOrder {
  id: string;
  schoolName: string;
  description: string;
  address: string;
  priority: OSPriority;
  status: OSStatus;
  lastVisitDate: string;
  lastVisitTechnician: string;
  lastVisitPhotoUrl: string; // URL for the "Visual History"
}

export interface Technician {
  name: string;
  vanStatus: string;
}