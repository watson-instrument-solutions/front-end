import React from 'react'
import '../Styles/header.css'
import wislogoNarrow from '../docs/wis-narrow.jpg'

function Header() {
  return (
    <div>
        <div className='header_logo'>
            <img src={wislogoNarrow} alt='wislogo' className='grey_logo' />
        </div>
        <p className='tagline'>
            Acoustic Monitoring Equipment - management, hire, and servicing Australia wide
        </p>
    </div>
  )
}

export default Header