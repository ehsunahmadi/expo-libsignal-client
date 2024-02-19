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
  }

  private fun HKDF_DeriveSecrets(outputLength: Int, ikm: ByteArray, label: ByteArray | null, salt: ByteArray | null) : ByteArray {
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
}
