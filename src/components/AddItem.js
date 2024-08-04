import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faXmark, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import axios from 'axios';

export default function AddItem() {
  const [window, setwindow] = useState(false);
  const [notification, setNotification] = useState(false);
  const additem = () => {
    setwindow(true);
  }
  const closadditem = () => {
    setwindow(false);
  }

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [about, setAbout] = useState('');

  const handlename = (event) => { setName(event.target.value); };
  const handleurl = (event) => { setUrl(event.target.value); };
  const handleabout = (event) => { setAbout(event.target.value); };
  const [error, setError] = useState('no error');
  const add = async () => {
    try {
        const response = await axios.get('http://localhost:5000/get-data', {
            params: { name, url, about }
        });
        console.log(response);
    } catch (error) {
        setNotification(true);
        //setError("Item '"+name+"' can not be added as the project is running on static web server.");
        setError(error.toString());
        console.error('Error fetching favicon:', error);
    }
  };
  return (
    <div className='addbutton'>
        <div className='card add-container'>
          <FontAwesomeIcon className='icon' id='ficon' icon={faCirclePlus} onClick={additem}/>
          <h3 id='additem'>Add Item</h3>
        </div>
        <div className='space'></div>

        <div className='window' style={{ display: window ? 'grid' : 'none' }}>
          <div className='notification' style={{display: notification ? 'block' : 'none'}}>
            <FontAwesomeIcon className='x' icon={faCirclePlus} onClick={() => setNotification(false)}/>{error}
          </div>
          <div className='box'>
          <FontAwesomeIcon className='xmark' icon={faXmark} onClick={closadditem}/>
          <input type='text' placeholder='Enter name...' onChange={handlename} required/>
          <input type='text' placeholder='Enter URL...' onChange={handleurl} required/>
          <input type='text' placeholder='About webpage...' onChange={handleabout} required/>
          <div onClick={add}><FontAwesomeIcon className='up' icon={faCloudArrowUp} /><div className='back'></div></div>
          </div>
        </div>
    </div>
  )
}
