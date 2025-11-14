# ActionButtons

Supplies a configurable list of action buttons.

## Constructor
- `id` (String) - the ID of this instance. Default to a UUID

## Properties
All properties are read-only unless otherwise noted.
- `id` (String) - the ID of this instance.

## Methods
- `addButton(args)` - adds a button to the list
  - Args contains the following keys:
  - `type` (any) - the type of button to add. Required. This is fully definable by the application. Must be unique, so we suggest using a symbol.
  - `label` (String) - the label for the button. Required.
  - `action` (Function) - the action to perform when the button is clicked. Required. This is called with a 'click' event on the button
  - `disabled` (Boolean) - whether the button is disabled. Default to false.
  - `hidden` (Boolean) - whether the button is hidden. Default to false.
- `removeButton(type)` - removes a button from the list
  - `type` (any) - the type of button to remove. If not found, no error is thrown. Otherwise, the action button is removed.
- `setButtonAction(type, action)` - sets/changes the action for a button. Does nothing if `type` is not found.
- `setDisabled(type, disabled)` - sets/changes the disabled flag for a button. Does nothing if `type` is not found.
- `setHidden(type, hidden)` - sets/changes the disabled flag for a button. Does nothing if `type` is not found.
