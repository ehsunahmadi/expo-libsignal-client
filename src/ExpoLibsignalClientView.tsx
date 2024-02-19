import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoLibsignalClientViewProps } from './ExpoLibsignalClient.types';

const NativeView: React.ComponentType<ExpoLibsignalClientViewProps> =
  requireNativeViewManager('ExpoLibsignalClient');

export default function ExpoLibsignalClientView(props: ExpoLibsignalClientViewProps) {
  return <NativeView {...props} />;
}
