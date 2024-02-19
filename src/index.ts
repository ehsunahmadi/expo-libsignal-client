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

export class KEMPublicKey {
	readonly _nativeHandle: Native.KyberPublicKey;

	private constructor(handle: Native.KyberPublicKey) {
		this._nativeHandle = handle;
	}

	static _fromNativeHandle(handle: Native.KyberPublicKey): KEMPublicKey {
		return new KEMPublicKey(handle);
	}

	static deserialize(buf: Uint8Array): KEMPublicKey {
		return new KEMPublicKey(
			ExpoLibsignalClientModule.KyberPublicKey_Deserialize(buf)
		);
	}

	serialize(): Uint8Array {
		return ExpoLibsignalClientModule.KyberPublicKey_Serialize(
			this._nativeHandle
		);
	}
}

export class KEMSecretKey {
	readonly _nativeHandle: Native.KyberSecretKey;

	private constructor(handle: Native.KyberSecretKey) {
		this._nativeHandle = handle;
	}

	static _fromNativeHandle(handle: Native.KyberSecretKey): KEMSecretKey {
		return new KEMSecretKey(handle);
	}

	static deserialize(buf: Uint8Array): KEMSecretKey {
		return new KEMSecretKey(
			ExpoLibsignalClientModule.KyberSecretKey_Deserialize(buf)
		);
	}

	serialize(): Uint8Array {
		return ExpoLibsignalClientModule.KyberSecretKey_Serialize(
			this._nativeHandle
		);
	}
}

export class KEMKeyPair {
	readonly _nativeHandle: Native.KyberKeyPair;

	private constructor(handle: Native.KyberKeyPair) {
		this._nativeHandle = handle;
	}

	static _fromNativeHandle(handle: Native.KyberKeyPair): KEMKeyPair {
		return new KEMKeyPair(handle);
	}

	static generate(): KEMKeyPair {
		return new KEMKeyPair(ExpoLibsignalClientModule.KyberKeyPair_Generate());
	}

	getPublicKey(): KEMPublicKey {
		return KEMPublicKey._fromNativeHandle(
			ExpoLibsignalClientModule.KyberKeyPair_GetPublicKey(this._nativeHandle)
		);
	}

	getSecretKey(): KEMSecretKey {
		return KEMSecretKey._fromNativeHandle(
			ExpoLibsignalClientModule.KyberKeyPair_GetSecretKey(this._nativeHandle)
		);
	}
}

export class IdentityKeyPair {
	readonly publicKey: PublicKey;
	readonly privateKey: PrivateKey;

	constructor(publicKey: PublicKey, privateKey: PrivateKey) {
		this.publicKey = publicKey;
		this.privateKey = privateKey;
	}

	static generate(): IdentityKeyPair {
		const privateKey = PrivateKey.generate();
		return new IdentityKeyPair(privateKey.getPublicKey(), privateKey);
	}

	static deserialize(buffer: Uint8Array): IdentityKeyPair {
		const keys = ExpoLibsignalClientModule.IdentityKeyPair_Deserialize(buffer);
		console.log({ keys });
		return new IdentityKeyPair(
			PublicKey._fromNativeHandle(keys[0]),
			PrivateKey._fromNativeHandle(keys[1])
		);
	}

	serialize(): Uint8Array {
		return ExpoLibsignalClientModule.IdentityKeyPair_Serialize(
			this.publicKey,
			this.privateKey
		);
	}

	signAlternateIdentity(other: PublicKey): Uint8Array {
		return ExpoLibsignalClientModule.IdentityKeyPair_SignAlternateIdentity(
			this.publicKey,
			this.privateKey,
			other
		);
	}
}

export class PreKeyBundle {
	readonly _nativeHandle: Native.PreKeyBundle;

	private constructor(handle: Native.PreKeyBundle) {
		this._nativeHandle = handle;
	}

