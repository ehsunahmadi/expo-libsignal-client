package expo.modules.libsignalclient

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.signal.libsignal.internal.Native;

class ExpoLibsignalClientModule : Module() {  
  override fun definition() = ModuleDefinition {
    Name("ExpoLibsignalClient")

    Function("HKDF_DeriveSecrets", this@ExpoLibsignalClientModule::HKDF_DeriveSecrets)

    Function("PrivateKey_Generate", this@ExpoLibsignalClientModule::PrivateKey_Generate)
    Function("PrivateKey_Deserialize", this@ExpoLibsignalClientModule::PrivateKey_Deserialize)
    Function("PrivateKey_Serialize", this@ExpoLibsignalClientModule::PrivateKey_Serialize)
    Function("PrivateKey_Sign", this@ExpoLibsignalClientModule::PrivateKey_Sign)
    Function("PrivateKey_Agree", this@ExpoLibsignalClientModule::PrivateKey_Agree)
    Function("PrivateKey_GetPublicKey", this@ExpoLibsignalClientModule::PrivateKey_GetPublicKey)

    Function("PublicKey_Deserialize", this@ExpoLibsignalClientModule::PublicKey_Deserialize)
    Function("PublicKey_Compare", this@ExpoLibsignalClientModule::PublicKey_Compare)
    Function("PublicKey_Serialize", this@ExpoLibsignalClientModule::PublicKey_Serialize)
    Function("PublicKey_GetPublicKeyBytes", this@ExpoLibsignalClientModule::PublicKey_GetPublicKeyBytes)
    Function("PublicKey_Verify", this@ExpoLibsignalClientModule::PublicKey_Verify)
    Function("IdentityKey_VerifyAlternateIdentity", this@ExpoLibsignalClientModule::IdentityKey_VerifyAlternateIdentity)

    Function("KyberPublicKey_Deserialize", this@ExpoLibsignalClientModule::KyberPublicKey_Deserialize)
    Function("KyberPublicKey_Serialize", this@ExpoLibsignalClientModule::KyberPublicKey_Serialize)
    Function("KyberSecretKey_Deserialize", this@ExpoLibsignalClientModule::KyberSecretKey_Deserialize)
    Function("KyberSecretKey_Serialize", this@ExpoLibsignalClientModule::KyberSecretKey_Serialize)

    Function("KyberKeyPair_Generate", this@ExpoLibsignalClientModule::KyberKeyPair_Generate)
    Function("KyberKeyPair_GetPublicKey", this@ExpoLibsignalClientModule::KyberKeyPair_GetPublicKey)
    Function("KyberKeyPair_GetSecretKey", this@ExpoLibsignalClientModule::KyberKeyPair_GetSecretKey)

    Function("IdentityKeyPair_Deserialize", this@ExpoLibsignalClientModule::IdentityKeyPair_Deserialize)
    Function("IdentityKeyPair_Serialize", this@ExpoLibsignalClientModule::IdentityKeyPair_Serialize)
    Function("IdentityKeyPair_SignAlternateIdentity", this@ExpoLibsignalClientModule::IdentityKeyPair_SignAlternateIdentity)

    // we are passing some arguments in array and receiving them as pairs for reducing the number of parameters to >= 8. we can clean it up further by putting it in a Record class whih is expo's max limit due to the limitations of generics in both Swift and Kotlin because this component must be implemented separately for each.
    Function("PreKeyBundle_New", this@ExpoLibsignalClientModule::PreKeyBundle_New)
    Function("PreKeyBundle_GetDeviceId", this@ExpoLibsignalClientModule::PreKeyBundle_GetDeviceId)
    Function("PreKeyBundle_GetIdentityKey", this@ExpoLibsignalClientModule::PreKeyBundle_GetIdentityKey)
    Function("PreKeyBundle_GetPreKeyId", this@ExpoLibsignalClientModule::PreKeyBundle_GetPreKeyId)
    Function("PreKeyBundle_GetPreKeyPublic", this@ExpoLibsignalClientModule::PreKeyBundle_GetPreKeyPublic)
    Function("PreKeyBundle_GetRegistrationId", this@ExpoLibsignalClientModule::PreKeyBundle_GetRegistrationId)
    Function("PreKeyBundle_GetSignedPreKeyId", this@ExpoLibsignalClientModule::PreKeyBundle_GetSignedPreKeyId)
    Function("PreKeyBundle_GetSignedPreKeyPublic", this@ExpoLibsignalClientModule::PreKeyBundle_GetSignedPreKeyPublic)
    Function("PreKeyBundle_GetSignedPreKeySignature", this@ExpoLibsignalClientModule::PreKeyBundle_GetSignedPreKeySignature)
    Function("PreKeyBundle_GetKyberPreKeyId", this@ExpoLibsignalClientModule::PreKeyBundle_GetKyberPreKeyId)
    Function("PreKeyBundle_GetKyberPreKeyPublic", this@ExpoLibsignalClientModule::PreKeyBundle_GetKyberPreKeyPublic)
    Function("PreKeyBundle_GetKyberPreKeySignature", this@ExpoLibsignalClientModule::PreKeyBundle_GetKyberPreKeySignature)

    Function("PreKeyRecord_New", this@ExpoLibsignalClientModule::PreKeyRecord_New)
    Function("PreKeyRecord_Deserialize", this@ExpoLibsignalClientModule::PreKeyRecord_Deserialize)
    Function("PreKeyRecord_GetId", this@ExpoLibsignalClientModule::PreKeyRecord_GetId)
    Function("PreKeyRecord_GetPrivateKey", this@ExpoLibsignalClientModule::PreKeyRecord_GetPrivateKey)
    Function("PreKeyRecord_GetPublicKey", this@ExpoLibsignalClientModule::PreKeyRecord_GetPublicKey)
    Function("PreKeyRecord_Serialize", this@ExpoLibsignalClientModule::PreKeyRecord_Serialize)

    Function("SignedPreKeyRecord_New", this@ExpoLibsignalClientModule::SignedPreKeyRecord_New)
    Function("SignedPreKeyRecord_Deserialize", this@ExpoLibsignalClientModule::SignedPreKeyRecord_Deserialize)
    Function("SignedPreKeyRecord_GetId", this@ExpoLibsignalClientModule::SignedPreKeyRecord_GetId)
    Function("SignedPreKeyRecord_GetPrivateKey", this@ExpoLibsignalClientModule::SignedPreKeyRecord_GetPrivateKey)
    Function("SignedPreKeyRecord_GetPublicKey", this@ExpoLibsignalClientModule::SignedPreKeyRecord_GetPublicKey)
    Function("SignedPreKeyRecord_Serialize", this@ExpoLibsignalClientModule::SignedPreKeyRecord_Serialize)
    Function("SignedPreKeyRecord_GetSignature", this@ExpoLibsignalClientModule::SignedPreKeyRecord_GetSignature)
    Function("SignedPreKeyRecord_GetTimestamp", this@ExpoLibsignalClientModule::SignedPreKeyRecord_GetTimestamp)

    Function("KyberPreKeyRecord_New", this@ExpoLibsignalClientModule::KyberPreKeyRecord_New)
    Function("KyberPreKeyRecord_Serialize", this@ExpoLibsignalClientModule::KyberPreKeyRecord_Serialize)
    Function("KyberPreKeyRecord_Deserialize", this@ExpoLibsignalClientModule::KyberPreKeyRecord_Deserialize)
    Function("KyberPreKeyRecord_GetId", this@ExpoLibsignalClientModule::KyberPreKeyRecord_GetId)
    Function("KyberPreKeyRecord_GetKeyPair", this@ExpoLibsignalClientModule::KyberPreKeyRecord_GetKeyPair)
    Function("KyberPreKeyRecord_GetPublicKey", this@ExpoLibsignalClientModule::KyberPreKeyRecord_GetPublicKey)
    Function("KyberPreKeyRecord_GetSecretKey", this@ExpoLibsignalClientModule::KyberPreKeyRecord_GetSecretKey)
    Function("KyberPreKeyRecord_GetSignature", this@ExpoLibsignalClientModule::KyberPreKeyRecord_GetSignature)
    Function("KyberPreKeyRecord_GetTimestamp", this@ExpoLibsignalClientModule::KyberPreKeyRecord_GetTimestamp)
  }
  
