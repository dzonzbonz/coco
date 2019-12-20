# codestream
Code Consoling the simple way

# Install

```bash
yarn add dzonzbonz/codestream.js
```

# Usage

```html
<script src="dist/codestream.js"></script>
```
with vanila js

```javascript
var block = codestream.block;
```

or with bundle builders

```javascript
import { block } from 'codestream.js';
```

# Block

```javascript
var block = codestream.block;

const thisSampleParam = 'this value';
const val = block('#parent', (_handle) => {
  console.log('params', _handle);
  return '[' + thisSampleParam + ']';
});
```

# Blocks

```javascript
var block = codestream.block;

console.log("%cIndependent blocks", "color: red; font-size: 16px");

const mathDouble = param =>
  block("#mathDouble", _handle => {
    console.debug("params", param, "" + _handle);
    return "[" + mathAdd(param, param) + "]";
  });

const mathAdd = (param, anotherParam) =>
  block("#mathAdd", _handle => {
    console.debug("params", param, anotherParam, "" + _handle);
    return param + anotherParam;
  });

console.log('mathDouble(6) = ', mathDouble(6));

/**
 * Result is
 *
 * + #mathDouble
 * -- params 2
 * -+ #mathAdd
 * --- params 2 2
 */
```

# Nested Block

```javascript

var block = codestream.block;

console.log("%cIndependent blocks", "color: green; font-size: 16px");

const wrapAll = paramArray =>
  block("#wrapAll", _wh => {
    console.debug("number of elements", paramArray.length, "" + _wh);
    return _wh.fork("#map()", _th =>
      paramArray.map((itm, idx) => {
        if (idx % 2) {
          console.info("wrap odd", "" + _wh);
          return "{" + itm + "}";
        }

        console.info("wrap even", "" + _th);
        return "[" + itm + "]";
      })
    );
  });

console.log(
  "wrapAll([]) = ",
  wrapAll(["Hello", "my", "occupation", "is", "a", "good", "developer"]).join(
    " "
  )
);

```
