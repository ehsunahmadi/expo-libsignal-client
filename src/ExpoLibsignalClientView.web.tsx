import * as React from 'react';

import { ExpoLibsignalClientViewProps } from './ExpoLibsignalClient.types';

export default function ExpoLibsignalClientView(props: ExpoLibsignalClientViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
