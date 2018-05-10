require(__dirname).test({
  strict: true,
  opt: { xmlns: true },
  xml: '<a>something &custom; &lt;here</a>',
  expect: [
    ['opentagstart', {'name': 'a', 'attributes': {}, 'ns': {}}],
    ['opentag', {'name': 'a', 'attributes': {}, 'ns': {}, 'isSelfClosing': false, 'prefix': '', 'local': 'a', 'uri': ''}],
    ['text', 'something '],
    ['entityreference', 'custom'],
    ['text', ' '],
    ['entityreference', 'lt'],
    ['text', 'here'],
    ['closetag', 'a']
  ]
})