  private fun HKDF_DeriveSecrets(outputLength: Int, ikm: ByteArray, label: ByteArray?, salt: ByteArray?) : ByteArray {
    return Native.HKDF_DeriveSecrets(outputLength, ikm, label, salt)
  }

  private fun PrivateKey_Generate() : Long  {
    return Native.ECPrivateKey_Generate()
  }
  private fun PrivateKey_Deserialize(serialized: ByteArray) : Long {
    return Native.ECPrivateKey_Deserialize(serialized)
  }
  private fun PrivateKey_Serialize(privateKey: Long) : ByteArray {
    return Native.ECPrivateKey_Serialize(privateKey)
  }
  private fun PrivateKey_Sign(privateKey: Long, message: ByteArray) : ByteArray {
    return Native.ECPrivateKey_Sign(privateKey, message)
  }
  private fun PrivateKey_Agree(privateKey: Long, publicKey: Long) : ByteArray {
    return Native.ECPrivateKey_Agree(privateKey, publicKey)
  }
  private fun PrivateKey_GetPublicKey(privateKey: Long) : Long {
    return Native.ECPrivateKey_GetPublicKey(privateKey)
  }

  private fun PublicKey_Deserialize(serialized: ByteArray) : Long {
    return Native.ECPublicKey_Deserialize(serialized, 0)
  }
  private fun PublicKey_Compare(publicKey1: Long, publicKey2: Long) : Int {
    return Native.ECPublicKey_Compare(publicKey1, publicKey2)
  }
  private fun PublicKey_Serialize(publicKey: Long) : ByteArray {
    return Native.ECPublicKey_Serialize(publicKey)
  }
  private fun PublicKey_GetPublicKeyBytes(publicKey: Long) : ByteArray {
    return Native.ECPublicKey_GetPublicKeyBytes(publicKey)
  }
  private fun PublicKey_Verify(publicKey: Long, message: ByteArray, signature: ByteArray) : Boolean {
    return Native.ECPublicKey_Verify(publicKey, message, signature)
  }
  private fun IdentityKey_VerifyAlternateIdentity(identityKey: Long, publicKey: Long, signature: ByteArray) : Boolean {
    return Native.IdentityKey_VerifyAlternateIdentity(identityKey, publicKey, signature)
  }

