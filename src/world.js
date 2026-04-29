function You() {
    this.name = 'You';
    this.title = ttl.new;
    this.desc = 'This is you';
    this.id = -1;
    this.type = 0;
    this.rank = function() {
        const stat_sum = this.agl + this.str + this.int + this.spd + you.eqp[0].str;
        const sum_spd_level_weight = this.agl + this.str + this.int + (this.spd / this.lvl);
        const luck_weight = this.luck * 0.1 + 1;
        const scale_factor = 850727696967670912
        // base game's scale factor is 50000000000000 ;o;

        return Math.ceil(scale_factor * ( 1 / ( ((stat_sum)**2) / Math.sqrt((sum_spd_level_weight) * 512 / luck_weight))));
    };
    this.rnk = 0;
    this.lvl = 1;
    this.exp = 0;
    this.expnext = function(){return this.lvl*((this.lvl*2)**2)+(this.lvl**2)}; this.expnext_t=this.expnext();
    this.exp_t = 1;
    this.efficiency = function() {
        let g = skl.fmn.use();
        g = g >= 0.6 ? 0.6 : g;
        let e = (0.8 - g) * this.sat / this.satmax + (0.2 + g) + you.mods.sbonus;
        return e < 0 ? 0 : e;
    }
    this.mods={sbonus:0,sdrate:.1,infsrate:1,enmondren:0,enmondrts:1,ddgmod:0,rdgrt:1,cpwr:1,crflt:0,wthexrt:0,tstl:0,lkdbt:0,ckfre:0,rnprtk:0,light:0,undc:0,petxp:.005,stdstps:1,survinf:0,runerg:1};
    this.ki=new Object();
    this.sat=this.satmax=this.sat_r = 200;
    this.hpmax = 39; 
    this.hp=this.hp_r = 39; 
    this.str=this.str_r=this.agl=this.agl_r=this.int=this.int_r=this.spd=this.spd_r=this.str_d=this.agl_d=this.int_d = 1;
    this.stra=this.agla=this.inta=this.spda=this.hpa=this.sata=0; this.strm=this.intm=this.spdm=this.aglm=this.hpm=this.satm=1
    this.stre = this.inte = this.agle = this.spde = this.sate = this.hpe = 1;
    this.stat_per_lvl=[1,1,1,1];
    this.res={poison:1,burn:1,frost:1,paralyze:1,blind:1,sleep:1,curse:1,death:1,bleed:1,ph:1,venom:1,fpoison:1};
    this.cls=[0,0,0];
    this.ccls=[0,0,0];
    this.aff = [
        0, // physical
        0, // air
        0, // earth
        0, // fire
        0, // water 
        0, // light
        0  // dark
    ];    
    this.maff=[0,0,0,0,0,0,0];  
    this.caff=[0,0,0,0,0,0,0];
    this.cmaff=[0,0,0,0,0,0,0];  
    this.dmlt=1;
    this.luck = 1; this.karma = 0;
    this.crt = .008;
    this.wealth = 0;
    this.eva=0;
    this.atkmode=1;
    this.alive = true;
    this.eqp = [eqp.dummy,eqp.dummy,eqp.dummy,eqp.dummy,eqp.dummy,eqp.dummy,eqp.dummy,eqp.dummy,eqp.dummy,eqp.dummy];
    this.eqp[0].ctype = 2;
    this.eff = [];
    this.skls = [];
    this.drop = [];

    this.onDeath = function(killer) { 
        if (you.res.death < 1) {
            msg('You avoid death...','lightgrey');
            you.hp = Math.ceil(you.hpmax * 0.1);
            return;
        }
        else {
            callback.onDeath.fire(this, killer);
            msg('You have been knocked unconscious...', 'lightgrey');
            if (global.flags.drop_badge_on_death) giveItem(item.death_badge);

            this.alive = false;
            this.hp = 1;
            if(!killer) killer=creature.default;

            if (global.current_a.id !== act.default.id) deactivateAct(global.current_a);
            global.flags.work = false;

            giveSkExp(skl.dth, you.sat / you.satmax > 0.3 ? killer.rnk * 10 + 1 : killer.rnk + 1);

            if (this.sat > 0) this.sat *= 0.55 * (1 - skl.dth.use());

            dom.d5_1_1.update();
            global.s_l = 0;
            global.stat.deadt++;

            for(let x in global.achchk[0]) global.achchk[0][x](killer);

            clearInterval(timers.rdng);
            clearInterval(timers.rdngdots);
            clearInterval(timers.job1t);
            clearInterval(timers.bstmonupdate);
            global.flags.rdng = false;

            for(let o in this.eff) removeEff(this.eff[o])

            global.flags.btl = false;
            global.flags.civil = true;

            global.current_z.onDeath();
            //move_to_area(global.loc_spawn);
            move_to_area(chss.shack_bed);

            dom.d7m.update();
            /*
            if(sector.home.data.smkp>0) {
                move_to_area(chss.village_center,false);
                msg('You ran out of your smoked up house','grey')
            } else {
                move_to_area(chss.home_bed, false);
                dom.d7m.update()
            }
            */
        }
    }
    this.onDeathE = function(){}
    this.ai = function(){}
    this.battle_ai = function(x,y,z){return attack(x,y)}
    this.stat_r = function(){ 
        this.stre=this.inte=this.agle=this.spde=this.sate=this.hpe=1;
        for(let idx in this.eff) this.eff[idx].mods();
        this.str = (this.str_r+this.stra)*this.strm*this.stre; this.str_d = this.str
        this.int = (this.int_r+this.inta)*this.intm*this.inte; this.int_d = this.int
        this.agl = (this.agl_r+this.agla)*this.aglm*this.agle; this.agl_d = this.agl
        this.spd = (this.spd_r+this.spda)*this.spdm*this.spde; this.spd_d = this.spd
        this.hpmax = Math.ceil((this.hp_r+this.hpa)*this.hpm*this.hpe); this.satmax = Math.ceil((this.sat_r+this.sata)*this.satm*this.sate);
        this.str_d+=this.eqp[0].str;
        this.dmlt=1;
        for(let obj in this.eqp) {
        this.int_d += this.eqp[obj].int;
        this.agl_d += this.eqp[obj].agl;
        this.spd += this.eqp[obj].spd;
        }
        for(let idx in this.eff) {
        if(this.eff[idx].type===2) {this.eff[idx].un();this.eff[idx].use(this.eff[idx].y,this.eff[idx].z)};
        } dom.d6.update(); update_db(); if(you.hp>you.hpmax)you.hp=you.hpmax; dom.d5_1_1.update();
    }
    this.timescale_sleeping = 5;
    /*
    you.ai = function() {
      //if(you.hp*100/you.hpmax<50) item.hrb1.use();
      //if(you.sat*100/you.satmax<90) item.appl.use();
    }
    //@Idea maybe use this somewhere later down the line ? shadow , clone , mirror world, dark-link type encounter?
    */
}


function Creature(op={}) {
    this.name = 'Nothing';
    this.desc = 'Empty space';
    this.type = 3; //0 - human (see global.text.mtp)
                   //1 - beast
                   //2 - undead
                   //3 - evil
                   //4 - phantom
                   //5 - dragon
    this.id = 0;
    this.lvl = 1;
    this.exp = 1;  // exp (dependent on level)
    this.stat_per_lvl = [1,1,1,1];     // stats per level (hp, str, agl, int)
    this.eqp = [eqp.dummy, eqp.dummy];
    this.cls = [0,0,0];          // edge, pierce, blunt, defense
    this.aff = [0,0,0,0,0,0,0];  //elemental defenses (phy air eth fir wtr lgt drk)
    this.res = {
        poison:1,
        burn:1,
        frost:1,
        paralyze:1,
        blind:1,
        sleep:1,
        curse:1,
        death:1,
        bleed:1,
        ph:1,
        venom:1,
        fpoison:1
    };
    this.atype = 0;
    this.ctype = 0;
    this.atkmode = 1;
    this.hp = this.hp_r = this.hpmax = 17;
    this.str = this.str_r = 1;    // _r refers to the stats at level 1.
    this.agl = this.agl_r = 1;
    this.int = this.int_r = 1;
    this.spd = this.spd_r = 1;
    this.stra = this.agla = this.inta = this.spda = this.hpa = 0;
    this.strm = this.intm = this.spdm = this.aglm = this.hpm = 1;
    this.crt = 0.008;
    this.dmlt = 1;
    this.rnk = 0;    // rank - (1, --G), (2, -G), ...
    this.pts = 1;
    this.eva = 0;
    this.data = { lstdmg : 0, oneshot : true };
    this.stat_r = function() {
        this.stre=this.inte=this.agle=this.spde=this.sate=this.hpe=1;
        for (let idx in this.eff) this.eff[idx].mods();
        this.str = (this.str_r+this.stra)*this.strm*this.stre; this.str_d = this.str;
        this.int = (this.int_r+this.inta)*this.intm*this.inte; this.int_d = this.int;
        this.agl = (this.agl_r+this.agla)*this.aglm*this.agle; this.agl_d = this.agl;
        this.spd = (this.spd_r+this.spda)*this.spdm*this.spde; this.spd_d = this.spd;
        this.hpmax = Math.ceil((this.hp_r+this.hpa)*this.hpm*this.hpe);
        this.dmlt=1;
        for (let idx in this.eff) {
            if (this.eff[idx].type===2) {
                this.eff[idx].un();
                this.eff[idx].use(this.eff[idx].y,this.eff[idx].z);
            };
        } update_m();
        if (this.hp>this.hpmax) this.hp=this.hpmax;
    };
    this.alive = true;
    this.eff = [];
    this.drop = [];
    this.onDeath = function(killer) { 
        callback.onDeath.fire(this,killer);
        this.hp = 0;
        let tt = 0; 
        this.alive = false;
        for(let obj in global.bestiary) { if(global.bestiary[obj].id===this.id) {global.bestiary[obj].kills++;break}
        if(++tt===global.bestiary.length)global.bestiary.push({id:this.id,kills:1});}
        global.stat.akills++; global.stat.pts+=this.pts; if(you.eqp[0].id!==10000) you.eqp[0].data.kills?you.eqp[0].data.kills++:(you.eqp[0].data.kills=1);
        if(this.type!==2&&this.type!==4) global.spirits++; else if(this.type===4) global.spirits--;
        if(global.flags.m_blh===false) msg(this.name+' died ','burlywood');
        global.flags.civil=true; global.flags.btl=false; let df = 1; let ld = this.lvl-you.lvl; if(ld<0) df=Math.sqrt(Math.abs(ld))+Math.abs(ld)*.1*Math.abs(ld);
        giveExp(this.exp+(this.exp*this.lvl/10<<0)/df); dropC(this); global.s_l=0;
        if(you.mods.enmondren>0) if(random()<you.mods.enmondren){let aam = 1+rand(this.lvl<<0,(this.lvl/4)<<0)**(1+(this.rnk/5)<<0)*you.mods.enmondrts ;giveWealth(rand(aam*.5<<0||1,aam*1.5<<0||1));} 
        if(--global.current_z.size>0) {
            zone_init(global.current_z);
        } else {
            if (global.current_z.size<=-1) {
                zone_init(global.current_z);
            } else {
                msg('Zone cleared','orange');
                global.current_z.onEnd();
                global.flags.civil = true;
                global.flags.btl = false;
            }
        }
        if(global.flags.to_pause===true) global.flags.btl = false;
        
        wpndiestt(killer,this);
        if(this.blood) global.stat.bloodt += this.blood;
        
        for(let a in checksd) checksd[a].f(this,checksd[a].o);
        for(let x in global.achchk[1]) global.achchk[1][x](killer);
        
        dom.d5_1_1m.update();
        dom.d7m.update();
        kill(this);
    };
    this.onDeathE = function() {
        giveSkExp(skl.war, (this.rnk*2-1)*(1+this.lvl*.05)*.1);
    };
    this.battle_ai = function(x,y,z) {
        return attack(x,y);
    };

    Object.assign(this, op);
}

