import { YEAR, MONTH, DAY, WEEK, HOUR, SILVER, GOLD } from './constants.js';
import './encoding.js';
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

