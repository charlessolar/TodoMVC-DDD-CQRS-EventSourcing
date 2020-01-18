
declare interface PageConfig extends UniversalRouterRoute {
  title?: string;
  icon?: ComponentType<SvgIconProps>;
  label?: JSX.Element | (() => JSX.Element);
  children?: PageConfig[];
}
declare interface NavigationConfig {
  title: string;
  pages: PageConfig[];
}
