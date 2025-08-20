# Snake Game Base Class Design

## Prompt Used

I wish to create a 'snake' game. To start with, I am looking for the information on what kind of design I would need to form the basis of the snake game.

I would to design only the base class, using these parameters:

1. No UI
2. No Inputs
3. Snake anatomy
4. Prize anatomy
5. Event handlers for touching prize, touching side, and touching self.
6. Game start, game pause, and game ending events


## Core Components

### 1. Snake Anatomy
The snake consists of:
- Head: The front segment that moves and detects collisions
- Body: Array of segments following the head
- Direction: Current movement direction (direction vector)
- Growth Queue: Tracks pending growth when prizes are consumed

### 2. Prize Anatomy
The prize (food) includes:
- Position: Vector based upon game (HTML, 2d, 3d, 4d)
- Type: Different prize types (normal, bonus, special)
- Value: Points awarded when consumed
- Spawn Logic: Random placement avoiding snake body

### 3. Game State Management
- Game States: START, PLAYING, PAUSED, GAME_OVER
- Grid System: Defined width/height for game boundaries
- Score Tracking: Current score and high score
- Speed Control: Game tick rate/movement speed

## Base Class Structure

```javascript
class SnakeGameCore {
  constructor(gridWidth, gridHeight, initialSpeed = 200) {
    // Game configuration
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.speed = initialSpeed;
    
    // Game state
    this.gameState = 'START';
    this.score = 0;
    this.gameLoop = null;
    
    // Snake properties
    this.snake = {
      head: { x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) },
      body: [],
      direction: { x: 1, y: 0 }, // Moving right initially
      growthQueue: 0
    };
    
    // Prize properties
    this.prize = {
      position: null,
      type: 'normal',
      value: 10
    };
    
    // Event handlers
    this.eventHandlers = {
      onPrizeTouch: [],
      onWallCollision: [],
      onSelfCollision: [],
      onGameStart: [],
      onGamePause: [],
      onGameEnd: [],
      onScoreChange: []
    };
    
    this.initializeGame();
  }
  
  // Core game methods
  initializeGame() { /* Initialize snake position and spawn first prize */ }
  
  update() { /* Main game tick - move snake, check collisions, update state */ }
  
  moveSnake() { /* Calculate next head position and update body */ }
  
  checkCollisions() { /* Detect wall, self, and prize collisions */ }
  
  spawnPrize() { /* Generate new prize at random valid location */ }
  
  growSnake() { /* Add segments to snake body based on growth queue */ }
  
  // Game state control
  startGame() { /* Begin game loop and set state to PLAYING */ }
  
  pauseGame() { /* Pause game loop and set state to PAUSED */ }
  
  endGame() { /* Stop game loop, set state to GAME_OVER, trigger events */ }
  
  resetGame() { /* Reset all game state to initial values */ }
  
  // Event system
  addEventListener(eventType, callback) { /* Register event handlers */ }
  
  removeEventListener(eventType, callback) { /* Unregister event handlers */ }
  
  triggerEvent(eventType, data) { /* Fire events to registered handlers */ }
  
  // Collision detection helpers
  isPositionValid(x, y) { /* Check if position is within bounds and not occupied */ }
  
  isWallCollision(x, y) { /* Check if position hits game boundaries */ }
  
  isSelfCollision(x, y) { /* Check if position collides with snake body */ }
  
  isPrizeCollision(x, y) { /* Check if position matches prize location */ }
  
  // Utility methods
  getGameState() { /* Return current game state and data */ }
  
  setDirection(newDirection) { /* Update snake direction (with validation) */ }
  
  setSpeed(newSpeed) { /* Update game speed */ }
}
```