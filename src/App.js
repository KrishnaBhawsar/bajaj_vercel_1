import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonData, setJsonData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponseData(null);

    try {
      // Parse the JSON entered by the user
      const parsedData = JSON.parse(jsonData);
      
      // Send POST request to backend
      const result = await axios.post('https://bajaj-final-0t8j.onrender.com/bfhl', parsedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Set response data in the state
      setResponseData(result.data);

    } catch (err) {
      // Handle errors (e.g., invalid JSON or failed API call)
      setError('Invalid JSON or request failed.');
    }
  };

  return (
    <div className="App">
      <h1>Java API Interaction</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          placeholder='Enter JSON data, e.g., {"data": ["A", "C", "z"], "file_b64": "BASE64_STRING"}'
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <h3>Response</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
