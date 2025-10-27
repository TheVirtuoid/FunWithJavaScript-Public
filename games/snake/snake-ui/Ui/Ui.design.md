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

## Methods
- `drawPitch(pitch)` - Draws the pitch.
- `resetPitch()` - Resets the pitch. Clears it out.
- `clearPitch()` - Removes the pitch.
- `drawSnake(snake)` - Draws the snake. `snake` is an instance of Snake.
- `updateSnake(snake)` - Updates the snake. `snake` is an instance of Snake.
- `clearSnake(snake)` - Removes the snake from the pitch. `snake` is an instance of Snake.
- `drawPrize(prize)` - Draws the prize. `prize` is an instance of Prize.
- `clearPrize(prize)` - Removes the prize from the pitch. `prize` is an instance of Prize.
- `drawScore(score)` - Draws the score. `score` is an instance of Score.
- `updateScore(score)` - Updates the score. `score` is an instance of Score.
- `clearScore(score)` - Removes the score from the pitch. `score` is an instance of Score.
- `drawGameOver()` - draws the Game Over screen.
- `clearGameOver()` - Removes the Game Over screen from the pitch.
- `startCountdown(countdownTime)` - Draws, countdowns, and removes the countdown screen. `CountdownTime` is the number of seconds in the countdown. Default 5.
 

## Events
All events are fired from the GameEvent object
- `UI_DRAW_PITCH_COMPLETE` - Fired when drawPitch() has finished.
- `UI_RESET_PITCH_COMPLETE` - Fired when resetPitch() has finished.
- `UI_CLEAR_PITCH_COMPLETE` - Fired when clearPitch() has finished.
- `UI_DRAW_SNAKE_COMPLETE` - Fired when drawSnake() has finished.
- `UI_UPDATE_SNAKE_COMPLETE` - Fired when updateSnake() has finished.
- `UI_CLEAR_PITCH_COMPLETE` - Fired when clearSnake() has finished.
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