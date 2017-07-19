const express=require('express');
const hbs=require('hbs');
const geocode=require('./geocode/geocode');
const weatherData=require('./weatherData/weatherdata');
const iplocation=require('./iplocation/iplocation');
var requestIp = require('request-ip');


const port=process.env.PORT || 3000;
process.env.PWD = process.cwd();
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

hbs.registerHelper('year',()=>{
		return (new Date()).getFullYear();
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
app.use(express.static(process.env.PWD + '/public'));
hbs.registerPartials(process.env.PWD+'/views/partials');
app.get('/',(req,res)=>{
	var ip=requestIp.getClientIp(req);
	if(req._parsedOriginalUrl.query){
	geocode.fetchAddress(req._parsedOriginalUrl.query,(errorMessage,result)=>{
	if(errorMessage){
		console.log(errorMessage);
		res.render('index.hbs',{
			Message: errorMessage
		});
	}
	else{
		fetchWeather(result,(page,data)=>{
				if(page === 1)					
					res.render('index.hbs',{
						Message: "Unable to fetch weather.Try Again" 
					});
				else
					res.render('report.hbs',data);
			});
			
	}
});	}
	else{
			iplocation.findLocation(ip,(error,result)=>{
					if(error){
						res.render('index.hbs',{Message:"Welcome"});
					}
					else
					{
						fetchWeather(result,(page,data)=>{
						console.log(`IP RESULT ${result}`);	
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
				console.log(error);
				callback(1,undefined);
			}
			else{
				var current = weatherData.currentData(data,1);
				callback(2,current);	
			}
	});
}

app.listen(port,()=>console.log(`Server listining on port ${port}`));
