function define_items() {
    item.rcs = new Item(); item.rcs.id = 3000;
    item.rcs.name='Reality shot';
    item.rcs.desc='Amplifies surrounding awareness and perception senses';
    item.rcs.stype=4;
    item.rcs.rar=3;
    item.rcs.use=function(){
      msg('placeholder');
    }

    item.hrb1 = new Item(); item.hrb1.id = 3001;
    item.hrb1.name='Cure Grass'; item.hrb1.val = 7
    item.hrb1.desc='Herb with minor healing properties. Has to be processed before use. Can somewhat speed up recovery of tiny cuts and bruises if applied directly'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hrb1.val+' </span>health';
    item.hrb1.stype=4; 
    item.hrb1.use=function(){ global.stat.medst++
      you.hp+this.val>you.hpmax?you.hp=you.hpmax:you.hp+=this.val;
      this.amount--; dom.d5_1_1.update(); msg('Restored '+this.val+' hp','lime');
    }
    item.hrb1.onGet=function(){
      if(this.amount>=50) {giveRcp(rcp.hlstw); this.onGet=function(){}}
    }

    item.atd1 = new Item(); item.atd1.id = 3002;
    item.atd1.name='Herbal Antidote';
    item.atd1.desc='Bundle of certain common herbs, mixed together. Tastes incredibly bitter, but helps to detoxify blood from containments'+dom.dseparator+'<span style=\'color:lime\'> Neautralizes the effects of weak poisons </span>';
    item.atd1.stype=4;
    item.atd1.use=function(){ global.stat.medst++
      if(effect.psn.active===true) {if(effect.psn.duration-30<=0) {removeEff(effect.psn);msg('You feel better','lime')}else{effect.psn.duration-=30;msg('You feel a little better','lightgreen')}} else msg('Tastes like medicine..','lightblue');
      this.amount--; 
    }

    item.psnwrd = new Item(); item.psnwrd.id = 3003;
    item.psnwrd.name='Poison Ward';
    item.psnwrd.desc='Solution developed to protect residents from diseases during times of plague'+dom.dseparator+'<span style=\'color:lime\'> Grants invulnerability to poisons for a few hours </span>';
    item.psnwrd.stype=4;
    item.psnwrd.rar = 2;
    item.psnwrd.use=function(){ global.stat.medst++
      if(effect.psnwrd.active===false) giveEff(you,effect.psnwrd,600); else effect.psnwrd.duration = 600;
      this.amount--; 
    }

    item.hlpd = new Item(); item.hlpd.id = 3004;
    item.hlpd.name='Low-grade Healing Powder'; item.hlpd.val = 16;
    item.hlpd.desc='Finely crushed cure grass. Used as a base to make weak medicine'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hlpd.val+' </span>health';
    item.hlpd.stype=4; 
    item.hlpd.use=function(){ global.stat.medst++
      you.hp+this.val>you.hpmax?you.hp=you.hpmax:you.hp+=this.val;
      this.amount--; dom.d5_1_1.update(); msg('Restored '+this.val+' hp','lime');
    }

    item.smm = new Item(); item.smm.id = 3005;
    item.smm.name='Stomach Medicine';
    item.smm.desc='Mixture of ginger, bittervine,  and other herbs. Destroys toxins in one\'s body'+dom.dseparator+'<span style=\'color:lime\'> Alliviates food poisoning </span>';
    item.smm.stype=4;
    item.smm.use=function(){ global.stat.medst++
      if(effect.fpn.active===true) {if(effect.fpn.duration-30<=0) {removeEff(effect.fpn);msg('You feel better','lime')}else{effect.fpn.duration-=30;msg('You feel a little better','lightgreen')}} else msg('Tastes like medicine..','lightblue');
      this.amount--; 
    }

    item.sp1 = new Item(); item.sp1.id = 3006;
    item.sp1.name='Low-grade Spirit Pill';
    item.sp1.desc='Tiny cheap spirit pill, made from condensed Ki. Lowest type, given to weak people and children to nourish their bodies.'+dom.dseparator+'<span style=\'color:orange\'> Grants +500 EXP </span>';
    item.sp1.stype=4;
    item.sp1.use=function(){
      giveExp(500,true,true,true); global.stat.plst++; global.stat.medst++
      this.amount-- ;
    }

    item.sp2 = new Item(); item.sp2.id = 3007;
    item.sp2.name='Mid-grade Spirit Pill';
    item.sp2.desc='Small cheap spirit pill, made from condensed Ki. Developed to help young martial artists to go through their training'+dom.dseparator+'<span style=\'color:orange\'> Grants +2500 EXP </span>';
    item.sp2.stype=4;
    item.sp2.use=function(){
      giveExp(2500,true,true,true);
      global.stat.plst++;
      global.stat.medst++
      this.amount-- ;
    }

    item.sp3 = new Item(); item.sp3.id = 3008;
    item.sp3.name='High-grade Spirit Pill';
    item.sp3.desc='Small spirit pill, made from condensed Ki. Given to young warriors as energy supplement'+dom.dseparator+'<span style=\'color:orange\'> Grants +15000 EXP </span>';
    item.sp3.stype=4;
    item.sp3.use=function(){
      giveExp(15000,true,true,true); global.stat.plst++; global.stat.medst++
      this.amount-- ;
    }

    item.lsrd = new Item(); item.lsrd.id = 3009;
    item.lsrd.name='Life Shard';
    item.lsrd.desc='A fragment of living energy, trapped within a crystallic shell. Absorbing these slightly increases lifespan'+dom.dseparator+'<span style=\'color:hotpink\'> Increases HP by +2 permanently </span>';
    item.lsrd.stype=4;
    item.lsrd.use=function(){
      you.hpmax+=2;you.hp+=2;you.hpa+=2;dom.d5_1_1.update(); msg('HP increased by +2 permanently','hotpink')
      this.amount-- ;
    }

    item.hptn1 = new Item(); item.hptn1.id = 3010;
    item.hptn1.name='Lesser Healing Potion'; item.hptn1.val = 50;
    item.hptn1.desc='Weakest healing potion you can possibly find. Nearly useless for actual healing, but can act as a headache reliever'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hptn1.val+' </span>health';
    item.hptn1.stype=4; 
    item.hptn1.use=function(){ 
      you.hp+this.val>you.hpmax?you.hp=you.hpmax:you.hp+=this.val; global.stat.potnst++; global.stat.medst++
      this.amount--; dom.d5_1_1.update(); msg('Restored '+this.val+' hp','lime');
    }

    item.lckl = new Item(); item.lckl.id = 3011;
    item.lckl.name='Lucky Clover';
    item.lckl.desc='Clover of the rare breed. Whoever is able to find even one will be blessed by the Gods of Luck'+dom.dseparator+'<span style="color: red">L</span><span style="color: orange">U</span><span style="color: gold">C</span><span style="color: YELLOW">K +1</span>';
    item.lckl.stype=4;
    item.lckl.rar=4;
    item.lckl.onGet=function(){ 
      if(this.amount>=7) {giveRcp(rcp.clrpin); this.onGet=function(){}}
    }
    item.lckl.use=function(x){
      you.luck+=1; msg('Your Luck Increases!','gold');
      this.amount-- ;
    }

    item.wstn1 = new Item(); item.wstn1.id = 3012;
    item.wstn1.name='Grey Whetsone';
    item.wstn1.desc='Cheap and crude piece of whetstone. Not nearly good enough to maintain the life of a weapon, you can at least scrap off dirt and blood with it'+dom.dseparator+'<span style="color: lightgreen">Repairs equipped Weapon for <span style="color: lime">+2 DP</span></span>';
    item.wstn1.stype=4;
    item.wstn1.use=function(x){
      if(you.eqp[0].id===10000) msg('Repair what?...','lightgrey'); else{
      you.eqp[0].dp+2>=you.eqp[0].dpmax?you.eqp[0].dp=you.eqp[0].dpmax:you.eqp[0].dp+=2; msg('You\'ve repaired '+you.eqp[0].name+' slightly','yellow');
      this.amount-- ;}
    }

    item.bdgh = new Item(); item.bdgh.id = 3013;
    item.bdgh.name='Bandage';
    item.bdgh.desc='Clean piece of thin sturdy cloth, perfect for wrapping and securing open wounds'+dom.dseparator+'<span style="color:lime">Somewhat stops bleeding</span>';
    item.bdgh.stype=4; 
    item.bdgh.use=function(){
      if(!effect.bled.active) {msg('You\'re not bleeding','orange');return}
      let f = findbyid(you.eff,effect.bled.id); 
      if(f.duration-20<=0) removeEff(f,f.target); else f.duration-=20;
      msg("You bandage your wounds",'lime'); this.amount--; 
    }
    item.bdgh.onGet=function(){
      if(this.amount>=5) {giveRcp(rcp.mdcag); this.onGet=function(){}}
    }

    item.amshrm = new Item(); item.amshrm.id = 3014;
    item.amshrm.name='Asura Mushroom';
    item.amshrm.desc='The ultimate mushroom of the mushroom world. Eating it makes you feel a mysterious kind of vitality'+dom.dseparator+'<span style="color: springgreen">Permanently increases STR by +5</span>';
    item.amshrm.stype=4;
    item.amshrm.rar=4;
    item.amshrm.use=function(x){
      you.stra+=5; msg('You feel the surge of strength!','crimson');msg('STR +5!','lime'); you.stat_r(); update_d();
      this.amount-- ;
    }

    item.akhrb = new Item(); item.akhrb.id = 3015;
    item.akhrb.name='Aspha Herb';
    item.akhrb.desc='Diet-oriented vegetable with misleading effect. It was such a terrible taste and bitter texture that no one would willingly eat them'+dom.dseparator+'<span style="color: orange">Makes you feel bad</span>';
    item.akhrb.stype=4;
    item.akhrb.rar=2;
    item.akhrb.use=function(x){if(this.disabled!==true){this.disabled=true;
      if(random()<.005){msg('You managed to consume it','lime');giveSkExp(skl.glt,rand(100,(355*(skl.glt.lvl*.2+1))));you.sat*=.2;this.amount-- ;} else{msg(select(['You retch..','You feel like vomiting..','You feel sick..','Your insides turn just by looking at this thing..','You immidiately spit it out..','Your body rejects this..','Your body screams..']),'grey')} setTimeout(()=>{this.disabled=false},200);}
    }

    item.cndl = new Item(); item.cndl.id = 3016;
    item.cndl.name='Candle';
    item.cndl.desc='A tall wax candle, made to burn for a very long time';
    item.cndl.stype=4;
    item.cndl.use=function(x){ 
      if(!effect.cdlt.active) giveEff(you,effect.cdlt); else effect.cdlt.duration = 360;
      this.amount-- ;
    }

    item.incsk = new Item(); item.incsk.id = 3017;
    item.incsk.name='Incense Stick';
    item.incsk.desc='A stick of aromatic incense. It calms your soul and mind'+dom.dseparator+'<span style="color: skyblue">Doubles meditation gain<br>Doubles cultivation gain</span>';
    item.incsk.stype=4;
    item.incsk.use=function(x){ 
      if(effect.incsk.active===true) effect.insck.duration = 600; else giveEff(you,effect.incsk);
      this.amount-- ;
    }

    item.sp0a = new Item(); item.sp0a.id = 3018;
    item.sp0a.name='Spirit Opening Powder';
    item.sp0a.desc='Powder refined from blood of the wyrm. Has potential to improve internal energy'+dom.dseparator+'<span style=\'color:orange\'> Grants +95000 EXP </span><br><span style=\'color:deeppink\'>EXP Gain +1%</span>';
    item.sp0a.stype=4;
    item.sp0a.rar=2;
    item.sp0a.use=function(){ global.stat.medst++
      giveExp(95000,true,true,true); you.exp_t+=.01;
      this.amount-- ;
    }

    item.smkbmb = new Item(); item.smkbmb.id = 3019;
    item.smkbmb.name='Smoke Bomb';
    item.smkbmb.desc='Pellets that release thick smog when crushed. Can create a smokescreen to help you escape from danger'+dom.dseparator+'<span style=\'color:springgreen\'>Bypasses current enemy</span>';
    item.smkbmb.stype=4;
    item.smkbmb.use=function(){
      if(global.flags.civil===true&&global.flags.btl===false) {msg('You\'re not in combat!','red');return}
      if(global.current_z.size===1||global.current_z.size===0||global.current_z.isboss) {msg('You can\'t pass this enemy!','red');return}
      else{clearInterval(timers.btl);clearInterval(timers.btl2); msg('*Puff*','black',null,null,'lightgrey'); global.flags.smkactv=true; 
      global.current_z.size--; zone_init(global.current_z); dom.d7m.update(); 
      this.amount-- ;}
    }

    item.svial1 = new Item(); item.svial1.id = 3020;
    item.svial1.name='Skeleton Vial';
    item.svial1.desc='Summons a lvl 10 Skeleton';
    item.svial1.stype=4;
    item.svial1.use=function(){if(global.flags.civil===true&&global.flags.btl===false){
      if(global.flags.sleepmode||global.flags.rdng||global.flags.isshop||global.flags.busy||global.flags.work) {msg('Unable to summon!','red');return}
      let ta = new Zone(); ta.id=-1
      ta.name = 'Somewhere';
      ta.pop = [{crt:creature.skl,lvlmin:10,lvlmax:10,c:1}]; ta.protected=true;
      ta.onEnd=function(){zone_init(zone.nwh);global.flags.civil=true; global.flags.btl=false;}; global.flags.civil=false; global.flags.btl=true;
      ta.size = 1; z_bake(ta); zone_init(ta); dom.d7m.update(); msg('The creature arises from the ground!','white',null,null,'red')
      this.amount-- ;}else msg('You\'re already in a battle!','red')
    }

    item.mpwdr = new Item(); item.mpwdr.id = 3021;
    item.mpwdr.name='Monster Powder';
    item.mpwdr.desc='Dried and grounded sunbloom mixed with red salts, it emits aura often mistaken for soul energy that attracts nearby creatures<br>'+dom.dseparator+'<span style=\'color:seagreen\'>Increases zone size by 5</span>';
    item.mpwdr.stype=4;
    item.mpwdr.use=function(){
      if(global.current_z.protected||global.current_z.id<=101||global.current_z.size<=1) {msg('Unable to use it here!','red');return}
      msg('You spread some powder on the ground','lime',null,null,'brown')
      global.current_z.size+=5; dom.d7m.update();
      this.amount-- ;
    }

    item.smbpll = new Item(); item.smbpll.id = 3022;
    item.smbpll.name='Slumber Pill'; 
    item.smbpll.desc='Pill with a strong sedative effect. Normally used by sick and old people to treat insomnia, if they can afford it. Has other uses if you are creative enough'+dom.dseparator+'<span style=\'color:lightgrey\'>Makes you sleep through 18 hours in an instant</span>';
    item.smbpll.stype=4;
    item.smbpll.use=function(x){  
        if (global.flags.btl||global.flags.rdng||global.flags.isshop||global.flags.busy||global.flags.work) {
            msg('You can\'t sleep now!','red');
            return;
        } else {
            let b = 0.1;
            let s = HOUR * 18;
            
            if (!global.flags.sleepmode) giveEff(you,effect.slep);
            else if (global.current_location.id===112) b+=home.bed.sq;
            global.stat.plst++
            
            for (let a=0;a<s;a++) {
                giveSkExp(skl.sleep,.1);
                ontick();
            }
        
        if (!global.flags.sleepmode) removeEff(effect.slep);
        }
      this.amount-- ;
    }

    item.lifedr = new Item(); item.lifedr.id = 3023;
    item.lifedr.name='Life Drop';
    item.lifedr.desc='A single drop of revitalizing liquid. Consuming even such a meager amount has a miraclous effect on the lifeforce of a mortal'+dom.dseparator+'<span style=\'color:hotpink\'> Increases HP by +40 permanently </span><br><span style=\'color:lime\'>HP growth rate +2%</span>';
    item.lifedr.stype=4;
    item.lifedr.rar=2;
    item.lifedr.use=function(){
      you.stat_per_lvl[0]+=.03;you.hpmax+=40;you.hp+=40;you.hpa+=40;dom.d5_1_1.update(); msg('HP increased by +40 permanently','hotpink'); msg('HP potential grows!','pink')
      this.amount-- ;
    }

    item.mnblm = new Item(); item.mnblm.id = 3024;
    item.mnblm.name='Moonbloom';
    item.mnblm.desc='A yellow flower which is said to bud on new moons. The flower\' nectar is the favourite of spirits and is effective for recovering from exhaustion, but only by refining it into a pill or elixir is it possible to draw out its full potential, which makes it prized by alchemists'+dom.dseparator+'<span style=\'color:hotpink\'> Increases SAT by +2 permanently </span>';
    item.mnblm.stype=4;
    item.mnblm.rar=2;
    item.mnblm.use=function(){
      you.satmax+=2;you.sat+=2;you.sata+=2;dom.d5_3_1.update(); msg('SAT increased by +2 permanently','hotpink');
      this.amount-- ;
    }

    item.hptn2 = new Item(); item.hptn2.id = 3025;
    item.hptn2.name='Minor Healing Potion'; item.hptn2.val = 450;
    item.hptn2.desc='Healing potion with weak healing powers. It is usually used by commoners as first aid before deciding whether to go see a doctor or not'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hptn2.val+' </span>health';
    item.hptn2.stype=4; 
    item.hptn2.use=function(){ 
      you.hp+this.val>you.hpmax?you.hp=you.hpmax:you.hp+=this.val; global.stat.potnst++; global.stat.medst++
      this.amount--; dom.d5_1_1.update(); msg('Restored '+this.val+' hp','lime');
    }

    item.hptn3 = new Item(); item.hptn3.id = 3026;
    item.hptn3.name='Healing Potion'; item.hptn3.val = 2100;
    item.hptn3.desc='Startand healing potion of common quality. It can heal wounds, bruises, burns, sprains and other minor injuries. Novice adventurers and hunters should carry a few of these at all times'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hptn3.val+' </span>health';
    item.hptn3.stype=4; 
    item.hptn3.use=function(){ 
      you.hp+this.val>you.hpmax?you.hp=you.hpmax:you.hp+=this.val; global.stat.potnst++; global.stat.medst++
      this.amount--; dom.d5_1_1.update(); msg('Restored '+this.val+' hp','lime');
    }

    item.hptn4 = new Item(); item.hptn4.id = 3027;
    item.hptn4.name='Major Healing Potion'; item.hptn4.val = 7900;
    item.hptn4.desc='Potions given to the knights in times of war. Can heal moderate wounds and dull out the pain. These potions sneak their way into the market by all kinds of illegal means, yet actually selling them isn\'t prohibited'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hptn4.val+' </span>health';
    item.hptn4.stype=4; item.hptn4.rar=2; 
    item.hptn4.use=function(){ 
      you.hp+this.val>you.hpmax?you.hp=you.hpmax:you.hp+=this.val; global.stat.potnst++; global.stat.medst++
      this.amount--; dom.d5_1_1.update(); msg('Restored '+this.val+' hp','lime');
    }

    item.lsstn = new Item(); item.lsstn.id = 3028;
    item.lsstn.name='Life Stone';
    item.lsstn.desc='Life vessel that lost its energy and became impure, now looks like an ordinary small pebble and serves very little purpose. Can be absorbed for minor health benefits'+dom.dseparator+'<span style=\'color:hotpink\'> Increases HP by +25 permanently </span>';
    item.lsstn.stype=4;
    item.lsstn.use=function(){
      you.hpmax+=25;you.hp+=25;you.hpa+=25;dom.d5_1_1.update(); msg('HP increased by +25 permanently','hotpink')
      this.amount-- ;
    }

    item.bltrt = new Item(); item.bltrt.id = 3029;
    item.bltrt.name='Bloat Root';
    item.bltrt.desc='Unremarkable looking grey root that is bland and tasteless, but eating it makes you feel full. It doesn\'t seem to have any other qualities, hovewer'+dom.dseparator+'Restores<span style=\'color:lime\'> 100 </span>energy';
    item.bltrt.stype=4;
    item.bltrt.rar=2;
    item.bltrt.use=function(){
      you.sat+100>you.satmax?you.sat=you.satmax:you.sat+=100;dom.d5_3_1.update();
      this.amount-- ; msg('Restored 100 energy','lime');
    }

    item.feip1 = new Item(); item.feip1.id = 3030;
    item.feip1.name='Fei Pill'; 
    item.feip1.desc='When an alchemist miserably fails to produce a pill, this waste is created. Compound of ruined medical materials is full of poison and impurities, it can be used to kill those with weak constitution. However, it is not useless, and can be absorbed for raw ki if one endures the pain and survives after consuming it';
    item.feip1.stype=4;
    item.feip1.use=function(){  
      giveEff(you,effect.fei1,60,1);
      this.amount-- ; global.stat.plst++
    }

    item.stthbm1 = new Item(); item.stthbm1.id = 3031;
    item.stthbm1.name='Morgia';
    item.stthbm1.desc='Herb of might. This fiery herb is rumored to improve muscle density'+dom.dseparator+'<span style="color: springgreen">Permanently increases STR by +1</span>';
    item.stthbm1.stype=4;
    item.stthbm1.rar=2;
    item.stthbm1.use=function(x){
      you.stra+=1; msg('You feel the surge of strength!','crimson');msg('STR +1','lime'); you.stat_r(); update_d();
      this.amount-- ;
    }

    item.stthbm2 = new Item(); item.stthbm2.id = 3032;
    item.stthbm2.name='Springsweed';
    item.stthbm2.desc='Herb of swiftness. Loved by Serpents, this herb slightly raises one\'s reaction time'+dom.dseparator+'<span style="color: springgreen">Permanently increases SPD by +1</span>';
    item.stthbm2.stype=4;
    item.stthbm2.rar=2;
    item.stthbm2.use=function(x){
      you.spda+=1; msg('You feel the surge of strength!','crimson');msg('SPD +1','lime'); you.stat_r(); update_d();
      this.amount-- ;
    }

    item.stthbm3 = new Item(); item.stthbm3.id = 3033;
    item.stthbm3.name='Clearbane';
    item.stthbm3.desc='Herb of clarity. This herb is often used in making of high quality incense'+dom.dseparator+'<span style="color: springgreen">Permanently increases INT by +1</span>';
    item.stthbm3.stype=4;
    item.stthbm3.rar=2;
    item.stthbm3.use=function(x){
      you.inta+=1; msg('You feel the surge of strength!','crimson');msg('INT +1','lime'); you.stat_r(); update_d();
      this.amount-- ;
    }

    item.stthbm4 = new Item(); item.stthbm4.id = 3034;
    item.stthbm4.name='Drakevine';
    item.stthbm4.desc='Herb of flexibility. There are rumors of an old hermit growing these herbs under the hidden mountain'+dom.dseparator+'<span style="color: springgreen">Permanently increases AGL by +1</span>';
    item.stthbm4.stype=4;
    item.stthbm4.rar=2;
    item.stthbm4.use=function(x){
      you.agla+=1; msg('You feel the surge of strength!','crimson');msg('AGL +1','lime'); you.stat_r(); update_d();
      this.amount-- ;
    }

    item.bmsmktt = new Item(); item.bmsmktt.id = 3035;
    item.bmsmktt.name='Smoke Pellet Cluster';
    item.bmsmktt.desc='Repurposed smoke bomb, made by concentrating multiple volatile components together, making the moke several times more hazardous, but not enough to cause real damage to a living person. Since the ignition period from such a modification is much longer, it has fewer uses than a regular smoke bomb';
    item.bmsmktt.stype=4;
    item.bmsmktt.use=function(){ 
      if(global.current_location.id!==111){msg('This isn\'t the best place to use this','red'); return}
      zone.hmbsmnt.size=0; msg('You toss a cluster down your basement and hear a distant shrill','yellow')
      dom.location_text.innerHTML+='<span style="color:grey;font-size:1.2em">&nbsp煙<span>'
      sector.home.data.smkp = 900; sector.home.data.smkt = time.minute; this.amount-- ; 
    }


    item.appl = new Item(); item.appl.id = 1;
    item.appl.name='Apple'; item.appl.val = 7;
    item.appl.desc='Juicy red fruit. Makes a fine breakfast if you have nothing else...'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.appl.val+' </span>energy';
    item.appl.stype = 4; 
    item.appl.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val;
      this.amount--; dom.d5_3_1.update(); skl.glt.use(2); global.stat.fooda++;
      msg('Restored '+this.val+' energy','lime');
    }

    item.brd = new Item(); item.brd.id = 2;
    item.brd.name='Bread'; item.brd.val = 14;
    item.brd.desc='Simple loaf of bread, baked with care. It\'s crunchy and smells nice'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.brd.val+' </span>energy';
    item.brd.stype = 4; item.brd.rot = [.15,.25,.05,.15];  
    item.brd.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }
    item.brd.onChange=function(x,y){if(y) return [item.spb,x]; giveItem(item.spb,x)}

    item.crrt = new Item(); item.crrt.id = 3;
    item.crrt.name='Carrot'; item.crrt.val = 5
    item.crrt.desc='It gets very sweet when boiled'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.crrt.val+' </span>energy';
    item.crrt.stype = 4; 
    item.crrt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(1); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }
    item.crrt.onGet=function(){
      if(this.amount>=20) {giveRcp(rcp.bcrrt); this.onGet=function(){}}
    }

    item.potat = new Item(); item.potat.id = 4;
    item.potat.name='Potato';  item.potat.val = 7;
    item.potat.desc='Universal vegetable that can be prepared in hundreds different ways'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.potat.val+' </span>energy';
    item.potat.stype = 4;
    item.potat.use = function(){
      if (random()<.1) {if(effect.fpn.active===false) giveEff(you,effect.fpn,rand(15,35)); else effect.fpn.duration+=rand(5,25); }
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.eggn = new Item(); item.eggn.id = 5;
    item.eggn.name='Egg'; item.eggn.val = 4;
    item.eggn.desc='Whole chicken egg, very nutritious'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.eggn.val+' </span>energy';
    item.eggn.stype = 4; 
    item.eggn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.mlkn = new Item(); item.mlkn.id = 6;
    item.mlkn.name='Milk'; item.mlkn.val = 8;
    item.mlkn.desc='Power potion for your bones'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.mlkn.val+' </span>energy';
    item.mlkn.stype = 4; 
    item.mlkn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.foodb++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.rwmt1 = new Item(); item.rwmt1.id = 7;
    item.rwmt1.name='Raw Meat'; item.rwmt1.val = 11;
    item.rwmt1.desc='Edible part of some animal, has to be cooked before consumption'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.rwmt1.val+' </span>energy';
    item.rwmt1.stype = 4; item.rwmt1.rot = [.25,.45,.1,.2]
    item.rwmt1.onGet=function(){
      if(this.amount>=5) {giveRcp(rcp.rsmt); this.onGet=function(){}}
    }
    item.rwmt1.use = function(){ 
      if (random()<.15) {if(effect.fpn.active===false) giveEff(you,effect.fpn,rand(15,35)); else effect.fpn.duration+=rand(5,25); }
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }
    item.rwmt1.onChange=function(x,y){if(y) return[item.rtnmt,x]; giveItem(item.rtnmt,x)}

    item.rice = new Item(); item.rice.id = 8;
    item.rice.name='Rice'; item.rice.val = 2;
    item.rice.desc='Clean rice grains. Healthy and delicious when cooked, but awful to eat in dry state'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.rice.val+' </span>energy';
    item.rice.stype = 4; 
    item.rice.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }


    item.borc = new Item(); item.borc.id = 9;
    item.borc.name='Steamed Rice'; item.borc.val = 18;
    item.borc.desc='Fluffy rice. Simple dish that tastes good'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.borc.val+' </span>energy';
    item.borc.stype = 4; 
    item.borc.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.begg = new Item(); item.begg.id = 10;
    item.begg.name='Boiled Egg'; item.begg.val = 7;
    item.begg.desc='Hard/soft-boiled egg, you aren\'t sure. Will fill you up either way'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.begg.val+' </span>energy';
    item.begg.stype = 4; 
    item.begg.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.kit = new Item(); item.kit.id = 11;
    item.kit.name='Kikatsugan'; item.kit.val = 800; 
    item.kit.desc='Ninja ration consisting mostly of cereals that, according to esoteric scrolls, <span style=\'color:orange\'>\"Could sustain one in both mind and body with only three grains per day\"</span>'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.kit.val+' </span>energy';
    item.kit.stype = 4; 
    item.kit.rar = 4;
    item.kit.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(390); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.bac = new Item(); item.bac.id = 12;
    item.bac.name='Bacon'; item.bac.val = 12;
    item.bac.desc='The food of kings'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bac.val+' </span>energy';
    item.bac.stype = 4; 
    item.bac.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.bgt = new Item(); item.bgt.id = 13;
    item.bgt.name='Baguette'; item.bgt.val = 17;
    item.bgt.desc='A very long bread'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bgt.val+' </span>energy';
    item.bgt.stype = 4;
    item.bgt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.bhd = new Item(); item.bhd.id = 14;
    item.bhd.name='Hardtack'; item.bhd.val = 6;
    item.bhd.desc='A dry and virtually tasteless bread product capable of remaining edible without spoilage for vast lengths of time'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bhd.val+' </span>energy';
    item.bhd.stype = 4; 
    item.bhd.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.spb = new Item(); item.spb.id = 15;
    item.spb.name='Spoiled Bread'; item.spb.val = 8;
    item.spb.desc=' Piece of old stale bread covered in mold. Takes courage to eat'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.spb.val+' </span>energy';
    item.spb.stype = 4; 
    item.spb.rar = 0; 
    item.spb.use = function(){
      if (random()<.4) {if(effect.fpn.active===false) giveEff(you,effect.fpn,rand(15,35)); else effect.fpn.duration+=rand(5,25); }
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(17); global.stat.fooda++;global.stat.foodt++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.wsb = new Item(); item.wsb.id = 16;
    item.wsb.name='Wastebread'; item.wsb.val = 11;
    item.wsb.desc='When flour becomes a commodity to deal with, wayfarers and the poor resort to mix it with leftovers of other ingredients and bake it all into bread'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wsb.val+' </span>energy';
    item.wsb.stype = 4; 
    item.wsb.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.onn = new Item(); item.onn.id = 17;
    item.onn.name='Onion'; item.onn.val = 3;
    item.onn.desc='Vegetable cultivated since ancient times. Enhances the dish in various ways, also makes you cry'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.onn.val+' </span>energy';
    item.onn.stype = 4; 
    item.onn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.sgr = new Item(); item.sgr.id = 18;
    item.sgr.name='Sugar'; item.sgr.val = 1;
    item.sgr.desc='Sweet little crystals. Kids love treats made out of them'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.sgr.val+' </span>energy';
    item.sgr.stype = 4; 
    item.sgr.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(1); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.wht = new Item(); item.wht.id = 19;
    item.wht.name='Wheat'; item.wht.val = 1;
    item.wht.desc='Raw wheat. While not very tasty, powder made out of them is the main ingredient in breadmaking'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wht.val+' </span>energy';
    item.wht.stype = 4; 
    item.wht.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(1); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.tmt = new Item(); item.tmt.id = 20;
    item.tmt.name='Tomato'; item.tmt.val = 8;
    item.tmt.desc='Soursweet juicy edible, has many uses in cooking. Rumored to be poisonous'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.tmt.val+' </span>energy';
    item.tmt.stype = 4; 
    item.tmt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.cbg = new Item(); item.cbg.id = 21;
    item.cbg.name='Cabbage'; item.cbg.val = 12;
    item.cbg.desc='Crisp layered vegetable. Used in variety of dishes'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cbg.val+' </span>energy';
    item.cbg.stype = 4; 
    item.cbg.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.mshr = new Item(); item.mshr.id = 22;
    item.mshr.name='Mushroom'; item.mshr.val = 5;
    item.mshr.desc='Common edible mushroom. When cooked with the right ingredients, the flavour of this mushroom is not so common'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.mshr.val+' </span>energy';
    item.mshr.stype = 4; 
    item.mshr.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.bnn = new Item(); item.bnn.id = 23;
    item.bnn.name='Banana'; item.bnn.val = 8;
    item.bnn.desc='Fruit full of potassium. Originaly cultivated as staple food, but eventually gained popularity'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bnn.val+' </span>energy';
    item.bnn.stype = 4; 
    item.bnn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(1); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.wbrs = new Item(); item.wbrs.id = 24;
    item.wbrs.name='Wild Berries'; item.wbrs.val = 7;
    item.wbrs.desc='Wide selection of various edible berries collected from the forest'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wbrs.val+' </span>energy';
    item.wbrs.stype = 4; 
    item.wbrs.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(1); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.strwb = new Item(); item.strwb.id = 25;
    item.strwb.name='Strawberry'; item.strwb.val = 18;
    item.strwb.desc='Heap of plump red berries. They are sweet and popular with children and royalty'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.strwb.val+' </span>energy';
    item.strwb.stype = 4; 
    item.strwb.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.orng = new Item(); item.orng.id = 26;
    item.orng.name='Orange'; item.orng.val = 9;
    item.orng.desc='Fragnant citruis, can be either sour or sweet depending where it was cultivated'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.orng.val+' </span>energy';
    item.orng.stype = 4; 
    item.orng.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.ches = new Item(); item.ches.id = 27;
    item.ches.name='Cheese'; item.ches.val = 13;
    item.ches.desc='Fermented cow milk. Despite having strong smell it is a tasty and popular product. Can be eaten raw'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ches.val+' </span>energy';
    item.ches.stype = 4; 
    item.ches.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.ltcc = new Item(); item.ltcc.id = 28;
    item.ltcc.name='Lettuce'; item.ltcc.val = 2;
    item.ltcc.desc='Watery leaves, usually used in salads'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ltcc.val+' </span>energy';
    item.ltcc.stype = 4; 
    item.ltcc.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.brly = new Item(); item.brly.id = 29;
    item.brly.name='Barley'; item.brly.val = 2;
    item.brly.desc='Grainy cereal used for malting. A staple of brewing everywhere. It can also be ground into flour'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.brly.val+' </span>energy';
    item.brly.stype = 4; 
    item.brly.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(1); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.grlc = new Item(); item.grlc.id = 30;
    item.grlc.name='Garlic'; item.grlc.val = 6;
    item.grlc.desc='A pungent garlic, popular as a seasoning for its strong flavor'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.grlc.val+' </span>energy';
    item.grlc.stype = 4; 
    item.grlc.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.pmpk = new Item(); item.pmpk.id = 31;
    item.pmpk.name='Pumpkin'; item.pmpk.val = 12;
    item.pmpk.desc='A large vegetable, about the size of your head. Not very tasty raw, but is great for cooking'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.pmpk.val+' </span>energy';
    item.pmpk.stype = 4; 
    item.pmpk.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.lmn = new Item(); item.lmn.id = 32;
    item.lmn.name='Lemon'; item.lmn.val = 8;
    item.lmn.desc='Very sour citrus. Can be eaten if you really want'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.lmn.val+' </span>energy';
    item.lmn.stype = 4; 
    item.lmn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.grp = new Item(); item.grp.id = 33;
    item.grp.name='Grapes'; item.grp.val = 8;
    item.grp.desc='A cluster of juicy grapes. If you ferment them they\'ll turn into wine'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.grp.val+' </span>energy';
    item.grp.stype = 4; 
    item.grp.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.pnpl = new Item(); item.pnpl.id = 34;
    item.pnpl.name='Pineapple'; item.pnpl.val = 12;
    item.pnpl.desc='A large, spiky pineapple. A bit sour, though'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.pnpl.val+' </span>energy';
    item.pnpl.stype = 4; 
    item.pnpl.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.rsmt = new Item(); item.rsmt.id = 35;
    item.rsmt.name='Roasted Meat'; item.rsmt.val = 15; item.rsmt.rot = [.1,.25,.05,.15]
    item.rsmt.desc='Simple slab of meat, roasted on an open fire without any seasoning. Tastes pretty good nonetheless'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.rsmt.val+' </span>energy'; 
    item.rsmt.stype = 4; 
    item.rsmt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.tbrwd = new Item(); item.tbrwd.id = 36;
    item.tbrwd.name='Tea'; item.tbrwd.val = 20;
    item.tbrwd.desc='The beverage of gentlemen everywhere, made from applying hot water to leaves of the tea plant. Often used during the ceremonies as a social supplement'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.tbrwd.val+' </span>energy';
    item.tbrwd.stype = 4; 
    item.tbrwd.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.htbrwd = new Item(); item.htbrwd.id = 37;
    item.htbrwd.name='Herbal Tea'; item.htbrwd.val = 16;
    item.htbrwd.desc='Healthy beverage brewed from various herbs, has a powerful relaxation effect'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.htbrwd.val+' </span>energy';
    item.htbrwd.stype = 4; 
    item.htbrwd.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.segg = new Item(); item.segg.id = 38;
    item.segg.name='Scrambled Eggs'; item.segg.val = 20;
    item.segg.desc='Fluffy and delicious scrambled eggs'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.segg.val+' </span>energy';
    item.segg.stype = 4; 
    item.segg.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.irntl = new Item(); item.irntl.id = 39;
    item.irntl.name='Indigo Rantil'; item.irntl.val = 31;
    item.irntl.desc='Wierd wine mixed with whiskey and rum'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.irntl.val+' </span>energy';
    item.irntl.stype = 4; 
    item.irntl.rar = 2;
    item.irntl.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(17); global.stat.foodb++; global.stat.foodal++; giveSkExp(skl.drka,21)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,130); else effect.drunk.duration+=75
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.wine1 = new Item(); item.wine1.id = 40;
    item.wine1.name='One-year Wine'; item.wine1.val = 12;
    item.wine1.desc='Barely reached the standard, maybe you should keep it for longer'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wine1.val+' </span>energy';
    item.wine1.stype = 4; 
    item.wine1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.foodb++; global.stat.foodal++; giveSkExp(skl.drka,5)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,60); else effect.drunk.duration+=35
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.wines1 = new Item(); item.wines1.id = 41;
    item.wines1.name='Valens'; item.wines1.val = 100;
    item.wines1.desc='A Celtic red wine with delicate, yet robust, flavour'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wines1.val+' </span>energy';
    item.wines1.stype = 4; 
    item.wines1.rar = 4;
    item.wines1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(100); global.stat.foodb++;  global.stat.foodal++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.wines2 = new Item(); item.wines2.id = 42;
    item.wines2.name='Prudens'; item.wines2.val = 100;
    item.wines2.desc='The most elegant red wine, with gentle flavour and bouquet'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wines2.val+' </span>energy';
    item.wines2.stype = 4; 
    item.wines2.rar = 4;
    item.wines2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(100); global.stat.foodb++; global.stat.foodal++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.wines3 = new Item(); item.wines3.id = 43;
    item.wines3.name='Volare'; item.wines3.val = 100;
    item.wines3.desc='A Celtic white wine known for its honey-like fragrance'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wines3.val+' </span>energy';
    item.wines3.stype = 4; 
    item.wines3.rar = 4;
    item.wines3.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(100); global.stat.foodb++; global.stat.foodal++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.wines4 = new Item(); item.wines4.id = 44;
    item.wines4.name='Audentia'; item.wines4.val = 100;
    item.wines4.desc='A Celtic quality sweet wine allowed to age to perfection'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wines4.val+' </span>energy';
    item.wines4.stype = 4; 
    item.wines4.rar = 4;
    item.wines4.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(100); global.stat.foodb++; global.stat.foodal++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.wines5 = new Item(); item.wines5.id = 45;
    item.wines5.name='Virtus'; item.wines5.val = 100;
    item.wines5.desc='A sparkling wine made from a blend of three grapes'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wines5.val+' </span>energy';
    item.wines5.stype = 4; 
    item.wines5.rar = 4;
    item.wines5.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(100); global.stat.foodb++; global.stat.foodal++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.acrn = new Item(); item.acrn.id = 46;
    item.acrn.name='Acorn'; item.acrn.val = 4;
    item.acrn.desc='A handful of acorns, still in their shells. Squirrels like them, but they\'re not very good for you to eat in this state'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.acrn.val+' </span>energy';
    item.acrn.stype = 4; 
    item.acrn.use = function(){
      if (random()<.4) {if(effect.fpn.active===false) giveEff(you,effect.fpn,rand(15,35)); else effect.fpn.duration+=rand(5,25); }
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.wine2 = new Item(); item.wine2.id = 47;
    item.wine2.name='Three-year Wine'; item.wine2.val = 24;
    item.wine2.desc='Delicious wine kept for more than 3 years'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wine2.val+' </span>energy';
    item.wine2.stype = 4; 
    item.wine2.rar = 2; 
    item.wine2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(17); global.stat.foodal++; global.stat.foodb++; giveSkExp(skl.drka,12)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,90); else effect.drunk.duration+=45
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.winec1 = new Item(); item.winec1.id = 48;
    item.winec1.name='Cheap Red Wine'; item.winec1.val = 8;
    item.winec1.desc='Very rough wine made from fermeted fruit'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.winec1.val+' </span>energy';
    item.winec1.stype = 4; 
    item.winec1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.foodb++; global.stat.foodal++; giveSkExp(skl.drka,5)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,55); else effect.drunk.duration+=33
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.winec2 = new Item(); item.winec2.id = 49;
    item.winec2.name='Cheap White Wine'; item.winec2.val = 12;
    item.winec2.desc='Light wine, prepared only recently'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.winec2.val+' </span>energy';
    item.winec2.stype = 4; 
    item.winec2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.foodb++; global.stat.foodal++; giveSkExp(skl.drka,8)
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      if(effect.drunk.active===false) giveEff(you,effect.drunk,60); else effect.drunk.duration+=35
    }

    item.ske = new Item(); item.ske.id = 50
    item.ske.name='Sake'; item.ske.val = 31;
    item.ske.desc='Eastern rice wine, popular past-time drink'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ske.val+' </span>energy';
    item.ske.stype = 4; 
    item.ske.rar = 2; 
    item.ske.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(25); global.stat.foodal++; global.stat.foodb++; giveSkExp(skl.drka,25)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,180); else effect.drunk.duration+=115
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.pske = new Item(); item.pske.id = 51
    item.pske.name='Premium Sake'; item.pske.val = 51;
    item.pske.desc='Rich Sake with strong foundation, flavorful and fragnant. Valued in high society for its presige status'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.pske.val+' </span>energy';
    item.pske.stype = 4; 
    item.pske.rar = 3; 
    item.pske.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(65); global.stat.foodal++; global.stat.foodb++; giveSkExp(skl.drka,150)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,380); else effect.drunk.duration+=190
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.cbun1 = new Item(); item.cbun1.id = 52
    item.cbun1.name='Steamed Bun'; item.cbun1.val = 19;
    item.cbun1.desc='Plain round bun, very soft and filling'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cbun1.val+' </span>energy';
    item.cbun1.stype = 4; 
    item.cbun1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.cbun2 = new Item(); item.cbun2.id = 53
    item.cbun2.name='Red Bean Bun'; item.cbun2.val = 29; 
    item.cbun2.desc='Bun with red beans added to it, resulting in rich flavour'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cbun2.val+' </span>energy';
    item.cbun2.stype = 4; 
    item.cbun2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.cbun3 = new Item(); item.cbun3.id = 54
    item.cbun3.name='Pork Bun'; item.cbun3.val = 34; 
    item.cbun3.desc='Delicious treat with pork meat inside of it, fine addition to your dinner'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cbun3.val+' </span>energy';
    item.cbun3.stype = 4; 
    item.cbun3.rar = 2;
    item.cbun3.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.scak = new Item(); item.scak.id = 55;
    item.scak.name='Strawberry Shortcake'; item.scak.val = 39; 
    item.scak.desc='Sweet cake with cream and strawberries, has a soft texture and melts in your mouth'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.scak.val+' </span>energy';
    item.scak.stype = 4; 
    item.scak.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(13); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.atrt = new Item(); item.atrt.id = 56;
    item.atrt.name='Apple Tart'; item.atrt.val = 29; 
    item.atrt.desc='Crunchy small cake baked with apples'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.atrt.val+' </span>energy';
    item.atrt.stype = 4; 
    item.atrt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.strt = new Item(); item.strt.id = 57;
    item.strt.name='Strawberry Tart'; item.strt.val = 38; 
    item.strt.desc='Sweet pastry with strawberries added on top'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.strt.val+' </span>energy';
    item.strt.stype = 4;
    item.strt.rar = 2;
    item.strt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.ccak = new Item(); item.ccak.id = 58;
    item.ccak.name='Cheesecake'; item.ccak.val = 52; 
    item.ccak.desc='Delicious sweet dessert prepared in multiple layers. With fruit jam on top!'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ccak.val+' </span>energy';
    item.ccak.stype = 4; 
    item.ccak.rar = 2;
    item.ccak.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(15); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.icrm = new Item(); item.icrm.id = 59;
    item.icrm.name='Ice Cream'; item.icrm.val = 19; 
    item.icrm.desc='A sweet, frozen food made of milk with rich amounts of sugar. Gets very popular during Summer'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.icrm.val+' </span>energy';
    item.icrm.stype = 4; 
    item.icrm.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.lnch1 = new Item(); item.lnch1.id = 60;
    item.lnch1.name='Bacon and Eggs'; item.lnch1.val = 40; 
    item.lnch1.desc='Breakfast of choice and a part of your morning ritual, very filling'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.lnch1.val+' </span>energy';
    item.lnch1.stype = 4; 
    item.lnch1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(12); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.lnch2 = new Item(); item.lnch2.id = 61;
    item.lnch2.name='Morning Set'; item.lnch2.val = 47; 
    item.lnch2.desc='Eggs and toast. Goes best with Coffee'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.lnch2.val+' </span>energy';
    item.lnch2.stype = 4; 
    item.lnch2.rar = 2;
    item.lnch2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(15); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.lnch3 = new Item(); item.lnch3.id = 62;
    item.lnch3.name='Lunch Set'; item.lnch3.val = 58; 
    item.lnch3.desc='Hefty combination of meat, eggs and a toast.'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.lnch3.val+' </span>energy';
    item.lnch3.stype = 4;
    item.lnch3.rar = 2; 
    item.lnch3.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(22); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.orgs = new Item(); item.orgs.id = 63;
    item.orgs.name='Onion Rings'; item.orgs.val = 20; 
    item.orgs.desc='Golden slices of onion, buttered and fried in flour. Crunchy!'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.orgs.val+' </span>energy';
    item.orgs.stype = 4;
    item.orgs.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.fsh1 = new Item(); item.fsh1.id = 65;
    item.fsh1.name='Fish'; item.fsh1.val = 15; 
    item.fsh1.desc='Freshly caught fish. Makes a passable meal raw'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.fsh1.val+' </span>energy';
    item.fsh1.stype = 4;
    item.fsh1.use = function(){
      if (random()<.1) {if(effect.fpn.active===false) giveEff(you,effect.fpn,rand(15,35)); else effect.fpn.duration+=rand(5,25); }
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }
    item.fsh1.dss=[{item:item.fsh2,amount:1}]

    item.fsh2 = new Item(); item.fsh2.id = 66;
    item.fsh2.name='Fish Fillet'; item.fsh2.val = 6; 
    item.fsh2.desc='The fillet of fish, ready to be cooked'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.fsh2.val+' </span>energy';
    item.fsh2.stype = 4;
    item.fsh2.use = function(){
      if (random()<.05) {if(effect.fpn.active===false) giveEff(you,effect.fpn,rand(15,35)); else effect.fpn.duration+=rand(5,25); }
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.ffsh1 = new Item(); item.ffsh1.id = 67;
    item.ffsh1.name='Cooked Fish'; item.ffsh1.val = 19; 
    item.ffsh1.desc='Evenly fried delicious fish. It has a very deicious aroma'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ffsh1.val+' </span>energy';
    item.ffsh1.stype = 4;
    item.ffsh1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.ffsh2 = new Item(); item.ffsh2.id = 68;
    item.ffsh2.name='Batter Fried Fish'; item.ffsh2.val = 42; 
    item.ffsh2.desc='A delicious golden brown serving of crispy fried fish'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ffsh2.val+' </span>energy';
    item.ffsh2.stype = 4;
    item.ffsh2.rar = 2;
    item.ffsh2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.ssm = new Item(); item.ssm.id = 69;
    item.ssm.name='Sashimi'; item.ssm.val = 17;
    item.ssm.desc='Little fish slices, served with tangly dip sauce'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ssm.val+' </span>energy';
    item.ssm.stype = 4;
    item.ssm.rar = 2;
    item.ssm.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.dssm = new Item(); item.dssm.id = 70;
    item.dssm.name='Deluxe Sashimi'; item.dssm.val = 43; // fish soy cucum lettuc
    item.dssm.desc='Delicious slivers of thinly sliced raw fish and tasty vegetables'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.dssm.val+' </span>energy';
    item.dssm.stype = 4;
    item.dssm.rar = 2;
    item.dssm.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(15); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.mkzs = new Item(); item.mkzs.id = 71;
    item.mkzs.name='Makizushi'; item.mkzs.val = 35; 
    item.mkzs.desc='Delicious fish slices wrapped in tasty sushi rice and rolled up in a healthy nori'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.mkzs.val+' </span>energy';
    item.mkzs.stype = 4;
    item.mkzs.rar = 2;
    item.mkzs.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(17); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.nori = new Item(); item.nori.id = 72;
    item.nori.name='Nori'; item.nori.val = 10; 
    item.nori.desc='Pages of dried seaweed, very healthy and tastes like ocean'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.nori.val+' </span>energy';
    item.nori.stype = 4;
    item.nori.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.fnori = new Item(); item.fnori.id = 73;
    item.fnori.name='Fried Nori'; item.fnori.val = 20; 
    item.fnori.desc='Sheets of nori friend with salt, giving it an entirely new taste. An incredibly delicios and popular snack'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.fnori.val+' </span>energy';
    item.fnori.stype = 4;
    item.fnori.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.swtch1 = new Item(); item.swtch1.id = 74;
    item.swtch1.name='Sandwich'; item.swtch1.val = 40; 
    item.swtch1.desc='Two peices of bread and a slice of cheese inbetween. Simple and tasty'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.swtch1.val+' </span>energy';
    item.swtch1.stype = 4;
    item.swtch1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.jll = new Item(); item.jll.id = 75;
    item.jll.name='Jelly'; item.jll.val = 6; 
    item.jll.desc='Should you really be eating this stuff?'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.jll.val+' </span>energy';
    item.jll.stype = 4;
    item.jll.use = function(){ 
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.flr = new Item(); item.flr.id = 76;
    item.flr.name='Flour'; item.flr.val = 1; 
    item.flr.desc='This enriched white flour is useful for baking'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.flr.val+' </span>energy';
    item.flr.stype = 4;
    item.flr.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.pcns = new Item(); item.pcns.id = 77;
    item.pcns.name='Pine Nuts'; item.pcns.val = 4; 
    item.pcns.desc='A handful of tasty crunchy nuts from a pinecone'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.pcns.val+' </span>energy';
    item.pcns.stype = 4;
    item.pcns.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.dgh = new Item(); item.dgh.id = 78;
    item.dgh.name='Dough'; item.dgh.val = 4; 
    item.dgh.desc='Flour mixed with water, kneaded into a gooey paste.  This dough can be used to bake bread more efficiently than with just flour'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.dgh.val+' </span>energy';
    item.dgh.stype = 4;
    item.dgh.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.hzlnt = new Item(); item.hzlnt.id = 79;
    item.hzlnt.name='Hazelnuts'; item.hzlnt.val = 6;
    item.hzlnt.desc='Popular forest nuts, still in their shells. They smell like the woods they come from'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hzlnt.val+' </span>energy';
    item.hzlnt.stype = 4;
    item.hzlnt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.hpck = new Item(); item.hpck.id = 80;
    item.hpck.name='Hippo Cookie'; item.hpck.val = 33;
    item.hpck.desc='Soft cookies in a shape of a cute hippo, baked with milk and hazelnuts. Very popular with children and adults alike'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hpck.val+' </span>energy';
    item.hpck.stype = 4;
    item.hpck.rar = 2;
    item.hpck.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.dfrt = new Item(); item.dfrt.id = 81;
    item.dfrt.name='Dried Fruit'; item.dfrt.val = 12; 
    item.dfrt.desc='Fruit roughly chopped and sun-dried, prepared as marching rations for the rangers'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.dfrt.val+' </span>energy';
    item.dfrt.stype = 4;
    item.dfrt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.brdb = new Item(); item.brdb.id = 82;
    item.brdb.name='Burnt Bread'; item.brdb.val = 4; 
    item.brdb.desc='Completely ruined and unappetizing loaf of charred bread. You can still eat it, but you probably won\'t enjoy it'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.brdb.val+' </span>energy';
    item.brdb.stype = 4;
    item.brdb.rar = 0
    item.brdb.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(12); global.stat.fooda++; global.stat.foodt++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.spcn = new Item(); item.spcn.id = 83;//Pukusakina
    item.spcn.name='Soft Windflower'; item.spcn.val = 5; 
    item.spcn.desc='Wild vegetable that goes well with meat. '+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.spcn.val+' </span>energy';
    item.spcn.stype = 4;
    item.spcn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.hney = new Item(); item.hney.id = 84;
    item.hney.name='Honey'; item.hney.val = 11; 
    item.hney.desc='Sweet sticky syrup that bees make. Can be turned into candy, but also very good by itself'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hney.val+' </span>energy';
    item.hney.stype = 4;
    item.hney.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.brise = new Item(); item.brise.id = 85;
    item.brise.name='Bad Rice'; item.brise.val = 8; 
    item.brise.desc='Old spoiled rice that\'s gone bad and turned yellow. Desperate food'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.brise.val+' </span>energy';
    item.brise.stype = 4;
    item.brise.rar = 0;
    item.brise.use = function(){
      if (random()<.75) {if(effect.fpn.active===false) giveEff(you,effect.fpn,rand(15,35)); else effect.fpn.duration+=rand(5,25); }
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(16); global.stat.fooda++; global.stat.foodt++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.steak = new Item(); item.steak.id = 86; 
    item.steak.name='Steak'; item.steak.val = 50; 
    item.steak.desc='Quality steak seared to perfection with a sprinkle of salt and generous twist of pepper. The delicious aroma is enough to make you drool'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.steak.val+' </span>energy';
    item.steak.stype = 4;
    item.steak.rar = 2;
    item.steak.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(15); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.spc1 = new Item(); item.spc1.id = 87; 
    item.spc1.name='Black Pepper'; item.spc1.val = 2; 
    item.spc1.desc='Small black berries with pungent aroma. Perfect for spicing food up'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.spc1.val+' </span>energy';
    item.spc1.stype = 4;
    item.spc1.rar = 2;
    item.spc1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.cnmn = new Item(); item.cnmn.id = 88; 
    item.cnmn.name='Cinnamon'; item.cnmn.val = 3; 
    item.cnmn.desc='Bark sticks from the Cinnamon tree. Fragnant and good for your health'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cnmn.val+' </span>energy';
    item.cnmn.stype = 4;
    item.cnmn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.bttr = new Item(); item.bttr.id = 89; 
    item.bttr.name='Butter'; item.bttr.val = 8; 
    item.bttr.desc='Small brick of creamy butter, made from churned cow milk '+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bttr.val+' </span>energy';
    item.bttr.stype = 4;
    item.bttr.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.cnmnb = new Item(); item.cnmnb.id = 90; 
    item.cnmnb.name='Cinnamon Bun'; item.cnmnb.val = 36; 
    item.cnmnb.desc='Fluffy sweet pastry bun with aromatic cinnamon powder sprinkled on top of it. Rare treat everyone can enjoy '+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cnmnb.val+' </span>energy';
    item.cnmnb.stype = 4;
    item.cnmnb.rar = 2;
    item.cnmnb.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.brth = new Item(); item.brth.id = 91; 
    item.brth.name='Broth'; item.brth.val = 16; 
    item.brth.desc='Tasty and healthy meat broth. Used mainly for cooking soups, but can be consumed as is'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.brth.val+' </span>energy';
    item.brth.stype = 4;
    item.brth.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.eggsp = new Item(); item.eggsp.id = 92; 
    item.eggsp.name='Egg Soup'; item.eggsp.val = 46; 
    item.eggsp.desc='Popular soup made from delicious broth and eggs. It\'s a great meal to start your day with'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.eggsp.val+' </span>energy';
    item.eggsp.stype = 4;
    item.eggsp.rar = 2;
    item.eggsp.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.scln = new Item(); item.scln.id = 93; 
    item.scln.name='Scallion'; item.scln.val = 4; 
    item.scln.desc='Green scallions, also known as spring onions. Slightly spicy and fragnant, they help to bring out the taste of the soups'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.scln.val+' </span>energy';
    item.scln.stype = 4;
    item.scln.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.crmchd = new Item(); item.crmchd.id = 94; 
    item.crmchd.name='Creamy Chowder'; item.crmchd.val = 62; 
    item.crmchd.desc='Delicious meat howder with milk, cheese and potato flakes. You can practically taste the chef\'s skill'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.crmchd.val+' </span>energy';
    item.crmchd.stype = 4;
    item.crmchd.rar = 2;
    item.crmchd.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.chklt = new Item(); item.chklt.id = 95; 
    item.chklt.name='Chocolate'; item.chklt.val = 9; 
    item.chklt.desc='Ground cacao beans solidified into a sweet, tasty treat'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.chklt.val+' </span>energy';
    item.chklt.stype = 4;
    item.chklt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.fegg = new Item(); item.fegg.id = 96; 
    item.fegg.name='Fried Egg'; item.fegg.val = 9; 
    item.fegg.desc='An egg, simply fried as is. It\'s pretty good'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.fegg.val+' </span>energy';
    item.fegg.stype = 4;
    item.fegg.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.crn = new Item(); item.crn.id = 97; 
    item.crn.name='Corn'; item.crn.val = 3; 
    item.crn.desc='Golden kernels, attached to a cob. Practically inedible like this'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.crn.val+' </span>energy';
    item.crn.stype = 4;
    item.crn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.bcrn = new Item(); item.bcrn.id = 98; 
    item.bcrn.name='Butter Corn'; item.bcrn.val = 25; 
    item.bcrn.desc='Golden brown corn fried in generous amount of butter. Very tasty'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bcrn.val+' </span>energy';
    item.bcrn.stype = 4;
    item.bcrn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.pcrn = new Item(); item.pcrn.id = 99; 
    item.pcrn.name='Popcorn'; item.pcrn.val = 10; 
    item.pcrn.desc='Corn kernels, roasted under high heat. They make a *pop* sound and explode into little edible clouds'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.pcrn.val+' </span>energy';
    item.pcrn.stype = 4;
    item.pcrn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.cpcrn = new Item(); item.cpcrn.id = 100; 
    item.cpcrn.name='Salted Popcorn'; item.cpcrn.val = 15; 
    item.cpcrn.desc='Regular popcorn, but slightly salted for extra taste'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cpcrn.val+' </span>energy';
    item.cpcrn.stype = 4;
    item.cpcrn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.fbrd = new Item(); item.fbrd.id = 101;
    item.fbrd.name='Flatbread'; item.fbrd.val = 12;
    item.fbrd.desc='Primitive unleavened bread'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.fbrd.val+' </span>energy';
    item.fbrd.stype = 4; 
    item.fbrd.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.gcce = new Item(); item.gcce.id = 102;
    item.gcce.name='Ginger Cookie'; item.gcce.val = 25;
    item.gcce.desc='Spiced cookies baked from a batter of flour, molasses and ginger powder'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.gcce.val+' </span>energy';
    item.gcce.stype = 4; 
    item.gcce.rar = 2; 
    item.gcce.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.bcrc = new Item(); item.bcrc.id = 103;
    item.bcrc.name='Bone Cracker'; item.bcrc.val = 12;
    item.bcrc.desc='Bones of some kind, baked until crisp'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bcrc.val+' </span>energy';
    item.bcrc.stype = 4; 
    item.bcrc.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.snkb = new Item(); item.snkb.id = 104;
    item.snkb.name='Snack Bar'; item.snkb.val = 30;
    item.snkb.desc='Fruit, sugar, and grain meal mixed and molded before being backed into a stcik-shaped pastry'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.snkb.val+' </span>energy';
    item.snkb.stype = 4; 
    item.snkb.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.dmtp = new Item(); item.dmtp.id = 105;
    item.dmtp.name='Deluxe Meat Pie'; item.dmtp.val = 60;
    item.dmtp.desc='Premium pie with abudance of various meats, best eaten hot! Extremely filling'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.dmtp.val+' </span>energy';
    item.dmtp.rar=2;
    item.dmtp.stype = 4; 
    item.dmtp.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(41); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.lkmc = new Item(); item.lkmc.id = 106;
    item.lkmc.name='Lokum'; item.lkmc.val = 29;
    item.lkmc.desc='Grain meal cooked down, mixed with mashed fruits and then cooled to produce a soft candy'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.lkmc.val+' </span>energy';
    item.lkmc.stype = 4; 
    item.lkmc.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.vgsn = new Item(); item.vgsn.id = 107;
    item.vgsn.name='Vegetable Sandwich'; item.vgsn.val = 35;
    item.vgsn.desc='A sandwich with sliced cucumber filling. Tastes slightly bland'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.vgsn.val+' </span>energy';
    item.vgsn.stype = 4; 
    item.vgsn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.stgp = new Item(); item.stgp.id = 108;
    item.stgp.name='Stargazing Pie'; item.stgp.val = 55;
    item.stgp.desc='A pie containing a whole fish romantically gazing up at the stars'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.stgp.val+' </span>energy';
    item.stgp.stype = 4; 
    item.stgp.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(18); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.tdpps = new Item(); item.tdpps.id = 109;
    item.tdpps.name='Tallow Drops'; item.tdpps.val = 33;
    item.tdpps.desc='Nourishing tallow, molded into lozenges. Subtly sweet'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.tdpps.val+' </span>energy';
    item.tdpps.stype = 4; 
    item.tdpps.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.chstn = new Item(); item.chstn.id = 110;
    item.chstn.name='Chestnuts'; item.chstn.val = 5;
    item.chstn.desc='Delicious acorns which release more flavour the more one chews on them'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.chstn.val+' </span>energy';
    item.chstn.stype = 4; 
    item.chstn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(1); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.prfd = new Item(); item.prfd.id = 111;
    item.prfd.name='Prison Food'; item.prfd.val = 22;
    item.prfd.desc='This jail level delicacy is nutritious, generously portioned and inexpensive. But it doesn\'t taste good'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.prfd.val+' </span>energy';
    item.prfd.stype = 4; 
    item.prfd.rar = 0; 
    item.prfd.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.brmt = new Item(); item.brmt.id = 112;
    item.brmt.name='Burnt Meat'; item.brmt.val = 7; 
    item.brmt.desc='Coal-looking overcooked chunk of meat. Mildly nutritious but awful to eat'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.brmt.val+' </span>energy';
    item.brmt.stype = 4;
    item.brmt.rar = 0
    item.brmt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++; global.stat.foodt++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.mbsps = new Item(); item.mbsps.id = 113;
    item.mbsps.name='Mebaspa Sandwich'; item.mbsps.val = 52;
    item.mbsps.desc='Ordinary bread with meatballs and spaghetti put in it, it\'s extremely high on cholesterol. Weird skeleton kid invented this dish'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.mbsps.val+' </span>energy';
    item.mbsps.stype = 4; 
    item.mbsps.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(66); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.spgt = new Item(); item.spgt.id = 114;
    item.spgt.name='Spaghetti and Meatballs'; item.spgt.val = 33;
    item.spgt.desc='Long noodles with meat and meatsauce. Renown food from some far off land'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.spgt.val+' </span>energy';
    item.spgt.stype = 4; 
    item.spgt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.mnj1 = new Item(); item.mnj1.id = 115;
    item.mnj1.name='Manjū'; item.mnj1.val = 26;
    item.mnj1.desc='Popular traditional eastern confection, kneaded boiled bun with the variety of sweet fillings within in'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.mnj1.val+' </span>energy';
    item.mnj1.stype = 4; 
    item.mnj1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.mnj2 = new Item(); item.mnj2.id = 116;
    item.mnj2.name='Alcoholic Manjū'; item.mnj2.val = 38;
    item.mnj2.desc='Manjū bun with delicious sake added to it'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.mnj2.val+' </span>energy';
    item.mnj2.rar=2;
    item.mnj2.stype = 4; 
    item.mnj2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(12); global.stat.fooda++; global.stat.foodal++; giveSkExp(skl.drka,10)
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.ntea1 = new Item(); item.ntea1.id = 117;
    item.ntea1.name='Landen Flower Tea'; item.ntea1.val = 26;
    item.ntea1.desc='Rare herbal tea created by a talented pharmacist. It calms and relaxes those who drink it.'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ntea1.val+' </span>energy';
    item.ntea1.rar=2;
    item.ntea1.stype = 4; 
    item.ntea1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.jrk1 = new Item(); item.jrk1.id = 118;
    item.jrk1.name='Beef Jerky'; item.jrk1.val = 18;
    item.jrk1.desc='Perfectly dried strips of meat. The taste is not bad, this jerky can be kept edible for years'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.jrk1.val+' </span>energy';
    item.jrk1.stype = 4; 
    item.jrk1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.jrk2 = new Item(); item.jrk2.id = 119;
    item.jrk2.name='Spicy Jerky'; item.jrk2.val = 30;
    item.jrk2.desc='Valuable jerky, enriched and improved. Salted and spiced into a filling and tasty travel food'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.jrk2.val+' </span>energy';
    item.jrk2.stype = 4; 
    item.jrk2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.ongr = new Item(); item.ongr.id = 120;
    item.ongr.name='Onigiri'; item.ongr.val = 25;
    item.ongr.desc='A simple portable food consisting of cooked rice rolled into a ball and seasoned with salt'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ongr.val+' </span>energy';
    item.ongr.stype = 4; 
    item.ongr.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.rbmb = new Item(); item.rbmb.id = 121;
    item.rbmb.name='Rice Bomb'; item.rbmb.val = 33;
    item.rbmb.desc='A grilled onigiri with a miso-ginger glaze that creates explosion of flavour'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.rbmb.val+' </span>energy';
    item.rbmb.stype = 4; 
    item.rbmb.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.mchii = new Item(); item.mchii.id = 122;
    item.mchii.name='Mochi'; item.mchii.val = 22;
    item.mchii.desc='Dumpling made with kneaded mochi rice flour'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.mchii.val+' </span>energy';
    item.mchii.stype = 4; 
    item.mchii.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.mchai = new Item(); item.mchai.id = 123;
    item.mchai.name='Kuzumochi'; item.mchai.val = 29;
    item.mchai.desc='Variation of mochi, made by glazing grilled rice flour with kudzu sauce'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.mchai.val+' </span>energy';
    item.mchai.stype = 4; 
    item.mchai.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(12); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.igum = new Item(); item.igum.id = 124;
    item.igum.name='Ice Gummy'; item.igum.val = 17;
    item.igum.desc='A refreshing snack made from larvae suspended in fruit juice gelatin'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.igum.val+' </span>energy';
    item.igum.stype = 4; 
    item.igum.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.msoop = new Item(); item.msoop.id = 125;
    item.msoop.name='Mushroom Soup'; item.msoop.val = 37; 
    item.msoop.desc='Refreshing soup made of chopped mushrooms, potatoes and onions boiled together'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.msoop.val+' </span>energy';
    item.msoop.stype = 4; 
    item.msoop.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.rmn1 = new Item(); item.rmn1.id = 126;
    item.rmn1.name='Chashu Ramen'; item.rmn1.val = 41; 
    item.rmn1.desc='This ramen features fresh soy sauce broth and deliciously textured chashu pork '+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.rmn1.val+' </span>energy';
    item.rmn1.stype = 4; 
    item.rmn1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.rmn2 = new Item(); item.rmn2.id = 127;
    item.rmn2.name='Miso Ramen'; item.rmn2.val = 44; 
    item.rmn2.desc='Miso and pork mixed with spicy vegetables makes for a succulent soup you\'d want to eat again'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.rmn2.val+' </span>energy';
    item.rmn2.stype = 4; 
    item.rmn2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }

    item.rmn3 = new Item(); item.rmn3.id = 128;
    item.rmn3.name='Tonkotsu Ramen'; item.rmn3.val = 48; 
    item.rmn3.desc='This delicious tonkotsu ramen is a rich pork-infused soup made from finest ingredients'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.rmn3.val+' </span>energy';
    item.rmn3.stype = 4; 
    item.rmn3.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');

    }


    item.sqdyak = new Item(); item.sqdyak.id = 129;
    item.sqdyak.name='Squid Yakisoba'; item.sqdyak.val = 43; 
    item.sqdyak.desc='Tender, delicious yakisoba noodles are combined with tasty squid making a filling and enjoyable meal'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.sqdyak.val+' </span>energy';
    item.sqdyak.stype = 4; 
    item.sqdyak.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.mtbeer = new Item(); item.mtbeer.id = 130;
    item.mtbeer.name='Malt Beer'; item.mtbeer.val = 18; 
    item.mtbeer.desc='This beer has a pleasant aftertaste and depth of flavor that only 100% barley malts can provide'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.mtbeer.val+' </span>energy';
    item.mtbeer.stype = 4; 
    item.mtbeer.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(18); global.stat.foodb++; global.stat.foodal++; giveSkExp(skl.drka,8)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,40); else effect.drunk.duration+=20
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.dbeer = new Item(); item.dbeer.id = 131;
    item.dbeer.name='Draft Beer'; item.dbeer.val = 15; 
    item.dbeer.desc='A medium-sized mug of draft beet that many like to start with. Its creamy head and crisp taste are perfect after a day of hard work '+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.dbeer.val+' </span>energy';
    item.dbeer.stype = 4; 
    item.dbeer.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(19); global.stat.foodb++; global.stat.foodal++; giveSkExp(skl.drka,6)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,52); else effect.drunk.duration+=31
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.ootee = new Item(); item.ootee.id = 132;
    item.ootee.name='Oolong Tea'; item.ootee.val = 25; 
    item.ootee.desc='Oolong tea, famous for its thick, rich flavor and light aftertaste, is the quintessential non-alcoholic drink. Enjoy its exquisite fragrance and flavor'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ootee.val+' </span>energy';
    item.ootee.stype = 4; 
    item.ootee.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.foodb++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.krcsal = new Item(); item.krcsal.id = 133;
    item.krcsal.name='Kotchori Salad'; item.krcsal.val = 49; 
    item.krcsal.desc='Kotchori salad brimming with eastern bunching onions! The peppery dressing drizzled on top and pungent onion flavor match all manners of drings'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.krcsal.val+' </span>energy';
    item.krcsal.stype = 4; 
    item.krcsal.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.emdm = new Item(); item.emdm.id = 134;
    item.emdm.name='Edamame'; item.emdm.val = 21; 
    item.emdm.desc='These soybeans in a pod are pretty much the default snack when drinking'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.emdm.val+' </span>energy';
    item.emdm.stype = 4; 
    item.emdm.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.skplt = new Item(); item.skplt.id = 135;
    item.skplt.name='Skewer Platter'; item.skplt.val = 61; 
    item.skplt.desc='A plate of five different skewers. The secret to their popularity is the special spicy miso'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.skplt.val+' </span>energy';
    item.skplt.stype = 4; 
    item.skplt.rar = 2; 
    item.skplt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.skwre = new Item(); item.skwre.id = 136;
    item.skwre.name='Eastern Chicken Skewer'; item.skwre.val = 39; 
    item.skwre.desc='Chicken sourced from domestic farms makes for a firm, juicy kebab with unique richness of flavor'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.skwre.val+' </span>energy';
    item.skwre.stype = 4; 
    item.skwre.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.smfro = new Item(); item.smfro.id = 137;
    item.smfro.name='Smelt Fish with Roe'; item.smfro.val = 34; 
    item.smfro.desc='The burst of flavor from the roe with over many who try this perfectly grilled with delicacy'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.smfro.val+' </span>energy';
    item.smfro.stype = 4; 
    item.smfro.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.fsqdnr = new Item(); item.fsqdnr.id = 138;
    item.fsqdnr.name='Fried Squid with Nori'; item.fsqdnr.val = 44; 
    item.fsqdnr.desc='A dish found on the meny of many izakaya. Fans can never get enough of the nori fragrance and firm squid flesh'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.fsqdnr.val+' </span>energy';
    item.fsqdnr.stype = 4; 
    item.fsqdnr.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.sltyak = new Item(); item.sltyak.id = 139;
    item.sltyak.name='Salted Yakisoba'; item.sltyak.val = 39; 
    item.sltyak.desc='This addictive yakisoba dish mixes a rich, salty sauce with piquant eastern onions, and can be eaten as a meal or a snack with drinks'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.sltyak.val+' </span>energy';
    item.sltyak.stype = 4; 
    item.sltyak.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.jcmncc = new Item(); item.jcmncc.id = 140;
    item.jcmncc.name='Juicy Mince Cutlet'; item.jcmncc.val = 45; 
    item.jcmncc.desc='This popular mince cutlet is packed with meaty goodness that fills your mouth each time you take a bite'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.jcmncc.val+' </span>energy';
    item.jcmncc.stype = 4; 
    item.jcmncc.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++; 
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.sbeanf = new Item(); item.sbeanf.id = 141;
    item.sbeanf.name='Stir-Fried Bean Sprouts'; item.sbeanf.val = 37; 
    item.sbeanf.desc='A simple dish taht cahmpiions the humble bean sprout, accented with a peppery punch. Once you start earing it, it\'s hard to put down'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.sbeanf.val+' </span>energy';
    item.sbeanf.stype = 4; 
    item.sbeanf.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++; 
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.mgpch = new Item(); item.mgpch.id = 142;
    item.mgpch.name='Mango & Peach Sherbet'; item.mgpch.val = 29; 
    item.mgpch.desc='No matter how much you\'ve already eaten, it\'s always seary to make room for this tropical sherbet dessert'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.mgpch.val+' </span>energy';
    item.mgpch.stype = 4; 
    item.mgpch.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++; 
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.maitake = new Item(); item.maitake.id = 143;
    item.maitake.name='Maitake'; item.maitake.val = 7; 
    item.maitake.desc='Maitake mushrooms are a delectable addition to hotpots'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.maitake.val+' </span>energy';
    item.maitake.stype = 4; 
    item.maitake.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(2); global.stat.fooda++; 
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.odens = new Item(); item.odens.id = 144;
    item.odens.name='Oden Soup'; item.odens.val = 40; 
    item.odens.desc='There is more than enough of this piping hot oden assortment to satisfy your hunger. Perfect for a colkd winter evening'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.odens.val+' </span>energy';
    item.odens.stype = 4; 
    item.odens.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++; 
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.onign1 = new Item(); item.onign1.id = 145;
    item.onign1.name='Seaweed Onigiri'; item.onign1.val = 30; 
    item.onign1.desc='Seaweed boiled in soy sauce is in the center of this onigiri'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.onign1.val+' </span>energy';
    item.onign1.stype = 4; 
    item.onign1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++; 
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }



    item.onign2 = new Item(); item.onign2.id = 146;
    item.onign2.name='Tuna Onigiri'; item.onign2.val = 36; 
    item.onign2.desc='This nigiri has tuna dressing with maynnaise in the middle'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.onign2.val+' </span>energy';
    item.onign2.stype = 4; 
    item.onign2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++; 
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.onign3 = new Item(); item.onign3.id = 147;
    item.onign3.name='Salmon Onigiri'; item.onign3.val = 38; 
    item.onign3.desc='Old standard salmon onigiri, belowed by old and young for generations'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.onign3.val+' </span>energy';
    item.onign3.stype = 4; 
    item.onign3.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++; 
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.syakis = new Item(); item.syakis.id = 148;
    item.syakis.name='Special Yakisoba'; item.syakis.val = 50; 
    item.syakis.desc='Yakisoba with cabbage and pork. The smell of the sauce is mouth-watering'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.syakis.val+' </span>energy';
    item.syakis.stype = 4; 
    item.syakis.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++; 
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.kkbin = new Item(); item.kkbin.id = 149;
    item.kkbin.name='Kakubin'; item.kkbin.val = 25; 
    item.kkbin.desc='The most popular whisky in the East. It has a sweet aroma and is thick on the palate, with a smooth, rich taste'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.kkbin.val+' </span>energy';
    item.kkbin.stype = 4; 
    item.kkbin.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(21); global.stat.foodb++; global.stat.foodal++;  giveSkExp(skl.drka,11)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,80); else effect.drunk.duration+=50
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.blsho = new Item(); item.blsho.id = 150;
    item.blsho.name='Barley Shochu'; item.blsho.val = 39; 
    item.blsho.desc='This barley shochy has a dry state popular with experienced drinkers'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.blsho.val+' </span>energy';
    item.blsho.stype = 4; 
    item.blsho.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(23); global.stat.foodb++; global.stat.foodal++;  giveSkExp(skl.drka,21)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,72); else effect.drunk.duration+=36
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.scwhi = new Item(); item.scwhi.id = 151;
    item.scwhi.name='Scotch Whisky'; item.scwhi.val = 40; 
    item.scwhi.desc='This whisky has a high alcohol content, so be careful not to drink too much'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.scwhi.val+' </span>energy';
    item.scwhi.stype = 4; 
    item.scwhi.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(30); global.stat.foodb++; global.stat.foodal++; giveSkExp(skl.drka,24)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,140); else effect.drunk.duration+=70
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.cham1 = new Item(); item.cham1.id = 152;
    item.cham1.name='Satoyu Champon'; item.cham1.val = 45; 
    item.cham1.desc='The flavors of Satoyu condensed into one dish. The rich soup is made with fresh vegetables and a wealth of of ohter ingredients'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cham1.val+' </span>energy';
    item.cham1.stype = 4; 
    item.cham1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.cham2 = new Item(); item.cham2.id = 153;
    item.cham2.name='Vegetable Champon'; item.cham2.val = 48; 
    item.cham2.desc='This dish features seven different vegetables, and contains double the cabbage, bean sprouts, and onionof the standard champion'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cham2.val+' </span>energy';
    item.cham2.stype = 4; 
    item.cham2.rar = 2; 
    item.cham2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(11); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.cham3 = new Item(); item.cham3.id = 154;
    item.cham3.name='Spicy Champon'; item.cham3.val = 42; 
    item.cham3.desc='Eye-popping champon with homemade spicy miso'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cham3.val+' </span>energy';
    item.cham3.stype = 4; 
    item.cham3.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(14); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.cham4 = new Item(); item.cham4.id = 155;
    item.cham4.name='Light Champon'; item.cham4.val = 26; 
    item.cham4.desc='A small serving of champon that is popular with women. Just the thing when you are only a little hungry'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.cham4.val+' </span>energy';
    item.cham4.stype = 4; 
    item.cham4.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.sudon1 = new Item(); item.sudon1.id = 156;
    item.sudon1.name='Satoyu Saraudon'; item.sudon1.val = 47; 
    item.sudon1.desc='Extra thin, crispy deep-fried noodles packed with flavor, and topped with vegetable in a thick, silky sauce that melts in your mouth '+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.sudon1.val+' </span>energy';
    item.sudon1.stype = 4; 
    item.sudon1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.sudon2 = new Item(); item.sudon2.id = 157;
    item.sudon2.name='Vegetable Saraudon'; item.sudon2.val = 42; 
    item.sudon2.desc='A sister dish to the popular Vegetable Champon. Eat it with a dressing of your choice'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.sudon2.val+' </span>energy';
    item.sudon2.stype = 4; 
    item.sudon2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.sudon3 = new Item(); item.sudon3.id = 158;
    item.sudon3.name='Thick Saraudon'; item.sudon3.val = 50; 
    item.sudon3.desc='Soft, thisk, flavorsome noodle make for a filling treat. Big plate is enough to satiate you for a whole day!'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.sudon3.val+' </span>energy';
    item.sudon3.stype = 4; 
    item.sudon3.rar = 2; 
    item.sudon3.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.sudon4 = new Item(); item.sudon4.id = 159;
    item.sudon4.name='Light Saraudon'; item.sudon4.val = 25; 
    item.sudon4.desc='A small plate of udon that hits the spot when you feel like a snack'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.sudon4.val+' </span>energy';
    item.sudon4.stype = 4; 
    item.sudon4.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.goza = new Item(); item.goza.id = 160;
    item.goza.name='Gyoza'; item.goza.val = 37; 
    item.goza.desc='Fried dumplings with a rich meat filling. The skin has rice flour blended in for amazing crispiness'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.goza.val+' </span>energy';
    item.goza.stype = 4; 
    item.goza.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.dfrch = new Item(); item.dfrch.id = 161;
    item.dfrch.name='Deep Fried Chicken'; item.dfrch.val = 48; 
    item.dfrch.desc='Fried chicken made with thigh meat. it\'s crunchy on the outside and juicy in the middle. Finger-smacking good!'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.dfrch.val+' </span>energy';
    item.dfrch.stype = 4; 
    item.dfrch.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.ynasl = new Item(); item.ynasl.id = 162;
    item.ynasl.name='Yuona Salad'; item.ynasl.val = 29; 
    item.ynasl.desc='Thin, deep-fried noodles topped with dressing and fresh vegetables'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ynasl.val+' </span>energy';
    item.ynasl.stype = 4; 
    item.ynasl.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.ramen1 = new Item(); item.ramen1.id = 163;
    item.ramen1.name='Shoyu Ramen'; item.ramen1.val = 40; 
    item.ramen1.desc='Famous shoyu ramen. Thick soba noodles in the soy sauce based soup, improved with rich selection of vegetables. Delicious!'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ramen1.val+' </span>energy';
    item.ramen1.stype = 4; 
    item.ramen1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.ramen2 = new Item(); item.ramen2.id = 164;
    item.ramen2.name='Negi Ramen'; item.ramen2.val = 42; 
    item.ramen2.desc='Classic shoyu ramen topped with piquant eastern onions'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ramen2.val+' </span>energy';
    item.ramen2.stype = 4; 
    item.ramen2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.ramen3 = new Item(); item.ramen3.id = 165;
    item.ramen3.name='Chashu Ramen'; item.ramen3.val = 50; 
    item.ramen3.desc='Tasty ramen topped with succulent, thin slices of roast pork'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ramen3.val+' </span>energy';
    item.ramen3.stype = 4; 
    item.ramen3.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.ramen4 = new Item(); item.ramen4.id = 166;
    item.ramen4.name='Negi Chashu Ramen'; item.ramen4.val = 66; 
    item.ramen4.desc='This exquisit ramen features a hefty helping of spicy eastern onions and slices of roast pork'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ramen4.val+' </span>energy';
    item.ramen4.stype = 4; 
    item.ramen4.rare = 2; 
    item.ramen4.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(12); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.bffbl = new Item(); item.bffbl.id = 167;
    item.bffbl.name='Beef Bowl'; item.bffbl.val = 48; 
    item.bffbl.desc='A hearty beef bowl made with top quality eastern beef'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bffbl.val+' </span>energy';
    item.bffbl.stype = 4; 
    item.bffbl.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.sposs = new Item(); item.sposs.id = 168;
    item.sposs.name='Sweet Potato Shochu'; item.sposs.val = 33; 
    item.sposs.desc='A sweet potato shochu that succeeds in bringing out the flavors of its ingredients'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.sposs.val+' </span>energy';
    item.sposs.stype = 4; 
    item.sposs.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(26); global.stat.foodb++; global.stat.foodal++; giveSkExp(skl.drka,20)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,92); else effect.drunk.duration+=41
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.soban1 = new Item(); item.soban1.id = 169;
    item.soban1.name='Soba in Hot Broth'; item.soban1.val = 40; 
    item.soban1.desc='This house classic features freshly-boiled soba noodles served in a piping hot homemade soup'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.soban1.val+' </span>energy';
    item.soban1.stype = 4; 
    item.soban1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.soban2 = new Item(); item.soban2.id = 170;
    item.soban2.name='Chilled Soba'; item.soban2.val = 44; 
    item.soban2.desc='Delicious soba noodles rinsed in water after cooking to stop them becoming too soft, served with a special dipping sauce'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.soban2.val+' </span>energy';
    item.soban2.stype = 4; 
    item.soban2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.soban3 = new Item(); item.soban3.id = 171;
    item.soban3.name='Chilled Tanuki Soba'; item.soban3.val = 46; 
    item.soban3.desc='Freshly cooked soba noodles topped with chilled sauce and bits of fried tenpura batter. This is a firm favourite among population'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.soban3.val+' </span>energy';
    item.soban3.stype = 4; 
    item.soban3.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.soban4 = new Item(); item.soban4.id = 172;
    item.soban4.name='Chilled Kitsune Soba'; item.soban4.val = 48; 
    item.soban4.desc='Freshly cooked soba noodles topped with chilled sauce and house made fried tofu cut into easy-to-eat pieces'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.soban4.val+' </span>energy';
    item.soban4.stype = 4; 
    item.soban4.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.soban5 = new Item(); item.soban5.id = 173;
    item.soban5.name='Egg & Tenpura Soba'; item.soban5.val = 52; 
    item.soban5.desc='Hot soba noodles served with soft-boiled egg and vegetable tenpura. This dish is a perennial favorite'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.soban5.val+' </span>energy';
    item.soban5.stype = 4; 
    item.soban5.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(11); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.soban6 = new Item(); item.soban6.id = 174;
    item.soban6.name='Special Fuji Soba'; item.soban6.val = 60; 
    item.soban6.desc='Hot soba noodles topped with a lavish amount of fried tenpura batter and fried tofu, along with soft-bioled egg and "kamaboko" fish cake'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.soban6.val+' </span>energy';
    item.soban6.stype = 4; 
    item.soban6.rar = 2; 
    item.soban6.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(15); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.soban7 = new Item(); item.soban7.id = 175;
    item.soban7.name='Yuzu Chicken & Spinach Soba'; item.soban7.val = 50; 
    item.soban7.desc='A vibrant dish of hot soba noodles topped with spinach and pieces of steamed chicken, accented with the subtle fragrance of yuzu'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.soban7.val+' </span>energy';
    item.soban7.stype = 4; 
    item.soban7.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.katubo = new Item(); item.katubo.id = 176;
    item.katubo.name='Fried Pork Cutlet Bowl'; item.katubo.val = 58; 
    item.katubo.desc='This classic dish features a thick, crunchy pork cutlet topped with sauce and lightly cooked egg. It is made to order for maximum freshness'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.katubo.val+' </span>energy';
    item.katubo.stype = 4; 
    item.katubo.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(11); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.curry1 = new Item(); item.curry1.id = 177;
    item.curry1.name='Curry & Rice'; item.curry1.val = 50; 
    item.curry1.desc='Mild curry and rice. This curry is made with the house\'s special roux and sauce, and is petfect for those who don\'t like too much spice'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.curry1.val+' </span>energy';
    item.curry1.stype = 4; 
    item.curry1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(14); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.soban8 = new Item(); item.soban8.id = 178;
    item.soban8.name='Pickled Ginger Soba'; item.soban8.val = 56; 
    item.soban8.desc='Hot soba noodles served with tenpura containing copious amounts of red pickled ginger for a pleasant meal that warms the soul'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.soban8.val+' </span>energy';
    item.soban8.stype = 4; 
    item.soban8.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.yktr = new Item(); item.yktr.id = 179;
    item.yktr.name='Yakitori'; item.yktr.val = 48; 
    item.yktr.desc='This charcoal-grilled chicken on a skewer has a savory smell that is out of this world'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.yktr.val+' </span>energy';
    item.yktr.stype = 4; 
    item.yktr.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.tegs = new Item(); item.tegs.id = 180;
    item.tegs.name='Tuna & Egg Sandwich'; item.tegs.val = 45; 
    item.tegs.desc='This sandwich features an egg-mayo mix with tuna on white bread'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.tegs.val+' </span>energy';
    item.tegs.stype = 4; 
    item.tegs.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.tamag = new Item(); item.tamag.id = 181;
    item.tamag.name='Tamago'; item.tamag.val = 15; 
    item.tamag.desc='Delicate and tasty egg sushi'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.tamag.val+' </span>energy';
    item.tamag.stype = 4; 
    item.tamag.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.magr = new Item(); item.magr.id = 182;
    item.magr.name='Maguro'; item.magr.val = 26; 
    item.magr.desc='Top-grade bluefin tuna sushi'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.magr.val+' </span>energy';
    item.magr.stype = 4; 
    item.magr.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.ameb = new Item(); item.ameb.id = 183;
    item.ameb.name='Ama-Ebi'; item.ameb.val = 24; 
    item.ameb.desc='This tender, sweet shrimp will melt in your mouth. It\'s unbelievably fresh!'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ameb.val+' </span>energy';
    item.ameb.stype = 4; 
    item.ameb.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.engw = new Item(); item.engw.id = 184;
    item.engw.name='Engawa'; item.engw.val = 32; 
    item.engw.desc='Tastiest engawa sushi made from eastern flounder'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.engw.val+' </span>energy';
    item.engw.stype = 4; 
    item.engw.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.skmsk = new Item(); item.skmsk.id = 185;
    item.skmsk.name='Seki Mackerel'; item.skmsk.val = 30; 
    item.skmsk.desc='Not all mackerel are created equal. This premium mackerel is packed with tasty fish oil'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.skmsk.val+' </span>energy';
    item.skmsk.stype = 4; 
    item.skmsk.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.namatk = new Item(); item.namatk.id = 186;
    item.namatk.name='Namatako'; item.namatk.val = 29; 
    item.namatk.desc='Octopus sushi of the highest grade. The more you chew, the better it tastes. That\'s proof of quality'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.namatk.val+' </span>energy';
    item.namatk.stype = 4; 
    item.namatk.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.hirame = new Item(); item.hirame.id = 187;
    item.hirame.name='Hirame'; item.hirame.val = 37; 
    item.hirame.desc='This halibut is a popular sushi topping. Its sweet white meat doesn\'t have a trace of fishiness'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hirame.val+' </span>energy';
    item.hirame.stype = 4; 
    item.hirame.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.shmaj = new Item(); item.shmaj.id = 188;
    item.shmaj.name='Shima-Aji'; item.shmaj.val = 33; 
    item.shmaj.desc='The king of horse mackerel! It\'s a summer fish best eaten as sashimi or sushi'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.shmaj.val+' </span>energy';
    item.shmaj.stype = 4; 
    item.shmaj.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(6); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.kndma = new Item(); item.kndma.id = 189;
    item.kndma.name='Kinmedai'; item.kndma.val = 38; 
    item.kndma.desc=' The shiny color of this splendid alfonsino is a feast for the eyes. It\'s fatty and melts in your mouth'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.kndma.val+' </span>energy';
    item.kndma.stype = 4; 
    item.kndma.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(7); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.ikura = new Item(); item.ikura.id = 190;
    item.ikura.name='Ikura'; item.ikura.val = 40; 
    item.ikura.desc=' Top quality salmon roe wrapped in nori. The best there is!'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.ikura.val+' </span>energy';
    item.ikura.stype = 4; 
    item.ikura.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.akagi = new Item(); item.akagi.id = 191;
    item.akagi.name='Akagai'; item.akagi.val = 37; 
    item.akagi.desc='Popular sushi toping made from ark clams. Also known as "bloody clams" because they have red blood'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.akagi.val+' </span>energy';
    item.akagi.stype = 4; 
    item.akagi.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.otor = new Item(); item.otor.id = 192;
    item.otor.name='Otoro'; item.otor.val = 45; 
    item.otor.desc='This is the richest cut from the top-grade bluefin tuna. The taste alone will leave you hungry for more'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.otor.val+' </span>energy';
    item.otor.stype = 4; 
    item.otor.rar = 2; 
    item.otor.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(12); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.awabi = new Item(); item.awabi.id = 193;
    item.awabi.name='Awabi'; item.awabi.val = 56; 
    item.awabi.desc='Highest quality abalone with the taste out of this world. Premium snack for those who can afford it'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.awabi.val+' </span>energy';
    item.awabi.stype = 4; 
    item.awabi.rar = 2; 
    item.awabi.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(13); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.uni = new Item(); item.uni.id = 194;
    item.uni.name='Uni'; item.uni.val = 60; 
    item.uni.desc='Exquisit sea urchin meat of the most excellent kind, wrapped in nori. As fresh as can be'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.uni.val+' </span>energy';
    item.uni.stype = 4; 
    item.uni.rar = 3; 
    item.uni.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(16); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.klbi1 = new Item(); item.klbi1.id = 195;
    item.klbi1.name='Kalbi'; item.klbi1.val = 48; 
    item.klbi1.desc='This beef rib meat is popular for its incredibly rich flavor'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.klbi1.val+' </span>energy';
    item.klbi1.stype = 4; 
    item.klbi1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.klbi2 = new Item(); item.klbi2.id = 196;
    item.klbi2.name='Grade A Kalbi'; item.klbi2.val = 55; 
    item.klbi2.desc='Top-grade meat is selected from only the rarest, choicest cuts of beef rib'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.klbi2.val+' </span>energy';
    item.klbi2.stype = 4; 
    item.klbi2.rar = 2; 
    item.klbi2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(25); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.srln1 = new Item(); item.srln1.id = 197;
    item.srln1.name='Sirloin'; item.srln1.val = 52; 
    item.srln1.desc='Light and relatively low fat sirloin beef steak with spices'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.srln1.val+' </span>energy';
    item.srln1.stype = 4; 
    item.srln1.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(12); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.srln2 = new Item(); item.srln2.id = 198;
    item.srln2.name='Grade A Sirloin'; item.srln2.val = 66; 
    item.srln2.desc='Incredible top-grade beef sirloin prized for its unparalleled taste and quality'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.srln2.val+' </span>energy';
    item.srln2.stype = 4; 
    item.srln2.rar = 2; 
    item.srln2.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(28); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.sfdpl = new Item(); item.sfdpl.id = 199;
    item.sfdpl.name='Seafood Platter'; item.sfdpl.val = 57; 
    item.sfdpl.desc='A plate of the sea\'s delicious bounty, including shrimp, scallops, and squid'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.sfdpl.val+' </span>energy';
    item.sfdpl.stype = 4; 
    item.sfdpl.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(38); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.kmchc = new Item(); item.kmchc.id = 200;
    item.kmchc.name='Kimchi Combo'; item.kmchc.val = 63; 
    item.kmchc.desc='A tantalizing combo dish of kimchi made from eastern cabbage, cucumbers, daikon and more'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.kmchc.val+' </span>energy';
    item.kmchc.stype = 4; 
    item.kmchc.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(20); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.stnkbb = new Item(); item.stnkbb.id = 201;
    item.stnkbb.name='Stone Cooked Bibimbap'; item.stnkbb.val = 68; 
    item.stnkbb.desc='Very hot bowl of bibimbap with special spicy sweed kochujang sauce. Roasted to a golden brown for an irresistable taste'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.stnkbb.val+' </span>energy';
    item.stnkbb.stype = 4; 
    item.stnkbb.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(32); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.spcbef = new Item(); item.spcbef.id = 202;
    item.spcbef.name='Spicy Beef Soup'; item.spcbef.val = 49; 
    item.spcbef.desc='Spicy hot beef soup with rice and noodles. It has a very homemade feeling to it'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.spcbef.val+' </span>energy';
    item.spcbef.stype = 4; 
    item.spcbef.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(39); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.binigiri = new Item(); item.binigiri.id = 203;
    item.binigiri.name='Giant Nigiri'; item.binigiri.val = 88; 
    item.binigiri.desc='This nigiri looks way to big to eat. Who made this thing?'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.binigiri.val+' </span>energy';
    item.binigiri.stype = 4; 
    item.binigiri.rar = 3; 
    item.binigiri.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(48); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.infpdps = new Item(); item.infpdps.id = 204;
    item.infpdps.name='Inferno Pepper Dumpling'; item.infpdps.val = 66; 
    item.infpdps.desc='These special dumplings are so hot and addictive that you won\'t be able to talk for a week'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.infpdps.val+' </span>energy';
    item.infpdps.stype = 4; 
    item.infpdps.rar = 3; 
    item.infpdps.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(62); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.daikn = new Item(); item.daikn.id = 205;
    item.daikn.name='Daikon'; item.daikn.val = 6; 
    item.daikn.desc='A still-juicy daikon radish. It\'s not spicy and can be eaten raw'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.daikn.val+' </span>energy';
    item.daikn.stype = 4; 
    item.daikn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.bonig = new Item(); item.bonig.id = 206;
    item.bonig.name='Rotten Onigiri'; item.bonig.val = 19; 
    item.bonig.desc='This riceball has gone bad. You normally wouldn\'t eat this, but when you run out of food even this looks delicious'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bonig.val+' </span>energy';
    item.bonig.stype = 4; 
    item.bonig.rar = 0; 
    item.bonig.use = function(){
      if (random()<.8) {if(effect.fpn.active===false) giveEff(you,effect.fpn,rand(15,35)); else effect.fpn.duration+=rand(5,25); }
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(20); global.stat.fooda++; global.stat.foodt++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.wdaikn = new Item(); item.wdaikn.id = 207;
    item.wdaikn.name='Wihered Daikon'; item.wdaikn.val = 4; 
    item.wdaikn.desc='A daikon radish that has withered in the sun. It\'s still edible, but it\'s kinda sad'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wdaikn.val+' </span>energy';
    item.wdaikn.stype = 4; 
    item.wdaikn.rar = 0; 
    item.wdaikn.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.oppr = new Item(); item.oppr.id = 208;
    item.oppr.name='Oni Pepper'; item.oppr.val = 42; 
    item.oppr.desc='An extremely spicy pepper that makes you erupt in sweat and make an expression like an oni. It hurts more coming out than going in'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.oppr.val+' </span>energy';
    item.oppr.stype = 4; 
    item.oppr.rar = 2; 
    item.oppr.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(42); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.jdaik = new Item(); item.jdaik.id = 209;
    item.jdaik.name='Jumbo Daikon'; item.jdaik.val = 50; 
    item.jdaik.desc='A huge, rare daikon radish. Stews made with this daikon are delicious. You can put some miso paste on it to eat raw'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.jdaik.val+' </span>energy';
    item.jdaik.stype = 4; 
    item.jdaik.rar = 2; 
    item.jdaik.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(35); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.bmshrm = new Item(); item.bmshrm.id = 210;
    item.bmshrm.name='Big Mushroom'; item.bmshrm.val = 33; 
    item.bmshrm.desc='A big, juicy mushroom that sucked up lots of nutrients. It doesn\'t taste ordinary. It can be stewed, roasted, fried or eaten raw'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bmshrm.val+' </span>energy';
    item.bmshrm.stype = 4; 
    item.bmshrm.rar = 2; 
    item.bmshrm.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(16); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.hlstw = new Item(); item.hlstw.id = 211;
    item.hlstw.name='Healing Stew'; item.hlstw.val = 18; 
    item.hlstw.desc='Tasteless soup made by boiling heaps of cure grass in water. Healing only in name, it is known that exposing cure grass to high temperatures destroys any healing properties of the product'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.hlstw.val+' </span>energy';
    item.hlstw.stype = 4; 
    item.hlstw.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(8); global.stat.fooda++;
      dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
      this.amount-- ;
    }

    item.bcrrt = new Item(); item.bcrrt.id = 212;
    item.bcrrt.name='Boiled Carrot'; item.bcrrt.val = 9;
    item.bcrrt.desc='Regular carrot, boiled in water. It is sweet but not all that tasty, actually'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.bcrrt.val+' </span>energy';
    item.bcrrt.stype = 4; 
    item.bcrrt.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.jsdch = new Item(); item.jsdch.id = 213; 
    item.jsdch.name='Jelly Sandwich'; item.jsdch.val = 27;
    item.jsdch.desc='Awful sandwich that doesn\'t taste like anything. It is filling, at the very least'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.jsdch.val+' </span>energy';
    item.jsdch.stype = 4; 
    item.jsdch.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(12); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.agrns = new Item(); item.agrns.id = 214; 
    item.agrns.name='Assorted Grains'; item.agrns.val = 3;
    item.agrns.desc='Buckwheat, sunflower seeds, oats, rye... Various grains, seeds and nuts in very small quantities as such making them not very useful for pretty much anything'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.agrns.val+' </span>energy';
    item.agrns.stype = 4; 
    item.agrns.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(5); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }
    item.agrns.onGet=function(){
      if(this.amount>=10) {giveRcp(rcp.wsb); this.onGet=function(){}}
    }

    item.eggfrc = new Item(); item.eggfrc.id = 215; 
    item.eggfrc.name='Egg Fried Rice'; item.eggfrc.val = 33;
    item.eggfrc.desc='Stir fried egg cooked together with golden rice. Excellent and refreshing dish'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.eggfrc.val+' </span>energy';
    item.eggfrc.stype = 4; 
    item.eggfrc.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(9); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.thme = new Item(); item.thme.id = 216; 
    item.thme.name='Thyme'; item.thme.val = 2;
    item.thme.desc='A stalk of aromatic thyme, often used in medicine as a complimentary herb. Can be made into a relaxing tea or antiseptic'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.thme.val+' </span>energy';
    item.thme.stype = 4; 
    item.thme.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.wldhrbs = new Item(); item.wldhrbs.id = 217; 
    item.wldhrbs.name='Wild Herbs'; item.wldhrbs.val = 1;
    item.wldhrbs.desc='A tasty collection of wild herbs including violet, sassafras, mint, clover, purslane, and fireweed'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.wldhrbs.val+' </span>energy';
    item.wldhrbs.stype = 4; 
    item.wldhrbs.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.meffg = new Item(); item.meffg.id = 218; 
    item.meffg.name='Meat Effigy'; item.meffg.val = 28;
    item.meffg.desc='Strange edible effigy made of who knows what. It tastes like regular jerky'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.meffg.val+' </span>energy';
    item.meffg.stype = 4; 
    item.meffg.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(10); global.stat.fooda++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.rtnmt = new Item(); item.rtnmt.id = 219;
    item.rtnmt.name='Rotten Meat'; item.rtnmt.val = 4; item.rtnmt.rar=0
    item.rtnmt.desc='Greenish grey organic mass that was once something edible, now isn\'t good for pretty much anything'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.rtnmt.val+' </span>energy';
    item.rtnmt.stype = 4; item.rtnmt.rot = [.4,.8,.3,.6]
    item.rtnmt.use = function(){ 
      if (random()<.45) {if(effect.fpn.active===false) giveEff(you,effect.fpn,rand(15,35)); else effect.fpn.duration+=rand(5,25); }
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(13); global.stat.fooda++; global.stat.foodt++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.appljc = new Item(); item.appljc.id = 220 
    item.appljc.name='Apple Juice'; item.appljc.val = 18;
    item.appljc.desc='Freshly-squeezed from real apples!'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.appljc.val+' </span>energy';
    item.appljc.stype = 4; 
    item.appljc.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(3); global.stat.fooda++; global.stat.foodb++;
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.frtplp = new Item(); item.frtplp.id = 221 
    item.frtplp.name='Juice Pulp'; item.frtplp.val = 9; item.frtplp.rot = [.05,.15,.05,.15]
    item.frtplp.desc='Left-over byproduct from juicing the fruit.  Not very tasty, but contains a lot of healthy fiber'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.frtplp.val+' </span>energy';
    item.frtplp.stype = 4; 
    item.frtplp.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(4); global.stat.fooda++; 
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }

    item.klngbr = new Item(); item.klngbr.id = 222;
    item.klngbr.name='Kaoliang'; item.klngbr.val = 52; 
    item.klngbr.desc='Strong traditional liquor with a tangy taste and important role during social gatherings'+dom.dseparator+'Restores<span style=\'color:lime\'> '+item.klngbr.val+' </span>energy';
    item.klngbr.stype = 4; 
    item.klngbr.use = function(){
      you.sat+this.val>you.satmax?you.sat=you.satmax:you.sat+=this.val; skl.glt.use(35); global.stat.foodb++; global.stat.foodal++; giveSkExp(skl.drka,25)
      if(effect.drunk.active===false) giveEff(you,effect.drunk,80); else effect.drunk.duration+=40
      this.amount--; dom.d5_3_1.update(); msg('Restored '+this.val+' energy','lime');
    }


    item.sbone = new Item(); item.sbone.id = 5000;
    item.sbone.name='Small Bone';
    item.sbone.desc='Brittle bone of some animal';
    item.sbone.stype = 5;
    item.sbone.use = function(){msg('You rattle the bone')}
    item.sbone.onGet=function(){
      if(this.amount>=50) {giveRcp(rcp.bdl1); this.onGet=function(){}}
    }

    item.death_badge = new Item();
    item.death_badge.id = 5001;
    item.death_badge.name='Death Badge';
    item.death_badge.desc='Awarded by fate for dying. Congratulations';
    item.death_badge.stype=5;
    item.death_badge.use=function(){msg('Looking at this fills you with bad memories');}

    item.sstraw = new Item(); item.sstraw.id = 5002;
    item.sstraw.name='Strand Of Straw';
    item.sstraw.desc='This fell out of a dummy when you punched it to death';
    item.sstraw.stype=5;
    item.sstraw.use=function(){msg('You put one in your mouth...');}
    item.sstraw.onGet=function(){
      if(this.amount>=30) giveRcp(rcp.strwks); 
      if(this.amount>=40) giveRcp(rcp.wvbkt); 
      if(this.amount>=50) {giveRcp(rcp.sdl1); this.onGet=function(){}}
    }

    item.d6 = new Item(); item.d6.id = 5003;
    item.d6.name='Red Die';
    item.d6.desc='Die with 6 sides. Brings luck';
    item.d6.stype=5;
    item.d6.rar = 2;
    item.d6.use=function(){ let r = rand(1,6); global.stat.die_p+=r; global.stat.die_p_t+=r;
      msg('You roll <span style="color:red">'+r+'</span>'); skl.dice.use(1);
      if(random()<.05) {this.amount--; msg("The die crumbles in your hands",'Magenta');
      }
    }

    item.cp= new Item(); item.cp.id = 5004;
    item.cp.name='Penny';
    item.cp.desc='A single penny, outdated form of currency. For some reason it\'s still in circulation';
    item.cp.stype=4;
    item.cp.use=function(x){
      giveWealth(1,false,true);
      this.amount--; dumb(x);
    }

    item.lcn= new Item(); item.lcn.id = 5005;
    item.lcn.name='Large Copper Coin';
    item.lcn.desc='Local currency in a form of a heavy coin. Poor people can eat for a whole day with a few of those';
    item.lcn.stype=4;
    item.lcn.use=function(x){
      giveWealth(20,false,true);
      this.amount--; dumb(x);
    }

    item.cn= new Item(); item.cn.id = 5006;
    item.cn.name='Nickel';
    item.cn.desc='Small nickel, outdated form of currency. It was worth much more in the past';
    item.cn.stype=4;
    item.cn.use=function(x){
      giveWealth(5,false,true);
      this.amount--; dumb(x);
    }

    item.cd= new Item(); item.cd.id = 5007;
    item.cd.name='Dime';
    item.cd.desc='Round copper dime. Still shiny';
    item.cd.stype=4;
    item.cd.use=function(x){
      giveWealth(10,false,true);
      this.amount--; dumb(x);
    }

    item.cq= new Item(); item.cq.id = 5008;
    item.cq.name='Quarter';
    item.cq.desc='Very large coin, made of copper. Not much worth as money, but collected and used by poor blacksmiths for resmelting into tools';
    item.cq.stype=4;
    item.cq.use=function(x){
      giveWealth(25,false,true);
      this.amount--; dumb(x);
    }

    item.watr = new Item(); item.watr.id = 5009;
    item.watr.name='Water';
    item.watr.desc='Regular drinkable water';
    item.watr.stype = 5;
    item.watr.use = function(){
      msg('You took a sip','aqua');
    }

    item.psb = new Item(); item.psb.id = 5010;
    item.psb.name='Pleasant Sleep Blanket';
    item.psb.desc='Soft warm blanket. It makes you sleep better';
    item.psb.stype = 5;
    item.psb.use = function(){
    }

    item.wdc = new Item(); item.wdc.id = 5011;
    item.wdc.name='Wood Splint';
    item.wdc.desc='A small chipped piece of wood. Not very useful by itself';
    item.wdc.stype=5;
    item.wdc.onGet=function(){
      if(this.amount>=10) giveRcp(rcp.wbdl);
      if(this.amount>=50) {giveRcp(rcp.wdl1);this.onGet=function(){}}
    }
    item.wdc.use=function(){
      msg('Ouch');
    }

    item.bgl = new Item(); item.bgl.id = 5012;
    item.bgl.name='Bag of lost items';
    item.bgl.desc='Lost possession of waifarers and travellers';
    item.bgl.stype=4;
    item.bgl.use=function(){
      this.amount--; 
    }

    item.salt = new Item(); item.salt.id = 5013;
    item.salt.name='Salt'; 
    item.salt.desc='Rock salt crushed into tiny crystals. Yuck! You surely wouldn\'t want to eat this. It\'s good for preserving perishable foods and cooking, though';
    item.salt.stype = 5; 
    item.salt.use = function(){
      msg('It stings your tongue','silver');
    }

    item.slm = new Item(); item.slm.id = 5014;
    item.slm.name='Slime'; 
    item.slm.desc='Clear blob of slime. Used in elementary alchemy to make adhesives. Also acts as a base for some potions';
    item.slm.stype = 5; 
    item.slm.use = function(){
      msg('Sticky..','silver');
    }

    item.tlvs = new Item(); item.tlvs.id = 5015;
    item.tlvs.name='Tea leaves'; 
    item.tlvs.desc='A pinch of fragnant tea leaves, ready for brewing';
    item.tlvs.stype = 5; 
    item.tlvs.use = function(){
      msg('They feel just dry enough','blue');
    }

    item.key1 = new Item(); item.key1.id = 5016;
    item.key1.name='Bronze Key'; 
    item.key1.desc='';
    item.key1.stype = 5; 
    item.key1.use = function(){
    }

    item.key2 = new Item(); item.key2.id = 5017;
    item.key2.name='Iron Key'; 
    item.key2.desc='';
    item.key2.stype = 5; 
    item.key2.use = function(){
    }

    item.key3 = new Item(); item.key3.id = 5018;
    item.key3.name='Silver Key'; 
    item.key3.desc='';
    item.key3.stype = 5; 
    item.key3.use = function(){
    }

    item.key4 = new Item(); item.key4.id = 5019;
    item.key4.name='Gold Key'; 
    item.key4.desc='';
    item.key4.stype = 5; 
    item.key4.use = function(){
    }

    item.key5 = new Item(); item.key5.id = 5020;
    item.key5.name='Platinum Key'; 
    item.key5.desc='';
    item.key5.stype = 5; 
    item.key5.use = function(){
    }

    item.key6 = new Item(); item.key6.id = 5021;
    item.key6.name='Steel Key'; 
    item.key6.desc='';
    item.key6.stype = 5; 
    item.key6.use = function(){
    }

    item.key7 = new Item(); item.key7.id = 5022;
    item.key7.name='Crimson Key'; 
    item.key7.desc='';
    item.key7.stype = 5; 
    item.key7.use = function(){
    }

    item.key0 = new Item(); item.key0.id = 5023;
    item.key0.name='Rusty Key'; 
    item.key0.desc=function(){return ('Scummy old key. '+(global.flags.hbs1?'You can open your basement with it':'What could it be for?'))}
    item.key0.stype = 5; 
    item.key0.use = function(){
      msg(global.flags.hbs1?'Thankfully it didn\'t break apart when you used it':'It looks familiar...','lightgrey');
    }

    item.ywlt = new Item(); item.ywlt.id = 5024;
    item.ywlt.name='Woven Wallet';
    item.ywlt.desc='This is your personal wallet, you received it as a gift'+dom.dseparator+'<span style=\'color:orange\'>You can feel coinage inside</span>';
    item.ywlt.stype=4;
    item.ywlt.rar=2;
    item.ywlt.use=function(x){
      giveItem(item.cd,2);giveItem(item.cq,1);giveItem(item.cn,1);giveItem(item.cp,rand(2,10));
      this.amount--;
      global.flags.m_un=true;
      check_if_money_should_appear()
    }

    item.hnhn = new Item(); item.hnhn.id = 5025;
    item.hnhn.name='Teruterubōzu';
    item.hnhn.desc='Holy talisman. Leave it out on the rain to gain blessing of good fortune';
    item.hnhn.stype=5;
    item.hnhn.rar=2;
    item.hnhn.use=function(x){
    }

    item.pcn = new Item(); item.pcn.id = 5026;
    item.pcn.name='Pinecone';
    item.pcn.desc='A spiny pod from a pine tree.  Dry seeds rattle around inside when you shake it';
    item.pcn.stype=4;
    item.pcn.use=function(x){ msg(select(["*Crack..* ","*Crunch..* ","*Pop..* "]),'lightgrey'); 
      if(random()<=(.3+skl.dice.lvl*.03)) {msg_add("You have discovered some pine nuts inside!",'lime');giveItem(item.pcns,rand(1,3));giveSkExp(skl.dice,2);} else {msg_add("The cone was empty..",'grey');giveSkExp(skl.dice,.5);}
      this.amount-- ;
    }

    item.pbl = new Item(); item.pbl.id = 5027;
    item.pbl.name='Pebble';
    item.pbl.desc='A tiny useless stone, found everywhere. Can be thrown to create distraction'+dom.dseparator+'<span style="color:yellow">+5 Throwing Damage</span>';
    item.pbl.stype=2; item.pbl.c='yellow';
    item.pbl.use=function(){ if(this.disabled!==true){ this.disabled=true;
      if(global.flags.civil===true||global.flags.btl===false) {msg("You threw "+this.name+" into the distance","grey");giveSkExp(skl.thr,1)} else tattack(5,1,1);
      this.amount--; setTimeout(()=>{this.disabled=false},(500/(skl.thr.lvl||1)))}
    }

    item.ptng1 = new Item(); item.ptng1.id = 5028;
    item.ptng1.name='Tattered Painting';
    item.ptng1.desc='Scratched up and faded painting of a lady. It\'s nearly impossible to recognize any details';
    item.ptng1.stype=5;
    item.ptng1.use=function(){
    }

    item.fwd1 = new Item(); item.fwd1.id = 5029;
    item.fwd1.name='Firewood';
    item.fwd1.desc='Type of dry wood, prepared for easy burning. Useful at camps or during winter';
    item.fwd1.stype=5;
    item.fwd1.use=function(){
      msg('*Donk* ..It sounds hollow','ghostwhite')
    }
    item.fwd1.onGet=function(){
      if(this.amount>=60) {giveRcp(rcp.fwdpile);this.onGet=function(){}}
    }

    item.coal1 = new Item(); item.coal1.id = 5030;
    item.coal1.name='Coal';
    item.coal1.desc='Black rocks of fossilized organic mass. This coal burns for a very long time';
    item.coal1.stype=5;
    item.coal1.use=function(){
      msg('You can picture it smoldering inside your fireplace','grey');
    }

    item.coal2 = new Item(); item.coal2.id = 5031;
    item.coal2.name='Charcoal';
    item.coal2.desc='Coal made from carefuly burning quality wood for lengths of time. This coal cinders for a very long time';
    item.coal2.stype=5;
    item.coal2.use=function(){
      msg('Your hands get all dirty','black',null,null,'lightgrey');
    }

    item.cndl2 = new Item(); item.cndl2.id = 5032;
    item.cndl2.name='placehold';
    item.cndl2.desc='hldplace';

    item.skl = new Item(); item.skl.id = 5033;
    item.skl.name='Skull';
    item.skl.desc='Mostly undamaged human skull, taken from some unlucky corpse. It is used in various ways by all sorts of dark sorcerers, witches and alchemists';
    item.skl.stype=5;
    item.skl.use=function(){ 
      msg('It looks menacing','purple',null,null,'lightgrey');
    }

    global.text.kntsct=['Adjustable bend','Adjustable grip hitch','Albright special','Alpine Butterfly','Anchor bend','Angle\'s loop ','Arbor knot','Artillery loop','Ashley\'s bend','Axle hitch','Bachmann knot','Bag knot','Bait loop','Barrel knot','Basket weave knot','Becket hitch ','Beer knot','Bimini twist','Blackwall hitch','Blake\'s hitch','Blood knot','Boa knot','Boling knot','Boom hitch','Bourchier knot','Heraldic knot','Bumper knot','Bunny ears','Butterfly loop','Carrick bend','Cat\'s paw','Catshank','Celtic button knot','Chain sinnet','Chair knot','Clove hitch','Constrictor knot','Cow hitch','Crown knot','Double loop','Dogshank','Diamond knot','Dropper loop','Death knot','Eye splice','Falconer\'s knot','Farmer\'s loop','Fiador knot','Figure-eight knot','Fisherman\'s bend','Friendship knot','Hackamore','Garda hitch','Grief knot','Gordian knot','Grantchester knot','Ground-line hitch','Gripping sailor\'s hitch','Halter hitch','Handcuff knot','Hangman\'s noose','Highpoint hitch','Highwayman\'s hitch','Hitching tie','Hunter\'s bend','Icicle hitch','Jamming knot','Killick hitch','Klemheist knot','Knot of isis','Lariat loop','Lighterman\'s hitch','Lineman\s loop','Lissajous knot','Lobster buoy hitch','Magnus hitch','Marlinespike hitch','Midshipman\'s hitch','Miller\'s knot','Monkey\'s fist','Mountaineer\'s coil','Munter hitch','Nail knot','Ossel hitch','Overhand bend','Palomar knot','Pile hitch','Pipe hitch','Pretzel link knot','Power cinch','Racking bend','Reef knot','Reever Knot','Rolling hitch','Round turn','Running bowline','Sailor\'s hitch','Sheepshank','Shoelace knot','Simple knot','Slip knot','Snell knot','Snuggle hitch','Span loop','Square knot','Strangle knot','Surgeon\'s loop','Tape knot','Thief knot','Transom knot','Thumb knot','Threefoil knot','Trident loop','Trilene knot','Triple crown knot','True lover\'s knot','Turle knot','Versatackle knot','Underhand knot','Underwriter\'s knot','Uni knot','Wall and crown knot','Water knot','Windsor knot','Yosemite bowlin','Zeppelin bend']

    item.rope = new Item(); item.rope.id = 5034;
    item.rope.name='Rope';
    item.rope.desc='A length of sturdy rope, for tying things up';
    item.rope.stype=5;
    item.rope.use=function(){ 
      msg('You practiced knot tying for a short while and made <span style="color:orange">"'+select(global.text.kntsct)+'"</span>!','springgreen');
    }

    item.mcps = new Item(); item.mcps.id = 5035;
    item.mcps.name='Clay Milk Cap';
    item.mcps.desc='Milk caps made from packed clay. Children like to play with these'+dom.dseparator+'<span style="color:yellow">+9 Throwing Damage</span>';
    item.mcps.stype=2; item.mcps.c='yellow';
    item.mcps.use=function(){ if(this.disabled!==true){ this.disabled=true;
      if(global.flags.civil===true||global.flags.btl===false) {msg("You threw "+this.name+" into the distance","grey");giveSkExp(skl.thr,1)} else tattack(9,1,1);
      this.amount--; setTimeout(()=>{this.disabled=false},(500/(skl.thr.lvl||1)))}
    }

    item.stdst = new Item(); item.stdst.id = 5036;
    item.stdst.name='Stardust';
    item.stdst.desc='Tiny bits of solar pieces that came from the Sky. They shine in darkness and hold the energy of stars';
    item.stdst.stype=5;
    item.stdst.use=function(x){ 
      msg('It is glittering','gold',null,null,'darkblue');
    }

    item.gcre1 = new Item(); item.gcre1.id = 5037;
    item.gcre1.name='Lesser Golem Core';
    item.gcre1.desc='Exhausted power core of a golem. It has nearly no use anymore, the entire energy supply of this thing has been used up';
    item.gcre1.stype=5;
    item.gcre1.use=function(x){ 
      msg('You notice specks of dull light flickering inside');
    }

    item.wvbkt = new Item(); item.wvbkt.id = 5038;
    item.wvbkt.name='Straw Basket';
    item.wvbkt.desc=furniture.wvbkt.desc
    item.wvbkt.stype=4; item.wvbkt.isf=true; item.wvbkt.parent = furniture.wvbkt;
    item.wvbkt.use=function(x){ 
      giveFurniture(furniture.wvbkt);
      this.amount-- ;
    }

    item.tbwr1 = new Item(); item.tbwr1.id = 5039;
    item.tbwr1.name='Wooden Tableware';
    item.tbwr1.desc=furniture.tbwr1.desc
    item.tbwr1.stype=4; item.tbwr1.isf=true; item.tbwr1.parent = furniture.tbwr1
    item.tbwr1.use=function(x){ 
      let f = giveFurniture(furniture.tbwr1); if(inSector(sector.home)) activatef(f);
      this.amount-- ;
    }

    item.ess1 = new Item(); item.ess1.id = 5040;
    item.ess1.name='Essence of Air';
    item.ess1.desc='Spirit shard of concentrated Wind power';
    item.ess1.stype=5;
    item.ess1.rar=2;

    item.ess2 = new Item(); item.ess2.id = 5041;
    item.ess2.name='Essence of Earth';
    item.ess2.desc='Spirit shard of concentrated Geo power';
    item.ess2.stype=5;
    item.ess2.rar=2;

    item.ess3 = new Item(); item.ess3.id = 5042;
    item.ess3.name='Essence of Flames';
    item.ess3.desc='Spirit shard of concentrated Fire power';
    item.ess3.stype=5;
    item.ess3.rar=2;

    item.ess4 = new Item(); item.ess4.id = 5043;
    item.ess4.name='Essence of Water';
    item.ess4.desc='Spirit shard of concentrated Aqua power';
    item.ess4.stype=5;
    item.ess4.rar=2;

    item.ess5 = new Item(); item.ess5.id = 5044;
    item.ess5.name='Essence of Light';
    item.ess5.desc='Spirit shard of concentrated Holy power';
    item.ess5.stype=5;
    item.ess5.rar=2;

    item.ess6 = new Item(); item.ess6.id = 5045;
    item.ess6.name='Essence of Night';
    item.ess6.desc='Spirit shard of concentrated Demonic power';
    item.ess6.stype=5;
    item.ess6.rar=2;

    item.toolbx = new Item(); item.toolbx.id = 5046;
    item.toolbx.name='Toolbox';
    item.toolbx.desc='Metal box with a variety of fine tools inside, multipurpose knives, mallets, pincers, chisels and a few more. Used for precision work and tinkering with simple and complex objects'+dom.dseparator+'<span style="color:chartreuse">Allows deconstruction of items and equipment when kept in inventory</span>';
    item.toolbx.stype=5;
    item.toolbx.use=function(){
      if(random()<.1) msg('You almost dropped the box..','orange'); else msg('Dozens of tools tumble inside as you shake it','yellow');
    }

    item.cpdst = new Item(); item.cpdst.id = 5047;
    item.cpdst.name='Corpse Dust';
    item.cpdst.desc='Dust derived from the remains of the deciesed, often used for witchcraft and enchantments';
    item.cpdst.stype=5;
    item.cpdst.use=function(){
      msg('Disgusting','lightgrey');
    }

    item.cclth = new Item(); item.cclth.id = 5048;
    item.cclth.name='Cheap Cloth';
    item.cclth.desc='A poor quality swatch of cloth. Unstitches when you so much as breathe on it';
    item.cclth.stype=5;
    item.cclth.use=function(){
      msg('Can you even work with something this worthless?','lightgrey');
    }
    item.cclth.dss=[{item:item.thrdnl,amount:1,q:1,max:2}]

    item.thrdnl = new Item(); item.thrdnl.id = 5049;
    item.thrdnl.name='Thread';
    item.thrdnl.desc='A small quantity of thread that could be used in sewing and tailoring projects';
    item.thrdnl.stype=5;
    item.thrdnl.use=function(){
      msg('It doesn\'t seem very sturdy','lightgrey');
    }
    item.thrdnl.onGet=function(){
      if(this.amount>=100) {giveRcp(rcp.cyrn);this.onGet=function(){}}
    }

    item.sktbad = new Item(); item.sktbad.id = 5050;
    item.sktbad.name='Mistake';
    item.sktbad.desc='A failed product of an unskilled artisan. Once destined to become something worty of display, this mangled mess is repulsive to look at';
    item.sktbad.stype=5;
    item.sktbad.use=function(){
      msg('Better put this away','lightgrey');
    }

    item.bblkt = new Item(); item.bblkt.id = 5051;
    item.bblkt.name='Ragwork Blanket';
    item.bblkt.desc=furniture.bblkt.desc
    item.bblkt.stype=4; item.bblkt.isf=true; item.bblkt.parent = furniture.bblkt
    item.bblkt.use=function(x){ 
      let f = giveFurniture(furniture.bblkt); if(inSector(sector.home)) activatef(f);
      this.amount-- ;
    }

    item.spillw = new Item(); item.spillw.id = 5052;
    item.spillw.name='Straw Pillow';
    item.spillw.desc=furniture.spillw.desc
    item.spillw.stype=4; item.spillw.isf=true; item.spillw.parent = furniture.spillw
    item.spillw.use=function(x){ 
      let f = giveFurniture(furniture.spillw); if(inSector(sector.home)) activatef(f);
      this.amount-- ;
    }

    item.cyrn = new Item(); item.cyrn.id = 5053;
    item.cyrn.name='Yarn Ball';
    item.cyrn.desc=furniture.cyrn.desc
    item.cyrn.stype=4; item.cyrn.isf=true; item.cyrn.parent = furniture.cyrn
    item.cyrn.use=function(x){ 
      let f = giveFurniture(furniture.cyrn); if(inSector(sector.home)) activatef(f);
      this.amount-- ;
    }

    item.dfish = new Item(); item.dfish.id = 5054;
    item.dfish.name='Dead Fish';
    item.dfish.desc='Carcass of some fish, looking bad, grey and dead. Can be dismantled into fishbait';
    item.dfish.stype=5;
    item.dfish.use=function(){
      msg('Gross!','lightgrey');
    }
    item.dfish.dss=[{item:item.fbait1,amount:1,q:.75,max:3}]

    item.fbait1 = new Item(); item.fbait1.id = 5055;
    item.fbait1.name='Bait';
    item.fbait1.desc='Organic remains rolled into a ball, favoured by fish and other aquatic population';
    item.fbait1.stype=5;
    item.fbait1.use=function(){
    }

    item.htrdvr = new Item(); item.htrdvr.id = 5056;
    item.htrdvr.name='Hunter\'s Crate';
    item.htrdvr.desc='Heavy wooden crate you were asked to deliver to dojo. It is sealed shut and you can\'t look inside. It smells faintly of meat, spices and mushrooms. Probably filled with preserved dry produce';
    item.htrdvr.stype=5;
    item.htrdvr.use=function(){
      msg('You resist the temptation to open it','lightgrey')
    }

    item.htrsvr = new Item(); item.htrsvr.id = 5057;
    item.htrsvr.name='Hunter\'s Bag';
    item.htrsvr.desc='Heavy canvas bag you were asked to deliver to the herbalist. It is filled with separated bundles of various herbs you can\'t identify. You\'d rather not touch anything inside as it looks dangerously poisonous';
    item.htrsvr.stype=5;
    item.htrsvr.use=function(){
      msg('Strong aroma eminating from this bag makes your head spin','orange')
    }

    item.hbtsvr = new Item(); item.hbtsvr.id = 5058;
    item.hbtsvr.name='Herbalist\'s Satchel'
    item.hbtsvr.desc='Heavy leather satchel you were asked to deliver to the head hunter. Hundreds of vials clang Violently no matter how carefully you attempt to carry it';
    item.hbtsvr.stype=5;
    item.hbtsvr.use=function(){
      msg('You\'ll be in trouble of you break anything inside','lightgrey')
    }

    item.fwdpile = new Item(); item.fwdpile.id = 5059;
    item.fwdpile.name='Firewood Pile';
    item.fwdpile.desc='Stockpile of firewood neatly packed together for easy storage'
    item.fwdpile.stype=4; item.fwdpile.isf=true; item.fwdpile.parent = furniture.fwdpile
    item.fwdpile.use=function(x){ 
      let f = giveFurniture(furniture.fwdpile); if(inSector(sector.home)) activatef(f);
      this.amount-- ;
    }

    item.lprmt= new Item(); item.lprmt.id = 5060;
    item.lprmt.name='Travel Permit';
    item.lprmt.desc='Written document used in your village. Acts as a proof of one\'s strength, meaning the owner has the ability to protect himself when leaving the village, you will need this when going out. Nearly every adult you know has this';
    item.lprmt.stype=5; item.lprmt.rar=2;
    item.lprmt.use=function(){
      msg('You feel pride holding this','green')
    }

    item.bed2 = new Item(); item.bed2.id = 5061;
    item.bed2.name='Plain Bed';
    item.bed2.desc=furniture.bed2.desc
    item.bed2.stype=4; item.bed2.isf=true; item.bed2.parent = furniture.bed2
    item.bed2.use=function(x){ 
      let f = giveFurniture(furniture.bed2); if(inSector(sector.home)) activatef(f);
      this.amount-- ;
    }

    item.wfng = new Item(); item.wfng.id = 5062;
    item.wfng.name='Wolf Fang';
    item.wfng.desc='Clear and sharp fang of a predator. It still looks dangerous';
    item.wfng.stype=5;
    item.wfng.use=function(){
      msg('You may prick your finger if you mishandle it','lightgrey')
    }
    item.wfng.onGet = function(){
      if(this.amount>=10) giveRcp(rcp.wfng)
    }

    item.bookgen = new Item(); item.bookgen.id = 5063;
    item.bookgen.name='Book';
    item.bookgen.desc=furniture.bookgen.desc
    item.bookgen.stype=4; item.bookgen.isf=true; item.bookgen.parent = furniture.bookgen
    item.bookgen.use=function(x){ 
      let f = giveFurniture(furniture.bookgen); if(inSector(sector.home)&&!f.active) activatef(f);
      this.amount-- ;
    }

    item.dmice1 = new Item(); item.dmice1.id = 5064;
    item.dmice1.name='Dead Mouse';
    item.dmice1.desc='Vermin hunted by your cat, now proudly displayed before you';
    item.dmice1.stype=5;
    item.dmice1.rar=0;
    item.dmice1.use=function(){
      msg('Yeah..','grey')
    }
    item.dmice1.dss=[{item:item.sbone,amount:1,q:.6,max:3}]

    item.dbdc1 = new Item(); item.dbdc1.id = 5065;
    item.dbdc1.name='Dead Bird';
    item.dbdc1.desc='A proof of loyalty brought to you by your cat';
    item.dbdc1.stype=5;
    item.dbdc1.rar=0;
    item.dbdc1.use=function(){
      msg('Indeed..','grey')
    }


    item.ip1 = new Item(); item.ip1.id = 9000;
    item.ip1.name = '"Idea paper"';
    item.ip1.desc = 'Tiny scrap of paper with information. You wrote it yourself to remember things.';
    item.ip1.stype = 4; item.ip1.data.time=HOUR;
    item.ip1.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      giveRcp(rcp.strawp);giveRcp(rcp.hlpd);giveRcp(rcp.borc);giveRcp(rcp.begg); 
      this.amount--; this.data.read=false; this.data.finished=true; 
    }else chss.trd.sl(this,.2, this.id);}
    }

    item.skl1 = new Item(); item.skl1.id = 9001;
    item.skl1.name = 'P Skillbook (Swords)';
    item.skl1.desc = 'Entry level practitioner skillbook about sword combat'+dom.dseparator+'<span style="color:deeppink">Sword Mastery EXP gain +5%</span>';
    item.skl1.stype = 4; item.skl1.data.time=HOUR*4;
    item.skl1.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      this.amount--;  giveSkExp(skl.srdc,150); skl.srdc.p+=.05; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)
    }else chss.trd.sl(this,.5, this.id);}
    }

    item.skl2 = new Item(); item.skl2.id = 9002;
    item.skl2.name = 'P Skillbook (Knives)';
    item.skl2.desc = 'Entry level practitioner skillbook about knife combat'+dom.dseparator+'<span style="color:deeppink">Knife Mastery EXP gain +5%</span>';
    item.skl2.stype = 4; item.skl2.data.time=HOUR*4;
    item.skl2.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      this.amount--;  giveSkExp(skl.knfc,150); skl.knfc.p+=.05; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)
    }else chss.trd.sl(this,.5, this.id);}
    }

    item.skl3 = new Item(); item.skl3.id = 9003;
    item.skl3.name = 'P Skillbook (Axes)';
    item.skl3.desc = 'Entry level practitioner skillbook about axe combat'+dom.dseparator+'<span style="color:deeppink">Axe Mastery EXP gain +5%</span>';
    item.skl3.stype = 4; item.skl3.data.time=HOUR*4;
    item.skl3.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      this.amount--;  giveSkExp(skl.axc,150); skl.axc.p+=.05; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)
    }else chss.trd.sl(this,.5, this.id);}
    }

    item.skl4 = new Item(); item.skl4.id = 9004;
    item.skl4.name = 'P Skillbook (Spears)';
    item.skl4.desc = 'Entry level practitioner skillbook about spear combat'+dom.dseparator+'<span style="color:deeppink">Polearm Mastery EXP gain +5%</span>';
    item.skl4.stype = 4; item.skl4.data.time=HOUR*4;
    item.skl4.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      this.amount--;  giveSkExp(skl.plrmc,150); skl.plrmc.p+=.05; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)
    }else chss.trd.sl(this,.5, this.id);}
    }

    item.skl5 = new Item(); item.skl5.id = 9005;
    item.skl5.name = 'P Skillbook (Hammers)';
    item.skl5.desc = 'Entry level practitioner skillbook about hammer combat'+dom.dseparator+'<span style="color:deeppink">Hammer Mastery EXP gain +5%</span>';
    item.skl5.stype = 4; item.skl5.data.time=HOUR*4;
    item.skl5.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      this.amount--;  giveSkExp(skl.hmrc,150); skl.hmrc.p+=.05; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)
    }else chss.trd.sl(this,.5, this.id);}
    }

    item.skl6 = new Item(); item.skl6.id = 9006;
    item.skl6.name = 'P Skillbook (Martial)';
    item.skl6.desc = 'Entry level practitioner skillbook about unarmed combat'+dom.dseparator+'<span style="color:deeppink">Martial Mastery EXP gain +5%</span>';
    item.skl6.stype = 4; item.skl6.data.time= HOUR*4;
    item.skl6.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      this.amount--; giveSkExp(skl.unc,150); skl.unc.p+=.05; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)

    }else chss.trd.sl(this,.5, this.id);}
    }

    item.bstr = new Item(); item.bstr.id = 9007;
    item.bstr.name = '"Animalis Vicipaedia"';
    item.bstr.rar = 2;
    item.bstr.desc = 'Heavy Hunter\'s Encyclopedia. There are a few entries about wild life, beasts, and mythical creatures you can encounter, the other pages are blank. You feel the urge to fill them in'+dom.dseparator+'<span style="color:lime">Unlocks Bestiary</span>';
    item.bstr.stype = 4; item.bstr.data.time=HOUR*17;
    item.bstr.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ msg('Bestiary Unlocked!','cyan');
      this.data.read=false; this.amount-- ; global.flags.bstu=true; this.data.finished=true; if(dom.jlbrw1s2) dom.jlbrw1s2.innerHTML='B E S T I A R Y'
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.tbrwdb = new Item(); item.tbrwdb.id = 9008;
    item.tbrwdb.name = '"The Art of Teabrewing"';
    item.tbrwdb.rar = 2;
    item.tbrwdb.desc = 'Informative little book in detail describing the ways of teamaking, starting from precise amounts and proportions, specific water temperatures, correct tableware, to the defferent styles and etiquette';
    item.tbrwdb.stype = 4; item.tbrwdb.data.time=HOUR*26;
    item.tbrwdb.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ giveRcp(rcp.tbrwd);
      this.data.finished=true; this.data.read=false; this.amount-- ; giveItem(item.bookgen)
    }else chss.trd.sl(this, 0, this.id);}
    }

    global.text.mscbkatxt=["This fairy tale is about a wolf who eats so much salted meat she becomes trapped in the butcher's cellar.",
                            "In this traditional story of beastly intrigue a clever fox convinces an elderly lion to kill a derogatory wolf.",
                            "This is an illustrated fairy tale book about a conversation between a mouse and a cat.",
                            "An amusing collection of stories featuring a Thunder God on the cover.",
                            "This is a well illustrated fairy tale about a war between the birds and the beasts, with particulars on the wartime conduct and eventual fate of the bat.",
                            "This book, titled \"The Rattlesnake's Vengeance\" is a collection of local myths and legends.",
                            "This fairy tale book is a regional variant of a tale of friendship between the Demon and the Angel",
                            "This fairy tale book is entitled \"Little Red Cap\".  It details a red-cloaked child's various encounters with talking wolves.",                        "A collection of ghost stories warning about the dangers of stealing from the dead.",
                            "A book of culinary fairy tales.  The cover features an orange fairy juggling a lemon, a lime, and a tangerine slimes.",
                            "A book of fables about people who change into birds.",
                            "This compendium of amusing folk tales about the devil is titled \"Hell's Kettle: Legends of the Devil.\"",
                            "This charming book of fables is titled, \"The Crystal Mountain and the Princess.\"",
                            "This is a collection of fairy tale stories warning against the consequences of extreme greed.",
                            "In this fairy tale a strong man frightens an ogre by squeezing water out of a stone.",
                            "This book of rustic folk tales bears the title: \"How to Shout Down the Devil.\"",
                            "The title of this book is \"Village Folk-tales of Darion.\"  It includes fables about logical errors and foolish misjudgements of the village men.",
                            "This book of folk tales is titled, \"The Girl with the Ugly Name, and Other Stories.\"",
                            "Titled \"The Fleeing Pancake\", this collection of silly folk tales is suitable for small children."];

    item.msc1 = new Item(); item.msc1.id = 9009;
    item.msc1.name = '"Book of Fairy Tales"';
    item.msc1.data.bid=_rand(global.text.mscbkatxt.length-1); item.msc1.data.exp = _rand(500,10000); item.msc1.save=true;
    item.msc1.desc = function(){return 'An amusing collection of folklore featuring the usual cast of fairies and demons'+dom.dseparator+'<span style="color:limegreen">'+global.text.mscbkatxt[this.data.bid]+'</span>'}
    item.msc1.stype = 4; item.msc1.data.time=HOUR*6;
    item.msc1.use = function(){if(canRead()){if(this.data.timep>=this.cmax){giveExp(this.data.exp||500,true,true,true);this.data.bid=rand(global.text.mscbkatxt.length-1);this.data.exp = rand(500,5000);this.desc='An amusing collection of folklore featuring the usual cast of fairies and demons'+dom.dseparator+'<span style="color:limegreen">'+global.text.mscbkatxt[item.msc1.data.bid]+'</span>';this.data.time=this.data.timep=rand(2,10)*HOUR;
      this.data.bid=rand(global.text.mscbkatxt.length-1); this.data.finished=true; this.data.read=false; this.amount-- ; giveItem(item.bookgen) 
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.bcpn = new Item(); item.bcpn.id = 9010;
    item.bcpn.name = '"Cooking with Poison"';
    item.bcpn.rar = 2;
    item.bcpn.desc = 'A leatherbound book with an embossed cauldron on the cover. Inside it describes ways to purify food through alchemy';
    item.bcpn.stype = 4; item.bcpn.data.time=HOUR*30;
    item.bcpn.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ 
      this.data.finished=true; this.data.read=false; this.amount-- ; giveItem(item.bookgen)
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.mdc1 = new Item(); item.mdc1.id = 9011;
    item.mdc1.name = '"First Aid Manual"';
    item.mdc1.desc = 'Tiny red pocket-sized guide to emergency care, covers basic bandaging and wound treating';
    item.mdc1.stype = 4; item.mdc1.data.time=HOUR*12;
    item.mdc1.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ 
      let dt=0; dt+=giveRcp(rcp.bdgh); dt+=giveRcp(rcp.mdcag);  dt+=giveRcp(rcp.hptn1); this.data.finished=true; giveItem(item.bookgen)
      if(dt===0) msg('You haven\'t learned anything new...','lightgrey')
      this.data.read=false; this.amount-- ; 
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.dmkbk = new Item(); item.dmkbk.id = 9012;
    item.dmkbk.name = '"Dollmaker\'s Handbook"';
    item.dmkbk.desc = 'A very short manual filled with illustrations about primitive dollmaking. The instructions are easy to understand so children could make the dolls too. Looks like there was a chapter dedicated to sewing, now it\'s almost entirely missing';
    item.dmkbk.stype = 4; item.dmkbk.data.time=HOUR*12;
    item.dmkbk.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ giveItem(item.bookgen)
      let dt=0; dt+=giveRcp(rcp.sdl1); dt+=giveRcp(rcp.wdl1); dt+=giveRcp(rcp.gdl1); dt+=giveRcp(rcp.bdl1);dt+=giveRcp(rcp.cyrn); this.data.finished=true;
      if(dt===0) msg('You haven\'t learned anything new...','lightgrey')
      this.data.read=false; this.amount-- ; 
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.scrlw = new Item(); item.scrlw.id = 9013;
    item.scrlw.name = '"Ragged Parchment"';
    item.scrlw.desc = 'Scummy sheet of paper tainted with something teal. Some kinds of materials are listed here';
    item.scrlw.stype = 4; item.scrlw.data.time=HOUR*3;
    item.scrlw.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ 
      let dt=0; dt+=giveRcp(rcp.hptn1); this.data.finished=true;
      if(dt===0) msg('You already know how to make lesser potions','lightgrey')
      this.data.read=false; this.amount-- ; 
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.wp2s = new Item(); item.wp2s.id = 9014;
    item.wp2s.name = '"Rotten Illustration"';
    item.wp2s.desc = 'Found this within old bushery, it looks like a drawing of something in charcoal';
    item.wp2s.onGet=function(){global.flags.wp2sgt=true}
    item.wp2s.stype = 4; item.wp2s.data.time=HOUR*2;
    item.wp2s.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ 
      let dt=0; dt+=giveRcp(rcp.wp2); this.data.finished=true;
      if(dt===0) msg('You already know how to sharpen sticks','lightgrey')
      this.data.read=false; this.amount-- ; 
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.shppmf = new Item(); item.shppmf.id = 9015;
    item.shppmf.name = '"Pamphlet"';
    item.shppmf.desc = 'This was shoved onto you by someone on the streets. Store names, discount prices, hot items... An entire wall of advertisements in tiny letters, to fit as much of it as possible on this piece of paper. It is a good idea to memorize the addresses';
    item.shppmf.onGet=function(){global.flags.pmfspmkm1=true}
    item.shppmf.stype = 4; item.shppmf.data.time=HOUR*3;
    item.shppmf.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ 
      global.flags.mkplc1u=true; this.data.finished=true; msg('Right, you could go to the marketplace','lime'); if(global.current_location.id===chss.village_center.id) move_to_area(chss.village_center,false);
      this.data.read=false; this.amount-- ; 
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.amrthsck = new Item(); item.amrthsck.id = 9016;
    item.amrthsck.name = '"Guide To Living By Yourself"';
    item.amrthsck.desc = 'Looks like a page from someone\'s notebook, marked "H", poorly written in bad handwriting. It lists several simple things you can cook and make from widely available cheap materials';
    item.amrthsck.stype = 4; item.amrthsck.data.time=HOUR*12;
    item.amrthsck.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ giveItem(item.bookgen)
      let dt=0; dt+=giveRcp(rcp.bcrrt); dt+=giveRcp(rcp.bcrc); dt+=giveRcp(rcp.hlstw); dt+=giveRcp(rcp.rsmt); dt+=giveRcp(rcp.segg); dt+=giveRcp(rcp.jsdch); dt+=giveRcp(rcp.appljc); 
      dt+=giveRcp(rcp.bblkt);dt+=giveRcp(rcp.spillw); 
    this.data.finished=true;
      if(dt===0) msg('You haven\'t learned anything new...','lightgrey')
      this.data.read=false; this.amount-- ; 
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.skl1a = new Item(); item.skl1a.id = 9017;
    item.skl1a.name = '"Bladesman Manual"'; item.skl1a.rar=2;
    item.skl1a.desc = 'Technique book full of fundamental knowledge about swordfighting'+dom.dseparator+'<span style="color:deeppink">Sword Mastery EXP gain +15%</span>';
    item.skl1a.stype = 4; item.skl1a.data.time=HOUR*14;
    item.skl1a.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      this.amount--;  giveSkExp(skl.srdc,3250); skl.srdc.p+=.15; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)

    }else chss.trd.sl(this, 0, this.id);}
    }

    item.skl2a = new Item(); item.skl2a.id = 9018;
    item.skl2a.name = '"Assassin Manual"'; item.skl2a.rar=2;
    item.skl2a.desc = 'Technique book full of fundamental knowledge about kinfefighting'+dom.dseparator+'<span style="color:deeppink">Knife Mastery EXP gain +15%</span>';
    item.skl2a.stype = 4; item.skl2a.data.time=HOUR*14;
    item.skl2a.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      this.amount--;  giveSkExp(skl.knfc,3250); skl.knfc.p+=.15; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)

    }else chss.trd.sl(this, 0, this.id);}
    }

    item.skl3a = new Item(); item.skl3a.id = 9019;
    item.skl3a.name = '"Axeman Manual"'; item.skl3a.rar=2;
    item.skl3a.desc = 'Technique book full of fundamental knowledge about axefighting'+dom.dseparator+'<span style="color:deeppink">Axe Mastery EXP gain +15%</span>';
    item.skl3a.stype = 4; item.skl3a.data.time=HOUR*14;
    item.skl3a.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      this.amount--;  giveSkExp(skl.axc,150); skl.axc.p+=.05; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)

    }else chss.trd.sl(this, 0, this.id);}
    }

    item.skl4a = new Item(); item.skl4a.id = 9020;
    item.skl4a.name = '"Lancer Manual"'; item.skl4a.rar=2;
    item.skl4a.desc = 'Technique book full of fundamental knowledge about spearfighting'+dom.dseparator+'<span style="color:deeppink">Polearm Mastery EXP gain +15%</span>';
    item.skl4a.stype = 4; item.skl4a.data.time=HOUR*14;
    item.skl4a.use = function(){if(canRead()) {if(this.data.timep>=this.cmax){
      this.amount--;  giveSkExp(skl.plrmc,3250); skl.plrmc.p+=.15; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)

    }else chss.trd.sl(this, 0, this.id);}
    }

    item.skl5a = new Item(); item.skl5a.id = 9021;
    item.skl5a.name = '"Clubber Manual"'; item.skl5a.rar=2;
    item.skl5a.desc = 'Technique book full of fundamental knowledge about bluntfighting'+dom.dseparator+'<span style="color:deeppink">Hammer Mastery EXP gain +15%</span>';
    item.skl5a.stype = 4; item.skl5a.data.time=HOUR*14;
    item.skl5a.use = function(){if(canRead()) {if(this.data.timep>=this.cmax){
      this.amount--;  giveSkExp(skl.hmrc,3250); skl.hmrc.p+=.15; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)

    }else chss.trd.sl(this, 0, this.id);}
    }

    item.skl6a = new Item(); item.skl6a.id = 9022;
    item.skl6a.name = '"Brawler Manual"'; item.skl6a.rar=2;
    item.skl6a.desc = 'Technique book full of fundamental knowledge about fistfighting'+dom.dseparator+'<span style="color:deeppink">Martial Mastery EXP gain +15%</span>';
    item.skl6a.stype = 4; item.skl6a.data.time=HOUR*14;
    item.skl6a.use = function(){if(canRead()){if(this.data.timep>=this.cmax){
      this.amount--; giveSkExp(skl.unc,3250); skl.unc.p+=.15; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)

    }else chss.trd.sl(this, 0, this.id);}
    }

    item.brdbn = new Item(); item.brdbn.id = 9023;
    item.brdbn.name = '"Your First Bread"';
    item.brdbn.desc = 'Very primitive instruction booklet about making simple breads. The way it\'s written, it looks very similar to manuals given to slaves and servants at the beginning of their service, if they are able to read';
    item.brdbn.stype = 4; item.brdbn.data.time=HOUR*7;
    item.brdbn.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ 
      let dt=0; dt+=giveRcp(rcp.flr); dt+=giveRcp(rcp.dgh); dt+=giveRcp(rcp.brd); this.data.finished=true; giveItem(item.bookgen)
      if(dt===0) msg('You haven\'t learned anything new...','lightgrey')
      this.data.read=false; this.amount-- ; 
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.bfsnwt = new Item(); item.bfsnwt.id = 9024;
    item.bfsnwt.name = '"Beggar Fashion"';
    item.bfsnwt.desc = 'Some nonsence illustration with a name, featuring a group of peasants in rags posing awkwardly. What even is this?';
    item.bfsnwt.stype = 4; item.bfsnwt.data.time=HOUR*4;
    item.bfsnwt.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ 
      let dt=0; dt+=giveRcp(rcp.ptchpts); dt+=giveRcp(rcp.ptchct); 
      if(dt===0) msg('You haven\'t learned anything new...','lightgrey')
      this.data.read=false; this.amount-- ; 
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.pdeedhs = new Item(); item.pdeedhs.id = 9025;
    item.pdeedhs.name = '"Property Deed"'; item.pdeedhs.rar=2
    item.pdeedhs.desc = 'This old looking legal document indentifies you as a sole owner of this broken down hut you live in. It was passed down to you by your ancestors, you speculate'+dom.dseparator+'<span style="color:lime">Allows you to list and examine your possessions</span>';
    item.pdeedhs.stype = 4; item.pdeedhs.data.time=30;
    item.pdeedhs.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ 
      global.flags.hsedchk = true; if(global.current_location.id===111) move_to_area(chss.home,false)
      this.data.read=false; this.amount-- ; 
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.fgtsb1 = new Item(); item.fgtsb1.id = 9026;
    item.fgtsb1.name = '"Street Fighting"';
    item.fgtsb1.desc = 'Someone\'s observational notes of street gangs and their violent encounters. There\'s an amusing essay about dirty tricks in the front section'+dom.dseparator+'<span style="color:deeppink">Fighting EXP gain +15%</span>';
    item.fgtsb1.stype = 4; item.fgtsb1.data.time=HOUR*6;
    item.fgtsb1.use = function(){if(canRead()) {if(this.data.timep>=this.cmax){
      this.amount--; skl.fgt.p+=.15; this.data.read=false; this.data.finished=true; giveItem(item.bookgen)

    }else chss.trd.sl(this, 0, this.id);}
    }

    item.jnlbk = new Item(); item.jnlbk.id = 9027;
    item.jnlbk.name = '"Empty Journal"';
    item.jnlbk.desc = 'Dusty old tome, pure as snow and untainted by ink. Feels like it was purified by magic. When you gaze upon it, you are compelled to record your encounters and anything else that you find important and crucial for your adventures'+dom.dseparator+'<span style="color:lime">Unlocks Journal</span>';
    item.jnlbk.stype = 4; item.jnlbk.data.time=HOUR*4;
    item.jnlbk.use = function(){if(canRead()){if(this.data.timep>=this.cmax){ msg('Journal Unlocked!','cyan');
      this.data.read=false; this.amount-- ; global.flags.jnlu=true; this.data.finished=true; dom.ct_bt6.innerHTML='journal'
    }else chss.trd.sl(this, 0, this.id);}
    }

    item.sp4 = new Item();
    item.sp4.id = 70001;
    item.sp4.name = 'Tempered Pill of the Immortal';
    item.sp4.desc = 'A medicinal treasure forged by a great pill-maker. If you are seeking it out, it will surely reward your immortal temperance.'+
                        dom.dseparator+
                        '<span style=\'color:orange\'> Grants +185000000 EXP </span><br><span style=\'color:rebeccapurple\'>EXP Gain +8%</span>';
    item.sp4.stype = 4;
    item.sp4.rar = 4;
    item.sp4.use = function() {
        giveExp(185000000, true, true, true);
        you.exp_t += 0.08;
        this.amount--;
    }

    item.leather_wallet = new Item();
    item.leather_wallet.id = 70002;
    item.leather_wallet.name = "Leather Wallet";
    item.leather_wallet.desc = "A plain, but sturdy leather wallet gifted to by an old friend."+
                            dom.dseparator+
                            '<span style=\'color:orange\'>There\'s quite a bit of money inside.</span>';
    item.leather_wallet.stype = 4;
    item.leather_wallet.rar = 1;
    item.leather_wallet.use = function() {
        if (!global.flags.can_open_wallet) {
            msg(select([
                'I don\'t need to do that right now.',
                'I don\'t have anything to spend it on right now.',
                'I don\'t see a reason to open that right now.'
            ]), 'lightyellow');
        } else {
            global.flags.m_un = true;
            giveItem(item.lcn, 5, false, null, verbose=false);
            giveItem(item.cp,  3, false, null, verbose=false);
            giveItem(item.cn,  6, false, null, verbose=false);
            giveItem(item.cd,  6, false, null, verbose=false);
            giveItem(item.cq,  4, false, null, verbose=false);
            check_if_money_should_appear();
            this.amount--;
        }
    }

    item.handful_pills = new Item();
    item.handful_pills.id = 70003;
    item.handful_pills.name = "Handful of Spirit Pills";
    item.handful_pills.desc = "A small brown sack containing several medium-grade spirit pills. They are made out of condensed ki, meant for young martial artists to help them through their training."+
                            dom.dseparator+
                            '<span style=\'color:orange\'>This\'ll boost you back to your prime.</span>';
    item.handful_pills.stype = 4;
    item.handful_pills.rar = 1;
    item.handful_pills.use = function() {
        giveExp(11000, true, true, true, false,
        "You feel as though you've gotten your strength back.", 'lightyellow');
        this.amount--;
    }
}

