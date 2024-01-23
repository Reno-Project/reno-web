function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// function parseImage(image, children) {
//   const url = image.getAttribute('src');

//   return {
//     url,
//     type: 'image',
//     uploadStatus: 'UPLOADED',
//     children,
//   };
// }

function parseLink(link, children) {
  const url = link.getAttribute('href');

  return {
    type: 'link',
    url,
    children,
  };
}

function insertNode(node, format, type, nodes) {
  const n = {
    type,
    children: traverseNodes(node, { format }),
  };
  if (node.align) n.align = node.align;
  nodes.push(n);
}

function traverseNodes(root, { format = {} }) {
  const nodes = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const node of Array.from(root.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      nodes.push({
        text: decodeHtml(node.textContent || ''),
        ...format,
      });
      // eslint-disable-next-line no-continue
      continue;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      // eslint-disable-next-line no-console
      console.error(`Unhandled node found: ${node.nodeName}`);
      // eslint-disable-next-line no-continue
      continue;
    }

    switch (node.nodeName.toUpperCase()) {
      case 'H1':
        insertNode(node, format, 'h1', nodes);
        break;
      case 'H2':
        insertNode(node, format, 'h2', nodes);
        break;
      case 'H3':
        insertNode(node, format, 'h3', nodes);
        break;
      case 'H4':
        insertNode(node, format, 'h4', nodes);
        break;
      case 'H5':
        insertNode(node, format, 'h5', nodes);
        break;
      case 'H6':
        insertNode(node, format, 'h6', nodes);
        break;
      case 'P':
        insertNode(node, format, 'paragraph', nodes);
        break;
      case 'OL':
        insertNode(node, format, 'numbered-list', nodes);
        break;
      case 'UL':
        insertNode(node, format, 'bulleted-list', nodes);
        break;
      case 'LI':
        insertNode(node, format, 'list-item', nodes);
        break;
      case 'STRONG':
      case 'B':
        nodes.push(
          ...traverseNodes(node, {
            format: { ...format, bold: true },
          }),
        );
        break;
      case 'EM':
      case 'I':
        nodes.push(
          ...traverseNodes(node, {
            format: { ...format, italic: true },
          }),
        );
        break;
      case 'U':
        nodes.push(
          ...traverseNodes(node, {
            format: { ...format, underline: true },
          }),
        );
        break;
      case 'MARK':
        nodes.push(
          ...traverseNodes(node, {
            format: { ...format, mark: true },
          }),
        );
        break;
      case 'A':
        nodes.push(parseLink(node, traverseNodes(node, { format })));
        break;
      default:
        break;
    }
  }

  return nodes;
}

export default function deserialize(richtext) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = richtext;

  const nodes = traverseNodes(wrapper, {
    nodes: [],
    format: {},
  });

  if (!nodes.length) {
    nodes.push({
      type: 'paragraph',
      children: [{ type: 'text', text: '' }],
    });
  }

  return nodes;
}
