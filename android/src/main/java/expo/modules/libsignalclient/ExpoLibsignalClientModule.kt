package expo.modules.libsignalclient

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.signal.libsignal.internal.Native;

class ExpoLibsignalClientModule : Module() {  
  override fun definition() = ModuleDefinition {
    Name("ExpoLibsignalClient")

    Function("PrivateKey_Generate", this@ExpoLibsignalClientModule::PrivateKey_Generate)
    Function("PrivateKey_Deserialize", this@ExpoLibsignalClientModule::PrivateKey_Deserialize)
    Function("PrivateKey_Serialize", this@ExpoLibsignalClientModule::PrivateKey_Serialize)
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
}
