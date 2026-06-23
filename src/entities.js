function Weather(id){
    this.name = '?';
    this.id = id || -1;
    this.ontick = function (){};
}

function define_weather() {
    window.weather = new Object();

    weather.sunny = new Weather(100);
    weather.sunny.name = 'Sunny';
    weather.sunny.c = 'yellow';

    weather.cloudy = new Weather(101);
    weather.cloudy.name = 'Cloudy';
    weather.cloudy.c = 'ghostwhite';

    weather.stormy = new Weather(102);
    weather.stormy.name = 'Stormy';
    weather.stormy.c = '#bdbdbd'; 

    weather.overcast = new Weather(103);
    weather.overcast.name = 'Overcast';
    weather.overcast.c = 'lightgrey';

    weather.storm = new Weather(104);
    weather.storm.name = 'Storm';
    weather.storm.c = 'lightgrey';
    weather.storm.bc = '#5a5a5a';
    weather.storm.frain = true;

    weather.thunder = new Weather(105);
    weather.thunder.name = 'Thunderstorm';
    weather.thunder.c = 'yellow';
    weather.thunder.bc = '#5a5a5a';
    weather.thunder.frain = true;

    weather.rain = new Weather(106);
    weather.rain.name = 'Rain';
    weather.rain.c = 'cyan';
    weather.rain.bc = '#2a3971';
    weather.rain.frain = true; 

    weather.heavyrain = new Weather(107);
    weather.heavyrain.name = 'Heavy rain';
    weather.heavyrain.c = 'cyan';
    weather.heavyrain.bc = '#4d5eb3';
    weather.heavyrain.frain = true;

    weather.misty = new Weather(108);
    weather.misty.name = 'Misty';
    weather.misty.bc = '#244b68'; 

    weather.foggy = new Weather(109);
    weather.foggy.name = 'Foggy';
    weather.foggy.bc = '#7c8b9a'; 

    weather.drizzle = new Weather(110);
    weather.drizzle.name = 'Drizzle';
    weather.drizzle.bc = '254863';
    weather.drizzle.frain = true; 

    weather.clear = new Weather(111);
    weather.clear.name = 'Clear'; 

    weather.snow = new Weather(112);
    weather.snow.name = 'Snow';
    weather.snow.c = 'white';
    weather.snow.bc = '#aaa';
    weather.snow.fsnow = true;

    weather.sstorm = new Weather(113);
    weather.sstorm.name = 'Snow Storm';
    weather.sstorm.c = 'white';
    weather.sstorm.bc = '#88a';
    weather.sstorm.fsnow = true;

    weather.storm.ontick = weather.rain.ontick = weather.heavyrain.ontick = weather.drizzle.ontick = function(){
        if (global.flags.inside === false) {
            if (effect.wet.active === false && !you.mods.rnprtk) {
                giveEff(you,effect.wet,5);
            }
            let f = findbyid(global.current_m.eff, effect.wet.id);
            if (!f || f.active === false) {
                giveEff(global.current_m,effect.wet,5);
            }
        }
    }

    weather.thunder.ontick = function(){
        if (global.flags.inside === false) {
            if (effect.wet.active === false && !you.mods.rnprtk) {
                giveEff(you, effect.wet, 5);
            }
            let f = findbyid(global.current_m.eff, effect.wet.id);
            if (!f || f.active === false) {
                giveEff(global.current_m,effect.wet,5);
            }
            if (random() < 0.0009){ 
                global.stat.lgtstk++;
                msg("You were struck by lightning!",'black',null,null,'yellow');
                let d = (200 / (1 + skl.aba.lvl * 0.05)) << 0; 
                if (you.hp - d < 0) {
                    global.atkdfty[0] = 1;
                    you.hp = 0;
                    you.onDeath();
                    giveSkExp(skl.painr, 300);
                    giveSkExp(skl.dth, 100)
                } else {
                    you.hp -= d;
                    giveSkExp(skl.painr, 170);
                }
                giveSkExp(skl.aba,30);
                dom.d5_1_1.update();
            }
        }
    }
}

