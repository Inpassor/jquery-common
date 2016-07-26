# jquery-common
Common functions library

## Installation

### Using bower:

```
bower install inpassor-jquery-common
```

### Using composer asset plugin:

```
composer require bower-asset/inpassor-jquery-common
```

## Functions

All the functions are extending jQuery. So you can call them as *jQuery.someFunction()* or *$.someFunction()*.

The list of available functions that this package contains:

### .isUndefined()

.isUndefined(variable) | Returns: boolean
--- | ---:
*Description*: Checks if variable is undefined.

### .isBool() / .isBoolean()

.isBool(variable) | Returns: boolean
--- | ---:
*Description*: Checks if variable is boolean.

### .isInt() / .isInteger()

.isInt(variable) | Returns: boolean
--- | ---:
*Description*: Checks if variable is integer.

### .isFloat()

.isFloat(variable) | Returns: boolean
--- | ---:
*Description*: Checks if variable is float.

### .isString()

.isString(variable) | Returns: boolean
--- | ---:
*Description*: Checks if variable is string.

### .isArray()

.isArray(variable) | Returns: boolean
--- | ---:
*Description*: Checks if variable is array.

### .toFloat()

.toFloat(variable) | Returns: float
--- | ---:
*Description*: Tries to convert variable to float. Return float value on success, 0 on fail.



---
to be continued...