function define_weapons() {
    wpn.stk1 = new Eqp(); wpn.stk1.id = 10001;
    wpn.stk1.name = 'A Stick';
    wpn.stk1.desc = 'Your favorite weapon!'+dom.dseparator;
    wpn.stk1.slot = 1;
    wpn.stk1.str = 2; wpn.stk1.cls=[0,0,1];
    wpn.stk1.ctype = 2; wpn.stk1.wtype = 5;
    wpn.stk1.dp=wpn.stk1.dpmax = 13;
    wpn.stk1.dss=[{item:item.wdc,amount:2,q:1.5,max:5}]

    wpn.stk2 = new Eqp(); wpn.stk2.id = 10002;
    wpn.stk2.name = 'Sharpened Stick';
    wpn.stk2.desc = 'Long stick with a sharpened end. Watch out, you may hurt someone with it'+dom.dseparator;
    wpn.stk2.slot = 1;
    wpn.stk2.str = 5; wpn.stk2.cls=[0,3,0];
    wpn.stk2.ctype = 1; wpn.stk2.wtype = 4;
    wpn.stk2.dp=wpn.stk2.dpmax = 16;
    wpn.stk2.onGet=function(){ let n=0
      for(let a in inv) if (inv[a].id===this.id) n++
      if(n>=4) giveRcp(rcp.stksld)
    }

    wpn.knf1 = new Eqp();  wpn.knf1.id = 10003; 
    wpn.knf1.name = 'Wooden Knife';
    wpn.knf1.desc = 'Lost kid\'s toy. The relic of many playground battles'+dom.dseparator;
    wpn.knf1.slot = 1;
    wpn.knf1.str = 4; wpn.knf1.cls=[0,0,2];
    wpn.knf1.ctype=2; wpn.knf1.wtype = 3;
    wpn.knf1.dp=wpn.knf1.dpmax = 31;
    wpn.knf1.dss=[{item:item.wdc,amount:1,q:1,max:2}]

    wpn.knf2 = new Eqp(); wpn.knf2.id = 10004; 
    wpn.knf2.name = 'Rusty Dagger';
    wpn.knf2.desc = 'Used up useless knife. More of a blunt weapon in it\'s current state'+dom.dseparator;
    wpn.knf2.slot = 1;
    wpn.knf2.str = 7;
    wpn.knf2.agl = -1; wpn.knf2.cls=[3,2,1];
    wpn.knf2.dp=wpn.knf2.dpmax = 11;
    wpn.knf2.wtype = 3;

    wpn.ktn1 = new Eqp(); wpn.ktn1.id = 10005;
    wpn.ktn1.name = 'Rusty Katana';
    wpn.ktn1.desc = 'Old worthless blade, forgotten for ages. It falls apart as you attempt to swing it'+dom.dseparator;
    wpn.ktn1.slot = 1;
    wpn.ktn1.str = 15;
    wpn.ktn1.agl = -2; wpn.ktn1.cls=[4,1,2];
    wpn.ktn1.dp=wpn.ktn1.dpmax = 21;
    wpn.ktn1.wtype = 1;
    
    wpn.ktn2 = new Eqp(); wpn.ktn2.id = 10006; 
    wpn.ktn2.name = 'Red Katana';
    wpn.ktn2.desc = 'Polished rusty katana. Still nearly useless in a fight'+dom.dseparator;
    wpn.ktn2.slot = 1;
    wpn.ktn2.str = 42;
    wpn.ktn2.agl = -4; wpn.ktn2.cls=[5,3,2];
    wpn.ktn2.dp =wpn.ktn2.dpmax = 17;
    wpn.ktn2.wtype = 1;

    wpn.trch = new Eqp(); wpn.trch.id = 10007;
    wpn.trch.name = 'Torch';
    wpn.trch.desc = 'Used to light up dark places or for burning up thing'+dom.dseparator+'<span style="color:yellow;background-color:crimson">Fire DMG +10</span><br>';
    wpn.trch.slot = 1;
    wpn.trch.str = 2; wpn.trch.atype=3;
    wpn.trch.aff=[0,0,0,10,0,5,0]; wpn.trch.cls = [0,0,3];
    wpn.trch.ctype = 2;
    wpn.trch.dp=wpn.trch.dpmax = 10;wpn.trch.degrade=.03
    wpn.trch.wtype = 5;
    wpn.trch.oneq = function(){you.mods.light+=1};
    wpn.trch.onuneq =function(){you.mods.light-=1};
    wpn.trch.onDegrade=function(){msg('Your torch burned down','darkgrey')}

    wpn.twg = new Eqp(); wpn.twg.id = 10009;
    wpn.twg.name = 'Dry Twig';
    wpn.twg.desc = 'With this you can pretend you\'re a wizard'+dom.dseparator+'<span style="color:lightgoldenrodyellow;text-shadow:gold 0px 0px 5px">Light DMG +3</span><br>';
    wpn.twg.slot = 1;
    wpn.twg.int = 3; wpn.twg.cls = [0,0,2]; 
    wpn.twg.aff=[0,1,0,0,0,3,5]; wpn.twg.atype=5; wpn.twg.atkmode=2;
    wpn.twg.dp=wpn.twg.dpmax = 12;
    wpn.twg.wtype = 6;

    wpn.dgknf = new Eqp(); wpn.dgknf.id = 10010; 
    wpn.dgknf.name = 'Dagger';
    wpn.dgknf.desc = 'Simple knife used by wayfarers. Not a combat weapon, has a minor domestic use'+dom.dseparator;
    wpn.dgknf.slot = 1;
    wpn.dgknf.str = 11; wpn.dgknf.cls=[4,2,0];
    wpn.dgknf.dp=wpn.dgknf.dpmax = 22;
    wpn.dgknf.wtype = 3;

    wpn.bknf = new Eqp(); wpn.bknf.id = 10011; 
    wpn.bknf.name = 'Battle Knife';
    wpn.bknf.desc = 'A good dagger for the novice'+dom.dseparator;
    wpn.bknf.slot = 1;
    wpn.bknf.wtype = 3;
    
    wpn.skknf = new Eqp(); wpn.skknf.id = 10012;
    wpn.skknf.name = 'Scramasax';
    wpn.skknf.desc = 'A good knife for both combat and daily use'+dom.dseparator;
    wpn.skknf.slot = 1;
    wpn.skknf.wtype = 3; wpn.skknf.ctype = 1;

    wpn.drknf = new Eqp(); wpn.drknf.id = 10013;
    wpn.drknf.name = 'Dirk';
    wpn.drknf.desc = 'A steady knife you can depend on'+dom.dseparator;
    wpn.drknf.slot = 1;
    wpn.drknf.wtype = 3;

    wpn.thknf = new Eqp(); wpn.thknf.id = 10014;
    wpn.thknf.name = 'Throwing Knife';
    wpn.thknf.desc = 'A finely honed throwing knife'+dom.dseparator;
    wpn.thknf.slot = 1;
    wpn.thknf.wtype = 3; wpn.thknf.ctype = 1;

    wpn.kdknf = new Eqp(); wpn.kdknf.id = 10015;
    wpn.kdknf.name = 'Kudi';
    wpn.kdknf.desc = 'A dangerous dagger with a curved blade'+dom.dseparator;
    wpn.kdknf.slot = 1;
    wpn.kdknf.wtype = 3;  

    wpn.krsnf = new Eqp(); wpn.krsnf.id = 10016;  
    wpn.krsnf.name = 'Kris';
    wpn.krsnf.desc = 'An exotic dagger with a wavy blade'+dom.dseparator;
    wpn.krsnf.slot = 1;
    wpn.krsnf.wtype = 3; wpn.krsnf.ctype = 1;

    wpn.cqsnf = new Eqp(); wpn.cqsnf.id = 10017;  
    wpn.cqsnf.name = 'Cinquedea';
    wpn.cqsnf.desc = 'The knife of theives'+dom.dseparator;
    wpn.cqsnf.slot = 1;
    wpn.cqsnf.wtype = 3; wpn.cqsnf.ctype = 1;

    wpn.kkknf = new Eqp(); wpn.kkknf.id = 10018;  
    wpn.kkknf.name = 'Khukuri';
    wpn.kkknf.desc = 'A knife with a heavy, curved blade'+dom.dseparator;
    wpn.kkknf.slot = 1;
    wpn.kkknf.wtype = 3; 

    wpn.bdknf = new Eqp(); wpn.bdknf.id = 10019; 
    wpn.bdknf.name = 'Baselard';
    wpn.bdknf.desc = 'A battle knife with a flat, thin blade, perfect for deploying fast attacks'+dom.dseparator;
    wpn.bdknf.slot = 1;
    wpn.bdknf.wtype = 3; 

    wpn.stknf = new Eqp(); wpn.stknf.id = 10020; 
    wpn.stknf.name = 'Stiletto';
    wpn.stknf.desc = 'A stabbing dagger with a thin, sharp blade'+dom.dseparator;
    wpn.stknf.slot = 1;
    wpn.stknf.wtype = 3; wpn.stknf.ctype = 1;

    wpn.jmknf = new Eqp(); wpn.jmknf.id = 10021; 
    wpn.jmknf.name = 'Jamadhar';
    wpn.jmknf.desc = 'An exotic dagger with three blades in one hilt'+dom.dseparator;
    wpn.jmknf.slot = 1;
    wpn.jmknf.wtype = 3; wpn.jmknf.ctype = 1;

    wpn.skknf = new Eqp(); wpn.skknf.id = 10022; 
    wpn.skknf.name = 'Soul Kiss';
    wpn.skknf.desc = 'Cursed knife capable of rapturing the soul'+dom.dseparator;
    wpn.skknf.slot = 1;
    wpn.skknf.wtype = 3;

    wpn.rbknf = new Eqp(); wpn.rbknf.id = 10023; 
    wpn.rbknf.name = 'Ribsplitter';
    wpn.rbknf.desc = 'Unusualy long knife with a curved tip'+dom.dseparator;
    wpn.rbknf.slot = 1;
    wpn.rbknf.wtype = 3;

    wpn.gaknf = new Eqp(); wpn.gaknf.id = 10024;
    wpn.gaknf.name = 'Glacialdra';
    wpn.gaknf.desc = '';
    wpn.gaknf.slot = 1;
    wpn.gaknf.rar= 3;
    wpn.gaknf.wtype = 3;

    wpn.ekmw = new Eqp(); wpn.ekmw.id = 10025;
    wpn.ekmw.name = 'Ekimnekuwa';
    wpn.ekmw.desc = 'Also known as "Hiking Stick". Sturdy, used for support while travelling on foot in forests, mountains, through the snow, water, or any other difficult to navigate landscape'+dom.dseparator;
    wpn.ekmw.slot = 1;
    wpn.ekmw.ctype = 2; wpn.ekmw.wtype = 5;

    wpn.mnkm = new Eqp(); wpn.mnkm.id = 10026;
    wpn.mnkm.name = 'Menokamakiri';
    wpn.mnkm.desc = 'Short knife, designed for women. Light and durable, functions like a hunting knife'+dom.dseparator;
    wpn.mnkm.slot = 1;
    wpn.mnkm.wtype = 3;

    wpn.mkr = new Eqp(); wpn.mkr.id = 10027;
    wpn.mkr.name = 'Makiri';
    wpn.mkr.desc = 'Short sword'+dom.dseparator;
    wpn.mkr.slot = 1;
    wpn.mkr.wtype = 1;

    wpn.wsrd1 = new Eqp();  wpn.wsrd1.id = 10028; 
    wpn.wsrd1.name = 'Wooden Sword';
    wpn.wsrd1.desc = 'Simple long sword carved from light wood. Easy to handle and is suitable as amateurish training weapon'+dom.dseparator;
    wpn.wsrd1.slot = 1;
    wpn.wsrd1.str = 7; wpn.wsrd1.cls=[1,0,3];
    wpn.wsrd1.dp=wpn.wsrd1.dpmax = 33;
    wpn.wsrd1.wtype = 1; wpn.wsrd1.ctype = 2;

    wpn.wsrd2 = new Eqp();  wpn.wsrd2.id = 10029; 
    wpn.wsrd2.name = 'Bamboo Training Sword';
    wpn.wsrd2.desc = 'A training sword for kenjutsu lessons. Designed in the late Edo period, it is strung together from four bamboo planks. The ruthless chief of a female bandit group named Danfu is known to wield it'+dom.dseparator;
    wpn.wsrd2.slot = 1;
    wpn.wsrd2.str = 10; wpn.wsrd2.cls=[2,0,3];
    wpn.wsrd2.dp=wpn.wsrd2.dpmax = 41;
    wpn.wsrd2.wtype = 1; wpn.wsrd2.ctype = 2;

    wpn.nssrd = new Eqp();  wpn.nssrd.id = 10030; 
    wpn.nssrd.name = 'Short Sword';
    wpn.nssrd.desc = 'Short crude sword designed for self-defence. It\'s not that useful in battle, especially in unskilled hands'+dom.dseparator;
    wpn.nssrd.slot = 1;
    wpn.nssrd.str = 55; wpn.nssrd.cls=[4,2,1];
    wpn.nssrd.dp=wpn.nssrd.dpmax = 35;
    wpn.nssrd.wtype = 1; 

    wpn.heyit = new Eqp();  wpn.heyit.id = 10031; 
    wpn.heyit.name = 'Heiyoto';
    wpn.heyit.desc = 'Nothing flashy or noticeable about his sword. It reflects the samurai spirit'+dom.dseparator;

    wpn.fksrd = new Eqp();  wpn.fksrd.id = 10032; 
    wpn.fksrd.name = 'Fake Sword';
    wpn.fksrd.desc = 'The sword is made of bamboo. Poorer ronin sometimes pretend to be full-fledged samurai with this'+dom.dseparator;
    wpn.fksrd.slot = 1;
    wpn.fksrd.str = 23; wpn.fksrd.cls=[2,0,4];
    wpn.fksrd.dp=wpn.fksrd.dpmax = 33;
    wpn.fksrd.wtype = 1; wpn.fksrd.ctype = 2;

    wpn.tkmts = new Eqp();  wpn.tkmts.id = 10033; 
    wpn.tkmts.name = 'Takemitsu';
    wpn.tkmts.desc = 'This reinforced sword is made of bamboo. Not much as a weapon, but makes you seem stronger'+dom.dseparator;
    wpn.tkmts.slot = 1;
    wpn.tkmts.str = 35; wpn.tkmts.cls=[2,1,5];
    wpn.tkmts.dp=wpn.tkmts.dpmax = 40;
    wpn.tkmts.wtype = 1; wpn.tkmts.ctype = 2;

    wpn.bsrd = new Eqp();  wpn.bsrd.id = 10034; 
    wpn.bsrd.name = 'Blunt Sword';
    wpn.bsrd.desc = 'This is the blunt sword used as a bad example of a knife in demonstration sales for housewives. Good luck trying to cut onions with this'+dom.dseparator;
    wpn.bsrd.slot = 1;
    wpn.bsrd.str = 20; wpn.bsrd.cls=[2,3,3];
    wpn.bsrd.dp=wpn.bsrd.dpmax = 38;
    wpn.bsrd.wtype = 1; wpn.bsrd.ctype = 2;

    wpn.bdsrd = new Eqp();  wpn.bdsrd.id = 10035; 
    wpn.bdsrd.name = 'Dull Sword';
    wpn.bdsrd.desc = 'A sword designed for mass production by reducing labor and material cost down to a minimum. It may look like a sword, but it\'s not really fit to cut anything. The manual suggests it be used to cut radishes'+dom.dseparator;
    wpn.bdsrd.slot = 1;
    wpn.bdsrd.str = 27; wpn.bdsrd.cls=[2,3,3];
    wpn.bdsrd.dp=wpn.bdsrd.dpmax = 34;
    wpn.bdsrd.wtype = 1; wpn.bdsrd.ctype = 2;

    wpn.bcsrd = new Eqp();  wpn.bcsrd.id = 10036; 
    wpn.bcsrd.name = 'Crappy Sword';
    wpn.bcsrd.desc = 'This sword is sold at the 100 Cout store under the name "Big Loss". You get what you pay for. There are even competitions to see who can sharpen this sword the best'+dom.dseparator;
    wpn.bcsrd.slot = 1;
    wpn.bcsrd.str = 40; wpn.bcsrd.cls=[4,3,3];
    wpn.bcsrd.dp=wpn.bcsrd.dpmax = 34;
    wpn.bcsrd.wtype = 1; 

    wpn.ktsk = new Eqp();  wpn.ktsk.id = 10037;  //2
    wpn.ktsk.name = 'Kotesaki';
    wpn.ktsk.desc = 'A light sword a ight-heartet guy begged the swordsmith to make. He thought his sword would make him more popular with the ladies. He managed to rack up some wins by cheating, but the ladies still don\'t like him'+dom.dseparator;

    wpn.crsto = new Eqp();  wpn.crsto.id = 10038;  //3
    wpn.crsto.name = 'Cristo';
    wpn.crsto.desc = 'A samurai wrongly imprisoned for a crime he didn\'t commit carved this weapon from his cell walls. He did this in a secret from the guards, but by the time he finished, his sentence was over'+dom.dseparator;

    wpn.ksbmr = new Eqp();  wpn.ksbmr.id = 10039;  //4
    wpn.ksbmr.name = 'Komusubimaru';
    wpn.ksbmr.desc = 'A swordsman who loves sumo made this sword to cheer on his favorite sumo wrestler. But the name "Komusubi" is a low rank in sumo. It was bad luck, and the wrestler never got promoted'+dom.dseparator;

    wpn.hsmts = new Eqp();  wpn.hsmts.id = 10040;  //5
    wpn.hsmts.name = 'Hasemitsu';
    wpn.hsmts.desc = 'A swordsmith created this blade as he danced around bragging about his skill. You may think he was just screwing around, but this sword is actually quiet nice'+dom.dseparator;

    wpn.kiknif = new Eqp(); wpn.kiknif.id = 10041; 
    wpn.kiknif.name = 'Kitchen Knife';
    wpn.kiknif.desc = 'A knife originally used to cut fish, not people. It\'s not a sword, but ordering one won\'t get you yelled at'+dom.dseparator+'<span style="color:deeppink">Cooking EXP gain +15%</span><br>'
    wpn.kiknif.slot = 1;
    wpn.kiknif.str = 24; wpn.kiknif.cls=[3,2,0];
    wpn.kiknif.dp=wpn.kiknif.dpmax = 15;
    wpn.kiknif.wtype = 3;
    wpn.kiknif.oneq=function(){skl.cook.p+=.15}
    wpn.kiknif.onuneq=function(){skl.cook.p-=.15}

    wpn.gamas = new Eqp();  wpn.gamas.id = 10042;  //6
    wpn.gamas.name = 'Gama';
    wpn.gamas.desc = 'A man\'s wife who had a face that resembles a frog died, so he hired a medium to do a seance to summon his wife\'s spirit. But the medium summoned the spirit of some toad. The husband used this sword to kill the medium'+dom.dseparator;

    wpn.wsdmbld = new Eqp();  wpn.wsdmbld.id = 10043  //7
    wpn.wsdmbld.name = 'Wisdom Blade';
    wpn.wsdmbld.desc = 'This is the sword used by a serial killer that struck fear in Edo. The killer stole his family sword to do his killing, so you can imagine that things got weird at the house when they found the sword missing'+dom.dseparator;

    wpn.kurum = new Eqp();  wpn.kurum.id = 10044  //8
    wpn.kurum.name = 'Kuruma';
    wpn.kurum.desc = 'This is the sword used by a great tengu when he taught Ushiwakamaru how to fight at Mt. Kuruma. Ushiwakamaru is trained to fight and also became great at the pommel horse'+dom.dseparator;

    wpn.hrsm = new Eqp();  wpn.hrsm.id = 10045  //9 ice
    wpn.hrsm.name = 'Harusame';
    wpn.hrsm.desc = 'A sword made in the quiet rain in spring. It is easy to wield and can be chewy. When dried, it won\'t be as sharp, but putting water turns it back to normal'+dom.dseparator;

    wpn.kosgi = new Eqp();  wpn.kosgi.id = 10046 //10
    wpn.kosgi.name = 'Kosugi';
    wpn.kosgi.desc = 'A sword used by the famous ninja who left the country and took and extremely dangerous mission. This sword encompasses his very being'+dom.dseparator;

    wpn.shiran = new Eqp();  wpn.shiran.id = 10047 //11
    wpn.shiran.name = 'Shiran';
    wpn.shiran.desc = 'Its name comes from its purple orchid-like accessory. The true etymology of the sword is a mystery to even its swordsmith'+dom.dseparator;

    wpn.shnztt = new Eqp();  wpn.shnztt.id = 10048 //12
    wpn.shnztt.name = 'Shinzanto';
    wpn.shnztt.desc = 'Those who wield this sword also command the shaky nervousness of the rookie blacksmith who crafted it'+dom.dseparator;

    wpn.lsrd = new Eqp(); wpn.lsrd.id = 10049;
    wpn.lsrd.name = 'Light Sword';
    wpn.lsrd.desc = 'A basic, easy to wield civilian-level light sword'+dom.dseparator;
    wpn.lsrd.slot = 1;
    wpn.lsrd.wtype = 1;

    wpn.log = new Eqp(); wpn.log.id = 10050;
    wpn.log.name = 'Log';
    wpn.log.desc = 'A massive heavy tree log. How did you even think about swinging it as a weapon?'+dom.dseparator;
    wpn.log.slot = 1; wpn.log.twoh = true;
    wpn.log.str = 48; wpn.log.cls=[-5,-5,6];
    wpn.log.agl = -15;
    wpn.log.ctype = 2; wpn.log.wtype = 5;
    wpn.log.dp=wpn.log.dpmax = 68;

    wpn.sprw = new Eqp(); wpn.sprw.id = 10051;
    wpn.sprw.name = 'Spear';
    wpn.sprw.desc = 'Long piece of wood with a sharp metal chunk at the end of it. Couldn\'t get simpler than that'+dom.dseparator;
    wpn.sprw.slot = 1;
    wpn.sprw.str = 11; wpn.sprw.cls=[2,4,1];
    wpn.sprw.ctype = 1; wpn.sprw.wtype = 4;
    wpn.sprw.dp=wpn.sprw.dpmax = 26;

    wpn.gsprw = new Eqp(); wpn.gsprw.id = 10052;
    wpn.gsprw.name = 'Guard Spear';
    wpn.gsprw.desc = 'Basic and easy to wield spear used in self-defence'+dom.dseparator;
    wpn.gsprw.slot = 1;
    wpn.gsprw.str = 27; wpn.gsprw.cls=[2,5,2];
    wpn.gsprw.ctype = 1; wpn.gsprw.wtype = 4;
    wpn.gsprw.dp=wpn.gsprw.dpmax = 44;

    wpn.scspt1 = new Eqp();  wpn.scspt1.id = 10053; 
    wpn.scspt1.name = 'Red Hand';
    wpn.scspt1.desc = 'Burning sword that looks like a scissors blade. Its flames can evaporate any liquid'+dom.dseparator+'<span style="color:orange;text-shadow:red 0px 0px 5px,red 0px 0px 5px">Fire Affinity +25</span><br>';
    wpn.scspt1.slot = 1;
    wpn.scspt1.str = 54;
    wpn.scspt1.cls=[10,7,3]; wpn.scspt1.aff=[0,0,0,25,-35,0,0];
    wpn.scspt1.dp=wpn.scspt1.dpmax = 75;
    wpn.scspt1.wtype = 1; 
    wpn.scspt1.atype = 3; 
    wpn.scspt1.rar=3;

    wpn.scspt2 = new Eqp();  wpn.scspt2.id = 10054; 
    wpn.scspt2.name = 'Blue Hand';
    wpn.scspt2.desc = 'Freezing sword that looks like a scissors blade. Its edge can calm the fieriest fire'+dom.dseparator+'<span style="color:cyan;text-shadow:blue 0px 0px 5px,blue 0px 0px 5px">Water Affinity +25</span><br>';
    wpn.scspt2.slot = 1;
    wpn.scspt2.str = 52;
    wpn.scspt2.cls=[11,8,5]; 
    wpn.scspt2.aff=[0,0,0,-35,25,0,0];
    wpn.scspt2.dp=wpn.scspt2.dpmax = 65;
    wpn.scspt2.wtype = 1; 
    wpn.scspt2.atype = 4; 
    wpn.scspt2.rar=3;

    wpn.scspt3 = new Eqp();  wpn.scspt3.id = 10055; 
    wpn.scspt3.name = 'Fate Cutters';
    wpn.scspt3.desc = 'Two swords combined together, forming a scissors-shaped weapon. It is said a mad blacksmith created this blade to hunt demigods'+dom.dseparator+'<span style="color:mediumorchid;text-shadow:darkblue 0px 0px 5px,darkblue 0px 0px 5px">Dark Affinity +30</span><br>';
    wpn.scspt3.slot = 1;
    wpn.scspt3.twoh = true;
    wpn.scspt3.str = 108;
    wpn.scspt3.cls=[15,12,6];
    wpn.scspt3.aff=[0,0,0,15,15,-5,30];
    wpn.scspt3.dp=wpn.scspt3.dpmax = 99;
    wpn.scspt3.wtype = 1; 
    wpn.scspt3.atype = 6; 
    wpn.scspt3.rar=4;

    wpn.shrsb = new Eqp();  wpn.shrsb.id = 10056; 
    wpn.shrsb.name = 'Shears';
    wpn.shrsb.desc = 'Massive gardening shears, for tiding up the bushes and other decorative flora. A murderer in the past was known to commit atrocities with a similar tool'+dom.dseparator;
    wpn.shrsb.slot = 1; wpn.shrsb.twoh = true;
    wpn.shrsb.str = 40;
    wpn.shrsb.agl = -11;
    wpn.shrsb.cls=[8,5,1];
    wpn.shrsb.dp=wpn.shrsb.dpmax =45;
    wpn.shrsb.wtype = 3; 

    wpn.evob = new Eqp();  wpn.evob.id = 10057; 
    wpn.evob.name = 'Sword Of Evolution';
    wpn.evob.desc = 'This living blade can absorb the blood and souls of defeated foes, it gets sharper with each kill'+dom.dseparator;
    wpn.evob.slot = 1; 
    wpn.evob.str = 1;
    wpn.evob.rar = 4;
    wpn.evob.dp=wpn.evob.dpmax=30;
    wpn.evob.wtype = 1; 
    wpn.evob.oneq=function(){
      attachCallback(callback.onDeath,{
        f:function(victim, killer){
          you.eqp[0].str+=victim.str*.00005
          you.eqp[0].agl+=victim.agl*.000003
          you.eqp[0].int+=victim.int*.000001
          let d = victim.lvl*.001**(1+victim.rnk*.01); you.eqp[0].dp+=d;you.eqp[0].dpmax+=d
        },
        id:10057,
        data:{q:true}
      })
    };
    wpn.evob.onuneq=function(){detachCallback(callback.onDeath,10057)};

    wpn.mkrdwk = new Eqp();  wpn.mkrdwk.id = 10058; 
    wpn.mkrdwk.name = 'Marked Wakizashi';
    wpn.mkrdwk.desc = 'Old wakizashi variant with red hilt. Scarred and chipped blade hints that it was used rather heavily in the past'+dom.dseparator;
    wpn.mkrdwk.slot = 1; wpn.mkrdwk.important=true; wpn.mkrdwk.rar=2;
    wpn.mkrdwk.str = 40; wpn.mkrdwk.cls=[4,3,2];
    wpn.mkrdwk.dp=wpn.mkrdwk.dpmax = 48;
    wpn.mkrdwk.wtype = 1; 
}

