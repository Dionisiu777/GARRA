import React, { useState } from 'react';
import { ServiceOrder } from '../types';
import { Button } from '../components/Button';
import { ChevronLeft, MapPin, X, Calendar, User, Wrench, Droplets, Hammer, History, Lightbulb, CheckCheck, Package, BookOpen } from 'lucide-react';

interface DetailsViewProps {
  os: ServiceOrder;
  onBack: () => void;
  onStart: () => void;
}

// Tab Type
type TabType = 'history' | 'similar';

// Mock Data: Local History (Nesta Escola)
const MOCK_HISTORY = [
  {
    id: 1,
    date: "12/08/2023",
    technician: "João Souza",
    type: "Elétrica",
    description: "Substituição do disjuntor 40A do quadro principal e reaperto dos barramentos de fase.",
    photoUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=200&saturation=-100", 
    icon: <Wrench size={16} />
  },
  {
    id: 2,
    date: "20/06/2023",
    technician: "Maria Oliveira",
    type: "Hidráulica",
    description: "Reparo de vazamento na tubulação de 3/4 da pia do refeitório. Substituição do sifão.",
    photoUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&q=80&w=400&h=200&saturation=-100",
    icon: <Droplets size={16} />
  }
];

// Mock Data: Knowledge Base (Casos Similares)
const MOCK_SIMILAR_CASES = [
  {
    id: 101,
    school: "Escola Estadual Zona Sul",
    technician: "Pedro Alcantara",
    problem: "Curto intermitente no quadro bifásico (Desarme aleatório)",
    solution: "Identificado barramento de neutro oxidado. Foi realizada a limpeza e troca dos terminais por modelos de cerâmica.",
    parts: "Conector Cerâmica 25mm, Cabo 10mm (2m), Pasta Condutiva",
    likes: 12
  },
  {
    id: 102,
    school: "CMEI Raio de Luz",
    technician: "Ana Silva",
    problem: "Disjuntor geral esquentando muito",
    solution: "O problema não era o disjuntor, mas o cabo mal apertado na entrada. Reapertei com torquímetro e o calor cessou.",
    parts: "Nenhuma peça trocada. Apenas ajuste.",
    likes: 8
  }
];

