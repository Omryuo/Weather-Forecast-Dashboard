import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wind, Droplets, Gauge } from 'lucide-react'; // Icons for weather metrics

// The main App component with an enhanced and modern user interface.
const App = () => {
  const [city, setCity] = useState('Bengaluru');
  const [inputCity, setInputCity] = useState('Bengaluru');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const fetchWeatherAndForecast = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL + '/api/weather/' + city; 

    try {
      const response = await fetch(backendUrl);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch data from backend.');
      }
      const data = await response.json();

      setWeather(data.weather);
      setForecast(data.forecast);

    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherAndForecast();
  }, [city]);

  const handleSearch = () => {
    if (inputCity.trim() !== '') {
      setCity(inputCity);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Function to get a weather icon based on the description
  const getWeatherIcon = (description) => {
    if (!description) return '🌡️';
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('drizzle')) return '🌦️';
    if (desc.includes('thunderstorm')) return '⛈️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return '🌫️';
    return '🌡️';
  };

  const themeClasses = isDarkMode 
    ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-gray-100' 
    : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900';

  const cardClasses = isDarkMode
    ? 'bg-gray-800/80 backdrop-blur-lg border border-gray-700/50'
    : 'bg-white/80 backdrop-blur-lg border border-gray-200/50';

  return (
    <div className={`${themeClasses} min-h-screen font-sans transition-all duration-700 p-4 sm:p-8 flex flex-col items-center`}>
      <div className={`w-full max-w-4xl p-6 md:p-8 rounded-2xl shadow-2xl transition-all duration-700 ${cardClasses}`}>

        {/* Header and Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex-grow text-center">
            Weather Dashboard
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
          >
            <span className="text-xl">{isDarkMode ? '☀️' : '🌙'}</span>
          </button>
        </div>

        {/* Location Search Input */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <input
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a city..."
              className={`p-4 w-64 md:w-80 rounded-l-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700/60 text-gray-100 placeholder-gray-400' 
                  : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-r-xl transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <div className="text-xl font-medium">Loading weather data...</div>
            </div>
          </div>
        )}
        
        {error && (
          <div className={`p-6 rounded-xl shadow-lg text-center mb-8 ${
            isDarkMode ? 'bg-red-900/60 text-red-200' : 'bg-red-100 text-red-700'
          }`}>
            <p>{error}</p>
          </div>
        )}

        {/* Current Weather Section */}
        {weather && !loading && (
          <div className={`text-center mb-8 p-8 rounded-xl shadow-xl transition-all duration-700 transform hover:scale-[1.02] ${
            isDarkMode ? 'bg-gray-700/60' : 'bg-white/80'
          }`}>
            <h2 className="text-3xl font-semibold mb-2">{weather.location}</h2>
            <p className="text-xl font-medium capitalize mb-6 text-blue-600 dark:text-blue-400">{weather.description}</p>
            
            <div className="flex items-center justify-center mb-8">
              <span className="text-8xl mr-6 animate-bounce">{getWeatherIcon(weather.description)}</span>
              <span className="text-8xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {weather.temperature}°C
              </span>
            </div>
            
            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-600/40' : 'bg-gray-100/60'
              }`}>
                <Droplets size={32} className="text-blue-500 mb-2" />
                <p className="text-sm opacity-75">Humidity</p>
                <span className="font-bold text-2xl">{weather.humidity}%</span>
              </div>
              <div className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-600/40' : 'bg-gray-100/60'
              }`}>
                <Wind size={32} className="text-blue-500 mb-2" />
                <p className="text-sm opacity-75">Wind Speed</p>
                <span className="font-bold text-2xl">{weather.wind_speed} km/h</span>
              </div>
              <div className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-600/40' : 'bg-gray-100/60'
              }`}>
                <Gauge size={32} className="text-blue-500 mb-2" />
                <p className="text-sm opacity-75">Pressure</p>
                <span className="font-bold text-2xl">{weather.pressure} hPa</span>
              </div>
            </div>
          </div>
        )}

        {/* Forecast Chart Section */}
        {forecast && !loading && (
          <div className={`p-8 rounded-xl shadow-xl transition-all duration-700 ${
            isDarkMode ? 'bg-gray-700/60' : 'bg-white/80'
          }`}>
            <h2 className="text-3xl font-semibold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              7-Day Temperature Forecast
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={forecast}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDarkMode ? "#374151" : "#e5e7eb"} 
                  opacity={0.5}
                />
                <XAxis 
                  dataKey="day" 
                  stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                  fontSize={12}
                  fontWeight="bold"
                />
                <YAxis 
                  stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                  domain={['auto', 'auto']}
                  fontSize={12}
                  fontWeight="bold"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDarkMode ? '#4b5563' : '#cbd5e1',
                    borderRadius: '12px',
                    color: isDarkMode ? '#f9fafb' : '#1f2937',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                  }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                  formatter={(value) => [`${value}°C`, 'Temperature']}
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="url(#gradient)"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`mt-8 py-4 w-full text-center text-sm transition-colors duration-700 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-500'
      }`}>
          <p>© {new Date().getFullYear()} Weather Dashboard. All rights reserved.</p>
          <p className="mt-1">
              Built with ❤️ by Omswaroop T M.
          </p>
      </footer>
    </div>
  );
};

export default App;
