import React from 'react';
import { Editor, Transforms, Range, Element, Text, Point } from 'slate';
import isUrl from 'is-url';
import {
  FormatAlignCenterOutlined,
  FormatAlignLeftOutlined,
  FormatAlignRightOutlined,
  FormatAlignJustifyOutlined,
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatUnderlinedOutlined,
  FormatListNumberedOutlined,
  FormatListBulletedOutlined,
  HighlightOutlined,
} from '@mui/icons-material';

export const PARAGRAPH_STYLES = [
  {
    key: 'paragraph',
    label: 'Normal Text',
  },
  {
    key: 'h1',
    label: 'Heading 1',
  },
  {
    key: 'h2',
    label: 'Heading 2',
  },
  {
    key: 'h3',
    label: 'Heading 3',
  },
  {
    key: 'h4',
    label: 'Heading 4',
  },
  {
    key: 'h5',
    label: 'Heading 5',
  },
  {
    key: 'h6',
    label: 'Heading 6',
  },
  { key: 'multiple' },
];
export const CHARACTER_STYLES = [
  {
    key: 'bold',
    icon: <FormatBoldOutlined />,
    label: 'Bold',
  },
  {
    key: 'italic',
    icon: <FormatItalicOutlined />,
    label: 'Italic',
  },
  {
    key: 'underline',
    icon: <FormatUnderlinedOutlined />,
    label: 'Underline',
  },
  {
    key: 'mark',
    icon: <HighlightOutlined />,
    label: 'Highlight',
  },
];
export const LIST_TYPES = [
  {
    key: 'numbered-list',
    icon: <FormatListNumberedOutlined />,
    label: 'Numbered List',
  },
  {
    key: 'bulleted-list',
    icon: <FormatListBulletedOutlined />,
    label: 'Bulleted List',
  },
];
export const TEXT_ALIGN_TYPES = [
  {
    key: 'left',
    icon: <FormatAlignLeftOutlined />,
    label: 'Align Left',
  },
  {
    key: 'center',
    icon: <FormatAlignCenterOutlined />,
    label: 'Align Center',
  },
  {
    key: 'right',
    icon: <FormatAlignRightOutlined />,
    label: 'Align Right',
  },
  {
    key: 'justify',
    icon: <FormatAlignJustifyOutlined />,
    label: 'Align Justify',
  },
];

export function getActiveStyles(editor) {
  return new Set(Object.keys(Editor.marks(editor) ?? {}));
}

export function toggleStyle(editor, style) {
  const activeStyles = getActiveStyles(editor);
  if (activeStyles.has(style)) {
    Editor.removeMark(editor, style);
  } else {
    Editor.addMark(editor, style, true);
  }
}

export function getTextBlockStyle(editor) {
  const selection = editor.selection;

  if (selection == null) return null;

  // gives forward direction points in case the selection was backwards.
  const [start, end] = Range.edges(selection);

  // path[0] gives us the index of the top-level block
  let startTopLevelBlockIndex = start.path[0];
  const endTopLevelBlockIndex = end.path[0];

  let blockType = null;

  while (startTopLevelBlockIndex <= endTopLevelBlockIndex) {
    const [node] = Editor.node(editor, [startTopLevelBlockIndex]);

    if (PARAGRAPH_STYLES.some((listType) => listType.key === node.type)) {
      if (blockType == null) {
        blockType = node.type;
      } else if (blockType !== node.type) {
        return 'multiple';
      }
    }

    startTopLevelBlockIndex++;
  }

  return blockType;
}

export function toggleBlockType(editor, blockType) {
  const currentBlockType = getTextBlockStyle(editor);
  const changeTo = currentBlockType === blockType ? 'paragraph' : blockType;
  Transforms.setNodes(editor, { type: changeTo }, { at: editor.selection });
}

export function getLinkNodeAtSelection(editor) {
  if (editor.selection == null) return;

  const [link] = Editor.nodes(editor, {
    at: editor.selection,
    match: (node) =>
      !Editor.isEditor(node) && Element.isElement(node) && node.type === 'link',
  });
  return [link?.[0], link?.[1]];
}

export function getIsLinkNodeAtSelection(editor) {
  return Boolean(getLinkNodeAtSelection(editor)?.[0]);
}

/** TODO: implement this function */
export function getIsOnlyLinkNodeAtSelection(editor) {
  if (editor.selection == null) return;

  const [link] = Editor.nodes(editor, {
    at: editor.selection,
    match: (node) =>
      !Editor.isEditor(node) && Element.isElement(node) && node.type === 'link',
  });
}

