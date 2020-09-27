const fade = () => {
	$('.body-content')[0].style.transition = "";
	$('.body-content')[0].style.opacity = 0;
	setTimeout(() => {
		$('.body-content')[0].style.transition = "opacity 1s";
		$('.body-content')[0].style.opacity = 1;
	}, 1000)
}

export {fade}