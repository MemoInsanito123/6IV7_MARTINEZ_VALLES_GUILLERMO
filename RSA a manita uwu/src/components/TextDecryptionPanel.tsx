
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { modPow } from '@/utils/rsaCalculations';

interface TextDecryptionPanelProps {
  n: number;
}

export const TextDecryptionPanel: React.FC<TextDecryptionPanelProps> = ({ n }) => {
  const [encryptedText, setEncryptedText] = useState('');
  const [privateKeyD, setPrivateKeyD] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [steps, setSteps] = useState<string[]>([]);

  const handleDecryptText = () => {
    const d = parseInt(privateKeyD);
    
    if (isNaN(d) || d <= 0) {
      alert('Por favor ingresa una clave privada válida');
      return;
    }

    if (!encryptedText.trim()) {
      alert('Por favor ingresa el texto cifrado');
      return;
    }

    try {
      // Convertir la cadena de números separados por comas en un array
      const encryptedNumbers = encryptedText.split(',').map(num => {
        const parsed = parseInt(num.trim());
        if (isNaN(parsed)) {
          throw new Error(`Número inválido: ${num}`);
        }
        return parsed;
      });

      console.log('Descifrando números:', encryptedNumbers);
      console.log('Usando clave privada d:', d);
      
      const calculationSteps: string[] = [];
      calculationSteps.push(`Números cifrados: [${encryptedNumbers.join(', ')}]`);
      calculationSteps.push(`Clave privada: d = ${d}`);
      calculationSteps.push(`Módulo: n = ${n}`);
      calculationSteps.push('Descifrado y conversión ASCII:');
      
      let decryptedString = '';
      
      for (let i = 0; i < encryptedNumbers.length; i++) {
        const encrypted = encryptedNumbers[i];
        
        if (encrypted >= n) {
          alert(`El número cifrado ${encrypted} debe ser menor que n = ${n}`);
          return;
        }
        
        const decrypted = modPow(encrypted, d, n);
        const char = String.fromCharCode(decrypted);
        decryptedString += char;
        
        calculationSteps.push(`  ${encrypted}^${d} mod ${n} = ${decrypted} → ASCII: "${char}"`);
      }
      
      setDecryptedText(decryptedString);
      calculationSteps.push(`Texto descifrado: "${decryptedString}"`);
      setSteps(calculationSteps);
      
      console.log('Texto descifrado:', decryptedString);
      
    } catch (error) {
      alert('Error en el formato del texto cifrado. Usa números separados por comas.');
      console.error('Error:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-orange-700">
          🔓 Descifrado de Texto RSA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="encryptedText">Texto cifrado (números separados por comas):</Label>
          <Textarea
            id="encryptedText"
            value={encryptedText}
            onChange={(e) => setEncryptedText(e.target.value)}
            placeholder="Ej: 123,456,789"
            rows={3}
            className="font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="privateKeyText">Clave privada (d):</Label>
          <Input
            id="privateKeyText"
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
          onClick={handleDecryptText} 
          className="w-full bg-orange-600 hover:bg-orange-700"
          disabled={!encryptedText.trim() || !privateKeyD}
        >
          Descifrar Texto
        </Button>

        {steps.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800">Proceso de Descifrado de Texto:</h3>
            <div className="space-y-1 text-sm font-mono">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 font-mono">→</span>
                  <span className="whitespace-pre-line">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {decryptedText && (
          <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-2">Texto Descifrado:</h3>
            <div className="text-2xl font-bold text-orange-700 bg-white p-3 rounded border">
              "{decryptedText}"
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