export const DetailsView: React.FC<DetailsViewProps> = ({ os, onBack, onStart }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('history');

  return (
    <div className="flex flex-col h-full bg-garra-bg relative">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 border-b border-gray-800 bg-garra-bg">
        <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-full">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <span className="font-bold text-lg">Detalhes da OS #{os.id}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Main Info */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white leading-tight">{os.schoolName}</h1>
          <div className="flex items-start gap-2 text-gray-400">
            <MapPin size={18} className="mt-1 shrink-0 text-garra-accent" />
            <p className="text-sm font-medium">{os.address}</p>
          </div>
        </div>

        {/* Problem Description */}
        <div className="bg-garra-card p-5 rounded-lg border border-gray-700">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descrição do Problema</h3>
          <p className="text-white text-lg font-medium">{os.description}</p>
        </div>

        {/* Feature: Knowledge Base / Visual History */}
        <div className="bg-gray-800/50 p-5 rounded-lg border border-dashed border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Última Visita</h3>
            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">{os.lastVisitDate}</span>
          </div>
          
          <p className="text-sm text-gray-400 mb-4">
            Técnico anterior: <span className="text-white font-bold">{os.lastVisitTechnician}</span>
          </p>

          <Button 
            variant="secondary" 
            fullWidth 
            onClick={() => setShowModal(true)}
            icon={<BookOpen size={20} />}
          >
            Base de Conhecimento
          </Button>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-6 border-t border-gray-800 bg-garra-bg">
        <Button fullWidth onClick={onStart}>
          INICIAR SERVIÇO
        </Button>
      </div>

      {/* MODAL: KNOWLEDGE BASE */}
      {showModal && (
        <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in">
          
          <div className="bg-garra-bg w-full h-[90%] sm:h-auto sm:max-h-[85vh] sm:max-w-md rounded-t-2xl sm:rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-garra-card shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-garra-accent" />
                <h3 className="font-bold text-white text-lg">Inteligência Técnica</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 -mr-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* TABS HEADER */}
            <div className="flex bg-gray-800 border-b border-gray-700 shrink-0">
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors relative ${activeTab === 'history' ? 'text-white bg-garra-card' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <History size={16} />
                  Nesta Escola
                </div>
                {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-garra-accent"></div>}
              </button>
              
              <button 
                onClick={() => setActiveTab('similar')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors relative ${activeTab === 'similar' ? 'text-white bg-garra-card' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Lightbulb size={16} className={activeTab === 'similar' ? 'text-yellow-400' : ''} />
                  Casos Similares
                </div>
                {activeTab === 'similar' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500"></div>}
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-garra-bg">
              
              {/* TAB 1: HISTORY (TIMELINE) */}
              {activeTab === 'history' && (
                <div className="pl-2 border-l-2 border-gray-800 space-y-6">
                  {MOCK_HISTORY.map((item) => (
                    <div key={item.id} className="relative pl-4">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[21px] top-0 bg-garra-card border-2 border-gray-600 w-4 h-4 rounded-full"></div>

                      <div className="bg-garra-card p-4 rounded border border-gray-700 shadow-lg">
                        <div className="flex justify-between items-start mb-2 border-b border-gray-700/50 pb-2">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar size={14} />
                            <span className="text-sm font-bold font-mono">{item.date}</span>
                          </div>
                          <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-gray-800 px-2 py-1 rounded text-garra-accent border border-gray-700">
                            {item.icon}
                            {item.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <User size={14} className="text-gray-500" />
                          <span className="text-xs text-gray-400 font-bold uppercase">{item.technician}</span>
                        </div>
                        <p className="text-sm text-white font-medium leading-relaxed mb-3">
                          {item.description}
                        </p>
                        <div className="relative group cursor-pointer overflow-hidden rounded border border-gray-600">
                          <img src={item.photoUrl} alt="Prova" className="w-full h-32 object-cover opacity-80 grayscale" />
                          <div className="absolute bottom-0 right-0 bg-black/70 px-2 py-1 m-2 rounded text-[10px] text-white font-bold uppercase">Foto Prova</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center py-4">
                    <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">Fim do Histórico Local</p>
                  </div>
                </div>
              )}

              {/* TAB 2: SIMILAR CASES (KNOWLEDGE BASE) */}
              {activeTab === 'similar' && (
                <div className="space-y-4">
                  <div className="bg-blue-900/20 border border-blue-800 p-3 rounded mb-4 flex gap-3">
                    <Lightbulb className="text-yellow-400 shrink-0" size={20} />
                    <p className="text-xs text-blue-200">
                      O sistema identificou serviços de <strong>Elétrica</strong> similares em outras escolas. Veja como seus colegas resolveram.
                    </p>
                  </div>

                  {MOCK_SIMILAR_CASES.map((kase) => (
                    <div key={kase.id} className="bg-garra-card rounded-lg border border-gray-600 overflow-hidden shadow-lg relative group">
                      
                      {/* Highlight Stripe */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>

                      <div className="p-4 pl-5">
                        <div className="flex justify-between items-start mb-3">
                           <div>
                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{kase.school}</h4>
                             <div className="flex items-center gap-1 text-xs text-gray-500">
                               <User size={12} /> {kase.technician}
                             </div>
                           </div>
                           <span className="bg-green-900/30 text-green-400 border border-green-800 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                             <CheckCheck size={12} /> Resolvido
                           </span>
                        </div>

                        <div className="mb-4">
                          <p className="text-red-300 font-bold text-sm mb-1 line-clamp-2">{kase.problem}</p>
                        </div>

                        <div className="bg-gray-800/80 p-3 rounded border border-gray-700 mb-3 relative overflow-hidden">
                           <div className="absolute -right-2 -top-2 text-gray-700/20 rotate-12">
                             <Lightbulb size={48} />
                           </div>
                           <h5 className="text-[10px] uppercase font-black text-yellow-500 mb-1">Solução Aplicada</h5>
                           <p className="text-sm text-white leading-relaxed relative z-10">{kase.solution}</p>
                        </div>

                        <div className="flex items-start gap-2 pt-2 border-t border-gray-700">
                          <Package size={14} className="text-garra-accent mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase block">Peças Utilizadas:</span>
                            <span className="text-xs text-gray-300 font-mono">{kase.parts}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center py-4">
                    <Button variant="secondary" className="text-xs h-10 border-dashed">
                      Carregar mais sugestões
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-700 bg-garra-card shrink-0">
              <Button variant="secondary" fullWidth onClick={() => setShowModal(false)}>
                Fechar Biblioteca
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};