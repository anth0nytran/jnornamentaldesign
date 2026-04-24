import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useLocation } from 'react-router-dom';

const VercelInsights = () => {
  const location = useLocation();
  const path = `${location.pathname}${location.search}${location.hash}`;
  const isDevelopment = import.meta.env.DEV;

  return (
    <>
      <Analytics
        route={location.pathname}
        path={path}
        mode={isDevelopment ? 'development' : 'auto'}
        debug={isDevelopment}
      />
      <SpeedInsights
        route={location.pathname}
        sampleRate={1}
        debug={isDevelopment}
      />
    </>
  );
};

export default VercelInsights;
