import React from 'react';
import {Router} from './components/routing/Index';
import {store} from './store';
import {Provider} from 'react-redux';
import {Layout} from './components/layout';

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Router />
      </Layout>
    </Provider>
  );
};
export default App;
