function getMinute(){return time.minute%60}
function getHour(){return time.hour%24;}
function getDay(n){return n===1?global.text.d_l[time.day%7]:(n===2?global.text.d_s[time.day%7]:global.text.d_j[time.day%7])}
function getMonth(){return time.month%12+1;}
function getYear(){return time.year;}
function getLunarPhase(){return (time.day%62.64/7.83)<<0}
function getSeason(flag){
    if (getMonth()>2&&getMonth()<=5) return !flag?1:"Spring";
    else if (getMonth()>5&&getMonth()<=8) return !flag?2:"Summer";
    else if (getMonth()>8&&getMonth()<=11) return !flag?3:"Autumn";
    else return !flag?4:"Winter"; 
}

function timeConv(chrono){
    chrono.year = (chrono.minute/(518400))<<0;
    chrono.month = (chrono.minute/(43200))<<0;
    chrono.day = (chrono.minute/(1440))<<0;
    chrono.hour = (chrono.minute/60)<<0;
}

function timeDisp(time, future){
    let time_t = time;
    if (future) {time_t = copy(time); time_t.minute += future;}
    timeConv(time_t);
    let mm = time_t.minute%60;
    if(mm<10) mm = '0'+mm;
    return time_t.year+'/'+((time_t.month%12)+1)+'/'+((time_t.day%30)+1)+' '+time_t.hour%24+':'+mm; 
}

function dropC(crt,t){ t=t||1;
  for(let j in crt.drop) if(!crt.drop[j].cond||(!!crt.drop[j].cond&&crt.drop[j].cond()===true)) if(random()<crt.drop[j].chance+(crt.drop[j].chance/100*you.luck)) {giveItem(crt.drop[j].item,!!crt.drop[j].min?rand(crt.drop[j].min,crt.drop[j].max):t);if(you.mods.lkdbt>0&&random()<you.mods.lkdbt) giveItem(crt.drop[j].item);
  let d = global.drdata["d"+crt.id]; if(!d){d=global.drdata["d"+crt.id]=[];d[j]=1}else d[j]=1;}
  for(let jj in global.wdrop) if(random()<global.wdrop[jj].c+(global.wdrop[jj].c/100*you.luck)) giveItem(global.wdrop[jj].item,t);
  for(let obj in global.current_z.drop) if(!global.current_z.drop[obj].cond||(!!global.current_z.drop[obj].cond&&global.current_z.drop[obj].cond()===true)) if(random()<global.current_z.drop[obj].c+(global.current_z.drop[obj].c/100*you.luck)+(global.current_z.drop[obj].c/75*skl.hst.lvl)) {giveItem(global.current_z.drop[obj].item,t);giveSkExp(skl.hst,.2)}
  if(crt.rnk<22) {let ar = (crt.rnk-1)/3<<0; for(let a in global.rdrop[ar]) if(random()<global.rdrop[ar][a].c+(global.rdrop[ar][a].c/100*you.luck)) giveItem(global.rdrop[ar][a].item,t)}
}

function dropread(){
  let t =  Object.keys(global.drdata); let ids=[]; for(let a in t) ids[a]=Number(t[a].substring(1))
  for(let a in ids){
    for(let b in creature){
      if(ids[a]===creature[b].id){ let dt = global.drdata[Object.keys(global.drdata)[a]]
        for(let c=0;c<dt.length;c++) {if(dt[c]) console.log(creature[b].drop[c].item.name); else console.log("??????")}
      } 
    }
  }
}

function roll(itm,c,mi,ma) {
    mi=mi||1;
    let r = random();
    if(r<c+(c/100*you.luck)) giveItem(itm,(!!ma?rand(mi,ma):rand(mi)));
}

function handStr(){
    return (5000+(you.str*800))*(1+you.lvl*.03)*(1+skl.unc.lvl*.1+skl.fgt.lvl*.08+skl.tghs.lvl*.11)/1000<<0
}

function format3(a){
    if(a.length>3){
        let b = new String();
        for(let i=0;i<a.length;i++) {if((a.length-i)%3==0&&i>(a>0?0:1)) b+=',';b+=a[i]}
        return b; 
    } return a;
}

function formatw(a){
    let b = (Math.log(Math.abs(a+1))*0.43429448190325178|0)+1;
    if(b>3){let n = a/1000**((b-1)/3<<0)*10; return ((n-~~n>=0.5?1:0)+~~n)/10+global.text.nt[((b-4)/3<<0)]} return a;
}

