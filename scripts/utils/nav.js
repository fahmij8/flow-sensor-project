import {registerSW} from './register-sw.js';
import {reqData} from './makerequest.js';

document.addEventListener('DOMContentLoaded', function(){

	// REGISTER SW
	// registerSW();

	const fade = () => {
		$('.body-content')[0].style.transition = "";
		$('.body-content')[0].style.opacity = 0;
		setTimeout(() => {
			$('.body-content')[0].style.transition = "opacity 1s";
			$('.body-content')[0].style.opacity = 1;
		}, 1000)
	}

	fade();
	let sideNav = document.querySelectorAll('.sidenav');
	M.Sidenav.init(sideNav);
	const loadNav = () => {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){

				if(this.status != 200) return;
				document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
					elm.innerHTML = xhttp.responseText;
				});

				document.querySelectorAll('.sidenav a, .topnav a').forEach(function(elm){
					elm.addEventListener('click', function(event){
						let sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();
						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open("GET", './templates/nav.html', true);
		xhttp.send();
	}
	loadNav();

	const getMotorSpeed = () => {
		let display
		reqData('motor', 'get')
			.then((result) => {
				let data = JSON.parse(JSON.parse(result))
				data = JSON.parse(data["m2m:cin"].con)
				$('#takeSpeed').attr("value",data["speed"]);
				let count = data["speed"] / 1.416;
				$('.needle')[0].style.transform = `rotate(${count}deg)`;
				// if (count < 150){
				// 	display = "Low Speed";
				// } else if ((count > 150) && (count < 200)){
				// 	display = "Medium Speed";
				// } else {
				// 	display = "Maximum Speed";
				// }
				$('.gauge-center').attr('data-content', display)
				M.toast({html: "Data updated!"})
			})
			.catch((err) => {
				console.warn(err);
				M.toast({html: "Error while getting data!"})
			});
	}

	const loadPage = (page) => {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				let content = document.querySelector(".body-content");
				if(this.status == 200) {
					content.innerHTML = xhttp.responseText;
					if(page === "dashboard"){
						fade();
					} else if(page === "log"){
						fade();
					} else {
						fade();
						getMotorSpeed();
						$("#execSpeed").click(function() {
					        $.ajax({
							  url: "./scripts/utils/post-motor.php",
							  method: "POST",
							  data: {
							  	"datas": $('#takeSpeed')[0].value
							}
							}).then(() => {
								getMotorSpeed();
							})
					    })
					}
				} else if(this.status == 404) {
					content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
				} else {
					content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
				}
			}
		};
		xhttp.open("GET", './templates/'+page+'.html', true);
		xhttp.send();
	}
	let page = window.location.hash.substr(1);
	if(page == '') page = 'dashboard';
	loadPage(page);
});