function define_creatures() {
    creature.default = new Creature({});
    global.current_m = creature.default;

    creature.intro_beast = new Creature({
        name: 'Choleric Beastkin',
        id: 100,
        desc: 'A beast made powerful and angry by an excess in Qi.',
        type: 1,
        exp: 999999,
        hp_r: 999,
        stat_per_lvl: [0.8, 1, 1, 0.2],
        spd_r: 1
    });

    creature.bat = new Creature({
        name: 'Bat',
        id: 101,
        desc: 'Aggressive little bats living in the dark',
        type: 1,
        exp: 8,
        hp_r: 39,
        blood: 0.0852,
        stat_per_lvl: [0.5, 1, 1.5, 0.5],
        aff: [-5, 25, -5, -5, 10, -5, 5],
        cls: [-4, -7, -3],
        eqp: [{
            aff: [0, 12, -10, 0, 0, -5, 5],
            cls: [1, 1, 0]
        }],
        atype: 1,
        ctype: 1,
        str_r: 2,
        agl_r: 10,
        spd_r: 2,
        drop: [
            { item: item.sbone, chance: 0.1 },
            { item: item.appl, chance: 0.06 }
        ],
        rnk: 3,
        pts: 6
    });


    creature.spd1 = new Creature({
        name: 'Attic spider',
        id: 104,
        desc: 'Small docile spiders who live in damp and dark places',
        type: 1,
        exp: 8,
        hp_r: 26,
        stat_per_lvl: [0.6, 1.1, 1.6, 1],
        aff: [2, 5, 10, -35, 10, -5, 15],
        cls: [4, 6, -6],
        eqp: [{
            aff: [3, -5, 5, 0, 0, -5, 5],
            cls: [2, 1, 1]
        }],
        str_r: 3,
        agl_r: 8,
        spd_r: 2,
        rnk: 3,
        pts: 5,
        drop: [
            { item: item.ltcc, chance: 0.01 },
            { item: item.thrdnl, chance: 0.1 }
        ],
        battle_ai: function(x, y, z) {
            if (random() <= 0.3) return attack(x, y, abl.pbite, 3);
            return attack(x, y);
        }
    });


    creature.cbat = new Creature({ // https://www.youtube.com/watch?v=eN6jkWxxm2Y
        name: 'Cave bat',
        id: 109,
        desc: 'Large, agile bats that swooop down to strike from the air',
        drop: []
    });


    creature.stirge = new Creature({
        name: 'Stirge',
        id: 110,
        desc: "Giant vampire bats rumored to drain a victim's life in a single blow",
        drop: []
    });


    creature.tdummy = new Creature(); creature.tdummy.id = 103;
    creature.tdummy.name = 'Training dummy';
    creature.tdummy.desc = 'He\'s made of fabric'; 
    creature.tdummy.drop =[{item:wpn.knf1,chance:.01,cond:()=>{return you.lvl<=20}},{item:eqp.brc,chance:.03,cond:()=>{return you.lvl<=20}},{item:item.hrb1,chance:.02}];
    creature.tdummy.aff = [0,0,15,-25,-5,-666,666];
    creature.tdummy.stat_per_lvl=[.1,.5,.4,.2]
    creature.tdummy.ctype = 2;
    creature.tdummy.int_r = 0;
    creature.tdummy.rnk=1;
    creature.tdummy.battle_ai = function(x,y,z){
      if(random()<=.001) return attack(x,y,abl.rstab);
      return attack(x,y)
    }
    creature.tdummy.onDeathE = function(){};

    creature.sdummy = new Creature(); creature.sdummy.id = 102;
    creature.sdummy.name = 'Straw dummy';
    creature.sdummy.desc = 'He\'s made of straw';
    creature.sdummy.drop =[{item:item.sstraw,chance:.085},{item:item.hrb1,chance:.02}];
    creature.sdummy.aff = [0,0,15,-25,-5,-666,666];
    creature.sdummy.stat_per_lvl=[.25,.6,.3,.2];
    creature.sdummy.ctype = 2;
    creature.sdummy.int_r = 0;
    creature.sdummy.rnk=1;
    creature.sdummy.battle_ai = function(x,y,z){
      if(random()<=.001) return attack(x,y,abl.rstab);
      return attack(x,y)
    }
    creature.sdummy.onDeathE = function(){};

    creature.wdummy = new Creature(); creature.wdummy.id = 112;
    creature.wdummy.name = 'Wooden dummy';
    creature.wdummy.desc = 'He\'s made of wood';
    creature.wdummy.stat_per_lvl=[.4,.8,.12,.2];
    creature.wdummy.aff = [0,0,15,-30,20,-666,666];
    creature.wdummy.cls = [-1,2,4];
    creature.wdummy.str_r = 3;
    creature.wdummy.ctype = 2;
    creature.wdummy.rnk=1;
    creature.wdummy.drop =[{item:eqp.pnt,chance:.008,cond:()=>{return you.lvl<=20}},{item:eqp.vst,chance:.007,cond:()=>{return you.lvl<=20}},{item:eqp.bnd,chance:.01,cond:()=>{return you.lvl<=20}},{item:item.wdc,chance:.03},{item:wpn.wsrd2,chance:.002,cond:()=>{return you.lvl<=20}}];
    creature.wdummy.battle_ai = function(x,y,z){
      if(random()<=.001) return attack(x,y,abl.rstab);
      return attack(x,y)
    }
    creature.wdummy.onDeathE = function(){};

    creature.puppet = new Creature(); creature.puppet.id = 105;
    creature.puppet.name = 'Puppet';
    creature.puppet.desc = 'Animated doll with agile movements';
    creature.puppet.drop =[];
    creature.puppet.battle_ai = function(x,y,z){}

    creature.bpuppet = new Creature(); creature.bpuppet.id = 106;
    creature.bpuppet.name = 'Battle Puppet';
    creature.bpuppet.desc = 'Animated doll with martial ability';
    creature.bpuppet.drop =[];
    creature.bpuppet.battle_ai = function(x,y,z){}

    creature.doll = new Creature(); creature.doll.id = 107;
    creature.doll.name = 'Doll';
    creature.doll.desc = 'Child\'s toy possessed by an evil spirit';
    creature.doll.drop =[];
    creature.doll.battle_ai = function(x,y,z){}

    creature.ndoll = new Creature(); creature.ndoll.id = 108;
    creature.ndoll.name = 'Necro doll';
    creature.ndoll.desc = 'Evil Dolls used in dark rituals';
    creature.ndoll.drop =[];
    creature.ndoll.battle_ai = function(x,y,z){}

    creature.cdoll = new Creature(); creature.cdoll.id = 111;
    creature.cdoll.name = 'Quicksilver';
    creature.cdoll.desc = 'Dolls possessed by the souls of children who lost their lives to war or illness';
    creature.cdoll.drop =[];
    creature.cdoll.battle_ai = function(x,y,z){}

    creature.zomb1 = new Creature(); creature.zomb1.id = 113;
    creature.zomb1.name = 'Zombie';
    creature.zomb1.desc='Once the inhabitants of the surface, zombies emerge from the Dark to attack the living';

    creature.mumy = new Creature(); creature.mumy.id = 114;
    creature.mumy.name = 'Mummy';
    creature.mumy.desc = 'Ancient corpses infused with the power of Dark';

    creature.ghl = new Creature(); creature.ghl.id = 115;
    creature.ghl.name = 'Ghoul';
    creature.ghl.desc = 'Ghouls lurk in the Catacombs, longing for human flesh. Attacking their heads proves effective';

    creature.ght = new Creature(); creature.ght.id = 116;
    creature.ght.name = 'Ghast';
    creature.ght.desc = 'The living dead, given power by demons of the Underworld';

    creature.zmbf = new Creature(); creature.zmbf.id = 117;
    creature.zmbf.name = 'Zombie Fighter';
    creature.zmbf.desc = 'Corpses of common soldiers, brought back to life through the Dark\'s taint';

    creature.zmbk = new Creature(); creature.zmbk.id = 118;
    creature.zmbk.name = 'Zombie Knight';
    creature.zmbk.desc = 'Zombies of the Knights of the Cross, still in possession of potent martial skills';

    creature.zmbm = new Creature(); creature.zmbm.id = 119;
    creature.zmbm.name = 'Zombie Mage';
    creature.zmbm.desc = 'Zombies of Dark mages, who employ powerful offensive magic';

    creature.skl= new Creature(); 
    creature.skl.name = 'Skeleton'; creature.skl.id = 120;
    creature.skl.desc = 'Skeletal remains of zombie corpses. They lurk in darkness to attack the living';
    creature.skl.type = 2;
    creature.skl.exp = 15;
    creature.skl.hp_r = 132;
    creature.skl.stat_per_lvl=[1.3,1.15,1.05,.1];
    creature.skl.aff = [12,20,-4,-11,31,-33,51];
    creature.skl.cls = [0,9,-16];
    creature.skl.eqp[0].aff = [8,20,-4,-11,31,-33,51];
    creature.skl.eqp[0].cls = [2,5,5];
    creature.skl.ctype = 1;
    creature.skl.str_r = 17;
    creature.skl.agl_r = 19;
    creature.skl.spd_r = 2;
    creature.skl.drop =[];
    creature.skl.rnk=7;
    creature.skl.pts = 17;

    creature.slm1 = new Creature(); 
    creature.slm1.name = 'Blue Slime'; creature.slm1.id = 121;
    creature.slm1.desc = 'Lesser slimes, devoid of any senses. They survive by absorbing debris from the ground';
    creature.slm1.type = 1;
    creature.slm1.exp = 3;
    creature.slm1.hp_r = 65;
    creature.slm1.stat_per_lvl=[0.7,.8,1.5,.3];
    creature.slm1.aff = [5,5,15,-20,-15,25,34]
    creature.slm1.cls = [5,5,20];
    creature.slm1.eqp[0].aff = [2,5,0,-2,4,0,0];
    creature.slm1.eqp[0].cls = [1,1,1];
    creature.slm1.ctype = 2;
    creature.slm1.str_r = 2;
    creature.slm1.agl_r = 5; creature.slm1.eva = 6;
    creature.slm1.spd_r = 1;
    creature.slm1.drop =[{item:item.watr,chance:.01},{item:item.slm,chance:.03},{item:item.jll,chance:.01}];
    creature.slm1.rnk=2;
    creature.slm1.pts = 3;

    creature.slm2= new Creature(); 
    creature.slm2.name = 'Green Slime'; creature.slm2.id = 122;
    creature.slm2.desc = 'Small forest slimes. They hide in leaves and grass';
    creature.slm2.type = 1;
    creature.slm2.exp = 4;
    creature.slm2.hp_r = 70;
    creature.slm2.stat_per_lvl=[0.75,.85,1.5,.3];
    creature.slm2.aff = [5,5,15,-20,-15,25,34]
    creature.slm2.cls = [4,4,22];
    creature.slm2.eqp[0].aff = [2,12,5,-12,6,0,0];
    creature.slm2.eqp[0].cls = [2,2,2];
    creature.slm2.ctype = 1;
    creature.slm2.str_r = 3;
    creature.slm2.agl_r = 5; creature.slm2.eva = 6;
    creature.slm2.spd_r = 1;
    creature.slm2.drop =[{item:item.watr,chance:.01},{item:item.slm,chance:.04},{item:item.jll,chance:.01},{item:acc.jln2,chance:.0005},]; 
    creature.slm2.rnk=2;
    creature.slm2.pts = 3;

    creature.rbt1= new Creature(); 
    creature.rbt1.name = 'Wild Rabbit'; creature.rbt1.id = 123;
    creature.rbt1.desc = 'Docile rabbits, often found in plains and woods. They\'re difficult to catch';
    creature.rbt1.type = 1;
    creature.rbt1.exp = 5;
    creature.rbt1.stat_per_lvl=[1,.9,2,.3];
    creature.rbt1.aff = [6,15,15,-10,16,33,2]
    creature.rbt1.cls = [4,-2,5];
    creature.rbt1.eqp[0].aff = [5,6,6,0,2,0,0];
    creature.rbt1.eqp[0].cls = [2,3,1];
    creature.rbt1.ctype = 1;
    creature.rbt1.hp_r = 55;
    creature.rbt1.blood = .108
    creature.rbt1.str_r = 2;
    creature.rbt1.agl_r = 10; creature.rbt1.eva = 40;
    creature.rbt1.spd_r = 2;
    creature.rbt1.drop =[{item:item.sbone,chance:.1},{item:item.rwmt1,chance:.06},{item:item.crrt,chance:.04},{item:acc.rfot,chance:.00004}];
    creature.rbt1.rnk=2;
    creature.rbt1.pts = 4;

    creature.slm3= new Creature(); 
    creature.slm3.name = 'Cyan Slime'; creature.slm3.id = 124;
    creature.slm3.desc = 'Brightly colored slime. It looks like it can perfectly reflect the sky';
    creature.slm3.type = 1;
    creature.slm3.exp = 8;
    creature.slm3.hp_r = 120;
    creature.slm3.stat_per_lvl=[1.2,1.2,2.9,.8];
    creature.slm3.aff = [15,5,15,-10,-5,55,34]
    creature.slm3.cls = [9,9,24];
    creature.slm3.eqp[0].aff = [4,6,7,-12,6,0,0];
    creature.slm3.eqp[0].cls = [4,4,4];
    creature.slm3.ctype = 1; creature.slm3.atype = 1;
    creature.slm3.str_r = 5;
    creature.slm3.agl_r = 8; creature.slm3.eva = 15; 
    creature.slm3.spd_r = 2;
    creature.slm3.drop =[{item:item.watr,chance:.03},{item:item.slm,chance:.05},{item:item.jll,chance:.02}];
    creature.slm3.rnk=3;
    creature.slm3.pts = 4;

    creature.slm4= new Creature();
    creature.slm4.name = 'Clear Slime'; creature.slm4.id = 125;
    creature.slm4.desc = 'Weird transparent slime, bearing no distinct color. They can hide anywhere and are very difficult to notice';
    creature.slm4.type = 1;
    creature.slm4.exp = 10;
    creature.slm4.hp_r = 95;
    creature.slm4.stat_per_lvl=[1.24,1.23,2.97,.82];
    creature.slm4.aff = [15,5,15,-10,-5,55,34]
    creature.slm4.cls = [12,12,28];
    creature.slm4.eqp[0].aff = [4,9,7,-12,12,0,0];
    creature.slm4.eqp[0].cls = [6,5,4];
    creature.slm4.ctype = 2;  creature.slm4.atype = 4;
    creature.slm4.str_r = 9;
    creature.slm4.agl_r = 9; creature.slm4.eva = 20;
    creature.slm4.spd_r = 2;
    creature.slm4.drop =[{item:item.watr,chance:.035},{item:item.slm,chance:.02},{item:item.jll,chance:.06}];
    creature.slm4.rnk=3;
    creature.slm4.pts = 5;

    creature.kksh = new Creature(); //u
    creature.kksh.name = 'Scarecrow'; creature.kksh.id = 126;
    creature.kksh.desc = 'Once protector of fields, this figure has turned to evil by the influence of Dark. It hangs still in ambush, waiting for unsuspecting passersby';
    creature.kksh.exp = 5;
    creature.kksh.hp_r = 100;
    creature.kksh.stat_per_lvl=[1.1,1.2,2.9,.8];
    creature.kksh.aff = [15,5,15,-10,-5,55,34]
    creature.kksh.cls = [9,9,35];
    creature.kksh.eqp[0].aff = [4,12,7,-12,6,0,0];
    creature.kksh.eqp[0].cls = [5,5,5];
    creature.kksh.ctype = 1; creature.kksh.atype = 1;
    creature.kksh.str_r = 5;
    creature.kksh.agl_r = 13;
    creature.kksh.spd_r = 2;
    creature.kksh.drop =[{item:item.watr,chance:.03},{item:item.slm,chance:.06},{item:item.jll,chance:.02}];
    creature.kksh.rnk=10;

    creature.golem1 = new Creature(); 
    creature.golem1.name = 'Straw Golem'; creature.golem1.id = 127;
    creature.golem1.desc = 'Big golem composed of straw. These golems are brittle and weak, their main purpose is to assist newbies in training';
    creature.golem1.exp = 50;
    creature.golem1.hp_r = 500;
    creature.golem1.stat_per_lvl=[0.05,0.2,0.2,0.2];
    creature.golem1.aff = [10,8,5,-60,-5,15,14]
    creature.golem1.cls = [10,15,10];
    creature.golem1.eqp[0].aff = [9,5,25,6,6,2,13];
    creature.golem1.eqp[0].cls = [2,2,10];
    creature.golem1.ctype = 2; 
    creature.golem1.str_r = 15;
    creature.golem1.agl_r = 30;
    creature.golem1.spd_r = 3;
    creature.golem1.drop =[{item:item.sstraw,chance:1,min:13,max:25},{item:item.lsrd,chance:1}];
    creature.golem1.rnk=4; creature.golem1.un=true;
    creature.golem1.pts = 200;

    creature.golem2 = new Creature(); 
    creature.golem2.name = 'Reinforced Straw Golem'; creature.golem2.id = 128;
    creature.golem2.desc = 'This golem\'s joints have been binded by the rope, giving it sturdier and more stable frame';
    creature.golem2.exp = 60;
    creature.golem2.hp_r = 700;
    creature.golem2.stat_per_lvl=[0.06,0.25,0.2,0.25];
    creature.golem2.aff = [11,8,5,-60,-5,15,14]
    creature.golem2.cls = [11,16,11];
    creature.golem2.eqp[0].aff = [10,5,25,6,6,2,13];
    creature.golem2.eqp[0].cls = [3,3,11];
    creature.golem2.ctype = 2; 
    creature.golem2.str_r = 18;
    creature.golem2.agl_r = 35;
    creature.golem2.spd_r = 3;
    creature.golem2.rnk=4; creature.golem2.un=true;
    creature.golem2.drop =[{item:item.sstraw,chance:1,min:13,max:25},{item:item.lsrd,chance:1,min:2,max:2},{item:item.rope,chance:.1}];
    creature.golem2.pts = 400;

    creature.golem3 = new Creature(); 
    creature.golem3.name = 'Paper Golem'; creature.golem3.id = 129;
    creature.golem3.desc = 'Slim golem made of paper-like material. While not as tough as other training golems, it has a light body which allows it to move faster';
    creature.golem3.exp = 80;
    creature.golem3.hp_r = 400;
    creature.golem3.stat_per_lvl=[0.06,0.3,0.3,0.3];
    creature.golem3.aff = [11,8,5,-60,-5,15,14]
    creature.golem3.cls = [10,20,14];
    creature.golem3.eqp[0].aff = [10,5,25,6,6,2,13];
    creature.golem3.eqp[0].cls = [3,3,14];
    creature.golem3.ctype = 2; 
    creature.golem3.str_r = 21;
    creature.golem3.agl_r = 70;
    creature.golem3.spd_r = 4;
    creature.golem3.rnk=4; creature.golem3.un=true;
    creature.golem3.drop =[{item:item.lsrd,chance:1,min:4,max:4},{item:item.bhd,chance:.5,min:1,max:4}];
    creature.golem3.pts = 500;

    creature.golem4 = new Creature(); 
    creature.golem4.name = 'Attack Golem'; creature.golem4.id = 130;
    creature.golem4.desc = 'Golem with implanted martial prowess. Somewhat similar to a trained militant, they pose a dangerous threat to any unprepared opponent';
    creature.golem4.exp = 120;
    creature.golem4.hp_r = 730;
    creature.golem4.stat_per_lvl=[0.06,0.3,0.3,0.3];
    creature.golem4.aff = [19,8,5,-60,-5,15,14]
    creature.golem4.cls = [20,25,18];
    creature.golem4.eqp[0].aff = [11,5,25,6,6,2,13];
    creature.golem4.eqp[0].cls = [3,3,13];
    creature.golem4.ctype = 2; 
    creature.golem4.str_r = 25;
    creature.golem4.agl_r = 50;
    creature.golem4.spd_r = 4;
    creature.golem4.rnk=5; creature.golem4.un=true;
    creature.golem4.pts = 800;
    creature.golem4.drop =[{item:item.lsstn,chance:1}];
    creature.golem4.battle_ai = function(x,y,z){
      if(random()<=.2) return attack(x,y,abl.bash);
      return attack(x,y)
    }

    creature.ngtmr1 = new Creature(); 
    creature.ngtmr1.name = 'Nightmare'; creature.ngtmr1.id = 131;
    creature.ngtmr1.desc = 'Manifestation of your fears';
    creature.ngtmr1.exp = 1;
    creature.ngtmr1.hp_r = 100000000;
    creature.ngtmr1.stat_per_lvl=[0,0,0,0];
    creature.ngtmr1.cls = [9999,9999,9999];
    creature.ngtmr1.str_r = 1;
    creature.ngtmr1.agl_r = 1;
    creature.ngtmr1.rnk=0;
    creature.ngtmr1.battle_ai = function(){
      return false
    }

    creature.lrck = new Creature(); 
    creature.lrck.name = 'Locked Rock'; creature.lrck.id = 132;
    creature.lrck.desc = 'A rock shaped monster found in caves and dungeons. It has a habit of closing of paths by mimicking a wall, but it\'s fighting prowess is close to zero.';
    creature.lrck.exp = 123;
    creature.lrck.hp_r = 9000;
    creature.lrck.stat_per_lvl=[1.5,1.2,1,1];
    creature.lrck.cls = [90,120,60];
    creature.lrck.str_r = 90;
    creature.lrck.agl_r = 1;
    creature.lrck.rnk=11;
    creature.lrck.battle_ai = function(){
      return false
    }

    creature.lsprt = new Creature(); //u
    creature.lsprt.name = 'Lamp Spirit'; creature.lsprt.id = 133;
    creature.lsprt.desc = 'Small fire sprites that manifest inside oil lamps located in mines and other places with low human activity. While not sinister by nature, they enjoy playing pranks on people';
    creature.lsprt.exp = 5;
    creature.lsprt.hp_r = 100;
    creature.lsprt.stat_per_lvl=[1.1,1.2,2.9,.8];
    creature.lsprt.aff = [15,5,15,-10,-5,55,34]
    creature.lsprt.cls = [9,9,35];
    creature.lsprt.eqp[0].aff = [4,12,7,-12,6,0,0];
    creature.lsprt.eqp[0].cls = [5,5,5];
    creature.lsprt.ctype = 1; creature.lsprt.atype = 1;
    creature.lsprt.str_r = 5;
    creature.lsprt.agl_r = 13;
    creature.lsprt.spd_r = 2;
    creature.lsprt.drop =[{item:item.watr,chance:.03},{item:item.slm,chance:.06},{item:item.jll,chance:.02}];
    creature.lsprt.rnk=10;

    creature.dcrps1 = new Creature(); creature.dcrps1.id = 134;
    creature.dcrps1.name = 'Disaster Corpse';
    creature.dcrps1.desc = 'Undead bodies manifested purely by death ki. They appear in ancient battlefields or other areas with extremely heavy concentration of dark ki. These corpses share countless memories of residue souls';

    creature.unsctn = new Creature(); creature.unsctn.id = 135;
    creature.unsctn.name = 'Unchanging Skeleton';
    creature.unsctn.desc = 'People that neither die nor dissolve, active in the world but don\'t have minds or memories. They won\'t hurt people other than pulling pranks and causing trouble, but would go frenzy if exposed to death ki for too long';

    creature.wolf1= new Creature(); 
    creature.wolf1.name = 'Weakened Wolf'; creature.wolf1.id = 136;
    creature.wolf1.desc = 'Wolves affected by a disease or other negative influences. While not nearly as dangerous as its healthy counterpart, even in such a low state they pose danger to those who aren\'t careful'//'Predatorous inhabitants of forests with a proud character. They stalk their prey and hunt in packs';
    creature.wolf1.type = 1;
    creature.wolf1.exp = 15;
    creature.wolf1.hp_r = 400;
    creature.wolf1.stat_per_lvl=[1.3,1.15,1.35,.9];
    creature.wolf1.aff = [22,20,-4,-11,31,-33,51];
    creature.wolf1.cls = [36,32,45];
    creature.wolf1.eqp[0].aff = [12,20,-4,-11,31,-33,51];
    creature.wolf1.eqp[0].cls = [8,9,8];
    creature.wolf1.ctype = 1;
    creature.wolf1.str_r = 20;
    creature.wolf1.agl_r = 20;
    creature.wolf1.int_r = 10;
    creature.wolf1.spd_r = 3; creature.wolf1.eva = 25;
    creature.wolf1.drop =[{item:item.sbone,chance:.15},{item:item.rwmt1,chance:.06},{item:item.wfng,chance:.005}];
    creature.wolf1.rnk=4;
    creature.wolf1.blood = .986
    creature.wolf1.pts = 9;
    creature.wolf1.battle_ai = function(x,y,z){
      if(random()<=.3) return attack(x,y,abl.bite);
      else if (random()<=.1) return attack(x,y,abl.scratch)
      return attack(x,y)
    }

    creature.slm5= new Creature();
    creature.slm5.name = 'Blue Slime'; creature.slm5.id = 137;
    creature.slm5.desc = 'Slime of a very deep darkblue hue, which looks shiny under the light and almost completely dark in the shade';
    creature.slm5.type = 1;
    creature.slm5.exp = 12;
    creature.slm5.hp_r = 220;
    creature.slm5.stat_per_lvl=[0.5,1.1,2.97,.6];
    creature.slm5.aff = [19,15,15,3,-5,55,34]
    creature.slm5.cls = [23,23,23];
    creature.slm5.eqp[0].aff = [4,9,7,-12,12,0,0];
    creature.slm5.eqp[0].cls = [7,7,7];
    creature.slm5.ctype = 2;  creature.slm5.atype = 4;
    creature.slm5.str_r = 8;
    creature.slm5.agl_r = 9; creature.slm5.eva = 22;
    creature.slm5.spd_r = 2;
    creature.slm5.drop =[{item:item.watr,chance:.085},{item:item.slm,chance:.03},{item:item.jll,chance:.07},{item:acc.jln3,chance:.0005}];
    creature.slm5.rnk=3;
    creature.slm5.pts = 5;
    creature.slm5.battle_ai = function(x,y,z){
      if(random()<=.15) return attack(x,y,abl.bash);
      return attack(x,y)
    }
}


