# codestream
Code Consoling the simple way

# Forking

```javascript
const thisSampleParam = 'this value';
const _code = cs.fork('#parent');
_code.log('params', thisSampleParam);

/**
 * > #parent params this value
 */
```

# Chained Forks

```javascript
const thisSampleParam = 'this value';
const _code = cs.fork('#parent');
_code.log('params', thisSampleParam);

const thatSampleParam = 'that value';
const _block = _code.fork('#child');
_block.log('params', thatSampleParam);

/**
 * > #parent params this value
 * > #parent #child params that value
 */
```

# Synchronious Block Streams

```javascript

const mathDouble = (param) => cs.block('#mathDouble', _log => {
  _log('params', param);
  return '[' + anotherMethod(param, param) + ']';
});

const mathAdd = (param, anotherParam) => cs.block('#mathAdd', _log => {
  _log('params', param, anotherParam);
  return param + anotherParam;
});

mathDouble(2);
/**
 * Result is
 *
 * + #mathDouble
 * -- params 2
 * -+ #mathAdd
 * --- params 2 2
 */
```

# Synchronious Nested Block Streams

```javascript

const wrapAll = (paramArray) => cs.block('#wrapAll', _log => {
  _log.debug('number of elements', paramArray.length);
  return paramArray.map((itm, idx) => _log.block(`#traverse(${itm})`, _tlog => {
    if (idx % 2) {
      _tlog.info('wrap odd');
      return '{' + itm + '}';
    }

    _tlog.info('wrap even');
    return '[' + itm + ']';
  })
});

wrapAll(['Hello', 'my', 'occupation', 'is', 'a', 'good', 'developer']);

```
