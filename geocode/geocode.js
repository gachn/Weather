const request=require('request');
var fetchAddress=(userAddress,callback) =>{
var encodedAddress=encodeURIComponent(userAddress);
var reqAddress=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
request({url:reqAddress,json:true},(error,response,body)=> {
	 
	 if(error){
	 	callback('Unable to connect to Google Server');
	 }
	 else if(body.status==='ZERO_RESULTS'){
			callback(`Unable to find the Address ${userAddress}`);
	 }
	 else if(body.status==='OK'){
	 callback(undefined,{	
   	  address :body.results[0].formatted_address,
   	  latitude :body.results[0].geometry.location.lat,
   	  longitude :body.results[0].geometry.location.lng
   	 }
   	 );
   	}
   	else callback(`Unknown Error`);
	 	
});
}
module.exports={
	fetchAddress
}