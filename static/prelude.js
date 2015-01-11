function isJust(m) {
    return m.length && m[0] === 'Just';
}

function fromJust(m) {
    return m[1];
}

// :: (a -> Bool) -> [a] -> Maybe a
function find(p, array) {
  var _result = _.find(array, p);
  if (_result) {
      return ['Just', _result];
  } else {
      return 'Nothing';
  }
}

// (=<<)
function bindl(f, x) {
  return join(fmap(f, x));
}

// (>>=)
function bindr(x, f) {
  return bindl(f, x);
}

function maybeHead(arr) {
  if (arr.length) {
      return ['Just', arr[0]];
  } else {
      return 'Nothing';
  }
}

function join(maybeVal) {
    if (isJust(maybeVal)) {
        return fromJust(maybeVal); 
    } else {
        return 'Nothing';
    }
}

function fmap(f, maybeVal) {
  if (isJust(maybeVal)) {
    return ['Just', f(fromJust(maybeVal))];
  } else {
    return 'Nothing';
  }
}
