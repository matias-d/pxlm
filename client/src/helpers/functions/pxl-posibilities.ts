import { ethers } from "ethers";

// Function to create a deterministic hash from the address
export function createDeterministicHash(
  address: string,
  timestamp = Date.now()
) {
  const combined = `${address}-${timestamp}`;
  return ethers.keccak256(ethers.toUtf8Bytes(combined));
}

// Function to obtain a pseudo-random number based on hash
export function getRandomFromHash(hash: string, index: number, max: number) {
  const slice = hash.slice(2 + index * 8, 2 + (index + 1) * 8);
  const num = parseInt(slice || "0", 16);
  return num % max;
}

// Function to determine whether an attribute appears based on probability
export function shouldIncludeAttribute(
  hash: string,
  index: number,
  probability: number
) {
  return getRandomFromHash(hash, index, 100) < probability;
}

// Function to select a random element from the array
export function selectRandom(hash: string, index: number, array: string[]) {
  return array[getRandomFromHash(hash, index, array.length)];
}
