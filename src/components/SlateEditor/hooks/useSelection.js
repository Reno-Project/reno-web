import { useCallback, useState } from 'react';
import areEqual from 'deep-equal';

const useSelection = (editor) => {
  const [selection, setSelection] = useState(editor.selection);

  const setSelectionOptimized = useCallback(
    (newSelection) => {
      // don't update the component state if selection hasn't changed
      if (areEqual(selection, newSelection)) return;
      setSelection(newSelection);
    },
    [selection],
  );

  return [selection, setSelectionOptimized];
};

export default useSelection;