	// we are passing some arguments in array and receiving them as pairs for reducing the number of parameters to >= 8. we can clean it up further by putting it in a Record class whih is expo's max limit due to the limitations of generics in both Swift and Kotlin because this component must be implemented separately for each.
	static new(
		registration_id: number,
		device_id: number,
		prekey_id: number,
		prekey: PublicKey,
		signed_prekey_id: number,
		signed_prekey: PublicKey,
		signed_prekey_signature: Uint8Array,
		identity_key: PublicKey,
		kyber_prekey_id?: number,
		kyber_prekey?: KEMPublicKey,
		kyber_prekey_signature?: Uint8Array
	): PreKeyBundle {
		return new PreKeyBundle(
			ExpoLibsignalClientModule.PreKeyBundle_New(
				[registration_id, device_id],
				prekey_id,
				prekey != null ? prekey._nativeHandle : null,
				signed_prekey_id,
				[signed_prekey._nativeHandle, signed_prekey_signature],
				identity_key._nativeHandle,
				kyber_prekey_id ?? null,
				[
					kyber_prekey?._nativeHandle ?? null,
					kyber_prekey_signature ?? new Uint8Array(0),
				]
			)
		);
	}

	deviceId(): number {
		return ExpoLibsignalClientModule.PreKeyBundle_GetDeviceId(
			this._nativeHandle
		);
	}
	identityKey(): PublicKey {
		return PublicKey._fromNativeHandle(
			ExpoLibsignalClientModule.PreKeyBundle_GetIdentityKey(this._nativeHandle)
		);
	}
	preKeyId(): number | null {
		return ExpoLibsignalClientModule.PreKeyBundle_GetPreKeyId(
			this._nativeHandle
		);
	}
	preKeyPublic(): PublicKey | null {
		const handle = ExpoLibsignalClientModule.PreKeyBundle_GetPreKeyPublic(
			this._nativeHandle
		);

		if (handle == null) {
			return null;
		}
		return PublicKey._fromNativeHandle(handle);
	}
	registrationId(): number {
		return ExpoLibsignalClientModule.PreKeyBundle_GetRegistrationId(
			this._nativeHandle
		);
	}
	signedPreKeyId(): number {
		return ExpoLibsignalClientModule.PreKeyBundle_GetSignedPreKeyId(
			this._nativeHandle
		);
	}
	signedPreKeyPublic(): PublicKey {
		return PublicKey._fromNativeHandle(
			ExpoLibsignalClientModule.PreKeyBundle_GetSignedPreKeyPublic(
				this._nativeHandle
			)
		);
	}
	signedPreKeySignature(): Uint8Array {
		return ExpoLibsignalClientModule.PreKeyBundle_GetSignedPreKeySignature(
			this
		);
	}

	kyberPreKeyId(): number | null {
		return ExpoLibsignalClientModule.PreKeyBundle_GetKyberPreKeyId(
			this._nativeHandle
		);
	}

	kyberPreKeyPublic(): KEMPublicKey | null {
		const handle = ExpoLibsignalClientModule.PreKeyBundle_GetKyberPreKeyPublic(
			this._nativeHandle
		);
		return handle == null ? null : KEMPublicKey._fromNativeHandle(handle);
	}

	kyberPreKeySignature(): Uint8Array | null {
		const buf = ExpoLibsignalClientModule.PreKeyBundle_GetKyberPreKeySignature(
			this._nativeHandle
		);
		return buf.length === 0 ? null : buf;
	}
}

export class PreKeyRecord {
	readonly _nativeHandle: Native.PreKeyRecord;

	private constructor(handle: Native.PreKeyRecord) {
		this._nativeHandle = handle;
	}

	static _fromNativeHandle(nativeHandle: Native.PreKeyRecord): PreKeyRecord {
		return new PreKeyRecord(nativeHandle);
	}

	static new(id: number, pubKey: PublicKey, privKey: PrivateKey): PreKeyRecord {
		return new PreKeyRecord(
			ExpoLibsignalClientModule.PreKeyRecord_New(id, pubKey, privKey)
		);
	}

	static deserialize(buffer: Uint8Array): PreKeyRecord {
		return new PreKeyRecord(
			ExpoLibsignalClientModule.PreKeyRecord_Deserialize(buffer)
		);
	}

	id(): number {
		return ExpoLibsignalClientModule.PreKeyRecord_GetId(this._nativeHandle);
	}

	privateKey(): PrivateKey {
		return PrivateKey._fromNativeHandle(
			ExpoLibsignalClientModule.PreKeyRecord_GetPrivateKey(this._nativeHandle)
		);
	}

	publicKey(): PublicKey {
		return PublicKey._fromNativeHandle(
			ExpoLibsignalClientModule.PreKeyRecord_GetPublicKey(this._nativeHandle)
		);
	}

	serialize(): Uint8Array {
		return ExpoLibsignalClientModule.PreKeyRecord_Serialize(this._nativeHandle);
	}
}

