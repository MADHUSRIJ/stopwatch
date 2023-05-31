import './App.css';
import { IndicatorComponent } from './components/WatchComponent/IndicatorComponent';
import MobileComponent from './components/WatchComponent/MobileComponent';

function App() {
  return (
    <div className="App">
      <div className="Main">
          <MobileComponent ChildComponent={IndicatorComponent}/>
      </div>
    </div>
  );
}

export default App;
