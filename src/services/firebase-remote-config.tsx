import React, { useContext } from 'react'
import { fetchAndActivate, getAll, getRemoteConfig, Value } from "firebase/remote-config";

import app from './firebase'

interface FlagsProviderProps {
  children: React.ReactNode
}
interface InitializeProps {
  flags: typeof defaultConfig,
  setFlags: SetState<typeof defaultConfig>
}

// Change defaultConfig and getValueFromRemote based on the key value on your firebase dashboard
const defaultConfig = {
  "test_key": "This is default test key",
  "is_something_true": false,
  "json_something": "{}",
  "number_something": 0,
};
const getValueFromRemote = (remoteConfigValues: Record<string, Value>) => {
  return {
    "test_key": remoteConfigValues['test_key'].asString(),
    "is_something_true": remoteConfigValues['is_something_true'].asBoolean(),
    "json_something": JSON.parse(remoteConfigValues['json_something'].asString()),
    "number_something": remoteConfigValues['number_something'].asNumber(),
  }
}

const initializeRemoteConfig = async ({ flags, setFlags }: InitializeProps) => {
  try {
    const remoteConfig = getRemoteConfig(app);
    remoteConfig.settings.minimumFetchIntervalMillis = Number(process.env.REMOTE_CONFIG_INTERVAL);
    remoteConfig.defaultConfig = defaultConfig
    // console.log('[remote-config] remoteConfig', remoteConfig)

    await fetchAndActivate(remoteConfig)
    
    const remoteConfigValues = getAll(remoteConfig)
    // console.log('[remote-config] remoteConfigValues', remoteConfigValues)
    const newFlags: Record<string, unknown> = {
      ...flags,
      ...getValueFromRemote(remoteConfigValues)
    };
    // console.log('[remote-config] newFlags', newFlags)
    setFlags(newFlags as typeof defaultConfig);
  } catch (err) {
    console.log('[remote-config] error', err)
  }
}

const FlagsContext = React.createContext(defaultConfig);

const FlagsProvider = ({ children }: FlagsProviderProps) => {
  const [flags, setFlags] = React.useState(defaultConfig);
  
  React.useEffect(() => {
    initializeRemoteConfig({ flags, setFlags })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlagsContext.Provider value={flags}>
      {children}
    </FlagsContext.Provider>
  );
};

export const useRemoteConfigKey = (key: keyof typeof defaultConfig) => {
  const context = useContext(FlagsContext)
  return context[key]
}
export const useRemoteConfigAll = () => useContext(FlagsContext)

export default FlagsProvider