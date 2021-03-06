// @flow
import * as React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

configure({
  enforceActions: true,
});

type MobxProviderProps = {
  children: React.Node,
  stores: {},
};

export default function MobxProvider(props: MobxProviderProps) {
  return <Provider {...props.stores}>{props.children}</Provider>;
}