function Ability(id){
    this.name=''; this.id=id||0
    this.atrg=' -> ';
    this.btrg=' -> ';
    this.cls;
    this.aff; this.affp=0
    this.stt=1;
    this.f=function(x,
     y){return dmg_calc(x,y,this)}
}

function define_abilities() {
    abl.default = new Ability();

    abl.bite = new Ability(1);
    abl.bite.name = 'Bite'; 
    abl.bite.atrg=' <span style="color:hotpink">bites you</span> -> ';
    abl.bite.f = function(x,y,z){
      if(random()<.15) {
        let f = findbyid(y.eff,effect.bled.id); 
        if(random()<y.res.bleed) {giveEff(y,effect.bled,10,z||4); if(f) f.duration+=6}
      }
      return dmg_calc(x,y,this)*1.15;
    }

    abl.rstab = new Ability(2);
    abl.rstab.name = 'Selfharm'; 
    abl.rstab.atrg=' <span style="color:magenta">stabs you with something rusty</span> -> ';
    abl.rstab.cls=1; 
    abl.rstab.f = function(x,y){
      if(you.res.poison>=random()) {if(effect.psn.active===false) giveEff(you,effect.psn,5,1); else effect.psn.duration+=5; }
      return dmg_calc(x,y,this)*1.1;
    }

    abl.scrtch = new Ability(3);
    abl.scrtch.name = 'Scratch'; 
    abl.scrtch.atrg=' <span style="color:hotpink">scratches you</span> -> ';
    abl.scrtch.cls=0; 
    abl.scrtch.f = function(x,y,z){
      if(random()<.05) {
        let f = findbyid(y.eff,effect.bled.id); 
        if(random()<y.res.bleed) {giveEff(y,effect.bled,5,z||3);if(f) f.duration+=3}
      }
      return dmg_calc(x,y,this)*1.1;
    }

    abl.spark = new Ability(4);
    abl.spark.name = 'Spark'; 
    abl.spark.atrg=' <span style="color:yellow">electrocutes you</span> -> ';
    abl.spark.btrg=' <span style="color:yellow">electrocute the enemy</span> -> ';
    abl.spark.cls=1; abl.spark.aff=1; abl.spark.stt=2; abl.spark.affp=25;
    abl.spark.f = function(x,y){
      return dmg_calc(x,y,this)*1.2;
    }

    abl.dstab = new Ability(5);
    abl.dstab.name = 'Double Stab'; 
    abl.dstab.atrg=' <span style="color:pink">doublestabs you</span> -> ';
    abl.dstab.btrg=' <span style="color:pink">You doublestab the enemy</span> -> ';
    abl.dstab.cls=1; 
    abl.dstab.f = function(x,y){
      return (dmg_calc(x,y,this)*0.7+dmg_calc(x,y,this)*0.7)
    }

    abl.pbite = new Ability(6);
    abl.pbite.name = 'Poison Bite'; 
    abl.pbite.atrg=' <span style="color:magenta">bites you</span> -> ';
    abl.pbite.cls=1;
    abl.pbite.f = function(x,y,z){
      if(random()<.25) {
        if(random()<y.res.poison) giveEff(y,effect.psn,15,z||3)
      }
      return dmg_calc(x,y,this)*1.15;
    }

    abl.bash = new Ability(7);
    abl.bash.name = 'Bash'; 
    abl.bash.atrg=' <span style="color:lightgrey">bashes you</span> -> ';
    abl.bash.cls=2; 
    abl.bash.f = function(x,y){
      return dmg_calc(x,y,this)*1.3
    }
}


