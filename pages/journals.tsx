import {ProtectRoute} from "../contexts/auth";
import {connect} from 'react-redux'
import {State, stateWrapper} from "../store";

export const getServerSideProps = stateWrapper.getServerSideProps(({store, req, res, ...etc}) => {
  console.log('2. Page.getServerSideProps uses the store to dispatch things');
  store.dispatch({type: 'TICK', payload: 'was set in other page'});
})


function Journals(state: State) {
  return (
    <div>journals
      <p>{state.tick}</p>
    </div>
  )
}


export default connect(state => state)(ProtectRoute(Journals))