import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Footer from '../components/Footer'
import styled from 'styled-components'

const HomeContainer = styled.div`
  width: 100%;
`

function Home() {
  return (
    <HomeContainer>
      <Announcement />
      <Navbar />
      <Products />
      <Footer />
    </HomeContainer>
  )
}

export default Home