function u_loc(text){
    // update current location in the DOM and display if inside or not according to flag
    let txt;
    if(global.flags.inside===true) {
        txt = '|'+text+'|';
    } else { 
        txt=text;
    }
    dom.location_text.innerHTML = txt;
    global.current_location.locn=text; 
}

function rfeff(what){ 
    let t = '';
    for(let a in what.sector) if(what.sector[a].effectors) 
    for(let b in what.sector[a].effectors) t+='<span style="color:'+what.sector[a].effectors[b].e.c+';font-size:1.2em">&nbsp'+what.sector[a].effectors[b].e.x+'<span>';
    if(what.effectors) for(let a in what.effectors)  t+='<span style="color:'+what.effectors[a].e.c+';font-size:1.2em">&nbsp'+what.effectors[a].e.x+'<span>';
    dom.location_text_effector.innerHTML = t;
}

function lvlup(p, t, verbose){
    if (t===0) {
        p.hp=p.hp_r;
        p.str=p.str_r;
        p.agl=p.agl_r;
        p.spd=p.spd_r;
    } else {
        t = t || 1
        p.lvl += t;
        let sb = randf(t*p.stat_per_lvl[1],2*t*p.stat_per_lvl[1]);
        let sa = randf(t*p.stat_per_lvl[2],2*t*p.stat_per_lvl[2]);
        let si = randf(t*p.stat_per_lvl[3],2*t*p.stat_per_lvl[3]);
        p.str_r += sb;
        p.agl_r += sa;
        p.int_r += si;  

        let hpp;
        if (p.id === you.id) {
            hpp = Math.round(rand(1.4*Math.log(p.lvl)*t*p.stat_per_lvl[0],1.8*p.lvl*t*p.stat_per_lvl[0]));
        } else {
            hpp = Math.round(rand(1.8*Math.log(p.lvl)*t*p.stat_per_lvl[0],2.2*p.lvl*t*p.stat_per_lvl[0]));
        }
        p.hp_r+=hpp;
        p.hpmax+=hpp;
        p.hp+=hpp;
        if(p.id!==you.id) {
            p.hp=p.hpmax=p.hp_r;
        }
        if (p.id!=you.id) {
            p.exp=p.exp*(1+t/5)+1<<0;
        } else {
            dom.d3.update();

            if (verbose===true) {
                msg("Leveled Up "+you.lvl,'orange');
                msg('STR +'+Math.round(sb),'darkturquoise');
                msg_add(' | AGL +'+Math.round(sa),'darkturquoise');
                msg_add(' | INT +'+Math.round(si),'darkturquoise');
                msg_add(' | HP +'+hpp,'darkturquoise');
            }

            you.expnext_t=you.expnext();
            if (you.eqp[0].id===10000) {
                you.eqp[0].cls[2]=you.lvl/4<<0;
                you.eqp[0].aff[0]=you.lvl/5<<0;
                you.eqp[0].ctype=2;
            }
            if (global.stat.deadt<1&&you.lvl>=20) giveTitle(ttl.ndthextr);
        }
    }
    p.stat_r();
    update_d(); 
}

function giveExp(exp, r, g, b, sendLvlUpMsg=true, customMsg, customMsgColor='lightyellow'){
    if(!r) exp = Math.round((exp*you.exp_t*(0.4+you.efficiency()*0.6)))-(you.lvl-1); exp=exp<=0?1:exp;
    
    if (!customMsg) {
        if(!b) {
            if(global.flags.m_blh === false && !g){
                msg('EXP: +'+formatw(exp),'hotpink');
            }
        } else {
            msg('EXP: +'+formatw(exp),'hotpink');
        }
    } else {
        msg(customMsg, customMsgColor);
    }
    global.stat.exptotl+=exp;

    if(you.exp+exp<you.expnext_t) you.exp+=exp;
    else {
        let extra = (you.exp+exp)-you.expnext_t; 
        you.exp=0; 
        if (sendLvlUpMsg) {
            lvlup(you, undefined); 
        } else {
            lvlup(you, undefined, false); 
        }
        giveExp(extra,true,true);
    } 
    dom.d5_2_1.update(); 
}

