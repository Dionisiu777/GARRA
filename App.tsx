import React, { useState } from 'react';
import { Screen, ServiceOrder, OSPriority, OSStatus, Technician } from './types';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { DetailsView } from './views/DetailsView';
import { ExecutionView } from './views/ExecutionView';
import { PredictiveView } from './views/PredictiveView';
import { SuccessView } from './views/SuccessView';

// Mock Data
const MOCK_TECHNICIAN: Technician = {
  name: "Carlos Silva",
  vanStatus: "OK - Abastecida"
};

const MOCK_OS_LIST: ServiceOrder[] = [
  {
    id: "1234",
    schoolName: "Escola Municipal Recife A",
    description: "Troca de Disjuntor Principal",
    address: "Rua das Flores, 123 - Centro",
    priority: OSPriority.HIGH,
    status: OSStatus.PENDING,
    lastVisitDate: "15/08/2023",
    lastVisitTechnician: "João Souza",
    lastVisitPhotoUrl: "https://picsum.photos/400/300?grayscale"
  },
  {
    id: "1235",
    schoolName: "CMEI Pequeno Príncipe",
    description: "Vazamento na pia do refeitório",
    address: "Av. Brasil, 450 - Zona Norte",
    priority: OSPriority.MEDIUM,
    status: OSStatus.PENDING,
    lastVisitDate: "10/09/2023",
    lastVisitTechnician: "Pedro Santos",
    lastVisitPhotoUrl: "https://picsum.photos/400/301?grayscale"
  },
  {
    id: "1236",
    schoolName: "Escola Técnica Estadual",
    description: "Reparo na iluminação do ginásio",
    address: "Rua do Saber, 88 - Sul",
    priority: OSPriority.LOW,
    status: OSStatus.PENDING,
    lastVisitDate: "01/05/2023",
    lastVisitTechnician: "Carlos Silva",
    lastVisitPhotoUrl: "https://picsum.photos/400/302?grayscale"
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [selectedOS, setSelectedOS] = useState<ServiceOrder | null>(null);

  const handleLogin = () => setCurrentScreen(Screen.DASHBOARD);

  const handleSelectOS = (os: ServiceOrder) => {
    setSelectedOS(os);
    setCurrentScreen(Screen.DETAILS);
  };

  const handleStartService = () => setCurrentScreen(Screen.EXECUTION);
  
  const handleFinishExecution = () => setCurrentScreen(Screen.PREDICTIVE);

  const handleFinishPredictive = (status: 'green' | 'yellow' | 'red') => {
    console.log(`Predictive status submitted: ${status}`);
    setCurrentScreen(Screen.SUCCESS);
  };

  const handleBackToDashboard = () => {
    setSelectedOS(null);
    setCurrentScreen(Screen.DASHBOARD);
  };

  const handleBack = () => {
     if (currentScreen === Screen.DETAILS) setCurrentScreen(Screen.DASHBOARD);
     if (currentScreen === Screen.EXECUTION) setCurrentScreen(Screen.DETAILS);
     // Predictive cannot go back to execution in this flow to prevent re-upload
  };

  return (
    <div className="min-h-screen bg-garra-bg text-garra-text font-sans selection:bg-garra-accent selection:text-white">
      <div className="max-w-md mx-auto min-h-screen bg-garra-bg shadow-2xl relative overflow-hidden border-x border-gray-800">
        
        {currentScreen === Screen.LOGIN && (
          <LoginView onLogin={handleLogin} />
        )}

        {currentScreen === Screen.DASHBOARD && (
          <DashboardView 
            technician={MOCK_TECHNICIAN} 
            orders={MOCK_OS_LIST} 
            onSelectOS={handleSelectOS} 
          />
        )}

        {currentScreen === Screen.DETAILS && selectedOS && (
          <DetailsView 
            os={selectedOS} 
            onBack={handleBack} 
            onStart={handleStartService} 
          />
        )}

        {currentScreen === Screen.EXECUTION && selectedOS && (
          <ExecutionView 
            os={selectedOS} 
            onBack={handleBack}
            onFinish={handleFinishExecution} 
          />
        )}

        {currentScreen === Screen.PREDICTIVE && (
          <PredictiveView 
            onFinish={handleFinishPredictive} 
          />
        )}

        {currentScreen === Screen.SUCCESS && (
          <SuccessView 
            onHome={handleBackToDashboard} 
          />
        )}

      </div>
    </div>
  );
}