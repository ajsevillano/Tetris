export function handleEnterKey(
  event: KeyboardEvent,
  isGameOver: boolean,
  reStartGame: () => void,
) {
  if (event.key === 'Enter') {
    if (isGameOver) {
      reStartGame();
    }
  }
}

export function handleRkey(event: KeyboardEvent, reStartGame: () => void) {
  if (event.code === 'KeyR' || event.code === 'Keyr') {
    reStartGame();
  }
}
