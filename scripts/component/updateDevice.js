import {getData} from '../utils/makeRequests.js';
const getDeviceSequence = async (arg="") => {
	let prevData, nextData;
    getData('motor')
    	.then(data => {
    		prevData = data;
    		setTimeout(() => {
    			getData('motor')
    			.then(data => {
    				nextData = data;
    				if (prevData.sequences === nextData.sequences){
						$('#statusdev1')[0].innerHTML = "<span>OFF</span>";
						$('#statusdev1 span').eq(0).css("background-color", "#f14444")
					} else {
						$('#statusdev1')[0].innerHTML = "<span>ON</span>";
						$('#statusdev1 span').eq(0).css("background-color", "#57b165")
					}
				getData('flow')
					.then(data => {
						prevData = data;
						setTimeout(() => {
							getData('flow')
								.then(data => {
									nextData = data;
				    				if (prevData.sequences === nextData.sequences){
										$('#statusdev2')[0].innerHTML = "<span>OFF</span>";
										$('#statusdev2 span').eq(0).css("background-color", "#f14444")
									} else {
										$('#statusdev2')[0].innerHTML = "<span>ON</span>";
										$('#statusdev2 span').eq(0).css("background-color", "#57b165")
									}
								})
						}, 1000)
					})
    			})
    			.catch(msg => {
    				M.toast({html:"Error Getting Next Data : Motor"})
    			})
    		},1000)
    	})
    	.catch(msg => {
    		M.toast({html:"Error Getting Prev Data : Motor"})
    	})
}

export {getDeviceSequence}