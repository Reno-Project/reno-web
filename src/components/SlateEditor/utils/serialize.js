function getImageTag(node) {
  const element = document.createElement('img');

  element.setAttribute('src', node.url);

  return element.outerHTML;
}

function getAnchorTag(node) {
  const element = document.createElement('a');

  element.setAttribute('href', node.url);

  element.innerHTML =
    'text' in node
      ? node.text.replaceAll('\n', '<br>')
      : serialize(node.children);

  return element.outerHTML;
}

function getFormattedText(node) {
  const element = document.createElement('div');
  let leafChild = element;

  if (node.bold) {
    const bold = document.createElement('strong');
    leafChild.appendChild(bold);
    leafChild = bold;
  }

  if (node.italic) {
    const italic = document.createElement('em');
    leafChild.appendChild(italic);
    leafChild = italic;
  }

  if (node.underline) {
    const underline = document.createElement('u');
    leafChild.appendChild(underline);
    leafChild = underline;
  }

  if (node.mark) {
    const mark = document.createElement('mark');
    leafChild.appendChild(mark);
    leafChild = mark;
  }

  leafChild.innerHTML = node.text.replaceAll('\n', '<br>');

  return element.innerHTML;
}

export default function serialize(nodes) {
  let richtext = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const node of nodes) {
    const attributes = {};
    if (node.align) {
      attributes.align = node.align;
    }

    const attrs = Object.entries(attributes).reduce((acc, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      acc += ' ';
      // eslint-disable-next-line no-param-reassign
      acc += `${key}="${value}"`;
      return acc;
    }, '');

    switch (node.type) {
      case undefined:
      case 'text':
        richtext += getFormattedText(node);
        break;
      case 'image':
        richtext += getImageTag(node);
        break;
      case 'link':
        richtext += getAnchorTag(node);
        break;
      case 'numbered-list':
        richtext += `<ol${attrs}>${serialize(node.children)}</ol>`;
        break;
      case 'bulleted-list':
        richtext += `<ul${attrs}>${serialize(node.children)}</ul>`;
        break;
      case 'list-item':
        richtext += `<li${attrs}>${serialize(node.children)}</li>`;
        break;
      case 'paragraph':
        richtext += `<p${attrs}>${serialize(node.children)}</p>`;
        break;
      case 'h1':
        richtext += `<h1${attrs}>${serialize(node.children)}</h1>`;
        break;
      case 'h2':
        richtext += `<h2${attrs}>${serialize(node.children)}</h2>`;
        break;
      case 'h3':
        richtext += `<h3${attrs}>${serialize(node.children)}</h3>`;
        break;
      case 'h4':
        richtext += `<h4${attrs}>${serialize(node.children)}</h4>`;
        break;
      case 'h5':
        richtext += `<h5${attrs}>${serialize(node.children)}</h5>`;
        break;
      case 'h6':
        richtext += `<h6${attrs}>${serialize(node.children)}</h6>`;
        break;
      default:
        richtext += serialize(node.children);
        // eslint-disable-next-line no-console
        console.error(`Unhandled slate node found: ${node.type}`);
        break;
    }
  }

  return richtext;
}