  private fun KyberPublicKey_Deserialize(serialized: ByteArray) : Long {
    return Native.KyberPublicKey_DeserializeWithOffset(serialized, 0)
  }
  private fun KyberPublicKey_Serialize(publicKey: Long) : ByteArray {
    return Native.KyberPublicKey_Serialize(publicKey)
  }
  private fun KyberSecretKey_Deserialize(serialized: ByteArray) : Long {
    return Native.KyberSecretKey_Deserialize(serialized)
  }
  private fun KyberSecretKey_Serialize(secretKey: Long) : ByteArray {
    return Native.KyberSecretKey_Serialize(secretKey)
  }

  private fun KyberKeyPair_Generate() : Long {
    return Native.KyberKeyPair_Generate()
  }
  private fun KyberKeyPair_GetPublicKey(keyPair: Long) : Long {
    return Native.KyberKeyPair_GetPublicKey(keyPair)
  }
  private fun KyberKeyPair_GetSecretKey(keyPair: Long) : Long {
    return Native.KyberKeyPair_GetSecretKey(keyPair)
  }

  private fun IdentityKeyPair_Deserialize(serialized: ByteArray) : LongArray {
    return Native.IdentityKeyPair_Deserialize(serialized)
  }

  private fun IdentityKeyPair_Serialize(publicKey: Long, privateKey: Long) : ByteArray {
    return Native.IdentityKeyPair_Serialize(publicKey, privateKey)
  }
  private fun IdentityKeyPair_SignAlternateIdentity(publicKey: Long, privateKey: Long, otherPublicKey: Long) : ByteArray {
    return Native.IdentityKeyPair_SignAlternateIdentity(publicKey, privateKey, otherPublicKey)
  }

