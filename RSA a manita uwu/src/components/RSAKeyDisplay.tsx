
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type RSAKeys } from '@/utils/rsaCalculations';

interface RSAKeyDisplayProps {
  keys: RSAKeys;
}

export const RSAKeyDisplay: React.FC<RSAKeyDisplayProps> = ({ keys }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-purple-700">
          🔑 Parámetros RSA Generados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-purple-800">Primo p:</span>
              <Badge variant="secondary" className="text-lg">{keys.p}</Badge>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-purple-800">Primo q:</span>
              <Badge variant="secondary" className="text-lg">{keys.q}</Badge>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-blue-800">Módulo n:</span>
              <Badge variant="outline" className="text-lg border-blue-300">{keys.n}</Badge>
            </div>
            <div className="text-xs text-blue-600 mt-1">n = p × q = {keys.p} × {keys.q}</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-yellow-800">Función φ(n):</span>
              <Badge variant="outline" className="text-lg border-yellow-300">{keys.phi}</Badge>
            </div>
            <div className="text-xs text-yellow-600 mt-1">φ(n) = (p-1)(q-1) = {keys.p-1} × {keys.q-1}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-green-800">Exponente e:</span>
              <Badge variant="outline" className="text-lg border-green-300">{keys.e}</Badge>
            </div>
            <div className="text-xs text-green-600 mt-1">Clave pública</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-red-800">Exponente d:</span>
              <Badge variant="outline" className="text-lg border-red-300">{keys.d}</Badge>
            </div>
            <div className="text-xs text-red-600 mt-1">Clave privada</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Verificación matemática:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>• p y q son números primos</div>
            <div>• n = p × q = {keys.p} × {keys.q} = {keys.n}</div>
            <div>• φ(n) = (p-1)(q-1) = ({keys.p}-1) × ({keys.q}-1) = {keys.phi}</div>
            <div>• gcd(e, φ(n)) = gcd({keys.e}, {keys.phi}) = 1</div>
            <div>• d es el inverso modular de e: e × d ≡ 1 (mod φ(n))</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