function giveSkExp(skl, exp, res, showSkillUnlocked, showLevelUp) {
    exp = res === false ? exp : exp * skl.p; //skl.lastupd = time.minute+2;
    if(skl.exp + exp < skl.expnext_t) skl.exp+=exp; 
    else {
        let extra = (skl.exp+exp)-skl.expnext_t;
        skl.exp=0;
        skl.lvl++;
        global.stat.slvs++;
        if(!scanbyid(you.skls,skl.id)) {
            you.skls.push(skl);
            if (showSkillUnlocked) {
                msg('<span style="text-shadow:cyan 0px 0px 2px">New Skill Unlocked! <span style="text-shadow:red 0px 0px 2px;color:orange">"'+(!!skl.bname?skl.bname:skl.name)+'"</span></span>','aqua',skl,6);
            }
            if (!global.flags.sklu) {
                dom.ct_bt2.innerHTML = 'skills';
                global.flags.sklu = true;
            }
        }
        else {
            if (showLevelUp) {
                msg('Skill <span style="color:tomato">\''+(!!skl.bname?skl.bname:skl.name)+'\'</span> Leveled Up: '+skl.lvl,'deepskyblue',skl,6);
            }
        }
        skl.onLevel();
        skl.expnext_t=skl.expnext();
        if(!!skl.mlstn) for(let ss=0;ss<skl.mlstn.length;ss++) if(skl.mlstn[ss].lv===skl.lvl&&skl.mlstn[ss].g===false) {msg("NEW PERK UNLOCKED "+'<span style="color:tomato">("'+skl.name+'")<span style="color:orange">lvl: '+skl.mlstn[ss].lv+'</span></span>','lime',{x:skl.name,y:'Perk lvl '+skl.mlstn[ss].lv+': <span style="color:yellow">'+skl.mlstn[ss].p+'</span>'},7);skl.mlstn[ss].f();skl.mlstn[ss].g=true};
        giveSkExp(skl,extra,false); 
    }
    skl.onGive(exp);
}

function giveTitle(title, lv){
    if (title.have === false) {
        global.titles.push(title);
        if (title.id!==0) {
            global.titlese.push(title);
        }
        you.title = title;
        title.have = true;
        if(!title.tget&&title.talent) {
            title.talent();
            title.tget=true;
        }
        title.onGet();
        for(let x in global.ttlschk) global.ttlschk[x]();
        if(!lv) {
            msg('New Title Earned! '+col('"'+title.name+'"','orange'),'cyan',title,5);
            dom.d3.update();
        }
    } else return;
}

function isort(type,flags){
  empty(dom.inv_con);
  if (type===1) for(let k=0;k<inv.length;k++) renderItem(inv[k]); else{
    global.sinv=[];
    for(let k=0;k<inv.length;k++) if (type===inv[k].stype) {global.sinv.push(inv[k]);renderItem(inv[k]);}
  }
  global.sm = type; if(flags&&flags.tr)iftrunkopenc(1);
}

function rsort(type){
  empty(dom.ct_bt1_1);
  if (type===0||!type) for(let ind in global.rec_d) renderRcp(global.rec_d[ind]); else{
    global.srcp=[];
    for(let k=0;k<global.rec_d.length;k++) if (type===global.rec_d[k].type) global.srcp.push(global.rec_d[k]);
    for(let k=0;k<global.srcp.length;k++) renderRcp(global.srcp[k])
  }
  global.rm = type;
}

function objempty(obj){for(let a in obj) return false}

function kill(obj){obj=null; /* delete obj — not valid in strict mode; just nulling is sufficient */}

function effAct_test(){
  for(let index in you.eff) you.eff[index].use(creature.bat);
}

function canRead(){
  if(!global.flags.civil||global.flags.civil.btl){msg('It is too dangerous to read right now','red');return false}
  if(global.flags.rdng){msg("You\'re already reading",'orange');return false}
  if(global.flags.work){msg("You have a job to do",'orange');return false}
  if(global.flags.busy){msg("You'll have to stop what you're doing first",'orange');return false}
  if(global.flags.isshop){msg("This isn\'t the library",'orange');return false}
  if(global.flags.sleepmode){msg("You can't read while sleeping",'orange');return false}
  return true;
}

function canScout(what){
  if(what.data.scoutm){
    for(let a in what.scout) if(what.data.gets[a]!==true&&(!what.scout[a].cond||what.scout[a].cond()===true)) return 1; return 2 
  } return 3
}

