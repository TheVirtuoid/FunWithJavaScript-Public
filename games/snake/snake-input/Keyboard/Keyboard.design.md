# Keyboard

A class that extends the Input class and implements keyboard input.

## Constructor
`new Keyboard(args)` - creates a new Keyboard instance with specified properties.
- `layout` (KeyboardLayout) - an object representing the keyboard layout. This will define the Up/Left/Right/Down keys. Required.
- `id` (String) - the id of the input. Defaults to `window.cyrpto.randomUUID()`.
- `driver` (Symbol) - the driver used for keyboard input. Defaults to `Keyboard.BROWSER`
  - Alternate value: `Keyboard.NODE`
- `input` (Input) - the input that this keyboard is attached t

## Properties

### Public
All properties are read-only unless otherwise noted.

- `id` (String) - the id of the input
- `layout` (KeyboardLayout) - the keyboard layout selected

