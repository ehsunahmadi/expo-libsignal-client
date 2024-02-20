import { Buffer } from '@craftzdog/react-native-buffer';
import ExpoLibsignalClientModule from './ExpoLibsignalClientModule';
import * as Native from './Native';

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
		keyMaterial: Buffer,
		label: Buffer,
		salt: Buffer | null
	): Buffer {
		return hkdf(outputLength, keyMaterial, label, salt);
	}
}

export function hkdf(
	outputLength: number,
	keyMaterial: Buffer,
	label: Buffer,
	salt: Buffer | null
): Buffer {
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

	static deserialize(buf: Buffer): PrivateKey {
		return new PrivateKey(
			ExpoLibsignalClientModule.PrivateKey_Deserialize(buf)
		);
	}

	serialize(): Buffer {
		return ExpoLibsignalClientModule.PrivateKey_Serialize(this._nativeHandle);
	}

	sign(msg: Buffer): Buffer {
		return ExpoLibsignalClientModule.PrivateKey_Sign(this._nativeHandle, msg);
	}

	agree(other_key: PublicKey): Buffer {
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

	static deserialize(buf: Buffer): PublicKey {
		return new PublicKey(ExpoLibsignalClientModule.PublicKey_Deserialize(buf));
	}

	/// Returns -1, 0, or 1
	compare(other: PublicKey): number {
		return ExpoLibsignalClientModule.PublicKey_Compare(
			this._nativeHandle,
			other
		);
	}

	serialize(): Buffer {
		return ExpoLibsignalClientModule.PublicKey_Serialize(this._nativeHandle);
	}

	getPublicKeyBytes(): Buffer {
		return ExpoLibsignalClientModule.PublicKey_GetPublicKeyBytes(
			this._nativeHandle
		);
	}

	verify(msg: Buffer, sig: Buffer): boolean {
		return ExpoLibsignalClientModule.PublicKey_Verify(
			this._nativeHandle,
			msg,
			sig
		);
	}

	verifyAlternateIdentity(other: PublicKey, signature: Buffer): boolean {
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

	static deserialize(buf: Buffer): KEMPublicKey {
		return new KEMPublicKey(
			ExpoLibsignalClientModule.KyberPublicKey_Deserialize(buf)
		);
	}

	serialize(): Buffer {
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

	static deserialize(buf: Buffer): KEMSecretKey {
		return new KEMSecretKey(
			ExpoLibsignalClientModule.KyberSecretKey_Deserialize(buf)
		);
	}

	serialize(): Buffer {
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

	static deserialize(buffer: Buffer): IdentityKeyPair {
		const keys = ExpoLibsignalClientModule.IdentityKeyPair_Deserialize(buffer);
		console.log({ keys });
		return new IdentityKeyPair(
			PublicKey._fromNativeHandle(keys[0]),
			PrivateKey._fromNativeHandle(keys[1])
		);
	}

	serialize(): Buffer {
		return ExpoLibsignalClientModule.IdentityKeyPair_Serialize(
			this.publicKey,
			this.privateKey
		);
	}

	signAlternateIdentity(other: PublicKey): Buffer {
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
		signed_prekey_signature: Buffer,
		identity_key: PublicKey,
		kyber_prekey_id?: number,
		kyber_prekey?: KEMPublicKey,
		kyber_prekey_signature?: Buffer
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
					kyber_prekey_signature ?? new Buffer(0),
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
	signedPreKeySignature(): Buffer {
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

	kyberPreKeySignature(): Buffer | null {
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

	static deserialize(buffer: Buffer): PreKeyRecord {
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

	serialize(): Buffer {
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
		signature: Buffer
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

	static deserialize(buffer: Buffer): SignedPreKeyRecord {
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

	serialize(): Buffer {
		return ExpoLibsignalClientModule.SignedPreKeyRecord_Serialize(
			this._nativeHandle
		);
	}

	signature(): Buffer {
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
		signature: Buffer
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

	serialize(): Buffer {
		return ExpoLibsignalClientModule.KyberPreKeyRecord_Serialize(
			this._nativeHandle
		);
	}

	static deserialize(buffer: Buffer): KyberPreKeyRecord {
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

	signature(): Buffer {
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
