import ExpoModulesCore

public class ExpoLibsignalClientModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoLibsignalClient")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

  }
}
