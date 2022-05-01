import PropTypes from 'prop-types'
import React, { memo, useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import useMenuItem from './menu-items/useMenuItem'

import { RightOutlined } from '@ant-design/icons'
import './MainMenuLeftNhatCuong.css'
import { Tooltip } from 'antd'

import CollapseMainMenuLeft from './collapse/CollapseMainMenuLeft'
const MainMenuLeftNhatCuong = memo(function MainMenuLeftNhatCuong(props) {
  const { MenuItem } = useMenuItem()
  const [selected, setSelected] = useState(null)
  const [isActiveNavLink, setIsActiveNavLink] = useState(0)
  const toggle = useCallback(
    i => {
      if (i === selected) {
        props.setIsExpandWidthMenuLeft(false)
        setIsActiveNavLink(null)
        return setSelected(null)
      }
      setSelected(i)
      props.setIsExpandWidthMenuLeft(true)
      setIsActiveNavLink(null)
    },
    [selected]
  )
  const handleActiveNaLink = useCallback(
    i => {
      setSelected(null)
      props.setIsExpandWidthMenuLeft(false)
      setIsActiveNavLink(i)
    },
    [isActiveNavLink]
  )
  return (
    <div>
      {MenuItem &&
        MenuItem.map((menu, i) => (
          <div className="mainMenuLeftNhatCuong" key={i}>
            {menu.SubMenu.length > 0 ? (
              <div className="mainMenuLeftNhatCuong__item" onClick={() => toggle(i)}>
                <div className="mainMenuLeftNhatCuong__item--center">
                  <div className="mainMenuLeftNhatCuong__item__icon">{menu.MenuIcon}</div>
                  {menu.MenuTitle.length > 10 ? (
                    <Tooltip color={'blue'} placement="rightTop" title={menu.MenuTitle}>
                      <div className="mainMenuLeftNhatCuong__item__title">{menu.MenuTitle.slice(0, 7)}...</div>
                    </Tooltip>
                  ) : (
                    <div className="mainMenuLeftNhatCuong__item__title">{menu.MenuTitle.slice(0, 10)}</div>
                  )}
                </div>
                <div className="mainMenuLeftNhatCuong__item__iconDrop">
                  <RightOutlined />
                </div>
              </div>
            ) : (
              <NavLink to={menu.LinkTo}>
                <div
                  className={isActiveNavLink == i ? 'mainMenuLeftNhatCuong__itemActive' : 'mainMenuLeftNhatCuong__item'}
                  onClick={() => handleActiveNaLink(i)}
                >
                  <div className="mainMenuLeftNhatCuong__item--center">
                    <div className="mainMenuLeftNhatCuong__item__icon">{menu.MenuIcon}</div>
                    {menu.MenuTitle.length > 10 ? (
                      <Tooltip color={'blue'} placement="rightTop" title={menu.MenuTitle}>
                        <div className="mainMenuLeftNhatCuong__item__title">{menu.MenuTitle.slice(0, 7)}...</div>
                      </Tooltip>
                    ) : (
                      <div className="mainMenuLeftNhatCuong__item__title">{menu.MenuTitle.slice(0, 10)}</div>
                    )}
                  </div>
                </div>
              </NavLink>
            )}
            <div
              className={
                selected == i ? 'mainMenuLeftNhatCuong__item__content--show' : 'mainMenuLeftNhatCuong__item__content'
              }
            >
              {menu.SubMenu.map((sub, i) => {
                return (
                  <div key={i}>
                    {sub.SubMenu.length > 0 ? (
                      <CollapseMainMenuLeft menuItem={sub} />
                    ) : (
                      <div className="mainMenuLeftNhatCuong__item__content__title">
                        <NavLink className="mainMenuLeftNhatCuong__item__content__title__navlink" to={sub.LinkTo}>
                          {sub.MenuTitle}
                        </NavLink>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
    </div>
  )
})

MainMenuLeftNhatCuong.propTypes = {
  setIsExpandWidthMenuLeft: PropTypes.func
}

export default MainMenuLeftNhatCuong
