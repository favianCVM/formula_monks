import React, {Dispatch, SetStateAction} from 'react';

export const useBoolean = (
  initialValue?: boolean,
): [boolean, Dispatch<SetStateAction<boolean>>, () => void] => {
  const [value, setValue] = React.useState<boolean>(
    initialValue ? initialValue : false,
  );

  const toggle = () => setValue(prevValue => !prevValue);

  return [value, setValue, toggle];
};
