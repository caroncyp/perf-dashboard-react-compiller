import React, { useState, useRef, useEffect } from 'react';

// Hook personnalisé pour compter les re-renders
function useRenderCounter(componentName) {
  const renderCount = useRef(0);
  const [, forceUpdate] = useState({});
  
  renderCount.current += 1;
  
  useEffect(() => {
    console.log(`${componentName} rendered ${renderCount.current} times`);
  });
  
  return renderCount.current;
}

// Composant Header - ne devrait pas se re-rendre quand le compteur change
function Header() {
  const renderCount = useRenderCounter('Header');
  
  return (
    <header className="bg-blue-600 text-white p-4 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Demo</h1>
        <div className="bg-blue-700 px-3 py-1 rounded-full text-sm">
          Re-renders: {renderCount}
        </div>
      </div>
    </header>
  );
}

// Composant UserProfile - ne devrait pas se re-rendre quand le compteur change
function UserProfile() {
  const renderCount = useRenderCounter('UserProfile');
  
  const user = {
    name: "Marie Dupont",
    role: "Développeuse Frontend",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">Profil Utilisateur</h2>
        <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
          Re-renders: {renderCount}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <img 
          src={user.avatar} 
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-gray-600">{user.role}</p>
        </div>
      </div>
    </div>
  );
}

// Composant Navigation - ne devrait pas se re-rendre quand le compteur change
function Navigation() {
  const renderCount = useRenderCounter('Navigation');
  
  const menuItems = [
    { name: 'Accueil', icon: '🏠' },
    { name: 'Projets', icon: '📁' },
    { name: 'Équipe', icon: '👥' },
    { name: 'Paramètres', icon: '⚙️' }
  ];
  
  return (
    <nav className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Navigation</h2>
        <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
          Re-renders: {renderCount}
        </div>
      </div>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
            <span className="text-xl">{item.icon}</span>
            <span className="text-gray-700">{item.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Composant Statistics - ne devrait pas se re-rendre quand le compteur change
function Statistics() {
  const renderCount = useRenderCounter('Statistics');
  
  const stats = [
    { label: 'Projets actifs', value: '12', color: 'bg-green-100 text-green-600' },
    { label: 'Tâches terminées', value: '84', color: 'bg-blue-100 text-blue-600' },
    { label: 'Équipe', value: '6', color: 'bg-purple-100 text-purple-600' }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Statistiques</h2>
        <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
          Re-renders: {renderCount}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`${stat.color} rounded-lg p-4 mb-2`}>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Composant Counter - celui-ci DOIT se re-rendre
function Counter({ count, onIncrement, onDecrement }) {
  const renderCount = useRenderCounter('Counter');
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Compteur Interactif</h2>
        <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
          Re-renders: {renderCount}
        </div>
      </div>
      <div className="text-center">
        <div className="text-6xl font-bold text-blue-600 mb-6">{count}</div>
        <div className="space-x-4">
          <button 
            onClick={onDecrement}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            - Décrémenter
          </button>
          <button 
            onClick={onIncrement}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            + Incrémenter
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant Footer - ne devrait pas se re-rendre quand le compteur change
function Footer() {
  const renderCount = useRenderCounter('Footer');
  
  return (
    <footer className="bg-gray-800 text-gray-300 p-4 mt-6">
      <div className="flex justify-between items-center">
        <p>&copy; 2025 Dashboard Demo - React Compiler</p>
        <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">
          Re-renders: {renderCount}
        </div>
      </div>
    </footer>
  );
}

// Composant principal App
export default function App() {
  const [count, setCount] = useState(0);
  const renderCount = useRenderCounter('App (Parent)');
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-yellow-800">
              Démonstration React Compiler
            </h3>
            <p className="text-yellow-700">
              Observez les compteurs de re-render. Sans le compiler, tous les composants enfants se re-rendent inutilement.
            </p>
          </div>
          <div className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            App re-renders: {renderCount}
          </div>
        </div>
      </div>
      
      <Header />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <UserProfile />
            <Navigation />
          </div>
          <div>
            <Counter 
              count={count} 
              onIncrement={increment} 
              onDecrement={decrement} 
            />
            <Statistics />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}