function Effector() {
    this.id = 0;
    this.x = '@';
    this.c = 'white';
    this.active = false;
    this.activate = function(){}
    this.deactivate = function(){}
    this.use = function(){}
}

function define_effectors() {
    effector.dark = new Effector();
    effector.dark.activate = function(){global.flags.isdark = true}
    effector.dark.deactivate = function(){global.flags.isdark = false}
    effector.dark.x = '闇'; effector.dark.c = 'darkgrey';

    effector.shop = new Effector();
    effector.shop.activate = function(){global.flags.isshop = true}
    effector.shop.deactivate = function(){global.flags.isshop = false}
    effector.shop.x = '$'; effector.shop.c = 'gold';
}

function activateEffectors(e){ if(!e) return; 
  for(let a in e) if(!e[a].e.active&&(!e[a].c||e[a].c()===true)) {e[a].e.activate(); e[a].e.active = true}
}

function deactivateEffectors(e){ if(!e) return
  for(let a in e) if(e[a].e.active) {e[a].e.deactivate(); e[a].e.active = false}
}

function runEffectors(e){ if(!e) return
  for(let a in e) e[a].e.use();
}


function Zone(op={}) {
    this.id=0;
    this.name='Nowhere';
    this.size=10;
    this.pop=[];
    this.drop=[];
    this.effectors=[];
    this.onEnd=function(){};
    this.onDeath=function(){};
    this.protected=false;

    Object.assign(this, op);
    z_bake(this);
}

function define_zones() {
    //debug
    window.testz = new Zone();
    testz.apop = 4000;
    testz.bpop = 6000;
    testz.vsize = 10000;
    global.zone_a_p[0]=testz;


    zone.nwh = new Zone ({
        id: 101,
        name: 'Somewhere',
        size: 1,
        pop: [  // c is the percent from 0.0-1.0 that this creature will show up compared to other creatures.
                // the sum of all c values should equal 1.
            { crt: creature.default, lvlmin: 1, lvlmax: 1, c: 1 }
        ]
    });
    global.current_z = zone.nwh;


    zone.intro_woods = new Zone ({
        id: 102,
        name: 'Western Woods',
        size: 1,
        pop: [
            { crt: creature.intro_beast, lvlmin: 30, lvlmax: 30, c: 1 }
        ],
        onEnd() {
            msg("The choleric beast's powers flow into you", 'gold');
            msg("Give me a real challenge.", 'lightyellow');
        },
        onDeath() {
            global.time += 5*HOUR;
            global.flags.can_open_wallet = true;
        }
    });


    zone.trn = new Zone({
        id: 202,
        name: 'Training Grounds',
        size: 10000,
        pop: [
            { crt: creature.sdummy, lvlmin: 1, lvlmax: 9, c: .3 },
            { crt: creature.tdummy, lvlmin: 4, lvlmax: 8, c: .3 },
            { crt: creature.wdummy, lvlmin: 3, lvlmax: 5, c: .3 }
        ],
        drop: [
            { item: item.appl, c: 0.02 },
            { item: acc.gpin, c: 0.00012, cond: () => ttl.tqtm.tget }
        ],
        onEnd() {
            this.size = -1;
            giveTitle(ttl.thr);
            global.flags.trnex1 = true;
            move_to_area(chss.t3, false);
        }
    });


    zone.trn1 = new Zone({
        id: 203,
        name: 'Training Grounds',
        size: 10,
        pop: [
            { crt: creature.sdummy, lvlmin: 1, lvlmax: 1, c: 0.5 },
            { crt: creature.tdummy, lvlmin: 1, lvlmax: 1, c: 0.5 }
        ],
        drop: [
            { item: item.appl, c: .28 }
        ],
        onEnd: function () {
            move_to_area(chss.t2, false);
            global.flags.tr1_win = true;
        },
        onDeath: function () {
            if (!global.flags.dj1end) global.flags.nbtfail = true;
        }
    });


    zone.trn2 = new Zone({
        id: 204,
        name: 'Training Grounds',
        size: 20,
        pop: [
            { crt: creature.sdummy, lvlmin: 1, lvlmax: 3, c: 0.4 },
            { crt: creature.tdummy, lvlmin: 1, lvlmax: 3, c: 0.6 }
        ],
        drop: [
            { item: item.appl, c: 0.28 }
        ],
        onEnd: function () {
            move_to_area(chss.t2, false);
            global.flags.tr2_win = true;
        },
        onDeath: function () {
            if (!global.flags.dj1end) global.flags.nbtfail = true;
        }
    });


    zone.trn3 = new Zone({
        id: 205,
        name: 'Training Grounds',
        size: 50,
        pop: [
            { crt: creature.sdummy, lvlmin: 3, lvlmax: 5, c: 0.35 },
            { crt: creature.tdummy, lvlmin: 2, lvlmax: 3, c: 0.45 },
            { crt: creature.wdummy, lvlmin: 1, lvlmax: 1, c: 0.25 }
        ],
        drop: [
            { item: item.appl, c: 0.28 }
        ],
        onEnd: function () {
            move_to_area(chss.t2, false);
            global.flags.tr3_win = true;
        },
        onDeath: function () {
            if (!global.flags.dj1end) global.flags.nbtfail = true;
        }
    });


    zone.clg = new Zone({
        id: 206,
        name: 'Damp cellar',
        size: 33,
        pop: [
            { crt: creature.bat,  lvlmin: 1, lvlmax: 4 },
            { crt: creature.spd1, lvlmin: 2, lvlmax: 4 }
        ],
        onEnd: function () {
            if (!global.flags.q1lwn) {
                global.flags.q1lwn = true;
                move_to_area(chss.q1lwn, false);
            } else {
                move_to_area(chss.q1l, false);
            }
        }
    });

    zone.trnf = new Zone({
        id: 207,
        name: "Training Grounds",
        size: -1,
        pop: [
            { crt:creature.sdummy, lvlmin:1, lvlmax:12, c: 0.3 },
            { crt:creature.tdummy, lvlmin:7, lvlmax:13, c: 0.3 },
            { crt:creature.wdummy, lvlmin:8, lvlmax:10, c: 0.3 }
        ],
        drop: [
            { item: acc.gpin, c: 0.00012, cond: () => { return ttl.tqtm.tget }}
        ],
        protected: true
    });


    zone.tst = new Zone({
        id: 208,
        name: 'Test',
        size: -1,
        pop: [
            { crt: creature.skl, lvlmin: 1, lvlmax: 1, c: 1 }
        ],
        onEnd: function () {}
    });


    zone.forestn1a2 = new Zone({
        id: 209,
        name: 'Western forest hunting area',
        size: 60,
        pop: [
            { crt: creature.rbt1, lvlmin: 1, lvlmax: 5, c: 0.20 },
            { crt: creature.slm1, lvlmin: 1, lvlmax: 6, c: 0.40 },
            { crt: creature.slm2, lvlmin: 1, lvlmax: 6, c: 0.40 }
        ],
        drop: [
            { item: item.hrb1, c: 0.02 },
            { item: item.wdc,  c: 0.05 }
        ],
        onEnd: function () {
            roll(item.acrn, 0.2, 1, 3);
            roll(item.wbrs, 0.2, 1, 3);
            roll(item.cp,   0.5, 1, 5);
            roll(wpn.knf2,  0.06);
            roll(wpn.ktn1,  0.04);
            roll(item.hrb1, 0.6, 1, 4);
            roll(wpn.stk1,  0.3);
            roll(item.sbone,0.1, 1, 3);
            giveItem(item.wbrs, rand(1, 2));
            roll(item.wdc,  1, 7, 22);
            roll(item.spb,  0.7);
            roll(item.pcn,  0.1, 1, 2);

            this.size = rand(40) + 30;
            move_to_area(chss.forestn1a2);
        }
    });


    zone.hmbsmnt = new Zone({
        id: 210,
        name: 'Your basement',
        size: 10,
        pop: [
            { crt: creature.bat,  lvlmin: 10, lvlmax: 17, c: 0.50 },
            { crt: creature.spd1, lvlmin: 10, lvlmax: 17, c: 0.50 }
        ],
        drop: [
            { item: item.cp,      c: 0.05  },
            { item: item.lcn,     c: 0.003 },
            { item: item.cn,      c: 0.02  },
            { item: item.cd,      c: 0.01  },
            { item: item.wdc,     c: 0.08  },
            { item: acc.wpeny,    c: 0.001 }
        ],
        onEnd: function () {
            move_to_area(chss.bsmnthm1, false);
        }
    });


    zone.trne1 = new Zone({
        id: 211,
        name: 'Training Grounds',
        size: 1,
        protected: true,
        pop: [
            { crt: creature.golem1, lvlmin: 20, lvlmax: 20, c: 1 }
        ],
        onEnd: function () {
            this.size = 1;
            if (!global.flags.trne1e1) {
                move_to_area(chss.trne1e1, false);
            } else {
                move_to_area(chss.t3, false);
            }
        }
    });


    zone.forestn2a2 = new Zone({
        id: 212,
        name: 'Western forest hunting area',
        size: 50,
        pop: [
            { crt: creature.rbt1, lvlmin: 1, lvlmax: 7, c: 0.25 },
            { crt: creature.slm1, lvlmin: 1, lvlmax: 8, c: 0.20 },
            { crt: creature.slm2, lvlmin: 1, lvlmax: 8, c: 0.20 },
            { crt: creature.slm3, lvlmin: 1, lvlmax: 5, c: 0.25 }
        ],
        drop: [
            { item: item.hrb1, c: 0.03 },
            { item: item.wdc,  c: 0.06 }
        ],
        onEnd: function () {
            roll(item.acrn, 0.2, 1, 3);
            roll(item.cp,   0.2, 1, 8);
            roll(wpn.knf2,  0.03);
            roll(wpn.ktn1,  0.04);
            roll(item.hrb1, 0.4, 2, 5);

            roll(wpn.stk1,  0.4);
            roll(item.sbone,0.2, 1, 3);
            giveItem(item.wbrs, rand(1, 3));
            roll(item.wdc,  1, 5, 17);
            roll(item.spb,  0.6);
            roll(item.pcn,  0.3, 1, 3);

            if (!global.flags.wp2sgt) roll(item.wp2s, 0.2);

            this.size = rand(50) + 40;

            if (!global.flags.forestn1a3u) {
                msg('You have discovered a new hunting area', 'lime');
                global.flags.forestn1a3u = true;
                move_to_area(chss.forestn1main);
            } else {
                move_to_area(chss.forestn1a2);
            }
        }
    });


    zone.trne2 = new Zone({
        id: 213,
        name: 'Training Grounds',
        size: 1,
        protected: true,
        pop: [
            { crt: creature.golem2, lvlmin: 23, lvlmax: 23, c: 1 }
        ],
        onEnd: function () {
            this.size = 1;
            if (!global.flags.trne2e1) {
                move_to_area(chss.trne2e1, false);
            } else {
                move_to_area(chss.t3, false);
            }
        }
    });


    zone.trne3 = new Zone({
        id: 214,
        name: 'Training Grounds',
        size: 1,
        protected: true,
        pop: [
            { crt: creature.golem3, lvlmin: 25, lvlmax: 25, c: 1 }
        ],
        onEnd: function () {
            this.size = 1;
            if (!global.flags.trne3e1) {
                move_to_area(chss.trne3e1, false);
            } else {
                move_to_area(chss.t3, false);
            }
        }
    });


    zone.forestn1a3 = new Zone({
        id: 215,
        name: 'Western forest hunting area',
        size: -1,
        protected: true,
        pop: [
            { crt: creature.rbt1, lvlmin: 3, lvlmax: 8, c: 0.35 },
            { crt: creature.slm1, lvlmin: 3, lvlmax: 9, c: 0.15 },
            { crt: creature.slm2, lvlmin: 3, lvlmax: 9, c: 0.15 },
            { crt: creature.slm3, lvlmin: 2, lvlmax: 5, c: 0.20 }
        ],
        drop: [
            { item: item.hrb1,   c: 0.009   },
            { item: item.wdc,    c: 0.025   },
            { item: item.acrn,   c: 0.001   },
            { item: item.mshr,   c: 0.002   },
            { item: item.cp,     c: 0.002   },
            { item: wpn.knf2,    c: 0.00009 },
            { item: wpn.ktn1,    c: 0.00006 },
            { item: wpn.stk1,    c: 0.0007  },
            { item: item.sbone,  c: 0.0009  },
            { item: item.wbrs,   c: 0.003   },
            { item: item.spb,    c: 0.0004  },
            { item: item.pcn,    c: 0.001   },
            { item: item.fwd1,   c: 0.0009  }
        ]
    });


    zone.forestn1a4 = new Zone({
        id: 216,
        name: 'Western forest hidden area',
        size: 25,
        protected: true,
        pop: [
            { crt: creature.slm4, lvlmin: 9, lvlmax: 11, c: 1 }
        ],
        drop: [
            { item: item.cp,     c: 0.006  },
            { item: wpn.stk1,    c: 0.0009 },
            { item: item.sbone,  c: 0.0005 }
        ],
        onEnd: function () {
            chss.forestn1a4.sl();
        }
    });


    zone.trne4 = new Zone({
        id: 217,
        name: 'Training Grounds',
        size: 1,
        protected: true,
        pop: [
            { crt: creature.golem4, lvlmin: 28, lvlmax: 28, c: 1 }
        ],
        onEnd: function () {
            this.size = 1;
            if (!global.flags.trne4e1) {
                move_to_area(chss.trne4e1, false);
            } else {
                move_to_area(chss.t3, false);
            }
            giveTitle(ttl.aptc);
        }
    });


    zone.forestn9a1 = new Zone({
        id: 218,
        name: 'Southern forest hunting area',
        size: 48,
        pop: [
            { crt: creature.wolf1, lvlmin: 7,  lvlmax: 8,  c: 0.25 },
            { crt: creature.slm5,  lvlmin: 10, lvlmax: 11, c: 0.75 }
        ],
        drop: [
            { item: item.hrb1, c: 0.03 },
            { item: item.wdc,  c: 0.06 }
        ],
        onEnd: function () {
            roll(item.acrn, 0.2, 1, 5);
            roll(item.mshr, 0.35, 1, 3);
            roll(wpn.stk1,  0.15);
            roll(item.sbone,0.3, 1, 3);
            roll(item.wdc,  1, 5, 17);
            roll(item.appl, 0.25, 2, 5);
            roll(item.pcn,  0.5, 1, 3);

            this.size = rand(20) + 40;
            move_to_area(chss.forestn3main);
        }
    });
}

