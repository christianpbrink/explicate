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
