import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Popper,
  Stack,
  TextField,
  Tooltip,
  styled,
} from '@mui/material';
import { Transforms } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';
import { OpenInNewOutlined, LinkOffOutlined } from '@mui/icons-material';
import {
  getLinkNodeAtSelection,
  toggleLinkAtSelection,
} from '../utils/EditorUtils';

const PopupAnchor = styled('div')`
  position: absolute;
  z-index: 1;
`;

const LinkPopupInput = styled(TextField)`
  min-width: 140px;
`;

const PopperRoot = styled((props) => (
  <Stack direction="row" gap={2} {...props} />
))`
  background-color: white;
  padding: 8px 12px;
  box-shadow: 0px 3px 6px #00000052;
`;

const LinkEditor = ({ editorOffsets }) => {
  const editor = useSlateStatic();
  const linkEditorRef = useRef(null);
  const [linkEditorEl, setLinkEditorEl] = useState(null);

  const [linkNode, linkPath] = getLinkNodeAtSelection(editor);

  useEffect(() => {
    if (!linkNode) return;

    const linkEditorEl = linkEditorRef.current;
    if (linkEditorEl == null) return;

    const linkDOMNode = ReactEditor.toDOMNode(editor, linkNode);
    const {
      x: nodeX,
      y: nodeY,
      width: nodeWidth,
      height: nodeHeight,
    } = linkDOMNode.getBoundingClientRect();

    linkEditorEl.style.display = 'block';
    linkEditorEl.style.top = `${nodeY - editorOffsets.y}px`;
    linkEditorEl.style.left = `${nodeX - editorOffsets.x}px`;
    linkEditorEl.style.width = `${nodeWidth}px`;
    linkEditorEl.style.height = `${nodeHeight}px`;
  }, [editor, editorOffsets.x, editorOffsets.y, linkNode]);

  useEffect(() => {
    setLinkEditorEl(linkEditorRef.current);
  }, []);

  const [linkUrl, setLinkUrl] = useState(linkNode.url);

  useEffect(() => {
    setLinkUrl(linkNode.url);
  }, [linkNode.url]);

  const onLinkUrlChange = useCallback(
    (event) => setLinkUrl(event.target.value),
    []
  );

  const onApply = useCallback(() => {
    Transforms.setNodes(editor, { url: linkUrl }, { at: linkPath });
  }, [editor, linkUrl, linkPath]);

  if (editorOffsets == null) return null;

  console.log(linkEditorEl);

  return (
    <>
      <PopupAnchor ref={linkEditorRef} />
      {linkEditorEl && (
        <Popper open anchorEl={linkEditorEl} sx={{ zIndex: 1301 }}>
          <PopperRoot>
            <Stack direction="row">
              <LinkPopupInput
                type="text"
                variant="outlined"
                value={linkUrl}
                onChange={onLinkUrlChange}
                sx={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  marginRight: '-2px',
                }}
              />
              <Button
                variant="contained"
                onClick={onApply}
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                Apply
              </Button>
            </Stack>
            <Tooltip title="Open link">
              <Button
                variant="text"
                size="small"
                href={linkUrl}
                target="_blank"
                sx={{ minWidth: 'unset', boxShadow: 'none' }}
              >
                <OpenInNewOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Unlink">
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  toggleLinkAtSelection(editor);
                }}
                sx={{ minWidth: 'unset' }}
              >
                <LinkOffOutlined />
              </Button>
            </Tooltip>
          </PopperRoot>
        </Popper>
      )}
    </>
  );
};

export default LinkEditor;
