import ExpoLibsignalClientModule from './ExpoLibsignalClientModule';
import Native from './Native';
export class PrivateKey {
	readonly _nativeHandle: Native.PrivateKey;

	private constructor(handle: Native.PrivateKey) {
		this._nativeHandle = handle;
	}

	static _fromNativeHandle(handle: Native.PrivateKey): PrivateKey {
		return new PrivateKey(handle);
	}

	static generate(): PrivateKey {
		return new PrivateKey(ExpoLibsignalClientModule.PrivateKey_Generate());
	}

	static deserialize(buf: Uint8Array): PrivateKey {
		return new PrivateKey(
			ExpoLibsignalClientModule.PrivateKey_Deserialize(buf)
		);
	}

	serialize(): Uint8Array {
		return ExpoLibsignalClientModule.PrivateKey_Serialize(this._nativeHandle);
	}

	// sign(msg: Buffer): Buffer {
	// 	return ExpoLibsignalClientModule.PrivateKey_Sign(this, msg);
	// }

	// agree(other_key: PublicKey): Buffer {
	//   return Native.PrivateKey_Agree(this, other_key);
	// }

	// getPublicKey(): PublicKey {
	//   return PublicKey._fromNativeHandle(Native.PrivateKey_GetPublicKey(this));
	// }
}

//export the types here
// export {};
