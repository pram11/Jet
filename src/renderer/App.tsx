import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import List from '@pages/List';
import icon from '../../assets/icon.svg';
import './App.css';
import StartUp from './pages/startup';

export default function App() {
  return (
    <Router initialEntries={['/startup']}>
      <Routes>
        <Route path="list" element={<List />} />
        <Route path="startup" element={<StartUp />} />
      </Routes>
    </Router>
  );
}
