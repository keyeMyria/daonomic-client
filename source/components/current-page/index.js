// @flow
import * as React from 'react';
import { inject } from 'mobx-react';
import AppLayout from '~/components/app-layout';
import SignIn from '~/pages/sign-in';
import SignUp from '~/pages/sign-up';
import ResetPassword from '~/pages/reset-password';
import CreateNewPassword from '~/pages/create-new-password';
import BuyTokens from '~/pages/buy-tokens';
import CreateWallet from '~/pages/create-wallet';
import Faq from '~/pages/faq';

import type { Route } from '~/router/types';

type Props = {|
  currentRoute: ?Route,
|};

class CurrentPage extends React.Component<Props> {
  render() {
    const { currentRoute } = this.props;

    if (!currentRoute) {
      return null;
    }

    const currentPageName = currentRoute.name;
    let appLayoutContent = null;

    switch (currentPageName) {
      case 'signIn': {
        return <SignIn />;
      }

      case 'signUp': {
        return <SignUp />;
      }

      case 'resetPassword': {
        return <ResetPassword />;
      }

      case 'createNewPassword': {
        return <CreateNewPassword token={currentRoute.params.token} />;
      }

      case 'app': {
        break;
      }

      case 'buyTokens': {
        appLayoutContent = <BuyTokens />;
        break;
      }

      case 'createWallet': {
        appLayoutContent = <CreateWallet />;
        break;
      }

      case 'faq': {
        appLayoutContent = <Faq />;
        break;
      }

      default: {
        (currentPageName: empty);
      }
    }

    return <AppLayout>{appLayoutContent}</AppLayout>;
  }
}

export default inject(({ router }): Props => ({
  currentRoute: router.currentRoute,
}))(CurrentPage);
