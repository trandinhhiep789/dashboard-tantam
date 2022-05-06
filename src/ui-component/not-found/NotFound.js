import React, { memo } from 'react'
import './NotFound.css'
import error404 from '../../assets/erro-boundary/404.png'
import { NavLink } from 'react-router-dom'

const NotFound = memo(() => {
  return (
    <div className="NotFoundCom">
      <div className="NotFoundCom--dflex">
        <div>
          <img className="NotFoundCom__img" src={error404} />
        </div>
        <NavLink to="/">
          <b>Go to Home</b>
        </NavLink>
      </div>
    </div>
  )
})

export default NotFound
