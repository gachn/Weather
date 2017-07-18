const request=require('request');

var findLocation=(ip,callback)=>{
	var ipUrl=`http://ip-api.com/json/${ip}`;
	console.log(ipUrl);
	request({url:ipUrl,json:true},(error,response,body)=>{
		console.log(`Status : ${JSON.stringify(error,undefined,2)}`);
	if(!error && response.statusCode === 200)
	{
		var result={
			latitude: body.lat,
			longitude: body.lon, 
			address: `${body.city} , ${body.country}`
	}
		console.log(result);
		callback(undefined,result);
	}
	else{
		callback('unable to Connect');
	}
	});
}
module.exports.findLocation=findLocation;