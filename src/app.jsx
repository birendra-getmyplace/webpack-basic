import { Map } from 'immutable'
import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { MenuItem } from 'react-mdl/lib/Menu'
import Header from 'react-mdl/lib/Layout/Header'
import Menu from 'react-mdl/lib/Menu'
import Textfield from 'react-mdl/lib/Textfield'
import IconButton from 'react-mdl/lib/IconButton'
import HeaderRow from 'react-mdl/lib/Layout/HeaderRow'
import { Link } from 'react-router'

// Load the Material style
require('styles/material.css')
// Load the Material JS
require('vendor/material.js')

// Load our local style
require('./app.css')

/**
 * A Wraper to enable React Router friendly links as menu items.
*/
let MenuItemLink = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    href: React.PropTypes.string,
    menuProps: React.PropTypes.object,
    to: React.PropTypes.string
  },

  handleMenuItemClick: function (ev) {
    return this.menuLink.handleClick(ev)
  },

  render: function () {
    const { children, menuProps } = this. props

    return (<MenuItem {...menuProps} onClick={ ev => { this.handleMenuItemClick(ev) } }>
      <Link {...this.props}ref={ (ref) => { this.menuLink = ref } }>{children}</Link>
    </MenuItem>)
  }
})

// Set up a basic MDL header
let ForstaLayout = React.createClass({
  /** Build an MDL based header with a little extra sauce
   */
  propTypes: {
    children: React.PropTypes.node,
    header: React.PropTypes.object.isRequired
  },

  render: function () {
    const { children, header } = this.props

    let classes = classNames([
      'mdl-layout', 'mdl-js-layout', 'mdl-layout--fixed-header'
    ])

    let menuItems = [
      <MenuItemLink key='#about' to='/about'>About</MenuItemLink>,
      <MenuItemLink key='#contact' to='/contact'>Contact</MenuItemLink>
    ]

    return (
        <div className={classes}>
          <div className='mdl-layout__inner-container'>
            <Header>
              <HeaderRow title={header.get('title')}>
                <Textfield maxRows={1} expandable expandableIcon='search'
                    floatingLabel label='Enter your query...' />
                <IconButton name='more_vert' id='forsta-menu' />
                <Menu ripple align='right' valign='bottom'
                    target='forsta-menu' >{menuItems}</Menu>
              </HeaderRow>
            </Header>

            <main className='mdl-layout__content'>
              {children}
            </main>
          </div>
      </div>
    )
  }
})

export default connect((state) => (
  {
    'header': state.page.get('header', Map())
  }
))(ForstaLayout)
