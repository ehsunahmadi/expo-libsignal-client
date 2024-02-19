import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoLibsignalClient.web.ts
// and on native platforms to ExpoLibsignalClient.ts
import ExpoLibsignalClientModule from './ExpoLibsignalClientModule';
import ExpoLibsignalClientView from './ExpoLibsignalClientView';
import { ChangeEventPayload, ExpoLibsignalClientViewProps } from './ExpoLibsignalClient.types';

// Get the native constant value.
export const PI = ExpoLibsignalClientModule.PI;

export function hello(): string {
  return ExpoLibsignalClientModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoLibsignalClientModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoLibsignalClientModule ?? NativeModulesProxy.ExpoLibsignalClient);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoLibsignalClientView, ExpoLibsignalClientViewProps, ChangeEventPayload };
