# Keyboard

A class that extends the Input class and implements keyboard input.

## Constructor
`new Keyboard(layout)` - creates a new Keyboard instance with specified layout.
- `layout` - an object representing the keyboard layout. This will define the Up/Left/Right/Down keys.

## Properties

### Public
All properties are read-only unless otherwise noted.

- `id` (String) - the id of the input. Defaults to `window.cyrpto.randomUUID()`.
- `layout` (Object) - the keyboard layout selected. Defaults to KeyboardLayout.WASD
- 