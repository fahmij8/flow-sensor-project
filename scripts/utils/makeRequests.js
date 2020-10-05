const getData = (destination) => {
	let endpoint;
	if (destination === "motor"){
		endpoint = "https://platform.antares.id:8443/~/antares-cse/antares-id/FlowSensorProject/motor/la"
	} else if (destination === "flow"){
		endpoint = "https://platform.antares.id:8443/~/antares-cse/antares-id/FlowSensorProject/flow/la"
	} else {
		endpoint = "https://platform.antares.id:8443/~/antares-cse/antares-id/FlowSensorProject/photodiode/la"
	}

	return new Promise((resolve, reject) => {
        $.ajax({
        url : "./scripts/utils/data-get.php",
        method : "POST" ,
        data: {"endpoint": endpoint},
        success : (res) => {
            console.log(`[R : ${new Date().toLocaleTimeString()}] = `, parseData(res))
            resolve(parseData(res))
        },
        error : (res) => {
            reject(res)
            console.error(res)
            M.toast({html: "Error while getting data!"})
        }
        })
    })
}

const postData = (data) => {
	data = `{\r\n  \"m2m:cin\": {\r\n    \"con\": \"{\\\"speed\\\":${data}}\"\r\n  }\r\n}`
	return new Promise((resolve, reject) => {
        $.ajax({
        url : "./scripts/utils/data-post.php",
        method : "POST" ,
        data: {"data": data},
        success : (res) => {
        	console.log(`[S : ${new Date().toLocaleTimeString()}] = `, parseData(res))
            resolve(parseData(res))
        },
        error : (res) => {
            reject(res)
            console.error(res)
            M.toast({html: "Error while posting data!"})
        }
        })
    })
}

const parseData = (data) => {
	data = JSON.parse(JSON.parse(data))
	data = JSON.parse(data["m2m:cin"].con)
	return data
}

export {getData, postData}