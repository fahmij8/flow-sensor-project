const reqData = (destination, action) => {
	let file, type;
	let path = "./scripts/utils/";
	if (destination === "status"){
		file = "-status.php";
	} else if (destination === "motor"){
		file = "-motor.php";
	} else if (destination === "flow"){
		file = "-flow.php";
	} else {
		file = "-photodiode.php";
	}

	if (action === "get"){
		type = "get";
	} else {
		type = "post";
	}

	return new Promise((resolve, reject) => {
        $.ajax({
        url : path + type + file,
        type : type.toLocaleUpperCase() ,
            success : (res) => {
                resolve(res)
            },
            error : (res) => {
                reject(res)
            }
        })
    })
}

export {reqData}