import * as React from 'react';
import glamorous from 'glamorous';

import { Context } from '../context';
import { config } from '../config';

interface FooterProps {
  version: string;
}

export default function Footer() {
  const FooterView = glamorous('footer')((_) => ({
    padding: 20,
    textAlign: 'center',
    // background: palette.primaryLight
  }));

  return class extends React.Component<FooterProps, {}> {

  public render() {
    const year = new Date().getFullYear();
    const { version } = this.props;
    return (
      <FooterView>
        <div>
          SpeedETab © {year} {version}
        </div>
      </FooterView>
    );
  }
};
}