function wManager(){
    let ses = getSeason();
    if (w_manager.duration>0) {
        w_manager.duration-=global.timescale;
    } else {
    let chance = rand(1, 100);
    switch(ses) {
        case 1: 
        switch (w_manager.curr.id){
            case weather.sunny.id: 
                if(chance<=10) setWeather(weather.cloudy, rand(120, 220));
                else if (chance>10&&chance<=20) setWeather(weather.overcast, rand(90, 280));
                else if (chance>20&&chance<=90&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(300, 500));
                else if (chance>20&&chance<=90&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(200, 400));
                else setWeather(weather.sunny, rand(22, 44));
            break;
            case weather.cloudy.id: 
                if(chance<=15) setWeather(weather.stormy, rand(100, 200));
                else if (chance>15&&chance<=35) setWeather(weather.overcast, rand(90, 220));
                else if (chance>35&&chance<=45) setWeather(weather.rain, rand(150, 250));
                else if (chance>45&&chance<=65) setWeather(weather.drizzle, rand(30, 80));
                else if (chance>65&&chance<=80&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(300, 500));
                else if (chance>65&&chance<=80&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(200, 400));
                else setWeather(weather.cloudy, rand(90,160));
            break;
            case weather.stormy.id:
                if(chance<10) setWeather(weather.cloudy, rand(90, 120));
                else if (chance>10&&chance<=40) setWeather(weather.storm, rand(90, 160));
                else if (chance>40&&chance<=60) setWeather(weather.rain, rand(120, 200));
                else if (chance>60&&chance<=75) setWeather(weather.drizzle, rand(20, 40));
                else setWeather(weather.stormy, rand(60,120));
            break;
            case weather.storm.id: 
                if(chance<5) setWeather(weather.stormy, rand(80, 120));
                else if (chance>5&&chance<=65) setWeather(weather.rain, rand(180, 250));
                else if (chance>65&&chance<=75) setWeather(weather.heavyrain, rand(80, 150));
                else setWeather(weather.storm, rand(20,80));
            break;
            case weather.overcast.id: 
                if(chance<20) setWeather(weather.stormy, rand(50, 120));
                else if (chance>20&&chance<=45) setWeather(weather.cloudy, rand(100, 200));
                else if (chance>45&&chance<=60) setWeather(weather.clear, rand(150, 250));
                else setWeather(weather.overcast, rand(40,90));
            break;
            case weather.rain.id: 
                if(chance<10) setWeather(weather.drizzle, rand(30, 50));
                else if (chance>10&&chance<=20) setWeather(weather.heavyrain, rand(100, 200));
                else if (chance>20&&chance<=30) setWeather(weather.overcast, rand(52, 173));
                else if (chance>30&&chance<=55) setWeather(weather.misty, rand(25, 55));
                else if (chance>55&&chance<=80) setWeather(weather.clear, rand(225, 455));
                else setWeather(weather.rain, rand(80,120));
            break;
            case weather.heavyrain.id: 
                if(chance<10) setWeather(weather.storm, rand(80, 130));
                else if (chance>10&&chance<=65) setWeather(weather.rain, rand(100, 170));
                else if (chance>65&&chance<=75) setWeather(weather.misty, rand(15, 40));
                else if (chance>75&&chance<=80) setWeather(weather.clear, rand(110, 200));
                else if (chance>80&&chance<=90) setWeather(weather.thunder, rand(120, 200));
                else setWeather(weather.heavyrain, rand(50,100));
            break;
            case weather.misty.id: 
                if(chance<50) setWeather(weather.foggy, rand(22, 33));
                else if (chance>50&&chance<=80&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 200));
                else if (chance>50&&chance<=80&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 200));
                else setWeather(weather.misty, rand(11,22));
            break;
            case weather.foggy.id: 
                if(chance<20) setWeather(weather.overcast, rand(80, 130));
                else if (chance>20&&chance<=70&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 200));
                else if (chance>20&&chance<=70&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 200));
                else setWeather(weather.foggy, rand(11,22));
            break;
            case weather.drizzle.id: 
                if(chance<20) setWeather(weather.overcast, rand(30, 60));
                else if (chance>20&&chance<=50) setWeather(weather.rain, rand(90, 180));
                else if (chance>50&&chance<=65) setWeather(weather.clear, rand(90, 180));
                else setWeather(weather.drizzle, rand(30,62));      
            break;
            case weather.clear.id: 
                if(chance<10) setWeather(weather.overcast, rand(30, 60));
                else if (chance>10&&chance<=55&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 200));
                else if (chance>10&&chance<=55&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 200));
                else if (chance>55&&chance<=65) setWeather(weather.cloudy, rand(100, 200));
                else setWeather(weather.clear, rand(160,290));
            break;
            case weather.thunder.id: 
                if(chance<50) setWeather(weather.heavyrain, rand(60, 90));
                else if (chance>50&&chance<=80) setWeather(weather.storm, rand(80, 120));
                else setWeather(weather.thunder, rand(40,60));
            break;
            default: setWeather(weather.clear, rand(30,60)); break; 
        }
        break;
        case 2:
            switch (w_manager.curr.id){
              case weather.sunny.id: 
                if(chance<=5) setWeather(weather.cloudy, rand(60, 120));
                else if (chance>5&&chance<=90&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(400, 700));
                else if (chance>15&&chance<=90&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(300, 500));
                else setWeather(weather.sunny, rand(90, 180));
              break;
              case weather.cloudy.id: 
                if(chance<=3) setWeather(weather.stormy, rand(30, 60));
                else if (chance>3&&chance<=8) setWeather(weather.overcast, rand(40, 120));
                else if (chance>8&&chance<=15) setWeather(weather.rain, rand(50, 100));
                else if (chance>15&&chance<=25) setWeather(weather.drizzle, rand(30, 80));
                else if (chance>25&&chance<=80&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(300, 500));
                else if (chance>25&&chance<=80&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(200, 400));
                else setWeather(weather.cloudy, rand(40,120));
              break;
              case weather.stormy.id:
                if(chance<35) setWeather(weather.cloudy, rand(60, 120));
                else if (chance>35&&chance<=40) setWeather(weather.storm, rand(90, 160));
                else if (chance>40&&chance<=60) setWeather(weather.rain, rand(70, 120));
                else if (chance>60&&chance<=85) setWeather(weather.drizzle, rand(60, 900));
                else setWeather(weather.stormy, rand(60,120));
              break;
              case weather.storm.id: 
                if(chance<5) setWeather(weather.stormy, rand(30, 50));
                else if (chance>5&&chance<=65) setWeather(weather.rain, rand(140, 200));
                else if (chance>65&&chance<=70) setWeather(weather.heavyrain, rand(80, 150));
                else setWeather(weather.storm, rand(20,80));
              break;
              case weather.overcast.id: 
                if(chance<5) setWeather(weather.stormy, rand(20, 60));
                else if (chance>5&&chance<=45) setWeather(weather.cloudy, rand(100, 200));
                else if (chance>45&&chance<=65) setWeather(weather.clear, rand(150, 250));
                else setWeather(weather.overcast, rand(60,110));
              break;
              case weather.rain.id: 
                if(chance<10) setWeather(weather.drizzle, rand(50, 70));
                else if (chance>10&&chance<=15) setWeather(weather.heavyrain, rand(50, 80));
                else if (chance>15&&chance<=40) setWeather(weather.overcast, rand(82, 173));
                else if (chance>40&&chance<=55) setWeather(weather.misty, rand(25, 55));
                else if (chance>55&&chance<=80) setWeather(weather.clear, rand(225, 455));
                else setWeather(weather.rain, rand(80,120));
              break;
              case weather.heavyrain.id: 
                if(chance<10) setWeather(weather.storm, rand(80, 130));
                else if (chance>10&&chance<=65) setWeather(weather.rain, rand(100, 170));
                else if (chance>65&&chance<=75) setWeather(weather.misty, rand(15, 40));
                else if (chance>75&&chance<=87) setWeather(weather.clear, rand(110, 200));
                else if (chance>87&&chance<=90) setWeather(weather.thunder, rand(120, 200));
                else setWeather(weather.heavyrain, rand(50,100));
              break;
              case weather.misty.id: 
                if(chance<50) setWeather(weather.foggy, rand(22, 33));
                else if (chance>50&&chance<=80&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 200));
                else if (chance>50&&chance<=80&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 200));
                else setWeather(weather.misty, rand(11,22));
              break;
              case weather.foggy.id: 
                if(chance<20) setWeather(weather.overcast, rand(80, 130));
                else if (chance>20&&chance<=70&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 200));
                else if (chance>20&&chance<=70&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 200));
                else setWeather(weather.foggy, rand(11,22));
              break;
              case weather.drizzle.id: 
                if(chance<15) setWeather(weather.overcast, rand(30, 60));
                else if (chance>15&&chance<=40) setWeather(weather.cloudy, rand(90, 180));
                else if (chance>40&&chance<=50) setWeather(weather.rain, rand(50, 111));
                else if (chance>50&&chance<=65) setWeather(weather.clear, rand(90, 180));
                else setWeather(weather.drizzle, rand(30,62));      
              break;
              case weather.clear.id: 
                if(chance<5) setWeather(weather.overcast, rand(30, 60));
                else if (chance>5&&chance<=55&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 200));
                else if (chance>10&&chance<=55&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 200));
                else if (chance>55&&chance<=65) setWeather(weather.cloudy, rand(100, 200));
                else setWeather(weather.clear, rand(160,290));
              break;
              case weather.thunder.id: 
                if(chance<50) setWeather(weather.heavyrain, rand(60, 90));
                else if (chance>50&&chance<=80) setWeather(weather.storm, rand(80, 120));
                else setWeather(weather.thunder, rand(40,60));
              break;
              default: setWeather(weather.clear, rand(30,60)); break; 
            }
            break;
        case 3:
          switch (w_manager.curr.id){
            case weather.sunny.id: 
              if(chance<=25) setWeather(weather.cloudy, rand(120, 220));
              else if (chance>25&&chance<=60) setWeather(weather.overcast, rand(90, 280));
              else if (chance>60&&chance<=90&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(80, 150));
              else if (chance>60&&chance<=90&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(120, 180));
              else setWeather(weather.sunny, rand(22, 44));
            break;
            case weather.cloudy.id: 
              if(chance<=30) setWeather(weather.stormy, rand(100, 200));
              else if (chance>30&&chance<=55) setWeather(weather.overcast, rand(90, 220));
              else if (chance>55&&chance<=85) setWeather(weather.rain, rand(150, 250));
              else if (chance>85&&chance<=90) setWeather(weather.drizzle, rand(70, 120));
              else if (chance>90&&chance<=95&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(170, 250));
              else if (chance>90&&chance<=95&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(180, 300));
              else setWeather(weather.cloudy, rand(90,160));
            break;
            case weather.stormy.id:
              if(chance<15) setWeather(weather.cloudy, rand(90, 120));
              else if (chance>15&&chance<=40) setWeather(weather.storm, rand(90, 160));
              else if (chance>40&&chance<=70) setWeather(weather.rain, rand(120, 200));
              else if (chance>70&&chance<=85) setWeather(weather.drizzle, rand(20, 40));
              else setWeather(weather.stormy, rand(60,120));
            break;
            case weather.storm.id: 
              if(chance<10) setWeather(weather.stormy, rand(80, 120));
              else if (chance>10&&chance<=45) setWeather(weather.rain, rand(180, 250));
              else if (chance>45&&chance<=85) setWeather(weather.heavyrain, rand(100, 190));
              else setWeather(weather.storm, rand(20,80));
            break;
            case weather.overcast.id: 
              if(chance<20) setWeather(weather.stormy, rand(50, 120));
              else if (chance>20&&chance<=55) setWeather(weather.cloudy, rand(80, 150));
              else if (chance>55&&chance<=60) setWeather(weather.clear, rand(150, 250));
              else setWeather(weather.overcast, rand(40,90));
            break;
            case weather.rain.id: 
              if(chance<10) setWeather(weather.drizzle, rand(30, 50));
              else if (chance>10&&chance<=30) setWeather(weather.heavyrain, rand(100, 200));
              else if (chance>30&&chance<=40) setWeather(weather.overcast, rand(52, 173));
              else if (chance>40&&chance<=50) setWeather(weather.misty, rand(25, 55));
              else if (chance>50&&chance<=65) setWeather(weather.clear, rand(100, 200));
              else setWeather(weather.rain, rand(80,120));
            break;
            case weather.heavyrain.id: 
              if(chance<15) setWeather(weather.storm, rand(80, 130));
              else if (chance>15&&chance<=55) setWeather(weather.rain, rand(100, 170));
              else if (chance>55&&chance<=65) setWeather(weather.misty, rand(15, 40));
              else if (chance>65&&chance<=70) setWeather(weather.clear, rand(110, 200));
              else if (chance>70&&chance<=95) setWeather(weather.thunder, rand(120, 200));
              else setWeather(weather.heavyrain, rand(50,100));
            break;
            case weather.misty.id: 
              if(chance<25) setWeather(weather.foggy, rand(22, 33));
              else if (chance>25&&chance<=55) setWeather(weather.overcast, rand(60, 100));
              else if (chance>55&&chance<=75) setWeather(weather.cloudy, rand(60, 100));
              else setWeather(weather.misty, rand(11,22));
            break;
            case weather.foggy.id: 
              if(chance<20) setWeather(weather.overcast, rand(80, 130));
              else if (chance>20&&chance<=40) setWeather(weather.rain, rand(100, 200));
              else if (chance>40&&chance<=70) setWeather(weather.heavyrain, rand(100, 200));
              else setWeather(weather.foggy, rand(11,22));
            break;
            case weather.drizzle.id: 
              if(chance<15) setWeather(weather.overcast, rand(30, 60));
              else if (chance>15&&chance<=55) setWeather(weather.rain, rand(90, 180));
              else if (chance>55&&chance<=60) setWeather(weather.clear, rand(60, 100));
              else if (chance>60&&chance<=70) setWeather(weather.cloudy, rand(40, 90));
              else setWeather(weather.drizzle, rand(30,62));      
            break;
            case weather.clear.id: 
              if(chance<25) setWeather(weather.overcast, rand(80, 140));
              else if (chance>25&&chance<=45&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 200));
              else if (chance>25&&chance<=45&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 200));
              else if (chance>45&&chance<=70) setWeather(weather.cloudy, rand(100, 200));
              else if (chance>70&&chance<=90) setWeather(weather.drizzle, rand(30, 80));
              else setWeather(weather.clear, rand(120,200));
            break;
            case weather.thunder.id: 
              if(chance<30) setWeather(weather.heavyrain, rand(60, 90));
              else if (chance>30&&chance<=60) setWeather(weather.storm, rand(80, 120));
              else setWeather(weather.thunder, rand(40,60));
            break;
            default: setWeather(weather.clear, rand(30,60)); break; 
          }
          break;
        case 4:
          switch (w_manager.curr.id){
            case weather.sunny.id: 
              if(chance<=40) setWeather(weather.cloudy, rand(120, 220));
              else if (chance>40&&chance<=80) setWeather(weather.overcast, rand(90, 280));
              else if (chance>80&&chance<=90&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 300));
              else if (chance>80&&chance<=90&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 300));
              else setWeather(weather.sunny, rand(22, 44));
            break;
            case weather.cloudy.id: 
              if(chance<=15) setWeather(weather.overcast, rand(90, 220));
              else if (chance>15&&chance<=17) setWeather(weather.rain, rand(30, 80));
              else if (chance>17&&chance<=20) setWeather(weather.drizzle, rand(30, 80));
              else if (chance>20&&chance<=30&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 300));
              else if (chance>20&&chance<=30&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 300));
              else if (chance>30&&chance<=60) setWeather(weather.snow, rand(180, 300));
              else if (chance>60&&chance<=70) setWeather(weather.sstorm, rand(90, 200));
              else setWeather(weather.cloudy, rand(90,160));
            break;
            case weather.overcast.id: 
              if(chance<20) setWeather(weather.snow, rand(50, 120));
              else if (chance>20&&chance<=45) setWeather(weather.cloudy, rand(100, 200));
              else if (chance>45&&chance<=60) setWeather(weather.clear, rand(150, 250));
              else if (chance>60&&chance<=70) setWeather(weather.sstorm, rand(150, 250));
              else setWeather(weather.overcast, rand(40,90));
            break;
            case weather.rain.id: 
              if(chance<10) setWeather(weather.drizzle, rand(30, 50));
              else if (chance>10&&chance<=20) setWeather(weather.snow, rand(100, 200));
              else if (chance>20&&chance<=30) setWeather(weather.overcast, rand(52, 173));
              else if (chance>30&&chance<=55) setWeather(weather.misty, rand(25, 55));
              else if (chance>55&&chance<=80) setWeather(weather.clear, rand(225, 455));
              else setWeather(weather.rain, rand(20,40));
            break;
            case weather.misty.id: 
              if(chance<30) setWeather(weather.foggy, rand(22, 33));
              else if (chance>30&&chance<=50) setWeather(weather.snow, rand(100, 200));
              else if (chance>50&&chance<=80&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 200));
              else if (chance>50&&chance<=80&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 200));
              else setWeather(weather.misty, rand(11,22));
            break;
            case weather.foggy.id: 
              if(chance<20) setWeather(weather.overcast, rand(80, 130));
              else if (chance>20&&chance<=70&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 200));
              else if (chance>20&&chance<=70&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 200));
              else setWeather(weather.foggy, rand(11,22));
            break;
            case weather.drizzle.id: 
              if(chance<20) setWeather(weather.overcast, rand(30, 60));
              else if (chance>20&&chance<=25) setWeather(weather.rain, rand(90, 120));
              else if (chance>25&&chance<=40) setWeather(weather.snow, rand(90, 180));
              else if (chance>40&&chance<=65) setWeather(weather.clear, rand(90, 150));
              else setWeather(weather.drizzle, rand(30,62));      
            break;
            case weather.clear.id: 
              if(chance<10) setWeather(weather.overcast, rand(30, 60));
              else if (chance>10&&chance<=55&&getHour()>=5&&getHour()<=16) setWeather(weather.sunny, rand(100, 200));
              else if (chance>10&&chance<=55&&getHour()<5&&getHour()>16) setWeather(weather.clear, rand(100, 200));
              else if (chance>55&&chance<=65) setWeather(weather.cloudy, rand(100, 200));
              else if (chance>65&&chance<=75) setWeather(weather.snow, rand(100, 200));
              else setWeather(weather.clear, rand(160,290));
            break;
            case weather.snow.id: 
              if(chance<20) setWeather(weather.sstorm, rand(80, 130));
              else if (chance>20&&chance<=25) setWeather(weather.rain, rand(15, 50));
              else if (chance>25&&chance<=40) setWeather(weather.clear, rand(90, 150));
              else if (chance>40&&chance<=65) setWeather(weather.overcast, rand(140, 320));
              else if (chance>60&&chance<=85) setWeather(weather.cloudy, rand(120, 200));
              else setWeather(weather.snow, rand(30,62));      
            break;
            case weather.sstorm.id: 
              if(chance<10) setWeather(weather.overcast, rand(30, 60));
              else if (chance>10&&chance<=35) setWeather(weather.snow, rand(90, 120));
              else if (chance>35&&chance<=45) setWeather(weather.cloudy, rand(90, 180));
              else if (chance>45&&chance<=65) setWeather(weather.overcast, rand(90, 150));
              else setWeather(weather.sstorm, rand(40,120));      
            break;
            default: setWeather(weather.clear, rand(30,60)); break; 
          }
          break;
    } 
    dom.d_weathert.style.backgroundColor=dom.d_weathert.style.color='inherit'; 
    dom.d_weathert.innerHTML = w_manager.curr.name
    dom.d_weathert.style.color=w_manager.curr.c?w_manager.curr.c:'inherit'; dom.d_weathert.style.backgroundColor=w_manager.curr.bc?w_manager.curr.bc:'inherit';
    switch (w_manager.curr.id){
      case weather.sunny.id: 
        if ((getHour()>4&&getMinute()>=30)&&getHour()<=6) {
            dom.d_weathert.innerHTML='Sunrise';
            dom.d_weathert.style.color='#ffef33';
            dom.d_weathert.style.backgroundColor='#bf495f'
        } 
          else if(getHour()>=20&&getHour()<=21) {dom.d_weathert.innerHTML = 'Dusk';dom.d_weathert.style.color='yellow';dom.d_weathert.style.backgroundColor='#e8421c'}
          else if(getHour()>=22||getHour()<=3) {dom.d_weathert.innerHTML = 'Bright Night';dom.d_weathert.style.color='cornflowerblue';dom.d_weathert.style.backgroundColor='#1d4677'}
      break;
      case weather.cloudy.id: 
          if((getHour()>4&&getMinute()>=30)&&getHour()<=6) {dom.d_weathert.innerHTML='Sunrise';dom.d_weathert.style.color='#ffef33';dom.d_weathert.style.backgroundColor='#bf495f'}
          else if(getHour()>=22||getHour()<=3) {dom.d_weathert.innerHTML = 'Night';dom.d_weathert.style.color='#69e1e6';dom.d_weathert.style.backgroundColor='#091523'}
      break;
      case weather.overcast.id: 
          if(getHour()>=18&&getHour()<=21) {dom.d_weathert.innerHTML = 'Dusk';dom.d_weathert.style.color='yellow';dom.d_weathert.style.backgroundColor='#e8421c'}
          else if(getHour()>=22||getHour()<=3) {dom.d_weathert.innerHTML = 'Night';dom.d_weathert.style.color='#69e1e6';dom.d_weathert.style.backgroundColor='#091523'}
      break;
      case weather.rain.id: 
          if(getHour()>=22||getHour()<=3) {dom.d_weathert.innerHTML = 'Rainy Night';dom.d_weathert.style.color='cyan';dom.d_weathert.style.backgroundColor='#111f63'}
      break;
      case weather.misty.id: 
          if((getHour()>4&&getMinute()>=30)&&getHour()<=6) {dom.d_weathert.innerHTML = 'Misty Morning';dom.d_weathert.style.color='#ffb91d';dom.d_weathert.style.backgroundColor='#926b64'}
          else if(getHour()>=18&&getHour()<=21) {dom.d_weathert.innerHTML = 'Dusk';dom.d_weathert.style.color='yellow';dom.d_weathert.style.backgroundColor='#e8421c'}
          else if(getHour()>=22||getHour()<=3) {dom.d_weathert.innerHTML = 'Misty Night';dom.d_weathert.style.color='#1f69a9';dom.d_weathert.style.backgroundColor='#2c3044'}
      break;
      case weather.foggy.id: 
          if((getHour()>4&&getMinute()>=30)&&getHour()<=6) {dom.d_weathert.innerHTML ='Foggy Morning';dom.d_weathert.style.color='#ffc94f';dom.d_weathert.style.backgroundColor='#8e8280'}
          else if(getHour()>=18&&getHour()<=21) {dom.d_weathert.innerHTML = 'Dusk';dom.d_weathert.style.color='yellow';dom.d_weathert.style.backgroundColor='#e8421c'}
          else if(getHour()>=22||getHour()<=3) {dom.d_weathert.innerHTML = 'Foggy Night';dom.d_weathert.style.color='#6dbbff';dom.d_weathert.style.backgroundColor='#273267'}
      break;
      case weather.drizzle.id: 
          if(getHour()>=22&&getHour()<=3){dom.d_weathert.innerHTML = 'Night Drizzle';dom.d_weathert.style.color='cyan';dom.d_weathert.style.backgroundColor='#111f63'}
      break;
      case weather.clear.id:
          if((getHour()>4&&getMinute()>=30)&&getHour()<=6) {dom.d_weathert.innerHTML='Sunrise';dom.d_weathert.style.color='#ffef33';dom.d_weathert.style.backgroundColor='#9c3f3f'}
          else if(getHour()>=20&&getHour()<=21) {dom.d_weathert.innerHTML = 'Dusk';dom.d_weathert.style.color='yellow';dom.d_weathert.style.backgroundColor='#e8421c'}
          else if(getHour()>=22||getHour()<=3) {dom.d_weathert.innerHTML = 'Starry Night';dom.d_weathert.style.color='#ffff66';dom.d_weathert.style.backgroundColor='#00397b'}
      break;
    }
    }
    w_manager.curr.ontick();
    onSeasonTick(ses); 
}

