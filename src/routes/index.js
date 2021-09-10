import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../Contexts/auth';
import AuthRoutes from '../routes/auth.routes';
import AppRoutes from '../routes/app.routes';

function Routes() {
  const { signed, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', justifyContent: 'center' }}
      >
        <ActivityIndicator size="large" color="#131313" />
      </View>
    );
  }
  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
