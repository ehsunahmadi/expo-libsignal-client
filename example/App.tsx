import * as ExpoLibsignalClient from 'expo-libsignal-client';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	const p = ExpoLibsignalClient.PrivateKey.generate();
	const z = p.serialize();
	return (
		<View style={styles.container}>
			<Text>
				{JSON.stringify({
					k: p,
					serialize: z,
					deserialized: ExpoLibsignalClient.PrivateKey.deserialize(z),
				})}
			</Text>
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
