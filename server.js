const express=require('express');
const hbs=require('hbs');
const geocode=require('./geocode/geocode');
const weatherData=require('./weatherData/weatherdata');
const iplocation=require('./iplocation/iplocation');
var requestIp = require('request-ip');


const port=process.env.PORT || 3000;
var app=express();
var longitude,latitude,city;

var getCurrentDate=()=>{
	var date=new Date();
	var data={
		day: weatherData.makeday(date.getDay()),
		date: date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()
	}
	return data;
}
hbs.registerHelper('day',()=>{
		return getCurrentDate().day;
});
hbs.registerHelper('date',()=>{
		return getCurrentDate().date;
});
hbs.registerHelper('city',()=>{
		return city;
});
hbs.registerHelper('latitude',()=>{
		return latitude;
});
hbs.registerHelper('longitude',()=>{
		return longitude;
});

app.set('view engine','hbs');
app.use(express.static(__dirname+'/Public'));
hbs.registerPartials(__dirname+'/views/partials');
app.get('/',(req,res)=>{
	var ip=requestIp.getClientIp(req);;
	
	if(ip==='127.0.0.1'){
		ip='169.149.140.211';
		console.log(ip);	
	}
	if(req._parsedOriginalUrl.query){
	geocode.fetchAddress(req._parsedOriginalUrl.query,(errorMessage,result)=>{
	if(errorMessage){
		console.log(errorMessage);
		res.render('index.hbs');
	}
	else{
	console.log(`___________________________________`);	
		console.log(`Weather Report of ${result.address}`);
		console.log(`___________________________________`);	
			fetchWeather(result,(page,data)=>{
				if(page === 1)					
					res.render('index.hbs');
				else
					res.render('report.hbs',data);
			});
			
	}
});	}
	else{
			iplocation.findLocation(ip,(error,result)=>{
					if(error)
						res.render('index.hbs');
					else
					{
						fetchWeather(result,(page,data)=>{
						if(page === 1)					
						res.render('index.hbs');
						else
						res.render('report.hbs',data);
						});
					}
			});
	}
});
 
fetchWeather=(result,callback)=>{
		    city=result.address;
			longitude=result.longitude;
			latitude=result.latitude;
			weatherData.getWeather(result.latitude,result.longitude,(error,data)=>{
			if(error){
				console.log(errorMessage);
				callback(1,undefined);
			}
			else{
				console.log('in');
				console.log(`lat ${latitude} lng ${longitude}`);
				var current = weatherData.currentData(data,1);
				callback(2,current);	
			}
	});
}

app.listen(port,()=>console.log(`Server listining on port ${port}`));