import React from 'react'
import { Link } from 'react-router-dom'

const Style = {
  navigation: 'navigation',
  list:       'navigation__list',
  item:       'navigation__list__item',
}

const Navigation = () => (
  <div className={Style.navigation}>
    <div className={Style.list}>
      <Link className={Style.item} to='/'>HOME</Link>
      <Link className={Style.item} to='/training'>TRENING</Link>
      <Link className={Style.item} to='/test'>TEST</Link>
      <Link className={Style.item} to='/admin'>ADMIN PANEL</Link>
    </div>
  </div>
)

export default Navigation
