// Pause key event listener
export function addPauseKeyEventListener(callback: any) {
  document.addEventListener('keydown', (event) => {
    callback(event);
  });
}

// Enter key event listener
export function addEnterKeyEventListener(callback: any) {
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      callback();
    }
  });
}

export function addArrowKeyEventListener(callback: any) {
  document.addEventListener('keydown', (event) => {
    callback(event);
  });
}