function z_bake(zone) { // convert pop into weighted prob. range; bake population
    const weights_raw  = zone.pop.reduce((sum, entry) => sum + entry.c, 0);
    const weights_norm = zone.pop.map(entry => entry.c / weights_raw);
    const ranges = [];
    let cum = 0; // :thinking:

    weights_norm.forEach((weight, idx) => {
        const start = cum;
        cum += weight;

        const end = (idx === weights_norm.length - 1) ? 1 : cum;
        ranges.push([start, end]);
    });

    zone.popc = ranges;
}


function Sector(op={}){
    this.id=0
    this.inside=false,
    this.default_data={},
    this.group=[0];
    this.data={};
    this.active=false;
    this.onEnter=function(){}
    this.onLeave=function(){}
    this.onStay=function(){}
    this.onMove=function(){}
    this.onScout=function(){}

    Object.assign(this, op);
}

function add_to_sector(sector, loc, verbose=false){
    if (verbose===true) console.log(`sector: ${JSON.stringify(sector)}  location: ${loc}`)
    sector.group.push(loc.id);
    loc.sector.push(sector);
}

function inSector(sector){
    for(let a in global.current_location.sector) {
        if(global.current_location.sector[a].id===sector.id) {
            return true;
        }
    }
}

function define_sectors() {
    sector.home = new Sector({
        id: 1,
        inside: true,
        default_data: {},
        onEnter: function () {
            let fire = findbyid(furn, furniture.frplc.id);
            for (let f in furn) {
                activatef(furn[f])
            }
            if (this.data.smkp>0) {
                dom.location_text.innerHTML+='<span style="color:grey;font-size:1.2em">&nbsp煙<span>'
                let re = time.minute-this.data.smkt;
                this.data.smkp-=re;
            }
        },
        data: {
            scoutm: 100,
            scout:  0,
            scoutf: false,
            gets:   [false],
            gotmod: 0,
            smkp:   0,
            ctlt:   []
        },
        scout: [
            {
                c:  0.1,
                cond: () => {
                    if (sector.home.data.ctlt.length!=0) return true
                },
                f: ()=> {
                    let i = select(sector.home.data.ctlt);
                    msg(select([
                        'Your cat found something for you',
                        'Another one of your cat\'s gifts',
                        'Something was lying in the corner of the room. Probably cat\'s',
                        'Your cat dropped something before you']),
                    'lime');
                    let k = itemgroup[(i+1)/10000<<0];
                    for(let v in k) if(k[v].id===i) giveItem(k[v]);
                    sector.home.data.ctlt.splice(sector.home.data.ctlt.indexOf(i),1);
                },
                exp:2
            },
        ],
        onScout: function () {
            scoutGeneric(this);
        },
        onMove: function () {
            if(this.data.smkp>0){
                dom.location_text.innerHTML+='<span style="color:grey;font-size:1.2em">&nbsp煙<span>';
            }
        },
        onLeave: function () {
            global.stat.athmec=0;
          if (effect.fplc.active===true) removeEff(effect.fplc);
          this.data.smkt = time.minute;
          for(let f in furn) deactivatef(furn[f]);
        },
        onStay: function () {
            if (this.data.smkp>0) {
                if(effect.smoke.active) effect.smoke.duration=26;
                else giveEff(you,effect.smoke,26);
                if(--this.data.smkp<=0) move_to_area(global.current_location);
            }
            if(global.flags.catget) giveSkExp(skl.pet,you.mods.petxp);
            global.stat.athme  += global.timescale;
            global.stat.athmec += global.timescale; 
            for(let x in global.nethmchk) global.nethmchk[x]();
            
            /* @Todo fix fire
            let fire = findbyid(furn,furniture.frplc.id);

            if (effect.fplc.active === false && fire.data.fuel > 0) giveEff(you,effect.fplc,fire.data.fuel);
            if(fire.data.fuel>0) {
                if (effect.fplc.active === false) giveEff(you,effect.fplc,2);
                let afire = findbyid(furn,furniture.fwdpile.id);
                if (afire && fire.data.fuel <= 2 && afire.data.fuel > 0) {
                    fire.data.fuel += 30;
                    afire.data.fuel --;
                }
            }   
            */
        }
    });
    /*
    sector.home = new Sector({
        id: 1,
        inside: true,
        default_data: {},
        onEnter: function () {
            let fire = findbyid(furn, furniture.frplc.id);
            for (let f in furn) {
                activatef(furn[f])
            }
            if (this.data.smkp>0) {
                dom.location_text.innerHTML+='<span style="color:grey;font-size:1.2em">&nbsp煙<span>'
                let re = time.minute-this.data.smkt;
                this.data.smkp-=re;
            }
        },
        data: { scoutm: 100, scout: 0, scoutf: false, gets: [false], gotmod: 0, smkp: 0, ctlt: [] },
        scout: [
            {
                c:  0.1,
                cond: () => {
                    if (sector.home.data.ctlt.length!=0) return true
                },
                f: ()=> {
                    let i = select(sector.home.data.ctlt);
                    msg(select([
                        'Your cat found something for you',
                        'Another one of your cat\'s gifts',
                        'Something was lying in the corner of the room. Probably cat\'s',
                        'Your cat dropped something before you']),
                    'lime');
                    let k = itemgroup[(i+1)/10000<<0];
                    for(let v in k) if(k[v].id===i) giveItem(k[v]);
                    sector.home.data.ctlt.splice(sector.home.data.ctlt.indexOf(i),1);
                },
                exp:2
            },
        ],
        onScout: () => {
            scoutGeneric(this);
        },
        onMove: () => {
            if(this.data.smkp>0){
                dom.location_text.innerHTML+='<span style="color:grey;font-size:1.2em">&nbsp煙<span>';
            }
        },
        onLeave: function () {
            global.stat.athmec=0;
          if (effect.fplc.active===true) removeEff(effect.fplc);
          this.data.smkt = time.minute;
          for(let f in furn) deactivatef(furn[f]);
        },
        onStay: function () {
            if (this.data.smkp>0) {
                if(effect.smoke.active) effect.smoke.duration=26;
                else giveEff(you,effect.smoke,26);
                if(--this.data.smkp<=0) move_to_area(global.current_location);
            }
            if(global.flags.catget) giveSkExp(skl.pet,you.mods.petxp);
            global.stat.athme  += global.timescale;
            global.stat.athmec += global.timescale; 
            for(let x in global.nethmchk) global.nethmchk[x]();
            let fire = findbyid(furn,furniture.frplc.id);
            
            if (effect.fplc.active === false && fire.data.fuel > 0) giveEff(you,effect.fplc,fire.data.fuel);
            if(fire.data.fuel>0) {
                if (effect.fplc.active === false) giveEff(you,effect.fplc,2);
                let afire = findbyid(furn,furniture.fwdpile.id);
                if (afire && fire.data.fuel <= 2 && afire.data.fuel > 0) {
                    fire.data.fuel += 30;
                    afire.data.fuel --;
                }
            }   
        }

    });
    */


    sector.vcent = new Sector({
        id: 2,
        onStay: function () {
            if (random() < 0.03 && 
                !isWeather(weather.sstorm) && 
                !isWeather(weather.heavyrain) && 
                !isWeather(weather.thunder) && 
                (getHour() > 8 &&
                getHour() < 20)) {
                if (!global.text.vlg1) {
                    global.text.vlg1 = [
                        '\"♪La, laaaah, la, la-la. Lah, la-la,la la....♪\"',
                        '\"Eat flowers evil-doer!♪\"',
                        '\"Oh my! Such pretty flowers♪\"',
                        '\"Can I tag along? I won\'t be a bother♪\"'];
                }
                if (!global.text.vlg1s) {
                      global.text.vlg1s=[
                        '\"Let\'s build a snowman!♪\"',
                        '\"Yey, snow!♪\"',
                        '\"Everything is so white and beautiful♪\"',
                        'A snowball lands on you. Hey!'];
                }
                msg(getSeason()  === 4 ? select(global.text.vlg1s) : select(global.text.vlg1), 'yellow');
            }
        }
    });


    sector.forest1 = new Sector({
        id: 3,
        data: { scoutm: 7000, scout: 0, scoutf: false },
        onStay: function () {
            if (!this.data.scoutf) {
                if (this.data.scout <= this.data.scoutm) {
                    if (global.flags.btl || act.scout.active === true) {
                        this.data.scout += 0.1;
                        giveSkExp(skl.tpgrf, 0.001);
                    }
                } else {
                    msg('Zone Explored!','lime');
                    this.data.scoutf = true;
                    giveExp(7000, true, true, true); 
                }
            }    
        }
    });


    sector.cata1 = new Sector({
        id: 4,
        inside: true,
        effectors: [{ e: effector.dark }],
        data: { scoutm: 11000, scout: 0, scoutf: false }
    });


    sector.vmain1 = new Sector({
        id: 5,
        /*
        data: { scoutm: 400, scout: 0, scoutf: false, gets: [false], gotmod: 0 },
        scout: [
            {c: 0.11, f:()=>{
                msg(select([
                    'You notice a coin on the ground!',
                    'You pick a coin from under the counter',
                    'You snatch a coin while no one is looking']
                ),'lime');
                giveItem(select([item.cp,item.cn,item.cq,item.cd]));
                sector.vmain1.data.gets[0] = true},
                exp:5
            },
            {c: 0.05, f:()=>{
                msg(select([
                    'You notice a coin on the ground!',
                    'You pick a coin from under the counter',
                    'You snatch a coin while no one is looking']
                ),'lime');
                giveItem(select([item.cp,item.cn,item.cq,item.cd]));
                sector.vmain1.data.gets[1] = true},
                exp:5
            },
        ],
        onScout: () => {
            scoutGeneric(this);
        }
        */
    });
}


function Container(id){
    this.id = id || 0;
    this.c = [];
}

function giveCrExp(skl, amt, lvl){
    if(!lvl || skl.lvl < lvl) giveSkExp(skl, amt);
}

function Recipe(){
    this.name='';
    this.locked=true;
    this.allow=true;
    this.have=false;
    this.rec=[];
    this.res=[];
    this.srec=function(){};
    this.srece=false; this.srect=null;
    this.onmake=function(){};
    this.type=0; 
}

