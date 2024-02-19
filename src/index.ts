import ExpoLibsignalClientModule from './ExpoLibsignalClientModule';
import Native from './Native';

export class HKDF {
	/**
	 * @deprecated Use the top-level 'hkdf' function for standard HKDF behavior
	 */
	static new(version: number): HKDF {
		if (version !== 3) {
			throw new Error('HKDF versions other than 3 are no longer supported');
		}
		return new HKDF();
	}

	deriveSecrets(
		outputLength: number,
		keyMaterial: Uint8Array,
		label: Uint8Array,
		salt: Uint8Array | null
	): Uint8Array {
		return hkdf(outputLength, keyMaterial, label, salt);
	}
}

export function hkdf(
	outputLength: number,
	keyMaterial: Uint8Array,
	label: Uint8Array,
	salt: Uint8Array | null
): Uint8Array {
	return ExpoLibsignalClientModule.HKDF_DeriveSecrets(
		outputLength,
		keyMaterial,
		label,
		salt
	);
}
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

	sign(msg: Uint8Array): Uint8Array {
		return ExpoLibsignalClientModule.PrivateKey_Sign(this._nativeHandle, msg);
	}

	agree(other_key: PublicKey): Uint8Array {
		return ExpoLibsignalClientModule.PrivateKey_Agree(
			this._nativeHandle,
			other_key
		);
	}

	getPublicKey(): PublicKey {
		return PublicKey._fromNativeHandle(
			ExpoLibsignalClientModule.PrivateKey_GetPublicKey(this._nativeHandle)
		);
	}
}

export class PublicKey {
	readonly _nativeHandle: Native.PublicKey;

	private constructor(handle: Native.PublicKey) {
		this._nativeHandle = handle;
	}

	static _fromNativeHandle(handle: Native.PublicKey): PublicKey {
		return new PublicKey(handle);
	}

	static deserialize(buf: Uint8Array): PublicKey {
		return new PublicKey(ExpoLibsignalClientModule.PublicKey_Deserialize(buf));
	}

	/// Returns -1, 0, or 1
	compare(other: PublicKey): number {
		return ExpoLibsignalClientModule.PublicKey_Compare(
			this._nativeHandle,
			other
		);
	}

	serialize(): Uint8Array {
		return ExpoLibsignalClientModule.PublicKey_Serialize(this._nativeHandle);
	}

	getPublicKeyBytes(): Uint8Array {
		return ExpoLibsignalClientModule.PublicKey_GetPublicKeyBytes(
			this._nativeHandle
		);
	}

	verify(msg: Uint8Array, sig: Uint8Array): boolean {
		return ExpoLibsignalClientModule.PublicKey_Verify(
			this._nativeHandle,
			msg,
			sig
		);
	}

	verifyAlternateIdentity(other: PublicKey, signature: Uint8Array): boolean {
		return ExpoLibsignalClientModule.IdentityKey_VerifyAlternateIdentity(
			this._nativeHandle,
			other,
			signature
		);
	}
}

//export the types here
// export {};
