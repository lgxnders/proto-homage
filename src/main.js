import { YEAR, MONTH, DAY, WEEK, HOUR, SILVER, GOLD } from './constants.js';
import './misc.js';
import './time.js';
import './utils.js';
import './save-load.js';
import './entities.js';
import './quests-skills.js';
import './items.js';
import './world.js';
import './actions.js';
import './ui.js';
import './areas.js';
import './game.js';
import './masteries.js';
import './debug.js';
import './titles.js';
import './time.js';

window.YEAR   = YEAR;
window.MONTH  = MONTH;
window.DAY    = DAY;
window.WEEK   = WEEK;
window.HOUR   = HOUR;
window.SILVER = SILVER;
window.GOLD   = GOLD;

main();

function main() {
    window.tempt = new Date();
    window.time = new Time();
    time.minute = 338144100; //@Todo base game is monday 652/4/13/7:47

    window.dom = new Object();

    dom.dseparator = '<div class="dseparator">　</div>';
    dom.coincopper = '<small style="color:rgb(255, 116, 63)">●</small>';
    dom.coinsilver = '<small style="color:rgb(192, 192, 192)">●</small>';
    dom.coingold   = '<small style="color:rgb(255, 215, 0)">●</small>';

    define_global();
    define_global_text();
    setup_data_objects();
    setup_world();

    update();

    window.you = new You();
    
    define_titles();
    define_global_titlechecks();
    giveTitle(ttl.new, true);

    define_furniture();
    container.home_strg = new Container(1);
    if (!home.trunk) home.trunk = container.home_strg;

    define_masteries();
    define_skills();
    define_effects();
    define_quests();
    define_abilities();
    define_effectors();
    define_creatures();
    define_zones();
    define_sectors();
    define_items_generic();
    define_universal_drops();
    define_recipes();
    define_plans();
    define_areas();

    define_dom_references();

    define_vendors();

    define_actions();
    act.default = new Action();
    global.current_a = act.default;

    define_weather();
    setWeather(weather.clear, 600);
    wManager();
    dom.d_time.innerHTML = '<small>'+getDay(global.flags.tmmode)+'</small> '+timeDisp(time)

    global.t_n=0;

    for (let x in global.cptchk) global.cptchk[x]();

    global.current_location = chss.intro;
    move_to_area(chss.intro);

    window.addEventListener('load', ()=>{
        load(undefined, false);
    });
}

