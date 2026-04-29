function define_dom_references() { // @Todo organize
    dom.dseparator = '<div class="dseparator">　</div>';
    dom.coincopper = '<small style="color:rgb(255, 116, 63)">●</small>';
    dom.coinsilver = '<small style="color:rgb(192, 192, 192)">●</small>';
    dom.coingold = '<small style="color:rgb(255, 215, 0)">●</small>';

    dom.d0 = addElement(document.body,'div','d1','d');
    dom.d1 = addElement(dom.d0,'div');
    dom.d101 = addElement(dom.d0,'div','se_i'); 
    dom.d2c = addElement(dom.d1,'div',null,'d2'); 

    if (!global.flags.aw_u) dom.d0.style.display = 'none';

    // player stats container
    dom.d2 = addElement(dom.d2c,'div');
    dom.d2.innerHTML = you.name; 
    dom.d2_a = addElement(dom.d2c,'input','nch'); 
    dom.d2_a.addEventListener('focusin',function() {
        dom.d2_a.value = you.name;
        you.name = '';
        dom.d2.innerHTML = '　';
    });
    dom.d2_a.addEventListener('focusout',function() {
        you.name = dom.d2_a.value;
        dom.d2_a.value = '';
        dom.d2.innerHTML = you.name;
    });
    addDesc(dom.d2c,null,2,you.name,you.desc);

    // titles
    dom.d3 = addElement(dom.d1,'div',null,'d3');
    dom.d3.innerHTML = ' lvl:'+you.lvl+' \''+you.title.name+'\'';
    dom.d3.addEventListener('click',function() {
        if (!global.flags.ttlscrnopn) {
            global.flags.ttlscrnopn = true;
            dom.ttlcont = addElement(document.body,'div','youttlc'); 
            dom.ttlhead = addElement(dom.ttlcont,'div','youttlh');
            dom.ttlhead.innerHTML = 'SELECT YOUR TITLE';
            dom.ttlbd = addElement(dom.ttlcont,'div');
            dom.ttlbd.style.overflow = 'auto';
            dom.ttlbd.style.maxHeight = (window.innerHeight - 330) + 'px';

            for(let obj in global.titles) {
                let ttlent = addElement(dom.ttlbd,'div',null,'youttl');
                let title = global.titles[obj];
                if (obj===0) {
                    ttlent.style.borderTop='';
                }
                ttlent.innerHTML='"'+title.name+'"';
                if(global.titles[obj].talent) {
                    ttlent.innerHTML+=" <span style='color:yellow;text-shadow:0px 0px 5px orange'>*</span>"
                }
                addDesc(ttlent,title,5);
                ttlent.addEventListener('click',function() {
                    you.title=title;
                    empty(dom.ttlcont);
                    document.body.removeChild(dom.ttlcont);
                    dom.d3.innerHTML = ' lvl:' + you.lvl + ' \'' + you.title.name + '\'';
                    empty(global.dscr);
                    global.dscr.style.display = 'none';
                    global.flags.ttlscrnopn = false; 
                });
            }
        }
    });
    addDesc(dom.d3,you.title,5,true);

    dom.d5_1 = addElement(dom.d1,'div',null,'hp');
    dom.d5_2 = addElement(dom.d1,'div',null,'exp');
    dom.d5_3 = addElement(dom.d1,'div',null,'en');

    addDesc(dom.d5_1, null, 2, 'Health', function() {
        return('Physical health points, needed to stay alive. You will probably die if it reaches 0<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>Growth Potential: <span style="color:lime">'+(you.stat_per_lvl[0]*100<<0)+'%</span></small>')
    }, true);

    addDesc(dom.d5_2, null, 2, 'Experience', function() {
        return('Physical and combat experience. You\'ll have to work hard to achieve new heights<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>EXP Gain Potential: <span style="color:gold">'+(you.exp_t*100<<0)+'%</span><br>Current EXP Gain: <span style="color:yellow">'+(you.exp_t*100*you.efficiency()<<0)+'%</span></small>')
    }, true);

    addDesc(dom.d5_3, null, 2, 'Energy meter', function() {
        let lose = you.mods.sdrate; 

        if (global.flags.iswet === true) {
            lose *= ( 3 / (1 + (skl.abw.lvl * 0.03) ) )
        }

        if (global.flags.iscold === true) {
            lose += effect.cold.duration / 1000 / (1 + skl.coldr.lvl * 0.05);
            lose = (lose * 100 << 0) / 100;
        }
        return('Influences the effectiveness of your actions, eat a lot to keep it full<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>Energy Effectiveness: <span style="color:deeppink">'+((you.mods.sbonus+1)*100<<0)+'%</span><br>Energy Consumption Rate: <span style="color:gold">'+lose+'/s</span></small>')
    }, true);

    dom.d5_1_1 = addElement(dom.d5_1,'div','hpp');
    dom.d5_2_1 = addElement(dom.d5_2,'div','expp');
    dom.d5_3_1 = addElement(dom.d5_3,'div','enn');

    dom.d6 = addElement(dom.d1,'div','d6');
    addDesc(dom.d6,null,2,'Power rank','Your power position in this realm. The lower the number the stronger you are');

    dom.d4 = addElement(dom.d1,'div','d4');
    dom.d4_1 = addElement(dom.d4,'span',null,'dd');
    dom.d4_2 = addElement(dom.d4,'span',null,'dd');
    dom.d4_3 = addElement(dom.d4,'span',null,'dd');
    dom.d4_4 = addElement(dom.d4,'span',null,'dd');

    addDesc(dom.d4_1,null,2,'Physical Strength',function(){return('Determines physical damage dealt and received<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>Growth Potential: <span style="color:lime">'+(you.stat_per_lvl[1]*100<<0)+'%</span></small>')},true);
    addDesc(dom.d4_2,null,2,'Agility',function(){return('Determines hit/dodge rate<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>Growth Potential: <span style="color:lime">'+(you.stat_per_lvl[2]*100<<0)+'%</span></small>')},true);
    addDesc(dom.d4_3,null,2,'Mental acuity',function(){return('Determines magic damage dealt and received<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>Growth Potential: <span style="color:lime">'+(you.stat_per_lvl[3]*100<<0)+'%</span></small>')},true);
    addDesc(dom.d4_4,null,2,'Speed','Allows for faster attacks and multihit combos');

    dom.d7 = addElement(dom.d1,'div','eq_w');
    dom.d7_1 = addElement(dom.d7,'div',null,'ddd_2');

    dom.d7_slot_1 = addElement(dom.d7_1,'div',null,'ddd_1');
    dom.d7_slot_1.innerHTML = 'Weapon';
    dom.d7_slot_1.style.color = 'grey';

    dom.d7_slot_2 = addElement(dom.d7_1,'div',null,'ddd_1');
    dom.d7_slot_2.innerHTML = 'Shield';
    dom.d7_slot_2.style.color = 'grey';

    dom.d7_2 = addElement(dom.d7,'div',null,'ddd_2');
    dom.d7_slot_3 = addElement(dom.d7_2,'div',null,'ddd_1');
    dom.d7_slot_3.innerHTML = 'Head';
    dom.d7_slot_3.style.color = 'grey';

    dom.d7_slot_4 = addElement(dom.d7_2,'div',null,'ddd_1');
    dom.d7_slot_4.innerHTML = 'Body';
    dom.d7_slot_4.style.color = 'grey';

    dom.d7_3 = addElement(dom.d7,'div',null,'ddd_2');
    dom.d7_slot_5 = addElement(dom.d7_3,'div',null,'ddd_1');
    dom.d7_slot_5.innerHTML = 'L Arm';
    dom.d7_slot_5.style.color = 'grey';

    dom.d7_slot_6 = addElement(dom.d7_3,'div',null,'ddd_1');
    dom.d7_slot_6.innerHTML = 'R Arm';
    dom.d7_slot_6.style.color = 'grey';

    dom.d7_4 = addElement(dom.d7,'div',null,'ddd_2'); 
    dom.d7_slot_7 = addElement(dom.d7_4,'div',null,'ddd_1');
    dom.d7_slot_7.innerHTML = 'Legs';
    dom.d7_slot_7.style.color = 'grey';

    dom.d7_slot_8 = addElement(dom.d7_4,'div',null,'ddd_1');
    dom.d7_slot_8.innerHTML = 'Accessory';
    dom.d7_slot_8.style.color = 'grey';

    dom.d7_5 = addElement(dom.d7,'div',null,'ddd_2');
    dom.d7_5.style.borderBottom = 'solid 2px rgb(12,86,195)';

    dom.d7_slot_9 = addElement(dom.d7_5,'div',null,'ddd_1');
    dom.d7_slot_9.innerHTML = '∥LOCKED∥';
    dom.d7_slot_9.style.color = 'grey';

    dom.d7_slot_10 = addElement(dom.d7_5,'div',null,'ddd_1');
    dom.d7_slot_10.innerHTML = '∥LOCKED∥';
    dom.d7_slot_10.style.color = 'grey';

    dom.d8 = addElement(dom.d1,'div');
    dom.d8.style.fontSize = '.9em';
    dom.d8.style.paddingTop = '5px';
    dom.d8_2 = addElement(dom.d1,'div');
    dom.d8_2.style.fontSize = '.7em';
    if (!navigator.userAgent.includes('Firefox')) {
        dom.d8_2.style.paddingTop='5px';
    }
    dom.d8_2.innerHTML='Critical chance: '+((you.mods.crflt+you.crt)*100)+'%';

    dom.d7_slot_3.addEventListener('mouseenter',function(){global._tad=this.innerHTML; this.innerHTML='DEF: '+Math.round(you.eqp[2].str*(you.eqp[2].dp/you.eqp[2].dpmax)+you.str_r+you.eqp[1].str*(you.eqp[1].dp/you.eqp[1].dpmax))});
    dom.d7_slot_3.addEventListener('mouseleave',function(){this.innerHTML=global._tad;});
    dom.d7_slot_4.addEventListener('mouseenter',function(){global._tad=this.innerHTML; this.innerHTML='DEF: '+Math.round(you.eqp[3].str*(you.eqp[3].dp/you.eqp[3].dpmax)+you.str_r+you.eqp[1].str*(you.eqp[1].dp/you.eqp[1].dpmax))});
    dom.d7_slot_4.addEventListener('mouseleave',function(){this.innerHTML=global._tad;});
    dom.d7_slot_5.addEventListener('mouseenter',function(){global._tad=this.innerHTML; this.innerHTML='DEF: '+Math.round(you.eqp[4].str*(you.eqp[4].dp/you.eqp[4].dpmax)+you.str_r+you.eqp[1].str*(you.eqp[1].dp/you.eqp[1].dpmax))});
    dom.d7_slot_5.addEventListener('mouseleave',function(){this.innerHTML=global._tad;});
    dom.d7_slot_6.addEventListener('mouseenter',function(){global._tad=this.innerHTML; this.innerHTML='DEF: '+Math.round(you.eqp[5].str*(you.eqp[5].dp/you.eqp[5].dpmax)+you.str_r+you.eqp[1].str*(you.eqp[1].dp/you.eqp[1].dpmax))});
    dom.d7_slot_6.addEventListener('mouseleave',function(){this.innerHTML=global._tad;});
    dom.d7_slot_7.addEventListener('mouseenter',function(){global._tad=this.innerHTML; this.innerHTML='DEF: '+Math.round(you.eqp[6].str*(you.eqp[6].dp/you.eqp[6].dpmax)+you.str_r+you.eqp[1].str*(you.eqp[1].dp/you.eqp[1].dpmax))});
    dom.d7_slot_7.addEventListener('mouseleave',function(){this.innerHTML=global._tad;});

    dom.d1m = addElement(document.body,'div','d1','d');
    dom.d1m.style.top='8px';
    dom.d1m.style.left='457px';
    dom.d1m.style.position='absolute';
    if(!global.flags.aw_u) dom.d1m.style.display='none';

    dom.d101m = addElement(dom.d1m,'div','se_i');  
    dom.d101m.style.top='264px';

    dom._d23m = addElement(dom.d1m,'div');
    addDesc(dom._d23m,null,3,global.current_m.name,global.current_m.desc);
    dom.d2m = addElement(dom._d23m,'div',null,'d2'); 
    dom.d3m = addElement(dom._d23m,'div',null,'d3m');
    dom.d5_1m = addElement(dom.d1m,'div',null,'hp');
    dom.d5_2m = addElement(dom.d1m,'div',null,'exp');
    dom.d5_1_1m = addElement(dom.d5_1m,'div','hpp');
    dom.d5_2_1m = addElement(dom.d5_2m,'div');
    dom.d5_1_1m.update = function(){
      this.innerHTML = 'hp: '+format3(global.current_m.hp.toString())+'/'+format3(global.current_m.hpmax.toString()); dom.d5_1m.style.width = 100*global.current_m.hp/global.current_m.hpmax+'%';
    }
    dom.d4m = addElement(dom.d1m,'div','d4');
    dom.d4_1m = addElement(dom.d4m,'span',null,'dd');
    dom.d4_2m = addElement(dom.d4m,'span',null,'dd');
    dom.d4_3m = addElement(dom.d4m,'span',null,'dd');
    dom.d4_4m = addElement(dom.d4m,'span',null,'dd');

    dom.d9m = addElement(dom.d1m,'div');
    dom.d9m.update=function(){ // displaying ranks, converting crt.rnk to text
        this.innerHTML='rank: '+global.text.eranks[global.current_m.rnk];
        if(global.current_m.rnk<=4) this.style.color='lightgrey';
        else if(global.current_m.rnk>4&&global.current_m.rnk<=7) this.style.color='white';
        else if(global.current_m.rnk>7&&global.current_m.rnk<=10)this.style.color='lightblue';
        else if(global.current_m.rnk>10&&global.current_m.rnk<=13)this.style.color='lightgreen';
        else if(global.current_m.rnk>13&&global.current_m.rnk<=16)this.style.color='lime';
        else if(global.current_m.rnk>16&&global.current_m.rnk<=19)this.style.color='yellow';
    }
    dom.d9m.style.borderBottom='#545299 dotted 2px';
    dom.d9m.style.backgroundColor='#272744';

    // zone info
    dom.d8m_c = addElement(dom.d1m,'small','bbts');
    dom.d8m1 = addElement(dom.d8m_c,'div',null,'bbts');
    dom.d8m1.innerHTML = 'Pause next battle: <span style=\'color:green\'>&nbspOFF';
    dom.d8m1.addEventListener('click',function(){
      if(global.flags.to_pause===true) {if(!global.flags.civil) global.flags.btl=true;global.flags.to_pause=false;this.innerHTML='Pause next battle: <span style=\'color:green\'>&nbspOFF';}
      else {global.flags.to_pause=true; this.innerHTML='Pause next battle: <span style=\'color:crimson\'>&nbspON';}
    });

    dom.d8m2 = addElement(dom.d8m_c,'div',null,'bbts');
    dom.d8m2.innerHTML = 'Resume the fight';
    dom.d8m2.style.right='0px';dom.d8m2.style.position='absolute';
    dom.d8m2.addEventListener('click',function(){if(!global.flags.civil)global.flags.btl=true;});
    dom.d7m_c = addElement(dom.d1m,'div','ainfo');
    dom.d7m_c.style.lineHeight = '1';
    dom.d7m = addElement(dom.d7m_c,'small');
    dom.d7m.update = function () {
        if (global.current_z.name == "Somewhere") { 
            this.innerHTML = 'Zone: Somewhere';
        } else {
            global.current_z.size >= 0 ?
            
            this.innerHTML = 'Zone: '+
            global.current_z.name+' / '+
            global.current_z.size : 
            
            this.innerHTML = 'Zone: '+
            global.current_z.name+' / '+'∞';
        }
    };
    dom.d7m.update();

    // inventory
    dom.inv_ctx = addElement(document.body,'div','inv');
    if (!global.flags.aw_u) dom.inv_ctx.style.display='none'; 
    dom.inventory = addElement(dom.inv_ctx,'div'); 
    dom.inv_control = addElement(dom.inventory,'div','inv_control');
    dom.inv_btn_1 = addElement(dom.inv_control,'div',null,'bts');
    dom.inv_btn_2 = addElement(dom.inv_control,'div',null,'bts');
    dom.inv_btn_3 = addElement(dom.inv_control,'div',null,'bts');
    dom.inv_btn_4 = addElement(dom.inv_control,'div',null,'bts');
    dom.inv_btn_5 = addElement(dom.inv_control,'div',null,'bts');
    dom.inv_ctx_b = addElement(dom.inventory,'div','inv_ctx_b'); 
    dom.inv_control_b = addElement(dom.inv_ctx,'div','inv_control_b');
    dom.inv_btn_1_b = addElement(dom.inv_control_b,'div',null,'bts_b');
    dom.inv_btn_2_b = addElement(dom.inv_control_b,'div',null,'bts_b');
    dom.inv_btn_3_b = addElement(dom.inv_control_b,'div',null,'bts_b');

    // money
    dom.mn = addElement(dom.inv_control_b,'div','mn');
    dom.mn_1 = addElement(dom.mn,'small','mnb'); dom.mn_1.innerHTML = '㊧0';
    dom.mn_2 = addElement(dom.mn,'small','mnb'); dom.mn_2.innerHTML = '●0';
    dom.mn_3 = addElement(dom.mn,'small','mnb'); dom.mn_3.innerHTML = '●0';
    dom.mn_4 = addElement(dom.mn,'small','mnb'); dom.mn_4.innerHTML = '●0';

    dom.mn_1.style.textShadow='red -1px 1px 0px, crimson 2px 0px 0px';

    dom.mn_1.style.opacity= 0;
    dom.mn_2.style.display='none';
    dom.mn_3.style.display='none';
    dom.mn_4.style.display='none';

    dom.mn_1.style.color='chartreuse'; 
    dom.mn_2.style.color='#ffd700';
    dom.mn_3.style.color='#c0c0c0';
    dom.mn_4.style.color='#ff743f';

    dom.mn_1.style.backgroundColor='darkred';
    dom.mn_2.style.backgroundColor='#664200';
    dom.mn_3.style.backgroundColor='#383838';
    dom.mn_4.style.backgroundColor='#662617';

    dom.ctrmg = addElement(document.body,'div','ctrmg');
    dom.ctrmg_ca = addElement(dom.ctrmg,'div');
    dom.ctrmg_cb = addElement(dom.ctrmg,'div');

    dom.ctrwin1 = addElement(dom.ctrmg_cb,'div');
    dom.ctrwin2 = addElement(dom.ctrmg_cb,'div',null,'ctrwinbx');
    dom.ctrwin3 = addElement(dom.ctrmg_cb,'div',null,'ctrwinbx');
    dom.ctrwin4 = addElement(dom.ctrmg_cb,'div',null,'ctrwinbx');
    dom.ctrwin5 = addElement(dom.ctrmg_cb,'div',null,'ctrwinbx');
    dom.ctrwin6 = addElement(dom.ctrmg_cb,'div',null,'ctrwinbx');
    dom.ctrwin7 = addElement(dom.ctrmg_cb,'div',null,'ctrwinbx');

    dom.ctrwin1.style.display='';
    dom.ctrwin2.style.display='none';
    dom.ctrwin3.style.display='none';
    dom.ctrwin4.style.display='none';
    dom.ctrwin5.style.display='none';
    dom.ctrwin6.style.display='none';
    dom.ctrwin7.style.display='none';

    dom.nthngdsp = addElement(dom.ctrmg_cb,'div');
    dom.nthngdsp.style.top = '200px';
    dom.nthngdsp.style.left = '210px';
    dom.nthngdsp.style.position = 'relative';
    dom.nthngdsp.style.color = 'grey';
    dom.nthngdsp.innerHTML = 'Nothing here yet';
    dom.nthngdsp.style.display = 'none'

    dom.ctr_1 = addElement(dom.ctrmg_ca,'div','ctrm_1');
    dom.ctr_1a = addElement(dom.ctr_1,'div');

    dom.d_weather = addElement(dom.ctr_1a ,'div','ctr_w');
    dom.d_weathers = addElement(dom.d_weather ,'small');
    dom.d_weathert = addElement(dom.d_weather ,'span');
    dom.d_weathers.style.marginRight=5;
    dom.d_weathers.addEventListener('click',()=>{
        global.flags.ssngaijin =! global.flags.ssngaijin;
        wdrseason(global.flags.ssngaijin);
    });

    dom.d_moon = addElement(dom.d_weather ,'span'); 
    dom.d_anomaly = addElement(dom.d_weather,'span');
    dom.d_anomaly.innerHTML=''; 

    if (!navigator.userAgent.includes('Firefox')){
        dom.d_anomaly.style.float='right'; dom.d_anomaly.style.top=-4;
        dom.d_anomaly.style.position='relative';
        dom.d_moon.style.float='right';
        dom.d_moon.style.top=-4;
        dom.d_moon.style.position='relative';
    }

    dom.d_time = addElement(dom.ctr_1a,'div','ctr_t');
    dom.d_time.addEventListener('click',function() {
        if (global.flags.tmmode>=3) {
            global.flags.tmmode=1;
        }
        else {
            global.flags.tmmode++;
            this.innerHTML='<small>'+getDay(global.flags.tmmode)+'</small> '+timeDisp(time);
        }
    });

    dom.location = addElement(dom.ctr_1a,'div','ctr_l');
    dom.location.style.display='none';
    dom.location.innerHTML='Location: '

    dom.location_container = addElement(dom.location,'div');
    dom.location_container.style.fontSize='0.85em';
    dom.location_container.style.paddingTop=7;
    dom.location_container.style.marginLeft=-1;
    dom.location_container.style.display='flex';

    dom.location_text = addElement(dom.location_container,'span');
    dom.location_text_effector = addElement(dom.location_container,'span');

    dom.ctr_2 = addElement(dom.ctrwin1,'div','ctrm_2');
    dom.ct_ctrl = addElement(dom.ctrmg,'div','ct_ctrl');
    if (!global.flags.aw_u) dom.ct_ctrl.style.display='none';

    dom.ct_bt1 = addElement(dom.ct_ctrl ,'div',null,'ct_bts'); dom.ct_bt1.innerHTML = global.flags.asbu?'assemble':'???????';
    dom.ct_bt2 = addElement(dom.ct_ctrl ,'div',null,'ct_bts'); dom.ct_bt2.innerHTML = global.flags.sklu?'skills':'???????';
    dom.ct_bt3 = addElement(dom.ct_ctrl ,'div',null,'ct_bts'); dom.ct_bt3.innerHTML = global.flags.actsu?'actions':'???????';
    dom.ct_bt6 = addElement(dom.ct_ctrl ,'div',null,'ct_bts'); dom.ct_bt6.innerHTML = global.flags.jnlu?'journal':'???????'; 
    dom.ct_bt7 = addElement(dom.ct_ctrl ,'div',null,'ct_bts'); dom.ct_bt7.innerHTML = 'settings';
    dom.ct_bt1.style.borderLeft='none'; dom.ct_bt7.style.borderRight='none';

    dom.ct_bt7.addEventListener('click',()=>{
        dom.nthngdsp.style.display='none';
        if(global.lw_op===7) {
            dom.ctrwin6.style.display='none';
            dom.ctrwin5.style.display='none';
            dom.ctrwin4.style.display='none';
            dom.ctrwin3.style.display='none';
            dom.ctrwin2.style.display='none';
            dom.ctrwin1.style.display='';
            global.lw_op=0;
            
            clearInterval(timers.sklupdate);
            clearInterval(timers.bstmonupdate);
        } else{
            dom.ctrwin6.style.display='none';
            dom.ctrwin5.style.display='none';
            dom.ctrwin4.style.display='';
            dom.ctrwin3.style.display='none';
            dom.ctrwin2.style.display='none';
            dom.ctrwin1.style.display='none';
            global.lw_op=7;
        }
        clearInterval(timers.sklupdate);
        clearInterval(timers.bstmonupdate)
    });

    dom.ct_bt1.addEventListener('click',()=>{
        dom.nthngdsp.style.display='none';
        if(global.lw_op===1) {
            dom.ctrwin6.style.display='none';
            dom.ctrwin5.style.display='none';
            dom.ctrwin4.style.display='none';
            dom.ctrwin3.style.display='none';
            dom.ctrwin2.style.display='none';
            dom.ctrwin1.style.display='';
            global.lw_op=0;

            clearInterval(timers.sklupdate);
            clearInterval(timers.bstmonupdate);
        } else {
            dom.ctrwin6.style.display='none';
            dom.ctrwin5.style.display='none';
            dom.ctrwin4.style.display='none';
            dom.ctrwin3.style.display='none';
            dom.ctrwin2.style.display='';
            dom.ctrwin1.style.display='none';
            global.lw_op=1;

            if (global.rec_d.length>0) {
                dom.ct_bt1_c.style.display='';
                rsort(global.rm);

                clearInterval(timers.sklupdate);
                clearInterval(timers.bstmonupdate)
            } else {
                dom.ct_bt1_c.style.display='none';
                dom.nthngdsp.style.display='';
            }
        }
    });

    dom.ct_bt3.addEventListener('click',()=>{
        dom.nthngdsp.style.display='none';
        if(global.lw_op===3) {
            dom.ctrwin6.style.display='none';
            dom.ctrwin5.style.display='none'
            dom.ctrwin4.style.display='none';
            dom.ctrwin3.style.display='none';
            dom.ctrwin2.style.display='none';
            dom.ctrwin1.style.display='';
            global.lw_op=0;

            clearInterval(timers.sklupdate);
            clearInterval(timers.bstmonupdate);
        } else {
            dom.ctrwin6.style.display='none';
            dom.ctrwin5.style.display='';
            dom.ctrwin4.style.display='none';
            dom.ctrwin3.style.display='none';
            dom.ctrwin2.style.display='none';
            dom.ctrwin1.style.display='none';
            global.lw_op=3;
            empty(dom.ctrwin5);

            if (acts.length>0){ 
                this.acch = addElement(dom.ctrwin5,'div');
                this.acch.innerHTML='A c t i o n　　l i s t';
                this.acch.style.padding='2px';
                this.acch.style.textAlign='center';
                this.acch.style.backgroundColor='#050730';
                this.acch_e = addElement(this.acch,'div');
                this.acch_e.style.float='right';
                this.acch_e.style.display='flex';
                this.acch_e.style.position='relative';
                this.acch_e.style.top=-6;
                this.acch_e.style.right=-2;
                this.acch_e.style.height=20;
                dom.acccon = addElement(dom.ctrwin5,'div');
                empty(dom.acccon);
                for(let a in acts) {
                    renderAct(acts[a]);
                }
            } else {
                dom.nthngdsp.style.display='';
            }
        }
    }); 

    dom.ct_bt2.addEventListener('click', function() { // skill list menu
        dom.nthngdsp.style.display = 'none';
        if (global.lw_op === 2) {
            dom.ctrwin6.style.display = 'none';
            dom.ctrwin5.style.display = 'none';
            dom.ctrwin4.style.display = 'none';
            dom.ctrwin3.style.display = 'none';
            dom.ctrwin2.style.display = 'none';
            dom.ctrwin1.style.display = '';
            global.lw_op = 0;
            clearInterval(timers.sklupdate);
            clearInterval(timers.bstmonupdate);
        } else {
            dom.ctrwin6.style.display = 'none';
            dom.ctrwin5.style.display = 'none';
            dom.ctrwin4.style.display = 'none';
            dom.ctrwin3.style.display = '';
            dom.ctrwin2.style.display = 'none';
            dom.ctrwin1.style.display = 'none';
            global.lw_op = 2;
            if (you.skls.length > 0) {
                dom.nthngdsp.style.display = 'none';
                empty(dom.ctrwin3);
                this.skwm = addElement(dom.ctrwin3, 'div');
                this.skwm.innerHTML = 'S k i l l　　l i s t';
                this.skwm.style.padding = '2px';
                this.skwm.style.textAlign = 'center';
                this.skwm.style.backgroundColor = '#050730';
                this.skwm_e = addElement(this.skwm, 'div');
                this.skwm_e.style.float = 'right';
                this.skwm_e.style.display = 'flex';
                this.skwm_e.style.position = 'relative';
                this.skwm_e.style.top = '-6px';
                this.skwm_e.style.right = '-2px';
                this.skwm_e.style.height = '20px';
                this.skwm_e_btn_1_b = addElement(this.skwm_e, 'div', null, 'bts_b');
                this.skwm_e_btn_1_b.innerHTML = 'A-Z';
                this.skwm_e_btn_1_b.style.border = '1px solid #46a';
                this.skwm_e_btn_2_b = addElement(this.skwm_e, 'div', null, 'bts_b');
                this.skwm_e_btn_2_b.innerHTML = 'TPE';
                this.skwm_e_btn_2_b.style.border = '1px solid #46a';
                this.skwm_e_btn_3_b = addElement(this.skwm_e, 'div', null, 'bts_b');
                this.skwm_e_btn_3_b.innerHTML = 'LVL';
                this.skwm_e_btn_3_b.style.border = '1px solid #46a';
                this.skwm_e_btn_1_b.addEventListener('click', function() {
                    if (global.flags.ssort_a === true) {
                        you.skls.sort(function(a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0
                        });
                        global.flags.ssort_a = false;
                    } else {
                        you.skls.sort(function(a, b) {
                            if (a.name > b.name) return -1;
                            if (a.name < b.name) return 1;
                            return 0
                        });
                        global.flags.ssort_a = true;
                    }
                    empty(dom.skcon)
                    for (let m = 0; m < you.skls.length; m++) {
                        renderSkl(you.skls[m]);
                        if (m === you.skls.length - 1) dom.skcon.children[m].style.borderBottom = '1px solid #46a';
                    }
                });
                this.skwm_e_btn_2_b.addEventListener('click', function() {
                    if (global.flags.ssort_b === true) {
                        you.skls.sort(function(a, b) {
                            if (a.type < b.type) return -1;
                            if (a.type > b.type) return 1;
                            if (a.id < b.id) return -1;
                            if (a.id > b.id) return 1;
                            return 0
                        });
                        global.flags.ssort_b = false;
                    } else {
                        you.skls.sort(function(a, b) {
                            if (a.type > b.type) return -1;
                            if (a.type < b.type) return 1;
                            if (a.id > b.id) return -1;
                            if (a.id < b.id) return 1;
                            return 0
                        });
                        global.flags.ssort_b = true;
                    }
                    empty(dom.skcon)
                    for (let m = 0; m < you.skls.length; m++) {
                        renderSkl(you.skls[m]);
                        if (m === you.skls.length - 1) dom.skcon.children[m].style.borderBottom = '1px solid #46a';
                    }
                });
                this.skwm_e_btn_3_b.addEventListener('click', function() {
                    if (global.flags.ssort_b === true) {
                        you.skls.sort(function(a, b) {
                            if (a.lvl < b.lvl) return -1;
                            if (a.lvl > b.lvl) return 1;
                            if (a.exp < b.exp) return -1;
                            if (a.exp > b.exp) return 1;
                            return 0
                        });
                        global.flags.ssort_b = false;
                    } else {
                        you.skls.sort(function(a, b) {
                            if (a.lvl > b.lvl) return -1;
                            if (a.lvl < b.lvl) return 1;
                            if (a.exp > b.exp) return -1;
                            if (a.exp < b.exp) return 1;
                            return 0
                        });
                        global.flags.ssort_b = true;
                    }
                    empty(dom.skcon)
                    for (let m = 0; m < you.skls.length; m++) {
                        renderSkl(you.skls[m]);
                        if (m === you.skls.length - 1) dom.skcon.children[m].style.borderBottom = '1px solid #46a';
                    }
                });
                addDesc(this.skwm_e_btn_1_b, null, 2, 'Filter', 'Alphabetically');
                addDesc(this.skwm_e_btn_2_b, null, 2, 'Filter', 'by Type');
                addDesc(this.skwm_e_btn_3_b, null, 2, 'Filter', 'by Levels');
                dom.skcon = addElement(dom.ctrwin3, 'div');
                dom.skcon.style.overflow = 'auto';
                dom.skcon.style.height = '335px';
                dom.skcon.style.width = '100%'
                for (let m = 0; m < you.skls.length; m++) {
                    renderSkl(you.skls[m]);
                    if (m === you.skls.length - 1) dom.skcon.children[m].style.borderBottom = '1px solid #46a';
                }
                let sklsize = you.skls.length;
                timers.sklupdate = setInterval(() => {
                    if (sklsize < you.skls.length) {
                        empty(dom.skcon);
                        for (let m = 0; m < you.skls.length; m++) {
                            renderSkl(you.skls[m]);
                            if (m === you.skls.length - 1) dom.skcon.children[m].style.borderBottom = '1px solid #46a';
                        }
                    }
                    for (let n = 1; n < you.skls.length + 1; n++) {
                        dom.skcon.children[n - 1].children[0].innerHTML = you.skls[n - 1].name + ' lvl: ' + you.skls[n - 1].lvl;
                        dom.skcon.children[n - 1].children[0].style.fontSize = you.skls[n - 1].sp;
                        dom.skcon.children[n - 1].children[1].innerHTML = '　exp: ' + formatw(Math.floor(you.skls[n - 1].exp)) + '/' + formatw(you.skls[n - 1].expnext_t);
                        dom.skcon.children[n - 1].children[2].children[0].style.width = you.skls[n - 1].exp / you.skls[n - 1].expnext_t * 100 + '%';
                        //if(you.skls[n-1].lastupd&&you.skls[n-1].lastupd-time.minute>=1) dom.skcon.children[n-1].children[2].children[0].style.backgroundColor='limegreen'; else dom.skcon.children[n-1].children[2].children[0].style.backgroundColor='yellow';
                    }
                }, 1000)
            } else dom.nthngdsp.style.display = '';
        }
    });

    dom.ct_bt6.addEventListener('click',function(){if(!global.flags.jnlu)return;dom.nthngdsp.style.display='none';
      if(global.lw_op===6) {dom.ctrwin6.style.display='none';dom.ctrwin5.style.display='none';dom.ctrwin4.style.display='none';dom.ctrwin3.style.display='none';dom.ctrwin2.style.display='none';dom.ctrwin1.style.display='';global.lw_op=0;clearInterval(timers.sklupdate);clearInterval(timers.bstmonupdate)}
      else{dom.ctrwin6.style.display='';dom.ctrwin5.style.display='none';dom.ctrwin4.style.display='none';dom.ctrwin3.style.display='none';dom.ctrwin2.style.display='none';dom.ctrwin1.style.display='none';global.lw_op=6;
      empty(dom.ctrwin6)
      this.jlbl = addElement(dom.ctrwin6,'div');
      this.jlbl.innerHTML='J o u r n a l';
      this.jlbl.style.padding='2px';
      this.jlbl.style.textAlign='center';this.jlbl.style.backgroundColor='#050730'; this.jlbl.style.borderBottom='1px solid rgb(12,86,195)'
      this.jlmain = addElement(dom.ctrwin6,'div'); this.jlmain.style.height=336; this.jlmain.style.background='linear-gradient(0deg, rgb(35, 67, 125), rgb(19, 18, 97))'
      this.jlbod = addElement(this.jlmain,'div');
      this.jlbrw1 = addElement(this.jlbod,'div',null,'jrow');
      dom.jlbrw1s1 = addElement(this.jlbrw1,'div','jcell1','jcell'); dom.jlbrw1s2 = addElement(this.jlbrw1,'div','jcell2','jcell');
      this.jlbrw2 = addElement(this.jlbod,'div',null,'jrow');
      this.jlbrw2s1 = addElement(this.jlbrw2,'div','jcell3','jcell'); this.jlbrw2s2 = addElement(this.jlbrw2,'div','jcell4','jcell');
      this.jlbod.style.height=100; this.jlbod.style.width='100%'; 
      dom.jlbrw1s1.innerHTML = 'Q U E S T S'; dom.jlbrw1s2.innerHTML = global.flags.bstu===true?'B E S T I A R Y':'????????????'
      this.jlbrw2s1.innerHTML = '????????????'; this.jlbrw2s2.innerHTML = 'S T A T I S T I C S';
      dom.jlbrw1s1.addEventListener('click',()=>{empty(dom.ctrwin6); global.lw_op=-1;
        qsts.sort(function(a,b){if((a.id>b.id)&&a.data.started===true) return-1; if((a.id<b.id)&&a.data.done===true&&a.data.started===false) return 1});
        dom.qstbody=addElement(dom.ctrwin6,'div');  
        this.qstlbl=addElement(dom.qstbody,'div'); this.qstlbl.innerHTML='Q U E S T　　L I S T'
        this.qstlbl.style.textAlign='center';  this.qstlbl.style.padding=7; this.qstlbl.style.background='linear-gradient(180deg,#182347,#13152f)';
        for(let a in qsts){ let c,rarc,rarts=''; 
        switch(qsts[a].rar){
          case 0:{rarc='grey'; break}
          case 1:{rarc='white'; break}
          case 2:{rarts='0px 0px 1px blue'; rarc='cyan'; break}
          case 3:{rarts='0px 0px 2px lime'; rarc='lime';break}
          case 4:{rarts='0px 0px 3px orange'; rarc='yellow';break}
          case 5:{rarts='0px 0px 2px crimson,0px 0px 5px red'; rarc='orange';break}
          case 6:{rarts='1px 1px 1px black,0px 0px 2px purple'; rarc='purple';break}
          case 7:{rarts='hotpink 1px 1px .1em,cyan -1px -1px .1em'; rarc='black';break}
        }
          if(qsts[a].data.done) c='green';if(qsts[a].data.started) c='cyan'
          this.qstcell = addElement(dom.qstbody,'div',null,'skwmmc');  
          this.qstcell.innerHTML=qsts[a].name; this.qstcell.style.color=c; this.qstcell.style.textAlign='center'; this.qstcell.style.display='block';
          let rar=''; for(let i=0;i<qsts[a].rar;i++) rar+=' ★ ';
          this.qstcell.innerHTML+=' <small style="font-size:.6em;color:'+rarc+';text-shadow:'+rarts+'">'+rar+'</small>'
          if(qsts[a].repeatable) this.qstcell.innerHTML+='<small style="color:grey"> ≶</small>';
          if(qsts.length-1==Number(a)) this.qstcell.style.borderBottom='1px solid #46a'; 
          this.qstcell.addEventListener('click',function(){empty(dom.qstbody); this.qmain=addElement(dom.qstbody,'div');
            this.qmain.style.height=359; this.qmain.style.width='100%'; this.qmain.style.background='linear-gradient(180deg,#040b2d,#29071c)';this.qmain.style.textAlign='center'
            this.qlabl=addElement(this.qmain,'small'); this.qlabl.innerHTML='#'+qsts[a].id+': '+qsts[a].name+' [<small style="color:'+rarc+';text-shadow:'+rarts+'">'+rar+'</small>]'+(qsts[a].data.done&&!qsts[a].data.started?'<span style="color:lime"> completed</span>':'<span style="color:yellow"> in progress</span>');
            this.qlabl.style.padding=6; this.qlabl.style.borderBottom='dotted 2px #2b408a'; this.qlabl.style.backgroundColor='#12152f';this.qlabl.style.display='inherit'
            this.qstatba=addElement(this.qmain,'small'); this.qstatba.innerHTML='Location: <span style="color:green">'+qsts[a].loc+'</span>';
            this.qstatba.style.borderBottom='1px solid #2b408a'; this.qstatba.style.display='block';
            this.qdsc=addElement(this.qmain,'div');  this.qdsc.innerHTML=qsts[a].desc; this.qdsc.style.padding=12; this.qdsc.style.borderBottom='dotted 2px #2b408a';
            this.qdsc.style.color='#f7ff82'
            this.qtodo=addElement(this.qmain,'div'); let goals = qsts[a].data.done&&!qsts[a].data.started?qsts[a].goalsf():qsts[a].goals(); 
            this.qtodo.style.padding=6; 
            this.qtodo.innerHTML='「Objectives」'; this.qtodo.style.color='#ffc319'; this.qtodo.style.backgroundColor='#12152f'
            this.qgoalbod=addElement(this.qmain,'div');
            this.qgoalbod.style.borderBottom='dotted 2px #2b408a';
            for(let b in goals){
              this.qtodoitm=addElement(this.qgoalbod,'div');
              this.qtodoitm.style.padding=4; this.qtodoitm.style.fontSize='smaller';this.qtodoitm.style.backgroundColor='#182247';
              this.qtodoitm.style.borderTop='1px solid #3b3158'
              this.qtodoitm.innerHTML=goals[b];
            }
            this.qstatbak=addElement(this.qmain,'div','qtrtn'); this.qstatbak.innerHTML='<= Return';
            this.qstatbak.addEventListener('click',()=>{dom.jlbrw1s1.click()});
          });
        }
      });
      dom.jlbrw1s2.addEventListener('click',function(){ if(!global.flags.bstu) return;empty(dom.ctrwin6); global.lw_op=-1; 
        let bst_entr_case=addElement(dom.ctrwin6,'div');  bst_entr_case.style.height='84%';bst_entr_case.style.backgroundColor='rgb(0,20,44)'; bst_entr_case.style.overflow='auto'
        this.bst_entr_head = addElement(bst_entr_case,'div',null,'bst_entr');
        this.bst_entr_head.style.textAlign='center';
        this.bst_entr_head.style.paddingTop='3px'; this.bst_entr_head.style.paddingBottom='3px';
        this.bst_entr_head1 = addElement(this.bst_entr_head,'div',null,'bst_entr1'); this.bst_entr_head1.innerHTML='name'
        this.bst_entr_head2 = addElement(this.bst_entr_head,'div',null,'bst_entr2'); this.bst_entr_head2.innerHTML='rank'
        this.bst_entr_head3 = addElement(this.bst_entr_head,'div',null,'bst_entr3'); this.bst_entr_head3.innerHTML='kills'
        for(let ii=1;ii<global.bestiary.length;ii++){
          let mon; for(let id in creature) if(creature[id].id===global.bestiary[ii].id) mon = creature[id];
          this.bst_entr_m_case = addElement(bst_entr_case,'div','bst_entrh','bst_entr'); this.bst_entr_m_case.style.backgroundColor='rgb(10,30,54)';
          this.bst_entr_m_e1 = addElement(this.bst_entr_m_case,'div',null,'bst_entr1'); this.bst_entr_m_e1.innerHTML=mon.name;
          this.bst_entr_m_e2 = addElement(this.bst_entr_m_case,'div',null,'bst_entr2'); this.bst_entr_m_e2.innerHTML=global.text.eranks[mon.rnk];
          if(mon.rnk<=4)this.bst_entr_m_e2.style.color='lightgrey'; else if(mon.rnk>4&&mon.rnk<=7)this.bst_entr_m_e2.style.color='white';else if(mon.rnk>7&&mon.rnk<=10)this.bst_entr_m_e2.style.color='lightblue';else if(mon.rnk>10&&mon.rnk<=13)this.bst_entr_m_e2.style.color='lightgreen';else if(mon.rnk>13&&mon.rnk<=16)this.bst_entr_m_e2.style.color='lime';else if(mon.rnk>16&&mon.rnk<=19)this.bst_entr_m_e2.style.color='yellow';
          this.bst_entr_m_e3 = addElement(this.bst_entr_m_case,'div',null,'bst_entr3'); this.bst_entr_m_e3.innerHTML=global.bestiary[ii].kills;
          addDesc(this.bst_entr_m_case,mon,10);
        } let monsize = global.bestiary.length; 
          timers.bstmonupdate=setInterval(function(){
          if(monsize<global.bestiary.length){
            for(let ii=monsize;ii<global.bestiary.length;ii++){
              let mon; for(let id in creature) if(creature[id].id===global.bestiary[ii].id) mon = creature[id];
              this.bst_entr_m_case = addElement(bst_entr_case,'div','bst_entrh','bst_entr'); this.bst_entr_m_case.style.backgroundColor='rgb(10,30,54)';
              this.bst_entr_m_e1 = addElement(this.bst_entr_m_case,'div',null,'bst_entr1'); this.bst_entr_m_e1.innerHTML=mon.name;
              this.bst_entr_m_e2 = addElement(this.bst_entr_m_case,'div',null,'bst_entr2'); this.bst_entr_m_e2.innerHTML=global.text.eranks[mon.rnk];
              if(mon.rnk<=4)this.bst_entr_m_e2.style.color='lightgrey'; else if(mon.rnk>4&&mon.rnk<=7)this.bst_entr_m_e2.style.color='white';else if(mon.rnk>7&&mon.rnk<=10)this.bst_entr_m_e2.style.color='lightblue';else if(mon.rnk>10&&mon.rnk<=13)this.bst_entr_m_e2.style.color='lightgreen';else if(mon.rnk>13&&mon.rnk<=16)this.bst_entr_m_e2.style.color='lime';else if(mon.rnk>16&&mon.rnk<=19)this.bst_entr_m_e2.style.color='yellow';
              this.bst_entr_m_e3 = addElement(this.bst_entr_m_case,'div',null,'bst_entr3'); this.bst_entr_m_e3.innerHTML=global.bestiary[ii].kills;
              addDesc(this.bst_entr_m_case,mon,10); 
            } monsize=global.bestiary.length
          }
          for(let ii=1;ii<global.bestiary.length;ii++){ 
            let mon; for(let id in creature) if(creature[id].id===global.bestiary[ii].id) mon = creature[id];
            bst_entr_case.children[ii].children[2].innerHTML=global.bestiary[ii].kills;
          }
        },1000);
      });
      this.jlbrw2s2.addEventListener('click',function(){ empty(dom.ctrwin6); global.lw_op=-1; 
        dom.ch_1=addElement(dom.ctrwin6,'div'); dom.ch_1.style.height='359px';dom.ch_1.style.background='linear-gradient(0deg, rgb(24, 18, 51), rgb(0, 44, 87))';
        dom.flsthdr = addElement(dom.ch_1,'div');dom.flsthdr.innerHTML='S T A T S'; dom.flsthdr.style.background='linear-gradient(0deg,rgb(21, 17, 49),rgb(0, 42, 85))';
        dom.flsthdr.style.borderBottom='1px #44c dashed'; dom.flsthdr.style.padding=2; dom.flsthdr.style.fontSize='small'; dom.flsthdr.style.height=18
        dom.statbod=addElement(dom.ch_1,'div'); dom.statbod.style.overflow='auto'; dom.statbod.style.maxHeight='93%'; dom.statbod.style.background='linear-gradient(90deg,rgb(1,1,87),rgb(55,7,57))';  dom.ch_1.style.textAlign='center';
        dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
        dom.tcleft.innerHTML='Game start time'; dom.tcright.innerHTML=global.stat.sttime
        /*dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
        dom.tcleft.innerHTML='Time passed'; let br=global.stat.tick;dom.tcright.innerHTML=(br>=86400?(br/(86400)<<0+' Days '):'')+(br%86400>=3600?(((br%86400/3600)<<0)%24+':'):'')+(br%3600<60?'00':(br%3600>=600?(br%3600/60)<<0:'0'+(br%3600/60)<<0))+(':'+(br%360<60?'0'+br%60:br%60));*/
        dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr'); 
        dom.tcleft.innerHTML='Ingame time passed'; let br=time.minute-338143959;dom.tcright.innerHTML=(br>=YEAR?'<span style="color:orange">'+(br/YEAR<<0)+'</span> Years ':'')+(br>=MONTH?'<span style="color:yellow">'+(br/MONTH<<0)%12+'</span> Months ':'')+(br>=DAY?'<span style="color:lime">'+(br/DAY<<0)%30+'</span> Days ':'')+(br/HOUR%24<<0)+':'+(br%60<10?'0'+br%60:br%60); dom.tcright.style.fontSize='.9em';
        if(global.stat.gsvs>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Game saves'; dom.tcright.innerHTML+=global.stat.gsvs}
        if(global.stat.athme>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Total time spent at home'; let br=global.stat.athme;dom.tcright.innerHTML=(br>=YEAR?'<span style="color:orange">'+(br/YEAR<<0)+'</span> Years ':'')+(br>=MONTH?'<span style="color:yellow">'+(br/MONTH<<0)%12+'</span> Months ':'')+(br>=DAY?'<span style="color:lime">'+(br/DAY<<0)%30+'</span> Days ':'')+(br/HOUR%24<<0)+':'+(br%60<10?'0'+br%60:br%60)}
        if(global.stat.timeslp>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Time Slept'; let br=global.stat.timeslp;dom.tcright.innerHTML=(br>=YEAR?'<span style="color:orange">'+(br/YEAR<<0)+'</span> Years ':'')+(br>=MONTH?'<span style="color:yellow">'+(br/MONTH<<0)%12+'</span> Months ':'')+(br>=DAY?'<span style="color:lime">'+(br/DAY<<0)%30+'</span> Days ':'')+(br/HOUR%24<<0)+':'+(br%60<10?'0'+br%60:br%60)}
        if(global.stat.lgtstk>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Times struck by lightning'; dom.tcright.innerHTML='<span style="color:black;background-color:yellow">'+global.stat.lgtstk+'</span>'}
        if(global.stat.qstc>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Quests completed'; dom.tcright.innerHTML=global.stat.qstc}
        if(global.stat.jcom>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Jobs completed'; dom.tcright.innerHTML=global.stat.jcom}
        if(global.stat.dsct>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Discoveries made'; dom.tcright.innerHTML=global.stat.dsct}
        if(global.stat.move_to_areat>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Times walked'; dom.tcright.innerHTML=global.stat.move_to_areat}
        if(global.stat.cat_c>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Cat pets'; dom.tcright.innerHTML=global.stat.cat_c}
        if(global.stat.fooda>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Food consumed'; dom.tcright.innerHTML=global.stat.fooda}
        if(global.stat.foodt>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Bad food consumed'; dom.tcright.innerHTML=global.stat.foodt}
        if(global.stat.foodb>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Drinks consumed'; dom.tcright.innerHTML=global.stat.foodb}
        if(global.stat.foodal>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Alcohol consumed'; dom.tcright.innerHTML=global.stat.foodal}
        if(global.stat.ftried>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Unique food tried'; dom.tcright.innerHTML=global.stat.ftried}
        if(global.stat.medst>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Medicine used'; dom.tcright.innerHTML=global.stat.medst}
        if(global.stat.potst>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Potions consumed'; dom.tcright.innerHTML=global.stat.potst}
        if(global.stat.plst>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Pills consumed'; dom.tcright.innerHTML=global.stat.plst}
        if(global.stat.igtttl>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Items picked up'; dom.tcright.innerHTML=global.stat.igtttl}
        if(global.stat.dsst>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Items disassembled'; dom.tcright.innerHTML=global.stat.dsst}
        if(global.stat.thrt>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Items thrown away'; dom.tcright.innerHTML=global.stat.thrt}
        if(global.stat.crftt>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Items crafted'; dom.tcright.innerHTML=global.stat.crftt}
        if(global.rec_d.length>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Recipes unlocked'; dom.tcright.innerHTML=global.rec_d.length}
        if(you.skls.length>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Skills unlocked'; dom.tcright.innerHTML=you.skls.length}
        if(global.titles.length>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Titles unlocked'; dom.tcright.innerHTML=global.titles.length}
        if(global.stat.exptotl>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Total EXP gained'; dom.tcright.innerHTML=formatw(global.stat.exptotl)}
        if(global.stat.slvs>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Total skill levels'; dom.tcright.innerHTML=global.stat.slvs}
        if(global.stat.moneyg>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Money acquired'; 
          dom.ch_etn2_1=addElement(dom.tcright,'span'); dom.ch_etn2_1.style.width='33.3%'; 
          dom.ch_etn2_2=addElement(dom.tcright,'span'); dom.ch_etn2_2.style.width='33.3%'; 
          dom.ch_etn2_3=addElement(dom.tcright,'span'); dom.ch_etn2_3.style.width='33.3%'; let p = global.stat.moneyg
          if(p>=GOLD) {dom.ch_etn2_1.innerHTML=(dom.coingold+((p/GOLD)<<0));dom.ch_etn2_1.style.backgroundColor='rgb(102, 66, 0)';}
          if(p>=SILVER&&p%GOLD>=SILVER) {dom.ch_etn2_2.innerHTML=(dom.coinsilver+((p/SILVER%SILVER)<<0));dom.ch_etn2_2.style.backgroundColor='rgb(56, 56, 56)';}
          if(p<SILVER||(p>SILVER&&p%SILVER>0)) {dom.ch_etn2_3.innerHTML=(dom.coincopper+((p%SILVER)<<0));dom.ch_etn2_3.style.backgroundColor='rgb(102, 38, 23)';}}
        if(global.stat.moneysp>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Money spent in shops'; 
          dom.ch_etn2_1=addElement(dom.tcright,'span'); dom.ch_etn2_1.style.width='33.3%'; 
          dom.ch_etn2_2=addElement(dom.tcright,'span'); dom.ch_etn2_2.style.width='33.3%'; 
          dom.ch_etn2_3=addElement(dom.tcright,'span'); dom.ch_etn2_3.style.width='33.3%'; let p = global.stat.moneysp
          if(p>=GOLD) {dom.ch_etn2_1.innerHTML=(dom.coingold+((p/GOLD)<<0));dom.ch_etn2_1.style.backgroundColor='rgb(102, 66, 0)';}
          if(p>=SILVER&&p%GOLD>=SILVER) {dom.ch_etn2_2.innerHTML=(dom.coinsilver+((p/SILVER%SILVER)<<0));dom.ch_etn2_2.style.backgroundColor='rgb(56, 56, 56)';}
          if(p<SILVER||(p>SILVER&&p%SILVER>0)) {dom.ch_etn2_3.innerHTML=(dom.coincopper+((p%SILVER)<<0));dom.ch_etn2_3.style.backgroundColor='rgb(102, 38, 23)';}}
        if(global.stat.buyt>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Goods bought'; dom.tcright.innerHTML=global.stat.buyt}
        if(global.stat.rdttl>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Books read'; dom.tcright.innerHTML=global.stat.rdttl; addDesc(dom.tccon,null,2,'Info','<span style="color:lie">Click to list known books</span>'); 
          dom.tccon.addEventListener('click',function(){if(!global.flags.bksstt){global.flags.bksstt=true;
            dom.bkssttbd = addElement(document.body,'div',null,'bksstt'); dom.bkssttbd.addEventListener('click',function(){empty(dom.bkssttbd);document.body.removeChild(dom.bkssttbd);global.flags.bksstt=false;global.dscr.style.display='none'});
            let bks = []; for(let a in item) if(item[a].data.finished) bks.push(item[a]); 
            for(let a in bks){
              dom.bkssttcell=addElement(dom.bkssttbd,'div',null,'blssttc'); 
              dom.bkssttcell.innerHTML=bks[a].name; addDesc(dom.bkssttcell, bks[a]); 
              switch(bks[a].rar){
                case 0:{dom.bkssttcell.style.color='grey'; break}
                case 1:{dom.bkssttcell.style.color='rgb(188,254,254)'; break}
                case 2:{dom.bkssttcell.style.textShadow='0px 0px 1px blue'; dom.bkssttcell.style.color='cyan'; break}
                case 3:{dom.bkssttcell.style.textShadow='0px 0px 2px lime'; dom.bkssttcell.style.color='lime';break}
                case 4:{dom.bkssttcell.style.textShadow='0px 0px 3px orange'; dom.bkssttcell.style.color='yellow';break}
                case 5:{dom.bkssttcell.style.textShadow='0px 0px 2px crimson,0px 0px 5px red'; dom.bkssttcell.style.color='orange';break}
                case 6:{dom.bkssttcell.style.textShadow='1px 1px 1px black,0px 0px 2px purple'; dom.bkssttcell.style.color='purple';break}
              }  
            }
        }});
        }
        if(global.stat.rdgtttl>0){
    dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Total reading time'; let br=global.stat.rdgtttl;dom.tcright.innerHTML=(br>=YEAR?'<span style="color:orange">'+(br/YEAR<<0)+'</span> Years ':'')+(br>=MONTH?'<span style="color:yellow">'+(br/MONTH<<0)%12+'</span> Months ':'')+(br>=DAY?'<span style="color:lime">'+(br/DAY<<0)%30+'</span> Days ':'')+(br/HOUR%24<<0)+':'+(br%60<10?'0'+br%60:br%60)}
        if(global.stat.popt>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Times description window appeared'; dom.tcright.innerHTML=global.stat.popt}
        if(global.stat.dmgdt>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Total damage dealt'; dom.tcright.innerHTML=formatw(global.stat.dmgdt)}
        if(global.stat.dmgrt>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Total damage recieved'; dom.tcright.innerHTML=formatw(global.stat.dmgrt)}
        if(global.stat.deadt>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Times died'; dom.tcright.innerHTML=global.stat.deadt}
        if(global.stat.deadt>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Last cause of casualty'; dom.tcright.innerHTML=getlastd()}
        if(global.stat.akills>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Total kills'; dom.tcright.innerHTML=global.stat.akills}
        if(global.stat.onesht>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Times killed with a single hit'; dom.tcright.innerHTML=global.stat.onesht}
        if(global.stat.misst>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Times missed the attack'; dom.tcright.innerHTML=global.stat.misst}
        if(global.stat.dodgt>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Times dodged the attack'; dom.tcright.innerHTML=global.stat.dodgt}
        if(global.stat.msks[0]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Humanoid-class foes slayed'; dom.tcright.innerHTML=global.stat.msks[0]}
        if(global.stat.msks[1]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Beast-class foes slayed'; dom.tcright.innerHTML=global.stat.msks[1]}
        if(global.stat.msks[2]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Undead-class foes slayed'; dom.tcright.innerHTML=global.stat.msks[2]}
        if(global.stat.msks[3]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Evil-class foes slayed'; dom.tcright.innerHTML=global.stat.msks[3]}
        if(global.stat.msks[4]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Phantom-class foes slayed'; dom.tcright.innerHTML=global.stat.msks[4]}
        if(global.stat.msks[5]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Dragon-class foes slayed'; dom.tcright.innerHTML=global.stat.msks[5]}
        if(global.stat.msts[0][0]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Unarmed attacks'; dom.tcright.innerHTML=global.stat.msts[0][0]}
        if(global.stat.msts[0][1]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Unarmed kills'; dom.tcright.innerHTML=global.stat.msts[0][1]}
        if(global.stat.msts[1][0]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Sword attacks'; dom.tcright.innerHTML=global.stat.msts[1][0]}
        if(global.stat.msts[1][1]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Sword kills'; dom.tcright.innerHTML=global.stat.msts[1][1]}
        if(global.stat.msts[2][0]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Axe attacks'; dom.tcright.innerHTML=global.stat.msts[2][0]}
        if(global.stat.msts[2][1]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Axe kills'; dom.tcright.innerHTML=global.stat.msts[2][1]}
        if(global.stat.msts[3][0]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Dagger attacks'; dom.tcright.innerHTML=global.stat.msts[3][0]}
        if(global.stat.msts[3][1]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Dagger kills'; dom.tcright.innerHTML=global.stat.msts[3][1]}
        if(global.stat.msts[4][0]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Polearm/Spear attacks'; dom.tcright.innerHTML=global.stat.msts[4][0]}
        if(global.stat.msts[4][1]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Polearm/Spear kills'; dom.tcright.innerHTML=global.stat.msts[4][1]}
        if(global.stat.msts[5][0]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Hammer/Club attacks'; dom.tcright.innerHTML=global.stat.msts[5][0]}
        if(global.stat.msts[5][1]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Hammer/Club kills'; dom.tcright.innerHTML=global.stat.msts[5][1]}
        if(global.stat.msts[6][0]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Staff attacks'; dom.tcright.innerHTML=global.stat.msts[6][0]}
        if(global.stat.msts[6][1]>0){
          dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
          dom.tcleft.innerHTML='Staff kills'; dom.tcright.innerHTML=global.stat.msts[6][1]}
          
        });
      }
    });

    dom.ct_bt1_c = addElement(dom.ctrwin2,'div','crf_c'); 
    dom.ct_bt1_1_ncont = addElement(dom.ct_bt1_c,'div');
    dom.ct_bt1_1_ncont.style.height='100%';
    dom.ct_bt1_1_ncont.style.width='45%';
    dom.ct_bt1_1_cont = addElement(dom.ct_bt1_1_ncont,'div');
    dom.ct_bt1_1 = addElement(dom.ct_bt1_1_ncont,'div','crf_l');
    dom.ct_bt1_1.style.height=343;
    dom.ct_bt1_1.style.width='100%';
    dom.ct_bt1_1_cont.style.bottom=0;
    dom.ct_bt1_1_cont.style.borderBottom='1px solid cornflowerblue';
    dom.ct_bt1_1_cont.style.display='flex';
    dom.ct_bt1_1_cont_a=addElement(dom.ct_bt1_1_cont,'small',null,'crf_c_bts');
    dom.ct_bt1_1_cont_c=addElement(dom.ct_bt1_1_cont,'small',null,'crf_c_bts');
    dom.ct_bt1_1_cont_b=addElement(dom.ct_bt1_1_cont,'small',null,'crf_c_bts');
    dom.ct_bt1_1_cont_d=addElement(dom.ct_bt1_1_cont,'small',null,'crf_c_bts');
    dom.ct_bt1_1_cont_e=addElement(dom.ct_bt1_1_cont,'small',null,'crf_c_bts');
    dom.ct_bt1_1_cont_f=addElement(dom.ct_bt1_1_cont,'small',null,'crf_c_bts');
    dom.ct_bt1_1_cont_f.style.borderRight='none';16
    dom.ct_bt1_1_cont_a.style.backgroundColor='darkslategrey';
    dom.ct_bt1_1_cont_b.style.backgroundColor='#332e12';
    dom.ct_bt1_1_cont_c.style.backgroundColor='#1c3319';
    dom.ct_bt1_1_cont_d.style.backgroundColor='#b73c0d';
    dom.ct_bt1_1_cont_e.style.backgroundColor='#313254';
    dom.ct_bt1_1_cont_f.style.backgroundColor='#5155d6';
    dom.ct_bt1_1_cont_a.addEventListener('click',function(){rstcrtthg();this.style.color='yellow';rsort(0)});
    dom.ct_bt1_1_cont_b.addEventListener('click',function(){rstcrtthg();this.style.color='yellow';rsort(1)});
    dom.ct_bt1_1_cont_c.addEventListener('click',function(){rstcrtthg();this.style.color='yellow';rsort(2)});
    dom.ct_bt1_1_cont_d.addEventListener('click',function(){rstcrtthg();this.style.color='yellow';rsort(3)});
    dom.ct_bt1_1_cont_e.addEventListener('click',function(){rstcrtthg();this.style.color='yellow';rsort(4)});
    dom.ct_bt1_1_cont_f.addEventListener('click',function(){rstcrtthg();this.style.color='yellow';rsort(5)});
    global.spbtsr = [
        dom.ct_bt1_1_cont_a,
        dom.ct_bt1_1_cont_b,
        dom.ct_bt1_1_cont_c,
        dom.ct_bt1_1_cont_d,
        dom.ct_bt1_1_cont_e,
        dom.ct_bt1_1_cont_f
    ];
    dom.ct_bt1_1_cont_a.innerHTML='ALL';
    dom.ct_bt1_1_cont_b.innerHTML='FOD';
    dom.ct_bt1_1_cont_c.innerHTML='MED';
    dom.ct_bt1_1_cont_d.innerHTML='WEP';
    dom.ct_bt1_1_cont_e.innerHTML='EQP';
    dom.ct_bt1_1_cont_f.innerHTML='MAT';

    addDesc(dom.ct_bt1_1_cont_a,null,2,'Filter','All');
    addDesc(dom.ct_bt1_1_cont_b,null,2,'Filter','Food');
    addDesc(dom.ct_bt1_1_cont_c,null,2,'Filter','Medicine/Tools');
    addDesc(dom.ct_bt1_1_cont_d,null,2,'Filter','Weapons');
    addDesc(dom.ct_bt1_1_cont_e,null,2,'Filter','Equipment/Accessories');
    addDesc(dom.ct_bt1_1_cont_f,null,2,'Filter','Materials/Misc.');

    dom.ct_bt1_2 = addElement(dom.ct_bt1_c,'div','crf_r'); 
    dom.ct_bt4_1 = addElement(dom.ctrwin4,'div',null,'opt_c'); 
    dom.ct_bt4_1a = addElement(dom.ct_bt4_1,'div',null,'opt_t');
    dom.ct_bt4_1a.innerHTML = 'Message log limit';
    dom.ct_bt4_1b = addElement(dom.ct_bt4_1,'input',null,'opt_v');
    dom.ct_bt4_1b.value = global.msgs_max; dom.ct_bt4_1b.type ='number';
    dom.ct_bt4_1b.min = 1; dom.ct_bt4_1b.max = 100;
    dom.ct_bt4_1b.addEventListener('change',function() {
        if (this.value < 1) {
            this.value = 1;
        } else if (this.value>100) {
            this.value=100;
        }
        global.msgs_max = this.value;
    });

    dom.ct_bt4_2 = addElement(dom.ctrwin4,'div',null,'opt_c'); 
    dom.ct_bt4_2a = addElement(dom.ct_bt4_2,'div',null,'opt_t');
    dom.ct_bt4_2a.innerHTML = 'BG Color';

    dom.ct_bt4_21b = addElement(dom.ct_bt4_2,'input',null,'opt_v');
    dom.ct_bt4_21b.value = global.bg_r; dom.ct_bt4_21b.type ='range';
    dom.ct_bt4_21b.min = 0; dom.ct_bt4_21b.max = 255;
    dom.ct_bt4_21b.style.width='85px';
    dom.ct_bt4_21b.style.height='16px';
    dom.ct_bt4_21b.addEventListener('input',function(){document.body.removeAttribute('style');global.flags.bgspc=false;global.bg_r=this.value;document.body.style.backgroundColor='rgb('+global.bg_r+','+global.bg_g+','+global.bg_b+')';dom.ct_bt4_31b.innerHTML = global.bg_r});

    dom.ct_bt4_22b = addElement(dom.ct_bt4_2,'input',null,'opt_v');
    dom.ct_bt4_22b.value = global.bg_g;
    dom.ct_bt4_22b.type ='range';
    dom.ct_bt4_21b.style.height='16px';
    dom.ct_bt4_22b.style.height='16px';
    dom.ct_bt4_22b.min = 0;
    dom.ct_bt4_22b.max = 255;
    dom.ct_bt4_22b.style.width='85px';
    dom.ct_bt4_22b.style.left='367px';
    dom.ct_bt4_22b.addEventListener('input',function(){document.body.removeAttribute('style');global.flags.bgspc=false;global.bg_g=this.value;document.body.style.backgroundColor='rgb('+global.bg_r+','+global.bg_g+','+global.bg_b+')';dom.ct_bt4_32b.innerHTML = global.bg_g});

    dom.ct_bt4_23b = addElement(dom.ct_bt4_2,'input',null,'opt_v');
    dom.ct_bt4_23b.value = global.bg_b;
    dom.ct_bt4_23b.type ='range';
    dom.ct_bt4_21b.style.height='16px';
    dom.ct_bt4_23b.style.height='16px';
    dom.ct_bt4_23b.min = 0;
    dom.ct_bt4_23b.max = 255;
    dom.ct_bt4_23b.style.width='85px';
    dom.ct_bt4_23b.style.left='459px';
    dom.ct_bt4_23b.addEventListener('input',function(){document.body.removeAttribute('style');global.flags.bgspc=false;global.bg_b=this.value;document.body.style.backgroundColor='rgb('+global.bg_r+','+global.bg_g+','+global.bg_b+')';dom.ct_bt4_33b.innerHTML = global.bg_b});

    dom.ct_bt4_3 = addElement(dom.ctrwin4,'div',null,'opt_c'); 
    dom.ct_bt4_3a = addElement(dom.ct_bt4_3,'div',null,'opt_t');
    dom.ct_bt4_3a.innerHTML = '　';
    dom.ct_bt4_31b = addElement(dom.ct_bt4_3,'div',null,'opt_v');
    dom.ct_bt4_31b.style.textAlign='center';
    dom.ct_bt4_31b.style.width='83px';
    dom.ct_bt4_31b.innerHTML = global.bg_r||255; 
    dom.ct_bt4_32b = addElement(dom.ct_bt4_3,'div',null,'opt_v');
    dom.ct_bt4_32b.style.textAlign='center';
    dom.ct_bt4_32b.style.width='83px';
    dom.ct_bt4_32b.innerHTML = global.bg_g||255; dom.ct_bt4_32b.style.left='367px';
    dom.ct_bt4_33b = addElement(dom.ct_bt4_3,'div',null,'opt_v');
    dom.ct_bt4_33b.style.textAlign='center';
    dom.ct_bt4_33b.style.width='83px';
    dom.ct_bt4_33b.innerHTML = global.bg_b||255; dom.ct_bt4_33b.style.left='459px';

    dom.ct_bt4_03 = addElement(dom.ctrwin4,'div',null,'opt_c'); 
    dom.ct_bt4_03a = addElement(dom.ct_bt4_03,'div',null,'opt_t');
    dom.ct_bt4_03a.innerHTML = 'BG presets';
    dom.ct_bt4_03b = addElement(dom.ct_bt4_03,'div',null,'opt_v'); dom.ct_bt4_03b.style.width=274; dom.ct_bt4_03b.style.height=20;dom.ct_bt4_03b.style.display='flex';dom.ct_bt4_03b.style.padding=0;dom.ct_bt4_03b.style.textAlign='center'
    dom.ct_bt4_03b1 = addElement(dom.ct_bt4_03b,'small');dom.ct_bt4_03b2 = addElement(dom.ct_bt4_03b,'small');
    dom.ct_bt4_03b3 = addElement(dom.ct_bt4_03b,'small');dom.ct_bt4_03b4 = addElement(dom.ct_bt4_03b,'small');
    dom.ct_bt4_03b1.style.width=dom.ct_bt4_03b2.style.width=dom.ct_bt4_03b3.style.width=dom.ct_bt4_03b4.style.width='25%'
    dom.ct_bt4_03b1.innerHTML='White';dom.ct_bt4_03b2.innerHTML='grey'; dom.ct_bt4_03b3.innerHTML='night'; dom.ct_bt4_03b4.innerHTML='special'
    dom.ct_bt4_03b1.style.color='#000'; dom.ct_bt4_03b1.style.backgroundColor='white'; 
    dom.ct_bt4_03b2.style.color='lightgrey'; dom.ct_bt4_03b2.style.backgroundColor='#666'; 
    dom.ct_bt4_03b3.style.color='yellow'; dom.ct_bt4_03b3.style.backgroundColor='rgb(18,18,46)';
    dom.ct_bt4_03b4.style.background='linear-gradient(180deg,#000,#123)';
    dom.ct_bt4_03b1.addEventListener('click',function() {
        global.flags.bgspc = false;
        global.bg_r=255;
        global.bg_g=255;
        global.bg_b=255;
        document.body.removeAttribute('style');
        dom.ct_bt4_31b.innerHTML=255;
        dom.ct_bt4_32b.innerHTML=255;
        dom.ct_bt4_33b.innerHTML=255;
        dom.ct_bt4_21b.value = global.bg_r;
        dom.ct_bt4_22b.value = global.bg_g;
        dom.ct_bt4_23b.value = global.bg_b;
        document.body.style.backgroundColor = 'rgb('+global.bg_r+','+global.bg_g+','+global.bg_b+')';
    });
    dom.ct_bt4_03b2.addEventListener('click',function() {
        global.flags.bgspc=false;
        global.bg_r=188;
        global.bg_g=188;
        global.bg_b=188;
        document.body.removeAttribute('style');
        dom.ct_bt4_31b.innerHTML=188;
        dom.ct_bt4_32b.innerHTML=188;
        dom.ct_bt4_33b.innerHTML=188;
        dom.ct_bt4_21b.value = global.bg_r;
        dom.ct_bt4_22b.value = global.bg_g;
        dom.ct_bt4_23b.value = global.bg_b;
        document.body.style.backgroundColor = 'rgb('+global.bg_r+','+global.bg_g+','+global.bg_b+')';
    });
    dom.ct_bt4_03b3.addEventListener('click',function() {
        global.flags.bgspc=false;
        global.bg_r=18;
        global.bg_g=18;
        global.bg_b=46;
        document.body.removeAttribute('style');
        dom.ct_bt4_31b.innerHTML=18;
        dom.ct_bt4_32b.innerHTML=18;
        dom.ct_bt4_33b.innerHTML=46;
        dom.ct_bt4_21b.value = global.bg_r;
        dom.ct_bt4_22b.value = global.bg_g;
        dom.ct_bt4_23b.value = global.bg_b;
        document.body.style.backgroundColor = 'rgb('+global.bg_r+','+global.bg_g+','+global.bg_b+')';
    });
    dom.ct_bt4_03b4.addEventListener('click',function() {
        global.flags.bgspc=true;
        dom.ct_bt4_31b.innerHTML='SPCL';
        dom.ct_bt4_32b.innerHTML='SPCL';
        dom.ct_bt4_33b.innerHTML='SPCL';
        document.body.style.background='linear-gradient(180deg,#000,#123)';
    });

    dom.ct_bt4_4 = addElement(dom.ctrwin4,'div',null,'opt_c'); 
    dom.ct_bt4_4a = addElement(dom.ct_bt4_4,'div',null,'opt_t');
    dom.ct_bt4_4a.innerHTML = 'Destroy gradients';
    dom.ct_bt4_41b = addElement(dom.ct_bt4_4,'input',null,'opt_v');
    dom.ct_bt4_41b.type='checkbox';
    dom.ct_bt4_41b.addEventListener('click',()=>{nograd(global.flags.grd_s)});
    dom.ct_bt4_5 = addElement(dom.ctrwin4,'div',null,'opt_c'); 
    dom.ct_bt4_5a = addElement(dom.ct_bt4_5,'div',null,'opt_ta');
    dom.ct_bt4_5b = addElement(dom.ct_bt4_5,'div',null,'opt_va');
    dom.ct_bt4_5a.innerHTML = 'Export';
    dom.ct_bt4_5a.style.border='1px lightgrey solid';
    dom.ct_bt4_5a.addEventListener('click',function(){ if (!global.flags.expatv) {
        t = save(false);
        global.flags.expatv = true;

        dom.ct_bt4_5a_nc = addElement(document.body,'div');
        dom.ct_bt4_5a_nc.style.position='absolute';
        dom.ct_bt4_5a_nc.style.padding=2;
        dom.ct_bt4_5a_nc.style.top=370;
        dom.ct_bt4_5a_nc.style.left=330;
        dom.ct_bt4_5a_nc.style.width=600;
        dom.ct_bt4_5a_nc.style.height=400;
        dom.ct_bt4_5a_nc.style.border='2px solid black'; 
        dom.ct_bt4_5a_nc.style.backgroundColor='lightgrey';
        dom.ct_bt4_5a_nh = addElement(dom.ct_bt4_5a_nc,'div');
        dom.ct_bt4_5a_nh.style.height=20;
        dom.ct_bt4_5a_nh.style.borderBottom='2px solid black';
        dom.ct_bt4_5a_nhv = addElement(dom.ct_bt4_5a_nh,'div'); 
        dom.ct_bt4_5a_nhv.style.float='left';
        dom.ct_bt4_5a_nhv.style.marginRight=6;
        dom.ct_bt4_5a_nhv.style.backgroundColor='grey';
        dom.ct_bt4_5a_nhv.innerHTML='Export As Text'
        dom.ct_bt4_5a_nhv.addEventListener('click',function(){dom.ct_bt4_5a_nbc.value = t});
        dom.ct_bt4_5a_nhz = addElement(dom.ct_bt4_5a_nh,'div'); 
        dom.ct_bt4_5a_nhz.style.float='left';
        dom.ct_bt4_5a_nhz.style.backgroundColor='grey';
        dom.ct_bt4_5a_nhz.innerHTML='Export As File'

        dom.ct_bt4_5a_nhz.addEventListener('click',function() {
            let a = new Date();
            let temp = document.createElement('a');
            temp.href = 'data:text/plain;charset=utf-8,'+t;
            let n = you.name;
            if (/(<.*>)|(\(.*\))/.test(you.name)) n='';
            temp.download = n+' - v'+global.ver+' - '+(a.getFullYear()+'/'+(a.getMonth()+1)+'/'+a.getDate()+' '+a.getHours()+'_'+(a.getMinutes()>=10?a.getMinutes():'0'+a.getMinutes())+'_'+(a.getSeconds()>=10?a.getSeconds():'0'+a.getSeconds()))+' [Proto23]'; temp.click(); 
        });

        dom.ct_bt4_5a_nhx = addElement(dom.ct_bt4_5a_nh,'div');
        draggable(dom.ct_bt4_5a_nh,dom.ct_bt4_5a_nc);
        dom.ct_bt4_5a_nhx.innerHTML = '✖';
        dom.ct_bt4_5a_nhx.style.float='right';
        dom.ct_bt4_5a_nhx.style.backgroundColor='red';
        dom.ct_bt4_5a_nhx.addEventListener('click',function(){global.flags.expatv=false;empty(dom.ct_bt4_5a_nc);document.body.removeChild(dom.ct_bt4_5a_nc); kill(dom.ct_bt4_5a_nc)});
        dom.ct_bt4_5a_nb = addElement(dom.ct_bt4_5a_nc,'div'); 
        dom.ct_bt4_5a_nbc = addElement(dom.ct_bt4_5a_nb,'textArea');
        dom.ct_bt4_5a_nbc.style.fontFamily='MS Gothic';
        dom.ct_bt4_5a_nbc.style.width='100%';
        dom.ct_bt4_5a_nbc.style.height='378px';
        dom.ct_bt4_5a_nbc.style.overflow='auto';
    }});

    dom.ct_bt4_5b.innerHTML = 'Import';
    dom.ct_bt4_5b.style.border='1px lightgrey solid'; 
    dom.ct_bt4_5b.addEventListener('click',function() { if(!global.flags.impatv) {
      global.flags.impatv = true;
      dom.ct_bt4_5b_nc = addElement(document.body,'div');
      dom.ct_bt4_5b_nc.style.position='absolute';
      dom.ct_bt4_5b_nc.style.padding=2;
      dom.ct_bt4_5b_nc.style.top=370;
      dom.ct_bt4_5b_nc.style.left=330;
      dom.ct_bt4_5b_nc.style.width=600;
      dom.ct_bt4_5b_nc.style.height=400;
      dom.ct_bt4_5b_nc.style.border='2px solid black';
      dom.ct_bt4_5b_nc.style.backgroundColor='lightgrey'; 
      dom.ct_bt4_5b_nh = addElement(dom.ct_bt4_5b_nc,'div');
      dom.ct_bt4_5b_nh.style.height=20;
      dom.ct_bt4_5b_nh.style.borderBottom='2px solid black';
      dom.ct_bt4_5b_nhv = addElement(dom.ct_bt4_5b_nh,'div');
      draggable(dom.ct_bt4_5b_nh,dom.ct_bt4_5b_nc);
      dom.ct_bt4_5b_nhv.style.float='left';
      dom.ct_bt4_5b_nhv.style.backgroundColor='grey';
      dom.ct_bt4_5b_nhv.innerHTML='Import As Text';
      dom.ct_bt4_5b_nhv.style.marginRight=6;
      dom.ct_bt4_5b_nhv.addEventListener('click', function() {
          if(dom.ct_bt4_5b_nbc.value==""||dom.ct_bt4_5b_nbc.value=="?") {dom.ct_bt4_5b_nbc.value='?'; return}
          let storage = window.localStorage; let t = dom.ct_bt4_5b_nbc.value;bt = b64_to_utf8(dom.ct_bt4_5b_nbc.value);
          if(/savevalid/g.test(bt)){
          storage.setItem("v0.2a", t);
          load(t);
          global.flags.impatv=false;empty(dom.ct_bt4_5b_nc);document.body.removeChild(dom.ct_bt4_5b_nc); kill(dom.ct_bt4_5b_nc)}
          else{dom.ct_bt4_5b_nbc.value = 'Save Invalid'; return}
      });
      dom.ct_bt4_5b_nhx = addElement(dom.ct_bt4_5b_nh,'div');
      dom.ct_bt4_5b_nhx.innerHTML = '✖'; dom.ct_bt4_5b_nhx.style.float='right';
      dom.ct_bt4_5b_nhx.style.backgroundColor='red';
      dom.ct_bt4_5b_nhx.addEventListener('click',function(){global.flags.impatv=false;empty(dom.ct_bt4_5b_nc);document.body.removeChild(dom.ct_bt4_5b_nc)});
      dom.ct_bt4_5b_nhz = addElement(dom.ct_bt4_5b_nh,'div'); dom.ct_bt4_5b_nhz.style.float='left';
      dom.ct_bt4_5b_nhz.style.backgroundColor='grey'; dom.ct_bt4_5b_nhz.innerHTML='Load File'; ;
      dom.ct_bt4_5b_nhz2 = addElement(dom.ct_bt4_5b_nhz,'input');  dom.ct_bt4_5b_nhz2.innerHTML='323'
      dom.ct_bt4_5b_nhz2.accept='.txt'; dom.ct_bt4_5b_nhz2.type='file';
      dom.ct_bt4_5b_nhz2.style.opacity=0; dom.ct_bt4_5b_nhz2.style.position='absolute';dom.ct_bt4_5b_nhz2.style.left=128
      dom.ct_bt4_5b_nhz2.style.width=81; dom.ct_bt4_5b_nhz2.style.top=0;dom.ct_bt4_5b_nhz2.style.height=18;
      dom.ct_bt4_5b_nhz2.addEventListener('change',function(){
          let r=new FileReader(); r.readAsText(this.files[0]); let storage = window.localStorage;
          r.addEventListener('load',function(){
          let t = b64_to_utf8(r.result);
          if(/savevalid/g.test(t)){  dom.ct_bt4_5b_nbc.value = 'Load Successful';
          storage.setItem("v0.2a", r.result); load(r.result);global.flags.impatv=false;empty(dom.ct_bt4_5b_nc);document.body.removeChild(dom.ct_bt4_5b_nc); kill(dom.ct_bt4_5b_nc)}
          else{dom.ct_bt4_5b_nbc.value = 'Save Invalid'; return}})
      })
      dom.ct_bt4_5b_nb = addElement(dom.ct_bt4_5b_nc,'div'); 
      dom.ct_bt4_5b_nbc = addElement(dom.ct_bt4_5b_nb,'textArea');dom.ct_bt4_5b_nbc.style.fontFamily='MS Gothic';
      dom.ct_bt4_5b_nbc.style.width='100%';dom.ct_bt4_5b_nbc.style.height='378px';dom.ct_bt4_5b_nbc.style.overflow='auto'
    }});
    /*
    dom.ct_bt4_6 = addElement(dom.ctrwin4,'div',null,'opt_c'); 
    dom.ct_bt4_6a = addElement(dom.ct_bt4_6,'div',null,'opt_t');
    dom.ct_bt4_6a.innerHTML = 'Attach timestamp to messages';
    dom.ct_bt4_61b = addElement(dom.ct_bt4_6,'input',null,'opt_v'); dom.ct_bt4_61b.type='checkbox';
    dom.ct_bt4_61b.addEventListener('click',()=>{global.flags.msgtm=!global.flags.msgtm});*/


    dom.gmsgs = addElement(document.body,'div','gmsgs');
    dom.mstt = addElement(dom.gmsgs,'div','mstt'); if(!global.flags.aw_u)dom.gmsgs.style.display='none'; 
    dom.mstt.style.textAlign='center';dom.mstt.innerHTML = 'm e s s a g e　　　l o g';
    dom.mstt.style.fontSize='1.1em'; dom.mstt.style.borderBottom='dashed 2px RoyalBlue';
    dom.mscont = addElement(dom.gmsgs,'div','mscont'); 
    dom.m_control = addElement(dom.gmsgs,'div','m_control'); 
    dom.m_b_1 = addElement(dom.m_control,'small',null,'bts_m');
    dom.m_b_1.innerHTML = 'freeze messagelog　';
    dom.m_b_1_c = addElement(dom.m_b_1,'span',null,'bts_m_b'); 
    dom.m_b_1.addEventListener('click',()=>{
      if(global.flags.m_freeze===false) {global.flags.m_freeze=true;dom.m_b_1_c.innerHTML='Ｘ'}
      else{global.flags.m_freeze=false;dom.m_b_1_c.innerHTML=''}
    });

    dom.m_b_2 = addElement(dom.m_control,'small',null,'bts_m');
    dom.m_b_2.innerHTML = '　stop combatlog　';
    dom.m_b_2.style.left='19px';
    dom.m_b_2_c = addElement(dom.m_b_2,'span',null,'bts_m_b'); 
    dom.m_b_2.addEventListener('click',()=>{
      if (global.flags.m_blh === false) {
          global.flags.m_blh = true;
          dom.m_b_2_c.innerHTML = 'Ｘ';
      }
      else {
          global.flags.m_blh = false;
          dom.m_b_2_c.innerHTML = '';
      }
    });
    dom.m_b_3 = addElement(dom.m_control,'small',null,'bts_m');
    dom.m_b_3.innerHTML = 'CLR';
    dom.m_b_3.style.width='36px';
    dom.m_b_3.style.borderRight='none';
    dom.m_b_3.style.left='38px';
    dom.m_b_3.style.textAlign='center';
    dom.m_b_3.addEventListener('click',()=>{empty(dom.mscont)});

    addDesc(dom.inv_btn_1,null,2,'Filter','All');
    addDesc(dom.inv_btn_2,null,2,'Filter','Weapons');
    addDesc(dom.inv_btn_3,null,2,'Filter','Armor');
    addDesc(dom.inv_btn_4,null,2,'Filter','Comestibles');
    addDesc(dom.inv_btn_5,null,2,'Filter','Materials/Other');
    addDesc(dom.inv_btn_1_b,null,2,'Filter','Alphabetically');
    addDesc(dom.inv_btn_2_b,null,2,'Filter','by Amount');
    addDesc(dom.inv_btn_3_b,null,2,'Filter','by Type');

    global.dscr = addElement(document.body, 'div', 'dscr');
    global.dscr.style.display='none';

    // inventory filters 
    dom.inv_btn_1.innerHTML = 'ALL';
    dom.inv_btn_2.innerHTML = 'WPN';
    dom.inv_btn_3.innerHTML = 'EQP';
    dom.inv_btn_4.innerHTML = 'USE';
    dom.inv_btn_5.innerHTML = 'OTHER';
    dom.inv_btn_1_b.innerHTML = 'A-Z';
    dom.inv_btn_2_b.innerHTML = '1-9';
    dom.inv_btn_3_b.innerHTML = 'TPE';
    dom.inv_con = addElement(dom.inv_ctx_b,'div','inv_con'); dom.inv_con.style.padding='8px';
    /*dom.inv_con.addEventListener('scroll',function(){
      for(a in this.children) {if(this.children[a].offsetTop-this.scrollTop+19<0) this.children[a].style.display='none'; else dom.inv_con[a].style.display='';}
    });*/

    // sorting filters
    dom.inv_btn_1.addEventListener('click',function(){isort(1);invbtsrst()});
    dom.inv_btn_2.addEventListener('click',function(){isort(2);invbtsrst()});
    dom.inv_btn_3.addEventListener('click',function(){isort(3);invbtsrst()});
    dom.inv_btn_4.addEventListener('click',function(){isort(4);invbtsrst()});
    dom.inv_btn_5.addEventListener('click',function(){isort(5);invbtsrst()});

    dom.inv_btn_1_b.addEventListener('click',function(){
      if(global.flags.sort_a===true){
        inv.sort(function(a,b){if(a.name<b.name) return-1; if(a.name>b.name) return 1;return 0});
        global.flags.sort_a = false; 
      } else {
        inv.sort(function(a,b){if(a.name>b.name) return-1; if(a.name<b.name) return 1;return 0});
        global.flags.sort_a = true;
      } iftrunkopenc(1);
    isort(global.sm)});

    dom.inv_btn_2_b.addEventListener('click',function(){
      if(global.flags.sort_b===true){
        inv.sort(function(a,b){if(a.amount<b.amount) return-1; if(a.amount>b.amount) return 1;if(a.name<b.name) return-1; if(a.name>b.name) return 1;return 0});
        global.flags.sort_b = false;
      } else {
        inv.sort(function(a,b){if(a.amount>b.amount) return-1; if(a.amount<b.amount) return 1;if(a.name>b.name) return-1; if(a.name<b.name) return 1;return 0});
        global.flags.sort_b = true;
      } iftrunkopenc(1);
    isort(global.sm)});

    dom.inv_btn_3_b.addEventListener('click',function(){
      if(global.flags.sort_c===true){
        inv.sort(function(a,b){if(a.id<b.id) return-1; if(a.id>b.id) return 1;if(a.name<b.name) return-1; if(a.name>b.name) return 1;return 0});
        global.flags.sort_c = false;
      } else {
        inv.sort(function(a,b){if(a.id>b.id) return-1; if(a.id<b.id) return 1;if(a.name>b.name) return-1; if(a.name<b.name) return 1;return 0});
        global.flags.sort_c = true;
      } iftrunkopenc(1);
    isort(global.sm)});

    dom.d3.update =function(){this.innerHTML=' lvl:'+you.lvl+' \''+you.title.name+'\'';}
    dom.d5_1_1.update=function(){this.innerHTML = 'hp: '+format3(you.hp.toString())+'/'+format3(you.hpmax.toString()); dom.d5_1.style.width = 100*you.hp/you.hpmax+'%'}; 
    dom.d5_2_1.update=function(){this.innerHTML = 'exp: '+format3(Math.round(you.exp).toString())+'/'+format3(you.expnext_t.toString()); dom.d5_2.style.width = 100*you.exp/you.expnext_t+'%'}; dom.d5_2_1.update();
    dom.d5_3_1.update=function(){this.innerHTML = 'energy: '+format3(Math.round(you.sat).toString())+'/'+format3(you.satmax.toString())+' eff: '+Math.round(you.efficiency()*100)+'%'; dom.d5_3.style.width = you.sat>=0?100*you.sat/you.satmax+'%':'0%'};
    dom.d6.update = function(){this.innerHTML = 'rank: '+format3(you.rank().toString())}; dom.d6.update();
    dom.hit_c = function(){
        let hit_a = hit_calc(1); let hit_b = hit_calc(2); let drk=(global.flags.isdark&&!cansee()); 
        if(hit_a>100) hit_a=100; else if(hit_a<0) hit_a=0;
        if(hit_b>100) hit_b=100; else if(hit_b<0) hit_b=0;
        dom.d8.innerHTML = 'hit chance: <span style="color:'+(drk?'darkgrey':'')+'">'+Math.round(hit_a*(drk?(.3+skl.ntst.lvl*.07):1))+'%</span> / dodge chance: '+(100-Math.round(hit_b))+'%'+(you.mods.ddgmod!==0?('(<span style="color:orange">'+you.mods.ddgmod*100+'%</span>)'):'');
    }

    // save/load/version footer
    dom.save_load = addElement(document.body, 'div', 'save_load', 'noselect');
    dom.save_load.style.zIndex = 5000;

    dom.save_load_save_btn = addElement(dom.save_load, 'span', null, 'save_load');
    dom.save_load_save_btn.innerHTML = 'save'; 
    dom.save_load_save_btn.addEventListener('click', ()=>{
        save(false);
        let temp_txt = addElement(dom.save_load, 'span');
        temp_txt.style.fontSize = '0.9em';
        temp_txt.style.padding = '3px';
        temp_txt.innerHTML = 'saved...';
        fade(temp_txt);
        setTimeout(()=>{dom.save_load.removeChild(temp_txt)}, 500);
    });

    dom.save_load_load_btn = addElement(dom.save_load, 'span', null, 'save_load');
    dom.save_load_load_btn.innerHTML = 'load';
    dom.save_load_load_btn.addEventListener('click', ()=>{
        load(null, false)
        let temp_txt = addElement(dom.save_load, 'span');
        temp_txt.style.fontSize = '0.9em';
        temp_txt.style.padding = '3px';
        temp_txt.innerHTML = 'loaded...';
        fade(temp_txt);
        setTimeout(()=>{dom.save_load.removeChild(temp_txt)}, 500);
    });

    // shows the time of the last save or indicates an unsaved game
    dom.save_load_extra = addElement(dom.save_load,'span',null,'save_load');
    dom.save_load_extra.innerHTML='<span style="color:crimson">game not saved!</span>';

    // simply pushes whatever elements in the footer that come next to the RIGHT of the screen
    dom.save_load_divider = addElement(dom.save_load, 'span', 'save_load_divider');

    // debug menu
    dom.__dbg_menu = addElement(dom.save_load, 'span', 'dbg_menu', 'save_load');
    dom.__dbg_menu.innerHTML = 'debug';

    dom.__dbg_menu.addEventListener('click', () => {

        // if there is already a menu created, don't create another one
        if (dom.__dbg_menu_1) {
            return;
        }

        const dbgButtons = [
            { label: 'Go to Intro Beast', action: () => {
                __dbgqs();
                move_to_area(chss.intro_western_woods3);
            }},
            { label: 'Go to Wake Up sequence', action: () => {
                __dbgqs();
                move_to_area(chss.shack);
            }},
            { label: 'Get water charm', action: () => {
                __dbgqs();
                giveItem(acc.river_charm);
                move_to_area(chss.shack);
            }},
        ];

        dom.__dbg_menu_1 = addElement(document.body, 'div', 'dbg_menu_1', 'dbg_menu');

        dbgButtons.forEach(b => {
            let btn = addElement(dom.__dbg_menu_1, 'div', null, 'dbg_btn');
            btn.innerHTML = b.label;
            btn.addEventListener('click', b.action);
        });

        dom.__dbg_menu_1.addEventListener('click', () => {
            document.body.removeChild(dom.__dbg_menu_1);
            dom.__dbg_menu_1 = null;
        });
    });


    // autosave element
    dom.autosve = addElement(dom.save_load,'span', 'autosve' ,'save_load');
    dom.autosve.innerHTML='autosave';

    // the actual checkbox for the autosave element
    dom.autosves_checkbox = addElement(dom.autosve, 'input', 'autosves_checkbox');
    dom.autosves_checkbox.type='checkbox';
    if (!navigator.userAgent.includes('Firefox')) dom.autosves_checkbox.style.bottom='inherit';
    dom.autosves_checkbox.addEventListener('click',function(){
        global.flags.autosave =! global.flags.autosave;
        if (global.flags.autosave===true) timers.autos=setInterval(function(){save(false);},30000); else clearInterval(timers.autos)
    });

    // delete save btn
    dom.save_load_kill = addElement(dom.save_load,'span',null,'save_load');
    dom.save_load_kill.innerHTML='delete save';
    dom.save_load_kill.addEventListener('click', ()=>{
        localStorage.clear();
        msg('Save deleted','');
        move_to_area(chss.intro);
    });

    // version
    dom.version = addElement(dom.save_load, 'div', 'version', 'save_load');
    dom.version.innerHTML = 'v470';
    dom.version.addEventListener('click',function(){
        window.alert('This is a mod of Proto23 based on version 470. This is not the official game.')
    });

    // the little arrows that close the save_load footer
    dom.save_load_arr = addElement(dom.save_load,'span', 'save_load_arr','save_load');
    dom.save_load_arr.innerHTML='>>';

    dom.save_load_arr.addEventListener('click',()=>{
        dom.save_load.style.display='none';
        if(dom.save_load_arr_n) empty(dom.save_load_arr_n); 

        dom.save_load_arr_n = addElement(document.body,'span',null,'save_load');
        dom.save_load_arr_n.innerHTML='<<';
        dom.save_load_arr_n.style.right=0;
        dom.save_load_arr_n.style.position='fixed';
        dom.save_load_arr_n.style.bottom=0;
        dom.save_load_arr_n.style.marginBottom='2px';
        dom.save_load_arr_n.style.borderRight='none';
        dom.save_load_arr_n.style.minWidth='6px';
        dom.save_load_arr_n.style.backgroundColor='lightgrey'

        dom.save_load_arr_n.addEventListener('click',()=>{
            dom.save_load.style.display='';
            empty(dom.save_load_arr_n);
            document.body.removeChild(dom.save_load_arr_n);
        });
    });

    update_db();
    update_d();

    global.text.mtp=['Human','Beast','Undead','Evil','Phantom','Dragon'];
}

function rstcrtthg() {
    for (let a in global.spbtsr) {
        global.spbtsr[a].style.color = 'inherit';
    }
}

function invbtsrst(){
  dom.inv_btn_1.removeAttribute('style');
  dom.inv_btn_2.removeAttribute('style');
  dom.inv_btn_3.removeAttribute('style');
  dom.inv_btn_4.removeAttribute('style');
  dom.inv_btn_5.removeAttribute('style');
      switch(global.sm){
          case 1: dom.inv_btn_1.style.color='black'; dom.inv_btn_1.style.backgroundColor='yellow';break;
          case 2: dom.inv_btn_2.style.color='black'; dom.inv_btn_2.style.backgroundColor='yellow';break;
          case 3: dom.inv_btn_3.style.color='black'; dom.inv_btn_3.style.backgroundColor='yellow';break;
          case 4: dom.inv_btn_4.style.color='black'; dom.inv_btn_4.style.backgroundColor='yellow';break;
          case 5: dom.inv_btn_5.style.color='black'; dom.inv_btn_5.style.backgroundColor='yellow';break;
      }
}

function update_db(){
  dom.d4_1.innerHTML = 'STR: '+Math.round(you.str_d);
  dom.d4_2.innerHTML = 'AGL: '+Math.round(you.agl_d);
  dom.d4_3.innerHTML = 'INT: '+Math.round(you.int_d);
  dom.d4_4.innerHTML = 'SPD: '+you.spd;
}

function update_d(){
    dom.d5_1_1m.innerHTML = 'hp: '+format3(global.current_m.hp.toString())+'/'+format3(global.current_m.hpmax.toString());
    dom.d5_1m.style.width = 100*global.current_m.hp/global.current_m.hpmax+'%';
    dom.d5_3_1.update();
    dom.d5_1_1.update();
}

function update_m(){
    dom.d2m.innerHTML = global.current_m.name;
    let mtp = global.text.mtp[global.current_m.type];
    if(global.current_m.id>=1) mtp += global.current_m.sex===true ? ' ♂' : ' ♀';
    dom.d3m.innerHTML = ' lvl:'+global.current_m.lvl+' \''+mtp+'\'';
    dom.d4_1m.innerHTML = 'STR: '+Math.round(global.current_m.str);
    dom.d4_2m.innerHTML = 'AGL: '+Math.round(global.current_m.agl);
    dom.d4_3m.innerHTML = 'INT: '+Math.round(global.current_m.int);
    dom.d4_4m.innerHTML = 'SPD: '+global.current_m.spd;
    dom.d9m.update();
}

function offline_a(){
  global.offline_evil_index = 0;
  for(let i in global.zone_a_p){
    let zone = global.zone_a_p[i];
    let apower = zone.apop/zone.bpop*2; 
    zone.vsize+=zone.vsize*0.0008+5;
    zone.apop+=zone.apop*(randf(Math.log(zone.apop)*0.8,Math.log(zone.apop)*1.2)/1000);
    zone.bpop+=zone.bpop*(randf(Math.log(zone.bpop)*0.8,Math.log(zone.bpop)*1.2)/1000);
    if(zone.apop>0) zone.vsize-=Math.log2(zone.apop)*2; else zone.bpop-=rand(20,50);
    if(zone.bpop>0) zone.apop-=zone.bpop/rand(40,100);
    if(zone.vsize<0) zone.apop-=rand(20,50);
    global.offline_evil_index+=zone.bpop;
  console.log('docile: '+zone.apop+' predator: '+zone.bpop+' forest: '+zone.vsize);
  }
  global.offline_evil_index=Math.sqrt(global.offline_evil_index+2100)/45;
}

function dscr(c, what, type, ttl, dsc, id) {
  const _ = {};
  id = id || 0;

  global.dscr.style.display = "";
  empty(global.dscr);

  global.dscr.style.top = (c.clientY + 30) + 'px';
  global.dscr.style.left = (c.clientX + 30) + 'px';
  global.dscr.style.zIndex = 99999;

  if (!type || type === 1) {
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = what.name;
    switch (what.rar) {
      case 0:
        {
          _.label.style.color = "grey";
          break;
        }
      case 2:
        {
          _.label.style.textShadow = "0px 0px 1px blue";
          _.label.style.color = "cyan";
          break;
        }
      case 3:
        {
          _.label.style.textShadow = "0px 0px 2px lime";
          _.label.style.color = "lime";
          break;
        }
      case 4:
        {
          _.label.style.textShadow = "0px 0px 3px orange";
          _.label.style.color = "yellow";
          break;
        }
      case 5:
        {
          _.label.style.textShadow = "0px 0px 2px crimson,0px 0px 5px red";
          _.label.style.color = "orange";
          break;
        }
      case 6:
        {
          _.label.style.textShadow = "1px 1px 1px black,0px 0px 2px purple";
          _.label.style.color = "purple";
          break;
        }
    }
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = typeof what.desc === "function" ? what.desc(what) : what.desc;
    if (what.slot > 0) {
      if (what.slot === 1) {
        if (what.str > 0) _.text.innerHTML += "STR: <span style='color:lime'> +" + what.str + "</span><br>"; else if (what.str < 0) _.text.innerHTML += "STR: <span style='color:red'>" + what.str + "</span><br>";
      } else {
        if (what.str > 0) _.text.innerHTML += "DEF: <span style='color:lime'> +" + what.str + "</span><br>"; else if (what.str < 0) _.text.innerHTML += "DEF: <span style='color:red'>" + what.str + "</span><br>";
      }
      if (what.agl > 0) _.text.innerHTML += "AGL: <span style='color:lime'> +" + what.agl + "</span><br>"; else if (what.agl < 0) _.text.innerHTML += "AGL: <span style='color:red'>" + what.agl + "</span><br>";
      if (what.int > 0) _.text.innerHTML += "INT: <span style='color:lime'> +" + what.int + "</span><br>"; else if (what.int < 0) _.text.innerHTML += "INT: <span style='color:red'>" + what.int + "</span><br>";
      if (what.spd > 0) _.text.innerHTML += "SPD: <span style='color:lime'> +" + what.spd + "</span><br>"; else if (what.spd < 0) _.text.innerHTML += "SPD: <span style='color:red'>" + what.spd + "</span><br>";
      if (what.slot < 8) {
        _.dp_c = addElement(global.dscr, "div", "dr_l");
        _.dp_t = addElement(_.dp_c, "small");
        _.dp_t.innerHTML = "DP:";
        _.dp_m = addElement(_.dp_c, "small", "dp_m");
        _.dp_mn = addElement(_.dp_m, "small");
        _.dp_mn.innerHTML = (what.dp * 10 << 0) / 10 + "/" + what.dpmax;
        _.dp_mn.style.textShadow = "1px 1px black";
        _.dp_mn.style.position = "inherit";
        _.dp_mn.style.top = -4;
        _.dp_mn.style.padding = 1;
        _.dp_mn.style.left = "35%";
        let dp = what.dp * 100 / what.dpmax;
        _.dp_m.style.width = dp + "%";
        if (dp >= 90) _.dp_m.style.backgroundColor = "royalblue"; else if (dp < 90 && dp >= 70) _.dp_m.style.backgroundColor = "green"; else if (dp < 70 && dp >= 35) _.dp_m.style.backgroundColor = "yellow"; else if (dp < 35 && dp >= 10) _.dp_m.style.backgroundColor = "orange"; else if (dp < 10) _.dp_m.style.backgroundColor = "red";
        clearInterval(timers.dp_tmr);
        timers.dp_tmr = setInterval(function () {
          let dp = what.dp * 100 / what.dpmax;
          _.dp_mn.innerHTML = (what.dp * 10 << 0) / 10 + "/" + what.dpmax;
          _.dp_m.style.width = dp + "%";
          if (dp >= 90) _.dp_m.style.backgroundColor = "royalblue"; else if (dp < 90 && dp >= 70) _.dp_m.style.backgroundColor = "green"; else if (dp < 70 && dp >= 35) _.dp_m.style.backgroundColor = "yellow"; else if (dp < 35 && dp >= 10) _.dp_m.style.backgroundColor = "orange"; else if (dp < 10) _.dp_m.style.backgroundColor = "red";
        }, 1e3);
      }
      _.sltic = addElement(global.dscr, "div", "intfffx");
      _.sltic.style.textAlign = "left";
      let slti = addElement(_.sltic, "small");
      slti.innerHTML = "<br>Class: ";
      if (!!what.wtype) {
        switch (what.wtype) {
          case 0:
            slti.innerHTML += "Unarmed";
            break;
          case 1:
            slti.innerHTML += "Sword";
            break;
          case 2:
            slti.innerHTML += "Axe";
            break;
          case 3:
            slti.innerHTML += "Knife";
            break;
          case 4:
            slti.innerHTML += "Spear/Polearm";
            break;
          case 5:
            slti.innerHTML += "Club/Hammer";
            break;
          case 6:
            slti.innerHTML += "Staff/Wand";
            break;
          case 7:
            slti.innerHTML += "Bow/Crossbow";
            break;
        }
      } else {
        switch (what.slot) {
          case 2:
            slti.innerHTML += "Shield";
            break;
          case 3:
            slti.innerHTML += "Head";
            break;
          case 4:
            slti.innerHTML += "Body";
            break;
          case 5:
            slti.innerHTML += "Hands";
            break;
          case 6:
            slti.innerHTML += "Hands";
            break;
          case 7:
            slti.innerHTML += "Legs";
            break;
          case 8:
            slti.innerHTML += "Accessory";
            break;
          case 9:
            slti.innerHTML += "Accessory";
            break;
          case 10:
            slti.innerHTML += "Accessory";
            break;
        }
      }
      if (what.twoh === true) slti.innerHTML += " (2H)";
      if (what.slot === 1) switch (what.ctype) {
        case 0:
          slti.innerHTML += ", Edged";
          break;
        case 1:
          slti.innerHTML += ", Piercing";
          break;
        case 2:
          slti.innerHTML += ", Blunt";
          break;
      }
      if (what.data.kills) {
        let sp = addElement(_.sltic, "small");
        sp.style.position = "absolute";
        sp.style.right = 6;
        sp.innerHTML = "kills: " + col(what.data.kills, "yellow");
        clearInterval(timers.wpnkilsch);
        timers.wpnkilsch = setInterval(function () {
          sp.innerHTML = "kills: " + col(what.data.kills, "yellow");
        }, 1e3);
      }
    } else {
      _.sltic = addElement(global.dscr, "div");
      _.sltic.style.textAlign = "left";
      let slti = addElement(_.sltic, "small");
      slti.innerHTML = "<br>Class: ";
      if (what.isf === true) {
        slti.innerHTML += "Furniture";
        _.text.innerHTML += dom.dseparator + '<span style="color:chartreuse">Use to add to the furniture list</span>';
        if (what.parent) {
          let owned = false;
          let sp = addElement(_.sltic, "small");
          sp.style.position = "absolute";
          sp.style.right = 6;
          for (let a in furn) if (furn[a].id === what.parent.id) {
            owned = true;
            break;
          }
          ;
          sp.innerHTML = 'owned: <span style="color:' + (owned ? "lime" : "red") + '">' + (owned ? "yes" : "no") + "</span>";
        }
      } else if (what.id < 3e3) {
        slti.innerHTML += "Food";
        if (what.rot) slti.innerHTML += '(<span style="color:orange">perishable</span>)';
      } else if (what.id >= 3e3 && what.id < 5e3) slti.innerHTML += "Medicine/Tool"; else if (what.id >= 5e3 && what.id < 9e3) slti.innerHTML += "Material/Misc"; else slti.innerHTML += "Book";
    }
    if (what.id < 3e3) {
      dom.dtrd = addElement(_.sltic, "small");
      dom.dtrd.innerHTML = "Tried: ";
      dom.dtrd.style.position = "relative";
      dom.dtrd.style.right = 1;
      dom.dtrd.style.float = "right";
      if (what.data.tried === true) dom.dtrd.innerHTML += '<span style="color: lime">Yes</span>'; else dom.dtrd.innerHTML += '<span style="color: crimson">Never</span>';
    }
    if (what.id >= 9e3 && what.id < 1e4) {
      dom.dtrd = addElement(_.sltic, "small");
      dom.dtrd.innerHTML = "Read: ";
      dom.dtrd.style.position = "relative";
      dom.dtrd.style.right = 1;
      dom.dtrd.style.float = "right";
      if (what.data.finished === true) dom.dtrd.innerHTML += '<span style="color: lime">Yes</span>'; else dom.dtrd.innerHTML += '<span style="color: crimson">Never</span>';
    }
    _.rar_c = addElement(global.dscr, "div", "d_l");
    _.rar = addElement(_.rar_c, "small");
    _.rar.innerHTML = "<br>Rarity: ";
    _.rar.style.position = "relative";
    _.rar.style.float = "left";
    for (let i = 0; i < what.rar; i++) _.rar.innerHTML += " ★ ";
    dom.dscshe = addElement(global.dscr, "div");
    global.shiftitem = {item: what};
  } else if (type === 2) {
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = ttl;
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = dsc;
  } else if (type === 3) {
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = global.current_m.name;
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = global.current_m.desc;
  } else if (type === 4) {
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = ttl;
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = dsc;
    dom.gde = addElement(global.dscr, "small");
    dom.gde.style.position = "relative";
    dom.gde.style.float = "left";
    dom.gde.innerHTML = "<br>Duration: ";
    if (what.duration !== -1) dom.gde.innerHTML += what.duration; else dom.gde.innerHTML += "∞";
    if (what.power) {
      dom.gde1 = addElement(global.dscr, "small");
      dom.gde1.style.position = "relative";
      dom.gde1.style.float = "right";
      dom.gde1.innerHTML = "<br>Power: ";
      dom.gde1.innerHTML += what.power;
    }
    clearInterval(timers.inup);
    timers.inup = setInterval(function () {
      dom.gde.innerHTML = "<br>Duration: ";
      if (what.duration !== -1) dom.gde.innerHTML += what.duration; else dom.gde.innerHTML += "∞";
    }, 200);
  } else if (type === 5) {
    let t = ttl === true ? you.title : what;
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = t.name;
    switch (t.rar) {
      case 0:
        {
          _.label.style.color = "grey";
          break;
        }
      case 2:
        {
          _.label.style.textShadow = "0px 0px 1px blue";
          _.label.style.color = "cyan";
          break;
        }
      case 3:
        {
          _.label.style.textShadow = "0px 0px 2px lime";
          _.label.style.color = "lime";
          break;
        }
      case 4:
        {
          _.label.style.textShadow = "0px 0px 3px orange";
          _.label.style.color = "yellow";
          break;
        }
      case 5:
        {
          _.label.style.textShadow = "0px 0px 2px crimson,0px 0px 5px red";
          _.label.style.color = "orange";
          break;
        }
      case 6:
        {
          _.label.style.textShadow = "1px 1px 1px black,0px 0px 2px purple";
          _.label.style.color = "purple";
          break;
        }
      case 7:
        {
          _.dl.style.textShadow = "hotpink 1px 1px .1em,cyan -1px -1px .1em";
          _.dl.style.color = "black";
          break;
        }
    }
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = t.desc;
    if (t.talent) _.text.innerHTML += dom.dseparator + '<small style="color:cyan">talent effect<br></small><br><small style="color:darkorange">' + t.tdesc + "</small>";
    _.dl = addElement(global.dscr, "small");
    _.dl.style.position = "relative";
    _.dl.style.display = "flex";
    _.dl.innerHTML = "<br>Rank: " + (ttl === true ? you.title.id === 0 ? "0" : you.title.rar : what.id === 0 ? "0" : what.rar);
    if (ttl === true && you.title.rars === true || !ttl && what.rars === true) _.dl.innerHTML += "★";
  } else if (type === 6) {
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = !!what.bname ? what.bname : what.name;
    _.sp = addElement(_.label, "small");
    _.sp.style.position = "absolute";
    _.sp.style.right = 6;
    _.sp.innerHTML = "Ｐ: " + col(Math.round(what.p * 100) + "%", "magenta");
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = typeof what.desc === "function" ? what.desc(what) : what.desc;
    if (!!what.mlstn) {
      _.prks = addElement(global.dscr, "div", "d_l");
      _.prks.innerHTML = "<br>Perks unlocked";
      _.prks.style.color = "cyan";
      for (let k = 0; k < what.mlstn.length; k++) if (what.mlstn[k].g === true) {
        _.prk = addElement(global.dscr, "div", "d_t");
        _.prk.innerHTML = "lvl " + what.mlstn[k].lv + ':<span style="color:yellow"> ' + what.mlstn[k].p + " </span>";
      } else {
        _.prk = addElement(global.dscr, "div", "d_t");
        _.prk.innerHTML = "lvl " + what.mlstn[k].lv + ':<span style="color:yellow"> ' + "??????????" + " </span>";
        return;
      }
    }
  } else if (type === 7) {
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = what.x;
    _.label.style.color = "tomato";
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = what.y;
  } else if (type === 8) {
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = what.name;
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = typeof what.desc === "function" ? what.desc(what) : what.desc;
    _.dl = addElement(global.dscr, "small");
    _.dl.style.position = "relative";
    _.dl.style.display = "flex";
    _.dl.innerHTML = "<br>Rank: ";
    _.db = addElement(_.dl, "div");
    for (let i = 0; i < what.rar; i++) _.db.innerHTML += "★";
    _.db.style.paddingTop = 12;
    _.db.style.paddingLeft = 6;
    switch (what.rar) {
      case 0:
        {
          _.label.style.color = _.db.style.color = "grey";
          break;
        }
      case 2:
        {
          _.label.style.textShadow = _.db.style.textShadow = "0px 0px 1px blue";
          _.label.style.color = _.db.style.color = "cyan";
          break;
        }
      case 3:
        {
          _.label.style.textShadow = _.db.style.textShadow = "0px 0px 2px lime";
          _.label.style.color = _.db.style.color = "lime";
          break;
        }
      case 4:
        {
          _.label.style.textShadow = _.db.style.textShadow = "0px 0px 3px orange";
          _.label.style.color = _.db.style.color = "yellow";
          break;
        }
      case 5:
        {
          _.label.style.textShadow = _.db.style.textShadow = "0px 0px 2px crimson,0px 0px 5px red";
          _.label.style.color = _.db.style.color = "orange";
          break;
        }
      case 6:
        {
          _.label.style.textShadow = _.db.style.textShadow = "1px 1px 1px black,0px 0px 2px purple";
          _.label.style.color = _.db.style.color = "purple";
          break;
        }
      case 7:
        {
          _.label.style.textShadow = _.db.style.textShadow = "hotpink 1px 1px .1em,cyan -1px -1px .1em";
          _.label.style.color = _.db.style.color = "black";
          break;
        }
    }
  } else if (type === 9) {
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = what.name;
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = typeof what.desc === "function" ? what.desc(what) : what.desc;
  } else if (type === 10) {
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = what.name;
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = what.desc + dom.dseparator;
    let t = Object.keys(global.drdata);
    let ids = [];
    for (let a in t) ids[a] = Number(t[a].substring(1));
    _.o = addElement(_.text, "small");
    _.o.innerHTML = "drop table";
    _.o.style.color = "cyan";
    let thing = false;
    for (let a in ids) {
      if (ids[a] === what.id || what.un) {
        let dt = global.drdata[Object.keys(global.drdata)[a]];
        thing = true;
        for (let b in what.drop) {
          _.dbig = addElement(_.text, "div");
          _.dbig.style.display = "flex";
          _.dbig.style.border = "#1f72a2 1px solid";
          _.dbig.style.backgroundColor = "#202031";
          _.dcell1 = addElement(_.dbig, "div");
          _.dcell2 = addElement(_.dbig, "div");
          _.dbig.style.textAlign = "center";
          _.dcell1.style.width = "80%";
          _.dcell1.style.borderRight = "#1f72a2 1px solid";
          _.dcell2.style.width = "20%";
          if (b != what.drop.length - 1) _.dbig.style.borderBottom = "none";
          _.dcell2.innerHTML = (what.drop[b].chance * 1e8 << 0) / 1e6 + "%";
          if (what.drop[b].chance >= 0.05) _.dcell2.style.color = "lime"; else if (what.drop[b].chance < 0.05 && what.drop[b].chance > 0.01) _.dcell2.style.color = "yellow"; else if (what.drop[b].chance <= 0.01 && what.drop[b].chance > 0.001) _.dcell2.style.color = "orange"; else if (what.drop[b].chance <= 0.001) _.dcell2.style.color = "crimson";
          if (dt[b] || what.un) {
            _.dcell1.innerHTML += what.drop[b].item.name;
            if (what.drop[b].cond && !what.drop[b].cond()) {
              _.dcell1.style.textDecoration = "line-through";
              _.dcell1.style.color = "red";
            }
            switch (what.rar) {
              case 0:
                {
                  _.dcell1.style.color = "grey";
                  break;
                }
              case 2:
                {
                  _.dcell1.style.textShadow = "0px 0px 1px blue";
                  _.dcell1.style.color = "cyan";
                  break;
                }
              case 3:
                {
                  _.dcell1.style.textShadow = "0px 0px 2px lime";
                  _.dcell1.style.color = "lime";
                  break;
                }
              case 4:
                {
                  _.dcell1.style.textShadow = "0px 0px 3px orange";
                  _.dcell1.style.color = "yellow";
                  break;
                }
              case 5:
                {
                  _.dcell1.style.textShadow = "0px 0px 2px crimson,0px 0px 5px red";
                  _.dcell1.style.color = "orange";
                  break;
                }
              case 6:
                {
                  _.dcell1.style.textShadow = "1px 1px 1px black,0px 0px 2px purple";
                  _.dcell1.style.color = "purple";
                  break;
                }
            }
            if (what.drop[b].max) {
              _.dcell1b = addElement(_.dcell1, "small");
              _.dcell1b.style.color = "inherit";
              _.dcell1b.style.position = "absolute";
              _.dcell1b.style.right = 70;
              _.dcell1b.style.paddingTop = 2;
              _.dcell1b.innerHTML = what.drop[b].max;
              if (what.drop[b].min && what.drop[b].min !== what.drop[b].max) _.dcell1b.innerHTML += "-" + what.drop[b].min;
            }
          } else {
            _.dcell1.innerHTML = "???????????";
            _.dcell1.style.color = "yellow";
          }
        }
        break;
      }
    }
    if (!thing) {
      for (let b in what.drop) {
        _.dbig = addElement(_.text, "div");
        _.dbig.style.display = "flex";
        _.dbig.style.border = "#1f72a2 1px solid";
        _.dbig.style.backgroundColor = "#202031";
        _.dcell1 = addElement(_.dbig, "div");
        _.dcell2 = addElement(_.dbig, "div");
        _.dbig.style.textAlign = "center";
        _.dcell1.style.width = "80%";
        _.dcell1.style.borderRight = "#1f72a2 1px solid";
        _.dcell2.style.width = "20%";
        if (b != what.drop.length - 1) _.dbig.style.borderBottom = "none";
        _.dcell1.innerHTML = "???????????";
        _.dcell1.style.color = "yellow";
        _.dcell2.innerHTML = (what.drop[b].chance * 1e8 << 0) / 1e6 + "%";
        if (what.drop[b].chance >= 0.05) _.dcell2.style.color = "lime"; else if (what.drop[b].chance < 0.05 && what.drop[b].chance > 0.01) _.dcell2.style.color = "yellow"; else if (what.drop[b].chance <= 0.01 && what.drop[b].chance > 0.001) _.dcell2.style.color = "orange"; else if (what.drop[b].chance <= 0.001) _.dcell2.style.color = "crimson";
      }
    }
  } else if (type === 12) {
    _.label = addElement(global.dscr, "div", "d_l");
    _.label.innerHTML = ttl;
    _.text = addElement(global.dscr, "div", "d_t");
    _.text.innerHTML = typeof dsc === "function" ? dsc(what) : dsc;
  }
}


function msg(txt,c,dsc,type,bc,chck){ 
  if(global.flags.m_freeze===false&&global.flags.loadstate===false){
    while(dom.gmsgs.children[1].children.length>global.msgs_max-1) dom.gmsgs.children[1].removeChild(dom.gmsgs.children[1].children[0]);
    let msg = addElement(dom.mscont,'div',null,'msg');
    if(global.flags.msgtm){ let now = new Date();
      let g = addElement(msg,'small'); g.innerHTML='['+(now.getHours()<10?('0'+now.getHours()):now.getHours())+':'+(now.getMinutes()<10?('0'+now.getMinutes()):now.getMinutes())+':'+(now.getSeconds()<10?('0'+now.getSeconds()):now.getSeconds())+']'
      g.style.backgroundColor='#242848'; g.style.display='flex';
    }
    let mtxt = addElement(msg,'span');
    if (dsc) {if(type) addDesc(msg,dsc,type);else addDesc(msg,dsc);} 
    //let nt = new String(); for(let a in txt){nt+=txt[a].charCodeAt()!==32?String.fromCharCode(41216-txt[a].charCodeAt()):' '}; txt=nt;
    if (c) mtxt.innerHTML = '<span style=color:'+c+(bc?(';background-color:'+bc):'')+'>'+txt+'</span>';
    else mtxt.innerHTML = txt; dom.mscont.scrollTop = dom.mscont.scrollHeight; global.lastmsg=msg.innerHTML; 
    //if(true) {if(msg.innerHTML==global.lstmsg) msg.innerHTML=global.lastmsg+'('+(++global.lastmsgc)+')';
    //  else {global.lastmsg=msg.innerHTML;global.lastmsgc=0;}} else global.lastmsg=msg.innerHTML;
  } 
}

function _msg(txt,c,dsc,type,bc,chck){
  while(dom.gmsgs.children[1].children.length>global.msgs_max-1) dom.gmsgs.children[1].removeChild(dom.gmsgs.children[1].children[0]);
  let msg = addElement(dom.mscont,'div',null,'msg');
  if (dsc) {if(type) addDesc(msg,dsc,type);else addDesc(msg,dsc);}
  if (c) msg.innerHTML = '<span style=color:'+c+(bc?(';background-color:'+bc):'')+'>'+txt+'</span>';
  else msg.innerHTML = txt; dom.mscont.scrollTop = dom.mscont.scrollHeight;
}

function msg_add(txt,c,bc,shd){
  if(global.flags.m_freeze===false&&global.flags.loadstate===false){
    let bac=''; let b='';
    if (bc) bac = 'background-color:'+bc;
    if (shd) b='text-shadow:'+shd.toString(); else b='';
    if (c) dom.gmsgs.children[1].children[dom.gmsgs.children[1].children.length-1].innerHTML += '<span style=\"color:'+c+';'+bac+';'+b+'\">'+txt+'</span>';
    else dom.gmsgs.children[1].children[dom.gmsgs.children[1].children.length-1].innerHTML += txt;
    dom.mscont.scrollTop = dom.mscont.scrollHeight;
  }
}

function format(thing,what){
  msg('wHw')
}

function appear(...dom_elements){
    for (let elem of dom_elements) {
        if (elem instanceof HTMLElement) {
            let tmr = 0;
            elem.style.opacity=0;
            elem.style.display='';
            let a = setInterval(()=>{
                tmr++;
                elem.style.opacity=tmr/100;
                if(tmr===100) clearInterval(a);
            }, 10);
        }
    }
}

function fade(dom, timer, del){
    let tmr = (timer || 50);
    dom.style.opacity = 1;
    dom.style.display = '';
    let a = setInterval( () => {
        tmr--;
        dom.style.opacity = tmr / (timer || 50);
        if (tmr === 0) {
            clearInterval(a);
            if (del === true) {
                document.body.removeChild(dom);
            }
        }
    }, 10);
}

function addDesc(dm, what, type, ttl, dsc, f, id){
    dm.addEventListener('mouseenter', a => {
            dscr(a, what, type, ttl, f === true ? (dsc)() : dsc, id);
            giveSkExp(skl.rdg, 0.002);
            global.stat.popt++; //** poptart
            global.curwds = this;
            global.shiftid = id;
            if (global.kkey === 1) {
                descsinfo(global.shiftid);
            }
        });
        
    dm.addEventListener('mousemove', a => {
            global.dscr.style.top = (a.clientY + 30 + global.dscr.clientHeight > window.innerHeight ? window.innerHeight - global.dscr.clientHeight - 10 : a.clientY + 30) + 'px';
            global.dscr.style.left = (a.clientX + 30 + global.dscr.clientWidth > window.innerWidth ? window.innerWidth - global.dscr.clientWidth - 10 : a.clientX + 30) + 'px';
        });
    
    dm.addEventListener('mouseleave', () => {
        global.shiftid = 0;
        empty(global.dscr);
        global.dscr.style.display = 'none';
        clearInterval(timers.inup);
        clearInterval(timers.dp_tmr);
        clearInterval(timers.wpnkilsch);
        if (dom.dscshe) {
            dom.dscshe.innerHTML='';
        }
    });
}

function allbuff(who){
    who.stat_r();
    for(let g in who.eff) if(who.eff[g].type===1) who.eff[g].use(who.eff[g].y,who.eff[g].z); 
    if(who.id===you.id){
        let dm = skl.fgt.use(); if(you.eqp[0].twoh===true) dm+=skl.twoh.use(); 
        you.str+=dm; you.int+=dm;
        usePlayerWeaponSkill();
    }
}

function fght(att,def){
    /*if(global.flags.btlinterrupt===true){
        msg('battle interrupted');if(global.current_z.size>0) {zone_init(global.current_z);global.current_z.size--;}else if(global.current_z.size===-1)zone_init(global.current_z);else {msg('Area cleared','orange');global.current_z.onEnd();global.flags.civil=true;global.flags.btl=false;}; dom.d7m.update(); global.flags.btlinterrupt=false; return;
    }*/
    if(!att.alive||!def.alive){
        return;
    }
    if(global.flags.smkactv){global.flags.smkactv=false; return;}
    att.stat_r(); def.stat_r();
    for(let g in att.eff) if(att.eff[g].type===1) att.eff[g].use(att.eff[g].y,att.eff[g].z); 
    for(let g in def.eff) if(def.eff[g].type===1) def.eff[g].use(def.eff[g].y,def.eff[g].z); 
    if(att.spd>0&&def.spd>0) { 
        global.s_l += Math.abs(att.spd-def.spd); 
    } else {
        global.s_l = Math.abs(att.spd-def.spd);
    }
    let inn,sc; if(att.spd>=def.spd || att.spd <= 0) {inn=att;sc=def;} else {inn=def;sc=att}; 
    global.miss=0; let isyouinn=inn.id===you.id; 
    //if(isyouinn===false){if(random()<.9){console.log('stealth active'); inn=att; sc=def}}
    if(inn.spd>0){
        if(global.s_l/sc.spd>=2){
        let acc_dmg=0; let hts = 0; global.flags.multih=true;
        for (let ii=0;ii<Math.ceil(global.s_l/sc.spd);ii++){ 
            hts++; 
            acc_dmg += inn.battle_ai(inn,sc); 
            if (sc.hp<=0) break;
        } 
        global.flags.multih=false; if(att.id===you.id&&acc_dmg>=sc.hpmax) global.stat.onesht++;
        if(global.flags.m_blh===false && (hts-global.miss) > 0){
            if(hts===1) printHitMessage(inn.name, acc_dmg, !isyouinn);else
            printMultihitMessage(hts, inn.name, acc_dmg, !isyouinn);
        }
        else if(global.flags.m_blh===false) msg(inn.name+' missed','grey');
        if (sc.hp<=0&&sc.alive===true) {global.atkdfty=[3,global.atkdftydt];sc.onDeath(inn);sc.onDeathE(inn);}
        global.s_l=global.s_l%sc.spd; 
        } else {
        doSingleAttack(inn, sc, isyouinn);
        }
    }
    if(!sc.alive) {
    you.stat_r(); return;
    }
    timers.btl2=setTimeout(function(){
        if(global.flags.btl===true){ 
        doSingleAttack(sc, inn, !isyouinn);you.stat_r();
        }
    },500/global.fps);
}

function attack(att,def,atk,power){ if(!global.flags.btl) return
    allbuff(att); allbuff(def);
    atk=atk||abl.default; let isyou=att.id===you.id; global.mabl=atk;
    let dmg; let hit; let dk=false
    let a = 2+rand(4);
    if(isyou===true){ wpnhitstt();
        hit=hit_calc(1);giveSkExp(skl.fgt,def.rnk); dk = global.flags.isdark&&!cansee();
        if(dk) hit*=.3+skl.ntst.lvl*.07;
    } else hit = hit_calc(2);
    global.target = you.eqp[a]; global.t_n = a;
    if(rand(100)<hit){
        global.target_g = a;
        if(isyou===true){
        let t = you.eqp[0].dp>0?1:.5;
        switch(you.eqp[0].wtype){
            case 0:giveSkExp(skl.unc,t);break;
            case 1:giveSkExp(skl.srdc,t);break;
            case 2:giveSkExp(skl.axc,t);break;
            case 3:giveSkExp(skl.knfc,t);break;
            case 4:giveSkExp(skl.plrmc,t);break;
            case 5:giveSkExp(skl.hmrc,t);break;
            case 6:giveSkExp(skl.stfc,t);break;
            } 
            if(dk) giveSkExp(skl.ntst,.1);
            if(you.mods.tstl>0) {
            itm = select(def.drop); if(random()<(itm.chance+(itm.chance/100*you.luck))*.01*skl.stel.use()) {giveItem(itm.item);giveSkExp(skl.stel,1/itm.chance*10)} else giveSkExp(skl.stel,1);
            }
        } else {
            if(you.eqp[1].id!==10000&&!you.eqp[0].twoh) giveSkExp(skl.shdc,.2);you.stat_r();
        if(you.mods.ddgmod!==0)if(random()<you.mods.ddgmod){global.miss++;if(global.flags.m_blh===false&&(!global.flags.multih&&global.flags.m_blh===false))msg(att.name+' missed','grey');global.flags.msd=true;giveSkExp(skl.evas,.5);return 0}
        } 
        dmg = Math.round(atk.f(att,def,power)); 
        def.hp-=dmg;
        global.flags.msd=false;
        if(global.flags.m_blh===false&&(!global.flags.multih&&global.flags.m_blh===false)) printHitMessage(att.name, dmg, att.id===you.id?false:true);
        if(isyou===true) {dom.d8_2.innerHTML='Critical chance: '+(Math.round(you.mods.crflt*1000+((you.crt*(2-(you.sat/you.satmax+you.mods.sbonus)*2)+you.crt)*(you.luck/25+1)+skl.seye.use())*1000)/10)+'%';if(you.eqp[0].id!=10000) you.eqp[0].dp>0?you.eqp[0].dp-=.008:you.eqp[0].dp=0; global.stat.dmgdt+=dmg;
        if(global.flags.eshake===true){dom.d1m.style.left=parseInt(global.special_x)+rand(-3,3)+'px'; dom.d1m.style.top=parseInt(global.special_y)+rand(-3,3)+'px';
        setTimeout(()=>{dom.d1m.style.left=parseInt(global.special_x)+'px'; dom.d1m.style.top=parseInt(global.special_y)+'px';},60);
        }}
        else {if(global.target.id!==10000)global.target.dp>0?global.target.dp-=.008:global.target.dp=0;if(you.eqp[1].id!==10000)you.eqp[1].dp>0?you.eqp[1].dp-=.008:you.eqp[1].dp=0; if(dmg>0) giveSkExp(skl.painr,1); if(global.target.id===10000&&dmg>0)giveSkExp(skl.tghs,dmg*.05); global.stat.dmgrt+=dmg}
    } else {global.miss++;global.stat.misst++;;if(global.flags.m_blh===false&&(!global.flags.multih&&global.flags.m_blh===false))msg(att.name+' missed','grey');global.flags.msd=true;if(dk)giveSkExp(skl.ntst,.01);if(!isyou) global.stat.dodgt++;}update_d();
        if(!global.flags.multih) {if(isyou&&dmg>=def.hpmax) global.stat.onesht++; if (def.hp<=0&&def.alive===true) {global.atkdfty=[3,global.atkdftydt];def.onDeath(att);def.onDeathE(att);}}
    return dmg||0;
}

function tattack(pow,type,e){
    let dmg; let ddat = skl.thr.use(); let m = global.current_m; global.atkdftm[0]=type;
    let agl_bonus=0; let spd=m.spd>0?m.spd:0; for(let i=0;i<you.eqp.length;i++) agl_bonus+=you.eqp[i].agl;
    let hit = ((you.agl+agl_bonus/2)*you.efficiency())/((spd*5+m.agl))*130+5+ddat.b; 
    giveSkExp(skl.thr,e); giveSkExp(skl.fgt,skl.thr.lvl*5+1); 
    if(rand(100)<hit){ 
        dmg = Math.round(((1+you.str_r*.05)*(you.efficiency()+1)*pow*(ddat.a+1))/2); global.stat.dmgdt+=dmg;
        if(!global.flags.m_blh)msg('You hit '+global.current_m.name+' for <span style="color:hotpink">'+dmg+'</span> damage','yellow');
        global.current_m.hp-=dmg;if(m.hp<=0&&m.alive===true) {m.onDeath(you);m.onDeathE();} dom.d5_1_1m.update();
        if(global.flags.eshake===true){dom.d1m.style.left=parseInt(global.special_x)+rand(-3,3)+'px'; dom.d1m.style.top=parseInt(global.special_y)+rand(-3,3)+'px';
        setTimeout(()=>{dom.d1m.style.left=parseInt(global.special_x)+'px'; dom.d1m.style.top=parseInt(global.special_y)+'px';},60);
        } 
    } else {if(global.flags.m_blh===false)msg(you.name+' missed','grey');}
}

function dmg_calc(att,def,atk){ let isyou=att.id===you.id;
    let atea = atk.aff||isyou?att.eqp[0].atype:att.atype;
    let atcs = atk.class||isyou?att.eqp[0].ctype:att.ctype;
    global.atype_d = atk.aff||att.atype;
    let ta = effect.tarnish.active===true?.7:(effect.prostasia.active===true?1.3:1);
    let eff = you.efficiency(); let dmg = 0; let b = 1; 
    if(atk.stt===1){
        if(isyou===true){ global.atype_d=atk.aff||you.eqp[0].atype; global.atkdftm=[atea,atcs,0]; 
        let b = you.luck/25+1; let undc = 0; if(you.eqp[0].id===10000) undc=you.mods.undc;
        dmg = (att.str*eff+(((att.eqp[0].str+undc)*(att.eqp[0].dp/att.eqp[0].dpmax)*.9+.1)*(att.eqp[0].id===10000?1:ta)))*(100+(att.eqp[0].aff[atea]*10+atk.affp*10+att.eqp[0].cls[atcs]*10+att.maff[global.current_m.type]*10+att.aff[atea]*10)*(att.eqp[0].id===10000?1:ta))/100-(def.str*(100+def.aff[atea]*5+def.cls[atcs]*5)/100)+1; 
        } else {dmg = (att.str*(100+att.eqp[0].aff[att.atype]*10+atk.affp*10+att.eqp[0].cls[att.ctype]*10)/100-((def.str*eff+(global.target.str*((global.target.dp/global.target.dpmax)*.85+.15)*ta))*(100+global.target.aff[att.atype]*5*ta+global.target.cls[att.ctype]*5*ta+you.caff[att.atype]*10+you.cmaff[global.current_m.type]*10+you.ccls[att.ctype]*10)/100+((you.eqp[1].str*(1+skl.shdc.lvl/20)*(you.eqp[1].dp/you.eqp[1].dpmax)*.6+.4)*ta)/2)*(100-(you.eqp[1].aff[att.atype]*5*(1+skl.shdc.lvl/20)+global.target.cls[att.ctype]*5*(1+skl.shdc.lvl/20)*ta))/100);  b = 1;}
        }
    else if(atk.stt===2){
        if(isyou===true){ global.atype_d=atk.aff||you.eqp[0].atype;
        let b = you.luck/20+1;
        dmg = (att.int*eff+((att.eqp[0].int*(att.eqp[0].dp/att.eqp[0].dpmax)*.9+.1)*(att.eqp[0].id===10000?1:ta)))*(100+(att.eqp[0].aff[atea]*10+atk.affp*10+att.eqp[0].cls[atcs]*10+att.maff[global.current_m.type]*10+att.aff[atea]*10)*(att.eqp[0].id===10000?1:ta))/100-(def.int*(100+def.aff[atea]*5+def.cls[atcs]*5)/100)+1; 
        } else {dmg = (att.int*(100+att.eqp[0].aff[att.atype]*15+atk.affp*15+att.eqp[0].cls[att.ctype]*5)/100-((def.int*eff+(global.target.int*((global.target.dp/global.target.dpmax)*.85+.15)*ta))*(100+global.target.aff[att.atype]*5*ta+global.target.cls[att.ctype]*5*ta+you.caff[att.atype]*10+you.cmaff[global.current_m.type]*10+you.ccls[att.ctype]*10)/100+((you.eqp[1].int*(1+skl.shdc.lvl/20)*(you.eqp[1].dp/you.eqp[1].dpmax)*.6+.4)*ta)/2)*(100-(you.eqp[1].aff[att.atype]*5*(1+skl.shdc.lvl/20)+global.target.cls[att.ctype]*5*(1+skl.shdc.lvl/20)*ta))/100);  b = 1;}
        } 
        let ran = random(); let c = 0; if(isyou===true) c=skl.seye.use(); let ctr_r = (att.crt*(2-(you.sat/you.satmax+you.mods.sbonus)*2)+att.crt)*b+c+you.mods.crflt; 
        if(isyou===false&&dmg>0){ 
        switch(global.atype_d){
            case 1: giveSkExp(skl.aba,dmg*.01); break;
            case 2: giveSkExp(skl.abe,dmg*.01); break;
            case 3: giveSkExp(skl.abf,dmg*.01); break;
            case 4: giveSkExp(skl.abw,dmg*.01); break;
            case 5: giveSkExp(skl.abl,dmg*.01); break;
            case 6: giveSkExp(skl.abd,dmg*.01); break;
        }
        global.atkdftydt.a = atea; global.atkdftydt.c = atcs; global.atkdftydt.id=att.id
        }
        let pn=isyou===true?1:1-skl.painr.use(); dmg=dmg*def.res.ph*pn; 
        if (ran<ctr_r) { let cpw=1; let dmod = 1; let cbst = 1; 
        if(isyou===true) {giveSkExp(skl.seye,1); cpw=you.mods.cpwr; cbst = 1+skl.war.use();
        dom.d1m.style.left=parseInt(global.special_x)+rand(-3,3)+'px'; dom.d1m.style.top=parseInt(global.special_y)+rand(-3,3)+'px';
        setTimeout(()=>{dom.d1m.style.left=parseInt(global.special_x)+'px'; dom.d1m.style.top=parseInt(global.special_y)+'px';},60);
        } else {giveSkExp(skl.dngs,1);sk=skl.dngs.use(); dmod=1-sk*(sk>25?.01:.02)}
        if(dmg<=0)dmg=0;
        cdmg = dmg*randf(1.9*cpw,2.1*cpw)*.5*dmod*cbst;
        global.flags.crti=true; 
        return dmg+cdmg<=1?rand(1,5):Math.ceil((dmg+cdmg)*att.dmlt*randf(.9,1.1))+rand(1,5); 
        } else return dmg>0?Math.ceil(dmg*att.dmlt*randf(.9,1.1)):0;
}

function dumb(x){
    if(x){
    let arr = [];
    for(let m=0;m<5;m++){ 
        arr[m] = new Object();
        arr[m].obj = addElement(document.body,'span',null,'shn');
        arr[m].obj.style.pointerEvents='none';
        arr[m].obj.innerHTML = select(['x','X','*','#','$']);
        arr[m].obj.style.top=-55; arr[m].obj.style.left=-55;
        arr[m].posx = x.clientX; arr[m].posy = x.clientY; 
        arr[m].accx = rand(-10,10);     arr[m].accy = rand(15,25);
    }
    let t = 0;
    let g = setInterval(()=>{
        t++;
        for(let m=0;m<5;m++){
        arr[m].obj.style.top = arr[m].posy-(arr[m].accy-t)*t*.4;
        arr[m].obj.style.left = arr[m].posx+arr[m].accx*t*.5;    
        arr[m].obj.style.opacity = (30-t)/30;
        }
        if(t===30) {
        clearInterval(g);
        for(let m=0;m<5;m++) document.body.removeChild(arr[m].obj);
        }
    },20);}
}

function mf(num,index){
    let d = addElement(document.body,'small');
    let c = ['rgb(255, 116, 63)','rgb(192, 192, 192)','rgb(255, 215, 0)'];
    d.style.position='absolute';
    d.style.opacity=1;
    d.style.width = '100px';
    d.style.top = '755px';
    d.style.left = (328 - 50 * index) + 'px';
    d.innerHTML='<span style="color: '+c[index-1]+'">●</span><span style="color: rgb(255,70,70)">'+num+'</span>';
    
    let t = 0;
    let g = setInterval( () => {
        t++;
        d.style.top = parseInt(d.style.top) - 2 + 'px'; d.style.opacity = (30-t)/30;
        if (t === 30) {
            clearInterval(g);
            document.body.removeChild(d);
        }
    }, 30);
}

function hit_calc(tp){
    if (tp === 1){
        let agl_bonus = 0;
        let spd = global.current_m.spd > 0 ? global.current_m.spd : 0;
        for(let i = 0; i < you.eqp.length; i++) {
            agl_bonus += you.eqp[i].agl;
        }
        //return (200 + ((you.agl+agl_bonus)*you.efficiency()) - (global.current_m.spd+global.current_m.agl+100/(100*you.efficiency())*100));
        return ((you.agl+agl_bonus/2)*you.efficiency())/((spd+global.current_m.agl+global.current_m.eva))*130+5;
    }
    else if (tp === 2){
        let agl_bonus=0; let spd=you.spd>0?you.spd:0;for(let i=0;i<you.eqp.length;i++) agl_bonus+=you.eqp[i].agl;
        return global.current_m.agl/((spd+you.agl+agl_bonus/2)*you.efficiency())*100+10-skl.evas.lvl
        //return (210 + global.current_m.agl - (you.spd+you.agl+100*(100*you.efficiency())/100)); 
    }
}

function wpnhitstt(){
    switch(you.eqp[0].wtype){
        case 0:global.stat.msts[0][0]++;break
        case 1:global.stat.msts[1][0]++;break
        case 2:global.stat.msts[2][0]++;break
        case 3:global.stat.msts[3][0]++;break
        case 4:global.stat.msts[4][0]++;break
        case 5:global.stat.msts[5][0]++;break
        case 6:global.stat.msts[6][0]++;break
        case 7:global.stat.msts[7][0]++;break
    }
}

function wpndiestt(killer,me){
    switch(killer.eqp[0].wtype){
        case 0:global.stat.msts[0][1]++;break
        case 1:global.stat.msts[1][1]++;break
        case 2:global.stat.msts[2][1]++;break
        case 3:global.stat.msts[3][1]++;break
        case 4:global.stat.msts[4][1]++;break
        case 5:global.stat.msts[5][1]++;break
        case 6:global.stat.msts[6][1]++;break
        case 7:global.stat.msts[7][1]++;break
    }
    switch(me.type){
        case 0:global.stat.msks[0]++;break
        case 1:global.stat.msks[1]++;break
        case 2:global.stat.msks[2]++;break
        case 3:global.stat.msks[3]++;break
        case 4:global.stat.msks[4]++;break
        case 5:global.stat.msks[5]++;break
    }
}

function renderRcp(rcp){
    const _ = {};
    dom.ct_bt1_1_mc = addElement(dom.ct_bt1_1,'div',null,'crf_lg');
    dom.ct_bt1_1_mc.style.position='relative';
    _.ct_bt1_1_m = addElement(dom.ct_bt1_1_mc,'span');
    rcp._t = _.ct_bt1_1_m;

    if (navigator.userAgent.includes('Firefox')) {
        _.ct_bt1_1_m.style.paddingTop=0;
        _.ct_bt1_1_m.style.paddingBottom=0;
    }
    _.ct_bt1_1_m.innerHTML = rcp.name;
    let test = make(rcp,true);
    let safe = false;

    if (test.y.length != rcp.rec.length || test.o[0] === 2) {
        _.ct_bt1_1_m.style.color = 'grey';
    }

    if (dom.spcldom && rcp.id === dom.spcldom.rcp.id) {
        dom.rcpcurar = addElement(dom.ct_bt1_1_mc,'span');
        dom.rcpcurar.innerHTML='⋗⋗'
        dom.spcldom = dom.ct_bt1_1_mc;
        dom.spcldom.rcp=rcp;
        dom.rcpcurar.style.position='absolute';
        dom.rcpcurar.style.right=2;
        dom.rcpcurar.style.color='rgb(188,254,254)';
    }

    dom.ct_bt1_1_mc.addEventListener('mouseenter', function() { test = make(rcp,true); global.curr_r = rcp
        empty(dom.ct_bt1_2);
        _.ct_bt1_2a = addElement(dom.ct_bt1_2,'div'); _.ct_bt1_2a.innerHTML = 'reagents required';
        _.ct_bt1_2a.style.textAlign = 'center'; _.ct_bt1_2a.style.borderBottom='1px solid #3e4092';
        if(skl.crft.lvl>0){_.ct_bt1_2at = addElement(dom.ct_bt1_2,'div','rptbn');   if(!global.flags.rptbncgt){_.ct_bt1_2at.style.backgroundColor='#a11'; _.ct_bt1_2at.innerHTML = '';
        }else{ _.ct_bt1_2at.style.backgroundColor='green'; _.ct_bt1_2at.innerHTML = '‣';}
        let tm = (5000-(skl.crft.lvl*350+skl.ptnc.lvl*150)<300?300:(5000-(skl.crft.lvl*350+skl.ptnc.lvl*150)))
        addDesc(_.ct_bt1_2at,{name:"Enable Repeatable Crafting",desc:function(){let txt = "<span style='color:magenta'>Current speed: </span><span style='color:orange'>"+((tm/1000).toFixed(2))+" sec</span>"; return txt}},9);
        _.ct_bt1_2at.addEventListener('click',function(){
        if(global.flags.rptbncgt){ clearInterval(timers.rptbncgt); global.flags.rptbncgtf=false;
        this.style.backgroundColor='#a11'; this.innerHTML = '';
        }else{
        this.style.backgroundColor='green'; this.innerHTML = '‣';}
        global.flags.rptbncgt=!global.flags.rptbncgt
        });} rcp._t2=[];
        for(let g=0;g<rcp.rec.length;g++){
        if(!rcp.rec[g] || !rcp.rec[g].item) continue;
        _.ct_bt1_2bc = addElement(dom.ct_bt1_2,'small'); _.ct_bt1_2bc.style.display='flex';
        _.ct_bt1_2bc1 = addElement(_.ct_bt1_2bc,'div',null,'rgt_ics');
        _.ct_bt1_2bc2 = addElement(_.ct_bt1_2bc,'div',null,'rgt_ics'); rcp._t2[g]=_.ct_bt1_2bc2
        if(rcp.rec[g].item.data.dscv===true) {_.ct_bt1_2bc1.innerHTML = rcp.rec[g].item.name; addDesc(_.ct_bt1_2bc,rcp.rec[g].item)}else _.ct_bt1_2bc1.innerHTML='?????????';
        _.ct_bt1_2bc1.style.paddingLeft = '8px';
        let num = 0; if(test.z.length>0) num = test.z[g];
        if((test.z[g]>=rcp.rec[g].amount)||test.b[g]===true) {_.ct_bt1_2bc2.style.color='lime';num=rcp.rec[g].item.slot?test.z[g]:rcp.rec[g].item.amount}
        else {_.ct_bt1_2bc2.style.color='grey';num=rcp.rec[g].item.slot?test.z[g]:rcp.rec[g].item.amount}
        let n = ''; if(test.z[g]>0&&rcp.rec[g].item.slot) {
            for(let r in test.r) for(let b in you.eqp)if(you.eqp[b].data.uid===test.r[r].data.uid&&you.eqp[b].id!==10000) {n='<small style="color:orange">[E]</small>';continue}
        }
        if((test.z[g]>=rcp.rec[g].amount)||test.b[g]===true) _.ct_bt1_2bc2.style.color='lime'; else _.ct_bt1_2bc2.style.color='grey';
        if(rcp.rec[g].return===true) _.ct_bt1_2bc2.innerHTML='∞';else _.ct_bt1_2bc2.innerHTML = rcp.rec[g].amount+' / '+num+' '+n; _.ct_bt1_2bc2.style.borderRight='none';
        _.ct_bt1_2bc2.style.textAlign = 'center';
        }
        _.ct_bt1_2c = addElement(dom.ct_bt1_2,'div'); _.ct_bt1_2c.innerHTML = 'output';
        _.ct_bt1_2c.style.borderTop='1px solid #3e4092'; _.ct_bt1_2c.style.borderBottom='1px solid #3e4092';
        _.ct_bt1_2c.style.textAlign='center'; _.ct_bt1_2c.style.marginTop='6px';
        for(let g in rcp.res){
        if(!rcp.res[g] || !rcp.res[g].item) continue;
        _.ct_bt1_2cc = addElement(dom.ct_bt1_2,'small'); _.ct_bt1_2cc.style.display='flex';
        _.ct_bt1_2cc1 = addElement(_.ct_bt1_2cc,'div','toh','rgt_ics');
        _.ct_bt1_2cc2 = addElement(_.ct_bt1_2cc,'div',null,'rgt_ics');
        if(rcp.allow===true){_.ct_bt1_2cc1.innerHTML = rcp.res[g].item.name; if(!!rcp.res[g].amount_max){_.ct_bt1_2cc2.innerHTML = rcp.res[g].amount+'~'+rcp.res[g].amount_max;}else _.ct_bt1_2cc2.innerHTML = rcp.res[g].amount;
        addDesc(_.ct_bt1_2cc1,rcp.res[g].item);　_.ct_bt1_2cc2.style.color='lime';　}　else {_.ct_bt1_2cc1.innerHTML ='?????????'; _.ct_bt1_2cc2.innerHTML = '???';_.ct_bt1_2cc2.style.color='grey';}
        _.ct_bt1_2cc2.style.textAlign='center';
        _.ct_bt1_2cc2.style.borderRight='none'; _.ct_bt1_2cc1.style.paddingLeft = '8px';
        _.ct_bt1_2cc2.style.width='27.5%';_.ct_bt1_2cc1.style.width='75%';
        }
        if(rcp.srect!=null){ let l = test.o.length;
        _.ct_bt1_3c = addElement(dom.ct_bt1_2,'div'); _.ct_bt1_3c.innerHTML = 'tools needed';
        _.ct_bt1_3c.style.borderTop='1px solid #3e4092'; _.ct_bt1_3c.style.borderBottom='1px solid #3e4092';
        _.ct_bt1_3c.style.textAlign='center'; _.ct_bt1_3c.style.marginTop='6px';
        _.ct_bt1_3cc = addElement(dom.ct_bt1_2,'small');
        _.ct_bt1_3cc.style.display='block'; _.ct_bt1_3cc.style.textAlign='left';
        _.ct_bt1_3cc.style.paddingLeft='8px';
        if(l>1){for(let nu in test.o){
            if(test.o[nu]===1)_.ct_bt1_3cc.innerHTML+='<span style="color:lime">'+rcp.srect[nu]+'</span>'+(l-1==nu?'':', ');else if(test.o[nu]===2)_.ct_bt1_3cc.innerHTML+='<span style="color:red">'+rcp.srect[nu]+'</span>'+(l-1==nu?'':', ');
        }} else {if(test.o[0]===1)_.ct_bt1_3cc.style.color='lime';else if(test.o[0]===2)_.ct_bt1_3cc.style.color='red'; _.ct_bt1_3cc.innerHTML+=rcp.srect[0]}
        }
        });
        dom.ct_bt1_1_mc.addEventListener('mouseenter',function(){
        if(dom.rcpcurar) dom.spcldom.removeChild(dom.rcpcurar);
        dom.rcpcurar = addElement(this,'span'); dom.rcpcurar.innerHTML='⋗⋗'; dom.spcldom = this; dom.spcldom.rcp=rcp;
        dom.rcpcurar.style.position='absolute'; dom.rcpcurar.style.right=2; dom.rcpcurar.style.color='rgb(188,254,254)';
        })
    dom.ct_bt1_1_mc.addEventListener('click',function(){test = make(rcp,true); if(rcp.rec.length===test.y.length&&test.o[0]!==2) safe = true
        if(global.flags.rptbncgt){_fcraft(rcp,safe);global.crrpsat = rcp;clearInterval(timers.rptbncgt);global.flags.rptbncgtf=true; if(safe)timers.rptbncgt=setInterval(()=>{_fcraft(global.crrpsat,safe);giveSkExp(skl.ptnc,.05);refreshRcp(global.curr_r)},(5000-(skl.crft.lvl*350+skl.ptnc.lvl*150)<300?300:(5000-(skl.crft.lvl*350+skl.ptnc.lvl*150))))}
        else _fcraft(rcp,safe); refreshRcp(rcp);
    });
}

function refreshRcp(fl){ 
  if(global.rm===0||!global.rm){
    for(let a in global.rec_d) _refreshRcpCnt(global.rec_d[a], global.rec_d[a]._t) 
  } else {
    for(let a in global.srcp) _refreshRcpCnt(global.srcp[a], global.srcp[a]._t) 
  }
  let t2 = fl._t2; let test = make(fl,true); 
  for(let g in fl.rec){if(!t2) break; 
      let n = ''; if(test.z[g]>0&&fl.rec[g].item.slot) {
        for(let r in test.r) for(let b in you.eqp)if(you.eqp[b].data.uid===test.r[r].data.uid&&you.eqp[b].id!==10000) {n='<small style="color:orange">[E]</small>';continue}
      }
      let num = 0; if(test.z.length>0) num = test.z[g];  
      if((test.z[g]>=fl.rec[g].amount)||test.b[g]===true) {t2[g].style.color='lime';num=fl.rec[g].item.slot?test.z[g]:fl.rec[g].item.amount}
      else {t2[g].style.color='grey';num=fl.rec[g].item.slot?test.z[g]:fl.rec[g].item.amount}
      t2[g].innerHTML = fl.rec[g].amount+' / '+num+' '+n; 
    }
}

function _refreshRcpCnt(r, t, t2){
    let test = make(r,true); 
    if (test.y.length != r.rec.length || test.o[0] === 2) { 
        t.style.color = 'grey';
    } else { 
        t.style.color='rgb(188,254,254)';
    }
}

function _fcraft(what, safe) {
    if (safe) {
        safe = false;
        if (global.flags.sleepmode === true) {
            msg('You may want to wake up first', 'red');
            return;
        }
        if (global.flags.btl === true) {
            msg('You\'re too busy fighting', 'red');
            return;
        }
        if (global.flags.rdng === true) {
            msg('You\'re too occupied with reading', 'red');
            return;
        }
        if (global.flags.busy === true) {
            msg('You\'re too busy with something else', 'red');
            return;
        }
        let ntest = make(what, true);
        for (let g = 0; g < what.rec.length; g++) {
            if (what.rec.length === ntest.y.length && ntest.o[0] !== 2) {
                safe = true;
            }
        }
        if (safe) {
            make(what);
            global.stat.crftt++;
            iftrunkopen(1);
        } else {
            if (global.flags.rptbncgtf) {
                clearInterval(timers.rptbncgt);
                global.flags.rptbncgtf = false;
            }
        }
    }
}

function renderSkl(skl) {
    const _ = {};
    _.skwmmc = addElement(dom.skcon, 'div', null, 'skwmmc');
    addDesc(_.skwmmc, skl, 6);
    _.skwmm1 = addElement(_.skwmmc, 'small');
    if (skl.sp) {
        _.skwmm1.style.fontSize = skl.sp;
    }
    _.skwmm1.style.width = '32%';
    _.skwmm1.innerHTML = skl.name + ' lvl: ' + skl.lvl;
    _.skwmm1.style.borderRight = '1px solid #46a';
    _.skwmm2 = addElement(_.skwmmc, 'small');
    _.skwmm2.innerHTML = '　exp: ' + formatw(Math.round(skl.exp)) + '/' + formatw(skl.expnext_t) + '　';
    _.skwmm2.style.borderRight = '1px solid #46a';
    _.skwmm2.style.fontSize = '.8em';
    _.skwmm2.style.width = '170px';
    _.skwmm3c = addElement(_.skwmmc, 'div');
    _.skwmm3 = addElement(_.skwmm3c, 'div');
    _.skwmm3c.style.width = '197px';
    _.skwmm3.innerHTML = '　';
    _.skwmm3.style.marginLeft = '2px';
    _.skwmm3.style.width = skl.exp / skl.expnext_t * 100 + '%';
    //if(skl.lastupd&&skl.lastupd-time.minute>=1) _.skwmm3.style.backgroundColor='limegreen'; else _.skwmm3.style.backgroundColor='yellow';
    _.skwmm3.style.backgroundColor = 'yellow';
}

function zone_init(zone){
    if(zone.size !== 0){
        if(zone.id !== 101){
        let rnd = random();
        for (let obj in zone.pop) if(rnd>=zone.popc[obj][0]&&rnd<=zone.popc[obj][1]) if(!zone.pop[obj].cond||zone.pop[obj].cond()===true){
            global.flags.civil=false; global.flags.btl=true; 
            global.current_z=zone;
            let temp=zone.pop[obj]; 
            let newobj = temp.crt.id===creature.default.id?creature.default:mon_gen(temp.crt); 
            lvlup(newobj,rand(temp.lvlmin-1,temp.lvlmax-1));
            global.current_m = newobj; update_m(); dom.d5_1_1m.update(); if(!!dom.d7m)dom.d7m.update(); //dom.d5m.update(); 
            return newobj;
        } else(zone_init(zone));
        }
    } else msg('nobody\'s here');

    if(!!dom.d7m) dom.d7m.update();

    update_m();
    dom.d5_1_1m.update();
}

function mon_gen(crt) {
    crt.eff = [];
    global.e_em = [];
    empty(dom.d101m);
    let newobj = copy(crt);
    newobj.drop = crt.drop;
    if (!global.flags.inside) {
        if (global.flags.israin) {
            giveEff(newobj, effect.wet, 5);
        }
        if (global.flags.iscold) {
            giveEff(newobj, effect.cold, 25);
        }
    }
    newobj.sex = random() < 0.5;
    return newobj;
}

function giveEff(target, e, d, y, z) {
    if (target.id !== 0) {
        let ef = e;
        if (target.id !== you.id) {
            ef = new Object();
            for (let g in e) {
                ef[g] = e[g];
            }
        }
        if (target.id === you.id || global.flags.btl) {
            let p = findbyid(target.eff, e.id);
            if (!p || !p.active) {
                if (d) {
                    ef.duration = d;
                }
                ef.y = y;
                ef.z = z;
                if (ef.x) {
                    eff_d(ef, ef.x, ef.c, ef.b, target);
                }
                ef.target = target;
                target.eff.push(ef);
            }
            ef.onGive(d, y, z);
            ef.active = true;
        }
        effdfix();
        target.stat_r();
        return e;
    }
}

function removeEff(e, t) {
    if (!e || e.active !== true) return;
    if (e.active === true) {
        if (e.x) {
            if (e.target.id === you.id) {
                node = global.e_e.indexOf(e);
                dom.d101.removeChild(dom.d101.children[node]);
                global.e_e.splice(node, 1);
                if (dom.d101.children.length > you.eff.length) {
                    empty(dom.d101);
                }
            } else {
                node = global.e_em.indexOf(e);
                dom.d101m.removeChild(dom.d101m.children[node]);
                global.e_em.splice(node, 1);
                if (dom.d101m.children.length > e.target.eff.length) {
                    empty(dom.d101m);
                }
            }
            e.onRemove();
            global.dscr.style.display = 'none';
        }
        e.target.eff.splice(e.target.eff.indexOf(e), 1);
        e.active = false;
        clearInterval(timers.inup);
        effdfix();
    }
    e.target.stat_r();
}

function effdfix() {
    if (you.eff.length >= 21) {
        dom.d7.style.height = '104px';
        for (let i = 0; i < document.getElementsByClassName('se_ia').length; i++) {
            document.getElementsByClassName('se_ia')[i].style.display = 'inline-block';
        }
        document.getElementById('se_i').style.display = 'block';
    } else {
        dom.d7.style.height = '125px';
        for (let i = 0; i < document.getElementsByClassName('se_ia').length; i++) {
            document.getElementsByClassName('se_ia')[i].style.display = '';
        }
        document.getElementById('se_i').style.display = 'flex';
    }
}

function eff_d(e, s, c, b, tgt) {
    if (tgt.id === you.id) {
        let ic = addElement(dom.d101, 'div', null, 'se_ia');
        ic.innerHTML = s;
        ic.style.color = c;
        ic.style.backgroundColor = b;
        ic.addEventListener('click', () => {
            e.onClick();
        });
        addDesc(ic, e, 4, e.name, e.desc);
        if (e.duration !== 0) {
            global.e_e.push(e);
        }
    } else {
        let ic = addElement(dom.d101m, 'div', null, 'se_ia');
        ic.innerHTML = s;
        ic.style.color = c;
        ic.style.backgroundColor = b;
        addDesc(ic, e, 4, e.name, e.desc);
        if (e.duration !== 0) {
            global.e_em.push(e);
        }
    }
}



function equip(w,flags){ if(!w.data||!w.data.uid) return;
    if(w.data.uid === you.eqp[w.slot-1].data.uid) {unequip(w,{save:true});if(w.twoh===true) {dom.d7_slot_2.innerHTML = 'Shield';dom.d7_slot_2.style.color='grey'};isort(global.sm)} else{
        if(w.req&&!w.req()&&!global.flags.loadstate) {msg("Requirenments not met!",'red');return}
        /*switch(w.slot){
        case 5 :{
            if(you.eqp[4].id===10000) you.eqp[4]=w; else if(you.eqp[5].id===10000) {you.eqp[5]=w;w.slot=6} else {unequip(you.eqp[4]);you.eqp[4]=w}
        } break;
        case 6 :{
            if(you.eqp[5].id===10000) you.eqp[5]=w; else if(you.eqp[4].id===10000) {you.eqp[4]=w;w.slot=5} else {unequip(you.eqp[5]);you.eqp[5]=w}
        } break;
        default: {unequip(you.eqp[w.slot-1]); you.eqp[w.slot-1] = w;}; break
        }*/  unequip(you.eqp[w.slot-1]); you.eqp[w.slot-1] = w;
        if(w.twoh===true){if(you.eqp[1].id!==10000) unequip(you.eqp[1])} else if(you.eqp[1].id!==10000&&you.eqp[0].twoh===true) unequip(you.eqp[0]);
        if (w.eff.length>0) for (let k=0;k<w.eff.length;k++) {w.eff[k].use(w.eff[k].y,w.eff[k].z);giveEff(you,w.eff[k])}
        w.oneq(); if(w.degrade) planner.itmwear.data.items.push(w)
        if(w.slot===1) you.atkmode=w.atkmode; w.wc=global.text.wecs[w.rar][0]; //w.wbc=global.text.wecs[w.rar][1];
        let spst; switch(w.rar){
        case 2:spst='0px 0px 2px blue'; break;
        case 3:spst='0px 0px 2px lime';break;
        case 4:spst='0px 0px 3px orange';break;
        case 5:spst='0px 0px 2px crimson,0px 0px 5px red';break;
        case 6:spst='1px 1px 1px black,0px 0px 2px purple';break;
        }
        switch(w.slot-1){
        case 0:{dom.d7_slot_1.removeAttribute('style');dom.d7_slot_1.innerHTML = you.eqp[w.slot-1].name;if(!!w.wc){dom.d7_slot_1.style.color=w.wc;dom.d7_slot_1.style.textShadow=spst};if(!!w.wbc)dom.d7_slot_1.style.backgroundColor=w.wbc;}break;
        case 1:{dom.d7_slot_2.removeAttribute('style');dom.d7_slot_2.innerHTML = you.eqp[w.slot-1].name;if(!!w.wc){dom.d7_slot_2.style.color=w.wc;dom.d7_slot_2.style.textShadow=spst}if(!!w.wbc)dom.d7_slot_2.style.backgroundColor=w.wbc;}break;
        case 2:{dom.d7_slot_3.removeAttribute('style');dom.d7_slot_3.innerHTML = you.eqp[w.slot-1].name;if(!!w.wc){dom.d7_slot_3.style.color=w.wc;dom.d7_slot_3.style.textShadow=spst}if(!!w.wbc)dom.d7_slot_3.style.backgroundColor=w.wbc;}break;
        case 3:{dom.d7_slot_4.removeAttribute('style');dom.d7_slot_4.innerHTML = you.eqp[w.slot-1].name;if(!!w.wc){dom.d7_slot_4.style.color=w.wc;dom.d7_slot_4.style.textShadow=spst}if(!!w.wbc)dom.d7_slot_4.style.backgroundColor=w.wbc;}break;
        case 4:{dom.d7_slot_5.removeAttribute('style');dom.d7_slot_5.innerHTML = you.eqp[w.slot-1].name;if(!!w.wc){dom.d7_slot_5.style.color=w.wc;dom.d7_slot_5.style.textShadow=spst}if(!!w.wbc)dom.d7_slot_5.style.backgroundColor=w.wbc;}break;
        case 5:{dom.d7_slot_6.removeAttribute('style');dom.d7_slot_6.innerHTML = you.eqp[w.slot-1].name;if(!!w.wc){dom.d7_slot_6.style.color=w.wc;dom.d7_slot_6.style.textShadow=spst}if(!!w.wbc)dom.d7_slot_6.style.backgroundColor=w.wbc;}break;
        case 6:{dom.d7_slot_7.removeAttribute('style');dom.d7_slot_7.innerHTML = you.eqp[w.slot-1].name;if(!!w.wc){dom.d7_slot_7.style.color=w.wc;dom.d7_slot_7.style.textShadow=spst}if(!!w.wbc)dom.d7_slot_7.style.backgroundColor=w.wbc;}break;
        case 7:{dom.d7_slot_8.removeAttribute('style');dom.d7_slot_8.innerHTML = you.eqp[w.slot-1].name;if(!!w.wc){dom.d7_slot_8.style.color=w.wc;dom.d7_slot_8.style.textShadow=spst}if(!!w.wbc)dom.d7_slot_8.style.backgroundColor=w.wbc;}break;
        case 8:{dom.d7_slot_9.removeAttribute('style');dom.d7_slot_9.innerHTML = you.eqp[w.slot-1].name;if(!!w.wc){dom.d7_slot_9.style.color=w.wc;dom.d7_slot_9.style.textShadow=spst}if(!!w.wbc)dom.d7_slot_9.style.backgroundColor=w.wbc;}break;
        case 9:{dom.d7_slot_10.removeAttribute('style');dom.d7_slot_10.innerHTML = you.eqp[w.slot-1].name;if(!!w.wc){dom.d7_slot_10.style.color=w.wc;dom.d7_slot_10.style.textShadow=spst}if(!!w.wbc)dom.d7_slot_10.style.backgroundColor=w.wbc;}break;
        }
        if(w.twoh===true){dom.d7_slot_2.innerHTML = you.eqp[0].name;dom.d7_slot_2.removeAttribute('style');dom.d7_slot_2.style.color='lightgrey'}else{
        if(you.eqp[1].id===10000) {dom.d7_slot_2.innerHTML = 'Shield';dom.d7_slot_2.removeAttribute('style');dom.d7_slot_2.style.color='grey'}
        }
        if(!flags||!flags.save) {you.stat_r(); update_d(); isort(global.sm)}
    } 
}

function unequip(w,flags){if(!w.data||!w.data.uid) return;
    if (w.eff.length>0) for (let k=0;k<w.eff.length;k++) {w.eff[k].un();removeEff(w.eff[k])} 
    w.onuneq(); you.eqp[w.slot-1] = eqp.dummy; if(w.degrade) planner.itmwear.data.items.splice(planner.itmwear.data.items.indexOf(w),1)
    switch(w.slot-1){
        case 0:{dom.d7_slot_1.innerHTML = 'Weapon';dom.d7_slot_1.removeAttribute('style');dom.d7_slot_1.style.color='grey';you.eqp[0].cls[2]=you.lvl/5<<0;you.eqp[0].aff[0]=you.lvl/8<<0;you.eqp[0].ctype=2}break;
        case 1:{dom.d7_slot_2.innerHTML = 'Shield';dom.d7_slot_2.removeAttribute('style');dom.d7_slot_2.style.color='grey'}break;
        case 2:{dom.d7_slot_3.innerHTML = 'Head';dom.d7_slot_3.removeAttribute('style');dom.d7_slot_3.style.color='grey'}break;
        case 3:{dom.d7_slot_4.innerHTML = 'Body';dom.d7_slot_4.removeAttribute('style');dom.d7_slot_4.style.color='grey'}break;
        case 4:{dom.d7_slot_5.innerHTML = 'L arm';dom.d7_slot_5.removeAttribute('style');dom.d7_slot_5.style.color='grey'}break;
        case 5:{dom.d7_slot_6.innerHTML = 'R arm';dom.d7_slot_6.removeAttribute('style');dom.d7_slot_6.style.color='grey'}break;
        case 6:{dom.d7_slot_7.innerHTML = 'Legs';dom.d7_slot_7.removeAttribute('style');dom.d7_slot_7.style.color='grey'}break;
        case 7:{dom.d7_slot_8.innerHTML = 'Accessory';dom.d7_slot_8.removeAttribute('style');dom.d7_slot_8.style.color='grey'}break;
        case 8:{dom.d7_slot_9.innerHTML = 'Accessory';dom.d7_slot_9.removeAttribute('style');dom.d7_slot_9.style.color='grey'}break;
        case 9:{dom.d7_slot_10.innerHTML = 'Accessory';dom.d7_slot_10.removeAttribute('style');dom.d7_slot_10.style.color='grey'}break;
    }
    if(!flags||!flags.save) {you.stat_r(); update_d()}
}

function eqpres() {
    dom.d7_slot_1.innerHTML = 'Weapon';
    dom.d7_slot_2.innerHTML = 'Shield';
    dom.d7_slot_3.innerHTML = 'Head';
    dom.d7_slot_4.innerHTML = 'Body';
    dom.d7_slot_5.innerHTML = 'L arm';
    dom.d7_slot_6.innerHTML = 'R arm';
    dom.d7_slot_7.innerHTML = 'Legs';
    dom.d7_slot_8.innerHTML = 'Accessory';
    
    dom.d7_slot_1.removeAttribute('style');
    dom.d7_slot_2.removeAttribute('style');
    dom.d7_slot_3.removeAttribute('style');
    dom.d7_slot_4.removeAttribute('style');
    dom.d7_slot_5.removeAttribute('style');
    dom.d7_slot_6.removeAttribute('style');
    dom.d7_slot_7.removeAttribute('style');
    dom.d7_slot_8.removeAttribute('style');
    
    dom.d7_slot_1.style.color = 'grey';
    dom.d7_slot_2.style.color = 'grey';
    dom.d7_slot_3.style.color = 'grey';
    dom.d7_slot_4.style.color = 'grey';
    dom.d7_slot_5.style.color = 'grey';
    dom.d7_slot_6.style.color = 'grey';
    dom.d7_slot_7.style.color = 'grey';
    dom.d7_slot_8.style.color = 'grey';
//  dom.d7_slot_9.innerHTML = 'Accessory';dom.d7_slot_9.removeAttribute('style');dom.d7_slot_9.style.color='grey'
//  dom.d7_slot_10.innerHTML = 'Accessory';dom.d7_slot_10.removeAttribute('style');dom.d7_slot_10.style.color='grey'
}

function giveRcp(rcp) {
    if (!global.flags.asbu) {
        global.flags.asbu = true;
        dom.ct_bt1.innerHTML = 'assemble';
    }
    if (rcp.have === false) {
        global.rec_d.push(rcp);
        rcp.have = true;
        if (global.lw_op === 1) {
            rsort(global.rm);
        }
        msg('New blueprint unlocked: ', 'cyan');
        msg_add('"' + rcp.name + '"', 'orange');
        return 1;
    } else {
        return 0;
    }
}

function giveWealth(val, mes, f) {
    if (you.mods.wthexrt !== 0 && f) {
        val += 1;
    }
    you.wealth += val;
    global.stat.moneyg += val;
    for (let x in global.monchk) {
        global.monchk[x]();
    }
    if (!global.stat.mndrgnu && you.wealth >= 100000000) {
        global.stat.mndrgnu = true;
        appear(dom.mn_1);
    }
    m_update();
    giveSkExp(skl.gred, val * 0.01);
    if (mes !== false) {
        msg('+', 'gold');
        if (val >= GOLD) {
            msg_add(' ●' + ((val / GOLD) << 0), 'rgb(255, 215, 0)');
        }
        if (val >= SILVER && val % GOLD >= SILVER) {
            msg_add(' ●' + ((val / SILVER % SILVER) << 0), 'rgb(192, 192, 192)');
        }
        if (val < SILVER || (val > SILVER && val % SILVER > 0)) {
            msg_add(' ●' + ((val % SILVER) << 0), 'rgb(255, 116, 63)');
        }
    }
    recshop();
}

function spend(m) {
    if (you.wealth < m) {
        return
    }
    you.wealth -= m;
    global.stat.moneysp += m;
    m_update();
}

function giveItem(obj, amt, ignore, flag, verbose=true) {
    amt = amt || 1;
    if (!!obj.slot) {
        let nitm;
        for (let p = 0; p < amt; p++) {
            obj.new = true;
            obj.data.uid = ++global.uid;
            let tmp = obj;
            obj.data.dscv = true;
            obj.have = true;
            nitm = copy(obj);
            nitm.data = deepCopy(obj.data);
            nitm.eff = tmp.eff;
            if (tmp.dss) {
                nitm.dss = tmp.dss;
            }
            inv.push(nitm);
            if (verbose===true) {
                msg('New item obtained: <span style="color:coral">' + nitm.name + '</span>', 'cyan', obj);
            }
            obj.onGet();
            if (global.sm === nitm.stype) {
                global.sinv.push(nitm);
            }
            if (nitm.stype === global.sm || global.sm === 1) {
                renderItem(nitm);
            }
            let g = obj.id / 10000 << 0;
            if (!scan(dar[g], obj.id)) {
                dar[g].push(obj.id);
            }
            if (flag && flag.fl) {
                iftrunkopen(1);
            } else {
                iftrunkopenc(1);
            }
            if (!global.flags.loadstate && !ignore) {
                global.stat.igtttl += amt;
            }
        }
        return nitm;
    }
    if (!obj.have) {
        obj.new = true;
        if (global.flags.blken === true) {
            global.spnew++;
            clearInterval(timers.nsblk);
            timers.nsblk = setInterval(function() {
                let a = document.querySelectorAll('.blinks');
                let g = a.length;
                for (let i = 0; i < g; i++) {
                    a[i].style.opacity = global.vsnew / 10;
                }
                if (--global.vsnew < 0) {
                    global.vsnew = 10;
                }
            }, 100);
        }
        obj.have = true;
        obj.data.dscv = true;
        inv.push(obj);
        obj.amount += amt;
        if (verbose===true) {
            msg('New item obtained: <span style="color:coral">' + obj.name + '</span><span style="color:lime"> x' + amt + '</span>', 'cyan', obj);
        }
        obj.onGet();
        if (global.sm === obj.stype) {
            global.sinv.push(obj);
        }
        if (obj.stype === global.sm || global.sm === 1) {
            renderItem(obj);
        }
    } else {
        obj.amount += amt;
        if (verbose===true) {
            msg('Item Acquired: <span style="color:chartreuse">' + obj.name + '</span><span style="color:lime"> x' + amt + '</span>', 'cyan', obj);
        }
        if (global.sm === 1) {
            updateInv(inv.indexOf(obj));
        } else if (global.sm === obj.stype) {
            updateInv(global.sinv.indexOf(obj));
        }
        obj.onGet();
    }
    let g = obj.id / 10000 << 0;
    if (!scan(dar[g], obj.id)) {
        dar[g].push(obj.id);
    }
    if (obj.multif) {
        for (let a = 0; a < amt; a++) {
            obj.multif();
        }
    }
    if (obj.rot) {
        let thave = false;
        for (let a in planner.imorph.data.items) {
            if (planner.imorph.data.items[a].id === obj.id) {
                thave = true;
                break;
            }
        }
        if (!thave) {
            planner.imorph.data.items.push(obj);
            obj.data.rottil = 0;
        }
    }
    if (flag && !flag.fi && flag.fl) {
        iftrunkopen(1);
    } else {
        iftrunkopenc(1);
    }
    if (!global.flags.loadstate && !ignore) {
        global.stat.igtttl += amt;
    }
    return obj;
}

function useItem(obj, amt=1) {
    const item = inv.find(i => i === obj && i.amount >= amt);

    if (!item) return false;

    item.amount -= amt;
    item.use();

    if (item.amount <= 0) removeItem(item);

    return true;
}

function hasItem(obj, amt=1) {
    return inv.some(i => i === obj && i.amount >= amt);
}


window.define_dom_references = define_dom_references;
window.rstcrtthg = rstcrtthg;
window.invbtsrst = invbtsrst;
window.update_db = update_db;
window.update_d = update_d;
window.update_m = update_m;
window.offline_a = offline_a;
window.dscr = dscr;
window.msg = msg;
window._msg = _msg;
window.msg_add = msg_add;
window.format = format;
window.appear = appear;
window.fade = fade;
window.addDesc = addDesc;
window.allbuff = allbuff;
window.fght = fght;
window.attack = attack;
window.tattack = tattack;
window.dmg_calc = dmg_calc;
window.dumb = dumb;
window.mf = mf;
window.hit_calc = hit_calc;
window.wpnhitstt = wpnhitstt;
window.wpndiestt = wpndiestt;
window.renderRcp = renderRcp;
window.refreshRcp = refreshRcp;
window._refreshRcpCnt = _refreshRcpCnt;
window._fcraft = _fcraft;
window.renderSkl = renderSkl;
window.zone_init = zone_init;
window.mon_gen = mon_gen;
window.giveEff = giveEff;
window.removeEff = removeEff;
window.effdfix = effdfix;
window.eff_d = eff_d;
window.equip = equip;
window.unequip = unequip;
window.eqpres = eqpres;
window.giveRcp = giveRcp;
window.giveWealth = giveWealth;
window.spend = spend;
window.giveItem = giveItem;
window.useItem = useItem;
window.hasItem = hasItem;
