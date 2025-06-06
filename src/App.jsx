import React, { useState } from 'react';
import { Search, Cable, Home, Map, FileText, Plus, Filter, Download, Eye, Edit, Trash2, ChevronRight, MapPin, Activity, Box, Users } from 'lucide-react';

export default function EurotunnelCableManagement() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCable, setSelectedCable] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Données exemple
  const stats = {
    totalCables: 38000,
    totalChambres: 2600,
    cablesActifs: 35420,
    chambresOccupees: 2145
  };

  const cables = [
    { id: 'CBL-2024-001', tenant: 'TERM-A-01', aboutissant: 'TERM-B-15', type: 'HT', longueur: '1250m', status: 'Actif' },
    { id: 'CBL-2024-002', tenant: 'TERM-B-15', aboutissant: 'TERM-C-08', type: 'BT', longueur: '850m', status: 'Actif' },
    { id: 'CBL-2024-003', tenant: 'TERM-A-03', aboutissant: 'TERM-D-22', type: 'FO', longueur: '2100m', status: 'En maintenance' },
    { id: 'CBL-2024-004', tenant: 'TERM-C-08', aboutissant: 'TERM-E-11', type: 'HT', longueur: '1750m', status: 'Actif' },
  ];

  const chambres = [
    { id: 'CDT-A-01', fourreaux: 12, fourreauxLibres: 3, tauxOccupation: 75, adjacentes: ['CDT-A-02', 'CDT-B-01'] },
    { id: 'CDT-A-02', fourreaux: 8, fourreauxLibres: 1, tauxOccupation: 87.5, adjacentes: ['CDT-A-01', 'CDT-A-03'] },
    { id: 'CDT-B-01', fourreaux: 16, fourreauxLibres: 5, tauxOccupation: 68.75, adjacentes: ['CDT-A-01', 'CDT-B-02'] },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Câbles</p>
              <p className="text-2xl font-bold text-blue-800">{stats.totalCables.toLocaleString()}</p>
            </div>
            <Cable className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Chambres de Tirage</p>
              <p className="text-2xl font-bold text-green-800">{stats.totalChambres.toLocaleString()}</p>
            </div>
            <Box className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Câbles Actifs</p>
              <p className="text-2xl font-bold text-purple-800">{stats.cablesActifs.toLocaleString()}</p>
            </div>
            <Activity className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Taux d'Occupation</p>
              <p className="text-2xl font-bold text-orange-800">82.5%</p>
            </div>
            <MapPin className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Activité Récente</h3>
          <div className="space-y-3">
            {['CBL-2024-105 ajouté dans CDT-A-15', 'CDT-B-08 mise à jour', 'CBL-2024-089 supprimé', 'Nouveau fourreau dans CDT-C-12'].map((activity, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">{activity}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Chambres Critiques</h3>
          <div className="space-y-3">
            {chambres.filter(c => c.tauxOccupation > 80).map((chambre) => (
              <div key={chambre.id} className="flex items-center justify-between p-3 bg-red-50 rounded">
                <span className="font-medium text-gray-700">{chambre.id}</span>
                <span className="text-sm text-red-600">{chambre.tauxOccupation}% occupé</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCables = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Câbles</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          <span>Nouveau Câble</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un câble..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Exporter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Câble</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Équipement Tenant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Équipement Aboutissant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longueur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cables.map((cable) => (
                <tr key={cable.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cable.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cable.tenant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cable.aboutissant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      cable.type === 'HT' ? 'bg-red-100 text-red-800' :
                      cable.type === 'BT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {cable.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cable.longueur}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      cable.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {cable.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedCable(cable)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Détails du câble {selectedCable.id}</h3>
                <button 
                  onClick={() => setSelectedCable(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Équipement Tenant</p>
                    <p className="font-medium">{selectedCable.tenant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Équipement Aboutissant</p>
                    <p className="font-medium">{selectedCable.aboutissant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type de câble</p>
                    <p className="font-medium">{selectedCable.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Longueur totale</p>
                    <p className="font-medium">{selectedCable.longueur}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Cheminement</p>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{selectedCable.tenant}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                      <span>CDT-A-01</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                      <span>CDT-A-02</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                      <span>CDT-B-01</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{selectedCable.aboutissant}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button className="px-4 py-2 border rounded hover:bg-gray-50">
                    Voir sur la carte
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Exporter fiche
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderChambres = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Chambres de Tirage</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          <span>Nouvelle Chambre</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chambres.map((chambre) => (
          <div key={chambre.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{chambre.id}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                chambre.tauxOccupation > 80 ? 'bg-red-100 text-red-800' : 
                chambre.tauxOccupation > 60 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {chambre.tauxOccupation}% occupé
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fourreaux totaux</span>
                <span className="font-medium">{chambre.fourreaux}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fourreaux libres</span>
                <span className="font-medium">{chambre.fourreauxLibres}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Chambres adjacentes</p>
                <div className="flex flex-wrap gap-1">
                  {chambre.adjacentes.map((adj) => (
                    <span key={adj} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {adj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4 pt-4 border-t">
              <button className="flex-1 text-sm text-blue-600 hover:text-blue-800">
                Voir détails
              </button>
              <button className="flex-1 text-sm text-green-600 hover:text-green-800">
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Cartographie</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Module cartographique</p>
            <p className="text-sm text-gray-400 mt-2">Visualisation interactive des chambres de tirage et cheminements</p>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Chambre disponible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm">Chambre partiellement occupée</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm">Chambre saturée</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">EUROTUNNEL - Gestion CDT</h1>
              <span className="text-sm text-gray-500">Infrastructure</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Service Méthodes</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                JC
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-[calc(100vh-4rem)] shadow-sm">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Tableau de bord</span>
            </button>
            
            <button
              onClick={() => setActiveTab('cables')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'cables' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Cable className="h-5 w-5" />
              <span>Câbles</span>
            </button>
            
            <button
              onClick={() => setActiveTab('chambres')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'chambres' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Box className="h-5 w-5" />
              <span>Chambres de tirage</span>
            </button>
            
            <button
              onClick={() => setActiveTab('map')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'map' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Map className="h-5 w-5" />
              <span>Cartographie</span>
            </button>
            
            <button
              onClick={() => setActiveTab('documentation')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'documentation' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Documentation</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'cables' && renderCables()}
          {activeTab === 'chambres' && renderChambres()}
          {activeTab === 'map' && renderMap()}
          {activeTab === 'documentation' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Documentation</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Module d'export et de gestion documentaire</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}