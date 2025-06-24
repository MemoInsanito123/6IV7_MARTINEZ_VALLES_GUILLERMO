
// Función para verificar si un número es primo
export const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

// Función para calcular el máximo común divisor
export const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

// Función para calcular el inverso modular usando el algoritmo extendido de Euclides
export const modInverse = (a: number, m: number): number => {
  if (gcd(a, m) !== 1) return -1;
  
  const originalM = m;
  let x1 = 1, x2 = 0;
  
  while (a > 1) {
    const q = Math.floor(a / m);
    let temp = m;
    m = a % m;
    a = temp;
    temp = x2;
    x2 = x1 - q * x2;
    x1 = temp;
  }
  
  return x1 < 0 ? x1 + originalM : x1;
};

// Función para calcular potencia modular
export const modPow = (base: number, exp: number, mod: number): number => {
  let result = 1;
  base = base % mod;
  
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  
  return result;
};

// Función para generar números primos pequeños (hasta 100)
export const getSmallPrimes = (): number[] => {
  const primes = [];
  for (let i = 2; i <= 100; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
};

// Función para encontrar un valor 'e' válido
export const findValidE = (phi: number): number => {
  for (let e = 3; e < phi; e += 2) {
    if (gcd(e, phi) === 1) {
      return e;
    }
  }
  return 65537; // Fallback común
};

export interface RSAKeys {
  p: number;
  q: number;
  n: number;
  phi: number;
  e: number;
  d: number;
}

// Función para generar llaves RSA
export const generateRSAKeys = (): RSAKeys => {
  const primes = getSmallPrimes().filter(p => p <= 50); // Números primos pequeños para demo
  
  // Seleccionar dos primos diferentes aleatoriamente
  const p = primes[Math.floor(Math.random() * primes.length)];
  let q = primes[Math.floor(Math.random() * primes.length)];
  while (q === p) {
    q = primes[Math.floor(Math.random() * primes.length)];
  }
  
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const e = findValidE(phi);
  const d = modInverse(e, phi);
  
  return { p, q, n, phi, e, d };
};
