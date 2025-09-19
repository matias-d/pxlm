import { ethers } from "ethers";

// Función para crear un hash determinista desde la dirección
export function createDeterministicHash(
  address: string,
  timestamp = Date.now()
) {
  const combined = `${address}-${timestamp}`;
  return ethers.keccak256(ethers.toUtf8Bytes(combined));
}

// Función para obtener un número pseudo-aleatorio basado en hash
export function getRandomFromHash(hash: string, index: number, max: number) {
  const slice = hash.slice(2 + index * 8, 2 + (index + 1) * 8);
  const num = parseInt(slice || "0", 16);
  return num % max;
}

// Función para determinar si un atributo aparece basado en probabilidad
export function shouldIncludeAttribute(
  hash: string,
  index: number,
  probability: number
) {
  return getRandomFromHash(hash, index, 100) < probability;
}

// Función para seleccionar elemento aleatorio del array
export function selectRandom(hash: string, index: number, array: string[]) {
  return array[getRandomFromHash(hash, index, array.length)];
}