function scoutGeneric(chs){  
  if(global.flags.isdark&&!cansee()) return msg('You can\'t see anything','grey')
  let sct = select(chs.scout); let idx = chs.scout.indexOf(sct); giveSkExp(skl.scout,.3); chs.data.scout+=2*(1+skl.scout.lvl*.2); let m = 1;
  if(chs.data.scout>=chs.data.scoutm) {m=5; chs.data.scout=0} 
  if((!sct.cond||sct.cond()===true)&&!chs.data.gets[idx]&&random()<=sct.c*m*(1+skl.scout.lvl*.15)*(1+chs.data.gotmod*.2)){global.stat.dsct++;chs.data.gotmod++;sct.f();giveSkExp(skl.scout,(sct.exp?sct.exp:.5/sct.c))}
  let t=2; for(let a in global.current_location.sector) {let m = canScout(global.current_location.sector[a]); if(m===1) t=m}
  if(canScout(global.current_location)>=2&&t>=2) {deactivateAct(act.scout);msg('There doesn\'t seem to be anything of interest left in this area')}
}

function disassembleGeneric(obj){
  for(let a in obj.dss){
    let amt = obj.dss[a].amount;
    if(obj.dss[a].q) amt = (amt+amt*(obj.dss[a].q*skl.dssmb.lvl))<<0;
    if(obj.dss[a].max) if(amt>obj.dss[a].max) amt = obj.dss[a].max;
    let c = 1; if(obj.slot) c = obj.dp/obj.dpmax; amt=Math.ceil(amt/(2-c));
    giveItem(obj.dss[a].item,amt)
  } giveSkExp(skl.dssmb,(2**obj.rar||1)*5-9.5); global.stat.dsst++;
  if(obj.slot)removeItem(obj);else{obj.amount--;if(obj.amount<=0) removeItem(obj); else if(obj.stype===global.sm)updateInv(global.sinv.indexOf(obj));else if(global.sm===1) updateInv(inv.indexOf(obj))}
}

function wdrseason(flag){
  let s; s=!flag?getSeason(true):global.text.ssns[getSeason()-1]; dom.d_weathers.innerHTML= '['+s+']';
  switch(getSeason()){
    case 1: dom.d_weathers.style.color='springgreen';dom.d_weathers.style.backgroundColor='#253'; break
    case 2: dom.d_weathers.style.color='lime'; dom.d_weathers.style.backgroundColor='#141'; break
    case 3: dom.d_weathers.style.color='yellow'; dom.d_weathers.style.backgroundColor='#631'; break
    case 4: dom.d_weathers.style.color='ghostwhite'; dom.d_weathers.style.backgroundColor='#556'; break
  }
}

function ontick(){
    global.stat.tick++;
    time.minute += global.timescale;
    wManager(); 
    
    for (let a in plans[0]) plans[0][a].f();
    
    dom.d_time.innerHTML = '<small>'+
    getDay(global.flags.tmmode||2)+
    '</small> '+
    timeDisp(time); //global.stat.seed1=(random()*7e+7<<7)%7&7
    
    if (typeof global.current_location.onStay === 'function') {
        global.current_location.onStay();
    }
    runEffectors(global.current_location.effectors);
  
    for (let a in sectors) {
        sectors[a].onStay();
        runEffectors(sectors[a].effectors);
    }
    giveSkExp(skl.aba,.004);
    let timeh = (time.minute/DAY)<<0;
    if(global.timehold!==timeh) {
        global.timehold=timeh; //proc when day passes
        for(let a in plans[1]) plans[1][a].f();
        for(let vnd in vendor) vendor[vnd].onDayPass();
        empty(dom.d_moon);
        dom.d_moon.innerHTML=global.text.lunarp[getLunarPhase()][0];
        addDesc(dom.d_moon,null,2,'Lunar Phase',global.text.lunarp[getLunarPhase()][1]);
        wdrseason(global.flags.ssngaijin);
        if(getSeason()===4) global.flags.iscold=true;
        else global.flags.iscold=false;
        global.offline_evil_index+=.00008;

        let timew = (time.minute/WEEK)<<0;
        if(global.timewold!==timew) {
            global.timewold=timew; //proc when week passes
            for(let a in plans[2]) plans[2][a].f();
        }  
    }
    let h = getHour();
    if (h>5&&h<22) {
        global.flags.isday=true;
        dom.d_moon.style.display='none'
    } else {
        if(global.flags.inside===false&&random()<.00002*you.mods.stdstps) {
            msg('A star particle landed on you!','gold',null,null,'darkblue');
            giveItem(item.stdst)
        }
        global.flags.isday=false;
        dom.d_moon.style.display='';
    }
    for(let g=0;g<you.eff.length;g++) if(you.eff[g].type===3||you.eff[g].type===5||you.eff[g].type===6) you.eff[g].use(you.eff[g].y,you.eff[g].z);
    for(let g=0;g<global.current_m.eff.length;g++) if(global.current_m.eff[g].type===3||global.current_m.eff[g].type===5||global.current_m.eff[g].type===6) global.current_m.eff[g].use(global.current_m.eff[g].y,global.current_m.eff[g].z);
    
    if(global.flags.btl===true) timers.btl=setTimeout(fght(you,global.current_m),1000/global.fps);
    else giveSkExp(skl.mdt,.0065*(1+skl.ptnc.lvl*.15)*(effect.incsk.active===true?2:1));
    
    for(let obj in furn) furn[obj].use();
    //for(let q in qsts) qsts[q].tracker();
    if(you.sat>0) {
        let lose = you.mods.sdrate
        if (global.flags.iswet  === true) lose*=(3/(1+(skl.abw.lvl*.03)))
        if (global.flags.iscold === true) lose+=effect.cold.duration/1000/(1+skl.coldr.lvl*.05); 
        you.sat -= lose;
    } else {
        giveSkExp(skl.fmn,.1);
    }
    if(global.flags.sleepmode) global.stat.timeslp+=global.timescale;
    
    /* sorry ;<
    if(random()<.00000001) {
        let au = new Audio("laugh6.wav");
        au.play();
    }
    */
    
    dom.d5_3_1.update();
}