    // we are passing some arguments in array and receiving them as pairs for reducing the number of parameters to >= 8. we can clean it up further by putting it in a Record class whih is expo's max limit due to the limitations of generics in both Swift and Kotlin because this component must be implemented separately for each.
  private fun PreKeyBundle_New(
    registerationData: kotlin.Pair<Int, Int>,
    preKeyId: Int,
    preKeyPublic: Long,
    signedPreKeyId: Int,
    signedPreKeyData: kotlin.Pair< Long, ByteArray>,
    identityKey: Long,
    kyberPreKeyId: Int,
    kyberPreKeyData: kotlin.Pair< Long, ByteArray>
  ) : Long {
    var (registrationId, deviceId) = registerationData
    var (signedPreKeyPublic, signedPreKeySignature) = signedPreKeyData
    var (kyberPreKeyPublic, kyberPreKeySignature) = kyberPreKeyData

    return Native.PreKeyBundle_New(
      registrationId,
      deviceId,
      preKeyId,
      preKeyPublic,
      signedPreKeyId,
      signedPreKeyPublic,
      signedPreKeySignature,
      identityKey,
      kyberPreKeyId,
      kyberPreKeyPublic,
      kyberPreKeySignature
    )
  }
  private fun PreKeyBundle_GetDeviceId(preKeyBundle: Long) : Int {
    return Native.PreKeyBundle_GetDeviceId(preKeyBundle)
  }
  private fun PreKeyBundle_GetIdentityKey(preKeyBundle: Long) : Long {
    return Native.PreKeyBundle_GetIdentityKey(preKeyBundle)
  }
  private fun PreKeyBundle_GetPreKeyId(preKeyBundle: Long) : Int {
    return Native.PreKeyBundle_GetPreKeyId(preKeyBundle)
  }
  private fun PreKeyBundle_GetPreKeyPublic(preKeyBundle: Long) : Long {
    return Native.PreKeyBundle_GetPreKeyPublic(preKeyBundle)
  }
  private fun PreKeyBundle_GetRegistrationId(preKeyBundle: Long) : Int {
    return Native.PreKeyBundle_GetRegistrationId(preKeyBundle)
  }
  private fun PreKeyBundle_GetSignedPreKeyId(preKeyBundle: Long) : Int {
    return Native.PreKeyBundle_GetSignedPreKeyId(preKeyBundle)
  }
  private fun PreKeyBundle_GetSignedPreKeyPublic(preKeyBundle: Long) : Long {
    return Native.PreKeyBundle_GetSignedPreKeyPublic(preKeyBundle)
  }
  private fun PreKeyBundle_GetSignedPreKeySignature(preKeyBundle: Long) : ByteArray {
    return Native.PreKeyBundle_GetSignedPreKeySignature(preKeyBundle)
  }
  private fun PreKeyBundle_GetKyberPreKeyId(preKeyBundle: Long) : Int {
    return Native.PreKeyBundle_GetKyberPreKeyId(preKeyBundle)
  }
  private fun PreKeyBundle_GetKyberPreKeyPublic(preKeyBundle: Long) : Long {
    return Native.PreKeyBundle_GetKyberPreKeyPublic(preKeyBundle)
  }
  private fun PreKeyBundle_GetKyberPreKeySignature(preKeyBundle: Long) : ByteArray {
    return Native.PreKeyBundle_GetKyberPreKeySignature(preKeyBundle)
  }

