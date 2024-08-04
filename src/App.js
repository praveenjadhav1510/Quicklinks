import React,{ useEffect ,useState} from 'react';
import './App.css';
import Cards from './components/Cards';
import Additem from './components/AddItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeather } from '@fortawesome/free-solid-svg-icons'

export default function App() {
  const [error, setError] = useState('')
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error.toString()));
  }, []);

  return (
    <>
      <h1>Quick Links - Jarvis<FontAwesomeIcon icon={faFeather}/></h1>
      <span style={{color: 'red'}}><b>{error}</b></span>
      <div className='main'>
        {data.map((item) => (
          <Cards 
            key={item.url} 
            name={item.name} 
            url={item.url} 
            iconUrl={item.iconUrl} 
            aboutContent={item.about} 
          />
        ))}
        <Additem/>
      </div>
    </>
  );
}
