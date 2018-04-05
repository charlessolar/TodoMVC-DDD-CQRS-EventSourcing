import * as React from 'react';

import Fade from 'material-ui/transitions/Fade';
import { CircularProgress } from 'material-ui/Progress';

import { Context } from '../context';

interface AsyncViewProps {
  url?: string;
  component?: any;
  store?: any;

  action?: Promise<{}>;
  getComponent?: (url?: string, cb?: (props: AsyncViewProps) => void) => Promise<any>;
  loading?: () => any;
}
interface AsyncViewState {
  componentData: any;
  error: any;
  loading: boolean;
}

export default function AsyncView(context: Context) {

  return class extends React.Component<AsyncViewProps, AsyncViewState> {
    constructor(props) {
      super(props);
      this.state = {
        componentData: null,
        error: null,
        loading: false
      };
    }

    public componentDidMount() {
      this.loadComponent();
    }
    public componentWillReceiveProps(nextProps: any) {
      if (this.props.url && this.props.url !== nextProps.url) {
        this.setState(
          {
            componentData: null
          },
          () => {
            this.loadComponent();
          }
        );
      }
    }

    public loadComponent() {
      if (this.props.store) {
        this.setState({ loading: true });
        this.props.store.fetch().then(async () => {
          this.setState({ loading: false });
        });
      }

      if (this.props.component) {
        return this.setState({
          componentData: this.props.component
        });
      }
      const componentData = this.props.getComponent(
        this.props.url,
        ({ component }) => {
          // Named param for making callback future proof
          if (component) {
            this.setState({
              componentData: component
            });
          }
        }
      );

      // In case returned value was a promise
      if (componentData && componentData.then) {

        // IIFE to check if a later ending promise was creating a race condition
        // Check test case for more info
        (url => {
          componentData.then(component => {
            if (url === this.props.url) {
              this.setState({
                // component is `import` so call the default export with context
                componentData: component.default(context)
              });
            }
            return true;
          }).catch(e => {
            this.setState({
              error: e
            });
          });
        })(this.props.url);
      }
    }
    public render() {
      if (this.state.componentData && !this.state.loading) {
        return React.createElement(this.state.componentData, this.props);
      } else if (this.props.loading) {
        const loadingComponent = this.props.loading();
        return loadingComponent;
      }
      return (
        <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Fade
            in={true}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </div>
      );
    }
  };
}
