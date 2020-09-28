import {getData} from '../utils/makeRequests.js';
const getDeviceSequence = () => {
	let prevData, nextData;
	getData('motor')
		.then((result) => {
			prevData =  result["sequences"];
			setTimeout(() => {
				getData('motor')
				.then((result) => {
					nextData = result["sequences"];
					if (prevData === nextData){
						$('#statusdev1')[0].innerHTML = "<span>OFF</span>";
						$('#statusdev1 span').eq(0).css("background-color", "#f14444")
					} else {
						$('#statusdev1')[0].innerHTML = "<span>ON</span>";
						$('#statusdev1 span').eq(0).css("background-color", "#57b165")
					}
					M.toast({html: "Data updated!"})
				})
				.catch((err) => {
					console.error(err);
					M.toast({html: "Error while getting data!"})
				});
			},2000)
		})
		.catch((err) => {
			console.error(err);
			M.toast({html: "Error while getting data!"})
		});
}

export {getDeviceSequence}