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

const getFlowSpeed = (arg) => {
	const execFlowSpeed = () => {
		let display
		getData('flow')
			.then((result) => {
				let count = result["speed"] * 3;
				$('.needle').eq(1).css("transform", `rotate(${count}deg)`);
				let display = `${result["speed"]} L/min`;
				$('.gauge-center').eq(1).attr('data-content', display)
			})
			.catch((err) => {
				console.error(err);
				M.toast({html: "Error while getting data!"})
			});
	}
	if(arg === ""){
		execFlowSpeed();
		M.toast({html: "Data updated!"})	
	} else {
		const doHeavyTask = (params) => {
			let totalMillisAllotted = params.totalMillisAllotted;
			let totalTasks = params.totalTasks;
			let tasksPerTick = params.tasksPerTick;
			let tasksCompleted = 0;
			let totalTicks = Math.ceil(totalTasks / tasksPerTick);
			let interval = null;
			    
			if (totalTicks === 0) return;

			let doTick = function() {
				let totalByEndOfTick = Math.min(tasksCompleted + tasksPerTick, totalTasks);

				do {
				  params.task(tasksCompleted++);
				} while(tasksCompleted < totalByEndOfTick);
				 
				if (tasksCompleted >= totalTasks) clearInterval(interval);
			};

			doTick();
			if (totalTicks > 1) interval = setInterval(doTick, totalMillisAllotted / totalTicks);
		}

		doHeavyTask({
		totalMillisAllotted: 99999999 * 1500,
		totalTasks: 99999999,
		tasksPerTick: 1,
		task: function(n) { execFlowSpeed(); }
		});
	}
}

export {getMotorSpeed, getFlowSpeed}