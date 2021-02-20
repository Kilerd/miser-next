import {ProtectRoute, useAuth} from "../contexts/auth";
import {connect} from 'react-redux'
import {State, stateWrapper} from "../store";
import React from "react";

export const getServerSideProps = stateWrapper.getServerSideProps(({store, req, res, ...etc}) => {
  store.dispatch({type: 'TICK', payload: 'was set in other page'});
})


function Dashboard(state: State) {

  const {user} = useAuth();
  return (
    <div>hello {user.username}</div>
  )
}


export default connect(state => state)(ProtectRoute(Dashboard))
