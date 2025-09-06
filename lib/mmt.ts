import { MmtSDK, Types } from '@mmt-finance/clmm-sdk';

const sdk = MmtSDK.NEW({ network: 'mainnet' });

async function withRetry<T>(fn: () => Promise<T>, description: string, maxRetries = 5): Promise<T> {
  let attempt = 0;
  let delay = 500; // ms
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) {
        throw new Error(`${description} failed after ${attempt} attempts: ${err}`);
      }
      console.warn(`${description} failed (attempt ${attempt}). retrying in ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}

export async function getUserPositions(address: string) {
  return withRetry(() => sdk.Position.getAllUserPositions(address), 'fetch user positions');
}

export async function fetchPosition(positionId: string) {
  return withRetry(() => sdk.Position.fetchPositionRpc(positionId), 'fetch position');
}

export async function getPool(poolId: string): Promise<Types.ExtendedPoolWithApr> {
  return withRetry(() => sdk.Pool.getPool(poolId), 'fetch pool');
}

export { sdk, withRetry };
