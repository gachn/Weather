const request = require('request');

var printWeather=(body)=>{
		
		if(body.currently.summary){
		console.log(`Current summary : : ${body.currently.summary} and will be ${body.daily.data[0].summary}`);
		console.log(`----`);}
		console.log(`Current temperature is ${body.currently.temperature} F`);
		console.log(`----`);
		console.log(`It feel's like ${body.currently.apparentTemperature} F`);
		console.log(`----`);
		if(body.currently.windSpeed){
		console.log(`Wind Speed : : ${body.currently.windSpeed} mph` );
		console.log(`----`);}
		if(body.currently.visibility){
		console.log(`Visibility upto ${body.currently.visibility} m`);
		console.log(`----`);
	    }
		console.log(`Week summary : : ${body.daily.summary}`);

}

var getWeather=(lat,lng,callback) =>{
var weatherLink='https://api.darksky.net/forecast/41d93193455c08daab7e79013b0f5254/'+lat+','+lng;
request({url:weatherLink,json:true},(error,response,body)=>{
	if(!error && response.statusCode === 200){
		callback(undefined,body);
	}
	else{
		callback(`unable to Connect`);
	}
});}
var makeday=(x)=>{
	if(x==0)
		return 'Sunday';
	if(x==1)
		return 'Monday';
	if(x==2)
		return 'Tuesday';
	if(x==3)
		return 'Wednesday';
	if(x==4)
		return 'Thrusday';
	if(x==5)
		return 'Friday';	
	if(x==6)
		return 'Saturday';
}

var toCelsius=(far)=>{
		return (((far - 32)*5)/9).toFixed(0)
	};
var currentData=(data,x)=>{
				var weatherReport = data.currently;
				var curDate= (new Date()).getDay();
				weatherReport.humidity=(weatherReport.humidity*100).toFixed(0);
				weatherReport.day1=data.daily.data[0];
				weatherReport.day1.day=makeday((curDate)%7);
				weatherReport.day2=data.daily.data[1];
				weatherReport.day2.day=makeday((curDate+1)%7);
				weatherReport.day3=data.daily.data[2];
				weatherReport.day3.day=makeday((curDate+2)%7);
				weatherReport.day4=data.daily.data[3];
				weatherReport.day4.day=makeday((curDate+3)%7);
				weatherReport.day5=data.daily.data[4];
				weatherReport.day5.day=makeday((curDate+4)%7);
				weatherReport.day6=data.daily.data[5];
				weatherReport.day6.day=makeday((curDate+5)%7);
				weatherReport.day7=data.daily.data[6];
				weatherReport.day7.day=makeday((curDate+6)%7);
				if(x==1){
				weatherReport.type='C';	
				weatherReport.temperature=toCelsius(weatherReport.temperature);
				weatherReport.day1.temperatureMax=toCelsius(weatherReport.day1.temperatureMax);
				weatherReport.day1.temperatureMin=toCelsius(weatherReport.day1.temperatureMin);
				weatherReport.day2.temperatureMax=toCelsius(weatherReport.day2.temperatureMax);
				weatherReport.day2.temperatureMin=toCelsius(weatherReport.day2.temperatureMin);
				weatherReport.day3.temperatureMax=toCelsius(weatherReport.day3.temperatureMax);
				weatherReport.day3.temperatureMin=toCelsius(weatherReport.day3.temperatureMin);
				weatherReport.day4.temperatureMax=toCelsius(weatherReport.day4.temperatureMax);
				weatherReport.day4.temperatureMin=toCelsius(weatherReport.day4.temperatureMin);
				weatherReport.day5.temperatureMax=toCelsius(weatherReport.day5.temperatureMax);
				weatherReport.day5.temperatureMin=toCelsius(weatherReport.day5.temperatureMin);
				weatherReport.day6.temperatureMax=toCelsius(weatherReport.day6.temperatureMax);
				weatherReport.day6.temperatureMin=toCelsius(weatherReport.day6.temperatureMin);
				weatherReport.day7.temperatureMax=toCelsius(weatherReport.day7.temperatureMax);
				weatherReport.day7.temperatureMin=toCelsius(weatherReport.day7.temperatureMin);
				}
				else{
				weatherReport.type='F';	
				weatherReport.temperature=weatherReport.temperature.toFixed(0);
				weatherReport.day1.temperatureMax=weatherReport.day1.temperatureMax.toFixed(0);
				weatherReport.day1.temperatureMin=weatherReport.day1.temperatureMin.toFixed(0);
				weatherReport.day2.temperatureMax=weatherReport.day2.temperatureMax.toFixed(0);
				weatherReport.day2.temperatureMin=weatherReport.day2.temperatureMin.toFixed(0);
				weatherReport.day3.temperatureMax=weatherReport.day3.temperatureMax.toFixed(0);
				weatherReport.day3.temperatureMin=weatherReport.day3.temperatureMin.toFixed(0);
				weatherReport.day4.temperatureMax=weatherReport.day4.temperatureMax.toFixed(0);
				weatherReport.day4.temperatureMin=weatherReport.day4.temperatureMin.toFixed(0);
				weatherReport.day5.temperatureMax=weatherReport.day5.temperatureMax.toFixed(0);
				weatherReport.day5.temperatureMin=weatherReport.day5.temperatureMin.toFixed(0);
				weatherReport.day6.temperatureMax=weatherReport.day6.temperatureMax.toFixed(0);
				weatherReport.day6.temperatureMin=weatherReport.day6.temperatureMin.toFixed(0);
				weatherReport.day7.temperatureMax=weatherReport.day7.temperatureMax.toFixed(0);
				weatherReport.day7.temperatureMin=weatherReport.day7.temperatureMin.toFixed(0);
											
				}
				console.log(weatherReport.day1.day);
				return weatherReport;
}
module.exports={
	getWeather,
	printWeather,
	currentData,
	makeday,
	toCelsius
}