import {registerSW} from './registerSw.js';
import {fade, preloader} from './anims.js';
import {postData} from './makeRequests.js';
import {getMotorSpeed, getFlowSpeed} from '../component/updateNeedle.js';
import {getDeviceSequence} from '../component/updateDevice.js';

document.addEventListener('DOMContentLoaded', function(){

	// REGISTER SW
	// registerSW();
	preloader();
	// fade();
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

	const loadPage = (page) => {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				let content = document.querySelector(".body-content");
				if(this.status == 200) {
					content.innerHTML = xhttp.responseText;
					if(page === "dashboard"){
						fade();
						getDeviceSequence();
						$(".refresh").click(() => {
							getDeviceSequence();
						})
					} else if(page === "log"){
						fade();
					} else {
						fade("monitor");
						getMotorSpeed();
						getFlowSpeed();
						$("#execSpeed").click(() => {
							postData($('#takeSpeed')[0].value);
							setTimeout(() => {
								getMotorSpeed();
							}, 2000)
					    })
					    getFlowSpeed("continuous");
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
