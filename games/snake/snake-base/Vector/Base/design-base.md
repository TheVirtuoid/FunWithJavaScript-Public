# Vector base class

This class is to be used as a base for all vector-based designs in the Snake game.

## Properties

### Private

None

### Public

None

## Methods

### Private

None

### Public

1. `add(vector)`: Adds another vector to this vector.
   - `vector` (Vector) - The vector to add
   - Returns a new Vector that is the sum of this vector and the provided vector
   - Will throw exception if not implemented
2. `subtract(vector)`: Subtracts another vector from this vector.
   - `vector` (Vector) - The vector to subtract
   - Returns a new Vector that is the difference of this vector and the provided vector
   - Will throw exception if not implemented
3. `clone()`: Creates a clone of this vector.
   - Returns a new Vector that is a copy of this vector
   - Will throw exception if not implemented
4. `equals(vector)`: Checks if this vector is equal to another vector.
   - `vector` (Vector) - The vector to compare with
   - Returns true if this vector is equal to the provided vector, false otherwise
   - Will throw exception if not implemented
5. `toString()`: Converts this vector to a string representation.
   - Returns a string representation of this vector in the format "Vector(x, y)"
   - Will throw exception if not implemented

### Static
Note that actual implementation is left up to the derived classes;

1. `Zero()`: Creates a zero vector.
   - Will throw exception if not implemented
2. `Up()`: Creates a vector pointing upwards.
   - Will throw exception if not implemented
3. `Down()`: Creates a vector pointing downwards.
   - Will throw exception if not implemented
4. `Left()`: Creates a vector pointing left.
   - Will throw exception if not implemented
5. `Right()`: Creates a vector pointing right.
   - Will throw exception if not implemented
6. `Forward()`: Creates a vector pointing forward.
   - Will throw exception if not implemented
7. `Backward()`: Creates a vector pointing backward.
   - Will throw exception if not implemented