function update() {
    setTimeout(function() {
        update();
        ontick();
    },
    1000/global.fps);
}

function select(arr){
  return arr[rand(arr.length-1)];
}

function nograd(s){
  if(s===true){
    for(let i=0;i<document.getElementsByClassName('d2').length;i++) document.getElementsByClassName('d2')[i].style.background='#0e574b';
    for(let i=0;i<document.getElementsByClassName('d3').length;i++) document.getElementsByClassName('d3')[i].style.background='#0e574b';
    for(let i=0;i<document.getElementsByClassName('hp').length;i++) document.getElementsByClassName('hp')[i].style.background='#91e6b6';
    for(let i=0;i<document.getElementsByClassName('exp').length;i++) document.getElementsByClassName('exp')[i].style.background='#ea9c83';
    for(let i=0;i<document.getElementsByClassName('en').length;i++) document.getElementsByClassName('en')[i].style.background='#4f3170';
    dom.inv_ctx.style.background=dom.inv_control_b.style.background=dom.ctrmg.style.background='#00224e'; dom.d7m_c.style.background='#392c72';
    for(let i=0;i<document.styleSheets[0].rules.length;i++) if(document.styleSheets[0].rules[i].selectorText==".opt_c:hover, .ct_bts:hover, .chs:hover, .bts:hover, .bbts:hover, .bts_b:hover, .inv_slot:hover, .bts_m:hover") document.styleSheets[0].rules[i].style.background='#0e574b'; global.flags.grd_s=false;
  }
  else{
    for(let i=0;i<document.getElementsByClassName('d2').length;i++) document.getElementsByClassName('d2')[i].style.background='linear-gradient(90deg,rgb(25,129,108),rgb(1,41,39))';
    for(let i=0;i<document.getElementsByClassName('d3').length;i++) document.getElementsByClassName('d3')[i].style.background='linear-gradient(90deg,rgb(25,129,108),rgb(1,41,39))';
    for(let i=0;i<document.getElementsByClassName('hp').length;i++) document.getElementsByClassName('hp')[i].style.background='linear-gradient(90deg,rgb(254,239,157),rgb(45,223,206))';
    for(let i=0;i<document.getElementsByClassName('exp').length;i++) document.getElementsByClassName('exp')[i].style.background='linear-gradient(90deg,rgb(254,239,157),rgb(219,119,158))';
    for(let i=0;i<document.getElementsByClassName('en').length;i++) document.getElementsByClassName('en')[i].style.background='linear-gradient(270deg,rgb(124,68,112),rgb(29,29,113))';
    dom.inv_ctx.style.background=dom.inv_control_b.style.background=dom.ctrmg.style.background='linear-gradient(90deg,rgb(0,5,51),rgb(0,65,107))'; dom.d7m_c.style.background='linear-gradient(270deg,rgb(84,28,112),rgb(29,62,116))';
    for(let i=0;i<document.styleSheets[0].rules.length;i++) if(document.styleSheets[0].rules[i].selectorText==".opt_c:hover, .ct_bts:hover, .chs:hover, .bts:hover, .bbts:hover, .bts_b:hover, .inv_slot:hover, .bts_m:hover") document.styleSheets[0].rules[i].style.background='linear-gradient(90deg,rgb(25,129,108),rgb(1,41,39))';global.flags.grd_s=true;
  }
}

