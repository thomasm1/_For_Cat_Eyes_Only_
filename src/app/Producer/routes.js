import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* Containers BEGIN */
import Producer from './index';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Production from './screens/Production/screens/All';
import ProductionDetail from './screens/Production/screens/Detail';
import Account from './screens/Account/screens/All';
import CIFDetail from './screens/Account/screens/Detail';
import Certification from './screens/Certification/screens/All';
import CertificationDetail from './screens/Certification/screens/Detail';
/* Containers END */

export const routes = (store, dispatch) => {
  return (
    <Route path='producer'>
      <Route component={Producer}>
        <IndexRoute component={Home}/>
        <Route path='home' component={Home}/>
        <Route path='production'>
          <IndexRoute component={Production}/>
          <Route path=':id' component={ProductionDetail}/>
        </Route>
        <Route path='account'>
          <IndexRoute component={Account} />
        </Route>
        <Route path='cifs'>
          <Route path=':id' component={CIFDetail}/>
        </Route>
        <Route path='certifications'>
          <IndexRoute component={Certification}/>
          <Route path=':id' component={CertificationDetail}/>
        </Route>
      </Route>
       <Route path='login' component={Login}/>
       <Route path='signup' component={SignUp}/>
    </Route>
  );
};
