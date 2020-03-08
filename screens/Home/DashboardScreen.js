import * as React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { ListItem, PricingCard } from 'react-native-elements';

import SignOut from '../../firebase/utils/signOut';

function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <PricingCard
      color="#4f9deb"
      title="Free"
      price="$0"
      info={['1 User', 'Basic Support', 'All Core Features']}
      button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
      onButtonPress={() => navigation.navigate('Settings')}
    />
      <Text>DashboardScreen</Text>
      <Button onPress={SignOut} title="Sign Out" />
    </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});