function reduce(itm,amt){
    if(amt) {
        itm.amount=itm.amount-amt<=0?0:itm.amount-amt
    }
    
    if(itm.amount<=0) {
        removeItem(itm);updateTrunkLeftItem(itm,true)
    }
    else if (global.sm===1) updateInv(inv.indexOf(itm));
    else if (global.sm===itm.stype) updateInv(global.sinv.indexOf(itm));
    updateTrunkLeftItem(itm)}

function cansee(){if((global.flags.isdark&&you.mods.light>0)||skl.ntst.lvl>=12)return true}

function col(txt,c,bc){
    let cc; let bcc;
    if(c) cc = 'color:'+c+';';
    if(bc) bcc = 'background-color:'+bc+';';
    return '<span'+(c?(' style="'+cc+(bc?bcc:'')+'"'):'')+'>'+txt+'</span>'
}

function usePlayerWeaponSkill() { 
    switch(you.eqp[0].wtype){
      case 0:skl.unc.use();break;
      case 1:skl.srdc.use();break;
      case 2:skl.axc.use();break;
      case 3:skl.knfc.use();break;
      case 4:skl.plrmc.use();break;
      case 5:skl.hmrc.use();break;
      case 6:skl.stfc.use();break;
    }
}

function printBodyPartHit(partNumber) {
  switch (partNumber){
   case 2: msg_add(' (head)','orange');break;
   case 3: msg_add(' (body)','orange');break;
   case 4: msg_add(' (L hand)','orange');break;
   case 5: msg_add(' (R hand)','orange');break;
   case 6: msg_add(' (legs)','orange');break;
  }
}

function printCritIfCrit() {
  if(global.flags.crti){msg_add(' CRIT! ','yellow');global.flags.crti=false}
}

function printDamageNumber(ddmg){
  let col; let bcol=''; let shd=''; 
  switch(global.atype_d){
    case 0: col='pink'; break;
    case 1: col='lime'; break;
    case 2: col='yellow'; break;
    case 3: col='orange';bcol='crimson';break;
    case 4: col='cyan'; break;
    case 5: col='lightgoldenrodyellow';shd="gold 0px 0px 5px" ;break;
    case 6: col='thistle';shd="blueviolet 0px 0px 5px"; break;
  }
  if(ddmg>9999) formatw(ddmg);
  msg_add(ddmg,col,bcol,shd);
}

function printHitMessage(attackerName, ddmg, targetsPlayer) {
  if(global.mabl.id===0) msg(attackerName+(targetsPlayer===true?global.mabl.atrg:global.mabl.btrg));
  else msg((targetsPlayer===true?attackerName:'')+(targetsPlayer===true?global.mabl.atrg:('You '+global.mabl.btrg))); 
  printHitMessageResult(ddmg, targetsPlayer);
}

function printMultihitMessage(times, attackerName, acc_dmg, targetsPlayer) {
  msg(attackerName+' -> x'+(times-global.miss)+'(<span style="color:lightgrey">'+times+'</span>) for ');
  printHitMessageResult(acc_dmg, targetsPlayer);
  if(time-global.miss>0) printBodyPartHit(global.target_g)
}

function printHitMessageResult(ddmg, targetsPlayer) {
  printDamageNumber(ddmg); 
  printCritIfCrit();
  if(targetsPlayer===true&&!global.flags.msd) printBodyPartHit(global.t_n)
}

function doSingleAttack(attacker, defender, isPlayerAttacking) {
  if(isPlayerAttacking){
    let dm = skl.fgt.use(); if(you.eqp[0].twoh===true) dm+=skl.twoh.use(); 
    you.str+=dm; you.int+=dm;
    usePlayerWeaponSkill();
  }
  attacker.battle_ai(attacker,defender); 
}

