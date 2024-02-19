import { StyleSheet, Text, View } from 'react-native';

import * as ExpoLibsignalClient from 'expo-libsignal-client';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoLibsignalClient.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
