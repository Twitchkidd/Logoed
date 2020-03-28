import React, { useState } from 'react';
import { ProfileCreationContext } from './contexts';
import Navigation from './config/navigation';

export default () => {
  const [instagramHandle, setInstagramHandle] = useState(null);
  return (
    <ProfileCreationContext.Provider
      value={{ instagramHandle, setInstagramHandle }}>
      <Navigation />
    </ProfileCreationContext.Provider>
  );
};
