import React from 'react';
import { Button } from '../components/Button';
import { CheckCircle, Database, ArrowLeft } from 'lucide-react';

interface SuccessViewProps {
  onHome: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ onHome }) => {
  return (
    <div className="flex flex-col h-full bg-garra-bg p-8 justify-center items-center text-center animate-fade-in">
      
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 rounded-full"></div>
        <CheckCircle size={100} className="text-garra-success relative z-10" strokeWidth={1.5} />
      </div>

      <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
        OS Finalizada!
      </h1>
      
      <p className="text-gray-400 mb-12 text-lg">
        Excelente trabalho.
      </p>

      <div className="bg-garra-card border border-gray-700 p-6 rounded-lg w-full mb-12 flex items-center gap-4">
        <div className="bg-blue-500/20 p-3 rounded-full">
          <Database size={24} className="text-blue-400" />
        </div>
        <div className="text-left">
          <p className="text-xs text-gray-400 font-bold uppercase">Sincronização</p>
          <p className="text-white font-medium text-sm">Dados enviados para Logística Preditiva</p>
        </div>
      </div>

      <Button 
        fullWidth 
        onClick={onHome} 
        icon={<ArrowLeft size={20} />}
        className="animate-pulse shadow-[0_0_25px_rgba(237,137,54,0.4)] hover:animate-none hover:scale-[1.02] transition-all duration-300 ring-1 ring-white/10"
      >
        Voltar para Rotas
      </Button>

    </div>
  );
};