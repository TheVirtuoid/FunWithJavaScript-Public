# SnakeUI

The container for the snake UI portion of the game.

## Constructor
- `new SnakeUI(options)` - options is a key/value collection of ... well ... options
- `id` (String). The ID of the UI. Optional. Defaults to an UUID.
- `uiName` (String). The name of the UI. Required. Needed to initialize the correct UI
- `uiData` (Object). Data passed to the UI once it is created. Optional. Defaults to an empty object.

## Properties
All properties are read-only unless otherwise specified.
- `id` (String). The ID of the UI.
- `uiName` (String). The name of the UI.
- `uiData` (Object). Data passed to the UI once it is created.`
- `ui` (Object). The UI object.

## Methods
- `drawBoard(board)` - Draws the board.
- `resetBoard()` - Resets the board. Clears it out.
- `clearBoard()` - Removes the board.
- `drawSnake(snake)` - Draws the snake.
- `updateSnake(snake)` - Updates the snake.
- `clearSnake(snake)` - Removes the snake from the board.`
- `drawPrize(prize)` - Draws the prize.
- `clearPrize(prize)` - Removes the prize from the board.
- `drawScore(score)` - Draws the score.
- `updateScore(score)` - Updates the score.
- `clearScore(score)` - Removes the score from the board.
- `drawGameOver()` - draws the Game Over screen.
- `clearGameOver()` - Removes the Game Over screen from the board.
- `startCountdown(countdownTime)` - Draws, countdowns, and removes the countdown screen. `CountdownTime` is the number of seconds in the countdown. Default 5.
 

## Events
All events are fired from the GameEvent object
- `UI_DRAW_BOARD_COMPLETE` - Fired when drawBoard() has finished.
- `UI_RESET_BOARD_COMPLETE` - Fired when resetBoard() has finished.
- `UI_CLEAR_BOARD_COMPLETE` - Fired when clearBoard() has finished.
- `UI_DRAW_SNAKE_COMPLETE` - Fired when drawSnake() has finished.
- `UI_UPDATE_SNAKE_COMPLETE` - Fired when updateSnake() has finished.
- `UI_CLEAR_BOARD_COMPLETE` - Fired when clearSnake() has finished.
- `UI_DRAW_PRIZE_COMPLETE` - Fired when drawPrize() has finished.
- `UI_CLEAR_PRIZE_COMPLETE` - Fired when clearPrize() has finished.
- `UI_DRAW_SCORE_COMPLETE` - Fired when drawScore() has finished.
- `UI_UPDATE_SCORE_COMPLETE` - Fired when updateScore() has finished.
- `UI_CLEAR_SCORE_COMPLETE` - Fired when clearScore() has finished.
- `UI_DRAW_GAME_OVER_COMPLETE` - Fired when drawGameOver() has finished.
- `UI_CLEAR_GAME_OVER_COMPLETE` - Fired when clearGameOver() has finished.
- `UI_START_COUNTDOWN_COMPLETE` - Fired when startCountdown() has started the countdown (which means, it has finished drawing first).
- `UI_COUNTDOWN_TICK_COMPLETE` - Fired when a tick of the countdown has completed
- `UI_COUNTDOWN_COMPLETE` - Fired when the countdown has completed, and the countdown screen has been removed.