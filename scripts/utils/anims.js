const fade = async (arg="") => {
	const makeFade = () => {
		$('.body-content')[0].style.transition = "";
		$('.body-content')[0].style.opacity = 0;
		setTimeout(() => {
			$('.body-content')[0].style.transition = "opacity 1s";
			$('.body-content')[0].style.opacity = 1;
		}, 1000)
	}
	if(arg === "monitor"){
		let condition = sessionStorage.getItem('password');
		if(condition) {
			makeFade();
		} else {
			const { value: password } = await Swal.fire({
				title: 'Authorized only!',
				input: 'password',
				showCancelButton: false,
				inputValidator: (value) => {
					if (!value) {
					  fade("monitor");
					}
				}
			})

			const pass = "757069";
			const guess = CryptoJS.AES.decrypt(CryptoJS.AES.encrypt(password.toString() , "!@#$%^&*"), "!@#$%^&*");

			if (guess.toString() === pass) {
				makeFade();
				sessionStorage.setItem('password', 'filled');
			} else {
				fade("monitor");
				console.log(guess.toString());
			}
		}
	} else {
		makeFade();
	}
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