function define_recipes() {
    rcp.test = new Recipe(); rcp.test.id = 101;
    rcp.test.name='Test';
    rcp.test.rec=[{item:acc.dticket,amount:1},{item:acc.dticket,amount:1}];
    rcp.test.res =[{item:item.sbone,amount:991}];

    rcp.wp2 = new Recipe(); rcp.wp2.id = 102;
    rcp.wp2.name='Sharpened Stick';
    rcp.wp2.type = 3;
    rcp.wp2.rec =[{item:wpn.stk1,amount:1}];
    rcp.wp2.res =[{item:wpn.stk2,amount:1}];
    rcp.wp2.onmake=function(){giveCrExp(skl.crft,.5,1)}
    rcp.wp2.srect=['Any sharp tool'];
    rcp.wp2.srec=[function(){
      for(let hh in inv) if(inv[hh].ctype===0&&inv[hh].cls[0]>=2) return true;
    }];

    rcp.strawp = new Recipe(); rcp.strawp.id = 103;
    rcp.strawp.name='Straw Pendant';
    rcp.strawp.type = 4;
    rcp.strawp.rec=[{item:item.sstraw,amount:5}];
    rcp.strawp.res=[{item:acc.strawp,amount:1}];
    rcp.strawp.onmake=function(){giveCrExp(skl.crft,.1,1)}

    rcp.hlpd = new Recipe(); rcp.hlpd.id = 104;
    rcp.hlpd.name='Low-grade Healing Powder';
    rcp.hlpd.type = 2;
    rcp.hlpd.rec=[{item:item.hrb1,amount:3}];
    rcp.hlpd.res=[{item:item.hlpd,amount:1}];
    rcp.hlpd.onmake=function(){giveCrExp(skl.alch,.2,1)}

    rcp.borc = new Recipe(); rcp.borc.id = 105;
    rcp.borc.name='Boiled Rice';
    rcp.borc.type = 1;
    rcp.borc.rec=[{item:item.rice,amount:2},{item:item.watr,amount:2}];
    rcp.borc.res=[{item:item.borc,amount:1}];
    rcp.borc.onmake=function(){giveCrExp(skl.cook,.5,1)}
    rcp.borc.srect=['Nearby firesource'];
    rcp.borc.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.begg = new Recipe(); rcp.begg.id = 106;
    rcp.begg.name='Boiled Egg';
    rcp.begg.type = 1;
    rcp.begg.rec=[{item:item.eggn,amount:1},{item:item.watr,amount:2}];
    rcp.begg.res=[{item:item.begg,amount:1}];
    rcp.begg.onmake=function(){giveCrExp(skl.cook,.2,1)}
    rcp.begg.srect=['Nearby firesource'];
    rcp.begg.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.trr = new Recipe(); rcp.trr.id = 107;
    rcp.trr.name='Trinity'; 
    rcp.trr.type = 4;
    rcp.trr.rec=[{item:acc.mstn,amount:1},{item:acc.srng,amount:1},{item:acc.bstn,amount:1},{item:acc.mstn,amount:1}];
    rcp.trr.res=[{item:acc.trrng,amount:1}];

    rcp.rsmt = new Recipe(); rcp.rsmt.id = 108;
    rcp.rsmt.name='Roasted Meat'; 
    rcp.rsmt.type = 1;
    rcp.rsmt.rec=[{item:item.rwmt1,amount:1}];
    rcp.rsmt.res=[{item:item.rsmt,amount:1}];
    rcp.rsmt.cmake=function(){let rn = random()+skl.cook.lvl*.1; if(rn>=.30) giveItem(rcp.rsmt.res[0].item); else {giveItem(item.brmt);  msg('It didn\'t turn out very well...','black',null,null,'lightgrey');}giveCrExp(skl.cook,.2,1);}
    rcp.rsmt.srect=['Nearby firesource'];
    rcp.rsmt.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.segg = new Recipe(); rcp.segg.id = 109;
    rcp.segg.name='Scrambled Eggs'; 
    rcp.segg.type = 1;
    rcp.segg.rec=[{item:item.eggn,amount:2}];
    rcp.segg.res=[{item:item.segg,amount:1}];
    rcp.segg.onmake=function(){giveCrExp(skl.cook,1,2)}
    rcp.segg.srect=['Nearby firesource'];
    rcp.segg.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.lnch1 = new Recipe(); rcp.lnch1.id = 110;
    rcp.lnch1.name='Bacon and Eggs'; 
    rcp.lnch1.type = 1;
    rcp.lnch1.rec=[{item:item.eggn,amount:2},{item:item.bac,amount:1}];
    rcp.lnch1.res=[{item:item.lnch1,amount:1}];
    rcp.lnch1.onmake=function(){giveCrExp(skl.cook,5,3)}
    rcp.lnch1.srect=['Nearby firesource'];
    rcp.lnch1.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.lnch2 = new Recipe(); rcp.lnch2.id = 111;
    rcp.lnch2.name='Morning Set'; 
    rcp.lnch2.type = 1;
    rcp.lnch2.rec=[{item:item.eggn,amount:2},{item:item.brd,amount:1}];
    rcp.lnch2.res=[{item:item.lnch2,amount:1}];
    rcp.lnch2.onmake=function(){giveCrExp(skl.cook,8,3)}
    rcp.lnch2.srect=['Nearby firesource'];
    rcp.lnch2.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.lnch3 = new Recipe(); rcp.lnch3.id = 112;
    rcp.lnch3.name='Lunch Set'; 
    rcp.lnch3.type = 1;
    rcp.lnch3.rec=[{item:item.eggn,amount:2},{item:item.brd,amount:1},{item:item.rwmt1,amount:1}];
    rcp.lnch3.res=[{item:item.lnch3,amount:1}];
    rcp.lnch3.onmake=function(){giveCrExp(skl.cook,10,4)}
    rcp.lnch3.srect=['Nearby firesource'];
    rcp.lnch3.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.orgs = new Recipe(); rcp.orgs.id = 113;
    rcp.orgs.name='Onion Rings'; 
    rcp.orgs.type = 1;
    rcp.orgs.rec=[{item:item.flr,amount:2},{item:item.onn,amount:1}];
    rcp.orgs.res=[{item:item.orgs,amount:1}];
    rcp.orgs.onmake=function(){giveCrExp(skl.cook,8,4)}
    rcp.orgs.srect=['Nearby firesource'];
    rcp.orgs.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.ffsh1 = new Recipe(); rcp.ffsh1.id = 114;
    rcp.ffsh1.name='Cooked Fish'; 
    rcp.ffsh1.type = 1;
    rcp.ffsh1.rec=[{item:item.fsh1,amount:1}];
    rcp.ffsh1.res=[{item:item.ffsh1,amount:1}];
    rcp.ffsh1.onmake=function(){giveCrExp(skl.cook,2,2)}
    rcp.ffsh1.srect=['Nearby firesource'];
    rcp.ffsh1.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.ffsh2 = new Recipe(); rcp.ffsh2.id = 115;
    rcp.ffsh2.name='Batter Fried Fish'; 
    rcp.ffsh2.type = 1;
    rcp.ffsh2.rec=[{item:item.fsh2,amount:1},{item:item.flr,amount:1},{item:item.eggn,amount:1},{item:item.salt,amount:1}];
    rcp.ffsh2.res=[{item:item.ffsh2,amount:1}];
    rcp.ffsh2.onmake=function(){giveCrExp(skl.cook,12,5)}
    rcp.ffsh2.srect=['Nearby firesource'];
    rcp.ffsh2.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.fnori = new Recipe(); rcp.fnori.id = 116;
    rcp.fnori.name='Fried Nori'; 
    rcp.fnori.type = 1;
    rcp.fnori.rec=[{item:item.nori,amount:1},{item:item.salt,amount:1}];
    rcp.fnori.res=[{item:item.fnori,amount:1}];
    rcp.fnori.onmake=function(){giveCrExp(skl.cook,4,4)}
    rcp.fnori.srect=['Nearby firesource'];
    rcp.fnori.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.cbun1 = new Recipe(); rcp.cbun1.id = 117;
    rcp.cbun1.name='Steamed Bun'; 
    rcp.cbun1.type = 1;
    rcp.cbun1.rec=[{item:item.watr,amount:1},{item:item.salt,amount:1},{item:item.dgh,amount:1}];
    rcp.cbun1.res=[{item:item.cbun1,amount:1}];
    rcp.cbun1.onmake=function(){giveCrExp(skl.cook,5,3)}
    rcp.cbun1.srect=['Nearby firesource'];
    rcp.cbun1.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.dgh = new Recipe(); rcp.dgh.id = 118;
    rcp.dgh.name='Dough'; 
    rcp.dgh.type = 1;
    rcp.dgh.rec=[{item:item.watr,amount:1},{item:item.flr,amount:3}];
    rcp.dgh.res=[{item:item.dgh,amount:1}];
    rcp.dgh.onmake=function(){giveCrExp(skl.cook,.5,2)}

    rcp.flr = new Recipe(); rcp.flr.id = 119;
    rcp.flr.name='Flour'; 
    rcp.flr.type = 1;
    rcp.flr.rec=[{item:item.wht,amount:1}];
    rcp.flr.res=[{item:item.flr,amount:2}];
    rcp.flr.onmake=function(){giveCrExp(skl.cook,.2,2)}

    rcp.wbdl = new Recipe(); rcp.wbdl.id = 120;
    rcp.wbdl.name='Small Wood Bundle'; 
    rcp.wbdl.type = 5;
    rcp.wbdl.rec=[{item:item.wdc,amount:25}];
    rcp.wbdl.res=[{item:item.fwd1,amount:1}];
    rcp.wbdl.onmake=function(){giveCrExp(skl.crft,.5,1)}

    rcp.sshl = new Recipe(); rcp.sshl.id = 121;
    rcp.sshl.name='Star Shell'; 
    rcp.sshl.type = 4;
    rcp.sshl.rec=[{item:acc.sun_charm,amount:1},{item:acc.moon_charm,amount:1}];
    rcp.sshl.res=[{item:acc.sshl,amount:1}];
    rcp.sshl.onmake=function(){giveCrExp(skl.crft,10)}

    rcp.hptn1 = new Recipe(); rcp.hptn1.id = 122;
    rcp.hptn1.name='Lesser Healing Potion'; 
    rcp.hptn1.type = 2;
    rcp.hptn1.rec=[{item:item.slm,amount:1},{item:item.hlpd,amount:2}];
    rcp.hptn1.res=[{item:item.hptn1,amount:1}];
    rcp.hptn1.onmake=function(){giveCrExp(skl.alch,1,2)}

    rcp.hpck = new Recipe(); rcp.hpck.id = 123;
    rcp.hpck.name='Hippo Cookie'; 
    rcp.hpck.type = 1;
    rcp.hpck.rec=[{item:item.flr,amount:1},{item:item.hzlnt,amount:1},{item:item.sgr,amount:1},{item:item.mlkn,amount:1}];
    rcp.hpck.res=[{item:item.hpck,amount:1}];
    rcp.hpck.onmake=function(){giveCrExp(skl.cook,7,4)}
    rcp.hpck.srect=['Nearby firesource'];
    rcp.hpck.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.sdl1 = new Recipe(); rcp.sdl1.id = 124;
    rcp.sdl1.name='Straw Effigy'; 
    rcp.sdl1.type = 4;
    rcp.sdl1.rec=[{item:item.sstraw,amount:50}];
    rcp.sdl1.res=[{item:acc.sdl1,amount:1}];
    rcp.sdl1.onmake=function(){giveCrExp(skl.crft,3,2)}

    rcp.mnknk = new Recipe(); rcp.mnknk.id = 125;
    rcp.mnknk.name='Maneki-Neko'; 
    rcp.mnknk.type = 4;
    rcp.mnknk.rec=[{item:acc.cfgn,amount:1},{item:acc.lckcn,amount:1},];
    rcp.mnknk.res=[{item:acc.mnknk,amount:1}];
    rcp.mnknk.onmake=function(){giveCrExp(skl.crft,25)}

    rcp.wdl1 = new Recipe(); rcp.wdl1.id = 126;
    rcp.wdl1.name='Wood Effigy'; 
    rcp.wdl1.type = 4;
    rcp.wdl1.rec=[{item:item.wdc,amount:40}];
    rcp.wdl1.res=[{item:acc.wdl1,amount:1}];
    rcp.wdl1.onmake=function(){giveCrExp(skl.crft,3,2)}
    rcp.wdl1.srect=['Any sharp tool'];
    rcp.wdl1.srec=[function(){
      for(let hh in inv) if(inv[hh].ctype===0&&inv[hh].cls[0]>=2) return true;
    }];

    rcp.gdl1 = new Recipe(); rcp.gdl1.id = 127;
    rcp.gdl1.name='Soul Puppet'; 
    rcp.gdl1.type = 4;
    rcp.gdl1.rec=[{item:acc.wdl1,amount:1},{item:acc.sdl1,amount:1},{item:acc.bdl1,amount:1},{item:item.lsrd,amount:5}];
    rcp.gdl1.res=[{item:acc.gdl1,amount:1}];
    rcp.gdl1.onmake=function(){giveCrExp(skl.crft,5,2)}

    rcp.tbrwd = new Recipe(); rcp.tbrwd.id = 128;
    rcp.tbrwd.name='Tea'; 
    rcp.tbrwd.type = 1;
    rcp.tbrwd.rec=[{item:item.tlvs,amount:1},{item:item.watr,amount:1},];
    rcp.tbrwd.res=[{item:item.tbrwd,amount:1}];
    rcp.tbrwd.onmake=function(){giveCrExp(skl.cook,1)}

    rcp.brd = new Recipe(); rcp.brd.id = 129;
    rcp.brd.name='Bread'; 
    rcp.brd.type = 1;
    rcp.brd.rec=[{item:item.dgh,amount:1}];
    rcp.brd.res=[{item:item.brd,amount:1}];
    rcp.brd.cmake=function(){let rn = random()+skl.cook.lvl*.05; if(rn>=.25) giveItem(rcp.brd.res[0].item); else {giveItem(item.brdb);  msg('It didn\'t turn out very well...','black',null,null,'lightgrey');}giveCrExp(skl.cook,2,3)}
    rcp.brd.srect=['Nearby firesource'];
    rcp.brd.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.steak = new Recipe(); rcp.steak.id = 130;
    rcp.steak.name='Steak'; 
    rcp.steak.type = 1;
    rcp.steak.rec=[{item:item.salt,amount:1},{item:item.rwmt1,amount:1},{item:item.spc1,amount:1}];
    rcp.steak.res=[{item:item.steak,amount:1}];
    rcp.steak.onmake=function(){giveCrExp(skl.cook,7)}
    rcp.steak.srect=['Nearby firesource','Cooking lvl: 3'];
    rcp.steak.srec=[function(){if(you.mods.ckfre>0) return true},function(){if(skl.cook.lvl===3) return true}];

    rcp.cnmnb = new Recipe(); rcp.cnmnb.id = 131;
    rcp.cnmnb.name='Cinnamon Bun'; 
    rcp.cnmnb.type = 1;
    rcp.cnmnb.rec=[{item:item.sgr,amount:1},{item:item.bttr,amount:1},{item:item.cnmn,amount:1},{item:item.wht,amount:1}];
    rcp.cnmnb.res=[{item:item.cnmnb,amount:1}];
    rcp.cnmnb.onmake=function(){giveCrExp(skl.cook,6,5)}
    rcp.cnmnb.srect=['Nearby firesource'];
    rcp.cnmnb.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.brth = new Recipe(); rcp.brth.id = 132;
    rcp.brth.name='Broth'; 
    rcp.brth.type = 1;
    rcp.brth.rec=[{item:item.watr,amount:2},{item:item.rwmt1,amount:1}];
    rcp.brth.res=[{item:item.brth,amount:1}];
    rcp.brth.onmake=function(){giveCrExp(skl.cook,.5,2)}
    rcp.brth.srect=['Nearby firesource'];
    rcp.brth.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.eggsp = new Recipe(); rcp.eggsp.id = 133;
    rcp.eggsp.name='Egg Soup'; 
    rcp.eggsp.type = 1;
    rcp.eggsp.rec=[{item:item.brth,amount:1},{item:item.eggn,amount:2},{item:item.salt,amount:1},{item:item.scln,amount:1}];
    rcp.eggsp.res=[{item:item.eggsp,amount:1}];
    rcp.eggsp.onmake=function(){giveCrExp(skl.cook,5,4)}
    rcp.eggsp.srect=['Nearby firesource'];
    rcp.eggsp.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.crmchd = new Recipe(); rcp.crmchd.id = 134;
    rcp.crmchd.name='Creamy Chowder'; 
    rcp.crmchd.type = 1;
    rcp.crmchd.rec=[{item:item.mlkn,amount:1},{item:item.ches,amount:1},{item:item.rwmt1,amount:1},{item:item.potat,amount:1}];
    rcp.crmchd.res=[{item:item.crmchd,amount:1}];
    rcp.crmchd.onmake=function(){giveCrExp(skl.cook,15)}
    rcp.crmchd.srect=['Nearby firesource'];
    rcp.crmchd.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.mink = new Recipe(); rcp.mink.id = 135;
    rcp.mink.name='Magic Ink'; 
    rcp.mink.type = 4;
    rcp.mink.rec=[{item:acc.qill,amount:1},{item:acc.bink,amount:1}];
    rcp.mink.res=[{item:acc.mink,amount:1}];
    rcp.mink.onmake=function(){giveCrExp(skl.crft,2.5,4)}

    rcp.msoop = new Recipe(); rcp.msoop.id = 136;
    rcp.msoop.name='Mushroom Soup'; 
    rcp.msoop.type = 1;
    rcp.msoop.rec=[{item:item.watr,amount:2},{item:item.mshr,amount:2},{item:item.potat,amount:1},{item:item.onn,amount:1}];
    rcp.msoop.res=[{item:item.msoop,amount:1}];
    rcp.msoop.onmake=function(){giveCrExp(skl.cook,4,3)}
    rcp.msoop.srect=['Nearby firesource'];
    rcp.msoop.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.jln4 = new Recipe(); rcp.jln4.id = 137;
    rcp.jln4.name='Grand Gelatin'; 
    rcp.jln4.type = 4;
    rcp.jln4.rec=[{item:acc.jln1,amount:1},{item:acc.jln2,amount:1},{item:acc.jln3,amount:1},];
    rcp.jln4.res=[{item:acc.jln4,amount:1}];
    rcp.jln4.onmake=function(){giveCrExp(skl.crft,15)}

    rcp.strwks = new Recipe(); rcp.strwks.id = 138;
    rcp.strwks.name='Straw Kasa'; 
    rcp.strwks.type = 4;
    rcp.strwks.rec=[{item:item.sstraw,amount:30}];
    rcp.strwks.res=[{item:eqp.strwks,amount:1}];
    rcp.strwks.onmake=function(){giveCrExp(skl.crft,3,2)}

    rcp.bdl1 = new Recipe(); rcp.bdl1.id = 139;
    rcp.bdl1.name='Bone Doll'; 
    rcp.bdl1.type = 4;
    rcp.bdl1.rec=[{item:item.sbone,amount:30}];
    rcp.bdl1.res=[{item:acc.bdl1,amount:1}];
    rcp.bdl1.onmake=function(){giveCrExp(skl.crft,3,2)}
    rcp.bdl1.srect=['Any sharp tool'];
    rcp.bdl1.srec=[function(){
      for(let hh in inv) if(inv[hh].ctype===0&&inv[hh].cls[0]>=2) return true;
    }];

    rcp.wvbkt = new Recipe(); rcp.wvbkt.id = 140;
    rcp.wvbkt.name='Straw Basket'; 
    rcp.wvbkt.type = 5;
    rcp.wvbkt.rec=[{item:item.sstraw,amount:40}];
    rcp.wvbkt.res=[{item:item.wvbkt,amount:1}];
    rcp.wvbkt.onmake=function(){giveCrExp(skl.crft,3,2)}

    rcp.hlstw = new Recipe(); rcp.hlstw.id = 141;
    rcp.hlstw.name='Healing Stew'; 
    rcp.hlstw.type = 1;
    rcp.hlstw.rec=[{item:item.watr,amount:2},{item:item.hrb1,amount:28}];
    rcp.hlstw.res=[{item:item.hlstw,amount:1}];
    rcp.hlstw.onmake=function(){giveCrExp(skl.cook,1,2)}
    rcp.hlstw.srect=['Nearby firesource'];
    rcp.hlstw.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.bcrc = new Recipe(); rcp.bcrc.id = 142;
    rcp.bcrc.name='Bone Cracker'; 
    rcp.bcrc.type = 1;
    rcp.bcrc.rec=[{item:item.sbone,amount:25}];
    rcp.bcrc.res=[{item:item.bcrc,amount:1}];
    rcp.bcrc.onmake=function(){giveCrExp(skl.cook,1.7,3)}
    rcp.bcrc.srect=['Nearby firesource'];
    rcp.bcrc.srec=[function(){if(you.mods.ckfre>0) return true}];
    
    rcp.bcrrt = new Recipe(); rcp.bcrrt.id = 143
    rcp.bcrrt.name='Boiled Carrot';
    rcp.bcrrt.type = 1;
    rcp.bcrrt.rec=[{item:item.crrt,amount:1},{item:item.watr,amount:1}];
    rcp.bcrrt.res=[{item:item.bcrrt,amount:1}];
    rcp.bcrrt.onmake=function(){giveCrExp(skl.cook,.3,2)}
    rcp.bcrrt.srect=['Nearby firesource'];
    rcp.bcrrt.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.jsdch = new Recipe(); rcp.jsdch.id = 144;
    rcp.jsdch.name='Jelly Sandwich'; 
    rcp.jsdch.type = 1;
    rcp.jsdch.rec=[{item:item.jll,amount:1},{item:item.brd,amount:1},{item:item.ltcc,amount:1}];
    rcp.jsdch.res=[{item:item.jsdch,amount:1}];
    rcp.jsdch.onmake=function(){giveCrExp(skl.cook,.8,2)}

    rcp.dcard1 = new Recipe(); rcp.dcard1.id = 145;
    rcp.dcard1.name='Discount Card'; 
    rcp.dcard1.type = 4;
    rcp.dcard1.rec=[{item:acc.dticket,amount:5}];
    rcp.dcard1.res=[{item:acc.dcard1,amount:1}];
    rcp.dcard1.onmake=function(){giveCrExp(skl.crft,16)}

    rcp.wsb = new Recipe(); rcp.wsb.id = 146;
    rcp.wsb.name='Wastebread'; 
    rcp.wsb.type = 1;
    rcp.wsb.rec=[{item:item.agrns,amount:3}];
    rcp.wsb.res=[{item:item.wsb,amount:1}];
    rcp.wsb.onmake=function(){giveCrExp(skl.cook,.5,3)}

    rcp.stksld = new Recipe(); rcp.stksld.id = 147;
    rcp.stksld.name='Stake Shield'; 
    rcp.stksld.type = 4;
    rcp.stksld.rec=[{item:wpn.stk2,amount:4}];
    rcp.stksld.res=[{item:sld.stksld,amount:1}];
    rcp.stksld.onmake=function(){giveCrExp(skl.crft,2.5,2)}

    rcp.clrpin = new Recipe(); rcp.clrpin.id = 148;
    rcp.clrpin.name='Clover Pin'; 
    rcp.clrpin.type = 4;
    rcp.clrpin.rec=[{item:item.lckl,amount:7}];
    rcp.clrpin.res=[{item:acc.clrpin,amount:1}];
    rcp.clrpin.onmake=function(){giveCrExp(skl.crft,77)}

    rcp.ptchct = new Recipe(); rcp.ptchct.id = 149;
    rcp.ptchct.name='Patchwork Coat'; 
    rcp.ptchct.type = 4;
    rcp.ptchct.rec=[{item:item.cclth,amount:11},{item:item.thrdnl,amount:4}];
    rcp.ptchct.res=[{item:eqp.ptchct,amount:1}];
    rcp.ptchct.onmake=function(){giveCrExp(skl.crft,3,2);giveCrExp(skl.tlrng,2,1)}
    rcp.ptchct.srect=['Tailoring tool lvl: 1'];
    rcp.ptchct.srec=[function(){
      for(let hh in inv) if(inv[hh].tlrq>=1) return true;
    }];

    rcp.ptchpts = new Recipe(); rcp.ptchpts.id = 150;
    rcp.ptchpts.name='Patchwork Pants'; 
    rcp.ptchpts.type = 4;
    rcp.ptchpts.rec=[{item:item.cclth,amount:9},{item:item.thrdnl,amount:3}];
    rcp.ptchpts.res=[{item:eqp.ptchpts,amount:1}];
    rcp.ptchpts.onmake=function(){giveCrExp(skl.crft,2,2);giveCrExp(skl.tlrng,3,1)}
    rcp.ptchpts.srect=['Tailoring tool lvl: 1'];
    rcp.ptchpts.srec=[function(){
      for(let hh in inv) if(inv[hh].tlrq>=1) return true;
    }];

    rcp.bblkt = new Recipe(); rcp.bblkt.id = 151;
    rcp.bblkt.name='Ragwork Blanket'; 
    rcp.bblkt.type = 5;
    rcp.bblkt.rec=[{item:item.cclth,amount:40},{item:item.thrdnl,amount:18}];
    rcp.bblkt.res=[{item:item.bblkt,amount:1}];
    rcp.bblkt.onmake=function(){giveCrExp(skl.crft,4,2);giveCrExp(skl.tlrng,7,1)}
    rcp.bblkt.srect=['Tailoring tool lvl: 1'];
    rcp.bblkt.srec=[function(){
      for(let hh in inv) if(inv[hh].tlrq>=1) return true;
    }];

    rcp.spillw = new Recipe(); rcp.spillw.id = 152;
    rcp.spillw.name='Straw Pillow'; 
    rcp.spillw.type = 5;
    rcp.spillw.rec=[{item:item.cclth,amount:15},{item:item.thrdnl,amount:8},{item:item.sstraw,amount:80}];
    rcp.spillw.res=[{item:item.spillw,amount:1}];
    rcp.spillw.onmake=function(){giveCrExp(skl.crft,3,2);giveCrExp(skl.tlrng,4,1)}

    rcp.alseto = new Recipe(); rcp.alseto.id = 153
    rcp.alseto.name='Basic Alchemy Set'; 
    rcp.alseto.type = 4;
    rcp.alseto.rec=[{item:acc.mpst,amount:1},{item:acc.mshst,amount:1},{item:acc.mhhst,amount:1}];
    rcp.alseto.res=[{item:acc.alseto,amount:1}];
    rcp.alseto.onmake=function(){giveCrExp(skl.crft,15,2);}

    rcp.mdcag = new Recipe(); rcp.mdcag.id = 154
    rcp.mdcag.name='Adhesive Bandage'; 
    rcp.mdcag.type = 4;
    rcp.mdcag.rec=[{item:item.bdgh,amount:1},{item:item.watr,amount:5},{item:item.hrb1,amount:50},{item:item.slm,amount:10}];
    rcp.mdcag.res=[{item:acc.mdcag,amount:1}];
    rcp.mdcag.onmake=function(){giveCrExp(skl.alch,2,2)}

    rcp.mdcbg = new Recipe(); rcp.mdcbg.id = 155
    rcp.mdcbg.name='Medicated Bandage'; 
    rcp.mdcbg.type = 4;
    rcp.mdcbg.rec=[{item:acc.mdcag,amount:1},{item:acc.vtmns,amount:1},{item:item.hptn1,amount:8}];
    rcp.mdcbg.res=[{item:acc.mdcbg,amount:1}];
    rcp.mdcbg.onmake=function(){giveCrExp(skl.alch,3,2)}

    rcp.cyrn = new Recipe(); rcp.cyrn.id = 156
    rcp.cyrn.name='Yarn Ball'; 
    rcp.cyrn.type = 5;
    rcp.cyrn.rec=[{item:item.thrdnl,amount:200}];
    rcp.cyrn.res=[{item:item.cyrn,amount:1}];
    rcp.cyrn.onmake=function(){giveCrExp(skl.crft,4,2)}

    rcp.fwdpile = new Recipe(); rcp.fwdpile.id = 157
    rcp.fwdpile.name='Firewood Pile'; 
    rcp.fwdpile.type = 5;
    rcp.fwdpile.rec=[{item:item.fwd1,amount:60}];
    rcp.fwdpile.res=[{item:item.fwdpile,amount:1}];
    rcp.fwdpile.onmake=function(){giveCrExp(skl.crft,5,2)}

    rcp.fmlim2 = new Recipe(); rcp.fmlim2.id = 158
    rcp.fmlim2.name='Family Heirloom+'; 
    rcp.fmlim2.type = 4;
    rcp.fmlim2.rec=[{item:acc.strawp,amount:1},{item:acc.fmlim,amount:1}];
    rcp.fmlim2.res=[{item:acc.fmlim2,amount:1}];
    rcp.fmlim2.onmake=function(){giveCrExp(skl.crft,5,2)}

    rcp.appljc = new Recipe(); rcp.appljc.id = 159;
    rcp.appljc.name='Apple Juice'; 
    rcp.appljc.type = 1;
    rcp.appljc.rec=[{item:item.appl,amount:3}];
    rcp.appljc.res=[{item:item.appljc,amount:1},{item:item.frtplp,amount:1}];
    rcp.appljc.onmake=function(){giveCrExp(skl.cook,.5,2)}

    rcp.bdgh = new Recipe(); rcp.bdgh.id = 160;
    rcp.bdgh.name='Bandage'; 
    rcp.bdgh.type = 2;
    rcp.bdgh.rec=[{item:item.cclth,amount:1},{item:item.watr,amount:3}];
    rcp.bdgh.res=[{item:item.bdgh,amount:1}];
    rcp.bdgh.onmake=function(){giveCrExp(skl.crft,.5,2)}
    rcp.bdgh.srect=['Nearby firesource'];
    rcp.bdgh.srec=[function(){if(you.mods.ckfre>0) return true}];

    rcp.wfng = new Recipe(); rcp.wfng.id = 161;
    rcp.wfng.name='Wolf Fang Necklace'; 
    rcp.wfng.type = 4;
    rcp.wfng.rec=[{item:item.wfng,amount:5},{item:item.thrdnl,amount:1}];
    rcp.wfng.res=[{item:acc.wfng,amount:1}];
    rcp.wfng.onmake=function(){giveCrExp(skl.crft,5,3)}

    rcp.wfar = new Recipe(); rcp.wfar.id = 162;
    rcp.wfar.name='Wolf Array'; 
    rcp.wfar.type = 4;
    rcp.wfar.rec=[{item:acc.wfng,amount:3}];
    rcp.wfar.res=[{item:acc.wfar,amount:1}];
    rcp.wfar.onmake=function(){giveCrExp(skl.crft,10,3)}
}


