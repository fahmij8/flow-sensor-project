const fade = () => {
	$('.body-content')[0].style.transition = "";
	$('.body-content')[0].style.opacity = 0;
	setTimeout(() => {
		$('.body-content')[0].style.transition = "opacity 1s";
		$('.body-content')[0].style.opacity = 1;
	}, 1000)
}

const preloader = () => {
	let preWrap = document.getElementsByClassName('lds-wrapper');
	let preSpin = document.getElementsByClassName('lds-roller');

	// Fade spin 
	preSpin[0].style.opacity = '0';
	preSpin[0].style.transition = 'opacity 1s';
	// Fade Wrapper
	preWrap[0].style.backgroundColor = '#ffffff00';
	preWrap[0].style.transition = 'background-color 2s';
	// Empty element
	setTimeout(() => {
		preWrap[0].innerHTML = '';
		preWrap[0].style = '';
		preWrap[0].classList = '';
	}, 900)
}
export {fade, preloader}