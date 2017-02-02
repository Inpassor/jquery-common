Common functions library
========================

Author: Inpassor <inpassor@yandex.com>

GitHub repository: https://github.com/Inpassor/jquery-common

This package is the set of common functions, that missing in jQuery, to my mind.


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

All the functions are extending jQuery. So you can call them as
**jQuery.someFunction()** or **$.someFunction()**.

The list of available functions that this package contains:


### .isUndefined()

.isUndefined(variable) | Returns: boolean
--- | ---:
**Description**: Checks if **variable** is undefined.


### .isBool() / .isBoolean()

.isBool(variable) | Returns: boolean
--- | ---:
**Description**: Checks if **variable** is boolean.


### .isInt() / .isInteger()

.isInt(variable) | Returns: boolean
--- | ---:
**Description**: Checks if **variable** is integer.


### .isFloat()

.isFloat(variable) | Returns: boolean
--- | ---:
**Description**: Checks if **variable** is float.


### .isString()

.isString(variable) | Returns: boolean
--- | ---:
**Description**: Checks if **variable** is string.


### .isArray()

.isArray(variable) | Returns: boolean
--- | ---:
**Description**: Checks if **variable** is array.


### .getRandomString()

.getRandomString() | Returns: string
--- | ---:
**Description**: Generates a random string.


### .toFloat()

.toFloat(variable) | Returns: float
--- | ---:
**Description**: Tries to convert **variable** to float. Return float value on success,
0 on fail.


### .numberFormat()

.numberFormat(number[, decimals[, decPoint, thousandSep]]) | Returns: string
--- | ---:
**Description**: Format a number with grouped thousands.

This function accepts either one, two, or four parameters (not three):

If only one parameter is given, **number** will be formatted without decimals, but with
a comma (",") between every group of thousands.

If two parameters are given, **number** will be formatted with **decimals**
decimals with a dot (".") in front, and a comma (",") between every group of thousands.

If all four parameters are given, **number** will be formatted with **decimals**
decimals, **decPoint** instead of a dot (".") before the decimals and **thousandSep**
instead of a comma (",") between every group of thousands.

Parameter | Description
--- | ---
**number** | The number being formatted.
**decimals** | Sets the number of decimal points.
**decPoint** | Sets the separator for the decimal point.
**thousandSep** | Sets the thousands separator.


### .toMoney()

.toMoney(number[, decPoint[, thousandSep]]) | Returns: string
--- | ---:
**Description**: Converts **number** to money format with 2 decimals after dot.

This function accepts either one, two, or three parameters:

If only one parameter is given, **number** will be formatted with dot (".") in front of decimals
and with a space (" ") between every group of thousands.

If two parameters are given, **number** will be formatted with **decPoint**
instead of a dot (".") before the decimals and with a space (" ") between every group
of thousands.

If all three parameters are given, **number** will be formatted with **decPoint**
instead of a dot (".") before the decimals and **thousandSep**
instead of a space (" ") between every group of thousands.

Parameter | Description
--- | ---
**number** | The number being formatted.
**decPoint** | Sets the separator for the decimal point.
**thousandSep** | Sets the thousands separator.


### .prefixZero()

.prefixZero(number[, length]) | Returns: string
--- | ---:
**Description**: Returns **number** with prefix zeros. The total length of the
returned string equals to **length**.

Parameter | Description
--- | ---
**number** | The number being formatted.
**length** | Length of the returned string.


### .db()

**Description**: The function that combines everything you need to work with
localStorage.

.db() | Returns: bool
--- | ---:
**Description**: Returns true if localStorage is avalable. Otherwise returns false.

.db('clear') | Returns: bool
--- | ---:
**Description**: Clears all the contents of the localStorage.

.db(key) | Returns: mixed
--- | ---:
**Description**: Gets a value of **key** from then localStorage. If **key** was not found
returns *undefined*.

.db('remove', key) | Returns: bool
--- | ---:
**Description**: Removes **key** and its value from the localStorage.

.db('removeAll', keySubstr) | Returns: bool
--- | ---:
**Description**: Removes all data from the localStorage that keys contain **keySubstr**
substring.

.db(key, value) | Returns: bool
--- | ---:
**Description**: Sets **key** and its **value** to the localStorage.


### .getQueryParams()

.getQueryParams([queryString]) | Returns: object
--- | ---:
**Description**: Parses query string of the current URL or **queryString**
if given. Returns object with keys and values corresponding to query parameters
and its values.

Parameter | Description
--- | ---
**queryString** | The string being parsed. If not given, query string of the current URL will be used instead.


### .toQueryString()

.toQueryString(object) | Returns: string
--- | ---:
**Description**: Converts object to query string.

Parameter | Description
--- | ---
**object** | The object being converted.


### .getScriptParams()

.getScriptParams(filename) | Returns: object
--- | ---:
**Description**: Finds a sript file in DOM srtucture by its **filename** and
parses query parameters ot this file using **.getQueryParams()** function.

Parameter | Description
--- | ---
**filename** | The name of sript file without extension ".js".


### .getHashParams()

.getHashParams() | Returns: object
--- | ---:
**Description**: Parses hash of the current URL using **.getQueryParams()** function.


### .hashRemove()

**Description**: Removes hash from query string of the current URL preserving
current scroll position.


### .waitFor()

.waitFor(globalObjectName[, period[, interval]]) | Returns: $.Deferred
--- | ---:
**Description**: Looks for window global variable.

Parameter | Default | Description
--- | --- | ---
**globalObjectName** | | The name of a variable in window.
**period** | 1000 | The period in miliseconds to wait for variable.
**interval** | 10 | The inverval of iterations.

#### Example:

```
$.waitFor('App')
    .done(function(){
        // window.App successfully appeared.
    })
    .fail(function(){
        // 1 second past, window.App did not appear.
    });
```


### .render()

.render(template[, data]) | Returns: string
--- | ---:
**Description**: Renders a string **template** using **data**.
All the **template** constructions of the form "{{...}}" will be
replaced by **data** values.

Parameter | Description
--- | ---
**template** | A string template.
**data** | Object, which values will be substituted to the **template**.
 
#### Examples:

All the examples below will return the same string
"The server time: 12:30:41".

```
$.render("The server time: {{time}}", {
    time: '12:30:41'
});
```

```
$.render("The server time: {{time[0]}}:{{time[1]}}:{{time[2]}}", {
    time: [12, 30, 41]
});
```

```
$.render("The server time: {{time.hour}}:{{time.min}}:{{time.sec}}", {
    time: {
        hour: 12,
        min: 30,
        sec: 41
     }
});
```

```
$.render("{{dummy}}The server time: {{hour}}:{{min}}:{{sec}}", {
    hour: 12,
    min: 30,
    sec: 41
});
```

Note that "{{dummy}}" in the example above will be substituted by empty
string beacuse of "dummy" parameter is missing in data object.
