renderTree = function(tree) {
    var recVal = _.map(tree['branches'], renderTree);
    var rv = '<div class="tree">'
           +      '<div class="label">' + tree['label'] + '</div>'
           +      '<div class="branches">' + recVal.join('') + '</div>'
           +  '</div>'
           ;
    return rv;
}


demoTree = {
  'label': 'p1',
  'branches': [
    { 'label': 'claim1',
      'branches': [
        {'label': 'article1',
        },
        {'label': 'article2',
         'branches': [{'label': 'thingami'}],
        },
        ]
    },
    {'label': 'claim2',
     'branches': [
        {'label': 'article1'}
     ],
    }
  ],
};

function fmap(f, maybeVal) {
  if (isJust(maybeVal)) {
    return ['Just', f(fromJust(maybeVal))];
  } else {
    return false;
  }
}

function maybeHead(arr) {
  if (arr.length) {
      return ['Just', arr[0]];
  } else {
      return false;
  }
}

function join(maybeVal) {
    if (isJust(maybeVal)) {
        return fromJust(maybeVal); 
    } else {
        return false;
    }
}
function isJust(m) {
    return m.length && m[0] === 'Just';
}

function fromJust(m) {
    return m[1];
}
keyCode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    NUMPAD_ADD: 107,
    NUMPAD_DECIMAL: 110,
    NUMPAD_DIVIDE: 111,
    NUMPAD_ENTER: 108,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_SUBTRACT: 109,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
}
