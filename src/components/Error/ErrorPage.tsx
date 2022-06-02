import React from 'react'
import Box from '@mui/material/Box'

type ErrorPageProps = {
  statusCode?: number
}

const ErrorPage: NextPageWithLayout = ({
  statusCode
}: ErrorPageProps) => {
  const errorMessage = statusCode
    ? `An error ${statusCode} occurred on server`
    : 'An error occurred on client'
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>{errorMessage}</div>
    </Box>
  )
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage