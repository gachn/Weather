/**
 * Created by Gaurav on 7/13/2017.
 */
const yargs=require('yargs');
const request = require('request');
const geocode=require('./geocode/geocode.js')
const argv = yargs
.options({
	a:{
	demand : true,
	alias: 'address',
	describe: 'Address to fetch weather for',
	string : true
	}
})
.help()
.alias('help','h')
.argv;
geocode.fetchAddress(argv.a,(errorMessage,result)=>{
	if(errorMessage){
		console.log(errorMessage);
	}
	else{
	var weatherLink='https://api.darksky.net/forecast/41d93193455c08daab7e79013b0f5254/'+result.latitude+','+result.longitude;
    
    request({url:weatherLink,json:true},(error,response,body)=>{
	if(!error && response.statusCode === 200){

		console.log(`___________________________________`);
		
		console.log(`Weather Report of ${result.address}`);
		console.log(`___________________________________`);
		if(body.currently.summary){
		console.log(`Current summary : : ${body.currently.summary} and will be ${body.daily.data[0].summary}`);
		console.log(`----`);}
		console.log(`Current temperature is ${body.currently.temperature}F`);
		console.log(`----`);
		console.log(`It feel's like ${body.currently.apparentTemperature}F`);
		console.log(`----`);
		if(body.currently.windSpeed){
		console.log(`Wind Speed : : ${body.currently.windSpeed} mph` );
		console.log(`----`);}
		if(body.currently.visibility){
		console.log(`Visibility upto ${body.currently.visibility} m`);
		console.log(`----`);
	    }
		console.log(`Week summary : : ${body.daily.summary}`);
		
	}else{

		console.log(`unable to fetch`);
	}
});

	}
});

