import React from 'react';
import { Button } from '../components/Button';
import { Activity, ThumbsUp, AlertTriangle, XOctagon } from 'lucide-react';

interface PredictiveViewProps {
  onFinish: (status: 'green' | 'yellow' | 'red') => void;
}

export const PredictiveView: React.FC<PredictiveViewProps> = ({ onFinish }) => {
  return (
    <div className="flex flex-col h-full bg-garra-bg p-6 animate-fade-in">
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2">
        <Activity size={64} className="text-garra-accent mb-4" />
        <h2 className="text-3xl font-black text-white uppercase">Vistoria Preditiva</h2>
        <p className="text-gray-400 text-lg max-w-xs">
          Qual a saúde geral do equipamento ao redor?
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <button 
          onClick={() => onFinish('green')}
          className="w-full h-24 rounded-xl bg-garra-success hover:bg-green-600 transition-colors flex items-center px-6 gap-6 group border-2 border-transparent hover:border-white shadow-lg active:scale-95"
        >
          <div className="bg-white/20 p-3 rounded-full">
            <ThumbsUp size={32} className="text-white" />
          </div>
          <div className="text-left">
            <span className="block text-2xl font-black text-white uppercase">Tudo OK</span>
            <span className="text-green-100 text-sm font-medium">Equipamento saudável</span>
          </div>
        </button>

        <button 
          onClick={() => onFinish('yellow')}
          className="w-full h-24 rounded-xl bg-garra-warning hover:bg-yellow-500 transition-colors flex items-center px-6 gap-6 group border-2 border-transparent hover:border-white shadow-lg active:scale-95"
        >
          <div className="bg-black/10 p-3 rounded-full">
            <AlertTriangle size={32} className="text-yellow-900" />
          </div>
          <div className="text-left">
            <span className="block text-2xl font-black text-yellow-900 uppercase">Atenção</span>
            <span className="text-yellow-800 text-sm font-bold">Desgaste / Ruído / Sujeira</span>
          </div>
        </button>

        <button 
          onClick={() => onFinish('red')}
          className="w-full h-24 rounded-xl bg-garra-danger hover:bg-red-600 transition-colors flex items-center px-6 gap-6 group border-2 border-transparent hover:border-white shadow-lg active:scale-95"
        >
          <div className="bg-white/20 p-3 rounded-full">
            <XOctagon size={32} className="text-white" />
          </div>
          <div className="text-left">
            <span className="block text-2xl font-black text-white uppercase">Risco Crítico</span>
            <span className="text-red-100 text-sm font-medium">Risco iminente de falha</span>
          </div>
        </button>
      </div>

      <p className="text-center text-gray-500 text-xs uppercase tracking-widest font-bold">
        Seus dados alimentam a IA do GARRA
      </p>
    </div>
  );
};