import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { styled } from '@mui/material';
import useEditorConfig from '../hooks/useEditorConfig';
import deserialize from '../utils/deserialize';

const EditableWrapper = styled('div')`
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

const Viewer = ({ document, scrollRef, onScroll }) => {
  const value = useMemo(() => deserialize(document), [document]);

  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);

  return (
    <Slate editor={editor} initialValue={value}>
      <EditableWrapper ref={scrollRef} onScroll={onScroll}>
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </EditableWrapper>
    </Slate>
  );
};

export default Viewer;