export class SignedPreKeyRecord {
	readonly _nativeHandle: Native.SignedPreKeyRecord;

	private constructor(handle: Native.SignedPreKeyRecord) {
		this._nativeHandle = handle;
	}

	static _fromNativeHandle(
		nativeHandle: Native.SignedPreKeyRecord
	): SignedPreKeyRecord {
		return new SignedPreKeyRecord(nativeHandle);
	}

	static new(
		id: number,
		timestamp: number,
		pubKey: PublicKey,
		privKey: PrivateKey,
		signature: Uint8Array
	): SignedPreKeyRecord {
		return new SignedPreKeyRecord(
			ExpoLibsignalClientModule.SignedPreKeyRecord_New(
				id,
				timestamp,
				pubKey,
				privKey,
				signature
			)
		);
	}

	static deserialize(buffer: Uint8Array): SignedPreKeyRecord {
		return new SignedPreKeyRecord(
			ExpoLibsignalClientModule.SignedPreKeyRecord_Deserialize(buffer)
		);
	}

	id(): number {
		return ExpoLibsignalClientModule.SignedPreKeyRecord_GetId(
			this._nativeHandle
		);
	}

	privateKey(): PrivateKey {
		return PrivateKey._fromNativeHandle(
			ExpoLibsignalClientModule.SignedPreKeyRecord_GetPrivateKey(
				this._nativeHandle
			)
		);
	}

	publicKey(): PublicKey {
		return PublicKey._fromNativeHandle(
			ExpoLibsignalClientModule.SignedPreKeyRecord_GetPublicKey(
				this._nativeHandle
			)
		);
	}

	serialize(): Uint8Array {
		return ExpoLibsignalClientModule.SignedPreKeyRecord_Serialize(
			this._nativeHandle
		);
	}

	signature(): Uint8Array {
		return ExpoLibsignalClientModule.SignedPreKeyRecord_GetSignature(
			this._nativeHandle
		);
	}

	timestamp(): number {
		return ExpoLibsignalClientModule.SignedPreKeyRecord_GetTimestamp(
			this._nativeHandle
		);
	}
}

export class KyberPreKeyRecord {
	readonly _nativeHandle: Native.KyberPreKeyRecord;

	private constructor(handle: Native.KyberPreKeyRecord) {
		this._nativeHandle = handle;
	}

	static _fromNativeHandle(
		nativeHandle: Native.KyberPreKeyRecord
	): KyberPreKeyRecord {
		return new KyberPreKeyRecord(nativeHandle);
	}

	static new(
		id: number,
		timestamp: number,
		keyPair: KEMKeyPair,
		signature: Uint8Array
	): KyberPreKeyRecord {
		return new KyberPreKeyRecord(
			ExpoLibsignalClientModule.KyberPreKeyRecord_New(
				id,
				timestamp,
				keyPair,
				signature
			)
		);
	}

	serialize(): Uint8Array {
		return ExpoLibsignalClientModule.KyberPreKeyRecord_Serialize(
			this._nativeHandle
		);
	}

	static deserialize(buffer: Uint8Array): KyberPreKeyRecord {
		return new KyberPreKeyRecord(
			ExpoLibsignalClientModule.KyberPreKeyRecord_Deserialize(buffer)
		);
	}

	id(): number {
		return ExpoLibsignalClientModule.KyberPreKeyRecord_GetId(
			this._nativeHandle
		);
	}

	keyPair(): KEMKeyPair {
		return KEMKeyPair._fromNativeHandle(
			ExpoLibsignalClientModule.KyberPreKeyRecord_GetKeyPair(this._nativeHandle)
		);
	}

	publicKey(): KEMPublicKey {
		return KEMPublicKey._fromNativeHandle(
			ExpoLibsignalClientModule.KyberPreKeyRecord_GetPublicKey(
				this._nativeHandle
			)
		);
	}

	secretKey(): KEMSecretKey {
		return KEMSecretKey._fromNativeHandle(
			ExpoLibsignalClientModule.KyberPreKeyRecord_GetSecretKey(
				this._nativeHandle
			)
		);
	}

	signature(): Uint8Array {
		return ExpoLibsignalClientModule.KyberPreKeyRecord_GetSignature(
			this._nativeHandle
		);
	}

	timestamp(): number {
		return ExpoLibsignalClientModule.KyberPreKeyRecord_GetTimestamp(
			this._nativeHandle
		);
	}
}

//export the types here
// export {};
