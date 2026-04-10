import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Advisor } from './pages/Advisor';
import { Compare } from './pages/Compare';
import { Claims } from './pages/Claims';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import './styles/globals.css';

import { AppProvider } from './store';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navbar />


        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/advisor" element={<Advisor />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>


        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="bg-teal-600 p-2 rounded-xl text-white">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">SafeGuard AI</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">Â© 2024 SafeGuard Advisor. All rights reserved.</p>
            <div className="flex justify-center gap-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
    </AppProvider>
  );
}


import { Shield } from 'lucide-react';

export default App;

