import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Wrench } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login validation
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col h-full p-8 justify-center items-center animate-fade-in">
      <div className="mb-12 text-center">
        <div className="w-24 h-24 bg-garra-accent rounded-xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-500/20 rotate-3">
          <Wrench size={48} color="white" strokeWidth={2.5} />
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-white mb-2">GARRA</h1>
        <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Manutenção & Operações</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <Input 
          label="E-mail" 
          type="email" 
          placeholder="tecnico@garra.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input 
          label="Senha" 
          type="password" 
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="pt-6">
          <Button fullWidth type="submit">
            Entrar
          </Button>
        </div>
      </form>
      
      <p className="mt-8 text-gray-600 text-xs text-center">
        v2.0.4 - Build Industrial
      </p>
    </div>
  );
};