import React, { useState } from 'react'
import './cards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
export default function Cards(props) {
  const [iconUrl, setIconUrl] = useState(props.iconUrl);
  const handleError = () => {
    setIconUrl('default.svg');
  };
  return (
    <a href={props.url} target='_blank' rel="noreferrer">
      <div className='card'>
        <img src={iconUrl} alt={iconUrl} onError={handleError} id='icon'/>
        <div className='content'>
          <h3>{props.name}</h3>
          <p>{props.aboutContent === "" || props.aboutContent === null ? 'content is not avalabel' : props.aboutContent}</p>
        </div>
      </div>
      <div className='space'>
        <FontAwesomeIcon className="dots" icon={faEllipsisVertical} />
      </div>
    </a>
  )
}