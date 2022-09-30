import Home from './components/Pages/Home';
import Tracks from './components/Pages/Tracks'
import Exercise from './components/Pages/Exercise'
import TourOfConcept from './components/Pages/TourOfConcept'
import MyJourney from './components/Pages/MyJourney'
import Dryrun from './components/Pages/Dryrun'
import Debugging from './components/Pages/Debugging'
import ProblemSolving from './components/Pages/ProblemSolving'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Tabs from './components/Tabs/Tabs';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Editor from './components/Pages/Editor';
import CompGraph from './components/Graph/CompGraph';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Tabs />
      <Breadcrumbs />
      <Routes>

        {/* <Route path='/' element={<Home />} /> */}

        <Route path='/' element={<Tracks />} />


        <Route path="/exercise" element={<Exercise />} />

        <Route path="/tour" element={<TourOfConcept />} />

        <Route path="/journey" element={<MyJourney />} />

        <Route path="/reader" element={<Dryrun />} />

        <Route path="/debug" element={<Debugging />} />

        <Route path="/solver" element={<ProblemSolving />} />

        <Route path="/editor" element={<Editor />} />

        <Route path="/graph" element={<CompGraph />} />
      </Routes>
      {/* <Home /> */}
    </div>
  );
}

export default App;