function evaluateSpecialRequirementsForRecipe(recipe) {
    if(recipe.srect==null) {
      return [0];
    }
    
    let results = [];
    for(let i in recipe.srec){
      results[i] = (recipe.srec[i]()===true) ? 1 : 2;
    }
    return results;
}


function findItemQuantity(arr, val, amt){
    for (let o = 0; o < arr.length; o++) {
        if(arr[o].id === val.id && arr[o].amount >= amt) {
            return { a: true, b: arr[o] };
        }
    }
    return { a: false, b: undefined };
}

function canMake(rc, times) {
    let missing=[];
    let has=[];
    let z=[];
    let b=[];
    let r=[];
    let o = evaluateSpecialRequirementsForRecipe(rc);
    
    for(let i=0;i<rc.rec.length;i++){
      let sc = new Object();
      if (!rc.rec[i] || !rc.rec[i].item) { console.warn('Recipe "' + rc.name + '" has undefined item at rec[' + i + ']'); continue; }
      if (!rc.rec[i].item.slot){
        sc = findItemQuantity(inv,rc.rec[i].item,rc.rec[i].amount*times);
        z.push(rc.rec[i].item.amount*times);
      } else {
        let ar = findworst(inv, rc.rec[i].item); 
        if(ar.length>=rc.rec[i].amount*times) sc.a = true; 
        z.push(ar.length); r=ar;
      }  
      if (!sc.a) {
        missing.push(rc.rec[i].item); b.push(false)
      } else {
        has.push(rc.rec[i].item); b.push(true)
      }
    }  for(let a in global.tstcr)global.tstcr[a].testc=false;
    return {x: missing, y: has, z, o, success: missing.length === 0 && !o.includes(2),b,r};
}

