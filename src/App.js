import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import RestaurantItemDetails from './components/RestaurantItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/restaurants-list/:id"
          component={RestaurantItemDetails}
        />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route pat="/bad-path" component={NotFound} />
        <Redirect to="/bad-path" component={NotFound} />
      </Switch>
    )
  }
}

export default App
