# coco
Code Consoling the simple way

# Forking

```javascript
const thisSampleParam = 'this value';
const _code = coco.fork('#parent');
_code.log('params', thisSampleParam);
```

# Chained Forks

```javascript
const thatSampleParam = 'that value';
const _block = _code.fork('#child');
_code.log('params', thatSampleParam);
```

# Synchronioous Block Streams

```javascript

const mathDouble = (param) => _code.block('#mathDouble', _log => {
  _log('params', param);
  return '[' + anotherMethod(param, param) + '];
});

const mathAdd = (param, anotherParam) => _code.block('#mathAdd', _log => {
  const _block = _code.fork('#child');
  _log('params', thatSampleParam);
  return param + anotherParam;
});

mathDouble(2);

mathDouble(3);

mathDouble(4);

```
