/**
 * Created by Gaurav on 7/13/2017.
 */
const yargs=require('yargs');
const request = require('request');
const geocode=require('./geocode/geocode');
const weatherData=require('./weatherData/weatherdata');
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
	console.log(`___________________________________`);	
		console.log(`Weather Report of ${result.address}`);
		console.log(`___________________________________`);	
	weatherData.getWeather(result.latitude,result.longitude,(error,data)=>{

				console.log(`latitude : ${result.latitude}`);
				console.log(`longitude : ${result.longitude}`);
			if(error){
				console.log(errorMessage);
				res.render('index.hbs');
			}
			else{
				weatherData.printWeather(data);
			}
	});
	}
});

