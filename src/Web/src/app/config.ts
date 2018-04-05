interface BuildInfo {
  version: string;
  commitHash: string;
  branch: string;
  timestamp: string;
  date: string;
  time: string;
}
interface DebugInfo {
  log: boolean;
}
interface AnalyticsInfo {
  google: string;
}

export interface Config {
  title: string;
  description: string;
  apiUrl: string;
  analytics: AnalyticsInfo;
  debug: DebugInfo;
  build: BuildInfo;
}

const defaultConfig = {
  general: {
    title: 'TodoMVC',
    description: 'Implementation of basic Todo app via tastejs/todomvc in C#/Typescript with eventsourcing, cqrs, and domain driven design',
    apiUrl: API_SERVER,
    analytics: {
      google: ''
    },
    debug: {
      log: false
    },
    build: {
      version: VERSION,
      commitHash: COMMITHASH,
      branch: BRANCH,
      timestamp: TIMESTAMP,
      date: DATE,
      time: TIME
    }
  },

  development: {
    env: 'development',
    debug: {
      log: true
    }
  },
  staging: {
    env: 'staging',
    debug: {
      log: true
    }
  },
  production: {
    env: 'production',
    debug: {
      log: false
    }
  }
};
export const config: Config = { ...defaultConfig.general, ...defaultConfig[process.env.NODE_ENV] };
