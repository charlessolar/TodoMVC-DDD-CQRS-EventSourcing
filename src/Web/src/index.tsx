import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import { render } from 'react-dom';

import { config } from './app/config';
import Log from 'utils/log';
import install from 'utils/validators';

import { App } from 'app';

Log(config.debug.log);
install();

function hideLoading() {
    const loadingEl = document.getElementById('loading');
    loadingEl.classList.add('m-fadeOut');
}

setTimeout(() => {
    hideLoading();
    render(<App />, document.getElementById('application'));
}, 1000);
