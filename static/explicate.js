var state = {
  'currentPos': 0,
  'theTree': {},
};

nextID = state['currentPos'];
function gimmeAnID() {
  var theID = nextID;
  nextID++;
  return theID;
}

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

// :: Id -> Tree -> Maybe Tree
function treeForID(id, tree) {
    if (tree['id'] == id) {
        return ['Just', tree];
    } else if (tree['branches']) {
        // :: Tree -> Bool
        function p(_tree) {
            var maybeTree = treeForID(id, _tree);
            return isJust(maybeTree);
        }
        var maybeTree = find(p, tree['branches']);
        //console.log("treeForID >> maybeTree: ", maybeTree);
        var r = bindl(treeForIDGivenID(id), maybeTree);
        return r
    } else {
        return 'Nothing';
    }
}

function treeForIDGivenTree(tree) {
    return function(id) {
        return treeForID(id, tree);
    }
}

function treeForIDGivenID(id) {
    return function(tree) {
        return treeForID(id, tree);
    }
}

function getParentID(id, tree) {
  //console.log("getParentID >> id:", id);
  var maybeTree = treeForID(id, tree);
  //console.log("getParentID >> maybeTree:", maybeTree);
  return bindr(maybeTree, function(x) { 
      if (x.hasOwnProperty('parentID')) {
          return ['Just', x['parentID']];
      } else {
          return 'Nothing'; 
      }; 
  });
}

function getFirstChildID(id, tree) {
    var maybeSubtree = treeForID(id, tree);
    var maybeChildIDs = fmap(idsOfDirectChildren, maybeSubtree);
    var maybeFirstID = bindl(maybeHead, maybeChildIDs);
    return maybeFirstID;
}

function getSiblingID(id, tree, fnOfIndex) {
    //console.log("getSiblingID >> id:", id, "tree:",tree);
    var maybeParentID = getParentID(id, demoTree);
    //console.log("getSiblingID >> maybeParentID:", maybeParentID);
    var maybeParentTree = bindl(treeForIDGivenTree(demoTree), maybeParentID);
    //console.log("getSiblingID >> maybeParentTree:", maybeParentTree);
    var maybeChildIDs = fmap(idsOfDirectChildren, maybeParentTree);
    //console.log("getSiblingID >> maybeChildIDs:", maybeChildIDs);
    var maybeIndexOfID = fmap(function findIdInChildIDs(childIds) { 
        //console.log("findIdInChildIDs >> childIds:", childIds, "id:", id);
        return childIds.indexOf(id); 
    }, maybeChildIDs);
    //console.log("getSiblingID >> maybeIndexOfID:", maybeIndexOfID);
    return bindr(maybeIndexOfID, function(indexOfID) {
        var newIndex = fnOfIndex(indexOfID);
        if ((newIndex >= 0) && (newIndex < fromJust(maybeChildIDs).length)) {
            return ['Just', fromJust(maybeChildIDs)[newIndex]];
        } else {
            return 'Nothing';
        }
    });
}

function changePos(newPos) {
  //console.log("changePos >> newPos: ", newPos);
  getDOMNodeByID(state['currentPos']).removeClass('focussed');
  state['currentPos'] = newPos;
  var newDOMNode = getDOMNodeByID(newPos);
//  //console.log("changePos >> newDOMNode: ", newDOMNode);
  newDOMNode.addClass('focussed');
}

function getDOMNodeByID(theID) {
  return $('.tree').filter(function(i, elem) { return $(elem).attr('data-id') == theID; });
}

function keyHandler(event) {
  switch(event.keyCode) {
    case keyCode.LEFT:
      var maybeLeftSiblingID = getSiblingID(state['currentPos'], demoTree, function(i) { return i - 1; });
      //console.log("keyHandler >> maybeLeftSiblingID:", maybeLeftSiblingID);
      fmap(changePos, maybeLeftSiblingID);
      break;
    case keyCode.UP:
      var maybeParentID = getParentID(state['currentPos'], demoTree);
      //console.log("keyHandler >> maybeParentID:", maybeParentID, ", currentPos:", state['currentPos']);
      fmap(changePos, maybeParentID);
      break;
    case keyCode.RIGHT:
      var maybeRightSiblingID = getSiblingID(state['currentPos'], demoTree, function(i) { return i + 1; });
      //console.log("keyHandler >> maybeRightSiblingID:", maybeRightSiblingID);
      fmap(changePos, maybeRightSiblingID);
      break;
    case keyCode.DOWN:
      var maybeFirstChildID = getFirstChildID(state['currentPos'], demoTree);
      //console.log("keyHandler >> maybeFirstChildID:", maybeFirstChildID);
      fmap(changePos, maybeFirstChildID);
      break;
    default:
//      //console.log('keyCode ' + event.keyCode);
      break;
    };
}

function idsOfDirectChildren(tree) {
    return _.map(tree['branches'], function(branch) { 
        return branch['id']; 
    });
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
