import { states } from '../../globalStates';
import solidifyPiece from '../solidifyPiece';
import {
  handleDownMovement,
  handleLeftMovement,
  handleRightMovement,
  handleRotation,
  handleHardPush,
} from './handlePlayerActions';

let lastMoveTime = 0;
const moveInterval = 60;
const downMoveInterval = 20;
const hardPushInterval = 200;
let greenPressed = false;
let bluePressed = false;

export function handleGamePad({ nextPieceCanvas, nextPieceContext }: any) {
  const gamePad = loadControler();

  if (gamePad) {
    const {
      DownArrow,
      LeftArrow,
      RightArrow,
      greenButton,
      blueButton,
      pauseButton,
    } = gamePad;

    // Right arrow
    handleGamePadPushRight(RightArrow);
    // Left arrow
    handleGamePadPushLeft(LeftArrow);

    // Down arrow (Soft push)
    handleGamePadPushDown(DownArrow, nextPieceCanvas, nextPieceContext);

    // Green button (Rotation)
    handleGamePadPushGreen(greenButton);

    // Blue button (Hard push)
    handleGamePadPushBlueButton(blueButton, nextPieceCanvas, nextPieceContext);

    // Pause button
    handleGamePadPause(pauseButton);
  }
}

function loadControler() {
  let controllerIndex = states.getControllerIndex();

  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];

    if (gamepad) {
      // Check if the buttons are pressed
      const DownArrow = gamepad.buttons[13].pressed;
      const LeftArrow = gamepad.buttons[14].pressed;
      const RightArrow = gamepad.buttons[15].pressed;
      const greenButton = gamepad.buttons[0].pressed;
      const blueButton = gamepad.buttons[2].pressed;
      const pauseButton = gamepad.buttons[9].pressed;

      return {
        DownArrow,
        LeftArrow,
        RightArrow,
        greenButton,
        blueButton,
        pauseButton,
      };
    }
  }
}

function handleGamePadPushLeft(LeftArrow: any) {
  if (LeftArrow && Date.now() - lastMoveTime > moveInterval) {
    handleLeftMovement();
    lastMoveTime = Date.now();
  }
}

function handleGamePadPushRight(RightArrow: any) {
  if (RightArrow && Date.now() - lastMoveTime > moveInterval) {
    handleRightMovement();
    lastMoveTime = Date.now();
  }
}

function handleGamePadPushDown(
  DownArrow: any,
  nextPieceCanvas: any,
  nextPieceContext: any,
) {
  if (DownArrow && Date.now() - lastMoveTime > downMoveInterval) {
    handleDownMovement(() =>
      solidifyPiece({ nextPieceCanvas, nextPieceContext }),
    );
    lastMoveTime = Date.now();
  }
}

function handleGamePadPushGreen(greenButton: any) {
  if (greenButton && !greenPressed) {
    greenPressed = true;
    handleRotation();
  } else if (!greenButton) {
    greenPressed = false;
  }
}

function handleGamePadPushBlueButton(
  blueButton: any,
  nextPieceCanvas: any,
  nextPieceContext: any,
) {
  if (blueButton && !bluePressed) {
    bluePressed = true;
    handleHardPush(() => solidifyPiece({ nextPieceCanvas, nextPieceContext }));
  } else if (!blueButton) {
    bluePressed = false;
  }
}

function handleGamePadPause(pauseButton: any) {
  if (pauseButton && Date.now() - lastMoveTime > hardPushInterval) {
    states.setIsPaused(!states.getIsPaused());
    lastMoveTime = Date.now();
  }
}
