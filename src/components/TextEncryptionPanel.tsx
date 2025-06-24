
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { modPow, type RSAKeys } from '@/utils/rsaCalculations';

interface TextEncryptionPanelProps {
  keys: RSAKeys;
}

export const TextEncryptionPanel: React.FC<TextEncryptionPanelProps> = ({ keys }) => {
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [steps, setSteps] = useState<string[]>([]);

  const handleEncryptText = () => {
    if (!text.trim()) {
      alert('Por favor ingresa un texto para cifrar');
      return;
    }

    console.log('Cifrando texto:', text);
    
    const encryptedNumbers: number[] = [];
    const calculationSteps: string[] = [];
    
    calculationSteps.push(`Texto original: "${text}"`);
    calculationSteps.push(`Clave pública: (e=${keys.e}, n=${keys.n})`);
    calculationSteps.push('Conversión a ASCII y cifrado:');
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const ascii = char.charCodeAt(0);
      
      // Verificar que el valor ASCII sea menor que n
      if (ascii >= keys.n) {
        alert(`El carácter "${char}" (ASCII: ${ascii}) es demasiado grande para n=${keys.n}`);
        return;
      }
      
      const encrypted = modPow(ascii, keys.e, keys.n);
      encryptedNumbers.push(encrypted);
      
      calculationSteps.push(`  "${char}" → ASCII: ${ascii} → ${ascii}^${keys.e} mod ${keys.n} = ${encrypted}`);
    }
    
    const encryptedString = encryptedNumbers.join(',');
    setEncryptedText(encryptedString);
    
    calculationSteps.push(`Texto cifrado: [${encryptedString}]`);
    setSteps(calculationSteps);
    
    console.log('Texto cifrado:', encryptedString);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-purple-700">
          📝 Cifrado de Texto RSA
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
          <Label htmlFor="text">Texto a cifrar:</Label>
          <Input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ingresa el texto a cifrar"
            maxLength={10}
          />
          <div className="text-xs text-gray-500">
            Máximo 10 caracteres. Solo caracteres ASCII básicos (0-127).
          </div>
        </div>

        <Button 
          onClick={handleEncryptText} 
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={!text.trim()}
        >
          Cifrar Texto
        </Button>

        {steps.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800">Proceso de Cifrado de Texto:</h3>
            <div className="space-y-1 text-sm font-mono">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-purple-600 font-mono">→</span>
                  <span className="whitespace-pre-line">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {encryptedText && (
          <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Texto Cifrado:</h3>
            <Textarea 
              value={encryptedText} 
              readOnly 
              className="font-mono text-sm bg-white"
              rows={3}
            />
            <div className="text-xs text-purple-600 mt-2">
              Números separados por comas. Copia estos números para descifrar.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