function define_global() {
    window.global = new Object();

    global.flags = {
        btl:       false,
        civil:     true,
        to_pause:  false,
        inside:    true,
        israin:    false,
        issnow:    false,
        iscold:    false,
        m_freeze:  false,
        msd:       false,
        m_blh:     false,
        crti:      false,
        sleepmode: false,
        savestate: false,
        loadstate: false,
        eshake:    false,
        msgtm:     false,
        grd_s:     true,
        bstu:      false,
        blken:     false,
        rtcrutch:  false,
        expatv:    false,
        gameone:   false,
        tmmode:    1,
        ssngaijin: true,
        rptbncgt:  false,

        drop_badge_on_death: false,

        show_exit_from_intro_woods1: true,
        show_exit_from_intro_woods2: true,
        show_exit_from_intro_woods3: true,

        know_training_grounds: false,

        can_open_wallet: false,

        unl_rockpath: true, 
        unl_house: false,
        unl_dojo: false,

        finished_intro: false, 
        rock_path_show_cat: false,
        drunk_from_river: false,
        spoken_to_river_man: false,
        gotten_river_charm: false,
    };

    global.last_save = 'never';
    global.ver = 470;
    global.sm = 1;
    global.rm = 0;


    global.bg_r = 255;
    global.bg_g = 227;
    global.bg_b = 207;

    global.s_l = 0;
    global.spnew = 0;
    global.vsnew = 10;
    global.uid = 1;
    global.wdwidx = 0;
    global.menuo = 0;
    global.lastmsgc = 0

    global.sinv = [];
    global.srcp = [];
    global.drdata = {};

    global.lw_op = 0;
    global.zone_a_p = []; 

    global.rec_d = [];
    global.e_e = [];
    global.e_em = [];
    global.titles = [];
    global.titlese = [];
    global.tstcr = [];

    global.atkdftm = [-1,-1,-1];
    global.atkdfty = [-1,-1];
    global.atkdftydt = {};

    global.current_m = null;
    global.current_z = null;
    global.current_location = null;
    global.stat = {
        tick:    0,
        akills:  0,
        fooda:   0,
        foodb:   0,
        foodal:  0,
        foodt:   0,
        ftried:  0,
        moneyg:  0,
        die_p:   0,
        die_p_t: 0,
        ivtntdj: 0,
        athme:   0,
        athmec:  0,
        slvs:    0,
        lgtstk:  0,
        moneysp: 0,
        shppnt:  0,
        exptotl: 0,
        seed1: (Math.random()*7e+7<<7)%7&7,
        igtttl:  0,
        msts: [ [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0] ],
        msks: [0, 0, 0, 0, 0, 0, 0],
        sttime: tempt.getFullYear()+'/'+(tempt.getMonth()+1)+'/'+tempt.getDate()+' '+tempt.getHours()+':'+(tempt.getMinutes()>=10?tempt.getMinutes():'0'+tempt.getMinutes())+':'+(tempt.getSeconds()>10?tempt.getSeconds():'0'+tempt.getSeconds()),
        buyt:    0,
        rdttl:   0,
        dsst:    0,
        thrt:    0,
        crftt:   0,
        deadt:   0,
        move_to_areat:  0,
        timeslp: 0,
        misst:   0,
        dodgt:   0,
        potnst:  0,
        medst:   0,
        plst:    0,
        jcom:    0,
        qstc:    0,
        popt:    0,
        dsct:    0,
        bloodt:  0,
        rdgtttl: 0,
        cat_c:   0,
        dmgdt:   0,
        dmgrt:   0,
        onesht:  0,
        pts:     0,
        gsvs:    0,
        hbhbsld: 0,
        wsnburst: 50,
        wsnrest:  50,
        indkill:  0,
        coldnt:   0,
        lastver: global.ver
    }; 

    global.hit_a = 0;
    global.hit_b = 0;
    global.timescale = 1;
    global.keytarget;
    global.offline_evil_index = 1;
                  
    global.spirits = 100;
    global.bestiary = [{a:false}];
    global.shortcuts = [];
    global.msgs_max = 36;
    global.fps = 1;
}

function setup_data_objects() {
    window.listen = new Object();
    window.w_manager = new Object();
    window.creature = new Object();
    window.offline = new Object();
    window.effect = new Object();
    window.item = new Object();
    window.wpn = new Object();
    window.eqp = new Object();
    window.sld = new Object();
    window.acc = new Object();
    window.itemgroup = [item,wpn,eqp,sld,acc];
    window.rcp = new Object();
    window.zone = new Object();
    window.timers = new Object();
    window.chss = new Object();
    window.ttl = new Object();
    window.skl = new Object();
    window.abl = new Object();
    window.furniture = new Object();
    window.vendor = new Object();
    window.quest = new Object();
    window.act = new Object();
    window.test = new Object();
    window.callback = new Object();
    callback.onDeath = new callbackManager(1);
    callback.onDeath.fire = function(victim, killer){
        for (let a in this.hooks) {
            this.hooks[a].f(victim, killer);
        }
    }
    window.effector = new Object();
    window.planner = new Object();
    window.plans = [[],[],[]];

    window.acts = [];
    window.sector = new Object();
    window.sectors = [];
    window.check = new Object();
    window.checksd = [];
    window.inv = [];
    window.furn = [];
    window.qsts = [];
    window.dar = [[],[],[],[],[],[],[],[],[]];
    window.you = new Object();
    window.home = new Object();
    eqp.dummy = {};

    window.container = new Object();
    window.mastery = new Object();
}

function setup_world () {
    global.loc_spawn = chss.shack_bed;
}

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