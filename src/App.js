import {Switch, Route} from 'react-router-dom'

import Home from './component/Home'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App