export function toggleLinkAtSelection(editor) {
  const isLinkNodeAtSelection = getIsLinkNodeAtSelection(editor);

  if (isLinkNodeAtSelection) {
    // remove link
    Transforms.unwrapNodes(editor, {
      match: (node) => Element.isElement(node) && node.type === 'link',
    });
    return;
  }

  const isSelectionCollapsed = Range.isCollapsed(editor.selection);

  if (!isSelectionCollapsed) {
    // add link without any text
    Transforms.wrapNodes(
      editor,
      { type: 'link', url: '#', children: [{ text: '' }] },
      { split: true, at: editor.selection }
    );
    return;
  }

  // add link with text = 'link'
  Transforms.insertNodes(
    editor,
    { type: 'link', url: '#', children: [{ text: 'link' }] },
    { at: editor.selection }
  );
}

export function identifyLinksInTextIfAny(editor) {
  if (editor.selection == null) return;

  if (!Range.isCollapsed(editor.selection)) return;

  const [node] = Editor.parent(editor, editor.selection);

  // if we are already inside a link, exit early
  if (node.type === 'link') return;

  const [currentNode, currentNodePath] = Editor.node(editor, editor.selection);

  // if we are not inside a text node, exit early
  if (!Text.isText(currentNode)) return;

  let [start] = Range.edges(editor.selection);
  const cursorPoint = start;

  const startPointOfLastCharacter = Editor.before(editor, editor.selection, {
    unit: 'character',
  });

  const rng = Editor.range(editor, startPointOfLastCharacter, cursorPoint);

  const lastCharacter =
    rng.anchor && rng.focus ? Editor.string(editor, rng) : '';

  if (lastCharacter !== ' ') return;

  let end = startPointOfLastCharacter;
  start = Editor.before(editor, end, { unit: 'character' });

  const startOfTextNode = Editor.point(editor, currentNodePath, {
    edge: 'start',
  });

  while (
    Editor.range(editor, start, end).anchor &&
    Editor.range(editor, start, end).focus &&
    Editor.string(editor, Editor.range(editor, start, end)) !== ' ' &&
    !Point.isBefore(start, startOfTextNode)
  ) {
    end = start;
    start = Editor.before(editor, end, { unit: 'character' });
  }

  const lastWordRange = Editor.range(editor, end, startPointOfLastCharacter);
  const lastWord = Editor.string(editor, lastWordRange).trim();

  if (lastWord === '') return;

  if (!isUrl(lastWord)) return;

  Promise.resolve().then(() => {
    Transforms.wrapNodes(
      editor,
      { type: 'link', url: lastWord, children: [{ text: lastWord }] },
      { split: true, at: lastWordRange }
    );
  });
}

export function getActiveListStyles(editor) {
  const selection = editor.selection;

  if (selection == null) return [];

  // gives forward direction points in case the selection was backwards.
  const [start, end] = Range.edges(selection);

  // path[0] gives us the index of the top-level block
  let startTopLevelBlockIndex = start.path[0];
  const endTopLevelBlockIndex = end.path[0];

  const listType = [];

  while (startTopLevelBlockIndex <= endTopLevelBlockIndex) {
    const [node] = Editor.node(editor, [startTopLevelBlockIndex]);

    if (
      !listType.includes(node.type) &&
      LIST_TYPES.some((listType) => listType.key === node.type)
    ) {
      listType.push(node.type);
    }

    startTopLevelBlockIndex++;
  }

  return listType;
}

export function toggleListType(editor, listType) {
  const currentListType = getActiveListStyles(editor);

  Transforms.unwrapNodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) &&
      Element.isElement(node) &&
      LIST_TYPES.some((listType) => listType.key === node.type),
    split: true,
  });

  if (currentListType.length === 1 && currentListType.includes(listType)) {
    Transforms.setNodes(editor, { type: 'paragraph' });
    return;
  }

  Transforms.wrapNodes(editor, { type: listType, children: [] });
  Transforms.setNodes(editor, { type: 'list-item' });
}

export function getActiveTextAlignStyle(editor, alignment) {
  if (!editor.selection) return false;

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, editor.selection),
    match: (node) =>
      !Editor.isEditor(node) &&
      Element.isElement(node) &&
      node.align === alignment,
  });

  return Boolean(match);
}

export function toggleTextAlignType(editor, alignment) {
  const isActive = getActiveTextAlignStyle(editor, alignment);

  const style = isActive ? { align: 'unset' } : { align: alignment };
  Transforms.setNodes(editor, style);
}
