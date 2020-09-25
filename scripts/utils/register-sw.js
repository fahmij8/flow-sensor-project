const registerSW = () => { 
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./register-asset.js', {scope: './'})
        .then(function(ok) {
          console.log('[SW] = OK!\n', ok);
        })
        .catch(function(err){
          console.log('[SW] = Failed!\n', err);
        });
    })
  } else {
    console.error("[SW] = Unsupported!")
  }
}

export {registerSW}