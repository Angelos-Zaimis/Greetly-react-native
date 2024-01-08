import React, { ReactNode } from 'react';
import { SWRConfig } from 'swr';

interface SWRConfigProps {
  children: ReactNode;
}

const SWRConfigProvider = ({ children }: SWRConfigProps) => {
  const swrConfig = {
    // Specify your global SWR configuration options here
    // For example, you can set the cache timeout, polling interval, etc.
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    fetcher: (url: string) => fetch(url).then((res) => res.json()),
  };

  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};

export default SWRConfigProvider;
