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

function Effect(){
    this.name = 'dummy';
    this.desc = '';
    this.type = 0; // 1 - on attack
                   // 2 - on stat refresh
                   // 3 - on tick
                   // 4 - decor?
                   // 5 - stat mod?
                   // 6 - tickstat
    this.x;
    this.c;
    this.b;
    this.y;
    this.z;
    this.target;
    this.duration;
    this.timer_o;
    this.active = false;
    this.use = function(y,z){};
    this.un = function(x,y,z){};
    this.mods = function(){};
    this.onGive = function(){};
    this.onRemove = function(x){};
    this.onClick = function(){};
}

function define_effects() {
    effect.test1 = new Effect()
    effect.test1.name = 'Beast killer';
    effect.test1.desc = 'Attacks against beast type creatures are 30% more effective';
    effect.test1.type = 1;
    effect.test1.use = function(){
        if (global.current_m.type === 1) {
            you.str = Math.round(you.str * 1.3)
        }
    }

    effect.bk1 = new Effect()
    effect.bk1.type = 1;
    effect.bk1.use = function(){
        if(global.current_m.type === 1) {
            you.dmlt += 0.2;
        }
    }

    effect.strawp = new Effect()
    effect.strawp.type = 2;
    effect.strawp.use = function() {
        you.satmax += 50;
        you.sat += 50;
    }
    effect.strawp.un = function() {
        you.sat -= 50;
    }
    effect.strawp.noGive = function() {
        msg('You feel ready for the future','orange')};

    effect.psn = new Effect();
    effect.psn.id = 1;
    effect.psn.name = 'Poison';
    effect.psn.desc = 'Depletes health each second';
    effect.psn.type = 3;
    effect.psn.atype = 1;
    effect.psn.duration = 5;
    effect.psn.x = '毒';
    effect.psn.c = 'red';
    effect.psn.b = 'darkmagenta';
    effect.psn.onGive = function(x,y) {
        if (!this.active) {
            if (this.target.id === you.id) {
                msg('You have been poisoned!', 'darkmagenta');
            }
        }
        else { 
            this.y = Math.ceil((this.y+y) / 2);
            this.duration += x * 0.7 << 0;
        }
    }
    effect.psn.use = function(y,z) { 
        this.duration--;
        var dmg = y || 1;
        this.power = y;
        if (this.target.id === you.id) { 
            if (effect.psnwrd.active === false) {
                giveSkExp(skl.poisr, this.power * 0.1);
                dmg *= Math.ceil(1 - skl.poisr.use());
                giveSkExp(skl.painr, this.power * 0.05);
                global.stat.dmgrt += dmg;
                
                if (you.hp - dmg > 0) { 
                    you.hp -= dmg;
                } else {
                    you.hp = 0;
                    removeEff(this);
                    this.duration = 5;
                    you.onDeath();
                    global.atkdfty = [2,1];
                }
                dom.d5_1_1.update();
            }
        } else { 
            if (this.target.hp - dmg > 0) {
                this.target.hp -= dmg;
            } else {
                this.target.hp = 0;
                removeEff(this, this.target);
                this.duration = 5;
                global.atkdftm = [-1,-1,1];
                this.target.onDeath(you);
                global.stat.indkill++
            }
            dom.d5_1_1m.update(); 
        }
                
        if (this.duration === 0) {
            removeEff(this, this.target);
            this.duration = 5;  
        }
    }

    effect.vnm = new Effect();
    effect.vnm.id = 2;
    effect.vnm.name ='Venom';
    effect.vnm.desc ='Depletes health each second';
    effect.vnm.type = 3;
    effect.vnm.atype = 1;
    effect.vnm.duration = 15;
    effect.vnm.x = '毒';
    effect.vnm.c = 'blue';
    effect.vnm.b = 'red';
    effect.vnm.onGive = function(x,y) {
        if (!this.active) {
            if (this.target.id ===you.id) {
                msg('You have been badly poisoned!', 'darkmagenta');
            }
        } else { 
            this.y = Math.ceil((this.y + y) / 1.5);
            this.duration += x * 0.5 << 0;
        }
    }
    effect.vnm.use = function(y,z) {
        this.duration--;
        var dmg = y;
        this.power = y;
        if (this.target.id === you.id) { 
            if (effect.psnwrd2.active === false) {
                giveSkExp(skl.poisr, this.power * 0.1);
                dmg *= Math.ceil(1 - (skl.poisr.use() * 0.3));
                giveSkExp(skl.painr, this.power * 0.2);
                global.stat.dmgrt += dmg;
                
                if (you.hp - dmg > 0) {
                you.hp -= dmg;
                } else {
                    you.hp = 0;
                    removeEff(this);
                    this.duration = 5;
                    you.onDeath();
                    global.atkdfty = [2,2]
                }
                dom.d5_1_1.update();
            } else { 
                if (this.target.hp - dmg > 0) {
                    this.target.hp -= dmg;
                } else {
                    this.target.hp = 0;
                    removeEff(this, this.target);
                    this.duration = 5;
                    global.atkdftm = [-1,-1,1];
                    this.target.onDeath(you);
                    global.stat.indkill++
                }
                dom.d5_1_1m.update();
            }
            if (this.duration===0) {
                removeEff(this, this.target);
                this.duration = 5;
            }
        }
    }

    effect.psnwrd = new Effect();
    effect.psnwrd.id = 3;
    effect.psnwrd.name = 'Poison block';
    effect.psnwrd.desc = 'Weak poisons have no effect on you';
    effect.psnwrd.type = 3;
    effect.psnwrd.duration = 600;
    effect.psnwrd.x = '＋';
    effect.psnwrd.c = 'lime';
    effect.psnwrd.b = 'darkmagenta';
    effect.psnwrd.onGive = function() {
        msg('You feel safer','lime');
    };
    effect.psnwrd.use = function() {
        if (--this.duration === 0) {
            removeEff(this);
            this.duration = 600;
        };
    }

    effect.psnwrd2 = new Effect();
    effect.psnwrd2.id = 4;
    effect.psnwrd2.name = 'Venom block';
    effect.psnwrd2.desc = 'Severe poisons have no effect on you';
    effect.psnwrd2.type = 3;
    effect.psnwrd2.duration = 600;
    effect.psnwrd2.x = '＋';
    effect.psnwrd2.c = 'lime';
    effect.psnwrd2.b = 'magenta';
    effect.psnwrd2.onGive = function() {
        msg('You feel much safer','lime');
    };
    effect.psnwrd2.use = function() {
        if (--this.duration === 0) {
            removeEff(this);
            this.duration = 600;
        };
    } 

    effect.imm = new Effect();
    effect.imm.id = 5;
    effect.imm.name = 'Immortality';
    effect.imm.desc = 'Eternal life';
    effect.imm.type = 2;
    effect.imm.duration = 0;       
    effect.imm.x = '￥';
    effect.imm.c = 'gold';
    effect.imm.b = 'navy';
    effect.imm.use = function() {}

    effect.sun_charm = new Effect();
    effect.sun_charm.id = 6;
    effect.sun_charm.name = 'Sun blessing';
    effect.sun_charm.desc = 'You are blessed by Sun';
    effect.sun_charm.type = 2;
    effect.sun_charm.eq = true;
    effect.sun_charm.duration = -1;       
    effect.sun_charm.x = '☼';
    effect.sun_charm.c = 'gold';
    effect.sun_charm.b = 'blue';
    effect.sun_charm.onGive = function() {
        if (global.flags.loadstate){
            you.str   += 5;
            you.str_d += 5;
            you.agl   += 5;
            you.agl_d += 5;
            you.int   += 5;
            you.int_d += 5;
            you.spd   += 1;
            you.hpmax += 100;
            you.sat   += 100;
            you.satmax += 100
            global.flags.sun_charm = true; 
        }
    };
    effect.sun_charm.use = function() {
        if (global.flags.isday === true) {
            if (!global.flags.sun_charm) {
                you.str   += 5;
                you.str_d += 5;
                you.agl   += 5;
                you.agl_d += 5;
                you.int   += 5;
                you.int_d += 5;
                you.spd   += 1;
                you.hpmax += 100;
                you.sat   += 100;
                you.satmax += 100;
                global.flags.sun_charm=true; 
            } 
        } 
        timers.sun_charm=setInterval(function(){
            if(global.flags.isday===true) {
                if (!global.flags.sun_charm) {
                    you.str   += 5;
                    you.str_d += 5;
                    you.agl   += 5;
                    you.agl_d += 5;
                    you.int   += 5;
                    you.int_d += 5;
                    you.spd   += 1;
                    you.hpmax += 100;
                    you.sat   += 100;
                    you.satmax += 100;
                    global.flags.sun_charm = true; 
                    update_d();
                }
            } else {
                if (global.flags.sun_charm === true) {
                    effect.sun_charm.un();
                    you.stat_r();
                    update_d();
                }
            }
        }, 1000)
    }
    effect.sun_charm.un = function() { 
        clearInterval(timers.sun_charm);
        if (global.flags.sun_charm === true) {
            you.sat -= 100;
            global.flags.sun_charm = false;
        }
    }


    effect.moon_charm = new Effect();
    effect.moon_charm.id = 7;
    effect.moon_charm.name = 'Moon blessing';
    effect.moon_charm.desc = 'You are blessed by Moon';
    effect.moon_charm.type = 2;
    effect.moon_charm.eq = true;
    effect.moon_charm.duration = -1;       
    effect.moon_charm.x = '☽';
    effect.moon_charm.c = 'gold';
    effect.moon_charm.b = 'purple';
    effect.moon_charm.onGive = function() {
        if (global.flags.loadstate){
            you.str   += 5;
            you.str_d += 5;
            you.agl   += 5;
            you.agl_d += 5;
            you.int   += 5;
            you.int_d += 5;
            you.spd   += 1;
            you.hpmax += 100;
            you.sat   += 100;
            you.satmax += 100;
            global.flags.moon_charm=true;   
        }
    };
    effect.moon_charm.use = function() {
        if (global.flags.isday === false) {
            if (!global.flags.moon_charm){
                you.str   += 5;
                you.str_d += 5;
                you.agl   += 5;
                you.agl_d += 5;
                you.int   += 5;
                you.int_d += 5;
                you.spd   += 1;
                you.hpmax += 100;
                you.sat   += 100;
                you.satmax += 100;
                global.flags.moon_charm=true;
            } 
        } 
        timers.moon_charm = setInterval( function() {
            if (global.flags.isday===false) {
                if (!global.flags.moon_charm) {
                    you.str   += 5;
                    you.str_d += 5;
                    you.agl   += 5;
                    you.agl_d += 5;
                    you.int   += 5;
                    you.int_d += 5;
                    you.spd   += 1;
                    you.hpmax += 100;
                    you.sat   += 100;
                    you.satmax += 100;
                    global.flags.moon_charm=true;
                    update_d();
                }
            } else {
                if (global.flags.moon_charm === true) {
                    effect.moon_charm.un();
                    you.stat_r();
                    update_d();
                }
            }
        }, 1000)
    }
    effect.moon_charm.un = function() { 
        clearInterval(timers.moon_charm);
        if (global.flags.moon_charm === true) {
            you.sat -= 100;
            global.flags.moon_charm = false;
        }
    }

    effect.fpn = new Effect();
    effect.fpn.id = 8;
    effect.fpn.name = 'Food poisoning';
    effect.fpn.desc = 'From eating something bad';
    effect.fpn.type = 3; 
    effect.fpn.duration = 30;
    effect.fpn.x = '«';
    effect.fpn.c = 'lime';
    effect.fpn.b = 'grey';
    effect.fpn.onGive = function() {
        msg(select(['You feel bad inside','Your stomach bothers you']),'green');
    };
    effect.fpn.use = function(y,z) {
        if (you.sat>0) {
            giveSkExp(skl.fdpnr, 1);
            giveSkExp(skl.painr, 1);
        }
        this.duration--;
        let dmg = randf(1,3) * (1-skl.fdpnr.use());
        if (you.sat > 0) {
            you.sat - dmg >= 0?you.sat -= dmg : you.sat = 0;
        }
        dom.d5_1_1.update();
        if (this.duration === 0) {
            removeEff(this);
            this.duration = 30;
        }
    }

    effect.wet = new Effect();
    effect.wet.id = 9;
    effect.wet.name = 'Wet';
    effect.wet.desc = 'You\'re drenched in water';
    effect.wet.type = 3;
    effect.wet.duration = 5;
    effect.wet.x = '雨';
    effect.wet.c = 'cyan';
    effect.wet.b = 'blue';
    effect.wet.onGive = function() {
        if (this.target.id === you.id) {
            msg('Your clothes get soaked', 'cyan', null, null, 'blue');
            global.flags.iswet = true;
        }
    };
    effect.wet.onRemove = function() {
        msg('You dry up', 'orange');
        global.flags.iswet = false;
    };
    effect.wet.use = function() { 
        if (global.flags.inside === false && global.flags.israin === true && !you.mods.rnprtk)
        {
            this.duration += 6;
        }

        if (this.target.id === you.id) { 
            if (you.sat > 0) {
                giveSkExp(skl.abw, 0.05);
            }
            effect.fplc.active === true ? this.duration -= 15 : this.duration--;
        }

        else {
            this.duration--;
        }

        if (this.duration > 600) {
            this.duration = 600;
        }

        if (this.duration <= 0) {
            removeEff(this, this.target);
            this.duration = 5;
        };
    };

    effect.fplc = new Effect();
    effect.fplc.id = 10;
    effect.fplc.save = false;
    effect.fplc.name = 'Fireplace Aura';
    effect.fplc.desc = 'You\'re feeling the warmth of the fireplace';
    effect.fplc.type = 3;
    effect.fplc.duration = 2;
    effect.fplc.x = '火';
    effect.fplc.c = 'yellow';
    effect.fplc.b = 'crimson';
    effect.fplc.onGive = function() {
        msg('You feel the warmth of the fireplace', 'orange');
    };
    effect.fplc.use = function() {
        var fire = findbyid(furn, furniture.frplc.id); 
        this.duration = fire.data.fuel;
        giveSkExp(skl.abf, 0.2);
        if (this.duration === 0) {
            removeEff(this);
            this.duration = 2;
            rsort(global.rm);
        }
    };
    effect.fplc.onGive=function() {
        you.mods.ckfre += 1;
    };
    effect.fplc.onRemove=function() {
        you.mods.ckfre -= 1;
    };

    effect.cdlt = new Effect();
    effect.cdlt.id = 11;
    effect.cdlt.name = 'Candlelight';
    effect.cdlt.desc = 'You\'re carrying a candle. The surroundings are lit up';
    effect.cdlt.type = 3;
    effect.cdlt.duration = 360;
    effect.cdlt.x = '❛';
    effect.cdlt.c = 'gold';
    effect.cdlt.b = '#440205';
    effect.cdlt.use = function() { 
        if (--this.duration === 0) {
            removeEff(this);
            this.duration = 360;
        }
    };
    effect.cdlt.onGive=function() {
        you.mods.light += 1;
    };
    effect.cdlt.onRemove=function() {
        you.mods.light -= 1;
    };

    effect.tst2 = new Effect();
    effect.tst2.id = 12;
    effect.tst2.name = 'STR+';
    effect.tst2.desc = 'STR+';
    effect.tst2.type = 2;
    effect.tst2.duration = 0;       
    effect.tst2.x = 'X';
    effect.tst2.c = 'RED';
    effect.tst2.b = 'WHITE';
    effect.tst2.use = function() {
        you.str *= 0.5;
        you.str_d *= 0.5;
    };

    effect.slep = new Effect();
    effect.slep.id = 13;
    effect.slep.name = 'Sleep';
    effect.slep.desc = 'You are fast asleep';
    effect.slep.type = 4;
    effect.slep.duration = -1;       
    effect.slep.x = 'z';
    effect.slep.c = 'white';
    effect.slep.b = 'dimgray';
    effect.slep.use = function(){}

    effect.bled = new Effect();
    effect.bled.id = 14;
    effect.bled.name = 'Bleeding';
    effect.bled.desc = 'Depletes health each second';
    effect.bled.type = 3;
    effect.bled.atype = 1;
    effect.bled.duration = 5;
    effect.bled.x = '血';
    effect.bled.c = 'red';
    effect.bled.b = 'darkred';
    effect.bled.onGive = function(x,y) {
        if (!this.active) {
            if (this.target.id === you.id) {
                msg('You\'re losing blood!','red');
            } 
        }
        else { 
            this.y = Math.ceil(this.y + y * 0.2 + 1);
            this.duration += x * 0.9 << 0;
        }
    };
    effect.bled.use = function(y,z) {
        this.duration--; 
        this.power = y;
        let dmg = this.power;
        dmg = Math.ceil(rand (dmg * 0.6, dmg * 1.4) );

        if (this.target.id === you.id) { 
            giveSkExp(skl.bledr, this.power * 0.1);
            dmg *= Math.ceil(1 - skl.bledr.use());
            global.stat.dmgrt += dmg;

            if (you.hp - dmg > 0) {
                you.hp -= dmg;
            }
            else {
                you.hp = 0;
                removeEff(this);
                this.duration = 5;
                you.onDeath();
                global.atkdfty = [2,3]} 
            dom.d5_1_1.update();
        } 
        else {
            if(this.target.hp - dmg > 0) {
                this.target.hp -= dmg;
            }
            else {
                this.target.hp = 0;
                removeEff(this, this.target);
                this.duration = 5;
                this.target.onDeath(you);
                global.stat.indkill++;
            }
        }
        
        if (this.duration === 0) {
            removeEff(this, this.target);
            this.duration = 5;
        };
    };
    effect.bled.onClick = function(){  
        let it;
        if (item.bdgh.have) {
            item.bdgh.use();
        }
        return;
    };

    effect.tarnish = new Effect();
    effect.tarnish.id = 15;
    effect.tarnish.name = 'Tarnished';
    effect.tarnish.desc = 'Equipment usability -30%';
    effect.tarnish.type = 4;
    effect.tarnish.duration = -1;
    effect.tarnish.x = '≠';
    effect.tarnish.c = 'purple';
    effect.tarnish.b = 'grey';
    effect.tarnish.onGive = function() {
        msg('Your equipment cracks', 'purple');
    };
    effect.tarnish.use = function(y,z){}

    effect.prostasia = new Effect();
    effect.prostasia.id = 16;
    effect.prostasia.name = 'Prostasía';
    effect.prostasia.desc = 'Equipment usability +30%';
    effect.prostasia.type = 4; 
    effect.prostasia.duration = -1;
    effect.prostasia.x = '≒';
    effect.prostasia.c = 'midnightblue';
    effect.prostasia.b = 'skyblue';
    effect.prostasia.onGive = function() {
        msg('You feel secure', 'skyblue');
    };
    effect.prostasia.use = function(y,z){}

    effect.incsk = new Effect();
    effect.incsk.id = 17;
    effect.incsk.name = 'Incense Aroma';
    effect.incsk.desc = 'Your senses are enhanced';
    effect.incsk.type = 3;
    effect.incsk.duration = 600;
    effect.incsk.x = 'Í';
    effect.incsk.c = 'gold';
    effect.incsk.b = '#440205';
    effect.incsk.use = function() { 
        if (--this.duration === 0) {
            removeEff(this);
            this.duration = 600;
        }
    };

    effect.run = new Effect();
    effect.run.id = 18;
    effect.run.name = 'Running';
    effect.run.desc = 'You\'re jogging';
    effect.run.type = 4; 
    effect.run.duration = -1;
    effect.run.x = '走';
    effect.run.c = 'black';
    effect.run.b = 'skyblue';

    effect.drunk = new Effect();
    effect.drunk.id = 19;
    effect.drunk.name = 'Inebriated'; 
    effect.drunk.desc = 'You\'re feeling drunk from alcohol';
    effect.drunk.type = 5; 
    effect.drunk.duration = 15;
    effect.drunk.x = '酒';
    effect.drunk.c = 'darkred';
    effect.drunk.b = 'orange';
    effect.drunk.use = function() {
        if (--this.duration === 0) {
            removeEff(this);
        } 
    };
    effect.drunk.mods = function() {
        you.agle /= 1 + (0.4 - skl.drka.lvl * 0.03);
        you.stre *= 1 + (0.2 + skl.drka.lvl * 0.02);
        you.inte /= 1 + (0.5 - skl.drka.lvl * 0.04);
    };
    effect.drunk.onGive = function() {
        msg('You\'re feeling tipsy', 'chocolate');
    };
    effect.drunk.onRemove = function() {
        msg('You sober up', 'orange');
    };

    effect.virus = new Effect();
    effect.virus.id = 20;
    effect.virus.name = 'Virus'; 
    effect.virus.desc = 'You are contaminated';
    effect.virus.type = 5; 
    effect.virus.duration = -1;
    effect.virus.x = '⁑';
    effect.virus.c = 'black';
    effect.virus.b = 'lightgrey';
    effect.virus.use = function(){}
    effect.virus.mods = function() {
        you.agle /= 1.1;
        you.stre /= 1.1;
        you.sat  -= 70;
        you.sata -= 70;
    };
    effect.virus.onGive = function() {
        msg('You feel bad','grey');
    };
    effect.virus.onRemove = function() {
        msg('You feel better','orange');
    };

    effect.scout = new Effect();
    effect.scout.id = 21;
    effect.scout.name = 'Investigating';
    effect.scout.desc = 'You\'re exploring your surroundings';
    effect.scout.type = 4; 
    effect.scout.duration = -1;
    effect.scout.x = 'ǔ';
    effect.scout.c = 'aquamarine';
    effect.scout.b = 'teal';

    effect.invgrt = new Effect(); effect.invgrt.id = 22;
    effect.invgrt.name = 'Invigorate';
    effect.invgrt.desc = 'Your joints feel flexible';
    effect.invgrt.type = 3; 
    effect.invgrt.duration = -1;
    effect.invgrt.x = 'ℐ';
    effect.invgrt.c = 'yellowgreen';
    effect.invgrt.b = 'darkgreen';
    effect.invgrt.onGive = function() {
        if (!this.active) {
            msg(this.target.id === you.id ? 'You become nimble' : (this.target.name + ' becomes nimble'), 'green');
            this.target.aglm += 0.3;
        }
    };
    effect.invgrt.onRemove = function() {
        this.target.aglm -= 0.3
    };
    effect.invgrt.use = function() {
        if(--this.duration === 0) {
            removeEff(this);
            this.duration = 5;
        };
    };

    effect.fei1 = new Effect();
    effect.fei1.id = 23;
    effect.fei1.name = 'Fei poisoning';
    effect.fei1.desc = 'Fei impurities attack your flesh';
    effect.fei1.type = 3; 
    effect.fei1.duration = 60;
    effect.fei1.x = '⇔';
    effect.fei1.c = 'magenta';
    effect.fei1.b = '#520090';
    effect.fei1.onGive = function(x,y) {
        if (!this.active) {
            msg('Your body is fighting against the impurities', 'darkmagenta', null, null, 'grey');
            this.power = y;
        }
        else {
            this.power += y;
            this.duration += 30;
        }
    };
    effect.fei1.use = function(y) { 
        this.duration--;
        giveSkExp(skl.crptr, 1);
        giveSkExp(skl.painr, this.power);
        let dmg = (this.power * 5 * (1 - skl.crptr.lvl * 0.05)) << 0;
        global.stat.dmgrt += dmg; 

        if (you.hp - dmg > 0) {
            you.hp -= dmg;
        } else {
            you.hp = 0;
            removeEff(this);
            you.onDeath();
            global.atkdfty = [2,4];
            msg("You fail to purify the pill", 'darkgrey');
        }
        dom.d5_1_1.update();
        if (this.duration === 0) {
            removeEff(this, this.target);
            this.duration = 5;
            msg("You have successfully purified the pill!", 'lime');
            giveExp(this.power * 5000 + (this.power > 1 ? (this.power * 0.15 * 5000) : 0), true, true, true);
        }
    };

    effect.cold = new Effect();
    effect.cold.id = 24;
    effect.cold.name = 'Cold';
    effect.cold.desc = 'You\'re freezing';
    effect.cold.type = 5;
    effect.cold.duration = 5;
    effect.cold.x = '冷';
    effect.cold.c = '#88a';
    effect.cold.b = '#eef';
    effect.cold.mods = function() {
        you.agle /= 1.1;
        you.stre /= 1.1;
        you.hpe  /= 1.1;
        you.sate /= 1.05;
    };
    effect.cold.onGive = function() {
        if (this.target.id === you.id) {
            msg('You feel colder', 'blue', null, null, 'cyan');  
        } 
    };
    effect.cold.onRemove = function() {
        if (this.target.id === you.id) {
            msg('You\'re warming up', 'orange');
        }
    };
    effect.cold.use = function() { 
        if (this.target.id === you.id) { 
            giveSkExp(skl.abw, 0.01);
            giveSkExp(skl.coldr, 0.01);

            effect.fplc.active === true ? this.duration -= 15 : this.duration--;
            effect.wet.active ? global.stat.coldnt += 6 : global.stat.coldnt += 2;

            if (effect.fbite.active) {
                effect.fbite.duration += 5;
            } else if (global.stat.coldnt >= 460) {
                giveEff(you,effect.fbite, 20);
            }

            if(global.stat.coldnt > 0) {
                global.stat.coldnt--;
            }
        }

        else {
            this.duration--;
        }
        
        if (this.duration > 600) {
            this.duration = 600;
        }

        if (this.duration <= 0) {
            removeEff(this, this.target);
            this.duration = 5;
        };
    };

    effect.smoke = new Effect();
    effect.smoke.id = 25;
    effect.smoke.name = 'Smoke';
    effect.smoke.desc = 'Thick smoke abstructs your lungs';
    effect.smoke.type = 3;
    effect.smoke.duration = 5;
    effect.smoke.x = '煙';
    effect.smoke.c = 'grey';
    effect.smoke.b = 'lightgrey';
    effect.smoke.onGive = function() {
        if (this.target.id === you.id) {
            msg('You breathe heavily', 'grey');
        }
    };
    effect.smoke.onRemove = function() {
        msg('Your lungs feel lighter', 'orange');
    };
    effect.smoke.use = function() { 
        if (this.target.id === you.id) { 
            if (random() < 0.1) {
                msg(select(['*Cough..*','*Hack..*','*Cough-cough..*','*Khe..*'], 'grey'));
                giveSkExp(skl.painr, rand(0.5,5));
                if (you.hp > 50) {
                    you.hp -= (rand(5,35) + you.hp * (rand(0.01, 0.05)));
                    dom.d5_1_1.update();
                }
            }
        }
        this.duration--;
        if (this.duration<=0) {
            removeEff(this, this.target);
            this.duration = 5;
        }
    };

    effect.fbite = new Effect();
    effect.fbite.id = 26;
    effect.fbite.name = 'Hypothermia';
    effect.fbite.desc = 'Your limbs are suffering from frostbites';
    effect.fbite.type = 5;
    effect.fbite.duration = 5;
    effect.fbite.x = '凍';
    effect.fbite.c = 'red';
    effect.fbite.b = '#aaf';
    effect.fbite.mods = function() {
        you.agle /= 1.15;
        you.stre /= 1.2;
        you.hpe  /= 1.2;
        you.sate /= 1.1;
    };
    effect.fbite.onGive = function() {
        if (this.target.id === you.id) {
            msg('Sharp pain stings you', 'red', null, null, 'cyan');
        }
    };
    effect.fbite.onRemove = function() {
        if (this.target.id === you.id) {
            msg('You aren\'t freezing anymore', 'orange');
            global.stat.coldnt = 0;
        }
    };
    effect.fbite.use = function() { 
        if (this.target.id === you.id) { 
            giveSkExp(skl.coldr, 0.05);
            effect.fplc.active === true ? this.duration -= 5 : this.duration--;
            if (random() < 0.3) {
                giveSkExp(skl.painr, rand(0.2, 1));
                if(you.hp > 50) {
                    you.hp -= (rand(5, 20));
                    dom.d5_1_1.update();
                }
            }
        }

        else {
            this.duration--;
        }
        
        if (this.duration > 900) {
            this.duration = 900;
        }

        if (this.duration <= 0) {
            removeEff(this, this.target);
            this.duration = 5;
        };
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
window.Effect = Effect;
window.define_effects = define_effects;
window.Furniture = Furniture;
window.define_furniture = define_furniture;
window.define_universal_drops = define_universal_drops;
