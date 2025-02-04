import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import Atom from './Atom.jsx';
import Planets from './Planets.jsx';
import PeriodicTable from './PTable.jsx';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<App />);
