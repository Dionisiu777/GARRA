import React, { useState, useRef } from 'react';
import { ServiceOrder } from '../types';
import { Button } from '../components/Button';
import { ChevronLeft, Camera, Check, Trash2 } from 'lucide-react';

interface ExecutionViewProps {
  os: ServiceOrder;
  onBack: () => void;
  onFinish: () => void;
}

export const ExecutionView: React.FC<ExecutionViewProps> = ({ os, onBack, onFinish }) => {
  // Simulating File Uploads with boolean/string state
  const [photoBefore, setPhotoBefore] = useState<string | null>(null);
  const [photoAfter, setPhotoAfter] = useState<string | null>(null);
  const fileInputBeforeRef = useRef<HTMLInputElement>(null);
  const fileInputAfterRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    if (e.target.files && e.target.files[0]) {
      // Create a fake local URL for preview
      const url = URL.createObjectURL(e.target.files[0]);
      if (type === 'before') setPhotoBefore(url);
      else setPhotoAfter(url);
    }
  };

  const triggerUpload = (type: 'before' | 'after') => {
    if (type === 'before') fileInputBeforeRef.current?.click();
    else fileInputAfterRef.current?.click();
  };

  const canFinish = photoBefore !== null && photoAfter !== null;

  return (
    <div className="flex flex-col h-full bg-garra-bg">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 border-b border-gray-800">
        <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-full">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <div>
           <span className="font-bold text-lg block leading-none">Execução</span>
           <span className="text-xs text-garra-accent font-mono">OS #{os.id} - EM ANDAMENTO</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded text-yellow-200 text-sm mb-4">
          <p>⚠️ Tire fotos claras e iluminadas do equipamento.</p>
        </div>

        {/* Photo Before */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
             <h3 className="font-bold text-white uppercase tracking-wider">1. Foto Antes <span className="text-garra-danger">*</span></h3>
             {photoBefore && <span className="text-garra-success text-xs font-bold flex items-center gap-1"><Check size={12}/> OK</span>}
          </div>
          
          <div className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center transition-all overflow-hidden relative ${photoBefore ? 'border-garra-success' : 'border-gray-600 bg-gray-800/30'}`}>
            
            {photoBefore ? (
              <>
                <img src={photoBefore} alt="Antes" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setPhotoBefore(null)}
                  className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </>
            ) : (
              <button 
                onClick={() => triggerUpload('before')}
                className="w-full h-full flex flex-col items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <div className="bg-gray-700 p-4 rounded-full">
                  <Camera size={32} className="text-gray-400" />
                </div>
                <span className="text-gray-400 font-bold">Toque para adicionar</span>
              </button>
            )}
            <input 
              type="file" 
              ref={fileInputBeforeRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'before')}
            />
          </div>
        </div>

        {/* Photo After */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
             <h3 className="font-bold text-white uppercase tracking-wider">2. Foto Depois <span className="text-garra-danger">*</span></h3>
             {photoAfter && <span className="text-garra-success text-xs font-bold flex items-center gap-1"><Check size={12}/> OK</span>}
          </div>
          
          <div className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center transition-all overflow-hidden relative ${photoAfter ? 'border-garra-success' : 'border-gray-600 bg-gray-800/30'}`}>
            
            {photoAfter ? (
              <>
                <img src={photoAfter} alt="Depois" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setPhotoAfter(null)}
                  className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </>
            ) : (
              <button 
                onClick={() => triggerUpload('after')}
                className="w-full h-full flex flex-col items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <div className="bg-gray-700 p-4 rounded-full">
                  <Camera size={32} className="text-gray-400" />
                </div>
                <span className="text-gray-400 font-bold">Toque para adicionar</span>
              </button>
            )}
             <input 
              type="file" 
              ref={fileInputAfterRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'after')}
            />
          </div>
        </div>

      </div>

      <div className="p-6 border-t border-gray-800 bg-garra-bg">
        <Button 
          fullWidth 
          onClick={onFinish} 
          disabled={!canFinish}
          variant={canFinish ? 'primary' : 'secondary'}
        >
          {canFinish ? 'FINALIZAR EXECUÇÃO' : 'FOTOS OBRIGATÓRIAS'}
        </Button>
      </div>
    </div>
  );
};