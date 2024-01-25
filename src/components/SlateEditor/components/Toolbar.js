import React, { useCallback } from 'react';
import { MenuItem, Select, Stack, Tooltip } from '@mui/material';
import { useSlateStatic } from 'slate-react';
import {
  CHARACTER_STYLES,
  LIST_TYPES,
  PARAGRAPH_STYLES,
  TEXT_ALIGN_TYPES,
  getActiveListStyles,
  getActiveStyles,
  getActiveTextAlignStyle,
  getIsLinkNodeAtSelection,
  getTextBlockStyle,
  toggleBlockType,
  toggleLinkAtSelection,
  toggleListType,
  toggleStyle,
  toggleTextAlignType,
} from '../utils/EditorUtils';
import ToolbarButton from './ToolbarButton';
import { AddLink } from '@mui/icons-material';

const Toolbar = () => {
  const editor = useSlateStatic();

  const handleBlockTypeChange = useCallback(
    (event) => {
      const targetType = event.target.value;
      if (targetType === 'multiple') return;
      toggleBlockType(editor, targetType);
    },
    [editor]
  );

  const textBlockType = getTextBlockStyle(editor);
  const isLinkInSelection = getIsLinkNodeAtSelection(editor);
  const listBlockType = getActiveListStyles(editor);
  const textAlignBlockType = (alignment) =>
    getActiveTextAlignStyle(editor, alignment);

  return (
    <Stack direction="row" gap={4} wrap>
      <Select
        value={
          textBlockType === 'multiple'
            ? 'paragraph'
            : textBlockType || 'paragraph'
        }
        onChange={handleBlockTypeChange}
        disabled={listBlockType.length > 0}
        renderValue={(value) => {
          const selectedItem = PARAGRAPH_STYLES.find(
            (item) => item.key === value
          );
          if (!selectedItem) return 'Paragraph';
          return selectedItem.label;
        }}
        sx={{ '> div': { padding: '0 12px' } }}
      >
        {PARAGRAPH_STYLES.flatMap((blockType) => {
          switch (blockType.key) {
            case 'multiple':
              return null;
            case 'h1':
              return (
                <MenuItem key={blockType.key} value={blockType.key}>
                  <h1 style={{ margin: 0 }}>{blockType.label}</h1>
                </MenuItem>
              );
            case 'h2':
              return (
                <MenuItem key={blockType.key} value={blockType.key}>
                  <h2 style={{ margin: 0 }}>{blockType.label}</h2>
                </MenuItem>
              );
            case 'h3':
              return (
                <MenuItem key={blockType.key} value={blockType.key}>
                  <h3 style={{ margin: 0 }}>{blockType.label}</h3>
                </MenuItem>
              );
            case 'h4':
              return (
                <MenuItem key={blockType.key} value={blockType.key}>
                  <h4 style={{ margin: 0 }}>{blockType.label}</h4>
                </MenuItem>
              );
            case 'h5':
              return (
                <MenuItem key={blockType.key} value={blockType.key}>
                  <h5 style={{ margin: 0 }}>{blockType.label}</h5>
                </MenuItem>
              );
            case 'h6':
              return (
                <MenuItem key={blockType.key} value={blockType.key}>
                  <h6 style={{ margin: 0 }}>{blockType.label}</h6>
                </MenuItem>
              );
            default:
              return (
                <MenuItem key={blockType.key} value={blockType.key}>
                  <p style={{ margin: 0 }}>{blockType.label}</p>
                </MenuItem>
              );
          }
        })}
      </Select>
      <Stack direction="row" gap={1}>
        {CHARACTER_STYLES.map((characterStyle) => (
          <Tooltip key={characterStyle.key} title={characterStyle.label}>
            <span>
              <ToolbarButton
                selected={getActiveStyles(editor).has(characterStyle.key)}
                value={characterStyle.key}
                onChange={() => {
                  toggleStyle(editor, characterStyle.key);
                }}
                // preventing mouse down does not loose editor focus on click of toolbar item
                onMouseDown={(event) => event.preventDefault()}
              >
                {characterStyle.icon}
              </ToolbarButton>
            </span>
          </Tooltip>
        ))}
      </Stack>
      <Tooltip title="Link">
        <span>
          <ToolbarButton
            disabled={isLinkInSelection}
            selected={isLinkInSelection}
            value="link"
            onChange={() => {
              toggleLinkAtSelection(editor);
            }}
            // preventing mouse down does not loose editor focus on click of toolbar item
            onMouseDown={(event) => event.preventDefault()}
          >
            {<AddLink />}
          </ToolbarButton>
        </span>
      </Tooltip>
      <Stack direction="row" gap={1}>
        {LIST_TYPES.map((listType) => (
          <Tooltip key={listType.key} title={listType.label}>
            <span>
              <ToolbarButton
                key={listType.key}
                disabled={
                  !(textBlockType == null || textBlockType === 'paragraph')
                }
                selected={listBlockType.includes(listType.key)}
                value={listType.key}
                onChange={() => {
                  toggleListType(editor, listType.key);
                }}
                // preventing mouse down does not loose editor focus on click of toolbar item
                onMouseDown={(event) => event.preventDefault()}
              >
                {listType.icon}
              </ToolbarButton>
            </span>
          </Tooltip>
        ))}
      </Stack>
      <Stack direction="row" gap={1}>
        {TEXT_ALIGN_TYPES.map((textAlignType) => (
          <Tooltip key={textAlignType.key} title={textAlignType.label}>
            <span>
              <ToolbarButton
                key={textAlignType.key}
                selected={textAlignBlockType(textAlignType.key)}
                value={textAlignType.key}
                onChange={() => {
                  toggleTextAlignType(editor, textAlignType.key);
                }}
                // preventing mouse down does not loose editor focus on click of toolbar item
                onMouseDown={(event) => event.preventDefault()}
              >
                {textAlignType.icon}
              </ToolbarButton>
            </span>
          </Tooltip>
        ))}
      </Stack>
    </Stack>
  );
};

export default Toolbar;
