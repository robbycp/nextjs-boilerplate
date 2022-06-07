import { Typography } from '@mui/material'
import React from 'react'
import { useRemoteConfigAll, useRemoteConfigKey } from '~/services/firebase-remote-config'

type Props = {}

const RemoteConfigView = () => {
  const testKeyRemoteValue = useRemoteConfigKey('test_key')
  const remoteValues = useRemoteConfigAll()
  return (
    <div>
      <Typography variant="h5">Remote Config All</Typography>
      {JSON.stringify(remoteValues)}
      <Typography variant="h5">Remote Config test_key</Typography>
      {JSON.stringify(testKeyRemoteValue)}
    </div>
  )
}

export default RemoteConfigView