var state = {
  'currentPos': 0,
  'theTree': {},
};

renderTree = function(tree) {
    var recVal = _.map(tree['branches'], renderTree);
    var rv = '<div class="tree" data-id="' + tree['id'] + '" data-parent-id="' + tree['parentID'] + '">'
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

nextID = 0;
function gimmeAnID() {
  var theID = nextID;
  nextID++;
  return theID;
}

function giveIDs(parentID, tree) {
  var id = gimmeAnID();
  tree['id'] = id;
  tree['parentID'] = parentID;
  _.map(tree['branches'], function(branch) {
      return giveIDs(id, branch);
  });

}

giveIDs(false, demoTree);


/*
 *  Navigation / position utils 
 */

function getParentID(id, tree) {
  return fmap(function(x) { return x['parentID']; }, treeForID(id, tree));
}

function getFirstChildID(id, tree) {
    var maybeSubtree = treeForID(id, tree);
    var maybeChildIDs = fmap(idsOfDirectChildren, maybeSubtree);
    var maybeFirstID = join(fmap(maybeHead, maybeChildIDs));
    return maybeFirstID;
}

function getLeftSibling(id, tree) {

}


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

function changePos(newPos) {
  console.log("changePos >> newPos: ", newPos);
  getDOMNodeByID(state['currentPos']).removeClass('focussed');
  state['currentPos'] = newPos;
  var newDOMNode = getDOMNodeByID(newPos);
  console.log("changePos >> newDOMNode: ", newDOMNode);
  newDOMNode.addClass('focussed');
}

function getDOMNodeByID(theID) {
  return $('.tree').filter(function(i, elem) { return $(elem).attr('data-id') == theID; });
}

function keyHandler(event) {
  switch(event.keyCode) {
    case keyCode.LEFT:
      break;
    case keyCode.UP:
      var maybeParentID = getParentID(state['currentPos'], demoTree);
      console.log("keyHandler >> maybeParentID:", maybeParentID);
      fmap(changePos, maybeParentID);
      break;
    case keyCode.RIGHT:
      break;
    case keyCode.DOWN:
      var maybeFirstChildID = getFirstChildID(state['currentPos'], demoTree);
      console.log("keyHandler >> maybeFirstChildID:", maybeFirstChildID);
      fmap(changePos, maybeFirstChildID);
      break;
    default:
      console.log('keyCode ' + event.keyCode);
      break;
    };
}

function idsOfDirectChildren(tree) {
    return _.map(tree['branches'], function(branch) { 
        return branch['id']; 
    });
}

function treeForID(id, tree) {
    if (tree.id == id) {
        return ['Just', tree];
    } else if (tree['branches']) {
        var result = applyTillResult(tree['branches'], function(branch) {
            return treeForID(id, branch);
        });
        return result;
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

function childIDs(id, tree) {
    var maybeTree = treeForID(id, tree);
    if (isJust(maybeTree)) {
        return idsOfDirectChildren(fromJust(maybeTree));
    } else {
        console.error("childIDs >> Expected `Just _`, received `Nothing`");
    }
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

function applyTillResult(array, f) {
  for (var i = 0 ; i < array.length ; i++) {
    if(f(array[i])) {
      return f(array[i]);
    }
  }
  return false;
}
