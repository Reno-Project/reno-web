import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { CheckCircle, Close } from '@mui/icons-material';
import Viewer from '../../../components/SlateEditor/components/Viewer';
import { useDebouncedCallback } from '../../../components/hooks/useDebouncedCallback';
import { toast } from 'react-toastify';
import { Setting } from '../../../utils/Setting';
import { getApiData } from '../../../utils/APIHelper';

const TermsAndConditionsDialog = ({
  open,
  onClose,
  areTermsAccepted,
  onAcceptTerms,
}) => {
  const [isFetchingTermsAndConditions, setIsFetchingTermsAndConditions] =
    useState(true);
  const [termsAndConditions, setTermsAndConditions] = useState('');

  useEffect(() => {
    setIsFetchingTermsAndConditions(true);

    getApiData(Setting.endpoints.getContractorTermsAndConditions, 'GET')
      .then((response) => {
        if (response.success) {
          setTermsAndConditions(response.content);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsFetchingTermsAndConditions(false);
      });
  }, []);

  const scrollRef = useRef(null);
  const [canAccept, setCanAccept] = useState(false);

  const handleScroll = useCallback(() => {
    if (areTermsAccepted) return;
    if (!scrollRef.current) return;

    const { scrollHeight, scrollTop, clientHeight } = scrollRef.current;
    const isScrollbarAtBottom = clientHeight + 10 >= scrollHeight - scrollTop;
    console.log(clientHeight, scrollHeight, scrollTop);
    setCanAccept(isScrollbarAtBottom);
  }, [areTermsAccepted]);

  const handleScrollDebounced = useDebouncedCallback(handleScroll, 100);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      handleScroll();
    }, 0);
  }, [open, handleScroll]);

  const handleAcceptTerms = () => {
    onAcceptTerms();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      closeAfterTransition
      disableAutoFocus
      slotProps={{ backdrop: Backdrop }}
      style={{ overflowY: 'scroll', width: '100%' }}
      PaperProps={{ sx: { width: '100%', height: '100%' } }}
      maxWidth="md"
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span variant="h2">Terms & conditions</span>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {isFetchingTermsAndConditions ? (
          <Stack height="100%" justifyContent="center" alignItems="center">
            <CircularProgress style={{ color: '#fff' }} size={26} />
          </Stack>
        ) : (
          <Viewer
            document={termsAndConditions}
            scrollRef={scrollRef}
            onScroll={handleScrollDebounced}
          />
        )}
      </DialogContent>
      <DialogActions>
        {areTermsAccepted ? (
          <Stack direction="row" gap={1} alignItems="center">
            <CheckCircle fontSize="small" color="success" />
            <Typography color="success">Accepted</Typography>
          </Stack>
        ) : (
          <Button
            variant="contained"
            disabled={!canAccept}
            onClick={handleAcceptTerms}
          >
            Accept
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TermsAndConditionsDialog;
