import { randomUUID } from 'crypto';

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const BASE = ALPHABET.length;

export const encodeBase62 = (num: number): string => {
  let slug = '';
  while (num > 0) {
    slug = ALPHABET[num % BASE] + slug;
    num = Math.floor(num / BASE);
  }
  return slug || '0';
}

export const decodeBase62 = (slug: string): number => {
  return [...slug].reduce((acc, char) => acc * BASE + ALPHABET.indexOf(char), 0);
}

export const generateSlug = (): string =>{
  const uuid = randomUUID();
  return uuid.replace(/-/g, '').slice(0, 8);
}