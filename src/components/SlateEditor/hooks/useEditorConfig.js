import React, { Fragment, useCallback } from 'react';
import { DefaultElement } from 'slate-react';
import isHotkey from 'is-hotkey';
import { toggleStyle } from '../utils/EditorUtils';
import Link from '../components/Link';

export default function useEditorConfig(editor) {
  const onKeyDown = useCallback(
    (event) => KeyBindings.onKeyDown(editor, event),
    [editor],
  );

  editor.isInline = (element) => ['link'].includes(element.type);

  return { renderElement, renderLeaf, onKeyDown };
}

const KeyBindings = {
  onKeyDown: (editor, event) => {
    if (isHotkey('mod+b', event)) {
      toggleStyle(editor, 'bold');
      return;
    }

    if (isHotkey('mod+i', event)) {
      toggleStyle(editor, 'italic');
      return;
    }

    if (isHotkey('mod+u', event)) {
      toggleStyle(editor, 'underline');
      return;
    }
  },
};

function renderElement(props) {
  const { element, children, attributes } = props;
  const style = { textAlign: element.align };

  switch (element.type) {
    case 'paragraph':
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
    case 'h1':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      );
    case 'h6':
      return (
        <h6 style={style} {...attributes}>
          {children}
        </h6>
      );
    case 'link':
      return (
        <Link element={element} style={style} {...attributes}>
          {children}
        </Link>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    default:
      // For the default case, we delegate to Slate's default rendering
      return <DefaultElement style={style} {...props} />;
  }
}

function renderLeaf({ attributes, children, leaf }) {
  let el = <Fragment>{children}</Fragment>;

  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (leaf.italic) {
    el = <em>{el}</em>;
  }

  if (leaf.underline) {
    el = <u>{el}</u>;
  }

  if (leaf.mark) {
    el = <mark>{el}</mark>;
  }

  return <span {...attributes}>{el}</span>;
}
