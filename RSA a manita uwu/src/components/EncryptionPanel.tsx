
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { modPow, type RSAKeys } from '@/utils/rsaCalculations';

interface EncryptionPanelProps {
  keys: RSAKeys;
}

export const EncryptionPanel: React.FC<EncryptionPanelProps> = ({ keys }) => {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const handleEncrypt = () => {
    const num = parseInt(message);
    
    if (isNaN(num) || num <= 0 || num >= keys.n) {
      alert(`Por favor ingresa un número entre 1 y ${keys.n - 1}`);
      return;
    }

    console.log('Cifrando mensaje:', num);
    console.log('Usando clave pública (e, n):', keys.e, keys.n);
    
    const encrypted = modPow(num, keys.e, keys.n);
    console.log('Mensaje cifrado:', encrypted);
    
    setEncryptedMessage(encrypted);
    
    const calculationSteps = [
      `Mensaje original: ${num}`,
      `Clave pública: (e=${keys.e}, n=${keys.n})`,
      `Fórmula: C = M^e mod n`,
      `Cálculo: ${num}^${keys.e} mod ${keys.n}`,
      `Resultado cifrado: ${encrypted}`
    ];
    
    setSteps(calculationSteps);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-green-700">
          🔒 Cifrado RSA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-800">Clave Pública:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>e = {keys.e}</div>
            <div>n = {keys.n}</div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensaje a cifrar (1 - {keys.n - 1}):</Label>
          <Input
            id="message"
            type="number"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ingresa un número"
            min="1"
            max={keys.n - 1}
          />
        </div>

        <Button 
          onClick={handleEncrypt} 
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!message}
        >
          Cifrar Mensaje
        </Button>

        {steps.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800">Proceso de Cifrado:</h3>
            <div className="space-y-1 text-sm">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-blue-600 font-mono">→</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {encryptedMessage !== null && (
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Mensaje Cifrado:</h3>
            <div className="text-2xl font-bold text-green-700">{encryptedMessage}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
