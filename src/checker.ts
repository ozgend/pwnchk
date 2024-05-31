const PWNED_PASSWORDS_API_URL = 'https://api.pwnedpasswords.com/range/';

export interface IPwnedPasswordResult {
  hash: string;
  hashIndex: string;
  hashSuffix: string;
  url: string;
  match?: boolean;
  views?: number;
  error?: Error | undefined;
};

export const checkInput = async (input: string): Promise<IPwnedPasswordResult> => {
  const hash = await hashInput(input);
  const result = await checkHashedList(hash);
  return result;
};

export const hashInput = async (input: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const buffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
};

export const checkHashedList = async (hash: string): Promise<IPwnedPasswordResult> => {
  const hashIndex = hash.slice(0, 5);
  const hashSuffix = hash.slice(5);
  const url = `${PWNED_PASSWORDS_API_URL}${hashIndex}`;
  const response = await fetch(url);
  const result: IPwnedPasswordResult = {
    hash,
    hashIndex,
    hashSuffix,
    url,
  };

  if (!response.ok) {
    result.error = new Error(`HTTP Error ${response.status} fetching data from ${url}`);
    return result;
  }

  const rawResponseData = await response?.text();

  if (!rawResponseData) {
    result.error = new Error(`No data returned from ${url}`);
    return result;
  }

  const list = rawResponseData.split('\n').map((line) => line.split(':'));

  if (list.length === 0) {
    result.match = false;
    return result;
  }

  const found = list.find(([suffix]) => suffix === hashSuffix);

  if (found) {
    result.match = true;
    result.views = parseInt(found[1]);
  } else {
    result.match = false;
  }

  return result;
};