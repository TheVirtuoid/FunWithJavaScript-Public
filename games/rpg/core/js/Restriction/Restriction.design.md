# Restriction

A class to normalize and test for Restrictions.

## constructor
Throws error when constructing. This is a static class.

## static methods

- `isRestricted(args)`: Returns true if there is a restriction, false otherwise
    - arguments
      - `restrictionType`: The type of restriction
      - `restrictionData`: The data for the restriction
    - Returns: true if there is a restriction, false otherwise. Will throw if `restrictionType` is invalid.