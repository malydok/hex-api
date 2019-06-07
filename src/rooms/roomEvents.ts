export const PLAYER_JOINED = (playerId: string) => ({
  type: 'PLAYER_JOINED',
  playerId,
});
export const PLAYER_LEFT = (playerId: string) => ({
  type: 'PLAYER_LEFT',
  playerId,
});
