import * as ExpoLibsignalClient from 'expo-libsignal-client';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	const p = ExpoLibsignalClient.PrivateKey.generate();
	const z = p.serialize();
	const keyPair = ExpoLibsignalClient.KEMKeyPair.generate();
	const privKeyObj = ExpoLibsignalClient.PrivateKey.deserialize(z);

	const signature = privKeyObj.sign(keyPair.getPublicKey().serialize());

	const kyberPreKeyRecord = ExpoLibsignalClient.KyberPreKeyRecord.new(
		1,
		Date.now(),
		keyPair,
		signature
	);

	return (
		<View style={styles.container}>
			<Text>
				{JSON.stringify({
					k: p,
					serialize: z,
					deserialized: ExpoLibsignalClient.PrivateKey.deserialize(z),
					kyberPreKeyRecord,
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
