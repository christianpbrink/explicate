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