function setWeather(w, d){
    w_manager.curr = w;
    w_manager.duration = d;
    dom.d_weathert.style.backgroundColor=dom.d_weathert.style.color='inherit';
    dom.d_weathert.innerHTML = w_manager.curr.name;
    if(w.c) dom.d_weathert.style.color=w.c;
    if(w.bc) dom.d_weathert.style.backgroundColor=w.bc;

    if (w.frain===true) {
        global.flags.israin=true;
        global.flags.issnow=false;
        dom.d_anomaly.innerHTML='🌧'
    } else if (w.fsnow===true) {
        global.flags.issnow=true;
        global.flags.israin=false;
        dom.d_anomaly.innerHTML='❄️'
    } else {
        global.flags.israin=false;
        dom.d_anomaly.innerHTML='';
        global.flags.issnow=false
    }
}

function isWeather(weather){
    return w_manager.curr.id===weather.id
}

function onSeasonTick(season){
  switch (season){
    case 4:
      if(global.stat.wsnrest>0) {global.stat.wsnrest--;return}
      if(!global.flags.inside){
        if(!effect.cold.active) giveEff(you,effect.cold,5);
        else {if(w_manager.curr.id===weather.snow.id||w_manager.curr.id===weather.sstorm.id) {effect.cold.duration+=rand(3,7);giveSkExp(skl.coldr,.02)}else effect.cold.duration+=rand(1,3)
          if(effect.wet.active){
            effect.cold.duration+=rand(5,10); effect.wet.duration-=5;
          }
        }
      }
      if(global.stat.wsnburst<=0){
        global.stat.wsnburst = rand(200,1300)
        global.stat.wsnrest = rand(20,100)
      }
      global.stat.wsnburst--
    break
  }
}


