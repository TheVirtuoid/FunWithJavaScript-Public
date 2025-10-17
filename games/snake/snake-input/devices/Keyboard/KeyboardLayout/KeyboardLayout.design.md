# KeyboardLayout

A static class that contains different layouts for the keyboard.

Each keyboard layout needs to define the following actions:
1. 'Up'
2. 'Down'
3. 'Left'
4. 'Right'
5. 'Pause'
6. 'Resume'
7. 'Exit'

All key definitions are case-insensitive.

## Constructor
The constructor should throw an error as this is a static class

## Static Symbols
Each symbol will be defined thusly:

```javascript
static UP = Symbol('up');
```

List of symbols
- up
- down
- left
- right
- pause
- resume
- exit

## Properties
Each property will be defined thusly:

```javascript
static PROPERTY = new Map[
	[keycode: { action: Symbol, vector: Vector }]
  ];
```
- `keycode` - The keycode of the key press event
- `action` - The action to perform. Maps to the Symbols defined in this file
- `vector` - The vector to move the snake. For Pause, Resume, and Exit, this is null


- `WASD` - Uses the WASD keys for movement. Keys are defined as follows:
  - 'W' - Up (Vector.Up())
  - 'S' - Down (Vector.Down())
  - 'A' - Left (Vector.Left())
  - 'D' - Right (Vector.Right())
  - 'P' - Pause
  - 'R' - Resume
  - 'ESC' - Exit

- `ARROW` - Uses the Arrow keys for movement. Keys are defined as follows:
  - 'UpArrow' - Up (Vector.Up())
  - 'DownArrow' - Down (Vector.Down())
  - 'LeftArrow' - Left (Vector.Left())
  - 'RightArrow' - Right (Vector.Right())
  - 'P' - Pause
  - 'R' - Resume
  - 'ESC' - Exit

## Methods
- `setup(vectorConstructor)` - sets up the keyboard layout to use the correct vector
  - `vectorConstructor` (Vector) - a reference to the constructor of a Vector