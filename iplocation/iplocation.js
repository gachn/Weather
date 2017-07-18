const request=require('request');

var findLocation=(ip,callback)=>{
	var ipUrl=`http://ip-api.com/json/${ip}`;
	console.log(`${ipUrl}`);
	request({url:ipUrl,json:true},(error,response,body)=>{
	(!error && response.statusCode === 200){
		var result={
			latitude: body.lat,
			longitude: body.lon, 
			address: `${body.city} , ${body.country}`
		}

		callback(undefined,result);
	}
	else{
		callback('unable to Connect');
	}
	});
}
module.exports.findLocation=findLocation;