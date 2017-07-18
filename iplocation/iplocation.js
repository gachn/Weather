const request=require('request');

var findLocation=(ip,callback)=>{
	var ipUrl=`http://ip-api.com/json/+${ip}`;
	request({url:ip,json:true},(error,response,body)=>{
	if(!error && response.statusCode === 200){
		var result={
			latitude: body.lat,
			longitude: body.lng, 
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