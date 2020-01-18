/** Global definitions for developement **/

declare const NODE_ENV: string;
declare const GA_MEASUREMENT_ID: string;
declare let __DEV__: boolean;
declare let API_SERVER: string;
declare let VERSION: string;
declare let COMMITHASH: string;
declare let BRANCH: string;
declare let TIMESTAMP: string;
declare let DATE: string;
declare let TIME: string;
declare let FILENAME: string;

// these are provided via webpack ProvidePlugin config
declare var Debug: debug.Debug;
declare class Loading extends React.PureComponent<{ display: { loading: boolean, error?: boolean } }> { };

declare var React: typeof import("react");
declare var ReactDOM: typeof import("react-dom");
