import React, { useCallback, useMemo, useRef } from 'react';
import { Divider, Stack, styled } from '@mui/material';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import useEditorConfig from '../hooks/useEditorConfig';
import Toolbar from './Toolbar';
import useSelection from '../hooks/useSelection';
import { getIsLinkNodeAtSelection } from '../utils/EditorUtils';
import LinkEditor from './LinkEditor';
import serialize from '../utils/serialize';
import deserialize from '../utils/deserialize';

/** Editor reference: https://www.smashingmagazine.com/2021/05/building-wysiwyg-editor-javascript-slatejs/ */

const EditorEl = styled('div')`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const EditableSlate = styled(Editable)`
  height: 100%;
  overflow: auto;
  & h1 {
    font-size: 2em;
  }
  & ul {
    list-style-type: disc;
    padding-inline-start: 40px;
  }
`;

const Editor = ({ document, onChange }) => {
  const value = useMemo(() => deserialize(document), [document]);

  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);

  const editorRef = useRef(null);

  const [selection, setSelection] = useSelection(editor);

  const handleChange = useCallback(
    (document) => {
      setSelection(editor.selection);
      if (!onChange) return;
      const isAstChange = editor.operations.some(
        (op) => op.type !== 'set_selection'
      );
      if (!isAstChange) return;
      onChange(serialize(document));
    },
    [onChange, setSelection, editor]
  );

  const onBlur = () => {
    // saved cursor position or selection, useful for image or formula insertion
    editor.saveSelection();
  };

  return (
    <Slate
      editor={editor}
      initialValue={value}
      onChange={handleChange}
      onBlur={onBlur}
    >
      <Stack gap={2} height="100%">
        <Toolbar selection={selection} />
        <Divider />
        <EditorEl ref={editorRef}>
          {getIsLinkNodeAtSelection(editor) ? (
            <LinkEditor
              editorOffsets={
                editorRef.current !== null
                  ? {
                      x: editorRef.current.getBoundingClientRect().x,
                      y: editorRef.current.getBoundingClientRect().y,
                    }
                  : null
              }
            />
          ) : null}
          <EditableSlate
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={onKeyDown}
          />
        </EditorEl>
      </Stack>
    </Slate>
  );
};

export default Editor;