function make(rc,rp,times){ times=times||1
  let check = canMake(rc,times); 
  if(rp || !check.success){
    return check;
  }  for(let k=0;k<times;k++){
  for(let j=0;j<rc.rec.length;j++) {
    if (rc.rec[j].return) continue;
    if(!rc.rec[j].item.slot){
      let itemToAlter = findItemQuantity(inv, rc.rec[j].item, rc.rec[j].amount).b;
      itemToAlter.amount-=rc.rec[j].amount;
      if(itemToAlter.amount===0) removeItem(itemToAlter); 
    } else {
      let ar = findworst(inv,rc.rec[j].item); let finar = [];
      for(let m=0;m<rc.rec[j].amount;m++) finar.push(ar[m]);
      for(let m in finar) removeItem(finar[m]);
    }
  }
  if(!!rc.cmake) { rc.cmake(); }
  else {
    for(let itm in rc.res) {
      if(!rc.res[itm].amount_max) giveItem(rc.res[itm].item,rc.res[itm].amount); 
      else {giveItem(rc.res[itm].item,rand(rc.res[itm].amount,rc.res[itm].amount_max));}
    }
    rc.onmake();
  }}
  isort(global.sm);
}


function Vendor(){
    this.name = '';
    this.items = [];
    this.stock = [];
    this.data = { time : 1, rep : 0};
    this.timeorig = 1;
    this.restocked = false;
    this.extra = function(){}
    this.onRestock = function() { this.restocked = true; }
    this.onDayPass = function() {
        if (--this.data.time === 0) {
            restock(this);
            this.data.time = this.timeorig;
            this.onRestock();
            this.extra();
        }
    }
}

function define_vendors() {
    vendor.stvr1 = new Vendor();
    vendor.stvr1.name = 'Street Vendor'; vendor.stvr1.infl = 2; vendor.stvr1.dfl = .3; 
    vendor.stvr1.items=[
        {item:item.cbun1,p:6,c:.8,min:1,max:4},
        {item:item.strwb,p:8,c:.01,min:1,max:8},
        {item:item.cbun2,p:7,c:.5,min:1,max:4},
        {item:item.brd,p:5,c:1,min:4,max:8}
    ];

    vendor.kid1 = new Vendor();
    vendor.kid1.name = 'Child Trader'; 
    vendor.kid1.items=[
        {item:item.pbl,p:1,c:1,min:10,max:50},
        {item:item.mcps,p:2,c:.3,min:6,max:16},
        {item:item.spb,p:3,c:.8,min:2,max:8},
        {item:item.bonig,p:11,c:.2,min:2,max:5}
    ];

    vendor.grc1 = new Vendor();
    vendor.grc1.name = 'Grocery Shop';
    vendor.grc1.data.time=vendor.grc1.timeorig=3; vendor.grc1.infl = 1.15; vendor.grc1.dfl = .3;
    vendor.grc1.data.rep=10; vendor.grc1.repsc=8
    vendor.grc1.items=[
        {item:item.rice,p:4,c:1,min:40,max:50},
        {item:item.eggn,p:7,c:1,min:8,max:32},
        {item:item.onn,p:8,c:1,min:5,max:12},
        {item:item.salt,p:25,c:.3,min:2,max:7},
        {item:item.grlc,p:14,c:.15,min:1,max:8},
        {item:item.wht,p:5,c:1,min:13,max:29},
        {item:item.ltcc,p:8,c:.6,min:3,max:6},
        {item:item.mlkn,p:10,c:.4,min:2,max:4},
        {item:item.appl,p:5,c:.8,min:5,max:20},
        {item:item.brd,p:12,c:.85,min:3,max:10},
        {item:item.bgt,p:17,c:.35,min:1,max:6},
        {item:item.rwmt1,p:31,c:.25,min:4,max:8},
        {item:item.agrns,p:8,c:.2,min:10,max:30},
        {item:item.watr,p:2,c:.85,min:20,max:70}
    ];
    vendor.grc1.extra = function(){
      if(random()<.2)chss.grc1.data.gets[0]=false;
    }

    vendor.gens1 = new Vendor();
    vendor.gens1.name = 'General Store';
    vendor.gens1.time=vendor.gens1.timeorig=3;
    vendor.gens1.infl = 1.2;
    vendor.gens1.dfl = .2;
    vendor.gens1.data.rep=5;
    vendor.gens1.repsc=4
    vendor.gens1.items=[
        {item:item.fwd1,p:25,c:1,min:8,max:20},
        {item:item.coal2,p:80,c:.5,min:2,max:5},
        {item:item.amrthsck,p:360,c:.2,min:1,max:1},
        {item:item.dmkbk,p:390,c:.15,min:1,max:1},
        {item:item.wsb,p:16,c:.7,min:5,max:11},
        {item:wpn.wsrd1,p:35,c:.6,min:1,max:3},
        {item:eqp.rncp,p:60,c:.3,min:1,max:3},
        {item:eqp.rnss,p:70,c:.3,min:1,max:3},
        {item:eqp.tnc,p:56,c:.3,min:1,max:3},
        {item:eqp.sndl,p:32,c:.3,min:1,max:6},
        {item:wpn.bsrd,p:100,c:.3,min:1,max:2},
        {item:wpn.sprw,p:130,c:.3,min:1,max:3},
        {item:item.wine1,p:116,c:.2,min:1,max:7},
        {item:item.rope,p:100,c:.65,min:1,max:6},
        {item:item.msc1,p:110,c:.25,min:1,max:4},
        {item:item.tbwr1,p:130,c:.65,min:1,max:4},
        {item:item.bed2,p:500,c:.45,min:1,max:1},
        {item:item.cndl,p:200,c:.55,min:1,max:2},
        {item:item.cclth,p:7,c:.85,min:15,max:50},
        {item:item.thrdnl,p:2,c:.85,min:3,max:70},
        {item:acc.ndlb,p:50,c:.73,min:1,max:15}];
    vendor.gens1.extra = function(){
      if(random()<.2)chss.gens1.data.gets[0]=false;
    }

    vendor.pha1 = new Vendor(); 
    vendor.pha1.name = 'Herbalist';
    vendor.pha1.time=vendor.pha1.timeorig=2; vendor.pha1.infl = 1.25; vendor.pha1.dfl = .2;
    vendor.pha1.data.rep=5; vendor.pha1.repsc=6
    vendor.pha1.items=[{item:item.sp1,p:20,c:1,min:3,max:15},{item:item.sp2,p:230,c:.8,min:2,max:10},{item:item.sp3,p:690,c:.7,min:1,max:5},{item:item.bdgh,p:6,c:.9,min:5,max:15},{item:acc.vtmns,p:150,c:.5,min:1,max:3},{item:acc.mpst,p:100,c:.8,min:1,max:6},{item:acc.mshst,p:480,c:.6,min:1,max:1},{item:acc.mhhst,p:600,c:.4,min:1,max:1},{item:item.hptn1,p:20,c:1,min:8,max:35},{item:item.atd1,p:40,c:.7,min:4,max:13},{item:item.psnwrd,p:400,c:.25,min:2,max:5},{item:item.smm,p:70,c:.75,min:2,max:8},{item:item.mdc1,p:150,c:.75,min:1,max:1}];
    vendor.pha1.extra = function(){
      if(random()<.2)chss.pha1.data.gets[0]=false;
    }
}
   
function restock(vnd){
    vnd.stock=[];
    shuffle(vnd.items); 
    for(let ims=0;ims<vnd.items.length;ims++){ 
        if ((!vnd.items[ims].cond||vnd.items[ims].cond()===true)&&random()<=vnd.items[ims].c) {
            vnd.stock.push([vnd.items[ims].item,rand(vnd.items[ims].min,vnd.items[ims].max),vnd.items[ims].p]);
        }
        vnd.stock.sort(function(a,b) {
            if(a[0].id<b[0].id) return-1;
            if(a[0].id>b[0].id) return 1;
            return 0
        });
    }
}

function shuffle(arr){
  let copy=[]; let index=0; for(let a in arr) copy[a]=arr[a];
  while(copy.length!=0) {let val = rand(copy.length-1); arr[index++] = copy[val]; copy.splice(val,1)}
}


window.You = You;
window.Creature = Creature;
window.define_creatures = define_creatures;
window.Ability = Ability;
window.define_abilities = define_abilities;
window.Effector = Effector;
window.define_effectors = define_effectors;
window.activateEffectors = activateEffectors;
window.deactivateEffectors = deactivateEffectors;
window.runEffectors = runEffectors;
window.Zone = Zone;
window.define_zones = define_zones;
window.z_bake = z_bake;
window.Sector = Sector;
window.add_to_sector = add_to_sector;
window.inSector = inSector;
window.define_sectors = define_sectors;
window.Container = Container;
window.giveCrExp = giveCrExp;
window.Recipe = Recipe;
window.define_recipes = define_recipes;
window.evaluateSpecialRequirementsForRecipe = evaluateSpecialRequirementsForRecipe;
window.findItemQuantity = findItemQuantity;
window.canMake = canMake;
window.make = make;
window.Vendor = Vendor;
window.define_vendors = define_vendors;
window.restock = restock;
window.shuffle = shuffle;