function getlastd(){
  switch(global.atkdfty[0]){
    case 1: return '<span style="color:black;background-color:yellow">Struck by lightning</span>'; break;
    case 2: switch(global.atkdfty[1]){
        case 1: return '<span style="color:red;background-color:darkmagenta">Suffocated from poison</span>'; break;
        case 2: return '<span style="color:darkmagenta;">Suffocated from venom</span>'; break;
        case 3: return '<span style="color:red;background-color:darkred">Bled out</span>'; break;
        case 4: return '<span style="color:white;background-color:black">Rotten from corruption</span>'; break;
    };break;
    case 3: let txt = ''; let fc=['','','']
      switch(global.atkdftydt.a){
        case 0: fc[0]='pink'; break;
        case 1: fc[0]='lime'; break;
        case 2: fc[0]='yellow';; break;
        case 3: fc[0]='orange';fc[1]='crimson'; break;
        case 4: fc[0]='cyan'; break;
        case 5: fc[0]='lightgoldenrodyellow';fc[2]='gold 0px 0px 5px'; break;
        case 6: fc[0]='thistle';fc[2]='blueviolet 0px 0px 5px'; break;
      } 
      switch(global.atkdftydt.c){
        case 0: txt +='<span style="color:'+fc[0]+';background-color:'+fc[1]+';text-shadow:'+fc[2]+'">'+select(['Slashed','Lacerated','Cut down','Hacked'])+'</span>'; break;
        case 1: txt +='<span style="color:'+fc[0]+';background-color:'+fc[1]+';text-shadow:'+fc[2]+'">'+select(['Pierced','Impaled','Gored'])+'</span>'; break;
        case 2: txt +='<span style="color:'+fc[0]+';background-color:'+fc[1]+';text-shadow:'+fc[2]+'">'+select(['Smashed','Crushed','Destroyed'])+'</span>'; break;
      } txt+=' by ';
    for(let a in creature) if(creature[a].id===global.atkdftydt.id) {txt+=creature[a].name; break} return txt; break;
    default: return 'what casualty?'; break;
  }
}

function draggable(root,target){ 
  root.addEventListener('mousedown',function(x){global.ctarget=target;this.boxoffsetx=x.clientX-parseInt(target.style.left);this.boxoffsety=x.clientY-parseInt(target.style.top);global.croot=root;document.body.addEventListener('mousemove',draggablemove)});
  root.addEventListener('mouseup',function(x){global.ctarget=null;global.croot=null;document.body.removeEventListener('mousemove',draggablemove)});
}

function draggablemove(x){ 
  if(global.ctarget){global.ctarget.style.left=x.clientX-global.croot.boxoffsetx;global.ctarget.style.top=x.clientY-global.croot.boxoffsety}
}


window.getMinute = getMinute;
window.getHour = getHour;
window.getDay = getDay;
window.getMonth = getMonth;
window.getYear = getYear;
window.getLunarPhase = getLunarPhase;
window.getSeason = getSeason;
window.timeConv = timeConv;
window.timeDisp = timeDisp;
window.dropC = dropC;
window.dropread = dropread;
window.roll = roll;
window.handStr = handStr;
window.format3 = format3;
window.formatw = formatw;
window.u_loc = u_loc;
window.rfeff = rfeff;
window.lvlup = lvlup;
window.giveExp = giveExp;
window.giveSkExp = giveSkExp;
window.giveTitle = giveTitle;
window.isort = isort;
window.rsort = rsort;
window.objempty = objempty;
window.kill = kill;
window.effAct_test = effAct_test;
window.canRead = canRead;
window.canScout = canScout;
window.scoutGeneric = scoutGeneric;
window.disassembleGeneric = disassembleGeneric;
window.wdrseason = wdrseason;
window.ontick = ontick;
window.update = update;
window.select = select;
window.nograd = nograd;
window.reduce = reduce;
window.cansee = cansee;
window.col = col;
window.usePlayerWeaponSkill = usePlayerWeaponSkill;
window.printBodyPartHit = printBodyPartHit;
window.printCritIfCrit = printCritIfCrit;
window.printDamageNumber = printDamageNumber;
window.printHitMessage = printHitMessage;
window.printMultihitMessage = printMultihitMessage;
window.printHitMessageResult = printHitMessageResult;
window.doSingleAttack = doSingleAttack;
window.getlastd = getlastd;
window.draggable = draggable;
window.draggablemove = draggablemove;
