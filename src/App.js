import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [zip, setZip] = useState('');
  const [query, setQuery] = useState('');

  function handleSearch() {
    setLoading(true);
    fetchBusinesses(zip, query)
      .then(data => {
        setBusinesses(data);
        setLoading(false);
      })
      .catch(error => {
        setBusinesses([]);
        setLoading(false);
      });
  }

  const hasResults = businesses.length > 0;
  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input
            type="number"
            placeholder="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            onKeyUp={e => e.code === 'Enter' && handleSearch()}
          />
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={e => e.code === 'Enter' && handleSearch()}
          />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && hasResults && businesses.map((b) => <RestaurantListItem key={b.id} {...b} />)}
      {!loading && !hasResults && <div className='message'>No Results</div>}
    </div>
  );
}

export default App;
