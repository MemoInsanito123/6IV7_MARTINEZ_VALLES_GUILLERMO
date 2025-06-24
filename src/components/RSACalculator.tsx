
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateRSAKeys, type RSAKeys } from '@/utils/rsaCalculations';
import { RSAKeyDisplay } from './RSAKeyDisplay';
import { EncryptionPanel } from './EncryptionPanel';
import { DecryptionPanel } from './DecryptionPanel';
import { TextEncryptionPanel } from './TextEncryptionPanel';
import { TextDecryptionPanel } from './TextDecryptionPanel';
import { RefreshCw } from 'lucide-react';

export const RSACalculator: React.FC = () => {
  const [keys, setKeys] = useState<RSAKeys | null>(null);

  const handleGenerateKeys = () => {
    console.log('Generando nuevas llaves RSA...');
    const newKeys = generateRSAKeys();
    console.log('Llaves generadas:', newKeys);
    setKeys(newKeys);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🔐 Calculadora RSA Manual
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Implementación manual del algoritmo RSA - Números y Texto
            </p>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button 
              onClick={handleGenerateKeys}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              {keys ? 'Generar Nuevas Llaves' : 'Generar Llaves RSA'}
            </Button>
          </CardContent>
        </Card>

        {keys && (
          <>
            {/* RSA Keys Display */}
            <RSAKeyDisplay keys={keys} />

            {/* Encryption/Decryption Tabs */}
            <Tabs defaultValue="encrypt" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="encrypt" className="text-sm py-3">
                  🔒 Cifrar Números
                </TabsTrigger>
                <TabsTrigger value="decrypt" className="text-sm py-3">
                  🔓 Descifrar Números
                </TabsTrigger>
                <TabsTrigger value="text-encrypt" className="text-sm py-3">
                  📝 Cifrar Texto
                </TabsTrigger>
                <TabsTrigger value="text-decrypt" className="text-sm py-3">
                  🔍 Descifrar Texto
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="encrypt" className="mt-6">
                <EncryptionPanel keys={keys} />
              </TabsContent>
              
              <TabsContent value="decrypt" className="mt-6">
                <DecryptionPanel n={keys.n} />
              </TabsContent>

              <TabsContent value="text-encrypt" className="mt-6">
                <TextEncryptionPanel keys={keys} />
              </TabsContent>
              
              <TabsContent value="text-decrypt" className="mt-6">
                <TextDecryptionPanel n={keys.n} />
              </TabsContent>
            </Tabs>
          </>
        )}

        {!keys && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <div className="text-gray-500 text-lg">
                Haz clic en "Generar Llaves RSA" para comenzar
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer with Instructions */}
        <Card className="bg-white/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">📋 Instrucciones de Uso:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Para Cifrar Números:</h4>
                <ul className="space-y-1">
                  <li>• Genera las llaves RSA primero</li>
                  <li>• Ingresa un número (1 a n-1)</li>
                  <li>• Haz clic en "Cifrar Mensaje"</li>
                </ul>
                <h4 className="font-medium text-gray-800 mb-2 mt-3">Para Cifrar Texto:</h4>
                <ul className="space-y-1">
                  <li>• Ingresa texto (máximo 10 caracteres)</li>
                  <li>• Se convierte cada letra a ASCII</li>
                  <li>• Se cifra cada carácter por separado</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Para Descifrar:</h4>
                <ul className="space-y-1">
                  <li>• Usa el mensaje/texto cifrado obtenido</li>
                  <li>• Ingresa la clave privada 'd'</li>
                  <li>• Para texto: usa números separados por comas</li>
                  <li>• Verifica que coincida con el original</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
