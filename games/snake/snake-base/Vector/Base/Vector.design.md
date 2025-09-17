# Vector base class

This class is to be used as a base for all vector-based designs in the Snake game.

**NOTE:** This is an abstract class. All methods will throw an exception if not implemented in a derived class.

## Properties

No properties are defined in this base class. Properties will be defined in derived classes.

## Methods

### Private

None

### Public

1. `add(vector)`: Adds another vector to this vector.
   - Returns a new Vector that is the sum of this vector and the provided vector
2. `subtract(vector)`: Subtracts another vector from this vector.
   - Returns a new Vector that is the difference of this vector and the provided vector
3. `clone()`: Creates a clone of this vector.
4. `equals(vector)`: Checks if this vector is equal to another vector.
   - Returns true if this vector is equal to the provided vector, false otherwise
5. `toString()`: Converts this vector to a string representation.
   - Returns a string representation of this vector in the format "Vector(x, y)"
6. `multiply(vector)`: Multiplies this vector by another vector.
   - Returns a new Vector that is the product of this vector and the provided vector
7. `compareTo(vector)`: Compares the two vectors.
   - Returns a new vector, which each component consisting of:
     - `-1` if this vector's component is less than the provided vector's component
     - `0` if this vector's component is equal to the provided vector's component
     - `1` if this vector's component is greater than the provided vector's component
8. `inBounds(vector)`: Checks if provided vector is within the bounds of current vector
   - Returns true or false.
   - This is calculated to assume that the provided vector has each component that is greater than or equal to 0, and less that the upper range of the corresponding component in the current vector.
   - For example, if this vector is (5, 5) and the provided vector is (3, 3), this method will return true
   - If this vector is (5, 5) and the provided vector is (5, 5), this method will return false
9. `isInside(vector)`: Check if provided vector is inside the bounds of current vector exclusive of the edge 
   - Returns true or false.
   - This is calculated to assume that the provided vector has each component that is greater than 0 and less than 2 from the upper range of the component in the current vector.
   - This means that the edge of vector at Vector.Zero() and the value of the current vector are "out-of-bounds".
   - For example, if this vector is (5, 5) and the provided vector is (3, 3), this method will return true
   - If this vector is (5, 5) and the provided vector is (4, 4), this method will return false
10. `isPerimeter(vector)`: Check if provided vector is on the edge of the current vector
    - Returns true or false.
    - This is calculated to assume that the provided vector has each component that is equal to Vector.Zero() or equal to the value of the current vector.
    - This means that the provided vector is on the "edge" of the current vector.
    - For example, if this vector is (5, 5) and the provided vector is (3, 3), this method will return false
    - If this vector is (5, 5) and the provided vector is (4, 4), this method will return true
11. `fill(number)`: Fills the vector with the provided number for each component.
    - Returns a new Vector with each component set to the provided number
12. `opposite()`: Returns the opposite of this vector.
    - Returns a new Vector that is the opposite of this vector (i.e., each component multiplied by -1)
13. `random()`: Returns a random vector

### Static

1. `Zero()`: Creates a zero vector.
2. `Up()`: Creates a vector pointing upwards.
3. `Down()`: Creates a vector pointing downwards.
4. `Left()`: Creates a vector pointing left.
5. `Right()`: Creates a vector pointing right.
6. `Forward()`: Creates a vector pointing forward. To the right for LTR languages, to the left for RTL languages.
7. `Backward()`: Creates a vector pointing backward. To the left for LTR languages, to the right for RTL languages.
8. `Fill(number)`: Creates a vector with each component set to the provided number.
9. `Random()`: Creates a random vector.
