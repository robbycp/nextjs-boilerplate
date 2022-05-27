import React from 'react'
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

import Link from '~/components/Link'

const Container = styled('div')`
  padding: 30px;
  background-color: ${props => props.theme.palette.primary.main};
  display: flex;
  flex-direction: row;
`
const Section = styled('div')`
  min-width: 150px;
`
const sections = [
  {
    title: 'About',
    menus: [
      { title: 'About Us', link: '/about' },
      { title: 'Contact', link: '/contact' },
    ]
  },
  {
    title: 'Product',
    menus: [
      { title: 'Furniture', link: '/furniture' },
      { title: 'Promo', link: '/promo' },
    ]
  },
]
const Footer = () => {
  return (
    <Container>
      {sections.map((section) => (
        <Section key={section.title}>
          <Typography variant="h6">{section.title}</Typography>
          {section.menus.map((menu) => (
            <Link key={menu.title} href={menu.link}>
              <Typography variant="body1" color="black">{menu.title}</Typography>
            </Link>
          ))}
        </Section>
      ))}
    </Container>
  )
}

export default Footer