import { getUserPositions, fetchPosition, getPool } from './lib/mmt';

export async function isPositionInRange(positionId: string): Promise<boolean> {
  const position = await fetchPosition(positionId);
  const pool = await getPool(position.pool_id);
  const currentTick = Number(pool.currentTickIndex);
  return currentTick >= position.tick_lower_index && currentTick < position.tick_upper_index;
}

function onOutOfRange() {
  // Placeholder for notification integration (Telegram/Discord/email)
}

export async function monitor() {
  const userAddress = process.env.USER_ADDRESS;
  const targetPositionId = process.env.TARGET_POSITION_ID;
  const pollInterval = Number(process.env.POLL_INTERVAL_SEC || '20');

  if (!userAddress || !targetPositionId) {
    throw new Error('USER_ADDRESS and TARGET_POSITION_ID must be set');
  }

  const positions = await getUserPositions(userAddress);
  const target = positions.find((p: any) => p.objectId === targetPositionId);
  if (!target) {
    const ids = positions.map((p: any) => p.objectId).join(', ');
    throw new Error(`Position ${targetPositionId} not found for user. Available positions: ${ids}`);
  }

  const logStatus = async () => {
    try {
      const inRange = await isPositionInRange(targetPositionId);
      const status = inRange ? 'in-range' : 'out-of-range';
      console.log(`${new Date().toISOString()} position ${targetPositionId} is ${status}`);
      if (!inRange) onOutOfRange();
    } catch (err) {
      console.error('Failed to check position range:', err);
      process.exitCode = 1;
      throw err;
    }
  };

  await logStatus();
  setInterval(logStatus, pollInterval * 1000);
}
