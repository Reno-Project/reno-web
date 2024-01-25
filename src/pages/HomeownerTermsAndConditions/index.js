import { useEffect, useState } from 'react';
import { getApiData } from '../../utils/APIHelper';
import { Setting } from '../../utils/Setting';
import { toast } from 'react-toastify';
import { CircularProgress, Stack } from '@mui/material';
import Viewer from '../../components/SlateEditor/components/Viewer';

const HomeownerTermsAndConditions = () => {
  const [isFetchingTermsAndConditions, setIsFetchingTermsAndConditions] =
    useState(true);
  const [termsAndConditions, setTermsAndConditions] = useState('');

  useEffect(() => {
    setIsFetchingTermsAndConditions(true);

    getApiData(Setting.endpoints.getHomeownerTermsAndConditions, 'GET')
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

  return (
    <>
      {isFetchingTermsAndConditions ? (
        <Stack height="100%" justifyContent="center" alignItems="center">
          <CircularProgress v size={26} />
        </Stack>
      ) : (
        <Viewer document={termsAndConditions} />
      )}
    </>
  );
};

export default HomeownerTermsAndConditions;
