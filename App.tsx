import React from 'react';
import {Router} from './components/routing/Index';
import {store} from './store';
import {Provider} from 'react-redux';
import {Layout} from './components/layout';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './store/index';

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Router />
        </Layout>
      </PersistGate>
    </Provider>
  );
};
export default App;
