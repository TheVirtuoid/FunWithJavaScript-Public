# ActionButton

Supplies a configurable action button.

## Constructor
- `args` (String) - A set of arguments, defined thusly:
    - `id` (String) - The ID of the instance. Defaults to a random UUID.
    - `label` (String) - the label for the button. Required.
    - `action` (Function) - the action to perform when the button is clicked. Required. This is called with a 'click' event on the button
    - `disabled` (Boolean) - whether the button is disabled. Default to false.
    - `hidden` (Boolean) - whether the button is hidden. Default to false.
    - `classList` (Array<string>) - an array of CSS classes to add to the button. Default to an empty array.

## Properties
All properties are read-only unless otherwise noted.
- `id` (String) - the ID of this instance.
- `label` (String) - the label for the button. Required.
- `action` (Function) - the action to perform when the button is clicked. Required. This is called with a 'click' event on the button
- `disabled` (Boolean) - whether the button is disabled. Default to false.
- `hidden` (Boolean) - whether the button is hidden. Default to false.
- `classList` (Array<string>) - an array of CSS classes to add to the button. Default to an empty array.

## Methods
- `setAction(action)` - sets/changes the action for a button. Does nothing if `type` is not found.
- `setDisabled(disabled)` - sets/changes the disabled flag for a button. Does nothing if `type` is not found.
- `setHidden(hidden)` - sets/changes the disabled flag for a button. Does nothing if `type` is not found.
- `setLabel(label)` - sets/changes the label for a button. Does nothing if `type` is not found.
- `setClassList(classList)` - sets/changes the classList for a button. Does nothing if `type` is not found.