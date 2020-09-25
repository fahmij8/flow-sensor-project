importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

const urlsToCache = [
	{ url: './', revision: '1' },
	{ url: './index.html', revision: '1' },
	{ url: './manifest.json', revision: '1' },
	{ url: './assets/icons/Icon-144.png', revision: '1' },
	{ url: './assets/icons/Icon-192.png', revision: '1' },
	{ url: './assets/icons/Icon-36.png', revision: '1' },
	{ url: './assets/icons/Icon-48.png', revision: '1' },
	{ url: './assets/icons/Icon-512.png', revision: '1' },
	{ url: './assets/icons/Icon-72.png', revision: '1' },
	{ url: './assets/icons/Icon-96.png', revision: '1' },
	{ url: './scripts/utils/data-post.php', revision: '1' },
	{ url: './scripts/utils/data-req.php', revision: '1' },
	{ url: './scripts/utils/nav.js', revision: '1' },
	{ url: './scripts/utils/register-asset.js', revision: '1' },
	{ url: './scripts/utils/register-sw.js', revision: '1' },
	{ url: './scripts/vendor/materialize.js', revision: '1' },
	{ url: './styles/vendor/materialize.css', revision: '1' },
	{ url: './templates/dashboard.html', revision: '1' },
	{ url: './templates/log.html', revision: '1' },
	{ url: './templates/monitoring.html', revision: '1' },
	{ url: './templates/nav.html', revision: '1' }
]

if(workbox){
	console.log('[SW Asset] = OK!');
	// workbox.setConfig({ debug: true });
	// workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
	workbox.core.setCacheNameDetails({
	  prefix: '',
	  suffix: '',
	  precache: 'IF-Precache',
	  runtime: 'IF-Runtime',
	});
	
	// Set pre-cache
	workbox.precaching.precacheAndRoute(urlsToCache, {
		ignoreUrlParametersMatching: [/.*/],
	});

	// Set other cache
	workbox.routing.registerRoute(
	   ({url}) => url.origin,
	   new workbox.strategies.StaleWhileRevalidate({
	   	cacheName: 'IF-Cache',
	   })
	)
} else {
	console.error('[SW Asset] = Failed using workbox!')
}