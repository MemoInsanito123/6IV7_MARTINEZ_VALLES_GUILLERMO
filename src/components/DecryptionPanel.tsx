
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { modPow } from '@/utils/rsaCalculations';

interface DecryptionPanelProps {
  n: number;
}

export const DecryptionPanel: React.FC<DecryptionPanelProps> = ({ n }) => {
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [privateKeyD, setPrivateKeyD] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const handleDecrypt = () => {
    const encrypted = parseInt(encryptedMessage);
    const d = parseInt(privateKeyD);
    
    if (isNaN(encrypted) || isNaN(d) || encrypted <= 0 || d <= 0) {
      alert('Por favor ingresa valores válidos');
      return;
    }

    if (encrypted >= n) {
      alert(`El mensaje cifrado debe ser menor que n = ${n}`);
      return;
    }

    console.log('Descifrando mensaje:', encrypted);
    console.log('Usando clave privada d:', d);
    console.log('Módulo n:', n);
    
    const decrypted = modPow(encrypted, d, n);
    console.log('Mensaje descifrado:', decrypted);
    
    setDecryptedMessage(decrypted);
    
    const calculationSteps = [
      `Mensaje cifrado: ${encrypted}`,
      `Clave privada: d = ${d}`,
      `Módulo: n = ${n}`,
      `Fórmula: M = C^d mod n`,
      `Cálculo: ${encrypted}^${d} mod ${n}`,
      `Mensaje original: ${decrypted}`
    ];
    
    setSteps(calculationSteps);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-red-700">
          🔓 Descifrado RSA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="encrypted">Mensaje cifrado:</Label>
          <Input
            id="encrypted"
            type="number"
            value={encryptedMessage}
            onChange={(e) => setEncryptedMessage(e.target.value)}
            placeholder="Ingresa el mensaje cifrado"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="privateKey">Clave privada (d):</Label>
          <Input
            id="privateKey"
            type="number"
            value={privateKeyD}
            onChange={(e) => setPrivateKeyD(e.target.value)}
            placeholder="Ingresa la clave privada d"
          />
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm text-blue-800">
            <strong>Módulo público:</strong> n = {n}
          </div>
        </div>

        <Button 
          onClick={handleDecrypt} 
          className="w-full bg-red-600 hover:bg-red-700"
          disabled={!encryptedMessage || !privateKeyD}
        >
          Descifrar Mensaje
        </Button>

        {steps.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800">Proceso de Descifrado:</h3>
            <div className="space-y-1 text-sm">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-red-600 font-mono">→</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {decryptedMessage !== null && (
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">Mensaje Descifrado:</h3>
            <div className="text-2xl font-bold text-red-700">{decryptedMessage}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
