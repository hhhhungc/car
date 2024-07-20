import './style/global.sass'
import Header from './components/Header'
import Car from './components/Car'
import Detail from './components/Detail'
import BarChart from './components/BarChart'
import Home from './components/Home'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
      <Switch>
        <Route path="/bar-chart">
          <BarChart />
        </Route>
        <Route path="/detail/:userId">
          <Detail />
        </Route>
        <Route path="/car">
          <Car />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
