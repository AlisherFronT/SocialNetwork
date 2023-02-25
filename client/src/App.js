import {Suspense} from "react";
import '../src/styles/style.scss'
import './utils/i18n'
import {useSelector} from "react-redux";
import PrivateRouting from "./routing/PrivateRouting";
import AuthRouting from "./routing/AuthRouting";

function App() {

  const {user} = useSelector((store) => store.persistedReducer.user)

  return (
    <Suspense fallback={'...Loading'}>
            {
                !user.login.length ?
                    <AuthRouting/>
                    :
                   <PrivateRouting/>
            }
    </Suspense>
  );
}

export default App;

