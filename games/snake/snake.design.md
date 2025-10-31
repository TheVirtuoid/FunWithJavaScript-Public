# Snake Game
The Snake Game overall design document.

## Screens
1. User selected input and Ui from main menu
2. Options are saved in localStorage.
3. Game directs to the appropriate HTML page
4. Game initializes and begins.

### Initialization
1. New instance of Game class is created.
2. Ui class is added.
3. Input class is added.
4. Game.run() is called.

### Ui Sequence
1. Pitch is drawn
2. Scoreboard is drawn
3. Initial snake is drawn
4. Countdown is drawn and begins.
5. When countdown ends, the game starts:

### Gaming loop
1. Input is read for change of direction, change of speed, or game pause, game end.
2. Snake is moved.
3. Snake is drawn.
4. Food is drawn.
5. If snake collides with itself, game ends.
6. If snake collides with food, food is eaten and snake grows.
7. If snake collides with wall, game ends.
8. If snake collides with border, game ends.
9. If game is paused, game continues.
10. If game is over, game ends.