  private fun PreKeyRecord_New(id: Int, pubKey: Long, privKey: Long) : Long {
    return Native.PreKeyRecord_New(id, pubKey, privKey)
  }
  private fun PreKeyRecord_Deserialize(serialized: ByteArray) : Long {
    return Native.PreKeyRecord_Deserialize(serialized)
  }
  private fun PreKeyRecord_GetId(preKeyRecord: Long) : Int {
    return Native.PreKeyRecord_GetId(preKeyRecord)
  }
  private fun PreKeyRecord_GetPrivateKey(preKeyRecord: Long) : Long {
    return Native.PreKeyRecord_GetPrivateKey(preKeyRecord)
  }
  private fun PreKeyRecord_GetPublicKey(preKeyRecord: Long) : Long {
    return Native.PreKeyRecord_GetPublicKey(preKeyRecord)
  }
  private fun PreKeyRecord_Serialize(preKeyRecord: Long) : ByteArray {
    return Native.PreKeyRecord_GetSerialized(preKeyRecord)
  }

  private fun SignedPreKeyRecord_New(id: Int, timestamp: Long, pubKey: Long, privKey: Long, signature: ByteArray) : Long {
    return Native.SignedPreKeyRecord_New(id, timestamp, pubKey, privKey, signature)
  }
  private fun SignedPreKeyRecord_Deserialize(serialized: ByteArray) : Long {
    return Native.SignedPreKeyRecord_Deserialize(serialized)
  }
  private fun SignedPreKeyRecord_GetId(signedPreKeyRecord: Long) : Int {
    return Native.SignedPreKeyRecord_GetId(signedPreKeyRecord)
  }
  private fun SignedPreKeyRecord_GetPrivateKey(signedPreKeyRecord: Long) : Long {
    return Native.SignedPreKeyRecord_GetPrivateKey(signedPreKeyRecord)
  }
  private fun SignedPreKeyRecord_GetPublicKey(signedPreKeyRecord: Long) : Long {
    return Native.SignedPreKeyRecord_GetPublicKey(signedPreKeyRecord)
  }
  private fun SignedPreKeyRecord_Serialize(signedPreKeyRecord: Long) : ByteArray {
    return Native.SignedPreKeyRecord_GetSerialized(signedPreKeyRecord)
  }
  private fun SignedPreKeyRecord_GetSignature(signedPreKeyRecord: Long) : ByteArray {
    return Native.SignedPreKeyRecord_GetSignature(signedPreKeyRecord)
  }
  private fun SignedPreKeyRecord_GetTimestamp(signedPreKeyRecord: Long) : Long {
    return Native.SignedPreKeyRecord_GetTimestamp(signedPreKeyRecord)
  }

  private fun KyberPreKeyRecord_New(id: Int, timestamp: Long, keyPair: Long, signature: ByteArray) : Long {
    return Native.KyberPreKeyRecord_New(id, timestamp, keyPair, signature)
  }
  private fun KyberPreKeyRecord_Serialize(kyberPreKeyRecord: Long) : ByteArray {
    return Native.KyberPreKeyRecord_GetSerialized(kyberPreKeyRecord)
  }
  private fun KyberPreKeyRecord_Deserialize(serialized: ByteArray) : Long {
    return Native.KyberPreKeyRecord_Deserialize(serialized)
  }
  private fun KyberPreKeyRecord_GetId(kyberPreKeyRecord: Long) : Int {
    return Native.KyberPreKeyRecord_GetId(kyberPreKeyRecord)
  }
  private fun KyberPreKeyRecord_GetKeyPair(kyberPreKeyRecord: Long) : Long {
    return Native.KyberPreKeyRecord_GetKeyPair(kyberPreKeyRecord)
  }
  private fun KyberPreKeyRecord_GetPublicKey(kyberPreKeyRecord: Long) : Long {
    return Native.KyberPreKeyRecord_GetPublicKey(kyberPreKeyRecord)
  }
  private fun KyberPreKeyRecord_GetSecretKey(kyberPreKeyRecord: Long) : Long {
    return Native.KyberPreKeyRecord_GetSecretKey(kyberPreKeyRecord)
  }
  private fun KyberPreKeyRecord_GetSignature(kyberPreKeyRecord: Long) : ByteArray {
    return Native.KyberPreKeyRecord_GetSignature(kyberPreKeyRecord)
  }
  private fun KyberPreKeyRecord_GetTimestamp(kyberPreKeyRecord: Long) : Long {
    return Native.KyberPreKeyRecord_GetTimestamp(kyberPreKeyRecord)
  }
}