function Furniture(){
    this.name = '';
    this.desc = '';
    this.data = {};
    this.id = 0; 
    this.removable = false;
    this.use        = function(){};
    this.onGive     = function(){};
    this.onSelect   = function(){};
    this.onRemove   = function(){};
    this.onDestroy  = function(){};
    this.activate   = function(){};
    this.deactivate = function(){};
}

function define_furniture () {
    furniture.cat = new Furniture();
    furniture.cat.id = 2;
    furniture.cat.name = 'Cat';
    furniture.cat.desc = 'Your best feline friend';
    furniture.cat.data = {
        age : DAY * 15,
        c : 0,
        p : 0,
        l1 : 0,
        l2 : 0,
        amount : 0,
        named : false,
        sex : false, //** no sex! i say, NO sex!
        name : 'Cat',
        mood : 1
    };
    furniture.cat.v = 1;
    furniture.cat.use = function() {
        this.data.age += global.timescale;
        this.data.mood = this.data.mood > 1 ? 1 : this.data.mood + 0.002;
    };

    furniture.frplc = new Furniture();
    furniture.frplc.id = 3;
    furniture.frplc.name = 'Fireplace';
    furniture.frplc.desc = 'Comfy fireplace. You can light it up for various useful means, or just to warm up';
    furniture.frplc.data = {
        fuel : 0,
        amount : 0
    };
    furniture.frplc.v = 3;
    furniture.frplc.use = function() {
        if (this.data.fuel > 0) {
          this.data.fuel--;
        }
    };

    furniture.bed1 = new Furniture();
    furniture.bed1.id = 4;
    furniture.bed1.name = 'Straw Bedding';
    furniture.bed1.desc = 'A "bed" made from several layers of straw placed onto each other. Extremely itchy and isn\'t much better from sleeping on a rock';
    furniture.bed1.data = { amount : 0 };
    furniture.bed1.sq = 0.1;
    furniture.bed1.v = 1; 
    furniture.bed1.onGive = function() {
        if (!home.bed || home.bed.sq < this.sq) {
            home.bed = this;
        }
    };

    furniture.bed2 = new Furniture();
    furniture.bed2.id = 5;
    furniture.bed2.removable = true;
    furniture.bed2.name = 'Plain Bed';
    furniture.bed2.desc = 'Crude planks cobbled together to form a container for a matress or such. Not a whole lot in terms of sleeping place, but somewhat better than a hard cold floor';
    furniture.bed2.data = { amount : 0 };
    furniture.bed2.sq = 1;
    furniture.bed2.v = 5;
    furniture.bed2.onGive = function() {
        if (!home.bed || home.bed.sq < this.sq) {
            home.bed = this;
        } 
    };
    furniture.bed2.onRemove = function() {
        home.bed = furniture.bed1;
        giveItem(item.bed2, 1, true);
    }

    furniture.tbwr1 = new Furniture();
    furniture.tbwr1.id = 6;
    furniture.tbwr1.removable = true;
    furniture.tbwr1.name = 'Wooden Tableware';
    furniture.tbwr1.desc = 'Cheap massproduced tableware carved from wood. Kind of a pain to wash'+dom.dseparator+'<span style="color:deeppink">Gluttony EXP gain +5%</span>';
    furniture.tbwr1.data = { amount : 0 };
    furniture.tbwr1.sq = 1;
    furniture.tbwr1.v = 3;
    furniture.tbwr1.activate = function() {
        if (home.tbw.id === this.id) {
            skl.glt.p += 0.05;
        }
    };
    furniture.tbwr1.deactivate = function() {
        if (home.tbw.id === this.id) {
            skl.glt.p -= 0.05
        }
    };
    furniture.tbwr1.onGive = function() {
        if (!home.tbw || home.tbw.sq < this.sq) {
            home.tbw = this;
        }
    };
    furniture.tbwr1.onRemove = function() {
        giveItem(item.tbwr1, 1, true);
    };

    furniture.tbwr2 = new Furniture();
    furniture.tbwr2.id = 7;
    furniture.tbwr2.removable = true;
    furniture.tbwr2.name = 'Clay Tableware';
    furniture.tbwr2.desc = 'Tableware made from hardened clay. Easy to make and doesn\'t cost very much';
    furniture.tbwr2.data = { amount : 0 };
    furniture.tbwr2.v = 9;
    furniture.tbwr2.onGive = function(){}

    furniture.tbwr3 = new Furniture();
    furniture.tbwr3.id = 8;
    furniture.tbwr3.removable = true;
    furniture.tbwr3.name = 'Ceramic Tableware';
    furniture.tbwr3.desc = 'Quality and shiny ceramic tableware. Though it is commonly available and not expensive, some prefer to display it on the shelves for decorative purposes';
    furniture.tbwr3.data = { amount : 0 };
    furniture.tbwr3.v = 21;
    furniture.tbwr3.onGive = function(){}

    furniture.wvbkt = new Furniture();
    furniture.wvbkt.id = 9;
    furniture.wvbkt.removable = true;
    furniture.wvbkt.name = 'Straw Basket';
    furniture.wvbkt.desc = 'Small woven basket. For storing stuff in';
    furniture.wvbkt.data = { amount : 0 };
    furniture.wvbkt.onRemove = function() {
        giveItem(item.wvbkt, 1, true);
    };

    furniture.strgbx = new Furniture();
    furniture.strgbx.id = 10; 
    furniture.strgbx.name = 'Storage Box'; 
    furniture.strgbx.desc = 'Huge container with a secure padlock. You can put your possessions inside to keep them safe.';
    furniture.strgbx.data = { amount : 0 };
    furniture.strgbx.v = 2;

    furniture.bblkt = new Furniture();
    furniture.bblkt.id = 11;
    furniture.bblkt.removable = true;
    furniture.bblkt.name = 'Ragwork Blanket';
    furniture.bblkt.desc = 'More like a long sheet of cloth folded trice and stitched in. Barely offers any warmth, but keeps you from getting frostbites if it\'s windy'+dom.dseparator+'<span style="color:deeppink">Sleep EXP gain +50%</span>';
    furniture.bblkt.data = { amount : 0 };
    furniture.bblkt.sq = 1;
    furniture.bblkt.v = 2;
    furniture.bblkt.activate = function() {
        if (home.blkt.id === this.id) {
            skl.sleep.p += 0.5;
        }
    };
    furniture.bblkt.deactivate = function() {
        if (home.blkt.id === this.id) {
            skl.sleep.p -= 0.5;
        }
    };
    furniture.bblkt.onGive = function() {
        if (!home.blkt || home.blkt.sq < this.sq) {
            home.blkt = this;
        } 
    };
    furniture.bblkt.onRemove = function() {
        giveItem(item.bblkt, 1, true);
    };

    furniture.spillw = new Furniture();
    furniture.spillw.id = 12;
    furniture.spillw.removable = true;
    furniture.spillw.name = 'Straw Pillow';
    furniture.spillw.desc = 'More like a healthy dose of dry grass in a sack. Uneven, hard, itchy, and probably bad for your neck. Despite that, it still passes as a basic tool of comfort'+dom.dseparator+'<span style="color:deeppink">Sleep EXP gain +30%</span>'
    furniture.spillw.data = { amount : 0 };
    furniture.spillw.sq = 1;
    furniture.spillw.v = 3;
    furniture.spillw.activate = function() {
        if (home.pilw.id ===this.id) {
            skl.sleep.p += 0.3;
        }
    };
    furniture.spillw.deactivate = function() {
        if (home.pilw.id===this.id) {
            skl.sleep.p -= 0.3;
        }
    };
    furniture.spillw.onGive = function() {
        if (!home.pilw || home.pilw.sq < this.sq) {
            home.pilw = this;
        } 
    };
    furniture.spillw.onRemove = function() {
        giveItem(item.spillw, 1, true);
    };

    furniture.cyrn = new Furniture();
    furniture.cyrn.id = 13;
    furniture.cyrn.removable = true;
    furniture.cyrn.name = 'Yarn Ball';
    furniture.cyrn.desc = 'Fluffy ball of yarn which is normally used as a material for knitting. Cats love these and often claim them as toys'+dom.dseparator+'<span style="color:deeppink">Patting EXP gain +15%</span><br><span style="color:springgreen">Passive Patting EXP +0.5</span>'
    furniture.cyrn.data = { amount : 0 };
    furniture.cyrn.v = 3;
    furniture.cyrn.activate = function() {
        skl.pet.p += 0.15;
        you.mods.petxp += 0.25
    };
    furniture.cyrn.deactivate = function() {
        skl.pet.p -= 0.15;
        you.mods.petxp -= 0.25;
    };
    furniture.cyrn.onRemove = function() {
        giveItem(item.cyrn, 1, true);
    };

    furniture.fwdpile = new Furniture();
    furniture.fwdpile.id = 14;
    furniture.fwdpile.removable = true;
    furniture.fwdpile.name = 'Firewood Pile';
    furniture.fwdpile.desc = function() {
        return 'Stockpile of firewood neatly packed together for easy storage' + dom.dseparator + '<span style="color:orange">Automatically supplies fireplace, but needs refueling</span><br>' + '<div style="color:yellow"><br>Supply: <br><span>0</span><span style="display:inline-table;width:130px;border:1px solid darkgrey;margin: 7px;background-color:orange"><span style="display:block;background-color:black;float:right;width:' + (100 - this.data.fuel / (this.data.amount*5) * 100) + '%">　</span></span><span>' + 5 * this.data.amount + '</span></div>'
    };
    furniture.fwdpile.data = { amount : 0, fuel : 5 };
    furniture.fwdpile.v = 5;
    furniture.fwdpile.onRemove = function() {
        giveItem(item.fwdpile, 1, true);
    };
    furniture.fwdpile.onSelect = function() {
        let f = item.fwd1;
        if (f.amount === 0) {
            msg('No firewood!', 'orange');
            return;
        }
        if (this.data.fuel === this.data.amount * 5) {
            msg('Firewood pile is full','cyan');
            return;
        } else {
            let n = this.data.amount * 5 - this.data.fuel;
            if (f.amount < n) {
                n=f.amount;
            }
            this.data.fuel += n;
            reduce(f,n);
        }
    }

    furniture.bookgen = new Furniture();
    furniture.bookgen.id = 15;
    furniture.bookgen.removable = true;
    furniture.bookgen.name = 'Book';
    furniture.bookgen.desc = function() {
        return 'Book which you\'ve already read. It doesn\'t contain any new useful information'+dom.dseparator+'<span style="color:deeppink">Literacy EXP gain +1%</span><br><br><small style="color:deeppink">Current:<span style="color:orange"> +'+Math.round(furniture.bookgen.data.p*100)+'%</span></small>'
    }
    furniture.bookgen.data = { amount : 0, p : 0};
    furniture.bookgen.v = 0.1;
    furniture.bookgen.activate = function() {
        skl.rdg.p += this.data.p;
    };
    furniture.bookgen.deactivate = function() {
        skl.rdg.p -= this.data.p
    };
    furniture.bookgen.onGive = function() {
        if (inSector(sector.home) && this.active) {
            skl.rdg.p += 0.01;
            this.data.p += 0.01;
        }
    };
    furniture.bookgen.onRemove = function() {
        giveItem(item.bookgen, 1, true);
        if (inSector(sector.home) && this.active) {
            skl.rdg.p -= 0.01;
            this.data.p -= 0.01;
        }
    };
}

function define_universal_drops() {
    global.wdrop=[{item:item.lckl,c:.0000048}];
    global.rdrop=[ // g f e 
        [{item:item.lsrd,c:.00026}],  
        [{item:item.lsrd,c:.0005}],   
        [{item:item.lsrd,c:.00098},{item:item.lsstn,c:.00023}],
        [],[],[],[]];
}


window.Weather = Weather;
window.define_weather = define_weather;
window.wManager = wManager;
window.setWeather = setWeather;
window.isWeather = isWeather;
window.onSeasonTick = onSeasonTick;
window.Furniture = Furniture;
window.define_furniture = define_furniture;
window.define_universal_drops = define_universal_drops;
