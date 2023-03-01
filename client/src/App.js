import {Suspense} from "react";
import '../src/styles/style.scss'
import './utils/i18n'
import {useSelector} from "react-redux";
import PrivateRouting from "./routing/PrivateRouting";
import AuthRouting from "./routing/AuthRouting";
import {userSelector} from "./redux/reselect";

function App() {

  const {user} = useSelector(userSelector)

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

