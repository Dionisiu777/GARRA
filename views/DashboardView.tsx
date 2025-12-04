import React, { useState } from 'react';
import { ServiceOrder, Technician, OSPriority } from '../types';
import { Truck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface DashboardViewProps {
  technician: Technician;
  orders: ServiceOrder[];
  onSelectOS: (os: ServiceOrder) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ technician, orders, onSelectOS }) => {
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  const getPriorityColor = (priority: OSPriority) => {
    switch (priority) {
      case OSPriority.HIGH: return 'text-garra-danger border-garra-danger';
      case OSPriority.MEDIUM: return 'text-garra-warning border-garra-warning';
      case OSPriority.LOW: return 'text-garra-success border-garra-success';
    }
  };

  const handleCardClick = (os: ServiceOrder) => {
    if (processingId) return; // Prevent double clicks
    setProcessingId(os.id);
    
    // Delay navigation slightly to show the feedback
    setTimeout(() => {
      onSelectOS(os);
    }, 350);
  };

  return (
    <div className="flex flex-col h-full bg-garra-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-garra-bg/95 backdrop-blur-sm border-b border-gray-800 p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase">Bem-vindo,</p>
            <h2 className="text-2xl font-black text-white">{technician.name}</h2>
          </div>
          <div className="flex items-center gap-2 bg-garra-card px-3 py-1 rounded-full border border-gray-700">
            <Truck size={14} className="text-garra-accent" />
            <span className="text-xs font-bold text-gray-300">{technician.vanStatus}</span>
          </div>
        </div>
      </header>

      {/* List */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-2 px-2">
          <h3 className="text-gray-400 font-bold uppercase text-xs tracking-wider">Ordens de Serviço ({orders.length})</h3>
        </div>

        {orders.map((os) => {
          const isProcessing = processingId === os.id;
          return (
            <div 
              key={os.id}
              onClick={() => handleCardClick(os)}
              className={`
                bg-garra-card p-5 rounded-lg border-l-4 transition-all cursor-pointer shadow-md group
                ${isProcessing 
                  ? 'border-garra-accent bg-gray-800 scale-[0.98] ring-1 ring-garra-accent/50 shadow-[0_0_20px_rgba(237,137,54,0.15)]' 
                  : 'border-gray-600 hover:border-garra-accent hover:bg-gray-700 active:scale-95'}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">OS #{os.id}</span>
                <span className={`text-xs font-bold border px-2 py-0.5 rounded uppercase ${getPriorityColor(os.priority)}`}>
                  {os.priority}
                </span>
              </div>
              
              <h4 className={`text-lg font-bold text-white mb-1 transition-colors ${isProcessing ? 'text-garra-accent' : 'group-hover:text-garra-accent'}`}>
                {os.schoolName}
              </h4>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {os.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-1">
                  <Clock size={12} className={isProcessing ? "animate-spin text-garra-accent" : ""} />
                  <span className={isProcessing ? "text-garra-accent" : ""}>{isProcessing ? "Abrindo..." : "08:00 - 12:00"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle size={12} />
                  <span>Elétrica</span>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};