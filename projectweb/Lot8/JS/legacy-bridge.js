// legacy-bridge.js
import { startNewGame, restartGame } from './init.js';
import { togglePause } from './game-loop.js';

// Exposer au contexte global
window.startNewGame = startNewGame;
window.togglePause = togglePause;
window.restartGame = restartGame;
window.goToHome = () => { window.location.href='../view/home.php'; };