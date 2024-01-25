export const SlateExampleDocument = [
  {
    type: 'h1',
    children: [{ text: 'Heading 1' }],
  },
  {
    type: 'h2',
    children: [{ text: 'Heading 2' }],
  },
  {
    type: 'h3',
    children: [{ text: 'Heading 3' }],
  },
  {
    type: 'h4',
    children: [{ text: 'Heading 4' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [
      { text: 'Hello World! This is my paragraph inside a sample document.' },
      { text: 'Bold text.', bold: true },
      { text: 'Italic text.', italic: true },
      { text: 'Bold and underlined text.', bold: true, underline: true },
      { text: 'Some text before a link.' },
      {
        type: 'link',
        url: 'https://www.google.com',
        children: [
          { text: 'Link text' },
          { text: 'Bold text inside link', bold: true },
        ],
      },
    ],
  },
  {
    type: 'bulleted-list',
    children: [
      { type: 'list-item', children: [{ text: 'Test 1' }] },
      { type: 'list-item', children: [{ text: 'Test 2' }] },
    ],
  },
  {
    type: 'numbered-list',
    children: [
      { type: 'list-item', children: [{ text: 'Test 3' }] },
      { type: 'list-item', children: [{ text: 'Test 4' }] },
    ],
  },
];

export const HTMLExampleDocument =
  '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><p align="center">Hello World! This is my paragraph inside a sample document.<strong>Bold text.</strong><em>Itsalic text.</em><strong><u>Bold and underlined text.</u></strong>Some text before a link.<a href="https://www.google.com">Link text<strong>Bold text inside link</strong></a></p><ul><li>Test 1</li><li>Test 2</li></ul><ol><li>Test 3</li><li>Test 4</li></ol>';
