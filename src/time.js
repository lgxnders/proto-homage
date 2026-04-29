function define_global_text() {
    global.text = new Object();

    global.text.nt = ['K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','De','Un','DDe','TDe','QaDe','QiDe','Lc'];
    global.text.wecs = [
        ['grey','inherit'],
        ['white','inherit'],
        ['cyan','cyan'],
        ['lime','green'],
        ['yellow','red'],
        ['orange','orange'],
        ['purple','white']
    ];
    global.text.lunarp = [
        ['🌑','New Moon'],
        ['🌒','Waxing Crescent Moon'],
        ['🌓','First Quarter Moon'],
        ['🌔','Waxing Gibbous Moon'],
        ['🌕','Full Moon'],
        ['🌖','Waning Gibbous Moon'],
        ['🌗','Last Quarter Moon'],
        ['🌘','Waning Crescent Moon']
    ];
    global.text.eranks = [
        '???',
        '--G','-G','G','G+',
        '-F','F','F+',
        '-E','E','E+',
        '-D','D','D+',
        '-C','C','C+',
        '-B','B','B+',
        '--A','-A','A','A+','A++',
        '--S','-S','S','S+','S++',
        '--SS','-SS','SS','SS+','SS++',
        '--SSS','-SSS','SSS','SSS+','SSS++'
    ];
    global.text.d_l = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    global.text.d_s = ["Mon.","Tue.","Wed.","Thu.","Fri.","Sat.","Sun."];
    global.text.d_j = ["月","火","水","木","金","土","日"];
    global.text.alcohol_d = ["You drank some alcohol. You feel warm inside.","You drank alcohol. Party on!","You drank lots of alcohol. Are those white mice?","You drank unholy amounts of alcohol. But what do you care?","You embalmed yourself alive with so much alcohol, that even undead will leave your dead body alone."];
    global.text.bssel = ['Ack! There\'s dust and cobweb everywhere in this place','Spiderweb lands on your face as you enter','Various broken garbage is littered around','You step on some glass shards and crush them']
    global.text.bsseldark = ['Ack! Something touches you from the darkness','You step in and something crunches underneath','You feel like something moved in front of you','You touched cobweb and felt gross']
    global.text.ssns=['春','夏','秋','冬'];
}

function define_global_titlechecks() {
    global.achchk=[
      [ 
        function(x){if(ttl.ddw.have===false){if((x.id===103||x.id===102)&&x.lvl===1){giveTitle(ttl.ddw)}}}
      ],
      [
        function(x){if(ttl.kill1.have===false){if(global.stat.akills>=10000){giveTitle(ttl.kill1)}}},
        function(x){if(ttl.kill2.have===false){if(global.stat.akills>=50000){giveTitle(ttl.kill2)}}},
        function(x){if(ttl.kill3.have===false){if(global.stat.akills>=200000){giveTitle(ttl.kill3)}}},
        function(x){if(ttl.kill4.have===false){if(global.stat.akills>=1000000){giveTitle(ttl.kill4)}}},
        function(x){if(ttl.kill5.have===false){if(global.stat.akills>=5000000){giveTitle(ttl.kill5)}}},
      ]
    ];
    global.monchk=[
      function(x){if(ttl.mone1.have===false){if(global.stat.moneyg>=GOLD){giveTitle(ttl.mone1)}}},
    //  function(x){if(ttl.mone2.have===false){if(global.stat.moneyg>=GOLD){giveTitle(ttl.mone2)}}},
    //  function(x){if(ttl.mone3.have===false){if(global.stat.moneyg>=GOLD){giveTitle(ttl.mone3)}}},
    ];
    global.ttlschk=[
      function(x){if(ttl.ttsttl1.have===false){if(global.titles.length>=10){giveTitle(ttl.ttsttl1)}}},
      function(x){if(ttl.ttsttl2.have===false){if(global.titles.length>=25){giveTitle(ttl.ttsttl2)}}},
      function(x){if(ttl.ttsttl3.have===false){if(global.titles.length>=50){giveTitle(ttl.ttsttl3)}}},
    ];

    global.shptchk=[
      function(x){if(ttl.shpt1.have===false){if(global.stat.buyt>=500){giveTitle(ttl.shpt1)}}},
    //  function(x){if(ttl.shpt2.have===false){if(global.stat.buyt>=5000){giveTitle(ttl.shpt2)}}},
    //  function(x){if(ttl.shpt3.have===false){if(global.stat.buyt>=10000){giveTitle(ttl.shpt3)}}},
    ];
    global.cptchk=[
      function(x){if(ttl.cpet1.have===false){if(global.stat.cat_c>=9999){giveTitle(ttl.cpet1)}}},
    ];
    global.htrchl=[
      function(x){if(ttl.hstr1.have===false){if(x>=100){giveTitle(ttl.hstr1)}}},
      function(x){if(ttl.hstr2.have===false){if(x>=250){giveTitle(ttl.hstr2)}}},
      function(x){if(ttl.hstr3.have===false){if(x>=500){giveTitle(ttl.hstr3)}}},
    ]; //@Todo organize
    global.nethmchk=[
      function(x){if(ttl.neet.have===false){if(global.stat.athmec>=YEAR){giveTitle(ttl.neet)}}},
      function(x){if(ttl.neet2.have===false){if(global.stat.athmec>=YEAR*5){giveTitle(ttl.neet2)}}},
      function(x){if(ttl.neet3.have===false){if(global.stat.athmec>=YEAR*10){giveTitle(ttl.neet3)}}},
    ];
    global.text.cfc=['White','Black','Orange','Grey','Black&White','Brown','Ginger','Cinnamon','Fawn','Amber','Cream','Chocolate'];
    global.text.cfp=['Spotted','Plain','Solid','Bicolored','Tabby','Tricolored','Calico','Tortoiseshell','Wavy','Fluffy','Siamese','Striped'];
    global.text.cln=['Sleeping','Playing','Catching fireflies','Eating','Fish','People','Running outside','Warm places','Water','Fighting','Meowing','Singing','Catching mice','Its Master','Climbing trees','Toppling objects','Hiding','Safe places','Rooftops','Sitting by the window','Watching others','Master\'s bed','Being petted','Being brushed','Sitting on laps','Other cats','Dogs','Warm weather','Watching stars','Toys','Meat','Rain','Snow'];
}

function Time() {
    this.minute = 0;
    this.hour = 0;
    this.day = 0;
    this.month = 0;
    this.year = 0;
}


function callbackManager(id) {
    this.id = id || 0
    this.hooks = [{
          f : function(victim, killer){},
         id : 0,
       data : {} }];
    this.fire = function(){};
}

function attachCallback(callback, what, data){
    callback.hooks.push(what);
}

function detachCallback(callback, what){
    for(let a in callback.hooks) {
        if(callback.hooks[a].id === what) {
            callback.hooks.splice(callback.hooks[a], 1);
        }
    }
}


window.define_global_text = define_global_text;
window.define_global_titlechecks = define_global_titlechecks;
window.Time = Time;
window.callbackManager = callbackManager;
window.attachCallback = attachCallback;
window.detachCallback = detachCallback;