function define_equipment() {
    eqp.bnd = new Eqp(); eqp.bnd.id = 20001;
    eqp.bnd.name = 'Bandana';
    eqp.bnd.desc = 'Thin cloth bandana. It protects your face from sweat'+dom.dseparator;
    eqp.bnd.slot = 3;
    eqp.bnd.str = 3;
    eqp.bnd.agl = 1;
    eqp.bnd.aff=[1,0,1,4,-2,0,0];
    eqp.bnd.cls=[1,0,2];
    eqp.bnd.stype = 3;
    eqp.bnd.dp=eqp.bnd.dpmax = 11;
    eqp.bnd.dss=[{item:item.cclth,amount:1,q:.5,max:2}]

    eqp.pnt = new Eqp(); eqp.pnt.id = 20002;
    eqp.pnt.name = 'Dojo Pants';
    eqp.pnt.desc = 'Perfect for morning runs'+dom.dseparator;
    eqp.pnt.slot = 7;
    eqp.pnt.str = 4;
    eqp.pnt.agl = 2;
    eqp.pnt.aff=[2,0,3,4,-1,0,0];
    eqp.pnt.cls=[2,1,1];
    eqp.pnt.stype = 3;
    eqp.pnt.dp=eqp.pnt.dpmax = 19;
    eqp.pnt.dss=[{item:item.cclth,amount:1,q:.5,max:2}]

    eqp.brc = new Eqp(); eqp.brc.id = 20003;
    eqp.brc.name = 'Bandage';
    eqp.brc.desc = 'Simple handwraps'+dom.dseparator;
    eqp.brc.slot = 5;
    eqp.brc.str = 2;
    eqp.brc.agl = 1;
    eqp.brc.int = 3;
    eqp.brc.aff=[0,0,0,0,0,0,0];
    eqp.brc.cls=[1,0,1];
    eqp.brc.stype = 3;
    eqp.brc.dp=eqp.brc.dpmax = 11;
    eqp.brc.dss=[{item:item.cclth,amount:1,q:.5,max:2}]

    eqp.gnt = new Eqp(); eqp.gnt.id = 20004;
    eqp.gnt.name = 'Gauntlet';
    eqp.gnt.desc = 'Tough leather gauntlet that covers your entire hand. May prevent you from losing fingers'+dom.dseparator;
    eqp.gnt.slot = 5;
    eqp.gnt.str = 10;
    eqp.gnt.stype = 3;
    eqp.gnt.aff=[2,1,3,3,2,2,1];
    eqp.gnt.cls=[3,2,4];
    eqp.gnt.dp=eqp.gnt.dpmax = 24;

    eqp.vst = new Eqp(); eqp.vst.id = 20005;
    eqp.vst.name = 'Linen Vest';
    eqp.vst.desc = 'You\'ll feel chilly without sleeves'+dom.dseparator;
    eqp.vst.slot = 4;
    eqp.vst.str = 6;
    eqp.vst.stype = 3;
    eqp.vst.aff=[1,0,0,0,0,1,0];
    eqp.vst.cls=[3,1,1];
    eqp.vst.dp=eqp.vst.dpmax = 23;
    eqp.vst.dss=[{item:item.cclth,amount:1,q:.5,max:2}]

    eqp.thd = new Eqp(); eqp.thd.id = 20006;
    eqp.thd.name = 'Yellow Hood';
    eqp.thd.desc = '';
    eqp.thd.slot = 3;
    eqp.thd.stype = 3;

    eqp.amsk = new Eqp(); eqp.amsk.id = 20007;
    eqp.amsk.name = 'Wolf Mask';
    eqp.amsk.desc = 'A cute wolf mask.<br>It symbolizes <span style="color:orange;text-shadow:red 0px 0px 5px,red 0px 0px 5px">Fire</span>';
    eqp.amsk.slot = 3;
    eqp.amsk.stype = 3;
    eqp.amsk.caff=[1,0,0,20,0,0,0];
    eqp.amsk.cls=[5,5,5];
    eqp.amsk.rar=2;
    eqp.amsk.dp=eqp.amsk.dpmax = 30;
    eqp.amsk.oneq=function(){for(let afn in this.caff) you.caff[afn]+=this.caff[afn]};
    eqp.amsk.onuneq=function(){for(let afn in this.caff) you.caff[afn]-=this.caff[afn]};

    eqp.bmsk = new Eqp(); eqp.bmsk.id = 20008;
    eqp.bmsk.name = 'Frog Mask';
    eqp.bmsk.desc = 'A cute frog mask.<br>It symbolizes <span style="color:cyan;text-shadow:blue 0px 0px 5px,blue 0px 0px 5px">Water</span>';
    eqp.bmsk.slot = 3;
    eqp.bmsk.stype = 3;
    eqp.bmsk.caff=[1,0,0,0,20,0,0];
    eqp.bmsk.cls=[5,5,5];
    eqp.bmsk.rar=2;
    eqp.bmsk.dp=eqp.bmsk.dpmax = 30;
    eqp.bmsk.oneq=function(){for(let afn in this.caff) you.caff[afn]+=this.caff[afn]};
    eqp.bmsk.onuneq=function(){for(let afn in this.caff) you.caff[afn]-=this.caff[afn]};

    eqp.cmsk = new Eqp(); eqp.cmsk.id = 20009;
    eqp.cmsk.name = 'Cat Mask';
    eqp.cmsk.desc = 'A cute cat mask. <br>It symbolizes <span style="color:lime;text-shadow:green 0px 0px 5px,green 0px 0px 5px">Wind</span>';
    eqp.cmsk.slot = 3;
    eqp.cmsk.stype = 3;
    eqp.cmsk.caff=[1,20,0,0,0,0,0];
    eqp.cmsk.cls=[5,5,5];
    eqp.cmsk.rar=2;
    eqp.cmsk.dp =eqp.cmsk.dpmax = 30;
    eqp.cmsk.oneq=function(){for(let afn in this.caff) you.caff[afn]+=this.caff[afn]};
    eqp.cmsk.onuneq=function(){for(let afn in this.caff) you.caff[afn]-=this.caff[afn]};

    eqp.dmsk = new Eqp(); eqp.dmsk.id = 20010;
    eqp.dmsk.name = 'Dog Mask';
    eqp.dmsk.desc = 'A cute dog mask. <br>It symbolizes <span style="color:gold;text-shadow:orange 0px 0px 5px,orange 0px 0px 5px">Bravery</span>';
    eqp.dmsk.slot = 3;
    eqp.dmsk.stype = 3;
    eqp.dmsk.caff=[1,0,20,0,0,0,0];
    eqp.dmsk.cls=[5,5,5];
    eqp.dmsk.rar=2;
    eqp.dmsk.dp=eqp.dmsk.dpmax = 30;
    eqp.dmsk.oneq=function(){for(let afn in this.caff) you.caff[afn]+=this.caff[afn]};
    eqp.dmsk.onuneq=function(){for(let afn in this.caff) you.caff[afn]-=this.caff[afn]};

    eqp.emsk = new Eqp(); eqp.emsk.id = 20011;
    eqp.emsk.name = 'Fox Mask';
    eqp.emsk.desc = 'A cute fox mask. <br>It symbolizes <span style="color:lightgoldenrodyellow;text-shadow:gold 0px 0px 5px">Light</span>';
    eqp.emsk.slot = 3;
    eqp.emsk.stype = 3;
    eqp.emsk.caff=[1,0,0,0,0,20,0];
    eqp.emsk.cls=[5,5,5];
    eqp.emsk.rar=2;
    eqp.emsk.dp=eqp.emsk.dpmax = 30;
    eqp.emsk.oneq=function(){for(let afn in this.caff) you.caff[afn]+=this.caff[afn]};
    eqp.emsk.onuneq=function(){for(let afn in this.caff) you.caff[afn]-=this.caff[afn]};

    eqp.fmsk = new Eqp(); eqp.fmsk.id = 20012;
    eqp.fmsk.name = 'Devil Mask';
    eqp.fmsk.desc = 'A viscous devil mask. <br>It symbolizes <span style="color:mediumorchid;text-shadow:darkblue 0px 0px 5px,darkblue 0px 0px 5px">Darkness</span>';
    eqp.fmsk.slot = 3;
    eqp.fmsk.stype = 3;
    eqp.fmsk.caff=[1,0,0,0,0,0,20];
    eqp.fmsk.cls=[5,5,5];
    eqp.fmsk.rar=2;
    eqp.fmsk.dp=eqp.fmsk.dpmax = 30;
    eqp.fmsk.oneq=function(){for(let afn in this.caff) you.caff[afn]+=this.caff[afn]};
    eqp.fmsk.onuneq=function(){for(let afn in this.caff) you.caff[afn]-=this.caff[afn]};

    eqp.nkgd = new Eqp(); eqp.nkgd.id = 20013;
    eqp.nkgd.name = 'Neck Guard';
    eqp.nkgd.desc = 'Metal plating worn around the neck. Minor protection from direct frontal attacks'+dom.dseparator;
    eqp.nkgd.str = 7;
    eqp.nkgd.slot = 3;
    eqp.nkgd.stype = 3;
    eqp.nkgd.aff=[3,-3,-3,-3,-3,-3,-3];
    eqp.nkgd.cls=[4,4,4];
    eqp.nkgd.dp=eqp.nkgd.dpmax = 35;

    eqp.sndl = new Eqp(); eqp.sndl.id = 20014;
    eqp.sndl.name = 'Sandals';
    eqp.sndl.desc = 'Cheap unremarkable sandals made from light leather. Aren\'t even that comfortable to wear'+dom.dseparator;
    eqp.sndl.slot = 7;
    eqp.sndl.str = 3;
    eqp.sndl.agl = 1;
    eqp.sndl.aff=[2,0,2,3,-1,0,0];
    eqp.sndl.cls=[1,1,1];
    eqp.sndl.stype = 3;
    eqp.sndl.dp=eqp.sndl.dpmax = 12;

    eqp.ykkr = new Eqp(); eqp.ykkr.id = 20015;
    eqp.ykkr.name = 'Yukker';
    eqp.ykkr.desc = 'Warm deerskin boots, worn by civilians and hunters during winter for maximum protection from cold and environmental hazards'+dom.dseparator;
    eqp.ykkr.slot = 7;
    eqp.ykkr.str = 11;
    eqp.ykkr.agl = 2;
    eqp.ykkr.aff=[3,5,15,7,3,0,0];
    eqp.ykkr.cls=[5,4,8];
    eqp.ykkr.stype = 3;
    eqp.ykkr.dp=eqp.ykkr.dpmax = 22;

    eqp.tnc = new Eqp(); eqp.tnc.id = 20016;
    eqp.tnc.name = 'Tunic';
    eqp.tnc.desc = 'A simple, short-sleeved shirt. It\'s somewhat short in length and tailored to snugly fit the wearer\'s body'+dom.dseparator;
    eqp.tnc.slot = 4;
    eqp.tnc.str = 9;
    eqp.tnc.stype = 3;
    eqp.tnc.aff=[2,1,-1,1,1,5,0];
    eqp.tnc.cls=[2,2,3];
    eqp.tnc.dp=eqp.tnc.dpmax = 26;
    eqp.tnc.dss=[{item:item.cclth,amount:2}];

    eqp.rncp = new Eqp(); eqp.rncp.id = 20017;
    eqp.rncp.name = 'Rain Cap';
    eqp.rncp.desc = 'The cap with the wide brim for keeping the rain from the wearer\'s eyes'+dom.dseparator;
    eqp.rncp.slot = 3;
    eqp.rncp.str = 9;
    eqp.rncp.aff=[2,3,2,5,14,5,-5];
    eqp.rncp.cls=[3,2,2];
    eqp.rncp.stype = 3;
    eqp.rncp.dp=eqp.rncp.dpmax = 17;

    eqp.rnss = new Eqp(); eqp.rnss.id = 20018;
    eqp.rnss.name = 'Rain Shoes';
    eqp.rnss.desc = 'Simple shoes made from tree rubber. Sturdy and longlasting, they protect one\'s toes from cold'+dom.dseparator;
    eqp.rnss.slot = 7;
    eqp.rnss.str = 9;
    eqp.rnss.agl = 2;
    eqp.rnss.aff=[4,5,10,9,14,1,0];
    eqp.rnss.cls=[3,7,5];
    eqp.rnss.stype = 3;
    eqp.rnss.dp=eqp.rnss.dpmax = 22;

    eqp.hkgd = new Eqp(); eqp.hkgd.id = 20019;
    eqp.hkgd.name = 'Headguard';
    eqp.hkgd.desc = 'A simple and light helmet that provides minimal protection against falling debris and the like'+dom.dseparator;
    eqp.hkgd.str=14;
    eqp.hkgd.slot = 3;
    eqp.hkgd.stype = 3;
    eqp.hkgd.aff=[5,-4,-4,-4,-4,-4,-1];
    eqp.hkgd.cls=[5,5,7];
    eqp.hkgd.dp=eqp.hkgd.dpmax = 28;

    eqp.wkss = new Eqp(); eqp.wkss.id = 20020;
    eqp.wkss.name = 'Worker Shoes';
    eqp.wkss.desc = 'Safety shoes for laborers. The metal reinforcement offers dependable protection for the toes'+dom.dseparator;
    eqp.wkss.slot = 7;
    eqp.wkss.str = 16;
    eqp.wkss.agl = 2;
    eqp.wkss.aff=[7,12,8,7,8,1,2];
    eqp.wkss.cls=[5,4,6];
    eqp.wkss.stype = 3;
    eqp.wkss.dp=eqp.wkss.dpmax = 22;
    
    eqp.jhmt = new Eqp(); eqp.jhmt.id = 20021;
    eqp.jhmt.name = 'Junk Helmet';
    eqp.jhmt.desc = 'A helmet clobbled together from scrap material. It looks terribly heavy but provides good protection around the head and neck'+dom.dseparator;
    eqp.jhmt.str= 18;
    eqp.jhmt.slot = 3;
    eqp.jhmt.stype = 3;
    eqp.jhmt.aff=[8,-5,-5,-5,-5,-5,-5];
    eqp.jhmt.cls=[8,8,8];
    eqp.jhmt.dp=eqp.jhmt.dpmax = 28;

    eqp.knkn = new Eqp(); eqp.knkn.id = 20022;
    eqp.knkn.name = 'Knit Knee-Highs';
    eqp.knkn.desc = 'Long boots woven from linen. Light and breathable, so they\'re comfortable when it\'s hot'+dom.dseparator;
    eqp.knkn.slot = 7;
    eqp.knkn.str = 19;
    eqp.knkn.agl = 2;
    eqp.knkn.aff=[3,4,7,15,10,3,2];
    eqp.knkn.cls=[3,3,3];
    eqp.knkn.stype = 3;
    eqp.knkn.dp=eqp.knkn.dpmax = 32;

    eqp.brbn = new Eqp(); eqp.brbn.id = 20023;
    eqp.brbn.name = 'Burnouns';
    eqp.brbn.desc = 'A long, hooded cloak. Protetcs the wearer from both the scorching sun and chilling cold'+dom.dseparator;
    eqp.brbn.slot = 4;
    eqp.brbn.str = 33;
    eqp.brbn.agl = -4;
    eqp.brbn.stype = 3;
    eqp.brbn.aff=[4,7,5,19,21,-15,15];
    eqp.brbn.cls=[8,5,8];
    eqp.brbn.dp=eqp.brbn.dpmax = 41;

    eqp.ovrl = new Eqp(); eqp.ovrl.id = 20024;
    eqp.ovrl.name = 'Overalls';
    eqp.ovrl.desc = 'Work clothes made of heavy cloth that cover the entire body. Protects from bumps and scratches'+dom.dseparator;
    eqp.ovrl.slot = 4;
    eqp.ovrl.str = 25;
    eqp.ovrl.stype = 3;
    eqp.ovrl.aff=[6,6,5,9,8,9,3];
    eqp.ovrl.cls=[8,8,8];
    eqp.ovrl.dp=eqp.ovrl.dpmax = 33;

    eqp.prsnu = new Eqp(); eqp.prsnu.id = 20025;
    eqp.prsnu.name = 'Prison Uniform';
    eqp.prsnu.desc = 'Made of ugly, coarse cloth, this garment\'s sturdiness is its only redeeming trait. It holds up well under what washing it does get'+dom.dseparator;
    eqp.prsnu.slot = 4;
    eqp.prsnu.str = 40;
    eqp.prsnu.stype = 3;
    eqp.prsnu.aff=[9,6,5,9,8,9,3];
    eqp.prsnu.cls=[10,10,5];
    eqp.prsnu.dp=eqp.prsnu.dpmax = 38;

    eqp.prsna = new Eqp(); eqp.prsna.id = 20026;
    eqp.prsna.name = 'Prison Apparel';
    eqp.prsna.desc = 'It looks just like any other prison uniform, but the neck, sleeves and elbows have been made far more comfortable with soft threads'+dom.dseparator;
    eqp.prsna.slot = 4;
    eqp.prsna.rar = 2;
    eqp.prsna.str = 44;
    eqp.prsna.agl = 5;
    eqp.prsna.stype = 3;
    eqp.prsna.aff=[9,7,8,9,8,9,3];
    eqp.prsna.cls=[10,10,10];
    eqp.prsna.dp=eqp.prsna.dpmax = 38;

    eqp.strwks = new Eqp(); eqp.strwks.id = 20027;
    eqp.strwks.name = 'Straw Kasa';
    eqp.strwks.desc = 'A Sando-gasa is made by weaving straw together. Great for boys who are too embarrassed to use a parasol'+dom.dseparator;
    eqp.strwks.slot = 3;
    eqp.strwks.str = 6;
    eqp.strwks.aff=[3,3,2,13,2,5,-5];
    eqp.strwks.cls=[2,1,1];
    eqp.strwks.stype = 3;
    eqp.strwks.dp=eqp.strwks.dpmax = 18;

    eqp.knkls = new Eqp(); eqp.knkls.id = 20028;
    eqp.knkls.name = 'Knuckles';
    eqp.knkls.desc = 'Leather bands that cover fingers'+dom.dseparator+'Unarmed STR: <span style="color:lime">+4</span><br>';
    eqp.knkls.slot = 5;
    eqp.knkls.str = 4; eqp.knkls.undc = 4;
    eqp.knkls.aff=[1,0,0,0,0,0,0];
    eqp.knkls.cls=[2,1,1];
    eqp.knkls.stype = 3;
    eqp.knkls.dp=eqp.knkls.dpmax = 17;
    eqp.knkls.oneq = function(){you.mods.undc+=this.undc};
    eqp.knkls.onuneq =function(){you.mods.undc-=this.undc};

    eqp.reedhd = new Eqp(); eqp.reedhd.id = 20029;
    eqp.reedhd.name = 'Reed Hood';
    eqp.reedhd.desc = 'A hat that covers the face of Zen monks made from woven reed. Wearing this doesn\'t necessarily make you a monk, though'+dom.dseparator;
    eqp.reedhd.slot = 3;
    eqp.reedhd.str = 25;
    eqp.reedhd.aff=[4,1,7,13,2,9,-5];
    eqp.reedhd.cls=[3,3,3];
    eqp.reedhd.stype = 3;
    eqp.reedhd.dp=eqp.reedhd.dpmax = 28;

    eqp.ptchct = new Eqp(); eqp.ptchct.id = 20030;
    eqp.ptchct.name = 'Patchwork Coat';
    eqp.ptchct.desc = 'Coat stitched together from patches of cloth of various sizes and thickness. Somewhat durable but looks desperate'+dom.dseparator;
    eqp.ptchct.slot = 4;
    eqp.ptchct.str = 14;
    eqp.ptchct.stype = 3;
    eqp.ptchct.aff=[4,2,1,2,2,3,3];
    eqp.ptchct.cls=[1,4,4];
    eqp.ptchct.dp=eqp.ptchct.dpmax = 40;

    eqp.ptchpts = new Eqp(); eqp.ptchpts.id = 20031;
    eqp.ptchpts.name = 'Patchwork Pants';
    eqp.ptchpts.desc = 'Crude attempt at pants, very baggy looking and somewhat uncomfortable to wear. Potential holes near stitch areas make your lower body shiver when it\'s windy'+dom.dseparator;
    eqp.ptchpts.slot = 7;
    eqp.ptchpts.str = 12;
    eqp.ptchpts.stype = 3;
    eqp.ptchpts.aff=[3,2,8,4,5,5,2];
    eqp.ptchpts.cls=[3,5,5];
    eqp.ptchpts.dp=eqp.ptchpts.dpmax = 38;
}

