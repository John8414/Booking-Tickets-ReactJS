import { Spin } from 'antd';
import NyanCatLoader from 'components/loader/nyan-cat-loader';
import { createContext, useEffect, useState } from 'react';
import { WrapperSpin } from './styled';

const DEFAULT_VALUE = {
  isLoading: false,
};

const LoadingContext = createContext(DEFAULT_VALUE);

const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_VALUE);

  const style = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: '1',
    background: '#ffffffcc',
  };

  useEffect(() => {
    if (state.isLoading) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [state.isLoading]);

  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        // <WrapperSpin viewHeight="100vh">
        //   <Spin />
        // </WrapperSpin>
        <NyanCatLoader />
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, LoadingContext };
