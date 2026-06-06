# Database

The Database singleton class. Responsible for getting data from the server.

## Constructor
` new Database(path)` - Creates a singleton Database instance
- `path` (string): The path to the database directory.
    - Required
    - Must be a string.
    - Directory must exist.

The database object expects to find at least two files in that directory:
- `*.jsonl`: The actual database, spread across multiple JSONL files.
- `*.idx`: Index files for efficient lookups by ID and name.
    - Required
    - Must be present for the database to function correctly.

## Properties
All properties are read-only.
- `ready` (boolean): Set to 'false' until the database is fully initialized and ready for use.

## Methods
1. `get(args)` - Retrieves a single entity from the database by ID.
    - `args` (object): The arguments to pass, which contain
        - `key` (string): The key to look up. This is based upon keys in the index file. Required.
        - `value` (any): The value to look up by 'id' or 'name'. Required.
    - Returns the record or `undefined` if not found, or if database is not ready.
    
2. `getAll(args)` - Retrieves all entities from the database.
    - `args` (object): The arguments to pass, which contain:
        - `database` (string): The name of the database. Required.
    - Returns the array of records from the database, or an empty array if none are found, or if database is not ready.
    - If the database itself is not found, then it will throw an error.