function define_shields() {
    sld.bkl = new Eqp(); sld.bkl.id = 30001;
    sld.bkl.name = 'Buckler';
    sld.bkl.desc = 'Tiny shield that is supposed to be strapped onto an arm. Low defence, but provides high mobility'+dom.dseparator;
    sld.bkl.slot = 2;
    sld.bkl.str = 5;
    sld.bkl.aff=[2,2,2,2,2,2,2];
    sld.bkl.cls=[2,2,2];
    sld.bkl.stype = 3;
    sld.bkl.dp=sld.bkl.dpmax = 36;

    sld.tge = new Eqp(); sld.tge.id = 30002;
    sld.tge.name = 'Targe';
    sld.tge.desc = 'Simple square shield with reinforced corners'+dom.dseparator;
    sld.tge.slot = 2;
    sld.tge.str = 9;
    sld.tge.aff=[4,3,3,3,3,3,3];
    sld.tge.cls=[3,3,4];
    sld.tge.stype = 3;
    sld.tge.dp=sld.tge.dpmax = 38;

    sld.plt = new Eqp(); sld.plt.id = 30003;
    sld.plt.name = 'Pelta Shield';
    sld.plt.desc = 'Triangular shield composed of several layers of wood banded together, making it a little on the heavy side';
    sld.plt.slot = 2;
    sld.plt.str = 15;
    sld.plt.aff=[8,6,5,4,5,3,3];
    sld.plt.cls=[5,5,5];
    sld.plt.stype = 3;
    sld.plt.dp=sld.plt.dpmax = 41;

    sld.qad = new Eqp(); sld.qad.id = 30004;
    sld.qad.name = 'Quad Shield';
    sld.qad.desc = '';
    sld.qad.slot = 2;
    sld.qad.str = 0;
    sld.qad.stype = 3;

    sld.crc = new Eqp(); sld.crc.id = 30005;
    sld.crc.name = 'Circle Shield';
    sld.crc.desc = '';
    sld.crc.slot = 2;
    sld.crc.str = 0;
    sld.crc.stype = 3;

    sld.rnd = new Eqp(); sld.rnd.id = 30006;
    sld.rnd.name = 'Round Shield';
    sld.rnd.desc = '';
    sld.rnd.slot = 2;
    sld.rnd.str = 0;
    sld.rnd.stype = 3;

    sld.twr = new Eqp(); sld.twr.id = 30007;
    sld.twr.name = 'Tower Shield';
    sld.twr.desc = '';
    sld.twr.slot = 2;
    sld.twr.str = 0;
    sld.twr.stype = 3;

    sld.spk = new Eqp(); sld.spk.id = 30008;
    sld.spk.name = 'Spiked Shield';
    sld.spk.desc = '';
    sld.spk.slot = 2;
    sld.spk.str = 0;
    sld.spk.stype = 3;

    sld.kit = new Eqp(); sld.kit.id = 30009;
    sld.kit.name = 'Kite Shield';
    sld.kit.desc = '';
    sld.kit.slot = 2;
    sld.kit.str = 0;
    sld.kit.stype = 3;

    sld.kit = new Eqp(); sld.kit.id = 30010;
    sld.kit.name = 'Casserole Shield';
    sld.kit.desc = '';
    sld.kit.slot = 2;
    sld.kit.str = 0;
    sld.kit.stype = 3;
    
    sld.htr = new Eqp(); sld.htr.id = 30011;
    sld.htr.name = 'Heater Shield';
    sld.htr.desc = '';
    sld.htr.slot = 2;
    sld.htr.str = 0;
    sld.htr.stype = 3;

    sld.ovl = new Eqp(); sld.ovl.id = 30012;
    sld.ovl.name = 'Oval Shield';
    sld.ovl.desc = '';
    sld.ovl.slot = 2;
    sld.ovl.str = 0;
    sld.ovl.stype = 3;

    sld.knt = new Eqp(); sld.knt.id = 30013;
    sld.knt.name = 'Knight Shield';
    sld.knt.desc = '';
    sld.knt.rar=4;
    sld.knt.slot = 2;
    sld.knt.str = 0;
    sld.knt.stype = 3;

    sld.hpt = new Eqp(); sld.hpt.id = 30014;
    sld.hpt.name = 'Hoplite Shield';
    sld.hpt.desc = '';
    sld.hpt.rar=4;
    sld.hpt.slot = 2;
    sld.hpt.str = 0;
    sld.hpt.stype = 3;

    sld.jrt = new Eqp(); sld.jrt.id = 30015;
    sld.jrt.name = 'Jazeraint Shield';
    sld.jrt.desc = '';
    sld.jrt.rar=4;
    sld.jrt.slot = 2;
    sld.jrt.str = 0;
    sld.jrt.stype = 3;

    sld.drd = new Eqp(); sld.drd.id = 30016;
    sld.drd.name = 'Dread Shield';
    sld.drd.desc = '';
    sld.drd.rar=4;
    sld.drd.slot = 2;
    sld.drd.str = 0;
    sld.drd.stype = 3;

    sld.stksld = new Eqp(); sld.stksld.id = 30017;
    sld.stksld.name = 'Stake Shield';
    sld.stksld.desc = 'Not actually a shield, but a row of spiky wood stakes tightly packed together to form a square panel. It\'s a bit heavy'+dom.dseparator+'<span style="color:hotpink">Physical ATK +4</span><br>';
    sld.stksld.slot = 2;
    sld.stksld.str = 7;
    sld.stksld.aff=[2,2,2,2,2,2,2];
    sld.stksld.cls=[3,3,3];
    sld.stksld.stype = 3;
    sld.stksld.dp=sld.stksld.dpmax = 23;
    sld.stksld.oneq=function(){you.aff[0]+=4};
    sld.stksld.onuneq=function(){you.aff[0]-=4};
}

