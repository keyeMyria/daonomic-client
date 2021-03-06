// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { Button, Panel } from '@daonomic/ui';
import Navigation from '~/components/navigation';
import Burger from '~/components/burger';
import styles from './header.css';
import getRouteUrl from '~/router/get-route-url';
import getMarker from '~/utils/get-marker';
import { getTranslation } from '~/i18n';

type InjectedProps = {|
  currentRouteName: string,
  onLogout: () => void,
|};

type Props = InjectedProps & {
  className?: string,
};

type State = {
  isNavigationExpanded: boolean,
};

@observer
class Header extends React.Component<Props, State> {
  state = {
    isNavigationExpanded: false,
  };

  marker = getMarker('header');

  componentDidUpdate = (prevProps: Props) => {
    this.collapseNavigationIfCurrentRouteChanged(prevProps.currentRouteName);
  };

  collapseNavigationIfCurrentRouteChanged = (prevRouteName: string) => {
    if (prevRouteName !== this.props.currentRouteName) {
      this.setState({
        isNavigationExpanded: false,
      });
    }
  };

  handleToggleNavigation = () => {
    this.setState((state) => ({
      isNavigationExpanded: !state.isNavigationExpanded,
    }));
  };

  handleClickLogout = () => {
    this.props.onLogout();
  };

  renderNavigation = () => {
    const items = [
      { routeName: 'buyTokens', title: 'Buy Tokens' },
      { routeName: 'createWallet', title: 'Create Wallet' },
      { routeName: 'faq', title: 'For Investors' },
    ];

    return (
      <Navigation>
        {items.map(({ routeName, title }) => (
          <Navigation.Item
            key={routeName}
            isActive={routeName === this.props.currentRouteName}
            href={getRouteUrl(routeName)}
          >
            {title}
          </Navigation.Item>
        ))}
      </Navigation>
    );
  };

  render() {
    const { className } = this.props;
    const { isNavigationExpanded } = this.state;

    return (
      <Panel data-marker={this.marker()} className={cn(className, styles.root)}>
        <div className={styles.left}>
          <Burger
            isActive={isNavigationExpanded}
            onClick={this.handleToggleNavigation}
          />
        </div>

        <div
          className={cn(styles.navigation, {
            [styles.navigation_expanded]: isNavigationExpanded,
          })}
        >
          {this.renderNavigation()}
        </div>

        <div className={styles.right}>
          <Button
            data-marker={this.marker('logout')()}
            size="m"
            design="secondary"
            onClick={this.handleClickLogout}
          >
            {getTranslation('auth:logout')}
          </Button>
        </div>
      </Panel>
    );
  }
}

export default inject(({ auth, router }): InjectedProps => ({
  currentRouteName: router.currentRoute.name,
  onLogout: auth.logout,
}))(Header);
