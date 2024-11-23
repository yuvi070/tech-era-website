import {Switch, Route} from 'react-router-dom'

import Home from './component/Home'
import CardItem from './component/CardItem'
import NotFound from './component/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CardItem} />
    <Route component={NotFound} />
  </Switch>
)

export default App