function define_accessories() {
    acc.river_charm = new Eqp();
    acc.river_charm.id = 80001;
    acc.river_charm.name = "Water Charm";
    acc.river_charm.desc = "A strange blue charm given to you by an old man. When you bring it up to your hear, you can hear water flowing.";
    acc.river_charm.slot = 8;
    acc.river_charm.stype = 3;
    acc.river_charm.rar = 2;
    acc.river_charm.oneq = function() {
        you.cmaff[6]+=15;
    }
    acc.river_charm.onuneq = function() {
        you.cmaff[6]-=15;
    }
    acc.river_charm.onGet = function() {}

    acc.strawp = new Eqp(); acc.strawp.id = 40001;
    acc.strawp.name = 'Straw Pendant';
    acc.strawp.desc = 'You made this yourself!'+dom.dseparator+'<span style=\'color:green\'><span style=\'color:lime\'> +50 </span> to max energy<br><span style="color: lime">SPD +1</span></span>';
    acc.strawp.slot = 8;
    acc.strawp.stype = 3;
    //acc.strawp.eff[0]=effect.strawp;
    acc.strawp.oneq=function(){you.sata+=50;you.sat+=50;you.spda+=1}
    acc.strawp.onuneq=function(){you.sata-=50;you.sat-=50;you.spda-=1}
    acc.strawp.onGet=function(){if(acc.fmlim.have) {giveRcp(rcp.fmlim2); this.onGet=function(){}}}

    acc.sun_charm = new Eqp(); acc.sun_charm.id = 40002;
    acc.sun_charm.name = 'Sun Charm';
    acc.sun_charm.desc = 'Little charm with a piece of power of the Sun imbued into it. It absorbs Sun energy'+dom.dseparator+'<span style=\'color:gold\'>Raises stats during day</span>';
    acc.sun_charm.slot = 8;
    acc.sun_charm.stype = 3;
    acc.sun_charm.eff[0]=effect.sun_charm;
    acc.sun_charm.rar = 2;
    acc.sun_charm.oneq=function(){
      if(global.flags.savestate===false)msg('You feel closer to the Sun..','gold')
    }

    acc.moon_charm = new Eqp(); acc.moon_charm.id = 40003;
    acc.moon_charm.name = 'Moon Charm';
    acc.moon_charm.desc = 'Little charm with a piece of power of the Moon imbued into it. It absorbs Moon energy'+dom.dseparator+'<span style=\'color:cyan\'>Raises stats during night</span>';
    acc.moon_charm.slot = 8;
    acc.moon_charm.stype = 3;
    acc.moon_charm.eff[0]=effect.moon_charm;
    acc.moon_charm.rar = 2;
    acc.moon_charm.oneq=function(){
      if(global.flags.savestate===false)msg('You feel closer to the Moon..','gold')
    }

    acc.mstn = new Eqp(); acc.mstn.id = 40004;
    acc.mstn.name = 'Mana Stone';
    acc.mstn.desc = 'Gem imbued with raw arcanic power';
    acc.mstn.slot = 8;
    acc.mstn.stype = 3;
    acc.mstn.rar = 2;

    acc.bstn = new Eqp(); acc.bstn.id = 40005;
    acc.bstn.name = 'Blood Stone';
    acc.bstn.desc = 'Gem imbued with the power of blood';
    acc.bstn.slot = 8;
    acc.bstn.stype = 3;
    acc.bstn.rar = 2;

    acc.sstn = new Eqp(); acc.sstn.id = 40006;
    acc.sstn.name = 'Soul Stone';
    acc.sstn.desc = 'Gem with a fraction of a soul trapped inside of it';
    acc.sstn.slot = 8;
    acc.sstn.stype = 3;
    acc.sstn.rar = 2;

    acc.srng = new Eqp(); acc.srng.id = 40007;
    acc.srng.name = 'Silver Ring';
    acc.srng.desc = 'Simple ring made of silver. It is used as a base for making enchanted accessories';
    acc.srng.slot = 8;
    acc.srng.stype = 3;

    acc.grng = new Eqp(); acc.grng.id = 40008;
    acc.grng.name = 'Gold Ring';
    acc.grng.desc = 'Valuable ring made of gold. Has high vanity value and can be improved by setting gems into it';
    acc.grng.slot = 8;
    acc.grng.stype = 3;

    acc.trrng = new Eqp(); acc.trrng.id = 40009;
    acc.trrng.name = 'Trinity';
    acc.trrng.desc = 'Rings were given to the Knights in ancient times, as a symbol of loyalty. Strenghtens mind and body';
    acc.trrng.slot = 8;
    acc.trrng.stype = 3;
    acc.trrng.rar = 3;

    acc.akh = new Eqp(); acc.akh.id = 40010;
    acc.akh.name = 'Ankh';
    acc.akh.desc = 'A symbol of life ☥';
    acc.akh.slot = 8;
    acc.akh.stype = 3;
    acc.akh.rar = 3;

    acc.gmph1 = new Eqp(); acc.gmph1.id = 40011;
    acc.gmph1.name = 'Titan Malachite';
    acc.gmph1.desc = 'Malachite with a Titan\'s soul bound inside. Slightly increases the power of direct attacks';
    acc.gmph1.slot = 8;
    acc.gmph1.stype = 3;
    acc.gmph1.rar = 2;

    acc.gmph2 = new Eqp(); acc.gmph2.id = 40012;
    acc.gmph2.name = 'Talos Feldspar';
    acc.gmph2.desc = 'Feldspar imbued with the dark powers of Talos. Increases the power of direct attacks';
    acc.gmph2.slot = 8;
    acc.gmph2.stype = 3;
    acc.gmph2.rar = 3;

    acc.gmai1 = new Eqp(); acc.gmai1.id = 40013;
    acc.gmai1.name = 'Sylphid Topaz';
    acc.gmai1.desc = 'Topaz imbued with the power of the Sylphs. Slightly increases air affinity';
    acc.gmai1.slot = 8;
    acc.gmai1.stype = 3;
    acc.gmai1.rar = 2;

    acc.gmai2 = new Eqp(); acc.gmai2.id = 40014;
    acc.gmai2.name = 'Djinn Amber';
    acc.gmai2.desc = 'Amber imbued with the power of Sylphs. Increases air affinity';
    acc.gmai2.slot = 8;
    acc.gmai2.stype = 3;
    acc.gmai2.rar = 3;

    acc.gmfr1 = new Eqp(); acc.gmfr1.id = 40015;
    acc.gmfr1.name = 'Salamander Ruby';
    acc.gmfr1.desc = 'Ruby imbued with the power of the Salamanders. Slightly increases fire affinity';
    acc.gmfr1.slot = 8;
    acc.gmfr1.stype = 3;
    acc.gmfr1.rar = 2;

    acc.gmfr2 = new Eqp(); acc.gmfr2.id = 40016;
    acc.gmfr2.name = 'Ifrit Carnelian';
    acc.gmfr2.desc = 'Carnelian imbued with the power of Ifrit. Increases fire affinity';
    acc.gmfr2.slot = 8;
    acc.gmfr2.stype = 3;
    acc.gmfr2.rar = 3;

    acc.gmea1 = new Eqp(); acc.gmea1.id = 40017;
    acc.gmea1.name = 'Gnome Emerald';
    acc.gmea1.desc = 'Emerald imbued with the power of the Gnomes. Slightly increases earth affinity';
    acc.gmea1.slot = 8;
    acc.gmea1.stype = 3;
    acc.gmea1.rar = 2;

    acc.gmea2 = new Eqp(); acc.gmea2.id = 40018;
    acc.gmea2.name = 'Dao Moonstone';
    acc.gmea2.desc = 'Moonstone imbued with the power of Dao. Increases earth affinity';
    acc.gmea2.slot = 8;
    acc.gmea2.stype = 3;
    acc.gmea2.rar = 3;

    acc.gmwt1 = new Eqp(); acc.gmwt1.id = 40019;
    acc.gmwt1.name = 'Undine Jasper';
    acc.gmwt1.desc = 'Jasper imbued with the power of the Undines. Slightly increases water affinity';
    acc.gmwt1.slot = 8;
    acc.gmwt1.stype = 3;
    acc.gmwt1.rar = 2;

    acc.gmwt2 = new Eqp(); acc.gmwt2.id = 40020;
    acc.gmwt2.name = 'Marid Aquamarine';
    acc.gmwt2.desc = 'Aquamarine imbued with the power of Marid. Increases water affinity';
    acc.gmwt2.slot = 8;
    acc.gmwt2.stype = 3;
    acc.gmwt2.rar = 3;

    acc.gmhl1 = new Eqp(); acc.gmhl1.id = 40021;
    acc.gmhl1.name = 'Angel Pearl';
    acc.gmhl1.desc = 'Pearl imbued with the power of the angels. Slightly increases light affinity';
    acc.gmhl1.slot = 8;
    acc.gmhl1.stype = 3;
    acc.gmhl1.rar = 2;

    acc.gmhl2 = new Eqp(); acc.gmhl2.id = 40022;
    acc.gmhl2.name = 'Seraphim Diamond';
    acc.gmhl2.desc = 'Diamond with a seraph\'s soul bound inside. Increases light affinity';
    acc.gmhl2.slot = 8;
    acc.gmhl2.stype = 3;
    acc.gmhl2.rar = 3;

    acc.gmdk1 = new Eqp(); acc.gmdk1.id = 40023;
    acc.gmdk1.name = 'Morlock Jet';
    acc.gmdk1.desc = 'Jet stone sealed with Morlock\'s magical power. Slightly increases dark affinity';
    acc.gmdk1.slot = 8;
    acc.gmdk1.stype = 3;
    acc.gmdk1.rar = 2;

    acc.gmdk2 = new Eqp(); acc.gmdk2.id = 40024;
    acc.gmdk2.name = 'Berial Blackpearl';
    acc.gmdk2.desc = 'Blackpearl with Berial\'s soul bound inside. Increases dark affinity';
    acc.gmdk2.slot = 8;
    acc.gmdk2.stype = 3;
    acc.gmdk2.rar = 3;

    acc.wfng = new Eqp(); acc.wfng.id = 40025;
    acc.wfng.name = 'Wolf Fang Necklace';
    acc.wfng.desc = 'Menacing fang of the wolf, in the form of a pendant. Wearing this can help to repell and scare away minor beasts'+dom.dseparator+'<span style="color:orange">Beast Class DEF +15</span>';
    acc.wfng.slot = 8;
    acc.wfng.stype = 3;
    acc.wfng.oneq=function(){you.cmaff[1]+=15};
    acc.wfng.onuneq=function(){you.cmaff[1]-=15}
    acc.wfng.onGet = function(){
      if(!rcp.wfar.have){let f=0; for(let a in inv) if(inv[a].id===this.id) f++
      if(f>=3) giveRcp(rcp.wfar)}
    }

    acc.wfar = new Eqp(); acc.wfar.id = 40026;
    acc.wfar.name = 'Wolf Array';
    acc.wfar.desc = 'Array composed of interlinked fangs of the wolf. Used by hunters as a mean of protection agains wildlife'+dom.dseparator+'<span style="color:orange">Beast Class DEF +30</span>';
    acc.wfar.slot = 8;
    acc.wfar.stype = 3;
    acc.wfar.rar = 2;
    acc.wfar.oneq=function(){you.cmaff[1]+=30};
    acc.wfar.onuneq=function(){you.cmaff[1]-=30}

    acc.sshl = new Eqp(); acc.sshl.id = 40027;
    acc.sshl.name = 'Star Shell';
    acc.sshl.desc = 'A little shell with a fraction of power of Space within it. It radiates incomprehencible energy when you touch it'+dom.dseparator+'<span style=\'color:gold\'>Raises stats+';
    acc.sshl.slot = 8;
    acc.sshl.stype = 3;
    acc.sshl.rar = 2;
    acc.sshl.oneq=function(){};
    acc.sshl.onuneq=function(){}

    acc.qill = new Eqp(); acc.qill.id = 40028;
    acc.qill.name = 'Quill';
    acc.qill.desc = 'Feather of a large bird, turned into a writing tool '+dom.dseparator+'<span style="color:lime">AGL +5</span>';
    acc.qill.slot = 8;
    acc.qill.stype = 3;
    acc.qill.oneq=function(){you.agla+=5}
    acc.qill.onuneq=function(){you.agla-=5}
    acc.qill.onGet=function(){
      if(acc.bink.have) {giveRcp(rcp.mink); this.onGet=function(){}}
    }

    acc.bink = new Eqp(); acc.bink.id = 40029;
    acc.bink.name = 'Black Ink';
    acc.bink.desc = 'Pitch black Ink, useful in writing. Stains left by it will never come off'+dom.dseparator+'<span style="color:lime">INT +3</span>';
    acc.bink.slot = 8;
    acc.bink.stype = 3;
    acc.bink.oneq=function(){you.inta+=3}
    acc.bink.onuneq=function(){you.inta-=3}
    acc.bink.onGet=function(){
      if(acc.qill.have) {giveRcp(rcp.mink); this.onGet=function(){}}
    }

    acc.mink = new Eqp(); acc.mink.id = 40030;
    acc.mink.name = 'Magic Ink';
    acc.mink.desc = 'Glowing magic ink, used for writing magical and runic inscriptions. '+dom.dseparator+'<span style="color:lime">INT +8</span><br><span style="color:lime">AGL +10</span>';
    acc.mink.slot = 8;
    acc.mink.stype = 3;
    acc.mink.rar = 2;
    acc.mink.oneq=function(){you.inta+=8;you.agla+=10;}
    acc.mink.onuneq=function(){you.inta-=8;you.agla-=10;}

    acc.rfot = new Eqp(); acc.rfot.id = 40031;
    acc.rfot.name = 'Rabbit Foot';
    acc.rfot.desc = 'Lucky charm made from a foot of a rabbit. Wearing this gives you a strange feeling of satisfaction'+dom.dseparator+'<span style="color:gold">LUCK +2</span>';
    acc.rfot.slot = 8;
    acc.rfot.stype = 3;
    acc.rfot.rar = 2;
    acc.rfot.oneq=function(){you.luck+=2}
    acc.rfot.onuneq=function(){you.luck-=2}

    acc.sdl1 = new Eqp(); acc.sdl1.id = 40032;
    acc.sdl1.name = 'Straw Effigy';
    acc.sdl1.desc = 'Small handcrafted straw doll. Dolls of this type are used to bind with the souls of the living. Appropriate for Curses and Dark Magic manipulation'+dom.dseparator+'<span style="color:hotpink">Physical DEF +5</span>';
    acc.sdl1.slot = 8;
    acc.sdl1.stype = 3;
    acc.sdl1.oneq=function(){you.caff[0]+=5;}
    acc.sdl1.onuneq=function(){you.caff[0]-=5;}
    acc.sdl1.onGet=function(){if(acc.bdl1.have&&acc.wdl1.have) {giveRcp(rcp.gdl1); this.onGet=function(){}}}

    acc.lckcn = new Eqp(); acc.lckcn.id = 40033;
    acc.lckcn.name = 'Lucky Coin';
    acc.lckcn.desc = 'Special little coin, unlike any other. You have a feeling you should hold onto it'+dom.dseparator+'<span style="color:gold">LUCK +3</span>';
    acc.lckcn.slot = 8;
    acc.lckcn.stype = 3;
    acc.lckcn.oneq=function(){you.luck+=3;}
    acc.lckcn.onuneq=function(){you.luck-=3;}
    acc.lckcn.onGet=function(){if(acc.cfgn.have) {giveRcp(rcp.mnknk); this.onGet=function(){}}}

    acc.cfgn = new Eqp(); acc.cfgn.id = 40034;
    acc.cfgn.name = 'Cat Figurine';
    acc.cfgn.desc = 'Small figurine of a cat. It eminates powerful energy'+dom.dseparator+'<span style="color:deeppink">Energy Effectiveness +5%</span>';
    acc.cfgn.slot = 8;
    acc.cfgn.stype = 3;
    acc.cfgn.oneq=function(){you.mods.sbonus+=.05}
    acc.cfgn.onuneq=function(){you.mods.sbonus-=.05}
    acc.cfgn.onGet=function(){if(acc.lckcn.have) {giveRcp(rcp.mnknk); this.onGet=function(){}}}

    acc.mnknk = new Eqp(); acc.mnknk.id = 40035;
    acc.mnknk.name = 'Maneki-Neko';
    acc.mnknk.desc = 'Little statue of a Divine Cat holding a Coin. This treasure is rumored to bring luck and prosperity to its owner'+dom.dseparator+'<span style="color:gold">LUCK +4</span><br><span style="color:deeppink">Energy Effectiveness +10%</span>';
    acc.mnknk.slot = 8;
    acc.mnknk.stype = 3;
    acc.mnknk.rar= 2;
    acc.mnknk.oneq=function(){you.luck+=4;you.mods.sbonus+=.1;}
    acc.mnknk.onuneq=function(){you.luck-=4;you.mods.sbonus-=.1;}

    acc.wdl1 = new Eqp(); acc.wdl1.id = 40036;
    acc.wdl1.name = 'Wood Effigy';
    acc.wdl1.desc = 'Small wooden doll with flexible joints. This type can be used, with Dark enchantment, to take control of living things.'+dom.dseparator+'<span style="color:crimson">Piercing DEF +5</span><br><span style="color:crimson">Edged DEF +5</span><br><span style="color:crimson">Blunt DEF +5</span>';
    acc.wdl1.ccls=[5,5,5];
    acc.wdl1.slot = 8;
    acc.wdl1.stype = 3;
    acc.wdl1.oneq=function(){for(let afn=0;afn<this.ccls.length;afn++)you.ccls[afn]+=this.ccls[afn]};
    acc.wdl1.onuneq=function(){for(let afn=0;afn<this.ccls.length;afn++)you.ccls[afn]-=this.ccls[afn]};
    acc.wdl1.onGet=function(){if(acc.sdl1.have&&acc.bdl1.have) {giveRcp(rcp.gdl1); this.onGet=function(){}}}

    acc.gdl1 = new Eqp(); acc.gdl1.id = 40037;
    acc.gdl1.name = 'Soul Puppet';
    acc.gdl1.desc = 'Dolls that could be remotely controlled by one\'s soul. Employed by spies to infiltrate enemy lines unnoticed'+dom.dseparator+'<span style="color:crimson">Piercing DEF +4</span><br><span style="color:crimson">Edged DEF +4</span><br><span style="color:crimson">Blunt DEF +4</span><br><span style="color:thistle;text-shadow:blueviolet 0px 0px 5px">Dark RES +6</span><br><span style="color:royalblue;text-shadow:blueviolet 0px 0px 5px">Evil Class DEF +2</span><br><span style="color:hotpink">Physical DEF +3</span>';
    acc.gdl1.ccls=[4,4,4];
    acc.gdl1.slot = 8;
    acc.gdl1.stype = 3;
    acc.gdl1.rar = 2;
    acc.gdl1.oneq=function(){you.caff[0]+=3;you.caff[6]+=2;for(let afn=0;afn<this.ccls.length;afn++)you.ccls[afn]+=this.ccls[afn];you.cmaff[3]+=6}
    acc.gdl1.onuneq=function(){you.caff[0]-=3;you.caff[6]-=2;for(let afn=0;afn<this.ccls.length;afn++)you.ccls[afn]-=this.ccls[afn];you.cmaff[3]-=6}

    acc.rnsn = new Eqp(); acc.rnsn.id = 40038;
    acc.rnsn.name = 'Rain Stone';
    acc.rnsn.desc = 'This stone, eroded by years of rain, can actually mimic rain to fool plants and animals. For this reason, it\'s in high demand for horticultural use'+dom.dseparator+'';
    acc.rnsn.slot = 8;
    acc.rnsn.stype = 3;

    acc.hndm = new Eqp(); acc.hndm.id = 40039;
    acc.hndm.name = 'Fey Hound Mane';
    acc.hndm.desc = 'A tuft of a fey hound\'s mane, said to ward off evil. It raises resistance to heat and cold'+dom.dseparator+'';
    acc.hndm.slot = 8;
    acc.hndm.stype = 3;

    acc.dcpe = new Eqp(); acc.dcpe.id = 40040;
    acc.dcpe.name = 'Deception Eye';
    acc.dcpe.desc = 'A mysterious gem. It feels like it\'s looking at something, but you can\'t really tell'+dom.dseparator+'';
    acc.dcpe.slot = 8;
    acc.dcpe.stype = 3;

    acc.bdl1 = new Eqp(); acc.bdl1.id = 40041;
    acc.bdl1.name = 'Bone Doll';
    acc.bdl1.desc = 'A small doll carved from beast bone. It\'s a charm that protects the wearer from evil'+dom.dseparator+'<span style="color:thistle;text-shadow:blueviolet 0px 0px 5px">Dark RES +5</span><br><span style="color:royalblue;text-shadow:blueviolet 0px 0px 5px">Evil Class DEF +5</span>';
    acc.bdl1.slot = 8;
    acc.bdl1.stype = 3;
    acc.bdl1.oneq=function(){you.caff[6]+=5;you.cmaff[3]+=5}
    acc.bdl1.onuneq=function(){you.caff[6]-=5;you.cmaff[3]-=5;}
    acc.bdl1.onGet=function(){if(acc.sdl1.have&&acc.wdl1.have) {giveRcp(rcp.gdl1); this.onGet=function(){}}}

    acc.fssn = new Eqp(); acc.fssn.id = 40042;
    acc.fssn.name = 'Bonefish Spine'
    acc.fssn.desc = 'A spine taken from a bonefish, which are still keen in undeath. It\'s said to raise spiritual awareness of the holder'+dom.dseparator+'';
    acc.fssn.slot = 8;
    acc.fssn.stype = 3;

    acc.mpst = new Eqp(); acc.mpst.id = 40043;
    acc.mpst.name = 'Mortar and Pestle';
    acc.mpst.desc = 'A basic stone bowl and a pounder used to mince and crush herbs, seeds, bones and other pharmaceutical oddities'+dom.dseparator+'<span style="color:deeppink">Alchemy EXP gain +5%</span><br><br><small style="color:deeppink">Alchemy quality:<span style="color:orange"> 1</span></small>';
    acc.mpst.slot = 8; acc.mpst.alchq = 1;
    acc.mpst.stype = 3;
    acc.mpst.oneq=function(){skl.alch.p+=.05}
    acc.mpst.onuneq=function(){skl.alch.p-=.05}
    acc.mpst.onGet=function(){if(acc.mpst.have&&acc.mshst.have&&acc.mhhst) {giveRcp(rcp.alseto); this.onGet=function(){}}}

    acc.vtmns = new Eqp(); acc.vtmns.id = 40044;
    acc.vtmns.name = 'Vitamins';
    acc.vtmns.desc = 'A bottle of powerful vitamins, which grant one\'s body incresed vitality'+dom.dseparator+'<span style="color:limegreen">Poison resist +5%</span>';
    acc.vtmns.slot = 8;
    acc.vtmns.stype = 3;
    acc.vtmns.oneq=function(){you.res.poison-=.05}
    acc.vtmns.onuneq=function(){you.res.poison+=.05}
    acc.vtmns.onGet=function(){if(acc.mdcag.have&&acc.vtmns.have) {giveRcp(rcp.mdcbg); this.onGet=function(){}}}

    acc.mdcag = new Eqp(); acc.mdcag.id = 40045;
    acc.mdcag.name = 'Adhesive Bandage';
    acc.mdcag.desc = 'Bandage, boiled in hot water and sterilized using herbs'+dom.dseparator+'<span style="color:chartreuse">Bleed resist +5%</span>';
    acc.mdcag.slot = 8;
    acc.mdcag.stype = 3;
    acc.mdcag.oneq=function(){you.res.bleed-=.05}
    acc.mdcag.onuneq=function(){you.res.bleed+=.05}
    acc.mdcag.onGet=function(){if(acc.mdcag.have&&acc.vtmns.have) {giveRcp(rcp.mdcbg); this.onGet=function(){}}}

    acc.mdcbg = new Eqp(); acc.mdcbg.id = 40046;
    acc.mdcbg.name = 'Medicated Bandage';
    acc.mdcbg.desc = 'Sterile bandage soaked in strong medical solution'+dom.dseparator+'<span style="color:chartreuse">Bleed resist +8%</span><br><span style="color:limegreen">Poison resist +8%</span>';
    acc.mdcbg.slot = 8;
    acc.mdcbg.stype = 3;
    acc.mdcbg.rar = 2;
    acc.mdcbg.oneq=function(){you.res.bleed-=.08;you.res.poison-=.08}
    acc.mdcbg.onuneq=function(){you.res.bleed+=.08;you.res.poison+=.08}

    acc.mshst = new Eqp(); acc.mshst.id = 40047; //🝪
    acc.mshst.name = 'Retort';
    acc.mshst.desc = 'Alchemical vessel used for distilling, important for vapor separation'+dom.dseparator+'<span style="color:deeppink">Alchemy EXP gain +10%</span><br><br><small style="color:deeppink">Alchemy quality:<span style="color:orange"> 1</span></small>';
    acc.mshst.slot = 8; acc.mshst.alchq = 1;
    acc.mshst.stype = 3;
    acc.mshst.oneq=function(){skl.alch.p+=.1}
    acc.mshst.onuneq=function(){skl.alch.p-=.1}
    acc.mshst.onGet=function(){if(acc.mpst.have&&acc.mshst.have&&acc.mhhst) {giveRcp(rcp.alseto); this.onGet=function(){}}}

    acc.mhhst = new Eqp(); acc.mhhst.id = 40048;
    acc.mhhst.name = 'Alembic';
    acc.mhhst.desc = 'Alchemical vessel used in distilling, especially useful for cooling'+dom.dseparator+'<span style="color:deeppink">Alchemy EXP gain +15%</span><br><br><small style="color:deeppink">Alchemy quality:<span style="color:orange"> 1</span></small>';
    acc.mhhst.slot = 8; acc.mhhst.alchq = 1;
    acc.mhhst.stype = 3;
    acc.mhhst.oneq=function(){skl.alch.p+=.15}
    acc.mhhst.onuneq=function(){skl.alch.p-=.15}
    acc.mhhst.onGet=function(){if(acc.mpst.have&&acc.mshst.have&&acc.mhhst) {giveRcp(rcp.alseto); this.onGet=function(){}}}

    acc.asfk = new Eqp(); acc.asfk.id = 40049;
    acc.asfk.name = 'Alchemical Flask';
    acc.asfk.desc = 'A sealed flask with some vicious limegreen bubbling liquid moving inside. Opening this thing is a very bad idea'+dom.dseparator+'<span style="color:chartreuse">Damage reduction +3%</span>';
    acc.asfk.slot = 8; 
    acc.asfk.stype = 3;
    acc.asfk.oneq=function(){you.res.ph-=.03}
    acc.asfk.onuneq=function(){you.res.ph+=.03}

    acc.alseto = new Eqp(); acc.alseto.id = 40050;
    acc.alseto.name = 'Basic Alchemy Set';
    acc.alseto.desc = 'Wide variety of aberrant glassware and precision tools for all types of entry level alchemy-based manipulations. A necessity for making basic medicine, pills, poisons, elixirs and everything inbetween'+dom.dseparator+'<span style="color:deeppink">Alchemy EXP gain +50%</span><br><br><small style="color:deeppink">Alchemy quality:<span style="color:orange"> 2</span></small><br><br>';
    acc.alseto.slot = 8; acc.alseto.alchq = 2;
    acc.alseto.stype = 3;
    acc.alseto.int = 15;
    acc.alseto.rar = 2;
    acc.alseto.oneq=function(){skl.alch.p+=.5}
    acc.alseto.onuneq=function(){skl.alch.p-=.5}

    acc.csfk = new Eqp(); acc.csfk.id = 40051;
    acc.csfk.name = 'Corrupt Flask';
    acc.csfk.desc = 'Glass container with an evil essence trapped inside of it. It is trying to break free'+dom.dseparator+'<span style="color:thistle;text-shadow:blueviolet 0px 0px 5px">Dark RES +10</span>';
    acc.csfk.slot = 8;
    acc.csfk.stype = 3;
    acc.csfk.oneq=function(){you.caff[6]+=10}
    acc.csfk.onuneq=function(){you.caff[6]-=10}

    acc.gsfk = new Eqp(); acc.gsfk.id = 40052;
    acc.gsfk.name = 'Plague Flask';
    acc.gsfk.desc = 'Locked vessel containing a volatile tissue sample from the plague beast. Should be handled with extreme care and must not be unsealed under any circumstances'+dom.dseparator+'<span style="color:chartreuse">Damage reduction +4%</span><br><span style="color:thistle;text-shadow:blueviolet 0px 0px 5px">Dark RES +35</span>';
    acc.gsfk.slot = 8;
    acc.gsfk.stype = 3;
    acc.gsfk.rar = 2;
    acc.gsfk.oneq=function(){you.res.ph-=.04;you.caff[6]+=35}
    acc.gsfk.onuneq=function(){you.res.ph+=.04;you.caff[6]-=35}

    acc.jln1 = new Eqp(); acc.jln1.id = 40053;
    acc.jln1.name = 'Life Jelly';
    acc.jln1.desc = 'Concentrated red jelly. Improves life force'+dom.dseparator+'<span style="color:chartreuse">MAX HP +400</span>';
    acc.jln1.slot = 8;
    acc.jln1.stype = 3;
    acc.jln1.oneq=function(){you.hpa+=400}
    acc.jln1.onuneq=function(){you.hpa-=400}

    acc.jln2 = new Eqp(); acc.jln2.id = 40054;
    acc.jln2.name = 'Stamina Jelly';
    acc.jln2.desc = 'Concentrated green jelly. Improves stamina'+dom.dseparator+'<span style="color:chartreuse">MAX SAT +100</span>';
    acc.jln2.slot = 8;
    acc.jln2.stype = 3;
    acc.jln2.oneq=function(){you.sat+=100; you.sata+=100;}
    acc.jln2.onuneq=function(){you.sat-=100; you.sata-=100;}

    acc.jln3 = new Eqp(); acc.jln3.id = 40055;
    acc.jln3.name = 'Vital Jelly';
    acc.jln3.desc = 'Concentrated blue jelly. Improves metabolism'+dom.dseparator+'<span style="color:chartreuse">SPD +2</span><br><span style="color:crimson">Energy Consumtion +0.2\/s</span>';
    acc.jln3.slot = 8;
    acc.jln3.stype = 3;
    acc.jln3.oneq=function(){you.spda+=2;you.mods.sdrate+=.2}
    acc.jln3.onuneq=function(){you.spda-=2;you.mods.sdrate-=.2}

    acc.jln4 = new Eqp(); acc.jln4.id = 40056;
    acc.jln4.name = 'Grand Gelatin';
    acc.jln4.desc = 'proc';
    acc.jln4.slot = 8;
    acc.jln4.stype = 3;
    acc.jln4.rar = 2;
    acc.jln4.oneq=function(){you.spda+=2;you.mods.sdrate+=.2}
    acc.jln4.onuneq=function(){you.spda-=2;you.mods.sdrate-=.2}

    acc.mstone = new Eqp(); acc.mstone.id = 40057;
    acc.mstone.name = 'Moon Stone';
    acc.mstone.desc = 'proc';
    acc.mstone.slot = 8;
    acc.mstone.stype = 3;

    acc.sstone = new Eqp(); acc.sstone.id = 40058;
    acc.sstone.name = 'Sun Stone';
    acc.sstone.desc = 'proc';
    acc.sstone.slot = 8;
    acc.sstone.stype = 3;

    acc.cstone = new Eqp(); acc.cstone.id = 40059;
    acc.cstone.name = 'Celestial Stone';
    acc.cstone.desc = 'proc';
    acc.cstone.slot = 8;
    acc.cstone.stype = 3;
    acc.cstone.rar = 2;

    acc.coring = new Eqp(); acc.coring.id = 40060;
    acc.coring.name = 'Coin Ring';
    acc.coring.desc = 'Golden ring whith runic engraving of a coin on it. Rumored to attract wealth '+dom.dseparator+'<span style="color:orange">Defeated enemies occasionally drop money</span>';
    acc.coring.slot = 8;
    acc.coring.stype = 3;
    acc.coring.rar = 2;
    acc.coring.oneq=function(){you.mods.enmondren+=.01}
    acc.coring.onuneq=function(){you.mods.enmondren-=.01}

    acc.dticket = new Eqp(); acc.dticket.id = 40061;
    acc.dticket.name = 'Discount Ticket';
    acc.dticket.desc = 'Small ticket that allows you to buy things for cheaper, if you show it to the shopkeeper. Sometimes given to random customers for promotional purposes '+dom.dseparator+'<span style="color:thistle">Shop price reduction -1%</span>';
    acc.dticket.slot = 8;
    acc.dticket.stype = 3;
    acc.dticket.onGet=function(){let b=0;for(let a in inv) if(inv[a].id===this.id)b++; if(b>=5) giveRcp(rcp.dcard1)}
    acc.dticket.oneq=function(){you.mods.infsrate-=.01;recshop();}
    acc.dticket.onuneq=function(){you.mods.infsrate+=.01;recshop();}

    acc.dcard1 = new Eqp(); acc.dcard1.id = 40062;
    acc.dcard1.name = 'Discount Card';
    acc.dcard1.desc = 'A card given to the most loyal customers in popular shops'+dom.dseparator+'<span style="color:thistle">Shop price reduction -5%</span>';
    acc.dcard1.slot = 8;
    acc.dcard1.stype = 3;
    acc.dcard1.rar = 2;
    acc.dcard1.oneq=function(){you.mods.infsrate-=.05;recshop();}
    acc.dcard1.onuneq=function(){you.mods.infsrate+=.05;recshop();}

    acc.rgreed = new Eqp(); acc.rgreed.id = 40063;
    acc.rgreed.name = 'Ring of Greed';
    acc.rgreed.desc = 'Expensive ring employed by rich merchants and gamblers. Makes you seem like a symbol of authority, brings tremendous luck and helps during negotiations'+dom.dseparator+'<span style="color:orange">Defeated enemies sometimes drop money</span><br><span style="color:gold">+15% dropped money</span><br><span style="color:thistle">Shop price reduction -10%</span>';
    acc.rgreed.slot = 8;
    acc.rgreed.stype = 3;
    acc.rgreed.rar = 3;
    acc.rgreed.oneq=function(){you.mods.infsrate-=.1;you.mods.enmondren+=.03;recshop();}
    acc.rgreed.onuneq=function(){you.mods.infsrate+=.1;you.mods.enmondren-=.03;recshop();}

    acc.medl1 = new Eqp(); acc.medl1.id = 40064;
    acc.medl1.name = 'Moon Medal';
    acc.medl1.desc = 'proc';
    acc.medl1.slot = 8;
    acc.medl1.stype = 3;

    acc.medl2 = new Eqp(); acc.medl2.id = 40065;
    acc.medl2.name = 'Little Light Medal';
    acc.medl2.desc = 'proc';
    acc.medl2.slot = 8;
    acc.medl2.stype = 3;

    acc.medl3 = new Eqp(); acc.medl3.id = 40066;
    acc.medl3.name = 'Moonlight Medal';
    acc.medl3.desc = 'proc';
    acc.medl3.slot = 8;
    acc.medl3.stype = 3;
    acc.medl3.rar = 2;

    acc.medl4 = new Eqp(); acc.medl4.id = 40067;
    acc.medl4.name = 'White Boar Medal';
    acc.medl4.desc = 'proc';
    acc.medl4.slot = 8;
    acc.medl4.stype = 3;

    acc.medl5 = new Eqp(); acc.medl5.id = 40068;
    acc.medl5.name = 'Jade Skin Medal';
    acc.medl5.desc = 'proc';
    acc.medl5.slot = 8;
    acc.medl5.stype = 3;

    acc.medl6 = new Eqp(); acc.medl6.id = 40069;
    acc.medl6.name = 'White Jade Medal';
    acc.medl6.desc = 'proc';
    acc.medl6.slot = 8;
    acc.medl6.stype = 3;
    acc.medl6.rar = 2;

    acc.coindct = new Eqp(); acc.coindct.id = 40070;
    acc.coindct.name = 'Coin of Deceit';
    acc.coindct.desc = 'Crooked tainted coin with seemingly evil aura floating about it'+dom.dseparator+'<span style="color:royalblue">Crit Chance +3%</span>';
    acc.coindct.slot = 8;
    acc.coindct.stype = 3;
    acc.coindct.oneq=function(){you.mods.crflt+=.03;}
    acc.coindct.onuneq=function(){you.mods.crflt-=.03;}

    acc.slchth = new Eqp(); acc.slchth.id = 40071;
    acc.slchth.name = 'Silencing Sheath';
    acc.slchth.desc = 'Light conciealed sheath for storing small knives and other assassin tools. Unconspicous and easy to use, it is favoured by the agents of the Underworld'+dom.dseparator+'<span style="color:mediumpurple">Crit Damage +15%</span>';
    acc.slchth.slot = 8;
    acc.slchth.stype = 3;
    acc.slchth.oneq=function(){you.mods.cpwr+=.15;}
    acc.slchth.onuneq=function(){you.mods.cpwr-=.15;}

    acc.rmedlon = new Eqp(); acc.rmedlon.id = 40072;
    acc.rmedlon.name = 'Ruin Medallion';
    acc.rmedlon.desc = 'Evil Medallion imbued with the curse of misforture. Brings terrible luck to everyone around its bearer'+dom.dseparator+'<span style="color:royalblue">Crit Chance +6%</span>';
    acc.rmedlon.slot = 8;
    acc.rmedlon.stype = 3;
    acc.rmedlon.rar = 2;
    acc.rmedlon.oneq=function(){you.mods.crflt+=.06;}
    acc.rmedlon.onuneq=function(){you.mods.crflt-=.06;}

    acc.mirgmirr = new Eqp(); acc.mirgmirr.id = 40073;
    acc.mirgmirr.name = 'Mirage Mirror';
    acc.mirgmirr.desc = 'Mirror of clouded darkness. It bends light around you.'+dom.dseparator+'<span style="color:royalblue">Reduces enemy aggression<br>Auto Dodge +10%</span>';
    acc.mirgmirr.slot = 8;
    acc.mirgmirr.stype = 3;
    acc.mirgmirr.oneq=function(){you.mods.ddgmod+=.1;}
    acc.mirgmirr.onuneq=function(){you.mods.ddgmod-=.1;}

    acc.aihomnt = new Eqp(); acc.aihomnt.id = 40074;
    acc.aihomnt.name = 'Airia Hair Ornament';
    acc.aihomnt.desc = 'An ornament made of light magic ore. Wraps the wearer with a thin magic barrier'+dom.dseparator+'<span style="color:royalblue">Reduces enemy aggression<br>Magic DEF +15</span>';
    acc.aihomnt.slot = 8;
    acc.aihomnt.stype = 3;
    acc.aihomnt.oneq=function(){}
    acc.aihomnt.onuneq=function(){}

    acc.gourd1 = new Eqp(); acc.gourd1.id = 40075;
    acc.gourd1.name = 'Gourd';
    acc.gourd1.desc = 'One of the oldest crop plants in existence. You can use it to store water... or sake'+dom.dseparator+'<span style="color:chartreuse">Max SAT +150</span>';
    acc.gourd1.slot = 8;
    acc.gourd1.stype = 3;
    acc.gourd1.oneq=function(){you.sat+=150; you.sata+=150;}
    acc.gourd1.onuneq=function(){you.sat-=150; you.sata-=150;}

    acc.stupa = new Eqp(); acc.stupa.id = 40076;
    acc.stupa.name = 'Stupa';
    acc.stupa.desc = 'Stupa are long boards placed next to graves to pay respects to the dead. They are usually to be written with an ink brush'+dom.dseparator+'<span style="color:ghostwhite;text-shadow:0px 0px 5px royalblue">Keeps your soul in the mortal world</span><br><span style="color:ghostwhite;text-shadow:0px 0px 5px royalblue">+2% Chance To Avoid Death</span>';
    acc.stupa.slot = 8;
    acc.stupa.stype = 3;
    acc.stupa.oneq=function(){you.res.death-=.02}
    acc.stupa.onuneq=function(){you.res.death+=.02}

    acc.wpeny = new Eqp(); acc.wpeny.id = 40077;
    acc.wpeny.name = 'Penny of Wealth';
    acc.wpeny.desc = 'An extra shiny penny, that looks like it\'s made of gold. It probably isn\'t, but you feel richer just by holding it'+dom.dseparator+'<span style="color:orange">Picking a coin gives you an extra coin<br><span style="color:gold">Greed EXP gain +20%</span></span>';
    acc.wpeny.slot = 8;
    acc.wpeny.stype = 3;
    acc.wpeny.oneq=function(){skl.gred.p+=.2;you.mods.wthexrt++}
    acc.wpeny.onuneq=function(){skl.gred.p-=.2;you.mods.wthexrt--}

    acc.rngsgn = new Eqp(); acc.rngsgn.id = 40078;
    acc.rngsgn.name = 'Signet Ring';
    acc.rngsgn.desc = 'A gold and silver ring with a wide stamp attached to the band. A long time ago, the stamp was legible, but now the pattern is too worn to discern its former use';
    acc.rngsgn.slot = 8;
    acc.rngsgn.stype = 3;

    acc.fmlim = new Eqp(); acc.fmlim.id = 40079; acc.fmlim.important=true;
    acc.fmlim.name = 'Family Heirloom';
    acc.fmlim.desc = 'A treasure passed down in your family. This plain looking medalion doesn\'t look anything special, it appears incomplete with an empty socket in the center. You fail to see any value in this piece of junk'+dom.dseparator+'<span style="color:chartreuse">MAX HP +2</span>'
    acc.fmlim.slot = 8;
    acc.fmlim.stype = 3;
    acc.fmlim.oneq=function(){you.hpa+=2}
    acc.fmlim.onuneq=function(){you.hpa-=2}
    acc.fmlim.onGet=function(){if(acc.strawp.have) {giveRcp(rcp.fmlim2); this.onGet=function(){}}}

    acc.pbrs = new Eqp(); acc.pbrs.id = 40080;
    acc.pbrs.name = 'Pet Brush';
    acc.pbrs.desc = 'Special brush designed for tending to fur of the animals. Cats especially enjoy being brushed by this tool'+dom.dseparator+'<span style="color:deeppink">Petting EXP gain +200%</span>';
    acc.pbrs.slot = 8;
    acc.pbrs.stype = 3;
    acc.pbrs.oneq=function(){skl.pet.p+=2;}
    acc.pbrs.onuneq=function(){skl.pet.p-=2;}

    acc.clrpin = new Eqp(); acc.clrpin.id = 40081;
    acc.clrpin.name = 'Clover Pin';
    acc.clrpin.desc = 'Small golden pin in a shape of a clover. Senior gamblers wear these pins to display their prestige and status'+dom.dseparator+'<span style="color:gold">Minor chance for an enemy dropped item to duplicate</span>';
    acc.clrpin.slot = 8;
    acc.clrpin.stype = 3;
    acc.clrpin.rar = 4;
    acc.clrpin.oneq=function(){you.mods.lkdbt+=.01;}
    acc.clrpin.onuneq=function(){you.mods.lkdbt-=.01;}

    acc.prtckst = new Eqp(); acc.prtckst.id = 40082;
    acc.prtckst.name = 'Portable Cooking Set';
    acc.prtckst.desc = 'Box-sized kit containing every crucial cooking utencil you may need for comfortable and effortless foodmaking session anywhere at any time, complimented with variously sized knives, cutting boards, pots and even everlasting fire burner'+dom.dseparator+'<span style="color:deeppink">Cooking EXP gain +200%</span><br><span style="color:springgreen">Allows cooking everywhere</span>';
    acc.prtckst.slot = 8;
    acc.prtckst.stype = 3;
    acc.prtckst.rar = 3;
    acc.prtckst.oneq=function(){skl.cook.p+=2;you.mods.ckfre+=1}
    acc.prtckst.onuneq=function(){skl.cook.p-=2;you.mods.ckfre-=1}

    acc.ubrlc = new Eqp(); acc.ubrlc.id = 40083;
    acc.ubrlc.name = 'Umbrella';
    acc.ubrlc.desc = 'Light umbrella with a cloud pattern. Young masters and ladies carry these to display their carefree nature'+dom.dseparator+'<span style="color:cyan;background-color:blue">Prevents you from getting rained on</span>';
    acc.ubrlc.slot = 8;
    acc.ubrlc.stype = 3;
    acc.ubrlc.oneq=function(){you.mods.rnprtk+=1;}
    acc.ubrlc.onuneq=function(){you.mods.rnprtk-=1;}

    acc.sltbg = new Eqp(); acc.sltbg.id = 40084;
    acc.sltbg.name = 'Bag of Salt';
    acc.sltbg.desc = 'Little canvas bag filled with salt. Commoners believe that spreading salt can repel evil, so you can keep some on yourself for protection'+dom.dseparator+'<span style="color:tomato;text-shadow:blueviolet 0px 0px 5px">Undead Class DEF +12</span><br><span style="color:tomato;text-shadow:blueviolet 0px 0px 5px">Undead Class ATK +8</span>';
    acc.sltbg.slot = 8;
    acc.sltbg.stype = 3;
    acc.sltbg.oneq=function(){you.cmaff[2]+=12;you.maff[2]+=8}
    acc.sltbg.onuneq=function(){you.cmaff[2]-=12;you.maff[2]-=8}

    acc.chlsbd = new Eqp(); acc.chlsbd.id = 40085;
    acc.chlsbd.name = 'Chalice';
    acc.chlsbd.desc = function(x,y){
      return '<div style="color:red">Collected blood: <br><span>0ml</span><span style="display:inline-table;width:130px;border:1px solid darkgrey;margin: 7px;background:linear-gradient(90deg,#690000,red)"><span style="display:block;background-color:black;float:right;width:'+(100-x.data.bld/x.data.bldmax*100)+'%">　</span></span><span>'+x.data.bldmax+'ml</span></div>'
    }
    acc.chlsbd.slot = 8; acc.chlsbd.data.bld=0; acc.chlsbd.data.bldmax=200; 
    acc.chlsbd.stype = 3; 
    acc.chlsbd.onKill=function(x,y){if((x.type===1||x.type===0||x.type===5)&&x.blood){if(y.data.bld+x.blood*5>y.data.bldmax)y.data.bld=y.data.bldmax;else y.data.bld+=x.blood*5}}
    acc.chlsbd.oneq=function(){checksd.push({f:this.onKill,o:this})}
    acc.chlsbd.onuneq=function(){checksd.splice(checksd.indexOf({f:this.onKill,o:this}),1)}

    acc.otpin = new Eqp(); acc.otpin.id = 40086;
    acc.otpin.name = 'Sword Medal';
    acc.otpin.desc = 'Wearable ornament in the shape of a sword. Even if ranking the lowest, it serves as a proof of one\'s affiliation with dojo and martial arts in general'+dom.dseparator+'<span style="color:magenta"> EXP Gain +25%<br>All masteries EXP Gain +10%</span>';
    acc.otpin.slot = 8;
    acc.otpin.stype = 3;
    acc.otpin.oneq=function(){skl.unc.p+=.1;skl.srdc.p+=.1;skl.knfc.p+=.1;skl.axc.p+=.1;skl.plrmc.p+=.1;skl.stfc.p+=.1;skl.bwc.p+=.1;skl.hmrc.p+=.1;you.exp_t+=.25}
    acc.otpin.onuneq=function(){skl.unc.p-=.1;skl.srdc.p-=.1;skl.knfc.p-=.1;skl.axc.p-=.1;skl.plrmc.p-=.1;skl.stfc.p-=.1;skl.bwc.p-=.1;skl.hmrc.p-=.1;you.exp_t-=.25}

    acc.fmlim2 = new Eqp(); acc.fmlim2.id = 40087; acc.fmlim2.important=true;
    acc.fmlim2.name = 'Family Heirloom+';
    acc.fmlim2.desc = 'You reinforced your family pendant\'s string with straw to prevent possible breaking. It looks even more lame like this'+dom.dseparator+'<span style="color:chartreuse">MAX HP +5<br>Max SAT +25<br>SPD +1</span>'
    acc.fmlim2.slot = 8;
    acc.fmlim2.stype = 3;
    acc.fmlim2.oneq=function(){you.hpa+=5;you.sata+=25;you.spda+=1}
    acc.fmlim2.onuneq=function(){you.hpa-=5;you.sata-=25;you.spda-=1}

    acc.gpin = new Eqp(); acc.gpin.id = 40088;
    acc.gpin.name = 'Fighter Insignia';
    acc.gpin.desc = 'Ring tempered by unending fighter spirit, was formerly owned by a rookie knight'+dom.dseparator+'<span style="color:chartreuse">STR +20<br>AGL +5</span>'
    acc.gpin.slot = 8;
    acc.gpin.stype = 3;
    acc.gpin.oneq=function(){you.stra+=20;you.agla+=5}
    acc.gpin.onuneq=function(){you.stra-=20;you.agla-=5}

    acc.ndlb = new Eqp(); acc.ndlb.id = 40089;
    acc.ndlb.name = 'Wooden Needle';
    acc.ndlb.desc = 'Very primitive needle crafted from tough wood. Despite its simplicity, the craftsmanship is quiet nice'+dom.dseparator+'<span style="color:magenta">Tailoring EXP Gain +10%</span><br><br><small style="color:deeppink">Tailoring quality:<span style="color:orange"> 1</span></small>'
    acc.ndlb.slot = 8; acc.ndlb.tlrq = 1;
    acc.ndlb.stype = 3;
    acc.ndlb.oneq=function(){skl.tlrng.p+=.1}
    acc.ndlb.onuneq=function(){skl.tlrng.p-=.1}

    /*
    Orlandu  - "Actonite containing a fragment of Orlandu's skeleton"
    Ogimus   - "Amethyst containing Ogmious the Guardian's soul"
    Balvus   - "Chiastrite containing the ashes of Balvus"
    Beowulf  - "Moon Zircon"
    Sigguld  - "Fire agate with the soul of Sigguld the Dragoon"
    Altema   - "Garnet containing Altema the Fallen's spirit"
    Haeralis - "Star sapphire with the power of Haeralis the Brave"
    Orion    - "Black coral holding the hair of Orion the Beast"
    Iocus    - "Lazurite containing St. Iocus's prayer"
    Trinity  - "Jade containing the Nordic holy spirits"
    Dragonite - "Serpentine containing a dragon's power"
    Demonia - "Blood opal containing the blood of devils"

    suffering
    resentment
    */
}

window.define_items = define_items;
window.define_weapons = define_weapons;
window.define_equipment = define_equipment;
window.define_shields = define_shields;
window.define_accessories = define_accessories;
