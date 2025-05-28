import React, { useState, useEffect, useRef } from 'react';

// Hook personnalisé pour compter les renders
function useRenderCounter(componentName) {
  const renderCount = useRef(0);
  const [highlight, setHighlight] = useState(false);

  renderCount.current += 1;

  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 200);
    return () => clearTimeout(timer);
  });

  return { count: renderCount.current, highlight };
}

// Composant UserCard - devrait pas se re-rendre si l'utilisateur ne change pas
function UserCard({ user, onUpdateStats }) {
  const { count, highlight } = useRenderCounter('UserCard');

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md border-2 transition-all duration-200 ${
        highlight ? 'border-red-500 bg-red-50' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{user.name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${
            highlight ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          Renders: {count}
        </span>
      </div>
      <p className="text-gray-600 mb-2">{user.email}</p>
      <p className="text-sm text-gray-500 mb-3">Rôle: {user.role}</p>
      <button
        onClick={() => onUpdateStats(user.id)}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
      >
        Mettre à jour stats
      </button>
    </div>
  );
}

// Composant Statistics - devrait pas se re-rendre si les stats ne changent pas
function Statistics({ stats, theme }) {
  const { count, highlight } = useRenderCounter('Statistics');

  return (
    <div
      className={`p-4 rounded-lg shadow-md border-2 transition-all duration-200 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
      } ${highlight ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Statistiques</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${
            highlight ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          Renders: {count}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">{stats.users}</div>
          <div className="text-sm text-gray-500">Utilisateurs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">
            {stats.active}
          </div>
          <div className="text-sm text-gray-500">Actifs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-500">
            {stats.revenue}
          </div>
          <div className="text-sm text-gray-500">Revenus</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-500">
            {stats.growth}%
          </div>
          <div className="text-sm text-gray-500">Croissance</div>
        </div>
      </div>
    </div>
  );
}

// Composant Timer - se met à jour toutes les secondes
function Timer({ onTick }) {
  const { count, highlight } = useRenderCounter('Timer');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date();
      setTime(newTime);
      onTick(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [onTick]);

  return (
    <div
      className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-md border-2 transition-all duration-200 ${
        highlight ? 'border-red-500' : 'border-transparent'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Horloge en temps réel</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${
            highlight ? 'bg-red-500 text-white' : 'bg-white bg-opacity-20'
          }`}
        >
          Renders: {count}
        </span>
      </div>
      <div className="text-2xl font-mono">{time.toLocaleTimeString()}</div>
    </div>
  );
}

// Composant principal
export default function App() {
  const { count, highlight } = useRenderCounter('App');
  const [users] = useState([
    { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Durand', email: 'bob@example.com', role: 'User' },
    {
      id: 3,
      name: 'Claire Moreau',
      email: 'claire@example.com',
      role: 'Manager',
    },
  ]);

  const [stats, setStats] = useState({
    users: 150,
    active: 89,
    revenue: '€12.5K',
    growth: 23,
  });

  const [theme, setTheme] = useState('light');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(0);

  // Ces fonctions vont causer des re-renders à chaque fois sans React Compiler
  const handleUpdateStats = (userId) => {
    setStats((prevStats) => ({
      ...prevStats,
      active: prevStats.active + 1,
    }));
  };

  const handleTimeTick = (newTime) => {
    setCurrentTime(newTime);
    // Simule des notifications qui arrivent
    if (newTime.getSeconds() % 10 === 0) {
      setNotifications((prev) => prev + 1);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`mb-6 p-4 rounded-lg shadow-md border-2 transition-all duration-200 ${
            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
          } ${highlight ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard de Performance</h1>
              <p className="text-gray-500 mt-1">
                Démonstration des re-renders inutiles sans React Compiler
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Notifications</div>
                <div className="text-2xl font-bold text-red-500">
                  {notifications}
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {theme === 'light' ? '🌙' : '☀️'} Thème
              </button>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  highlight
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                App Renders: {count}
              </span>
            </div>
          </div>
        </div>

        {/* Problème visuel */}
        <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
          <h2 className="font-semibold text-yellow-800 mb-2">
            🚨 Problème de Performance
          </h2>
          <p className="text-yellow-700 text-sm">
            Regardez les compteurs "Renders" ! Chaque composant se re-rend même
            quand ses données n'ont pas changé.
            <br />
            <strong>Timer</strong> force tout à se re-rendre →{' '}
            <strong>UserCard</strong> et <strong>Statistics</strong> se
            re-rendent inutilement.
          </p>
        </div>

        {/* Timer */}
        <div className="mb-6">
          <Timer onTick={handleTimeTick} />
        </div>

        {/* Statistics */}
        <div className="mb-6">
          <Statistics stats={stats} theme={theme} />
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onUpdateStats={handleUpdateStats}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-100 border-l-4 border-blue-500 rounded">
          <h2 className="font-semibold text-blue-800 mb-2">
            📋 Instructions pour la démo
          </h2>
          <div className="text-blue-700 text-sm space-y-1">
            <p>
              1. Observez les compteurs "Renders" en rouge qui clignotent
              constamment
            </p>
            <p>
              2. Notez que UserCard et Statistics se re-rendent même si leurs
              données n'ont pas changé
            </p>
            <p>
              3. Installez maintenant le React Compiler et observez la
              différence !
            </p>
            <p>
              4. Après installation, seuls les composants avec des données
              modifiées se re-rendront
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
