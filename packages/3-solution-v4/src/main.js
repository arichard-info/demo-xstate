import { inspect } from '@xstate/inspect';

import 'common/style';
import App from './App.svelte';

inspect({
	url: 'https://statecharts.io/inspect',
	iframe: false
});

const app = new App({
	target: document.getElementById('app')
});

export default app;
