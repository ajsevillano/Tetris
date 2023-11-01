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
  let controllerIndex = states.getControllerIndex();

  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];

    if (gamepad) {
      // Extract the buttons
      const buttons = gamepad.buttons;
      // Check if the buttons are pressed
      const DownArrow = buttons[13].pressed;
      const LeftArrow = buttons[14].pressed;
      const RightArrow = buttons[15].pressed;
      const greenButton = buttons[0].pressed;
      const blueButton = buttons[2].pressed;
      const pauseButton = buttons[9].pressed;

      // Right arrow
      if (RightArrow && Date.now() - lastMoveTime > moveInterval) {
        handleRightMovement();
        lastMoveTime = Date.now();
      }

      // Left arrow
      if (LeftArrow && Date.now() - lastMoveTime > moveInterval) {
        handleLeftMovement();
        lastMoveTime = Date.now();
      }

      // Down arrow (Soft push)
      if (DownArrow && Date.now() - lastMoveTime > downMoveInterval) {
        handleDownMovement(() =>
          solidifyPiece({ nextPieceCanvas, nextPieceContext }),
        );
        lastMoveTime = Date.now();
      }

      // Green button (Rotation)
      if (greenButton && !greenPressed) {
        greenPressed = true;
        handleRotation();
      } else if (!greenButton) {
        greenPressed = false;
      }

      // Blue button (Hard push)
      if (blueButton && !bluePressed) {
        bluePressed = true;
        handleHardPush(() =>
          solidifyPiece({ nextPieceCanvas, nextPieceContext }),
        );
      } else if (!blueButton) {
        bluePressed = false;
      }

      // Pause button
      if (pauseButton && Date.now() - lastMoveTime > hardPushInterval) {
        states.setIsPaused(!states.getIsPaused());
        lastMoveTime = Date.now();
      }
    }
  }
}
