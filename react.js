import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
 backend on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, []);

  customers based on search term and sorting option
  const filteredCustomers = customers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCustomers = sortBy ? [...filteredCustomers].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (sortBy === 'time') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
  }) : filteredCustomers;

  return (
    <div>
      {/* Search input */}
      <input 
        type="text" 
        placeholder="Search by name or location" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      {/* Sorting options */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>
      {/* Table displaying customer data */}
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedCustomers.map(customer => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
