
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import DodajFilm from './DodajFilm';
import PregledFilmova from './PregledFilmova';

function App() {
  return (
    <Router>
    <div className="App">
      <div className="sadrzaj">
        <Switch>
        <Route exact path="/">
          <PregledFilmova />
        </Route>
        <Route path="/dodaj">
            <DodajFilm />
        </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
