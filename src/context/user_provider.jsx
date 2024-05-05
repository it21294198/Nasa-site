import { useState } from 'react';
import {UserContext} from './use_context'

const UserProvider = ({ children }) => {
  const [state, setState] = useState('');

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;