import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineMenu } from 'react-icons/ai'

function Header() {
  const [show, setShow] = useState(false)
  const menuList = [
    {
      name: 'Cars List',
      url: '/car'
    },
    {
      name: 'Bar Chart',
      url: '/bar-chart'
    }
  ]

  return (
    <div className="header">
      <h2 className="header_title">
        <Link to="/">Search Car</Link>
      </h2>
      <ul className="menu" id={show ? 'hidden' : ''}>
        {menuList.map((v, i) => {
          return (
            <li key={i} onClick={() => setShow(false)}>
              <Link to={v.url}>{v.name}</Link>
            </li>
          )
        })}
      </ul>
      <div className="header_right">
        <div
          href="#"
          className="burgar_btn"
          onClick={() => {
            setShow(!show)
          }}
        >
          <AiOutlineMenu className="burger" />
        </div>
        <FaUserCircle className="header_icon" />
      </div>
    </div>
  )
}

export default Header
