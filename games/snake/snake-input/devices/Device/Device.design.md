# Device

Base class for all devices that act as input devices.

## Constructor(args)
- `id` (String) - the id of the device. Defaults to UUID.
- `vectorReference` (Vector Constructor) - the vector constructor of the device. Required.

## Properties
All properties are read-only unless otherwise noted.

- `id` - The ID of the input device.
- `vectorReference` - The vector constructor of the device. Defaults to null.

## Methods
- `dispose()` - Not implemented on this class.