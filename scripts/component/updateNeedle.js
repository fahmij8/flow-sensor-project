import {getData} from '../utils/makeRequests.js';
const getMotorSpeed = () => {
	let display
	getData('motor')
		.then((result) => {
			$('#takeSpeed').attr("value", result["speed"]);
			let count = (result["speed"] - 180) * 2.4;
			$('.needle').eq(0).css("transform", `rotate(${count}deg)`);
			let display = ((result["speed"] - 180) * 100) / 75;
			display = parseInt(display).toString();
			display = `${display} %`;
			$('.gauge-center').eq(0).attr('data-content', display)
			M.toast({html: "Data updated!"})
		})
		.catch((err) => {
			console.error(err);
			M.toast({html: "Error while getting data!"})
		});
}

export {getMotorSpeed}