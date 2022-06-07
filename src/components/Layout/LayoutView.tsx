import React from 'react'
import { styled } from '@mui/material/styles';

import Footer from './Footer'
import Navbar from './Navbar'

type Props = {
  children: React.ReactElement
}

const Main = styled('div')`
  min-height: 100vh;
`

const LayoutDefault = ({
  children
}: Props) => {
  return (
    <>
      <Navbar />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  )
}

export default LayoutDefault