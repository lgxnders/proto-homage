function listen_k(e){
  global.keytarget=e.target; 
  if(e.which===46){
    for(let obj in global.shortcuts) if(global.shortcuts[obj][0]===global.keyobj.data.skey) global.shortcuts.splice(global.shortcuts.indexOf(global.shortcuts[obj]),1)
    global.keytarget.children[0].innerHTML=global.keyobj.name;
    global.keyobj.data.skey=null;
  }
  else if((e.which>=47&&e.which<=90)||(e.which>=96&&e.which<=105)){
    global.keytarget.children[0].innerHTML=global.keyobj.name+'<small> {'+String.fromCharCode(global.keyobj.data.skey)+'}</small>';
    if(global.keyobj.data.skey>0&&e.which!==global.keyobj.data.skey) {for(let obje in global.shortcuts){if(global.shortcuts[obje][2].data.skey===global.keyobj.data.skey){global.shortcuts[obje][2].data.skey=null; global.shortcuts.splice(global.shortcuts.indexOf(global.shortcuts[obje]),1);}}}
    let tg; for(let obj in global.shortcuts){ 
      if(e.which===global.shortcuts[obj][0]) {global.shortcuts[obj][2].data.skey=null; global.shortcuts.splice(global.shortcuts.indexOf(global.shortcuts[obj]),1);}
      } global.keyobj.data.skey=e.which;global.shortcuts.push([e.which,global.keyobj.id,global.keyobj]); global.shortcuts[global.shortcuts.length-1][2].data.skey=e.which; isort(global.sm)
  }
}

document.body.addEventListener('keydown',function(e){
  if(global.flags.kfocus!==true){
    for(let obj in global.shortcuts) if(e.which===global.shortcuts[obj][0]) {
      g = global.shortcuts[obj][2]; if(g.amount>0||!!g.slot){g.use();reduce(g);iftrunkopenc(1);if(g.id<3000&&!g.data.tried){g.data.tried=true;global.stat.ftried+=1;}
      break
    }}
  }
  if(!global.flags.shifton&&(e.which===69||e.which===16)){
    global.flags.shifton=true; global.kkey = 1;
    descsinfo(global.shiftid)
  }
});

document.body.addEventListener('keyup',function(e){
  if(e.which===69||e.which===16){
    global.flags.shifton=false; if(dom.dscshe)dom.dscshe.innerHTML = ''; global.kkey = -1
  }
});

function descsinfo(id){
  if(id===100) if(global.shiftitem.item.rot&&you.mods.survinf>0){
    let itm = global.shiftitem.item; let ds, rs, dt, rt, c
    switch(you.mods.survinf){
      case 1:
        ds =  Math.ceil(itm.amount*((itm.rot[2]+itm.rot[3])/2)); rs = itm.data.rottil;
        dt = ''; rt = ''; c = '';
        if(ds<5) dt = 'a couple'; else if(ds<10) dt = 'a few'; else if(ds<30) dt = 'some'; else if(ds<50) dt = 'multiple'; else if(ds<100) dt = 'dozens'; else dt = 'many';
        if(rs<.1) {rt = 'very fresh'; c='lime'} else if(rs<.2) {rt = 'fresh'; c='limegreen'} else if(rs<.5) {rt = 'like it\'s reaching midlife'; c='yellow'} else if(rs<.75) {rt = 'will go bad soon'; c='grey'} else if(rs<1) {rt = 'are almost decayed';c='red'}
        if(rs<.5) dom.dscshe.innerHTML = dom.dseparator+'<span style="color:orange">This food looks <span style="color:'+c+'">'+rt+'</span>';
        else dom.dscshe.innerHTML = dom.dseparator+'<span style="color:orange"><span style="color:cyan">'+dt+'</span> units of this item <span style="color:'+c+'">'+rt+'</span></span>';
        break;
      case 2:
        ds = Math.ceil(itm.amount*((itm.rot[2]+itm.rot[3])/2)); rs = (Math.ceil((1-itm.data.rottil)/((itm.rot[0]+itm.rot[1])/2)));
        dom.dscshe.innerHTML = dom.dseparator+'<span style="color:orange">Upon examination, about <span style="color:cyan">'+ds+'</span> units of this item will decay in approximately <span style="color:yellow">'+rs+'</span> days</span>'; break;
    }
     dom.dscshe.style.paddingTop=20;
  } 
}

function renderItem(obj){
  let inv_slot_c = addElement(dom.inv_con,'div',null,'noout');
  let inv_slot = addElement(inv_slot_c,'div',null,'inv_slot noout');
  /*switch(obj.wtype){
    case 1:var z= icon(inv_slot,2,1,18,18);z.style.paddingRight=2;break;
    case 2:var z= icon(inv_slot,4,1,18,18);z.style.paddingRight=2;break;
    case 3:var z= icon(inv_slot,3,1,18,18);z.style.paddingRight=2;break;
  }*/ 
  let inv_name = addElement(inv_slot,'span');
  inv_name.innerHTML = obj.name;
  if(!!obj.data.skey) inv_name.innerHTML+='<small> {'+String.fromCharCode(obj.data.skey)+'}</small>';
  if(obj.new===true) inv_name.innerHTML+='<small style="font-size:.65em;color: yellow;position:absolute" class="blinks">　new</small>';

  inv_slot_c.addEventListener('mouseenter',function(){ 
    global.keyobj=obj;
    inv_slot.tabIndex=0;
    inv_slot.focus();
    inv_slot.addEventListener('keydown',listen_k);
    global.flags.kfocus=true;
    if(obj.important===false&&obj.slot){
      dom.inv_del = addElement(inv_slot_c,'small',null,'del_b');
      dom.inv_del.innerHTML = 'x';
      addDesc(dom.inv_del,null,2,'Throw away','Deletes <span style="color:cyan">\"'+obj.name+'\"</span> permanently');
      dom.inv_del.addEventListener('click',()=>{
          let prm = addElement(document.body,'div');
          prm.style.backgroundColor='grey';
          prm.style.width=window.innerWidth+'px';
          prm.style.height=window.innerHeight+'px';
          prm.style.position='fixed';
          prm.style.left='0px';
          prm.style.top='0px';
          prm.style.opacity=.4;
          prm.style.zIndex=9998;

          let prm2 = addElement(document.body,'div');
          prm2.style.position='fixed';
          prm2.style.top=(window.innerHeight/2-40)+'px';
          prm2.style.left=(window.innerWidth/2-195)+'px';
          prm2.style.width='390px';
          prm2.style.height='80px';prm2.style.border='4px black solid';
          prm2.style.padding='5px';prm2.style.backgroundColor='lightgrey';
          prm2.style.zIndex=9999;

          let pin = addElement(prm2,'div');
          pin.style.height='32px';
          pin.innerHTML='Really destroy \"'+obj.name+'\"\?';
          pin.style.textAlign='center';
          pin.style.width='100%';
          pin.style.borderBottom='2px solid black';
          pin.style.paddingTop='10px';

          let pcon = addElement(prm2,'div');
          pcon.style.display='flex';
          pcon.style.textAlign='center';
          pcon.style.backgroundColor='darkgrey';

          let phai = addElement(pcon,'div');
          phai.style.width='50%';
          phai.innerHTML='YES';
          phai.style.paddingTop='9px';
          phai.style.paddingBottom='9px';

          let piie = addElement(pcon,'div');
          piie.style.width='50%';
          piie.innerHTML='NO';
          piie.style.paddingTop='9px';
          piie.style.paddingBottom='9px';

          phai.addEventListener('mouseenter',function(){this.style.backgroundColor='#666'});piie.addEventListener('mouseenter',function(){this.style.backgroundColor='#666'});
          phai.addEventListener('mouseleave',function(){this.style.backgroundColor='darkgrey'});piie.addEventListener('mouseleave',function(){this.style.backgroundColor='darkgrey'});
          phai.addEventListener('click',()=>{if(obj.slot&&obj.data.uid===you.eqp[obj.slot-1].data.uid) unequip(obj);giveSkExp(skl.rccln,(2**obj.rar)*5-9.5);giveSkExp(skl.thr,.5);global.stat.thrt++;removeItem(obj);empty(global.dscr);document.body.removeChild(prm);document.body.removeChild(prm2)});
          piie.addEventListener('click',()=>{document.body.removeChild(prm);document.body.removeChild(prm2)});
      });}
    if(obj.slot===5||obj.slot===6){
      dom.eq_l = addElement(inv_slot_c,'small',null,'eq_l'); dom.eq_l.innerHTML = 'L'; addDesc(dom.eq_l, obj);
      dom.eq_l.addEventListener('click',()=>{if(obj.data.uid!==you.eqp[4].data.uid&&obj.data.uid!==you.eqp[5].data.uid) {obj.slot=5;equip(obj);} else if(obj.data.uid!==you.eqp[4].data.uid&&obj.data.uid===you.eqp[5].data.uid){unequip(obj);obj.slot=5;equip(obj);}else {unequip(obj);dom.eq_l.style.backgroundColor='royalblue';this.children[0].removeChild(this.children[0].lastChild)}});
      if(obj.data.uid===you.eqp[4].data.uid) dom.eq_l.style.backgroundColor='crimson';
      dom.eq_r = addElement(inv_slot_c,'small',null,'eq_r'); dom.eq_r.innerHTML = 'R'; addDesc(dom.eq_r, obj);
        dom.eq_r.addEventListener('click',()=>{if(obj.data.uid!==you.eqp[4].data.uid&&obj.data.uid!==you.eqp[5].data.uid) {obj.slot=6;equip(obj);} else if(obj.data.uid===you.eqp[4].data.uid&&obj.data.uid!==you.eqp[5].data.uid){unequip(obj);obj.slot=6;equip(obj);}else {unequip(obj);dom.eq_r.style.backgroundColor='royalblue';this.children[0].removeChild(this.children[0].lastChild)}});
      if(obj.data.uid===you.eqp[5].data.uid) dom.eq_r.style.backgroundColor='crimson';
    }
  if(obj.dss&&item.toolbx.have){ 
    dom.inv_dss = addElement(inv_slot_c,'span',null,'dss_b'); dom.inv_dss.innerHTML = '∥'; if(!obj.slot) dom.inv_dss.style.left=242; else if(obj.slot===5||obj.slot===6) dom.inv_dss.style.left=208
    let t=''; for(let a in obj.dss) {
      let amt = obj.dss[a].amount;
      if(obj.dss[a].q) amt = (amt+amt*(obj.dss[a].q*skl.dssmb.lvl))<<0
      if(obj.dss[a].max) if(amt>obj.dss[a].max) amt = obj.dss[a].max;
      let c = 1; if(obj.slot) c = obj.dp/obj.dpmax; amt=Math.ceil(amt/(2-c)); 
      t+='<br><span style="color:orange">'+obj.dss[a].item.name+': <span style="color:'+(obj.dss[a].max&&obj.dss[a].max===amt?'lime':'lightblue')+'">'+amt+'</span></span>'
    }
    addDesc(dom.inv_dss,null,2,'Disassemble','Deconstruct <span style="color:cyan">\"'+obj.name+'\"</span> into:<br>'+t);
    dom.inv_dss.addEventListener('click',()=>{
      if(obj.slot&&obj.data.uid===you.eqp[obj.slot-1].data.uid){
        let prm = addElement(document.body,'div'); prm.style.backgroundColor='grey';prm.style.width=window.innerWidth+'px';prm.style.height=window.innerHeight+'px';prm.style.position='fixed';prm.style.left='0px';prm.style.top='0px';prm.style.opacity=.4;
        let prm2 = addElement(document.body,'div'); prm2.style.position='fixed';prm2.style.top=(window.innerHeight/2-40)+'px';prm2.style.left=(window.innerWidth/2-195)+'px';prm2.style.width='390px';prm2.style.height='90px';prm2.style.border='4px black solid';prm2.style.padding='5px';prm2.style.backgroundColor='lightgrey';
        let pin = addElement(prm2,'div'); pin.style.height=42; pin.innerHTML='You are currently wearing \"<span style="color:crimson">'+obj.name+'</span>\"<br>Really deconstruct?';pin.style.textAlign='center';pin.style.width='100%';pin.style.borderBottom='2px solid black';pin.style.paddingTop=10;
        let pcon = addElement(prm2,'div'); pcon.style.display='flex';pcon.style.textAlign='center';pcon.style.backgroundColor='darkgrey';
        let phai = addElement(pcon,'div'); phai.style.width='50%'; phai.innerHTML='YES';phai.style.paddingTop=9;phai.style.paddingBottom=9;
        let piie = addElement(pcon,'div'); piie.style.width='50%'; piie.innerHTML='NO';piie.style.paddingTop=9;piie.style.paddingBottom=9;
        phai.addEventListener('mouseenter',function(){this.style.backgroundColor='#666'});piie.addEventListener('mouseenter',function(){this.style.backgroundColor='#666'});
        phai.addEventListener('mouseleave',function(){this.style.backgroundColor='darkgrey'});piie.addEventListener('mouseleave',function(){this.style.backgroundColor='darkgrey'});
        phai.addEventListener('click',()=>{disassembleGeneric(obj);document.body.removeChild(prm);document.body.removeChild(prm2)});
        piie.addEventListener('click',()=>{document.body.removeChild(prm);document.body.removeChild(prm2)});
      }
      else disassembleGeneric(obj)}
    );}
  });
  inv_slot_c.addEventListener('mouseleave',function(){
    inv_slot.tabIndex=-1; inv_slot.removeEventListener('keydown',listen_k); global.keyobj=0; global.flags.kfocus=false;
    if(obj.important===false&&obj.slot)inv_slot_c.removeChild(dom.inv_del);
    if(obj.dss&&item.toolbx.have) inv_slot_c.removeChild(dom.inv_dss);
    if(obj.slot===5||obj.slot===6){inv_slot_c.removeChild(dom.eq_r); inv_slot_c.removeChild(dom.eq_l);}
  });
  if(obj.slot&&scanbyuid(you.eqp,obj.data.uid)===true) {
    dom.spc_a = addElement(inv_slot,'small',null,'spc_a');
    dom.spc_a.innerHTML = 'E';
  }
  if(!obj.slot){
    let s_am = addElement(inv_slot,'small',null,'s_am');
    s_am.innerHTML=' x'+(obj.amount);
    inv_slot.addEventListener('mouseenter',function(){global.flags.kfocus=true;this.tabIndex=0; this.focus(); global.keyobj=obj; this.addEventListener('keydown',listen_k)})
    inv_slot.addEventListener('mouseleave',function(){global.flags.kfocus=false;this.tabIndex=-1; global.keyobj=0;this.removeEventListener('keydown',listen_k);})
  }
  if(!!obj.c||!!obj.bc){
    if(!!obj.c) inv_name.style.color=obj.c;
    if(!!obj.bc) inv_name.style.backgroundColor=obj.bc;
  }  
  else{
    switch (obj.stype){
      case 2: inv_name.style.color='rgb(255,192,5)';break;
      case 3: inv_name.style.color='rgb(0,235,255)';break;
      case 4: inv_name.style.color='rgb(44,255,44)';break;
    }
  }
  addDesc(inv_slot, obj,null,null,null,null,100);

  inv_slot.addEventListener("click", function (x) {
      if (!obj || typeof obj.use !== 'function') {
          console.log("The object you are trying to use contains missing data. Please check the definition for this item.");
          return;
      }

      if (obj.amount > 0 || !!obj.slot) {
          obj.use(x);
          if (!obj.slot) reduce(obj);
          if (obj.id < 3e3 && !obj.data.tried) {
              obj.data.tried = true;
              global.stat.ftried += 1;
              if (global.dscr.style.display != "none") dom.dtrd.innerHTML = 'Tried: <span style="color: lime">Yes</span>';
          }
      }
    });

    inv_slot.addEventListener("mouseleave", function () {
      if (obj.new === true) {
          obj.new = false;
          clearTimeout(timers.nsblk);
          inv_name.innerHTML = obj.name;
      }
  });

}

function updateInv(slot){
    if(global.sm===1) dom.inv_con.children[slot].children[0].children[1].innerHTML = ' x'+inv[slot].amount;
    else dom.inv_con.children[slot].children[0].children[1].innerHTML = ' x'+global.sinv[slot].amount;
}

function removeItem(obj,flag){
  if(obj.slot) if(wearing(obj)) unequip(obj)
  if(obj.data.skey){ 
    for(let s in global.shortcuts) if(obj.data.skey===global.shortcuts[s][0]) {global.shortcuts.splice(global.shortcuts.indexOf(obj.data.skey),1);continue};
  }
  let idx;
  if(global.sm===1) {idx=inv.indexOf(obj);
      dom.inv_con.removeChild(dom.inv_con.children[idx])
    } else if(global.sm===obj.stype){idx=global.sinv.indexOf(obj); 
      dom.inv_con.removeChild(dom.inv_con.children[idx])
    global.sinv.splice(idx,1);} 
  global.dscr.style.display='none';
  inv.splice(inv.indexOf(obj),1);
  obj.have=false; 
  if(obj.rot) for(let a in planner.imorph.data.items) if(planner.imorph.data.items[a].id===obj.id){planner.imorph.data.items.splice(planner.imorph.data.items.indexOf(obj));}
  if(global.lw_op===1) rsort(global.rm)
  if(flag&&flag.fl) iftrunkopen(1); else iftrunkopenc(1); if(obj.slot) kill(obj)
}

function m_update(){
    dom.mn_1.innerHTML = '㊧'+(you.wealth/100000000<<0);
    dom.mn_2.innerHTML = '●'+(you.wealth/10000%10000<<0);
    dom.mn_3.innerHTML = '●'+(you.wealth/100%100<<0);
    dom.mn_4.innerHTML = '●'+(you.wealth%100<<0);
}

function chs(txt, displayAsHeader=true, c, bc, iconx, icony, size, ignore, slimsize) {
    //
    // displayAsHeader makes the text appear at the top of the 'choice' menu for npc dialogue or a general feeling of an area.
    //
    if (displayAsHeader === true) {
        clr_chs();
        dom.ch_1 = addElement(dom.ctr_2,'div','chs');
        dom.ch_1.innerHTML = txt;
    }
    else {
        dom.ch_1 = addElement(dom.ctr_2,'div',null,'chs');
        dom.ch_1.innerHTML = txt;
    }
    if (!!iconx) {
        dom.ch_1.insertBefore( icon(dom.ch_1,iconx,icony), dom.ch_1.firstChild);
    }
    if (c) {
        dom.ch_1.style.color = c;
    }
    if (bc) {
        dom.ch_1.style.backgroundColor = bc;
    }
    if (size) {
        dom.ch_1.style.fontSize = size;
    }
    if (slimsize) {
        dom.ch_1.style.height = slimsize;
    }
    if (!ignore) {
        global.menuo = 0;
    }

    dom.ch_1.addEventListener('click', () => {
        clearInterval(timers.rptbncgt);
        global.flags.rptbncgtf = false;
        if (!global.flags.jdgdis) {
            global.flags.jdgdis = true;
            giveSkExp(skl.jdg, 0.1);
            setTimeout(() => {
                global.flags.jdgdis = false
            }, 500);
        }
    });
    return dom.ch_1;
}

function chs_spec(type,x){
    switch(type){
    
        case 1: { 
            clr_chs();
            let c = findbyid(furn,furniture.cat.id);
            let br = time.minute-c.data.age;
            
            dom.ch_1=addElement(dom.ctr_2,'div','chs');
            dom.ch_1.style.height='200px';
            dom.ch_1_1=addElement(dom.ch_1,'div',null,'chs_s');
            dom.ch_1_1.innerHTML='Name: <span style="color:orange">'+c.data.name+(c.data.sex===true?' ♂':' ♀')+'</span>';
            dom.ch_1_1.style.marginTop=-17;
            
            dom.ch_1_12=addElement(dom.ch_1,'div',null,'chs_s');
            dom.ch_1_12.innerHTML='Day of birth: <span style="color:lime">'+(((br/(YEAR))<<0)+'/'+(((br/(MONTH)<<0)%12)+1)+'/'+(((br/DAY<<0)%30)+1))+'</span>';
            
            dom.ch_1_2=addElement(dom.ch_1,'div',null,'chs_s');
            dom.ch_1_2.innerHTML='Age: '+(c.data.age>=YEAR?'<span style="color:orange">'+(c.data.age/YEAR<<0)+'</span> Years ':'')+(c.data.age>=MONTH?'<span style="color:yellow">'+(c.data.age/MONTH<<0)%12+'</span> Months ':'')+(c.data.age>=DAY?'<span style="color:lime">'+(c.data.age/DAY<<0)%30+'</span> Days ':'');
            
            dom.ch_1_3=addElement(dom.ch_1,'div',null,'chs_s');
            dom.ch_1_3.innerHTML='Pattern: <span style="color:cyan">'+global.text.cfp[c.data.p]+'</span> | Color: <span style="color:cyan">'+global.text.cfc[c.data.c]+'</span>';
            
            dom.ch_1_4=addElement(dom.ch_1,'div',null,'chs_s');
            dom.ch_1_4.innerHTML='Likes: <span style="color:lime">'+global.text.cln[c.data.l1]+'</span> And <span style="color:lime">'+global.text.cln[c.data.l2]+'</span>';
            
            timers.upd_cat = setInterval( () => {
                dom.ch_1_2.innerHTML = 'Age: '+
                    (c.data.age >= YEAR  ? '<span style="color:orange">'+(c.data.age/YEAR<<0)    +'</span> Years ' : '')+
                    (c.data.age >= MONTH ? '<span style="color:yellow">'+(c.data.age/MONTH<<0)%12+'</span> Months ':'')+
                    (c.data.age >= DAY   ? '<span style="color:lime">'  +(c.data.age/DAY<<0)%30  +'</span> Days ':'');
            }, 1000);
        } break;
        
        case 2: {
            clr_chs()
            
            dom.ch_1=addElement(dom.ctr_2,'div');
            dom.ch_1.style.height='76%';
            dom.ch_1.style.backgroundColor='rgb(0,20,44)';
            dom.flsthdr = addElement(dom.ch_1,'div');
            dom.flsthdra = addElement(dom.flsthdr,'div');
            dom.flsthdr.style.display='flex';
            dom.flsthdra.innerHTML='Furniture Owned';
            dom.flsthdra.style.position='relative';
            dom.flsthdra.style.left=120;
            dom.flsthdr.style.borderBottom='1px #44c solid';
            dom.flsthdr.style.padding=2; 
            dom.flsthdrbc = addElement(dom.flsthdr,'div');
            dom.flsthdrb = addElement(dom.flsthdrbc,'small');
            dom.flsthdrb.innerHTML='Home rating: '; 
            dom.flsthdrbc.style.left=237;
            dom.flsthdrb.style.paddingLeft=6;
            dom.flsthdrbc.style.position='relative';
            dom.flsthdrbc.style.borderLeft='1px solid rgb(68, 68, 204)';
            dom.flsthdrbb = addElement(dom.flsthdrbc,'small');
            dom.flsthdrbb.style.color='lime';
            
            let v = 0;
            for (let a in furn) {
                if(furn[a].v) {
                    if (furn[a].multv) {
                        v += furn[a].v * furn[a].amount;
                    }
                    else {
                        v += furn[a].v;
                    }
                }
            }
            dom.flsthdrbb.innerHTML=v;
            
            dom.ch_1h = addElement(dom.ch_1,'div',null); 
            dom.ch_1h.style.textAlign='left';
            dom.ch_1h.style.display='block'
            
            for(let a in furn) {
                renderFurniture(furn[a]);
            }      
        } break;
        
        case 3: {
            clr_chs();
            global.menuo=3;
            global.cchest = x;
            dom.ch_1a=addElement(dom.ctr_2,'div');
            dom.ch_1a.style.height='74.5%';
            dom.ch_1a.style.backgroundColor='rgb(0,20,44)';
            dom.ch_1a.style.display='flex';
            dom.ch_1a.style.overflow='auto';
            dom.ch_1a.style.position='relative';
            dom.invp1=addElement(dom.ch_1a,'div');
            dom.invp2=addElement(dom.ch_1a,'div'); 
            dom.invp1.style.width=dom.invp2.style.width='50%';
            dom.invp2noth=addElement(dom.ctr_2,'div');
            dom.invp2noth.style.top=150;
            dom.invp2noth.style.position='absolute';
            dom.invp2noth.style.color='grey';
            dom.invp2noth.innerHTML='Nothing in the box yet';
            dom.invp2noth.style.left=301;
            dom.invp2noth.style.pointerEvents='none';
            
            for(let obj in inv) {
                rendertrunkitem(dom.invp1,inv[obj]);
            }
            for(let obj in x.c) {
                rendertrunkitem(dom.invp2,x.c[obj].item,{right:true,nit:{item:x.c[obj].item,data:x.c[obj].data,amt:x.c[obj].amt,dp:x.c[obj].dp}});
            }
            if(x.c.length>0) {
                dom.invp2noth.style.display='none';
            }
            if(inv.length>=21) {
                dom.invp2noth.style.left=301;
            } else {
                dom.invp2noth.style.left=314;
            }
            
        } break;
        
        case 4: {
            clr_chs();
            
            global.menuo=4;
            global.shprf=x;
            dom.ch_1=addElement(dom.ctr_2,'div');
            dom.ch_1.style.height='76%';
            dom.ch_1.style.backgroundColor='rgb(0,20,44)';
            dom.flsthdr = addElement(dom.ch_1,'div');
            dom.flsthdr.innerHTML=x.name;
            dom.flsthdr.style.borderBottom='1px #44c solid';
            dom.flsthdr.style.padding=2;
            dom.ch_1h = addElement(dom.ch_1,'div'); 
            dom.ch_1h.style.textAlign='left';
            dom.ch_1h.style.display='block';
            dom.ch_1h.style.height='87%';
            dom.ch_1h.style.overflow='auto';
            
            if (dom.ch_etn) {
                empty(dom.ch_etn);
            }
            for (let it in x.stock) {
                rendershopitem(dom.ch_1h, x.stock[it], x);
            }
            
            dom.ch_1c = addElement(dom.ch_1,'div');
            dom.ch_1c.style.backgroundColor='rgb(10, 30, 54)';
            dom.ch_1c.style.height='5%';
            dom.ch_1c.style.width='100%';   
            
            dom.ch_1e = addElement(dom.ch_1c,'small');
            dom.ch_1e.style.float=dom.ch_1e.style.textAlign='left';
            //dom.ch_1e.style.border='1px solid #9485ed'; 

            //dom.ch_1e1 = addElement(dom.ch_1e,'input'); dom.ch_1e1.style.height=18;dom.ch_1e1.style.width=40;
            //dom.ch_1e1.style.textAlign='center'; dom.ch_1e1.style.color='white'; dom.ch_1e1.style.fontFamily='MS Gothic';
            //dom.ch_1e1.style.backgroundColor='transparent'
            
            dom.ch_2e = addElement(dom.ch_1c,'small');
            dom.ch_2e.style.float=dom.ch_2e.style.textAlign='right';
            dom.ch_2e.style.paddingRight=6;
            
            dom.ch_1e.innerHTML = '&nbspBuying price: <span style="color:lime">'+
                    Math.round(((you.mods.infsrate-skl.trad.use())*x.infl*(1-(Math.sqrt(x.data.rep)**1.3+0.05)*.01)*global.offline_evil_index)*10000)/100+'%</span>';
            dom.ch_2e.innerHTML = '&nbspReputation: ' + col(x.data.rep << 0, 'lime');
        } break;
        
        case 5:{  
        } break;
    }
    return dom.ch_1;
}     

function renderFurniture(frn){
    dom.ch_etn = addElement(dom.ch_1h,'div','bst_entrh','bst_entr'); dom.ch_etn.style.backgroundColor='rgb(10,30,54)';
    dom.ch_etn1 = addElement(dom.ch_etn,'div',null,'bst_entr1'); dom.ch_etn1.innerHTML=frn.name; 
    switch(frn.id){
        case home.bed.id:
        dom.ch_etn1.innerHTML+=' <small style="color:grey">[z]</small>'; break
        case home.pilw&&home.pilw.id:
        dom.ch_etn1.innerHTML+=' <small style="color:grey">[zp]</small>'; break
        case home.blkt&&home.blkt.id:
        dom.ch_etn1.innerHTML+=' <small style="color:grey">[zb]</small>'; break
        case home.tbw&&home.tbw.id:
        dom.ch_etn1.innerHTML+=' <small style="color:pink">[t]</small>'; break
    }
    dom.ch_etn.addEventListener('mouseenter',function(){
        if(frn.removable===true){
        dom.chsfdel = addElement(this.children[0],'div',null,'del_b'); dom.chsfdel.innerHTML='x'; dom.chsfdel.style.right=5; dom.chsfdel.style.top=19;
        dom.chsfdel.addEventListener('click',function(){
            frn.data.amount--; frn.onRemove();
            if(frn.data.amount===0) {deactivatef(frn);frn.onDestroy();global.dscr.style.display='none';furn.splice(furn.indexOf(frn),1);chs_spec(2);chs('"<= Return"',false).addEventListener('click',()=>{move_to_area(chss.home,false)})} else
            this.parentElement.parentElement.children[1].innerHTML='x'+frn.data.amount; 
            let v=0; for(let a in furn) if(furn[a].v){if(furn[a].multv) v+=furn[a].v*furn[a].amount; else v+=furn[a].v} dom.flsthdrbb.innerHTML=v;
        });
        }
    });
    dom.ch_etn.addEventListener('mouseleave',function(){
        if(frn.removable===true) this.children[0].removeChild(dom.chsfdel);
    });
    dom.ch_etn.addEventListener('click',function(){
        frn.onSelect(); //this.dispatchEvent(new window.Event('mouseenter'))
    });
    dom.ch_etn2 = addElement(dom.ch_etn,'div',null,'bst_entr2'); dom.ch_etn2.innerHTML='x'+frn.data.amount; dom.ch_etn2.style.width='6%';
    addDesc(dom.ch_etn,frn,9);
}

function recshop(){
    if(global.menuo===4){empty(dom.ch_1h);for(let it in global.shprf.stock){rendershopitem(dom.ch_1h,global.shprf.stock[it],global.shprf)}
    dom.ch_1e.innerHTML='&nbspBuying price: <span style="color:lime">'+Math.round(((you.mods.infsrate-skl.trad.use())*global.shprf.infl*(1-(Math.sqrt(global.shprf.data.rep)**1.3+0.05)*.01)*global.offline_evil_index)*10000)/100+'%</span>'
    dom.ch_2e.innerHTML='&nbspReputation: '+col(global.shprf.data.rep<<0,'lime')} 
}

function rendershopitem(root,itm,vnd){
    dom.ch_etn = addElement(root,'div','bst_entrh','bst_entr'); dom.ch_etn.style.backgroundColor='rgb(10,30,54)';
    addDesc(dom.ch_etn,itm[0]);
    dom.ch_etn1 = addElement(dom.ch_etn,'div',null,'bst_entr1'); dom.ch_etn1.style.width='79%'
    dom.ch_etn1n = addElement(dom.ch_etn1,'div'); dom.ch_etn1n.innerHTML=itm[0].name;  dom.ch_etn1n.style.width=305;
    dom.ch_etn1b = addElement(dom.ch_etn1,'div');dom.ch_etn1.style.display='flex'; dom.ch_etn1b.style.display='inline-flex';dom.ch_etn1b.style.position='absolute'; dom.ch_etn1b.style.right=6; dom.ch_etn1b.style.textAlign='center'; dom.ch_etn1b.style.backgroundColor='rgb(20,50,84)'
    let p = Math.ceil(itm[2]*(you.mods.infsrate-skl.trad.use())*vnd.infl*(1-(Math.sqrt(vnd.data.rep)**1.3+0.05)*.01)*global.offline_evil_index);
    switch (itm[0].stype){
        case 2: dom.ch_etn1n.style.color='rgb(255,192,5)';break;
        case 3: dom.ch_etn1n.style.color='rgb(0,235,255)';break;
        case 4: dom.ch_etn1n.style.color='rgb(44,255,44)';break;
    }
    dom.ch_etn2 = addElement(dom.ch_etn,'div',null,'bst_entr2'); dom.ch_etn2.style.display='flex'; dom.ch_etn2.style.width='22%'; dom.ch_etn2.style.textAlign='left'; if(you.wealth<p) {dom.ch_etn2.style.color='red'; dom.ch_etn.style.backgroundColor='rgb(68,26,38)'}
    dom.ch_etn2_1=addElement(dom.ch_etn2,'span'); dom.ch_etn2_1.style.width='33.3%'; 
    dom.ch_etn2_2=addElement(dom.ch_etn2,'span'); dom.ch_etn2_2.style.width='33.3%'; 
    dom.ch_etn2_3=addElement(dom.ch_etn2,'span'); dom.ch_etn2_3.style.width='33.3%'; 
    if(p>=GOLD) {dom.ch_etn2_1.innerHTML=(dom.coingold+((p/GOLD)<<0));dom.ch_etn2_1.style.backgroundColor='rgb(102, 66, 0)';}
    if(p>=SILVER&&p%GOLD>=SILVER) {dom.ch_etn2_2.innerHTML=(dom.coinsilver+((p/SILVER%SILVER)<<0));dom.ch_etn2_2.style.backgroundColor='rgb(56, 56, 56)';}
    if(p<SILVER||(p>SILVER&&p%SILVER>0)) {dom.ch_etn2_3.innerHTML=(dom.coincopper+((p%SILVER)<<0));dom.ch_etn2_3.style.backgroundColor='rgb(102, 38, 23)';}
    dom.ch_etn3 = addElement(dom.ch_etn,'div',null,'bst_entr3'); dom.ch_etn3.style.width='14%'; dom.ch_etn3.style.color='lime';
    dom.ch_etn3.innerHTML=itm[1];
    if(itm[1]===0) {dom.ch_etn3.innerHTML='<small>sold out</small>';dom.ch_etn1n.style.color='grey';dom.ch_etn2.style.color='grey';dom.ch_etn3.style.color='grey';}
    dom.ch_etn.addEventListener('mouseenter',function(){
        dom.ch_etn1b1 = addElement(this.children[0].children[1],'small',null,'ch_entbb'); dom.ch_etn1b1.innerHTML='1';
        dom.ch_etn1b2 = addElement(this.children[0].children[1],'small',null,'ch_entbb'); dom.ch_etn1b2.innerHTML='5';
        dom.ch_etn1b3 = addElement(this.children[0].children[1],'small',null,'ch_entbb'); dom.ch_etn1b3.innerHTML='10';
        dom.ch_etn1b4 = addElement(this.children[0].children[1],'small',null,'ch_entbb'); dom.ch_etn1b4.innerHTML='M';
        buycbs(itm,vnd)
        dom.ch_etn1b1.addEventListener('click',function(){ let el=this.parentElement.parentElement.parentElement; let p = Math.ceil(itm[2]*(you.mods.infsrate-skl.trad.use())*vnd.infl*(1-(Math.sqrt(vnd.data.rep)**1.3+0.05)*.01)*global.offline_evil_index);
        if(you.wealth>=p&&itm[1]>0){ itm[1]--; giveItem(itm[0]);spend(p);m_update(); giveSkExp(skl.gred,itm[2]*.05); giveSkExp(skl.trad,itm[2]**(1+itm[0].rar*.1)*.05)
            if(p>=GOLD) mf(-Math.ceil((p-GOLD)/GOLD),3); if(p>=SILVER) mf(-Math.ceil((p-SILVER)/SILVER%100),2); mf(-p%100,1); global.stat.buyt++;
            if(random()<.0008) {giveItem(acc.dticket);msg('Thank you for your patronage!','gold',null,null,'magenta')};  global.stat.shppnt+=p*.01; vnd.data.rep+=itm[2]*.0004*vnd.repsc;if(vnd.data.rep>100)vnd.data.rep=100
            if(itm[1]===0) {el.children[2].innerHTML='<small>sold out</small>';el.children[2].style.color=el.children[0].children[0].style.color=el.children[1].style.color='grey'} else el.children[2].innerHTML=itm[1];
        } buycbs(itm,vnd)
        });
        dom.ch_etn1b2.addEventListener('click',function(){ let el=this.parentElement.parentElement.parentElement; let p = Math.ceil(itm[2]*(you.mods.infsrate-skl.trad.use())*vnd.infl*(1-(Math.sqrt(vnd.data.rep)**1.3+0.05)*.01)*global.offline_evil_index);
        if(you.wealth>=p*5&&itm[1]>=5){ itm[1]-=5; giveItem(itm[0],5); spend(p*5);m_update(); giveSkExp(skl.gred,itm[2]*5*.05); giveSkExp(skl.trad,itm[2]**(1+itm[0].rar*.1)*.05*5)
            if(p*5>=GOLD) mf(-Math.ceil((p*5-GOLD)/GOLD),3); if(p*5>=SILVER) mf(-Math.ceil((p*5-SILVER)/SILVER%100),2); mf(-p*5%100,1); global.stat.buyt+=5;
            if(random()<.004) {giveItem(acc.dticket);msg('Thank you for your patronage!','gold',null,null,'magenta')}; global.stat.shppnt+=p*.01; vnd.data.rep+=itm[2]*(5*(1+.05))*.0004*vnd.repsc;if(vnd.data.rep>100)vnd.data.rep=100
            if(itm[1]===0) {el.children[2].innerHTML='<small>sold out</small>';el.children[2].style.color=el.children[0].children[0].style.color=el.children[1].style.color='grey'} else el.children[2].innerHTML=itm[1];
        } buycbs(itm,vnd)
        });
        dom.ch_etn1b3.addEventListener('click',function(){ let el=this.parentElement.parentElement.parentElement; let p = Math.ceil(itm[2]*(you.mods.infsrate-skl.trad.use())*vnd.infl*(1-(Math.sqrt(vnd.data.rep)**1.3+0.05)*.01)*global.offline_evil_index);
        if(you.wealth>=p*10&&itm[1]>=10){ itm[1]-=10; giveItem(itm[0],10); spend(p*10);m_update(); giveSkExp(skl.gred,itm[2]*10*.05); giveSkExp(skl.trad,itm[2]**(1+itm[0].rar*.1)*.05*10)
            if(p*10>=GOLD) mf(-Math.ceil((p*10-GOLD)/GOLD),3); if(p*10>=SILVER) mf(-Math.ceil((p*10-SILVER)/SILVER%100),2); mf(-p*10%100,1); global.stat.buyt+=10;
            if(random()<.008) {giveItem(acc.dticket);msg('Thank you for your patronage!','gold',null,null,'magenta')}; global.stat.shppnt+=p*.01; vnd.data.rep+=itm[2]*(10*(1+.1))*.0004*vnd.repsc;if(vnd.data.rep>100)vnd.data.rep=100
            if(itm[1]===0) {el.children[2].innerHTML='<small>sold out</small>';el.children[2].style.color=el.children[0].children[0].style.color=el.children[1].style.color='grey'}else el.children[2].innerHTML=itm[1];
        } buycbs(itm,vnd)
        });
        dom.ch_etn1b4.addEventListener('click',function(){ let el=this.parentElement.parentElement.parentElement; let p = Math.ceil(itm[2]*(you.mods.infsrate-skl.trad.use())*vnd.infl*(1-(Math.sqrt(vnd.data.rep)**1.3+0.05)*.01)*global.offline_evil_index); let max = (you.wealth/p)<<0; if(max>itm[1]) max=itm[1]; 
        if(you.wealth>=p&&itm[1]>0){ itm[1]-=max; giveItem(itm[0],max);spend(p*max);m_update(); giveSkExp(skl.gred,itm[2]*max*.05); giveSkExp(skl.trad,itm[2]**(1+itm[0].rar*.1)*.05*max)
            if(p*max>=GOLD) mf(-Math.ceil((p*max-GOLD)/GOLD),3); if(p*max>=SILVER) mf(-Math.ceil((p*max-SILVER)/SILVER%100),2); mf(-p*max%100,1); global.stat.buyt+=max;
            if(random()<.0008*max) {giveItem(acc.dticket);msg('Thank you for your patronage!','gold',null,null,'magenta')}; global.stat.shppnt+=p*.01; vnd.data.rep+=itm[2]*(max*(1+max*.01))*.0004*vnd.repsc;if(vnd.data.rep>100)vnd.data.rep=100
            if(itm[1]===0) {el.children[2].innerHTML='<small>sold out</small>';el.children[2].style.color=el.children[0].children[0].style.color=el.children[1].style.color='grey';} else el.children[2].innerHTML=itm[1];
        } buycbs(itm,vnd)
        });
    });
    dom.ch_etn.addEventListener('mouseleave',function(){
        empty(this.children[0].children[1]);
    });
    dom.ch_etn1n.addEventListener('click',function(){ let el=this.parentElement.parentElement; let p = Math.ceil(itm[2]*(you.mods.infsrate-skl.trad.use())*vnd.infl*(1-(Math.sqrt(vnd.data.rep)**1.3+0.05)*.01)*global.offline_evil_index); 
        if(you.wealth>=p&&itm[1]>0){ itm[1]--; giveItem(itm[0]); spend(p);m_update(); giveSkExp(skl.gred,itm[2]*.05); giveSkExp(skl.trad,itm[2]**(1+itm[0].rar*.1)*.05)
        if(p>=GOLD) mf(-Math.ceil((p-GOLD)/GOLD),3); if(p>=SILVER) mf(-Math.ceil((p-SILVER)/SILVER%100),2); mf(-p%100,1); global.stat.buyt++;
        if(random()<.0008) {giveItem(acc.dticket);msg('Thank you for your patronage!','gold',null,null,'magenta')};global.stat.shppnt+=p*.01; vnd.data.rep+=itm[2]*.0004*vnd.repsc;if(vnd.data.rep>100)vnd.data.rep=100
        if(itm[1]===0) {el.children[2].innerHTML='<small>sold out</small>';el.children[2].style.color=this.style.color=el.children[1].style.color='grey'} else el.children[2].innerHTML=itm[1];
        } buycbs(itm,vnd)
    });
}

function buycbs(itm,vnd){  let p = Math.ceil(itm[2]*(you.mods.infsrate-skl.trad.use())*vnd.infl*(1-(Math.sqrt(vnd.data.rep)**1.3+0.05)*.01)*global.offline_evil_index); 
    if(you.wealth<p||itm[1]<=0) dom.ch_etn1b1.style.color='grey';
    if(you.wealth<p*5||itm[1]<5) dom.ch_etn1b2.style.color='grey';
    if(you.wealth<p*10||itm[1]<10) dom.ch_etn1b3.style.color='grey';
    if(you.wealth<p||itm[1]<=0) dom.ch_etn1b4.style.color='grey';
    dom.ch_1e.innerHTML='&nbspBuying price: <span style="color:lime">'+Math.round(((you.mods.infsrate-skl.trad.use())*vnd.infl*(1-(Math.sqrt(vnd.data.rep)**1.3+0.05)*.01)*global.offline_evil_index)*10000)/100+'%</span>'
    dom.ch_2e.innerHTML='&nbspReputation: '+col(vnd.data.rep<<0,'lime');
    for(let i=0;i<vnd.stock.length;i++){if(you.wealth<Math.ceil(vnd.stock[i][2]*(you.mods.infsrate-skl.trad.use())*vnd.infl*(1-(Math.sqrt(vnd.data.rep)**1.3+0.05)*.01)*global.offline_evil_index)) {dom.ch_1h.children[i].children[1].style.color='red'; dom.ch_1h.children[i].style.backgroundColor='rgb(68,26,38)'}}
    for(let x in global.shptchk) global.shptchk[x]();//put it here for now
}

function rendertrunkitem(root,item,ni){if(!ni) {ni=new Object(); ni.right=false}; let trunk = global.cchest; 
    dom.invp1_con = addElement(root,'div',null,'trkitm'); ni.right===true?dom.invp1_con.style.borderLeft='1px rgb(204, 68, 68) solid':dom.invp1_con.style.borderRight='1px rgb(204, 68, 68) solid'; 
    if(ni.right===true){
        let c = copy(item); c.data=ni.nit.data; c.dp=ni.nit.dp; addDesc(dom.invp1_con, c);
    } else addDesc(dom.invp1_con, item);
    dom.invp1_s = addElement(dom.invp1_con,'small'); 
    dom.invp2_s = addElement(dom.invp1_con,'small');
    dom.invp1_s.style.marginLeft=ni.right?23:3;dom.invp1_s.innerHTML=item.name;
    dom.invp2_s.style.right=ni.right?3:20;dom.invp2_s.innerHTML=!item.slot?('x'+(ni.right===true?ni.nit.amt:item.amount)):'';
    dom.invp2_s.style.position='absolute';
    if(!!item.c||!!item.bc){
        if(!!item.c) dom.invp1_s.style.color=item.c;
        if(!!item.bc) dom.invp1_s.style.backgroundColor=item.bc;
    }  
    else{
        switch (item.stype){
        case 2: dom.invp1_s.style.color='rgb(255,192,5)';break;
        case 3: dom.invp1_s.style.color='rgb(0,235,255)';break;
        case 4: dom.invp1_s.style.color='rgb(44,255,44)';break;
        }
    }

    dom.invp1_con.addEventListener('mouseenter',function(){ 
        dom.invp1_op2 = addElement(this,'small',null,ni.right?'atrkmove2':'atrkmove'); 
        dom.invp1_op2.innerHTML=ni.right?'<<':'>>';
        dom.invp1_op2.addEventListener('mouseenter',function(){global.flags.rtcrutch=true});  //ugly hack
        dom.invp1_op2.addEventListener('mouseleave',function(){global.flags.rtcrutch=false}); //self to self: revisit later V:
        dom.invp1_op2.addEventListener('click',function(){ let scann = false; let titem;
        if(ni.right===false){
            for(let a in trunk.c) {if(trunk.c[a].item.id===item.id&&!item.slot) {scann=true; titem=trunk.c[a];break}}
            if(scann===false){
            let nit=addToContainer(trunk,item,item.amount); item.amount=0; titem=nit; 
            if (item.amount<=0||item.slot) {dom.invp1.removeChild(dom.invp1.children[inv.indexOf(item)]);removeItem(item,{fl:true})} else if(global.sm===1) updateInv(inv.indexOf(item)); else if(global.sm===item.stype) updateInv(global.sinv.indexOf(item));
            } else { 
            titem.amt+=item.amount; item.amount=0; 
            if (item.amount<=0) {dom.invp1.removeChild(dom.invp1.children[inv.indexOf(item)]);removeItem(item,{fl:true});} else if(global.sm===1) updateInv(inv.indexOf(item)); else if(global.sm===item.stype) updateInv(global.sinv.indexOf(item));
            }  if (titem.item.onTIn) titem.item.onTIn(trunk,titem); //  big stack moves into container
        } else {
            for(let a in inv) {if(inv[a].id===item.id&&!item.slot) {scann=true; titem=inv[a];break}}
            if(scann===false) { let fin; if(ni.nit.item.slot){for(let a in trunk.c){if(trunk.c[a].data.uid===ni.nit.data.uid){fin = trunk.c[a];break}}}else{for(let a in trunk.c){if(trunk.c[a].item.id===ni.nit.item.id){fin = trunk.c[a];break}}}
            let g = giveItem(ni.nit.item,ni.nit.amt,true,{fl:true});g.data=ni.nit.data;g.dp=ni.nit.dp; 
            dom.invp2.removeChild(dom.invp2.children[trunk.c.indexOf(fin)]); removeFromContainer(trunk,fin); rendertrunkitem(dom.invp1,g); 
            if(trunk.c.length===0) global.dscr.style.display='none'
            }
            else { 
            titem.amount+=ni.nit.amt; let fin; for(let a in trunk.c){if(trunk.c[a].item.id===ni.nit.item.id){fin = trunk.c[a];break}}
            dom.invp2.removeChild(dom.invp2.children[trunk.c.indexOf(fin)]); removeFromContainer(trunk,fin); if(trunk.c.length===0) global.dscr.style.display='none'
            if(global.sm===1) updateInv(inv.indexOf(item)); else if(global.sm===item.stype) updateInv(global.sinv.indexOf(item));
            } if (ni.nit.item.onTOut) ni.nit.item.onTOut(trunk,ni.nit); //  big stack moves out of container
        }iftrunkopen(); 
        });
    });
    dom.invp1_con.addEventListener('mouseleave',function(){
        empty(this.children[2]);this.removeChild(this.children[2]);
    });
    dom.invp1_con.addEventListener('click',function(){if(global.flags.rtcrutch===true) {this.children[0].click();return}else{ scann = false;  let titem;
        if(ni.right===false){
        for(let a in trunk.c) {if(trunk.c[a].item.id===item.id&&!item.slot) {scann=true; titem=trunk.c[a];break}}
        if(scann===false){
            let nit=addToContainer(trunk,item); item.amount--; titem=nit; 
            if (item.amount<=0) {dom.invp1.removeChild(dom.invp1.children[inv.indexOf(item)]);removeItem(item,{fl:true});} else if(global.sm===1) updateInv(inv.indexOf(item)); else if(global.sm===item.stype) updateInv(global.sinv.indexOf(item));
            
        } else {
            titem.amt++; item.amount--; 
            if (item.amount<=0||item.slot) {dom.invp1.removeChild(dom.invp1.children[inv.indexOf(item)]);removeItem(item,{fl:true})} else if(global.sm===1) updateInv(inv.indexOf(item)); else if(global.sm===item.stype) updateInv(global.sinv.indexOf(item));
        } if (titem.item.onTIn) titem.item.onTIn(trunk,titem); //  1 item moves into container
        } else {
            for(let a in inv) {if(inv[a].id===item.id&&!item.slot) {scann=true; titem=inv[a];break}}
            if(scann===false) { let fin; if(ni.nit.item.slot){for(let a in trunk.c){if(trunk.c[a].data.uid===ni.nit.data.uid){fin = trunk.c[a];break}}}else{for(let a in trunk.c){if(trunk.c[a].item.id===ni.nit.item.id){fin = trunk.c[a];break}}}
            let g = giveItem(ni.nit.item,1,true,{fl:true});g.data=ni.nit.data;g.dp=ni.nit.dp;rendertrunkitem(dom.invp1,g);if(--fin.amt<=0){ dom.invp2.removeChild(dom.invp2.children[trunk.c.indexOf(fin)]);removeFromContainer(trunk,fin)} if(trunk.c.length===0) global.dscr.style.display='none'
            }
        else {
            titem.amount++ ;  let fin; for(let a in trunk.c){if(trunk.c[a].item.id===ni.nit.item.id){fin = trunk.c[a];break}}
            if(--fin.amt<=0) {dom.invp2.removeChild(dom.invp2.children[trunk.c.indexOf(fin)]);removeFromContainer(trunk,fin)}if(trunk.c.length===0) global.dscr.style.display='none';
            if(global.sm===1) updateInv(inv.indexOf(item)); else if(global.sm===item.stype) updateInv(global.sinv.indexOf(item));
        } if (ni.nit.item.onTOut) ni.nit.item.onTOut(trunk,ni.nit); //  1 item moves out of container
        } iftrunkopen() }});
}

function updateTrunkItem(root, idx, item, amt){ 
    if(root.children[idx]) root.children[idx].children[1].innerHTML = item.slot?'':'x'+amt;
}

function updateTrunkLeftItem(item, kill) {
    if (global.menuo === 3) {
        for (let a in inv) {
            if ((inv[a].data.uid && inv[a].data.uid === item.data.uid) || (inv[a].id === item.id)) {
                if (kill) {
                    dom.invp1.removeChild(dom.invp1.children[inv.indexOf(inv[a])]);
                } else {
                    dom.invp1.children[inv.indexOf(inv[a])].children[1].innerHTML = item.slot ? '' : 'x' + item.amount;
                }
            }
        }
    }
}

function iftrunkopen(side){ 
    if(global.menuo===3) { let trunk = global.cchest;
        if(!side||side===1)for(let obj in inv)updateTrunkItem(dom.invp1,obj,inv[obj],inv[obj].amount);
        if(!side||side===2)for(let obj in trunk.c)updateTrunkItem(dom.invp2,obj,trunk.c[obj].item,trunk.c[obj].amt);
        if(trunk.length===0) dom.invp2noth.style.display=''; else dom.invp2noth.style.display='none'
    }
}

function iftrunkopenc(side){
  if(global.menuo===3) { let trunk = global.cchest;
      if(!side||side===1){empty(dom.invp1);for(let obj in inv)rendertrunkitem(dom.invp1,inv[obj]);}
      if(!side||side===2){empty(dom.invp2);for(let obj in trunk.c)rendertrunkitem(dom.invp2,trunk.c[obj].item,{right:true,nit:{item:trunk.c[obj].item,data:trunk.c[obj].data,amt:trunk.c[obj].amt,dp:trunk.c[obj].dp}});}
    if(trunk.length===0) dom.invp2noth.style.display=''; else dom.invp2noth.style.display='none'
  }
}

function addToContainer(cont, thing, amt, data){
    let it = thing;
    if(thing.slot) it=deepCopy(thing);
    let r = {
        item : it,
        amt : amt || 1,
        data : data || thing.data,
        dp : thing.slot ? thing.dp : 0
    };
    if (r.item.slot) r.data.uid =++ global.uid;
    cont.c.push(r);
    if(global.menuo == 3) rendertrunkitem(dom.invp2,r.item,{right:true,nit:{item:r.item,data:r.data,amt:r.amt,dp:r.dp}});
    return r;
}

function removeFromContainer(cont, item, find){
    if(find){for(let a in cont.c) if(cont.c.indexOf(cont.c[a])===cont.c.indexOf(item)){
        cont.c.splice(cont.c.indexOf(item),1)
    break}}
    else cont.c.splice(cont.c.indexOf(item),1);
}

function clr_chs(index){
    if(!index) empty(dom.ctr_2);
    else dom.ctr_2.removeChild(dom.ctr_2.children[index]);
}

function move_to_area(where, giveWalkingExp=true, verbose=false) {
    if (verbose===true) console.log(where)

    if (!where || typeof where !== 'object') {
        console.warn("move_to_area called with invalid chs:", where);
        return;
    }

    if (!Array.isArray(where.sector)) where.sector = [];

    global.flags.busy = false;
    global.flags.work = false;
    global.wdwidx = 0;

    if (typeof where.sl === 'function') where.sl();

    global.current_location = where;

    dom.d7m.update();
    if (typeof m_update === 'function') m_update();

    global.stat.move_to_areat++;

    if (where.sector.length > 0) {

        if (global.flags.loadstate) return;

        if (!global.flags.wkdis && giveWalkingExp) {
            global.flags.wkdis = true;
            giveSkExp(skl.walk, 0.25);
            setTimeout(() => { global.flags.wkdis = false; }, 500);
        }

        you.eqp[6].dp = Math.max(0, you.eqp[6].dp - 0.08);

        global.current_location.sector.forEach(current_sector => {
            const should_stay = where.sector.some(target_sector =>
                target_sector.group.includes(global.current_location.id) &&
                target_sector.id === current_sector.id
            );

            if (!should_stay) {
                if (typeof current_sector.onLeave === 'function') current_sector.onLeave();
                deactivateEffectors(current_sector.effectors);
                const index = sectors.indexOf(current_sector);
                if (index !== -1) sectors.splice(index, 1);
            }
        });

        if (typeof global.current_location.onLeave === 'function') global.current_location.onLeave();
        deactivateEffectors(global.current_location.effectors);

        global.flags.civil = true;
        global.flags.btl = false;

        global.current_z = zone.nwh;

        global.flags.inside = !!where.inside || where.sector.some(sec => sec.inside);

        activateEffectors(where.effectors || []);

        sectors.forEach(sector => {
            if (typeof sector.onMove === 'function') sector.onMove();
        });

        global.current_a.deactivate();
        global.current_a = act.default;
        dom.ct_bt3.style.backgroundColor = 'inherit';

        where.sector.forEach(sector => {
            if (!scanbyid(sectors, sector.id)) {
                sectors.push(sector);
                if (typeof sector.onEnter === 'function') sector.onEnter();
                activateEffectors(sector.effectors || []);
            }
        });

        if (typeof where.onEnter === 'function') where.onEnter();
        rfeff(where);

        if (!global.flags.btl) {
            global.current_m = creature.default;
            global.current_m.eff = [];
            empty(dom.d101m);
            dom.d5_1_1m.update();
            update_m();
        }

    } else {
        if (typeof where.onEnter === 'function') where.onEnter();
    }
}

function giveFurniture(frt, l, show) {
    let frn = l === true ? copy(frt) : frt;
    if (show !== false) {
        msg('Furniture Acquired: <span style="color:orange">"' + frt.name + '"</span>', 'yellow', frt, 9);
    }
    if (scanbyid(furn, frn.id)) {
        frn.data.amount++;
    } else {
        furn.push(frn);
        frn.data.amount++;
    }
    frn.onGive();
    if (global.wdwidx === 1) {
        empty(dom.ch_1h);
        for (let a in furn) {
            renderFurniture(furn[a]);
        }
    }
    let v = 0;
    for (let a in furn) {
        if (furn[a].v) {
            if (furn[a].multv) {
                v += furn[a].v * furn[a].amount;
            } else {
                v += furn[a].v;
            }
        }
    }
    if (dom.flsthdrbb) {
        dom.flsthdrbb.innerHTML = v;
    }
    return frn;
}

function activatef(f){
    if (!f.active) {
        f.activate();
        f.active=true;
    }
}

function deactivatef(f){
    if (f.active){
        f.deactivate();
        f.active=false;
    }
}

function Chs(op={}) {
    this.id;
    this.ttl;
    this.sl = function(){};
    this.data = {};
    this.onStay = function(){};
    this.onEnter = function(){};
    this.onLeave = function(){};
    this.onScout = function(){};
    this.sector = [];

    Object.assign(this, op);
}


function define_areas() {
    chss.intro = new Chs({
        id: 101,
        sl: () => {
            u_loc('Outside Dojo, Village');

            giveTitle(ttl.mountain_child, false);
            you.title = ttl.mountain_child;

            giveSkExp(skl.unc, 853, false); //give unarmed mastery
            giveSkExp(skl.fgt, 335, false);

            //giveItem(item.leather_wallet); // coinage

            dom.d_weather.style.display = 'none';
            dom.d_time.style.display    = 'none';

            appear(dom.ctr_1);
            appear(dom.ctr_1a);

            //I came down from a dojo in the mountains...


            chs("You've been walking for quite a while now. You've been searching for a long time, for that prophesized hero from that little village. <br> As per your teacher's guidance you're..."); 
            achs('"...Finally here..."', () => {
                appear(dom.d_weather, dom.d_weathert); // show weather

                chs("...where the road thins out and the trees grow closer on either side. A village comes into view. Or, at least, what's left of it. Blackened frames of wooden houses and caved-in roofs with the smell of smoke in the air.");
                achs('"What the hell happened here?"', () => {

                    appear(dom.location); // show location
                    chs("You speak to yourself outloud, as if to summon forth somebody whose remained silent - but nobody comes. <br> The main road through the village is empty, doors are boarded, business is not booming, flowers are not blooming.");
                    achs('"..."', () => {
                        empty(dom.mscont)  // clear message log
                        appear(dom.d0);    // show player menu
                        appear(dom.gmsgs); // show message log

                        chs("You didn't come all this way for nothing - you're not a quitter, and so you explore the dilapidated village.");
                        achs('"Okay..."', () => {
                            appear(dom.d1m);
                            appear(dom.d_time);
                            appear(dom.inv_ctx); // show inventory
                            appear(dom.ct_ctrl); // center-bottom clickables
                            
                            global.flags.aw_u  = true;
                            global.flags.dm1ap = true;
                            global.flags.asbu  = true;
                            global.flags.sklu  = true;
                            global.flags.actsu = true;
                            global.flags.jnlu  = true;

                            /*
                            dom.ct_bt6.innerHTML = 'journal';
                            dom.ct_bt1.innerHTML = 'assemble';
                            dom.ct_bt3.innerHTML = 'actions';
                            dom.ct_bt2.innerHTML = 'skills';
                            */

                            m_update();
                            
                            move_to_area(chss.intro_village_center);
                        });
                    });
                });
            });
        }
    });


    chss.intro_village_center = new Chs({
        id: 102,
        sl: () => {
            u_loc('Village Center');
            
            // change weather here
            chs('Dark clouds loom over. They appear to be a bad omen.')

            achs('=> Check the Message Board', ()=>{
                move_to_area(chss.intro_message_board, false);
            });

            achs('=> Enter Dojo', () => {
                msg('The entrance to the dojo is locked.', 'lightyellow');
                //@Todo more flavour? fiddle with the rusty lock.. walk into the dojo...
            });

            achs('=> Visit Marketplace', ()=>{
                move_to_area(chss.intro_marketplace); 
            });

            achs('=> Walk to Village Outskirts',  () => {
                move_to_area(chss.intro_village_outskirts);
            });
        }
    });


    chss.intro_message_board = new Chs({
      id: 103,
      sl: () => {
          u_loc('Village, Center Message Board');

          chs("An empty, dilapitated wooden board lies ahead. <br> There don't seem to be any postings.");

          achs('<= Leave', () => {
              move_to_area(chss.intro_village_center, false);
          })
      }
    })

    chss.intro_marketplace = new Chs({
        id: 104,
        sl: () => {
            u_loc('Village Center, Marketplace');
            chs("All of the stalls are closed up. No one seems to be around.")

            //@Idea put nervous guy here ? something for player to pick up, like an old doll from original p23

            achs('<= Return back to the Village Center', ()=>{
                    move_to_area(chss.intro_village_center);
            });
        }
    });


    chss.intro_village_outskirts = new Chs({
        id: 105,
        sl: () => {
            u_loc('Village Outskirts');

            chs('You see two gates that lead in the direction of the forest that surrounds the village. One of the gates has been barricarded off.');
            //@Todo need more dialogue / a reason for the guard not wanting you one way but letting you go another. player tells them the reason ?
            
            achs('=> Enter Western Woods', () => {
                //msg('I better watch myself in here.', 'lightyellow');
                //global.time += HOUR;
                move_to_area(chss.intro_western_woods1);
            });

            achs('<= Walk to Village Center', () => {
                move_to_area(chss.intro_village_center);
            });
        }
    });


    chss.intro_western_woods1 = new Chs({
        id: 106,
        sl: () => {
            u_loc('Western Woods, The Wooden Gate');
            chs('The woods are silent. You spot an old lodge. Walking up a little closer, you see a handwritten note posted to the front door.');

            achs("Read the handwritten note", () => {
                global.time += 5;
                move_to_area(chss.intro_western_woods_note);
            });

            achs("Go deeper into the woods =>", () => {
                global.time += HOUR;
                move_to_area(chss.intro_western_woods2);
            });

            if (global.flags.show_exit_from_intro_woods1) {
                achs("<= Return back to the village", () => {
                    msg('I need to keep moving. I need to find out more about that <i>legendary hero</i>.', 'lightyellow');
                    global.flags.show_exit_from_intro_woods1 = false;
                    move_to_area(chss.intro_western_woods1); // lets refresh that choice so that it disappears
                });
            }
        }
    });


    chss.intro_western_woods_note = new Chs({
        id: 107,
        sl: () => {
            // don't need to update location here
            chs('<div style="text-align:left;margin-left:4px;">"Gone up north for the time being. For any poor soul who\'s wandered out here\
                without the strength to confront what lurks beyond the whispers of the wind that pass by every tree branch,\
                steele yourself.</div><br>Be kind to the woods."<br><br><div style="text-align:right">一Head Hunter, Yamato</div>');

            achs('"Alrighty."', () => {
                move_to_area(chss.intro_western_woods1);
            });
        }
    });


    chss.intro_western_woods2 = new Chs({
        id: 108,
        sl: () => {
            u_loc('Deep Forest, Western Woods');
            chs('You feel the hairs on the back of your neck stand up as the wind that flows around the trees momentarily\
                circles around you. You brush that feeling off, but your footing stays rooted into the ground.');

            achs("Continue deeper into the woods =>", () => {
                move_to_area(chss.intro_western_woods3)
            });

            if (global.flags.show_exit_from_intro_woods2) {
                achs("<= Return back to the village", () => {
                    msg('I need to keep moving. I need to find out more about that <i>legendary hero</i>.', 'lightyellow');
                    global.flags.show_exit_from_intro_woods2 = false;
                    move_to_area(chss.intro_western_woods2);
                });
            }
        }
    });


    chss.intro_western_woods3 = new Chs({
        id: 109,
        sl: () => {
            u_loc('Deep Forest, Western Woods');
            chs('A furred creature swiftly approaches. You can barely follow its movements with your eyes. It gives off a sense of pressure that feels crushing. You can barely move.');
            achs("Stand and fight", () => {
                move_to_area(chss.intro_western_woods_btl);
            });

            if (global.flags.show_exit_from_intro_woods3) {
                achs("<= Flee from the beast", () => {
                    msg('It feels like running would be useless...', 'lightyellow');
                    global.flags.show_exit_from_intro_woods3 = false;
                    move_to_area(chss.intro_western_woods3);
                })
            } 
        }
    });


    chss.intro_western_woods_btl = new Chs({
        id: 110,
        sl: () => {
            zone_init(zone.intro_woods);
        }
    });


    chss.shack = new Chs({
        id: 111,
        sl: () => {
            global.flags.inside = true;
            if (global.flags.know_training_grounds) {
                u_loc('Shack, Training Grounds');
            } else {
                u_loc('Shack, ???');
            }

            chs('You\'re in a small wooden shack. There\'s a bed here, a kitchenette, and a desk. So very humble.');

            achs('<= Go outside', () => {
                if (!global.flags.know_training_grounds) global.flags.know_training_grounds = true;
                move_to_area(chss.training_grounds);
            });
        }
    });
    add_to_sector(sector.home, chss.shack)


    chss.shack_bed = new Chs({
        id: 112,
        sl: () => {
            global.flags.inside = true;
            u_loc('Bed, Shack');
            if (you.alive === false) {
                chs('You sink deeply into unconsciousness...');
                //chs(select(['You lost consciousness...','You have been knocked out...','You passed out...']));
                you.alive = true;
            } else {
                chs('You attempt to take a quick nap to sleep meditation however, you\'re not tired enough to get some quality sleep.');
                //you fear the dangers of oversleeping
            }

            achs('<= Get up', () => {
                move_to_area(chss.shack);
            })
        },
        onStay: function () {
            let hpr = (skl.sleep.use(home.bed)+(global.flags.catget ? 5 : 1)+1) << 0;
            if (!effect.fei1.active && you.hp < you.hpmax) {
                you.hp + hpr <= you.hpmax ? you.hp += hpr : you.hp = you.hpmax;
                dom.d5_1_1.update();
            }
        },
        onEnter: function () {
            global.flags.sleepmode = true;
            if (effect.slep.active === false) giveEff(you,effect.slep);
            global.timescale = you.timescale_sleeping;
        },
        onLeave: function () {
            global.flags.sleepmode = false;
            global.timescale = 1;
            removeEff(effect.slep); 
        }
    });
    add_to_sector(sector.home, chss.shack_bed)
    

    chss.forestn1main = new Chs();
    chss.forestn1main.id = 113;
    chss.forestn1main.sl = () => {
        global.flags.inside=false;
        u_loc('Western Woods, The Wooden Gate');

        chs('You\'re out in the forest. You can hunt here',true);

        chs('"=> Enter the Hunter\'s lodge"',false).addEventListener('click',()=>{
          move_to_area(chss.forestn1b1);
        });

        chs('"=> Delve inside the forest"',false).addEventListener('click',()=>{
          move_to_area(chss.forestn1a1);
        });

        if(global.flags.forestn1a3u) chs('"=> Hunt indefinitely"',false).addEventListener('click',()=>{
          move_to_area(chss.forestn1a3);
        });
        
        chs('"<= Return back"',false).addEventListener('click',()=>{
          move_to_area(chss.village_center);
        });
    }


    chss.home = new Chs();
    chss.home.id = 111;
    add_to_sector(sector.home,chss.home); 
    chss.home.sl = () => {
        u_loc('Your Home');

        if (!global.flags.catget || sector.home.data.smkp > 0) {
            chs('Your humble abode. You can rest here. ', true);
        } else {
            if (!global.text.hmcttt) {
                global.text.hmcttt = ['Your cat comes out to greet you!', '', 'You hear rustling', 'Meow'];
            }
            chs('You feel safe. You can rest here. ' + select(global.text.hmcttt), true);
        }

        if (!global.flags.hbgget) {
            chs('"Examine your bag"', false).addEventListener('click', () => {
                chs('Something you\'ve forgotten to grab before. There\'s a pack of food and some junk idea paper.', true)
                chs('Better take this with you', false).addEventListener('click', () => {
                    global.flags.hbgget = true;
                    giveItem(eqp.bnd);
                    giveItem(item.ip1);
                    giveItem(item.watr, 10);
                    giveItem(wpn.wsrd1);
                    giveItem(item.eggn, 3);
                    giveItem(item.mlkn, 2);
                    giveItem(item.rice, 5);
                    giveItem(item.brd, 50);
                    move_to_area(chss.home, false);
                });
            });
        }

        achs('"Crash down and take a nap"', () => {
            if (sector.home.data.smkp > 0) {
                msg('This isn\'t time for sleep', 'red');
                return;
            }
            move_to_area(chss.home_bed, false);
        });

        if (!global.flags.chbdfst) chs('"Examine your hidden stash"', false).addEventListener('click', () => {
            chs('You reach for a small red box which you keep your valuables in, it is time to take it out', true)
            chs('Grab the contents', false).addEventListener('click', () => {
                giveItem(item.ywlt);
                giveItem(item.pdeedhs);
                global.flags.chbdfst = true;
                move_to_area(chss.home, false);
            });
        });

        chs(global.flags.hbs1 === true ? '"Enter the basement"' : '"Examine basement door"', false).addEventListener('click', () => {
            if (!global.flags.hbs1) {
                if (item.key0.have) {
                    msg('*click...*', 'lightgrey');
                    msg_add('The door has opened', 'lime');
                    global.flags.hbs1 = true;
                    move_to_area(chss.home, false)
                } else msg("It's locked");
            } else move_to_area(chss.bsmnthm1, false)
        });

        if (global.flags.hsedchk) chs(' "Furniture list"', false, 'orange', '', 1, 8).addEventListener('click', () => {
            chs_spec(2);
            global.wdwidx = 1;
            chs('"<= Return"', false).addEventListener('click', () => {
                move_to_area(chss.home, false);
            });
        });

        if (scanbyid(furn, furniture.frplc.id)) {
            chs('"Examine Fireplace"', false).addEventListener('click', () => {
                move_to_area(chss.ofrplc, false);
            });
        }

        if (scanbyid(furn, furniture.strgbx.id)) {
            chs('"Access Storagebox"', false).addEventListener('click', () => {
                move_to_area(chss.sboxhm, false);
            });
        }

        if (global.flags.catget) {
            tcat = findbyid(furn, furniture.cat.id);
            tcat.data.mood = tcat.data.mood || 1;
            chs('"Check on Cat"', false).addEventListener('click', () => {
                if (sector.home.data.smkp > 0) {
                    msg('Your cat went outside', 'yellow');
                    return
                }
                chs_spec(1);
                if (tcat.data.named === false) chs('"Rename"', false).addEventListener('click', () => {
                    chs('Give your cat a name!<br><small>(can\'t rename later!)</small>', true);
                    let inp = addElement(dom.ctr_2, 'input', 'chs');
                    inp.style.textAlign = 'center';
                    inp.style.color = 'white';
                    inp.style.fontFamily = 'MS Gothic';

                    chs('"Accept"', false, 'lime').addEventListener('click', () => {
                        if (inp.value == '' || inp.value.search(/ *$/) === 0) msg('Actually give it a name, maybe?', 'springgreen');
                        else if (inp.value.search(/[Kk][Ii][Rr][Ii]/) === 0) {
                            msg('Hey now! o:<', 'crimson');
                            dom.gmsgs.children[1].lastChild.style.fontSize = '2em'
                        } else {
                            tcat.data.name = inp.value;
                            tcat.data.named = true;
                        }
                        move_to_area(chss.home, false);
                    });

                    chs('"Decline"', false, 'red').addEventListener('click', () => {
                        move_to_area(chss.home, false);
                    });
                });

                dom.ctspcl = chs('"Pet ' + tcat.data.name + '"', false);
                dom.ctspcl.addEventListener('click', x => {
                    let a = addElement(document.body, 'span');
                    global.stat.cat_c++;
                    for (let x in global.cptchk) global.cptchk[x]();

                    a.style.pointerEvents = 'none';
                    a.style.position = 'absolute';
                    a.style.color = 'lime';
                    a.innerHTML = tcat.data.mood > .2 ? select([':3', '\'w\'', '\'ω\'', '(=・∀・=)', '*ﾟヮﾟ']) : select(['¦3', 'ーωー', '( ˘ω˘)', '(´-ω-`)', '(。-∀-)']);
                    a.style.top = -55;
                    a.style.left = -55;
                    a.style.fontSize = '1.25em';
                    a.style.textShadow = '2px 2px 1px blue';

                    a.posx = x.clientX - 20;
                    a.posy = x.clientY - 20;
                    a.spos = randf(-1, 1);
                    let t = 0;
                    let g = setInterval(() => {
                        t++;
                        a.style.top = a.posy - 2 * t;
                        a.style.left = a.posx + Math.sin(t / 5 + a.spos) * 15;
                        a.style.opacity = (110 - t) / 110;
                        if (t === 110) {
                            clearInterval(g);
                            document.body.removeChild(a);
                        }
                    }, 20);

                    tcat.data.mood = tcat.data.mood - .01 <= 0 ? 0 : tcat.data.mood - .01;
                    if (tcat.data.mood >= 0.01) skl.pet.use();
                });

                chs('"<= Return"', false).addEventListener('click', () => {
                    move_to_area(chss.home, false);
                    clearInterval(timers.upd_cat);
                });
            });
        }

        achs('<= Leave the shack', () => {
            move_to_area(chss.rock_path);
        });
    };

    chss.home.data={scoutm:1200,scout:0,scoutf:false,gets:[false,false],gotmod:0}
    chss.home.scout=[
      {c:.006,f:()=>{msg('Oh, you forgot you had this around','orange');giveItem(wpn.kiknif); chss.home.data.gets[0]=true;},exp:30},
      {c:.01,f:()=>{msg('There was a coin stuck between the floor boards','orange');giveItem(item.lcn); chss.home.data.gets[1]=true;},exp:3},
    ]
    chss.home.onScout=function(){scoutGeneric(this)}


    chss.village_center = new Chs();
    chss.village_center.id = 106;
    add_to_sector(sector.vcent,chss.village_center);
    add_to_sector(sector.vmain1,chss.village_center)
    chss.village_center.sl = () => {
        global.flags.inside = false;
        u_loc('Village Center');

        // chs('Dark clouds loom over. They appear to be a bad omen.');
        
        if (isWeather(weather.sunny) || isWeather(weather.clear)) {
            chs('The surroundings are flourishing with energy.');
        }
        else if (isWeather(weather.cloudy) || isWeather(weather.overcast) || isWeather(weather.stormy)) {
            chs('You have a feeling it might rain soon.');
        }
        else if (isWeather(weather.storm) || isWeather(weather.rain)||isWeather(weather.drizzle)) {
            chs('The rain feels surprisingly refreshing.');
        }
        else if (isWeather(weather.heavyrain) || isWeather(weather.thunder)) {
            chs('It\'s pouring so hard the streets are completely flooded. There\'s no one around '+(getHour()>6&&getHour()<21?'except for a few kids.':''));
        }
        else if (isWeather(weather.misty) || isWeather(weather.foggy)) {
            chs('Can\'t see a meter in front of you with all this fog.');
        }
        
        achs('=> Check the Message Board', ()=>{
            move_to_area(chss.message_board,false);
        });

        if (!global.flags.unl_dojo) {
            achs('=> Enter Dojo', () => {
                move_to_area(chss.t3);
            });
        } else {
            achs('=> Enter Dojo', () => {
                msg('The entrance to the dojo is locked.', 'lightyellow');
            });
        }

        achs('=> Walk to Village Outskirts',  () => {
            move_to_area(chss.village_outskirts);
        });
        
        if (global.flags.mkplc1u === true) {
            achs('=> Visit Marketplace', ()=>{
                move_to_area(chss.marketplace); 
            });
        }

        if (global.flags.unl_house) {
            achs('=> Go home', ()=>{
                move_to_area(chss.home);
            }, 'green');
        }

        if (global.flags.unl_rockpath) {
            achs('<= Walk down Rock Path', () => {
                move_to_area(chss.rock_path);
            });
        }

        if(!global.flags.mkplc1u){
            if(global.flags.dj1end === true && global.flags.pmfspmkm1!==true&&random()<.4){
            chs('Paper Boy: Hey, this is for you!');
            achs('?', () => {
                giveItem(item.shppmf);
                move_to_area(chss.village_center,false);
            });
            }
        }
    }


    chss.village_outskirts = new Chs();
    chss.village_outskirts.id = 707;
    chss.village_outskirts.sl = () => {
        u_loc('Village Outskirts');

        chs('There is a guard posted at the gate. He gives you a shifty look.');
        
        achs('=> Enter Southern Forest', () => {
            if(!global.flags.forest1u && !global.flags.start_mountain) {
                msg('Gate Guard: "Nothing for you to do there. Scram!"','yellow');
            } else if (!global.flags.start_mountain) {
                if (!global.flags.forest1um) {
                    msg('Gate Guard: "You were given permission to proceed. Go on"','yellow');
                    global.flags.forest1um = true;
                }
                move_to_area(chss.forestn3main);
            } else if (global.flags.start_mountain) {
                console.log('placeholder');
                //msg('...', 'lightyellow');
            }
        });
        
        achs('=> Enter Western Woods', ()=>{
            move_to_area(chss.forestn1main);
        });

        achs('<= Walk to Village Center', () => {
            move_to_area(chss.village_center);
        });
    };


    chss.tdf = new Chs();
    chss.tdf.id = 102;
    chss.tdf.sl = function() {
        global.flags.inside=true;
        clr_chs();
        if (!global.flags.dmap) {
            appear(dom.gmsgs);
            global.flags.dmap=true;
        }
        chs('"Select the difficulty"',true);
        if (!global.flags.tr1_win) chs('"Easiest"',false).addEventListener('click',function(){
            chs('"You are fighting training dummies"',true);
            if(!global.flags.dm1ap){appear(dom.d1m);global.flags.dm1ap=true}; 
            zone_init(zone.trn1);
        });
        if(!global.flags.tr2_win) chs('"Easy"',false).addEventListener('click',function(){
            chs('"You are fighting training dummies"',true);
            if(!global.flags.dm1ap){appear(dom.d1m);global.flags.dm1ap=true}
            zone_init(zone.trn2); 
        });
        if(!global.flags.tr3_win) chs('"Normal"',false).addEventListener('click',function(){
            chs('"You are fighting training dummies"',true);
            if(!global.flags.dm1ap){appear(dom.d1m);global.flags.dm1ap=true};
            zone_init(zone.trn3); 
        });
    }
    chss.tdf.onEnter = function() {
        zone_init(zone.nwh); 
    }

    chss.t2 = new Chs();
    chss.t2.id = 103;
    chss.t2.sl = function() {
        global.flags.inside = true;
        chs('Instructor: "'+select(['Good','Nice','Great','Excellent'])+' '+select(['job','work'])+' kid! Here\'s the reward for completing the course"',true,'lime');
        chs('"->"',false).addEventListener('click',function(){
            if (global.flags.tr1_win === true && !global.flags.rwd1) {
                global.flags.rwd1=true;
                giveItem(item.appl,4);
                giveItem(item.hrb1,5);
                move_to_area(chss.tdf);
            }
            else if (global.flags.tr2_win===true&&!global.flags.rwd2){global.flags.rwd2=true;giveItem(item.brd,2);giveItem(item.hrb1,5);giveItem(eqp.sndl);move_to_area(chss.tdf);}
            else if (global.flags.tr3_win===true&&!global.flags.rwd3){global.flags.rwd3=true;let itm = giveItem(eqp.vst);itm.dp*=.7;if(global.flags.m_un===true)giveItem(item.cp,10);}
            if (!global.flags.tr3_win||!global.flags.tr2_win||!global.flags.tr1_win) move_to_area(chss.tdf); else {;move_to_area(chss.t3);giveTitle(ttl.inn);}
        });
    }

    chss.t3 = new Chs();
    chss.t3.id = 104;
    chss.t3.sl=()=>{global.flags.inside=true; u_loc('Dojo, lobby'); global.flags.inside=true;
      if(global.flags.nbtfail){
        chs('Instructor: "You got beaten up by fan inanimated dummy?! Pay attention to your condition!"',true);
        chs('"..."',false).addEventListener('click',()=>{
          global.flags.nbtfail=false;  clr_chs();
          move_to_area(chss.tdf,false); giveItem(item.hrb1,4);
        });
      }
      else { 
        if(!global.flags.dj1end){chs('Instructor: "Your training is over for today, you did well. As a reward, select one of these skill manuals to practice. The better your understanding, the stronger you will be in battle"',true);
          chs('"Practitioner Skillbook (Swords)"',false).addEventListener('click',()=>{giveItem(item.skl1);global.flags.dj1end=true; move_to_area(chss.village_center);});
          chs('"Practitioner Skillbook (Knives)"',false).addEventListener('click',()=>{giveItem(item.skl2);global.flags.dj1end=true; move_to_area(chss.village_center);});
          chs('"Practitioner Skillbook (Axes)"',false).addEventListener('click',()=>{giveItem(item.skl3);global.flags.dj1end=true; move_to_area(chss.village_center);});
          chs('"Practitioner Skillbook (Spears)"',false).addEventListener('click',()=>{giveItem(item.skl4);global.flags.dj1end=true; move_to_area(chss.village_center);});
          chs('"Practitioner Skillbook (Hammers)"',false).addEventListener('click',()=>{giveItem(item.skl5);global.flags.dj1end=true; move_to_area(chss.village_center);});
          chs('"Practitioner Skillbook (Martial)"',false).addEventListener('click',()=>{giveItem(item.skl6);global.flags.dj1end=true; move_to_area(chss.village_center);});
        }
        else if(global.flags.trnex1===true&&!global.flags.trnex2){
          chs('Instructor: "Hahahhha! What a great disciple! That\'s not the dedication most of the other disciples have! Take this, it\'ll help you in your future endeavours"',true,'yellow');
          chs('"Thanks teacher!"',false).addEventListener('click',()=>{
            giveItem(acc.sun_charm); move_to_area(chss.village_center); global.flags.trnex2=true;
          });
        }
        else{ chs(select(['Instructor: "Back already?"','You notice other dojo disciples diligently train','Pieces of broken training dummies are scattered on the floor']),true);
        chs('"Dojo infoboard"',false).addEventListener('click',()=>{
          move_to_area(chss.djinf,false); 
        });
        chs('"Destroy more dummies"',false).addEventListener('click',()=>{
          move_to_area(chss.return1,false); 
        });
        if(global.flags.dj1end===true&&you.lvl>=10&&!global.flags.trne1e1) chs('"Challenge a stronger opponent"',false).addEventListener('click',()=>{
          chs('"You are facing a golem"',true);
          zone_init(zone.trne1); 
          chs('"<= Escape"',false).addEventListener('click',()=>{
            move_to_area(chss.t3,false);
          });
        });
        if(global.flags.trne1e1&&!global.flags.trne2e1) chs('"Challenge an even stronger opponent"',false,'cornflowerblue').addEventListener('click',()=>{
          chs('"You are facing a golem"',true);
          zone_init(zone.trne2); 
          chs('"<= Escape"',false).addEventListener('click',()=>{
            move_to_area(chss.t3,false);
          });
        });
        if(global.flags.trne2e1&&!global.flags.trne3e1) chs('"Challenge a dangerous opponent"',false,'crimson').addEventListener('click',()=>{
          chs('"You are facing a golem"',true);
          zone_init(zone.trne3); 
          chs('"<= Escape"',false).addEventListener('click',()=>{
            move_to_area(chss.t3,false);
          });
        });
        if(global.flags.trne3e1&&!global.flags.trne4e1) chs('"Challenge a powerful opponent"',false,'red').addEventListener('click',()=>{
          chs('"You are facing a golem"',true);
          zone_init(zone.trne4); 
          chs('"<= Escape"',false).addEventListener('click',()=>{
            move_to_area(chss.t3,false);
          });
        });
        if(global.flags.dj1end) chs('"Turn in dojo gear"',false).addEventListener('click',()=>{
          chs('Instructor: "You can return whatever you punched off of dummies and get coin for it, it\'s dojo\'s equipment after all. Or you can keep and use for it yourself, the choice is yours"',true);
          chs('"Return the rags"',false).addEventListener('click',()=>{
            let dlr=0; stash=[]; verify=true; 
            for(let a in inv) {if (inv[a].id===wpn.knf1.id&&you.eqp[0].data.uid!==inv[a].data.uid) {stash.push(inv[a]); dlr+=1}}
            for(let a in inv) {if (inv[a].id===wpn.wsrd2.id&&you.eqp[0].data.uid!==inv[a].data.uid) {stash.push(inv[a]); dlr+=3}}
            for(let a in inv) {if (inv[a].id===eqp.brc.id) {verify=true; for(let b in you.eqp) if(you.eqp[b].data.uid===inv[a].data.uid) verify=false;if(verify===true){stash.push(inv[a]); dlr+=1}}}
            for(let a in inv) {if (inv[a].id===eqp.vst.id) {verify=true; for(let b in you.eqp) if(you.eqp[b].data.uid===inv[a].data.uid) verify=false;if(verify===true){stash.push(inv[a]); dlr+=1}}}    
            for(let a in inv) {if (inv[a].id===eqp.pnt.id) {verify=true; for(let b in you.eqp) if(you.eqp[b].data.uid===inv[a].data.uid) verify=false;if(verify===true){stash.push(inv[a]); dlr+=1}}}
            for(let a in inv) {if (inv[a].id===eqp.bnd.id) {verify=true; for(let b in you.eqp) if(you.eqp[b].data.uid===inv[a].data.uid) verify=false;if(verify===true){stash.push(inv[a]); dlr+=1}}}
            if(dlr===0) chs('Instructor: "There\'s nothing I can take from you"',true); else{
              chs('Instructor: "For all your stuff I can fetch you '+dlr+' '+(dom.coincopper)+' copper. How does that sound?"',true);
              chs('"Accept"',false,'lime').addEventListener('click',()=>{ 
                msg(stash.length+" Items returned back to dojo",'ghostwhite'); global.stat.ivtntdj+=stash.length;giveWealth(dlr); for(let a in stash) removeItem(stash[a]); if(global.stat.ivtntdj>=300)giveTitle(ttl.tqtm); move_to_area(chss.t3,false);
              });
            }
            chs('"<= Go back"',false).addEventListener('click',()=>{
              move_to_area(chss.t3,false);
            });
          });
          chs('"<= Go back"',false).addEventListener('click',()=>{
            move_to_area(chss.t3,false);
          });
        });
        if(global.flags.djmlet&&getDay(1)=='Sunday'){chs('"Grab a serving of free food"',false,'lime').addEventListener('click',()=>{
          if(getDay(1)=='Sunday'){
          msg(select(['*Chow*','*Munch*','*Crunch*','*Gulp*']),'lime'); msg(select(['That was good!','Delicious!','A little dry but, that will do','Tasty!','Phew, I needed that!']),'lime');
          you.sat=you.satmax; giveSkExp(skl.glt,42); dom.d5_3_1.update();global.flags.djmlet=false;move_to_area(chss.t3,false);return}else{
          msg('Too late for that','yellow');global.flags.djmlet=false;move_to_area(chss.t3,false);return} 
        });}
        if(global.flags.dj1end===true) chs('"Level Advancement"',false,'orange').addEventListener('click',()=>{
          chs('Instructor: "If you put effort into training you will get rewards as long as you are still a disciple of this hall. After every 5 levels you reach, come here and recieve your share! You might get something really useful if you continue to improve your skills"',true);
          if(!global.flags.dj1rw1&&you.lvl>=5){
            chs('"Level 5 reward"',false).addEventListener('click',()=>{
              chs('Instructor: "This is a good start, congratulations! Keep working hard!"',true);
              chs('"Accept"',false,'lime').addEventListener('click',()=>{
                global.flags.dj1rw1=true; giveWealth(25); giveItem(item.sp1,5); move_to_area(chss.t3,false);
              });
            });
          }
          if(!global.flags.dj1rw2&&global.flags.dj1rw1===true&&you.lvl>=10){
            chs('"Level 10 reward"',false,'royalblue').addEventListener('click',()=>{
              chs('Instructor: "You seem to not neglect your training, good job! Keep working hard!"',true);
              chs('"Accept"',false,'lime').addEventListener('click',()=>{
                global.flags.dj1rw2=true; giveWealth(100); giveItem(item.sp2,2); move_to_area(chss.t3,false);
              });
            });
          }
          if(!global.flags.dj1rw3&&global.flags.dj1rw2===true&&you.lvl>=15){
            chs('"Level 15 reward"',false,'lime').addEventListener('click',()=>{
              chs('Instructor: "You\'re slowly growing into a fine young warrior! Keep working hard!"',true);
              chs('"Accept"',false,'lime').addEventListener('click',()=>{
                global.flags.dj1rw3=true; giveWealth(200); giveItem(item.sp3,1); giveItem(eqp.tnc); giveItem(item.lifedr); giveItem(eqp.knkls); giveItem(eqp.knkls); move_to_area(chss.t3,false);
              });
            });
          }
          if(!global.flags.dj1rw4&&global.flags.dj1rw3===true&&you.lvl>=20){
            chs('"Level 20 reward"',false,'gold').addEventListener('click',()=>{
              chs('Instructor: "Time to start getting serious! Keep working hard!"',true);
              chs('"Accept"',false,'lime').addEventListener('click',()=>{
                global.flags.dj1rw4=true; giveWealth(300); giveItem(wpn.tkmts); move_to_area(chss.t3,false);
              });
            });
          }
          if(!global.flags.dj1rw5&&global.flags.dj1rw4===true&&you.lvl>=25){
            chs('"Level 25 reward"',false,'orange').addEventListener('click',()=>{
              chs('Instructor: "You\'re almost ready to face real dangers of the outside world! Keep working hard!"',true);
              chs('"Accept"',false,'lime').addEventListener('click',()=>{
                global.flags.dj1rw5=true; giveWealth(350); giveItem(acc.moon_charm) ;move_to_area(chss.t3,false);
              });
            });
          }
          if(!global.flags.dj1rw6&&global.flags.dj1rw5===true&&you.lvl>=30){
            chs('"Level 30 reward"',false,'crimson').addEventListener('click',()=>{
              chs('Instructor: "You are almost as strong as an average adult! Good job kid and Keep working hard! Maybe you can defend this village one day"',true);
              chs('"Accept"',false,'lime').addEventListener('click',()=>{
                global.flags.dj1rw6=true; giveWealth(400); giveItem(item.stthbm1);giveItem(item.stthbm4);giveItem(item.stthbm3);giveItem(item.stthbm2);move_to_area(chss.t3,false);
              });
            });
          }
          chs('"<= Return"',false).addEventListener('click',()=>{
            move_to_area(chss.t3,false);
          });
        });
        if(item.htrdvr.have) chs('"Deliver the crate"',false,'lightblue').addEventListener('click',()=>{
          chs('Instructor: "Yamato sent something? Great timing on that, we were getting very close to running out already. This will be turned into rations for you lads, you better don\'t forget to thank our hunters properly next time you see them, as they work hard to bring food to people\'s tables. Here, small compensation for your timely delivery"',true);
          chs('"Accept"',false,'lime').addEventListener('click',()=>{
            chs('Instructor: "Hold it, that\'s not all, catch this as well, i believe it is yours. You won\'t be as lucky next time and lose your possessions for good if you leave them around again, pay better attention to where your stuff is"',true);
            chs('"Accept x2"',false,'lime').addEventListener('click',()=>{
              giveWealth(50); giveItem(item.key0); removeItem(item.htrdvr);move_to_area(chss.t3,false); 
            });
          });
        });
        chs('"<= Go outside"',false).addEventListener('click',()=>{
          move_to_area(chss.village_center);
        });
        if(global.flags.trne4e1&&!global.flags.trne4e1b){     
          chs('Instructor: "Once again, choose the skillbook of specialization you are interested in. Doesn\'t mean you have to stick with it to the bitter end, but it will help you train"',true);
          chs('"Bladesman Manual"',false).addEventListener('click',()=>{giveItem(item.skl1a);global.flags.trne4e1b=true; move_to_area(chss.village_center);});
          chs('"Assassin Manual"',false).addEventListener('click',()=>{giveItem(item.skl2a);global.flags.trne4e1b=true; move_to_area(chss.village_center);});
          chs('"Axeman Manual"',false).addEventListener('click',()=>{giveItem(item.skl3a);global.flags.trne4e1b=true; move_to_area(chss.village_center);});
          chs('"Lancer Manual"',false).addEventListener('click',()=>{giveItem(item.skl4a);global.flags.trne4e1b=true; move_to_area(chss.village_center);});
          chs('"Clubber Manual"',false).addEventListener('click',()=>{giveItem(item.skl5a);global.flags.trne4e1b=true; move_to_area(chss.village_center);});
          chs('"Brawler Manual"',false).addEventListener('click',()=>{giveItem(item.skl6a);global.flags.trne4e1b=true; move_to_area(chss.village_center);});}
        }
      }
    }
    chss.t3.onEnter=function(){
      zone_init(zone.nwh); 
    }

    chss.djinf = new Chs(); chss.djinf.id = 160;
    chss.djinf.sl=()=>{global.flags.inside=true; u_loc('Dojo, Infoboard');
      chs('Useful information regarding dojo is written here. What will you read?',true);
      chs('"Get stronger!"',false).addEventListener('click',()=>{
        chs('Fight dummies provided by dojo to improve your physique and weapon skills! Destroy them and grab their stuff, or vanquish thousands for a special reward! The doors of our dojo is open for everyone willing to lead the path of a warrior',true);
        chs('"<= Return"',false).addEventListener('click',()=>{
          move_to_area(chss.djinf,false);
        });
      });
      chs('"Graduate!"',false).addEventListener('click',()=>{
        chs('When you are confident in your skills, try your fist at fighting powerful golems! How much beating can you withstand?',true);
        chs('"<= Return"',false).addEventListener('click',()=>{
          move_to_area(chss.djinf,false);
        });
      });
      chs('"Claim your rewards!"',false).addEventListener('click',()=>{
        chs('As long as you keep gaining experience and train hard, dojo will provide you with gifts and money! Don\'t miss out!',true);
        chs('"<= Return"',false).addEventListener('click',()=>{
          move_to_area(chss.djinf,false);
        });
      });
      chs('"Get your grub at the canteen!"',false).addEventListener('click',()=>{
        chs('Our generous dojo provides '+col('Free Meals','lime')+' to every attending low-class disciple every '+col('Sunday','yellow')+'! Get in time for your weekly menu!',true);
        chs('"<= Return"',false).addEventListener('click',()=>{
          move_to_area(chss.djinf,false);
        });
      });
      chs('"Measure your power!"',false).addEventListener('click',()=>{
        let v = chs('Try out punching this '+col('Indestructable Dummy','orange')+' to measure the power of your fist!',true);
        chs('"Give it a try"',false).addEventListener('click',()=>{ you.stat_r(); 
          let hs = handStr();
          v.innerHTML=select(['Wham!','Slap!','Hit!','Punch!','Hack!'])+' Your approximate hand strength is measured in: <br><br><span style="border:1px dashed yellow;padding:6px">'+col((format3(hs.toString())+'kg'),'springgreen')+'</span><br><br>';
          for(let x in global.htrchl) global.htrchl[x](hs);
        });
        chs('"<= Return"',false).addEventListener('click',()=>{
          move_to_area(chss.djinf,false);
        });
      });
      chs('"<= Return"',false).addEventListener('click',()=>{
        move_to_area(chss.t3,false);
      });
    }

    chss.trne1e1 = new Chs(); chss.trne1e1.id = 124;
    chss.trne1e1.sl=()=>{global.flags.inside=true; u_loc('Dojo, training area'); 
      chs('Instructor: Great job smashing that golem! This golem is one of the weakest types around, but even he can become a huge trouble if you\'re not giving it your best. Now, grab this and proceed with your training',true);
      chs('"Proceed with your training"',false).addEventListener('click',()=>{
        giveItem(item.hptn1,10); global.flags.trne1e1=true; move_to_area(chss.t3);
      });
    }

    chss.trne2e1 = new Chs(); chss.trne2e1.id = 125;
    chss.trne2e1.sl=()=>{global.flags.inside=true; u_loc('Dojo, training area'); 
      chs('Instructor: Just like that, keep it up. You are starting to stand much longer in fights, such an improvement from when you just arrived here! You deserver your praise, but don\'t get complacent',true);
      chs('"Proceed with your training"',false).addEventListener('click',()=>{
        giveItem(wpn.fksrd); giveItem(acc.otpin); global.flags.trne2e1=true; move_to_area(chss.t3);
      });
    }

    chss.trne3e1 = new Chs(); chss.trne3e1.id = 126;
    chss.trne3e1.sl=()=>{global.flags.inside=true; u_loc('Dojo, training area');
      chs('Instructor: That was a tough one, but you still managed to crush it! You are getting close to finishing a second course. Don\'t give up!',true);
      chs('"Proceed with your training"',false).addEventListener('click',()=>{
        giveItem(item.scrlw); global.flags.trne3e1=true; move_to_area(chss.t3);
      });
    }

    chss.trne4e1 = new Chs(); chss.trne4e1.id = 162;
    chss.trne4e1.sl=()=>{global.flags.inside=true; u_loc('Dojo, training area');
      chs('Instructor: <span style="color:lime">As expected, you have what it takes to protect yourself! And with that, you have finished the second entry course of this dojo, job well done! Soon, you will be able to step out of the village and take on serious jobs that will let you explore the land. You better prepare yourself well before that happens!</span>',true);
      chs('"Finish training"',false,'lime').addEventListener('click',()=>{
        global.flags.trne4e1=true; move_to_area(chss.t3);
      });
    }

    chss.return1 = new Chs();
    chss.return1.id = 105;
    chss.return1.sl = () => {
        global.flags.inside = true;
        u_loc('Dojo, training area');
        
        chs('Punch as many as you want', true);
        
        if(!global.flags.trnex2) {
            zone_init(zone.trn);
        }
        else zone_init(zone.trnf);
        
        achs('"<= Return back into lobby"', ()=>{
            move_to_area(chss.t3);
        });
    }

    chss.forestn1main = new Chs();
    chss.forestn1main.id = 113;
    chss.forestn1main.sl = () => {
        global.flags.inside=false;
        u_loc('Western Woods, The Wooden Gate');

        chs('You\'re out in the forest. You can hunt here',true);

        chs('"=> Enter the Hunter\'s lodge"',false).addEventListener('click',()=>{
          move_to_area(chss.forestn1b1);
        });

        chs('"=> Delve inside the forest"',false).addEventListener('click',()=>{
          move_to_area(chss.forestn1a1);
        });

        if(global.flags.forestn1a3u) chs('"=> Hunt indefinitely"',false).addEventListener('click',()=>{
          move_to_area(chss.forestn1a3);
        });
        
        chs('"<= Return back"',false).addEventListener('click',()=>{
          move_to_area(chss.village_center);
        });
    }

    chss.forestn1a3 = new Chs();
    chss.forestn1a3.id = 130;
    add_to_sector(sector.forest1,chss.forestn1a3);
    chss.forestn1a3.sl = () => {
        global.flags.inside=false;
        u_loc('Western Woods, They\'re Nearby');
        chs('The woods are silent',true);
        achs('"<= Return back"', ()=>{
            move_to_area(chss.forestn1main);
        });
    }
    chss.forestn1a3.onEnter=function(){
        zone_init(zone.forestn1a3);
    }

    chss.forestn1a4 = new Chs(); chss.forestn1a4.id = 161; add_to_sector(sector.forest1,chss.forestn1a4)
    chss.forestn1a4.sl=()=>{global.flags.inside=false; u_loc('Western Woods, Round Branches');  
      if(zone.forestn1a4.size>0){
      chs('Something ambushes you!',true,'red');
      chs('"<= Escape"',false).addEventListener('click',()=>{
        move_to_area(chss.forestn1main);
      });}else{
      chs('You never knew this secluded area was here',true);
      if(!global.flags.forestnskltg)chs('"Look around"',false).addEventListener('click',()=>{
        chs('You see something sticking out from the ground in the grass over there. Bones?',true);
        chs('"Examine whatever that might be"',false).addEventListener('click',()=>{
          chs('Indeed, bones. Skeletal remains of a person to be exact. Looks like he died long time ago, much of everything rotted off, even metallic bits of whatever armor he was wearing have fallen apart.',true);
          chs('"See if you can salvage anything"',false).addEventListener('click',()=>{
            chs('There isn\'t much you can take with you, except for the sword on the skeleton\'\s hip, still inside its half-desintegrated sheath. What was the cause of his death? He wasn\'t in a fight judging by the state of the sword. Was he poisoned? Or caught by surprise? Couldn\'t leave this place for whatever reason? You are not sure. The least you can do is honor the deceased by burying his remains',true);
            chs('"Make a grave"',false).addEventListener('click',()=>{
              global.flags.forestnskltg=true; giveItem(wpn.mkrdwk); you.karma+=3;you.luck++;msg('Your good deed improved your karma!','gold');msg('LUCK Increased +1','gold');chss.forestn1a4.sl()
            })
          })
        })
      }) 
      chs('"<= Return"',false).addEventListener('click',()=>{
        move_to_area(chss.forestn1main);
      })}
    }
    chss.forestn1a4.onEnter=function(){
      if(zone.forestn1a4.size>0) zone_init(zone.forestn1a4);
    }
    chss.forestn1a4.onLeave=function(){
      zone.forestn1a4.size=rand(5)+20;
    }
    chss.forestn1a4.data={scoutm:600,scout:0,scoutf:false,gets:[false],gotmod:0}
    chss.forestn1a4.scout=[
      {c:.009,f:()=>{msg('You discover a pouch half-etched into the ground and covered by a rock. It probably belonged to the corpse','lime');giveItem(item.mnblm,3);chss.forestn1a4.data.gets[0]=true},exp:35},
      {c:.0005,cond:()=>{if(getHour()>=0&&getHour()<=3&&getLunarPhase()===0)return true},f:()=>{msg('You found Moonbloom!','lime');giveItem(item.mnblm);},exp:10},
    ]
    chss.forestn1a4.onScout=function(){scoutGeneric(this)}


    chss.forestn1b1 = new Chs();
    chss.forestn1b1.id = 118;
    chss.forestn1b1.sl = () => {
        global.flags.inside=true;
        u_loc('Western Woods, Hunter\'s Lodge');

        if (wearingany(wpn.mkrdwk)&&!global.flags.wkrtndrt) {
              chs('<span style="color:limegreen">Head Hunter Yamato</span>: You! Why do you have that?',true);
              chs('"?"',false).addEventListener('click',()=>{
                  chs('<span style="color:limegreen">Head Hunter Yamato</span>: The sword! Where did you get it!?',true);
                  chs('Give explanation',false).addEventListener('click',()=>{
                      chs('<span style="color:limegreen">Head Hunter Yamato</span>: The body in the forest, you say... Dammit! Our scouts are worthless if it takes someone like you to make such an important discovery! *sigh..* This sword you\'re holding once belonged to our deputy chief - Dein. You might have not met him before if you never set your foot out of the village, he was a promising and talented young soldier who were assigned to such an remote settlement for his field training',true);
                      chs('=>',false).addEventListener('click',()=>{
                          chs('<span style="color:limegreen">Head Hunter Yamato</span>: Then one day he staight up vanished, without letting anyone know, and he was well respected and cared for our people all the same. Of course, being a part of the military would prevent him from disclosing his plans and duties, but it is highly doubtful a special task from the higher command would be the reason of his abscence. All of his belongins, personal items and possessions are still there, where he left them. Lad knew how to fight and wield a sword, I do not for once believe a man of his caliber would perish and die like this, the corpse you speak of might not be his...',true);
                          chs('Express your condolences to the deceased',false).addEventListener('click',()=>{
                              chs('<span style="color:limegreen">Head Hunter Yamato</span>: Alright, enough. Your sentiment is appreciated, but let us hope Dein still draws breath out there. This entire precident calls for investigation, a team of hunters will be dispatched shortly and you keep yourself alert too. And I will be taking that from your hands, thank you for bringing it here. Time will tell wether this sword becomes a memento or returns to its rightful owner',true);
                              chs('Part with the sword',false).addEventListener('click',()=>{
                                chs('<span style="color:limegreen">Head Hunter Yamato</span>: Here, take this for your trouble',true);
                                chs('Accept',false,'lime').addEventListener('click',()=>{
                                    removeItem(findbyid(inv, wpn.mkrdwk.id));
                                    giveWealth(300);
                                    global.flags.wkrtndrt=true;
                                    move_to_area(chss.forestn1b1,false);
                                });
                            });
                        });
                    });
                });
            });
            return;
        }

        if(!global.flags.forestn1b1int) {
            chs('<span style="color:limegreen">Head Hunter Yamato</span>: Hm? Your face is unfamiliar. Might be your first time around here I take it? These are the Western Woods, or simply the western part of the forest. Spots here are very meek and mild on danger and resources, it is perfect for newbies like you. You are free to come and hunt as much as you like. Consider doing some of the available jobs while you\'re at it. Won\'t pay much, but you can be of help to the people.',true,'orange',null,null,null,'.9em');global.flags.forestn1b1int=true
        } else global.flags.wkrtndrt&&random()>.5?chs(select(['You sight the hunter thinking deeply about something','You hear mumbling']),true):chs(select(['You see a variety of bows and other hunting tools arranged on the table and hanging from the walls','You notice head hunter maintaining his hunting gear','The smell of beef jerky assaults your nose']),true);
        
        chs('"!Ask about the jobs"',false,'yellow').addEventListener('click',()=>{
          move_to_area(chss.forestn1b1j,false);
        });

        chs('"Tell me something"',false).addEventListener('click',()=>{
          move_to_area(chss.htrtch0,false)
        });

        if(quest.fwd1.data.done===true){
          chs('"Sell firewood '+dom.coincopper+'"',false).addEventListener('click',()=>{
            move_to_area(chss.forestn1b1s,false);
          });
        }

        if(item.hbtsvr.have) chs('"Deliver the satchel"',false,'lightblue').addEventListener('click',()=>{
            chs('<span style="color:limegreen">Head Hunter Yamato</span>: Delivery back? That\'s unexpected! Put this here, let me examine it... I see, we\'re going east soon, then... Well, that\'s not for you to worry about, hhah! There is another thing. You wait here a moment<br>.......<br><br> Heeere we go! Get this crate to the dojo since you\'re going in that direction anyway. They\'ll know what to do with it. Go now, go',true);
            chs('"Ok"',false).addEventListener('click',()=>{
                giveItem(item.htrdvr);
                removeItem(item.hbtsvr);
                move_to_area(chss.forestn1main);
            });
        });

        chs('"<= Exit"',false).addEventListener('click',()=>{
          move_to_area(chss.forestn1main);
        });

        if(quest.fwd1.data.done===true&&quest.hnt1.data.done===true&&!global.flags.forestn1b1g1){
          chs('<span style="color:limegreen">Head Hunter Yamato</span>: You\'re still going around without a proper weapon? That won\'t do, catch this. It isn\'t much, but a bit better than you being nearly emptyhanded. Once you return back you should check the '+col('Notice Board','lime')+' by the village center, you never know if something important is happening in the ouskirts that you aren\'t aware of, but it will almost certainly be written there. You may find a job offer or two, or see pleads of fellow villagers asking for help with mundane things, consider those as well',true);
          chs('"Thanks!"',false).addEventListener('click',()=>{
            chs('<span style="color:limegreen">Head Hunter Yamato</span>: One more thing. I\'ll ask you to do this very easy, little job. Grab this bag and get it to the village\'s herbalist. You know where the herbalist is? Here are the directions, listen well: head to the marketplace and look for a very unremarkable little building with a sign that looks like a vial. Like those vials they use in alchemy, those ones. The building is located a little further back from the road, in the shade, so you may simply forget it exists if you aren\'t specifically looking for it, you keep your eyes peeled. Now go, you should have no problem getting there',true);
            chs('"Got it"',false).addEventListener('click',()=>{
              global.flags.forestn1b1g1=true; giveItem(wpn.dgknf); giveItem(item.htrsvr); move_to_area(chss.forestn1b1,false); global.flags.phai1udt=true;
            });
          });
        } 
    }

    chss.htrtch0 = new Chs(); chss.htrtch0.id = 164;
    chss.htrtch0.sl=()=>{ global.flags.inside=true;
      chs('<span style="color:limegreen">Head Hunter Yamato</span>: What do you want to ask, kid? Want to know how to butcher a carcass? Khahhahhah! *cough*',true);
      chs('"About monsters"',false).addEventListener('click',()=>{move_to_area(chss.htrtch1,false)});
      chs('"What are monster ranks?"',false).addEventListener('click',()=>{
        chs('<div style="line-height:16px"><span style="color:limegreen">Head Hunter Yamato</span>: Ranking is a way to separate monsters by their relative danger level, they go as following:<div style="border: darkblue 1px solid;background-color:#0b1c3c;margin:10px;"><div><span style="color:lighgrey">G - Can be dealth with by able people</span></div><div><span style="color:white">F - Can be dealth with by male adults</span></div><div><span style="color:lightgreen">E - Village Crisis</span></div><div><span style="color:lime">D - Townside Crisis</span></div><div><span style="color:yellow">C - Citywide Crisis</span></div><div><span style="color:orange">B - National Crisis</span></div><div><span style="color:crimson">A - Continental Threat</span></div><div><span style="color:gold;text-shadow: 0px 0px 2px red,0px 0px 2px red,0px 0px 2px red">S - Global Crisis</span></div><div><span style="color:black;text-shadow:hotpink 1px 1px .1em,cyan -1px -1px .1em">SS - World Disaster</span></div><div><span style="color:white;text-shadow:2px 0px 2px red,-2px 0px 2px magenta,0px 2px 2px cyan,0px -2px 2px yellow,0px 0px 2px gold">SSS - Universal Calamity</div></div>We haven\'t experienced anything stronger than the E rank in all history of our village. Whatever is above the A rank is completely unheard of, and only partially mentioned in ancient texts. That\'s the realm of gods, world destroyers and higher beings that our mortal souls are unlikely to ever face</div>',true,0,0,0,0,'.9em');
        chs('"<= Return"',false).addEventListener('click',()=>{move_to_area(chss.htrtch0,false)});
      });
      chs('"<= Return"',false).addEventListener('click',()=>{move_to_area(chss.forestn1b1,false)});
    }

    chss.htrtch1 = new Chs(); chss.htrtch1.id = 163;
    chss.htrtch1.sl=()=>{ global.flags.inside=true;
      chs('<div style="line-height:14px"><span style="color:limegreen">Head Hunter Yamato</span>: Monsters, you say? There are many and they are around, terrorizing peaceful folk in the outside world. Our remote parts don\'t see much of that, these lands are tame. Not without dangers, of course, you meet a wild boar in the forest - a single wrong move and its tusks are in your guts and that is it, end of the fool. Or those pesky slimes, while don\'t look menacing and pose little danger, they sometimes gather and destroy the fields by melting crops and soil. We have it good but starvation is worse than any monster, at times. *cough* anyway, anything living and non-living you meet can be separated into 6 categories:<br>Human, Beast, Undead, Evil, Phantom, Dragon</div>',true,0,0,0,0,'.8em');
      chs('"About Humans"',false,0,0,0,0,'.8em',0,'15px').addEventListener('click',()=>{
        chs('<span style="color:limegreen">Head Hunter Yamato</span>: Humans and Demihumans fall into the same class. People like you and me, beastmen, orcs, goblins... Mostly creatures intelligent enough to walk on their two, use tools, form societies, make settlements, trade and speak on their own violition. You will encounter and perhaps fight them as bandits, criminals, members of the opposing factions and armies, whoever you disagree with. Always be on your guard, humanoids are cunning and skilled, versatile and very adaptive. Yet, they have mushy bodies. One correct strike and you get an advantage',true);
        chs('"<= Return"',false).addEventListener('click',()=>{move_to_area(chss.htrtch1,false)});
      });
      chs('"About Beasts"',false,0,0,0,0,'.8em',0,'15px').addEventListener('click',()=>{
        chs('<span style="color:limegreen">Head Hunter Yamato</span>: Beasts are your usual, normal wildlife like wolves, slimes, mimics, or prone to being evil Demihumans with low intelligence and high level of aggression like ogres, harpies, minotaurs. While animals are dumb, never underestimate a wild beast. With their thick skin and natural weapons like fangs and claws, they pose a major threat when driven into a desperate state. Fire works very well against the most, especially those with fur and feathers, keep that in mind next time you go hunting',true);
        chs('"<= Return"',false).addEventListener('click',()=>{move_to_area(chss.htrtch1,false)});
      });
      chs('"About Undead"',false,0,0,0,0,'.8em',0,'15px').addEventListener('click',()=>{
        chs('<span style="color:limegreen">Head Hunter Yamato</span>: Undead, as you could already tell, are living dead. Reanimated remains of humans and beasts by the influence of natural forces or a skilled necromancer. Even if they completely lack intelligence and wander around aimlessly, controlled bodies of the dead get strenghtened by Dark magic and gain unnatural resilience and power as a result. It doesn\'t prevent them from being hurt by fire or Holy powers, hovewer. You can deal with lesser fragile skeletal beings quickly if you bash them with something blunt',true);
        chs('"<= Return"',false).addEventListener('click',()=>{move_to_area(chss.htrtch1,false)});
      });
      chs('"About Evil"',false,0,0,0,0,'.8em',0,'15px').addEventListener('click',()=>{
        chs('<span style="color:limegreen">Head Hunter Yamato</span>: Beings that are artificially made or existences who are inherently evil, can be classified as such. Demons, imps, golems, possessed weapons and armor, gremlins, devils and much of anything else that comes out from the Underworld. They are extremely dangerous and seek destruction all that they come across',true);
        chs('"<= Return"',false).addEventListener('click',()=>{move_to_area(chss.htrtch1,false)});
      });
      chs('"About Phantoms"',false,0,0,0,0,'.8em',0,'15px').addEventListener('click',()=>{
        chs('<span style="color:limegreen">Head Hunter Yamato</span>: Souls of the dead, ethereal beings, manifestations of powers or other apparitions can all be called Phantoms. They take forms of wisp and sprites, benevolent or twisted elementals or spirits and wraiths that terrorize the living. They are difficult or sometimes outright impossible to hurt using normal physical means, magic or exorcism would be a preferred way of dealing with such enemies',true);
        chs('"<= Return"',false).addEventListener('click',()=>{move_to_area(chss.htrtch1,false)});
      });
      chs('"About Dragons"',false,0,0,0,0,'.8em',0,'15px').addEventListener('click',()=>{
        chs('<span style="color:limegreen">Head Hunter Yamato</span>: Dragons are legendary creatures that possess evil and cunning intellect. Through some unknown means many dragons in ancient times were reduced to subspecies of wyverns and wyrms, or outright bastard draconids like lizardmen, and other beings with Dragon bloodline. The power of said bloodline grants them superior defence against magic and energy abilities, their physical toughness is also no joke',true);
        chs('"<= Return"',false).addEventListener('click',()=>{move_to_area(chss.htrtch1,false)});
      });
      chs('"<= Return"',false).addEventListener('click',()=>{move_to_area(chss.htrtch0,false)});
    }


    chss.forestn1b1s = new Chs(); chss.forestn1b1s.id = 121;
    chss.forestn1b1s.sl=()=>{ global.flags.inside=true;
      chs('<span style="color:limegreen">Head Hunter Yamato</span>: I\'ll fetch you 15 copper per bundle! How many do you want to sell?',true);
      let fwd=item.fwd1.have?item.fwd1.amount:0;  
      if(fwd>=1) chs('"Sell 1 piece"',false,'lightgrey').addEventListener('click',()=>{
        item.fwd1.amount-=1; if(item.fwd1.amount<=0) removeItem(item.fwd1); giveWealth(15) ;move_to_area(chss.forestn1b1s,false)
      });
      if(fwd>=5) chs('"Sell 5 piece"',false,'lime').addEventListener('click',()=>{
        item.fwd1.amount-=5; if(item.fwd1.amount<=0) removeItem(item.fwd1); giveWealth(75) ;move_to_area(chss.forestn1b1s,false)
      });
      if(fwd>=10) chs('"Sell 10 pieces"',false,'cyan').addEventListener('click',()=>{
        item.fwd1.amount-=10; if(item.fwd1.amount<=0) removeItem(item.fwd1); giveWealth(150) ;move_to_area(chss.forestn1b1s,false)
      });
      if(fwd>=1) chs('"Sell Everything"',false,'orange').addEventListener('click',()=>{
        giveWealth(item.fwd1.amount*15); item.fwd1.amount=0; removeItem(item.fwd1); move_to_area(chss.forestn1b1s,false)
      });
      chs('"<= Return"',false).addEventListener('click',()=>{
        move_to_area(chss.forestn1b1,false)
      });
    }

    chss.forestn1b1j = new Chs(); chss.forestn1b1j.id = 119;
    chss.forestn1b1j.sl=()=>{  global.flags.inside=true;
      chs('<span style="color:limegreen">Head Hunter Yamato</span>: Here is what\'s available, take a look',true);
        if(quest.fwd1.data.done&&quest.hnt1.data.done){
          if(!quest.lmfstkil1.data.started&&!quest.lmfstkil1.data.done){
          chs('"Monster eradication"',false).addEventListener('click',()=>{
            if(you.lvl<20||!global.flags.trne4e1) {msg('<span style="color:limegreen">Head Hunter Yamato</span>: Don\'t even think about it, you will not be sent to your death. Go back and train, dojo has everything you need'); return}
            if(!quest.lmfstkil1.data.started){chs('<span style="color:limegreen">Head Hunter Yamato</span>: What\'s this? Your aura has changed since we last met! All the martial training you went through certainly hasn\'t gone to waste, this kid is definitely isn\'t a pushover anymore, hah! If you have the guts to take on the next task, listen well - southern forest is becoming more and more dangerous, lethal beasts keep crawling in from the farther plains, making it very difficult to do any sort of work in the south. Looks like wolves this time. Some fear, at this rate, they might reach and assault the village, and that will have need to be dealth with. This is a dangerous issue, and you will have to have courage to take it on, but in turn it will serve you as great real battle experience. Other lads have already signed up, as well. Are you willing?',true,'yellow',0,0,0,'.9em');
            chs('"Accept"',false,'lime').addEventListener('click',()=>{
              giveQst(quest.lmfstkil1); global.flags.forest1u=true; giveItem(item.bstr)
              chs('<span style="color:limegreen">Head Hunter Yamato</span>: Hunt down all the wolves you find and return once you destroy at least 35 of them. You will also want this, every hunter should keep his personal notes close. And prepare medicinal bandages, just in case. Be careful, and good luck',true);
              chs('"<= Return"',false).addEventListener('click',()=>{
                move_to_area(chss.forestn1b1,false)
              });
            });
            chs('"Refuse"',false,'crimson').addEventListener('click',()=>{
              move_to_area(chss.forestn1b1,false)
            });
          }
        });
        }else if(quest.lmfstkil1.data.started){
          if(quest.lmfstkil1.data.mkilled<35) {chs('<span style="color:limegreen">Head Hunter Yamato</span>: Having troubles with the task?',true);
            chs('"<= Return"',false).addEventListener('click',()=>{
              move_to_area(chss.forestn1b1,false);
            });return
          }
            else chs('<span style="color:limegreen">Head Hunter Yamato</span>: What is that fire in your eyes? Can it be you are done already?',true);
            chs('"Report the sounds you heard"',false,'lime').addEventListener('click',()=>{
              chs('<span style="color:limegreen">Head Hunter Yamato</span>: That isn\'t good, sounds like trouble... Might have been the leader of the pack, furious about death of his underlings. This matter will need to be resolved quickly. As for you, go and have a good hard earned rest, you have done very well. Expect to be contacted later for further monster subjugation',true);
              chs('"Accept the reward"',false,'lime').addEventListener('click',()=>{ 
                finishQst(quest.lmfstkil1); move_to_area(chss.forestn1main);
              });
            });
          }
        }
        if(!quest.fwd1.data.done){
          chs('"Firewood gathering"',false).addEventListener('click',()=>{
            if(!quest.fwd1.data.started){chs('<span style="color:limegreen">Head Hunter Yamato</span>: While coal is not easy to obtain around here, good burnable wood is always in demand. Your job this time is to collect and bring about 10 bundles of firewood, keep an eye out while you\'re strolling out in the forest. Your deed will help the villagers, and you will get something out of it as well',true,'yellow');
            chs('"Accept"',false,'lime').addEventListener('click',()=>{
              giveQst(quest.fwd1);
              chs('<span style="color:limegreen">Head Hunter Yamato</span>: Great! I will be awaiting your return',true);
              chs('"<= Return"',false).addEventListener('click',()=>{
                move_to_area(chss.forestn1b1,false)
              });
            });
            chs('"Refuse"',false,'crimson').addEventListener('click',()=>{
              move_to_area(chss.forestn1b1,false)
            });
          }else {
            if(!item.fwd1.have) chs('<span style="color:limegreen">Head Hunter Yamato</span>: If you find your task too difficult, go back to the training grounds',true);
            else if(item.fwd1.amount<10) chs('<span style="color:limegreen">Head Hunter Yamato</span>: You found some already? You still need '+(10-item.fwd1.amount)+' more bundles of firewood to finish the task',true);
            else chs('<span style="color:limegreen">Head Hunter Yamato</span>: If you got requested firewood, turn it in',true);
            if(item.fwd1.amount>=10){
              chs('"Hand over firewood"',false,'lime').addEventListener('click',()=>{
                reduce(item.fwd1,10)
                chs('<span style="color:limegreen">Head Hunter Yamato</span>: Very good, you didn\'t disappoint. You can never have enough burning material, be it for cooking or warmth, or anything else. Here, this is for you. And some monetary compensation for the job well done. Oh, by the way, I\'ll buy any spare firewood off of you if you need some coin',true);
                chs('"Accept the reward"',false,'lime').addEventListener('click',()=>{ 
                  finishQst(quest.fwd1); 
                });
              });
            }
            chs('"<= Return"',false).addEventListener('click',()=>{
              move_to_area(chss.forestn1b1,false)
            });
          }
        });
          }
          if(!quest.hnt1.data.done){
            chs('"Hunting for meat"',false).addEventListener('click',()=>{
              if(!quest.hnt1.data.started){chs('<span style="color:limegreen">Head Hunter Yamato</span>: If you want to survive, you will need to eat. Prove that you can handle yourself in the wilderness by hunting down wildlife. 10 piece of fresh meat should be enough, bring them to me for the evaluation',true,'yellow');
              chs('"Accept"',false,'lime').addEventListener('click',()=>{
                giveQst(quest.hnt1);
                chs('<span style="color:limegreen">Head Hunter Yamato</span>: Great! I will be awaiting your return',true);
                chs('"<= Return"',false).addEventListener('click',()=>{
                  move_to_area(chss.forestn1b1,false)
                });
              });
              chs('"Refuse"',false,'crimson').addEventListener('click',()=>{
                move_to_area(chss.forestn1b1,false)
              });
            } else{
              if(!item.fwd1.have) chs('<span style="color:limegreen">Head Hunter Yamato</span>: If you find your task too difficult, go back to the training grounds',true);
              else if(item.rwmt1.amount<10) chs('<span style="color:limegreen">Head Hunter Yamato</span>: Oh, so you managed to hunt down some of the animals. You still need '+(10-item.rwmt1.amount)+' more chunks of meat to end he job. Hurry up before it goes bad!',true);
              else chs('<span style="color:limegreen">Head Hunter Yamato</span>: If you have everything already, leave it here',true);
              if(item.rwmt1.amount>=10){
                chs('"Turn in raw meat"',false,'lime').addEventListener('click',()=>{
                  reduce(item.rwmt1,10);
                  chs('<span style="color:limegreen">Head Hunter Yamato</span>: Well done! Hunting down animals and stockpiling food that way is always a good precaution. Cooking or drying raw meat is generally a better idea than consuming it raw, give that a piece of mind if you\'re not sure what to do with the stuff you have.<br>All in all, you deserve a reward',true);
                  chs('"Accept the reward"',false,'lime').addEventListener('click',()=>{
                    finishQst(quest.hnt1); move_to_area(chss.forestn1b1,false); 
                  });
                });
              }
              chs('"<= Return"',false).addEventListener('click',()=>{
                move_to_area(chss.forestn1b1,false);
              });
            }
          });
        }
      //blabla
    
      chs('"<= Return"',false).addEventListener('click',()=>{
        move_to_area(chss.forestn1b1,false);
      });
    }

    chss.forestn1a1 = new Chs(); chss.forestn1a1.id = 114; add_to_sector(sector.forest1,chss.forestn1a1)
    chss.forestn1a1.sl=()=>{global.flags.inside=false; u_loc('Western Woods, The Yellow Path');  
      chs('The woods are silent.',true);
      chs('"<= Return back"',false).addEventListener('click',()=>{
        move_to_area(chss.forestn1main);
      });
    }
    chss.forestn1a1.onEnter=function(){
      zone_init(zone.forestn1a2);
    }

    chss.forestn1a2 = new Chs(); chss.forestn1a2.id = 115; add_to_sector(sector.forest1,chss.forestn1a2)
    chss.forestn1a2.sl=()=>{
      global.flags.inside=false;
      u_loc('Western Woods, The Underbushes'); 
      chs('You scavenged some goods from this forest zone.',true);
      chs('"=> Go further into the forest"',false).addEventListener('click',()=>{
        move_to_area(chss.forestn2a1);
      });
      if(global.flags.forestnscgr)chs('"\-\-> Enter the hidden path"',false,'grey').addEventListener('click',()=>{
        move_to_area(chss.forestn1a4);
      });
      chs('"<= Return back"',false).addEventListener('click',()=>{
        move_to_area(chss.forestn1main);
      });
    }
    chss.forestn1a2.data={scoutm:320,scout:0,scoutf:false,gets:[false],gotmod:0}
    chss.forestn1a2.scout=[
      {c:.008,f:()=>{msg('You uncover a hidden passage!','lime');global.flags.forestnscgr=true;move_to_area(chss.forestn1a4);chss.forestn1a2.data.gets[0]=true},exp:66},
    ]
    chss.forestn1a2.onScout=function(){scoutGeneric(this)}


    chss.forestn2a1 = new Chs(); chss.forestn2a1.id = 120;  add_to_sector(sector.forest1,chss.forestn2a1)
    chss.forestn2a1.sl=()=>{global.flags.inside=false; u_loc('Western Woods, The Shaded Path');  
      chs('The woods are .',true);
      chs('"<= Return back"',false).addEventListener('click',()=>{
        move_to_area(chss.forestn1main);
      });
    }
    chss.forestn2a1.onEnter=function(){
      zone_init(zone.forestn2a2);
    }

    chss.forestn3main = new Chs(); chss.forestn3main.id = 168;
    chss.forestn3main.sl=()=>{
      global.flags.inside=false;
      u_loc('Southern Forest, The Oaken Gate');
      chs('The air here feels intimidating.',true);
      chs('"=> Explore the depths"',false).addEventListener('click',()=>{
        move_to_area(chss.forestn9a1m);
      });
      chs('"<= Return back"',false).addEventListener('click',()=>{
        move_to_area(chss.village_center);
      });
    }

    chss.forestn9a1m = new Chs(); chss.forestn9a1m.id = 169;
    chss.forestn9a1m.sl=()=>{global.flags.inside=false; u_loc('Southern Forest, The Foliage');
      chs('This place looks dark.',true);
      chs('"<= Return back"',false).addEventListener('click',()=>{
        move_to_area(chss.forestn3main);
      });
    }
    chss.forestn9a1m.onEnter=function(){
      zone_init(zone.forestn9a1);
    }

    chss.marketplace = new Chs();
    chss.marketplace.id = 127;
    add_to_sector(sector.vmain1,chss.marketplace);
    chss.marketplace.sl = () => {
        u_loc('Village Center, Marketplace');
        chs('The marketplace feels busy');

        achs('Grocery Shop =>', () => {
            move_to_area(chss.grc1);
        }, 'gold');

        achs('General Store =>', () => {
            move_to_area(chss.gens1);
        }, 'gold');

        if (!global.flags.scrtgltt) 
            achs('Food stand =>', () =>{
            if (skl.trad.lvl >= 2 && random() < 0.2) {
                global.flags.scrtglti=true;
            }
            if (global.flags.scrtglti===true){
                chs('...',true);
                chs('?').addEventListener('click',()=>{
                    chs('Passerby: "Looking for the foodstand guy? He took his stuff and went South. That one supposedly travels from place to place to sell the food he makes, doubt we\'ll see him back any time soon"');
                    chs('Well then..').addEventListener('click',()=>{
                        global.flags.scrtgltt=true; move_to_area(chss.village_center,false);
                    });
                });
            } else {
                move_to_area(chss.vendor1, false);
            }
        });

        if(global.flags.phai1udt) {
            achs('Herbalist =>', ()=>{
                move_to_area(chss.pha1);
            }, 'gold');
        }

        chs('Nervous Guy =>', false).addEventListener('click',()=>{
                move_to_area(chss.fdwrg1qt);
        });
        
        if(global.flags.grddtjb) {
            chs('"Checkpoint"',false,'hotpink').addEventListener('click',()=>{
                if (getHour()>=7&&getHour()<=10) {
                    chs('Lookout Guard: Here for work? You won\'t have to do much, just stand there near the gate and look intimidating. You\'re not doing any fighting if someone dangerous comes around, that would be dealth by Us, your militia. Your shift ends at 8PM, sign up now and go',true);
                    chs('"Alright..."',false).addEventListener('click',()=>{
                        if (getHour()>=7&&getHour()<=10) {
                            giveQst(quest.grds1);
                            move_to_area(chss.jbgd1);
                        } else {
                            chs('Lookout Guard: Too damn late, next time don\'t stand there like a decoration wasting everyone\'s time',true);
                            chs('"Ah..."',false).addEventListener('click',()=>{
                                move_to_area(chss.village_center);
                            });
                        }
                    });
                    chs('"<= Maybe not"',false).addEventListener('click',()=>{
                        move_to_area(chss.marketplace);
                    });
                } else {
                    chs('Lookout Guard: If you want work come at the time that\'s stated in the notice and not a minute late!',true);
                    chs('"<= Return"',false).addEventListener('click',()=>{
                        move_to_area(chss.marketplace);
                    });
                }
            });
        }

        if (random() < 0.15) {
            chs('"Shady Kid =>"', false, 'springgreen').addEventListener('click', () => {
                move_to_area(chss.vendorkid1, false);
            });
        }
        
        chs('"<= Return back to the village Center"',false).addEventListener('click',()=>{
                move_to_area(chss.village_center);
        });
    }
    chss.marketplace.onEnter=function(){  // on entering the marketplace, the player may overhear one of these messages
        if(!timers.mktwawa1)timers.mktwawa1=setInterval(function(){
            if(random()<.1) {
                if (!global.text.mktwawa1) {
                    global.text.mktwawa1 = [
                        '<small>"...for that price? Are you cr..."</small>',
                        '<small>"...no, go by yourself..."</small>',
                        '<small>"...right, I\'ll take '+rand(15)+
                        ',put them in..."</small>',
                        '<small>"...is this really?..."</small>',
                        '<small>"...never seen this thing..."</small>',
                        '<small>"...is this real?..."</small>',
                        '<small>"...yeah, he said it\'s there..."</small>',
                        '<small>"...mama!!..."</small>',
                        '<small>"...right, coming next evening. You should probably p..."</small>',
                        '<small>"...stop pushing!..."</small>',
                        '<small>"...what a scam..."</small>',
                        '<small>"...this isn\'t even fresh!..."</small>',
                        '<small>"...why is this so expensive?..."</small>',
                        '<small>"...I won\'t lower it further!..."</small>',
                        '<small>"...I\'ll come back, just wait for a minute..."</small>',
                        '<small>"...break time!..."</small>',
                        '<small>"...who said so? Gotta be a lie..."</small>',
                        '<small>"...whatever, I\'m not buying..."</small>',
                        '<small>"...turn right and then..."</small>',
                        '<small>"...check for yourself then..."</small>',
                        '<small>"...she\'ll return shortly. As for you..."</small>',
                        '<small>"...deal!..."</small>',
                        '<small>"...try a different one..."</small>',
                        '<small>"...buy it! You won\'t regret it!..."</small>',
                        '<small>"Oh no! I dropped it in the forest!..."</small>'
                    ];
                }
                msg(select(global.text.mktwawa1),'rgb('+rand(255)+','+rand(255)+','+rand(255)+')')
            }
        },1000);
    }
    chss.marketplace.onLeave=function(){
        clearInterval(timers.mktwawa1);
        delete timers.mktwawa1;
    }

    chss.jbgd1 = new Chs(); chss.jbgd1.id = 159;
    chss.jbgd1.sl=()=>{global.flags.inside=false;  u_loc('Village Center, Marketplace Entry Gate');
        let c=chs('You are standing on guard duty. This isn\'t very fun',true); global.flags.work=true;
        dom.trddots = addElement(c,'span'); dom.trddots.frames=['','.','..','...']; dom.trddots.frame=0; dom.trddots.style.position='absolute'; clearInterval(timers.rdngdots);
        timers.rdngdots = setInterval(()=>{dom.trddots.innerHTML=dom.trddots.frames[(dom.trddots.frame=dom.trddots.frame>2?0:++dom.trddots.frame)]},333)
        chs('"Be bored"',false).addEventListener('click',()=>{
            msg(select(['Right...','This is boring','*whistle*','Ah...','...','Yeah...','Mhm...','Yawn..']),'lightgrey')
        });
    }
    chss.jbgd1.onEnter=function(){
      timers.job1t=setInterval(()=>{
        if(getHour()>=20){
          msg('Lookout Guard: Work\'s done for today, you have performed your duty just well and earned your salary, take it. You are advised to go straight home after you check out');
          finishQst(quest.grds1); global.flags.work=false;clearInterval(this);move_to_area(chss.home);global.flags.jcom++; 
        } else {
          giveSkExp(skl.ptnc,.08);
          if(random()<=.01) msg(select(['Right...','This is boring','*whistle*','Ah...','...','Yeah...','Mhm...','Yawn...']),'lightgrey')
          if(random()<=(.0005+skl.seye.lvl*0.0002)){
            msg('A passerby dropped a coin. Sweet!','lime'); giveItem(select([item.cp,item.lcn,item.cn,item.cd,item.cq])); giveSkExp(skl.seye,20)
          }
        }
      },1000)
    }
    chss.jbgd1.onLeave=function(){
        clearInterval(timers.job1t);
        global.flags.work=false;
    }

    chss.fdwrg1qt = new Chs(); chss.fdwrg1qt.id = 165; 
    chss.fdwrg1qt.sl=()=>{
        u_loc('Marketplace, Stalls'); 
        chs('"<span style="color:cyan">Nervous Guy:</span> Argh, what am I gonna do now! How could this... Uh? S-sorry, can\'t talk right now, please leave me be. Ahh damn it..."<div style="color: darkgrey">The man then proceeds to fidget in unrest</div>',true)
        chs('"<= Walk away"',false).addEventListener('click',()=>{ 
            move_to_area(chss.marketplace,false);
        });
    }


    chss.grc1 = new Chs(); chss.grc1.id = 128; chss.grc1.effectors=[{e:effector.shop}];
    chss.grc1.sl=()=>{global.flags.inside=true;  u_loc('Marketplace, Grocery Shop'); 
      chs('Old Lady: '+(select(['These are very fresh, buy some!','Freshest vegetables for the lowest price!','Try a few and you\'ll want even more!'])),true);
      chs('"Purchase"',false,'orange').addEventListener('click',()=>{
        chs_spec(4,vendor.grc1)
        vendor.grc1.restocked=false; clearInterval(timers.vndrstkchk); timers.vndrstkchk=setInterval(function(){if(vendor.grc1.restocked===true){clearInterval(timers.vndrstkchk);vendor.grc1.restocked=false;msg('We\'re restocking, step out for a minute');move_to_area(chss.marketplace,false);}});  
        chs('"<= Return"',false,'','',null,null,null,true).addEventListener('click',()=>{
        move_to_area(chss.grc1,false); clearInterval(timers.vndrstkchk);
      });
      });
      chs('"<= Return back"',false).addEventListener('click',()=>{
        move_to_area(chss.marketplace); 
      });
    }
    chss.grc1.data={scoutm:200,scout:0,scoutf:false,gets:[false],gotmod:0}
    chss.grc1.scout=[
      {c:.01,f:()=>{msg(select(['You notice a coin on the ground!','You pick a coin from under the counter','You snatch a coin while no one is looking']),'lime');giveItem(select([item.cp,item.cn,item.cq,item.cd]));chss.grc1.data.gets[0]=true},exp:5},
    ]
    chss.grc1.onScout=function(){scoutGeneric(this)}


    chss.gens1 = new Chs();
    chss.gens1.id = 129;
    chss.gens1.effectors=[{e:effector.shop}];
    chss.gens1.sl=()=>{
        global.flags.inside=true;
        u_loc('Marketplace, Shabby General Store');
        chs('Sleeping Old Man: '+(select(['...Welcome','...','zzz...','A customer? Pick what you want','Take your time'])),true);
        achs('"Purchase"', () => {
            chs_spec(4,vendor.gens1)
            vendor.gens1.restocked=false;
            clearInterval(timers.vndrstkchk);
            timers.vndrstkchk=setInterval(function(){
                if(vendor.gens1.restocked===true){
                    clearInterval(timers.vndrstkchk);
                    vendor.gens1.restocked=false;
                    msg('We\'re restocking, step out for a minute');
                    move_to_area(chss.marketplace,false);
                }
            });  
            chs('"<= Return"',false,'','',null,null,null,true).addEventListener('click',()=>{
                move_to_area(chss.gens1,false);
                clearInterval(timers.vndrstkchk);
            });
        }, 'orange');
        
        if(item.wvbkt.have) {
            achs('"Sell straw baskets '+dom.coincopper+'"', () => {
                chs('Sleeping Old Man: You made these, kid? Hahaha, alright, i\'ll take them off your hands. 15 '+dom.coincopper+' each!',true);
                achs('"Sell your goods"', () => {
                    if(item.wvbkt.amount>0){
                        giveWealth(item.wvbkt.amount*15);
                        item.wvbkt.amount=0;
                        removeItem(item.wvbkt);
                        move_to_area(chss.gens1,false);
                    } else {
                        move_to_area(chss.gens1,false);
                        msg('?')
                    }
                }, 'lime');
                achs('"<= Maybe next time"', ()=>{
                    move_to_area(chss.gens1,false); 
                });
            });
        }
        if(zone.hmbsmnt.size>=1000&&global.flags.hbs1&&!global.flags.bmntsmkgt) {
            chs('Infestation problem', () => {
                chs('Sleeping Old Man: Your basement is in bad shape? Same been happening to the other folks lately, it\'s not just you. Something is drilling through the underground right into people\'s homes! And then you get a cellar full of rats. A complete travesty! Some speculate there\'s a monster cave nearby, but nothing was found yet. But don\'t fret, there is a solution for you - you smoke the pests out. Light this bag and toss it in, the deeper the better. Your entire place will be filled with smog, so you will have to leave and stay out for a few hours, then you\'ll have a clean and monster free basement at your disposal. 5 '+dom.coinsilver+' silver the price',true);
                if (you.wealth >= SILVER*5) {
                    achs('"Sounds good"', () => {
                        if(you.wealth<SILVER*5) {
                            return;
                        }
                        spend(SILVER*5);
                        giveItem(item.bmsmktt);
                        global.flags.bmntsmkgt=true;
                        move_to_area(chss.gens1,false);
                    }, 'lime');
                }
                achs('"<= Too expensive"', () => {
                move_to_area(chss.gens1,false); 
                });
            }, 'grey');
        }
        achs('"<= Return back"', () => {
            move_to_area(chss.marketplace); 
        });
    }
    chss.gens1.data={scoutm:200,scout:0,scoutf:false,gets:[false],gotmod:0}
    chss.gens1.scout=[
      {c:.01,f:()=>{msg(select(['You notice a coin on the ground!','You pick a coin from under the counter','You snatch a coin while no one is looking']),'lime');giveItem(select([item.cp,item.cn,item.cq,item.cd]));chss.gens1.data.gets[0]=true},exp:5},
    ]
    chss.gens1.onScout=function(){scoutGeneric(this)}

    chss.pha1 = new Chs(); chss.pha1.id = 166; chss.pha1.effectors=[{e:effector.shop}];
    chss.pha1.sl=()=>{global.flags.inside=true;  u_loc('Marketplace, Herbalist'); 
      chs('Herbalist: '+(select(['Injured? Come in, I\'ll give you a check up','Yes yes..','Don\'t neglect your well being, stack on anything you will need'])),true);
      chs('"Purchase"',false,'orange').addEventListener('click',()=>{
        chs_spec(4,vendor.pha1)
        vendor.pha1.restocked=false; clearInterval(timers.vndrstkchk); timers.vndrstkchk=setInterval(function(){if(vendor.pha1.restocked===true){clearInterval(timers.vndrstkchk);vendor.pha1.restocked=false;msg('We\'re restocking, step out for a minute');move_to_area(chss.marketplace,false);}});  
        chs('"<= Return"',false,'','',null,null,null,true).addEventListener('click',()=>{
          move_to_area(chss.pha1,false); clearInterval(timers.vndrstkchk);
        });
      });
      if(item.hrb1.amount>=50) chs('"Sell cure grass '+dom.coincopper+'"',false).addEventListener('click',()=>{
        chs('Herbalist: Yes indeed, if you have any cure grass to sell, by all means bring it here, you can never have too much. I will take bundles of 50 for 15 '+dom.coincopper,true);
        chs('"Sell your goods"',false,'lime').addEventListener('click',()=>{if(item.hrb1.amount>=50){ global.stat.hbhbsld++;
          giveWealth(15);item.hrb1.amount-=50;reduce(item.hrb1);if(global.stat.hbhbsld>=7&&!global.flags.hbhbgft){
            chs('Herbalist: You were such a great help bringing all this cure grass to me! Take this, as a bonus',true);
            chs('"Accept"',false,'lime').addEventListener('click',()=>{
              giveItem(item.hptn1,15);giveItem(item.hptn2,3);vendor.pha1.data.rep=vendor.pha1.data.rep+10>100?100:vendor.pha1.data.rep+10;msg('The Herbalist likes you a bit more','lime');global.flags.hbhbgft=true; move_to_area(chss.pha1,false); return;
            });
          };if(item.hrb1.amount<50)move_to_area(chss.pha1,false)}else{move_to_area(chss.pha1,false);msg('?')}
        });
        chs('"<= Rather not"',false).addEventListener('click',()=>{
          move_to_area(chss.pha1,false); 
        });
      });
      if(item.htrsvr.have) chs('"Deliver the bag"',false,'lightblue').addEventListener('click',()=>{
      chs('Herbalist: And who might you be? Ohhhh, aren\'t you that dojo kid who\'s learning the art of hunting from the head himself? Come in come in, welcome! What is it you wish to deliver? Ah! Wonderful, excellent, this will last for plenty of time. Thank you for coming all this way in timely manner, you\'ve been a great help. I will give you these to sample, as a reward, they will be useful to you. Oh, and one simple request, if you don\'t mind. Give this to him when you meet next time, it is very important that he gets it.',true); 
      chs('"I can do it!"',false).addEventListener('click',()=>{removeItem(item.htrsvr);giveItem(item.atd1,3); giveItem(item.hptn1,10);giveItem(item.psnwrd); giveItem(item.hptn2); giveItem(item.hbtsvr); move_to_area(chss.pha1);
      });
      });
      
      chs('"<= Return back"',false).addEventListener('click',()=>{
        move_to_area(chss.marketplace); 
      });
    }
    chss.pha1.data={scoutm:200,scout:0,scoutf:false,gets:[false],gotmod:0}
    chss.pha1.scout=[
      {c:.01,f:()=>{msg(select(['You notice a coin on the ground!','You pick a coin from under the counter','You snatch a coin while no one is looking']),'lime');giveItem(select([item.cp,item.cn,item.cq,item.cd]));chss.pha1.data.gets[0]=true},exp:5},
    ]
    chss.pha1.onScout = function() {
        scoutGeneric(this);
    }


    chss.vendor1 = new Chs();
    chss.vendor1.id = 116;
    chss.vendor1.effectors=[{e:effector.shop}];
    add_to_sector(sector.vcent,chss.vendor1);
    add_to_sector(sector.vmain1,chss.vendor1)
    chss.vendor1.sl=()=>{
        u_loc('Village Center, Street Food Stand');

        vendor.stvr1.restocked=false;
        clearInterval(timers.vndrstkchk);
        timers.vndrstkchk=setInterval(function() {
            if(vendor.stvr1.restocked===true) {
                clearInterval(timers.vndrstkchk);
                vendor.stvr1.restocked=false;
                msg('We\'re restocking, step out for a minute');
                move_to_area(chss.village_center,false);
            }
        });
        let hi = 'Street Merchant Ran: Welcome! What would you like?';
        dom.vndr1 = chs(hi,true);
        for (let ost=0;ost<vendor.stvr1.stock.length;ost++) {
        let itm = vendor.stvr1.stock[ost];
        dom.vndrs = chs(itm[0].name+' <small style="color:rgb(255, 116, 63)">'+itm[2]+'●</small> x'+itm[1],false);
        dom.vndrs.addEventListener('click',function() {
            if(you.wealth-itm[2]>=0){spend(itm[2]);mf(-itm[2],1);m_update();giveItem(itm[0]);global.stat.buyt++;if(--itm[1]===0){clr_chs(vendor.stvr1.stock.indexOf(itm)+1);vendor.stvr1.stock.splice(vendor.stvr1.stock.indexOf(itm),1); empty(global.dscr);global.dscr.style.display='none'}else this.innerHTML=itm[0].name+' <small style="color:rgb(255, 116, 63)">'+itm[2]+'●</small> x'+itm[1];}else{clearTimeout(timers.shopcant);dom.vndr1.innerHTML='Sorry you can\'t afford that!';timers.shopcant=setTimeout(()=>{dom.vndr1.innerHTML=hi},1000)}
        });
        addDesc(dom.vndrs,itm[0]);
        }
        chs('"<= Go back"',false).addEventListener('click',()=>{
            move_to_area(chss.marketplace,false);
            clearInterval(timers.vndrstkchk);
        });    
    }

    chss.vendorkid1 = new Chs(); chss.vendorkid1.id = 123; chss.vendorkid1.shop=true; add_to_sector(sector.vcent,chss.vendorkid1); add_to_sector(sector.vmain1,chss.vendorkid1)
    chss.vendorkid1.sl=()=>{ u_loc('Village Center, Child Trader'); 
      vendor.kid1.restocked=false; clearInterval(timers.vndrstkchk); timers.vndrstkchk=setInterval(function(){if(vendor.kid1.restocked===true){clearInterval(timers.vndrstkchk);vendor.kid1.restocked=false;msg('You, step out for a moment, I\'m getting new stuff');move_to_area(chss.village_center,false);}});
      let hi = 'Hey, I\'ve got some good stuff for you'; dom.vndr1 = chs(hi,true);
      for(let ost=0;ost<vendor.kid1.stock.length;ost++){ let itm = vendor.kid1.stock[ost];
      dom.vndrs = chs(itm[0].name+' <small style="color:rgb(255, 116, 63)">'+itm[2]+'●</small> x'+itm[1],false);
      dom.vndrs.addEventListener('click',function(){
        if(you.wealth-itm[2]>=0){spend(itm[2]);mf(-itm[2],1);m_update();giveItem(itm[0]);global.stat.buyt++;if(--itm[1]===0){clr_chs(vendor.kid1.stock.indexOf(itm)+1);vendor.kid1.stock.splice(vendor.kid1.stock.indexOf(itm),1); empty(global.dscr);global.dscr.style.display='none'}else this.innerHTML=itm[0].name+' <small style="color:rgb(255, 116, 63)">'+itm[2]+'●</small> x'+itm[1];}else{clearTimeout(timers.shopcant);dom.vndr1.innerHTML='Bring money next time';timers.shopcant=setTimeout(()=>{dom.vndr1.innerHTML=hi},1000)}
      });
      addDesc(dom.vndrs,itm[0]);
      }
      if(skl.fgt.lvl>=5&&!global.flags.vndrkd1sp1) chs('"Show me something better"',false,'darkgrey').addEventListener('click',()=>{
        chs('So you want something from the hidden stash, huh? Good eye! You are one of the dojo runts, I\'ve got just what someone like you needs. One book, 3 silver'+dom.coinsilver+'. So, watcha say?',true);
        chs('"Give me"',false,'lime').addEventListener('click',()=>{
          if(you.wealth>=300){ 
            chs('"There ya go, enjoy"',true)
              global.flags.vndrkd1sp1=true; giveItem(item.fgtsb1); spend(300)
              chs('"Sweet purchase!"',false).addEventListener('click',()=>{
                move_to_area(chss.village_center,false); 
              });    
          }else{
            chs('No money - no goods! Don\'t waste my time!',true);
            chs('"<= Go back"',false).addEventListener('click',()=>{
              move_to_area(chss.village_center,false); 
            });    
          }
        });
        chs('"<= Nah"',false,'Red').addEventListener('click',()=>{
          chs('No worries, I\'ll keep it for you',true);
          chs('"<= Go back"',false).addEventListener('click',()=>{
            move_to_area(chss.village_center,false); 
          });    
        });    
      });
      else if(global.stat.moneyg>=1000&&!global.flags.vndrkd1sp2&&global.flags.vndrkd1sp1) chs('"Show me something better"',false,'darkgrey').addEventListener('click',()=>{
        chs('Alright, there\'s something else for you, snatched from some sleeping guy and I bet would be useful for you. Similar deal, 5 silver'+dom.coinsilver,true);
        chs('"Yes please"',false,'lime').addEventListener('click',()=>{
          if(you.wealth>=500){ 
            chs('"Deal successfully made"',true)
              global.flags.vndrkd1sp2=true; giveItem(item.bfsnwt); spend(500)
              chs('"Score!"',false).addEventListener('click',()=>{
                move_to_area(chss.village_center,false); 
              });    
          }else{
            chs('No money - no goods! Don\'t waste my time!',true);
            chs('"<= Go back"',false).addEventListener('click',()=>{
              move_to_area(chss.village_center,false); 
            });    
          }
        });
        chs('"<= Nah"',false,'Red').addEventListener('click',()=>{
          chs('No worries, I\'ll keep it for you',true);
          chs('"<= Go back"',false).addEventListener('click',()=>{
            move_to_area(chss.village_center,false); 
          });    
        });    
      });
      chs('"<= Go back"',false).addEventListener('click',()=>{
        move_to_area(chss.village_center,false); 
      });    
    }
    chss.vendorkid1.onLeave=function(){clearInterval(timers.vndrstkchk)}

    chss.tstauto = new Chs(); chss.tstauto.id = -1;
    chss.tstauto.sl=()=>{ u_loc('Test auto');
      dom.testauto = chs('TEST',true);
      if(!global.flags.testauto_1||global.flags.testauto_1===false) chs('Run',false).addEventListener('click',()=>{
        global.flags.testauto_1=true;timers.testauto1 = setInterval(()=>{dom.testauto.innerHTML = rand(9999999)},1000); chss.tstauto.sl();
      }); else chs('Stop',false).addEventListener('click',()=>{
        global.flags.testauto_1=false;chss.tstauto.sl(); clearInterval(timers.testauto1);
      });
      chs('"<= Go back"',false).addEventListener('click',()=>{
        chss.village_center.sl();
      });    
    }

    chss.tst= new Chs(); chss.tst.id = -1;
    chss.tst.sl=()=>{ u_loc('Test'); 
      dom.tst = chs('TEST',true);
        global.flags.btl=true; global.flags.civil=false; zone_init(zone.tst); 
      chs('"<= Go back"',false).addEventListener('click',()=>{
        chss.village_center.sl();
      });    
    }

    chss.cat1 = new Chs();
    chss.cat1.id = 107;
    add_to_sector(sector.vcent,chss.cat1);
    add_to_sector(sector.vmain1,chss.cat1)
    chss.cat1.sl = () => {
        u_loc('Rock Path, Cat');
        let w = !global.stat.cat_c ? chs('There is a cat.', true) : chs('There is a cat. Pets: ' + global.stat.cat_c, true);
        chs('"Pet the cat"', false).addEventListener('click', x => {
            let a = addElement(document.body, 'span');
            a.style.pointerEvents = 'none';
            a.style.position = 'absolute';
            a.style.color = 'lime';
            a.innerHTML = select([':3', '\'w\'', '\'ω\'', '(=・∀・=)', '*ﾟヮﾟ']);
            a.style.top = -55;
            a.style.left = -55;
            a.style.fontSize = '1.25em';
            a.style.textShadow = '2px 2px 1px blue';
            a.posx = x.clientX - 20;
            a.posy = x.clientY - 20;
            a.spos = randf(-1, 1);
            
            let t = 0;
            let g = setInterval(() => {
                t++;
                a.style.top = a.posy - 2 * t;
                a.style.left = a.posx + Math.sin(t / 5 + a.spos) * 15;
                a.style.opacity = (110 - t) / 110;
                if (t === 110) {
                    clearInterval(g);
                    document.body.removeChild(a);
                }
            }, 20);
            global.stat.cat_c++;
            if (global.stat.cat_c < 333) skl.pet.use();
            w.innerHTML = 'There is a cat. Pets: ' + global.stat.cat_c;
            if (global.stat.cat_c >= 100) {
                if (!global.flags.cat_g) {
                    clr_chs(2);
                    chs('"???"', false).addEventListener('click', () => {
                        chs('Cat wants to tag along', true);
                        chs('"Take it with you"', false).addEventListener('click', () => {
                            get_cat();
                            msg('The cat decided to move into your house!', 'lime');
                            move_to_area(chss.rock_path);
                        });
                        chs('"Leave it as is"', false).addEventListener('click', () => {
                            move_to_area(chss.rock_path);
                        });
                    });
                    chs('"<= Return"', false).addEventListener('click', () => {
                        move_to_area(chss.rock_path);
                    })
                }
            }
        });
        if (global.stat.cat_c >= 100) {
            chs('"???"', false).addEventListener('click', () => {
                chs('Cat wants to tag along', true);
                chs('"Take it with you"', false).addEventListener('click', () => {
                    get_cat();
                    msg('The cat decided to move into your house!', 'lime');
                    move_to_area(chss.rock_path);
                });
                chs('"Leave it as is"', false).addEventListener('click', () => {
                    move_to_area(chss.rock_path);
                });
            });
        }
        
        chs('"<= Return"', false).addEventListener('click', () => {
            move_to_area(chss.rock_path);
        });
    }

    global.text.mbrdtt = [
        '"If you do not work your hours daily, you will not get any dessert"',
        '"Do your job well and you will be rewarded"',
        'There is a report of a missing cat',
        'There is a section of useless gossip',
        'This is an advertisement for fresh vegetables',
        'This is an advertisement for dojo membership',
        'This is an advertisement for wooden furniture',
        'This is an advertisement for dried meat',
        'This is an advertisement for joining the militia',
        '"The Hunter Association offers you a large variety of boxes full of smoked meat and furs"',
        'This is an advertisement for herbal medicine',
        'This is an advertisement for wine kegs',
        'This is an advertisement for farming equipment',
        'This is an advertisement for carpentery supplies',
        '"All the children must return home by 8PM!"',
        'This is an advertisement for smithing orders',
        'This is an advertisement for cooking courses',
        'This is an advertisement for bottled water',
        'This is an advertisement for knitting advices',
        'This is an advertisement for cleaning services',
        'This is a warning to stay away from fortune tellers',
        'This is an advertisement for woven straw baskets',
        'This is an advertisement for hemp clothing'
    ]

    chss.message_board = new Chs();
    chss.message_board.id = 108;
    add_to_sector(sector.vcent,chss.message_board);
    add_to_sector(sector.vmain1,chss.message_board);
    chss.message_board.sl=()=>{
        u_loc('Village Center, Message Board');

        for(let a in inv) if(inv[a].id===acc.wdl1.id||inv[a].id===acc.sdl1.id||inv[a].id===acc.bdl1.id||inv[a].id===acc.gdl1.id) {
        if(!global.flags.glqtdltn&&(getHour()<20&&getHour()>8)&&random()<.15){
            {
            chs('You notice a little girl with emerald green hair approach you.');
            achs('"?"', ()=>{
              chs('<span style="color:lime">Xiao Xiao</span>: "Hey, hey, what are those dolls you carry? Make one for me!!"');
              achs('"Alright..."', ()=>{
                  global.flags.glqtdltn=true;move_to_area(chss.message_board,false)
              });
            });
        }
        return}break}

        chs('Message Board<br>You can find jobs or other stuff here');
        achs('Explore the posts', ()=>{
            chs(select(global.text.mbrdtt));
            achs('<= Return', ()=>{
                move_to_area(chss.message_board,false);
            });    
        });  

        if (global.flags.forestn1b1g1) {
            achs('\'Notice #4\'', ()=>{
                chs('It says here:<br><span style="color:orange">Looking for a anyone with free time to assist local militia with guarding duty. Apply at the checkpoint near marketplace area between 7AM and 10AM."</span>',true);
                achs('"Huh..."', ()=>{
                    global.flags.grddtjb=true;move_to_area(chss.message_board);
                });    
            });

            achs('\'Warning!\'', ()=> {
                chs('"Dangerous beasts were sighted in vicinity of the Southern Forest. These reports are likely linked to the cause of livestock and locals getting injured, therefore, to avoid further casualties, entry into the forest is prohibited to those without permit or high enough self-defence ability until the situation is resolved."<br><br><div style="text-align:right">一Head of The Guard, Hitoshi</div>');
                achs('"I see..."', ()=>{
                    move_to_area(chss.message_board);
                });
            });
        }

        if(global.flags.glqtdltn&&!global.flags.glqtdldn&&(getHour()<20&&getHour()>8)){
            achs('Xiao Xiao =>', ()=>{
                move_to_area(chss.xpgdqt1,false);
            });
        }

        achs('<= Go back', ()=>{
            move_to_area(chss.village_center,false);
        });    
    }

    chss.xpgdqt1 = new Chs();
    chss.xpgdqt1.id = 167;
    add_to_sector(sector.vcent,chss.xpgdqt1);
    add_to_sector(sector.vmain1,chss.xpgdqt1)
    chss.xpgdqt1.sl=()=>{ 
        u_loc('Village Center, Message Board');
        chs('<span style="color:lime">Xiao Xiao</span>: "What is it what is it?"',true);
        let dl1=findbyid(inv,acc.wdl1.id);
        let dl2=findbyid(inv,acc.sdl1.id);
        let dl3=findbyid(inv,acc.bdl1.id);
        let dl4=findbyid(inv,acc.gdl1.id);
        if(dl1){
            chs('"Show Xiao Xiao a wooden doll"',false).addEventListener('click',()=>{
                chs('<span style="color:lime">Xiao Xiao</span>: "Nooooo it\'s ugly!!"',true);
                chs('"<= Take it back"',false).addEventListener('click',()=>{
                    move_to_area(chss.xpgdqt1,false);
                });
            });
        }
        if(dl2){
            chs('"Show Xiao Xiao a straw doll"',false).addEventListener('click',()=>{
                chs('<span style="color:lime">Xiao Xiao</span>: "Nooooo it\'s creepy!!"',true);
                chs('"<= Take it back"',false).addEventListener('click',()=>{
                    move_to_area(chss.xpgdqt1,false);
                });
            });
        }
        if(dl3){
            chs('"Show Xiao Xiao a bone doll"',false).addEventListener('click',()=>{
                chs('<span style="color:lime">Xiao Xiao</span>: "Nooooo it\'s scary!!"',true);
                chs('"<= Take it back"',false).addEventListener('click',()=>{
                    move_to_area(chss.xpgdqt1,false);
                });
            });
        }
        if(dl4){
            chs('"Show Xiao Xiao a soul doll"',false).addEventListener('click',()=>{
                chs('<span style="color:lime">Xiao Xiao</span>: "Waai thank you! I love it! I\'ll give you this! Here, take!"<br><br><span style="color:lightgrey">The girl happily runs away with her new toy</span>',true);
                chs('"Claim your hardearned reward"',false).addEventListener('click',()=>{
                    removeItem(dl4);
                    global.flags.glqtdldn=true;
                    global.offline_evil_index-=.002;
                    msg('You feel more peaceful','gold');
                    giveItem(acc.ubrlc);
                    move_to_area(chss.message_board,false);
                });
            });
        }
        chs('"<= Return"',false).addEventListener('click',()=>{
            move_to_area(chss.message_board,false);
        });    
    }

    chss.trd = new Chs();
    chss.trd.id = 109;
    chss.trd.sl=function(b, x, last_location_id){
        global.flags.rdng=true;
        let rd = skl.rdg.use();
        b.data.timep=b.data.timep||0;
        b.cmax = (b.data.time*(1/(1+(rd)/10))/you.mods.rdgrt)-(1/(1+(rd)/10)-1)/you.mods.rdgrt; let c = b.cmax-b.data.timep; if(c<0)c=0; 
        let ttxt; if(c>HOUR) ttxt= (c/HOUR<<0)+'</span> hours to finish'; else ttxt = (c<<0)+'</span> minutes to finish';
        dom.trdc=chs('',true); dom.trd = addElement(dom.trdc,'span');dom.trd.innerHTML='You are reading <span style="color:orange">'+b.name+'</span><br>It will take you about <span style="color:lime">'+ttxt;
        dom.trddots = addElement(dom.trdc,'span'); dom.trddots.frames=['','.','..','...']; dom.trddots.frame=0; dom.trddots.style.position='absolute';
        timers.rdngdots = setInterval(()=>{dom.trddots.innerHTML=dom.trddots.frames[(dom.trddots.frame=dom.trddots.frame>2?0:++dom.trddots.frame)]},333);
        timers.rdng = setInterval(()=>{
            global.stat.rdgtttl++;
            let rd = skl.rdg.use();
            giveSkExp(skl.rdg,x||1);
            b.cmax = (b.data.time*(1/(1+(rd)/10))/you.mods.rdgrt)-(1/(1+(rd)/10)-1)/you.mods.rdgrt;
            let c = b.cmax-b.data.timep;
            if(c<0)c=0;

            let ttxt;
            if(c>HOUR) ttxt= (c/HOUR<<0)+'</span> hours to finish';
            else ttxt = (c<<0)+'</span> minutes to finish';

            dom.trd.innerHTML='You are reading <span style="color:orange">'+b.name+'</span><br>It will take you about <span style="color:lime">'+ttxt;
            if(++b.data.timep>=b.cmax) {
                clearInterval(timers.rdng);
                clearInterval(timers.rdngdots);
                global.stat.rdttl++;
                global.flags.rdng=false;
                for(let gg in chss)if(chss[gg].id === last_location_id)chss[gg].sl();
                b.use();
                reduce(b);
                b.data.timep=0;
            }
        }, 1000);

        chs('"Stop reading"',false).addEventListener('click',()=>{ 
            clearInterval(timers.rdng);
            clearInterval(timers.rdngdots);
            global.flags.rdng=false;
            for(let gg in chss)if(chss[gg].id === last_location_id)chss[gg].sl();
        });
    }


    chss.bsmnthm1 = new Chs(); chss.bsmnthm1.id = 158; add_to_sector(sector.home,chss.bsmnthm1); chss.bsmnthm1.effectors=[{e:effector.dark}]
    chss.bsmnthm1.sl=()=>{u_loc('Your Home, Basement'); 
      if(zone.hmbsmnt.size>0) {
        chs('Argh! This place is infested!',true,'red');
        zone_init(zone.hmbsmnt); 
      } else {if(!cansee())chs(select(global.text.bsseldark)+'. You can\'t see anything in this darkness, it\'ll be better if you find a lightsource',true,'darkgrey');else{
        chs(select(global.text.bssel),true);
        if(!global.flags.bsmntchck) chs('"Examine your surroundings"',false).addEventListener('click',()=>{ 
          if(!cansee()){
            chs('Your light went off..',true,'darkgrey');
            chs('"<= Return"',false).addEventListener('click',()=>{ 
              move_to_area(chss.home,false);
            });
          }else{
          chs("You glance around and find mountains of broken crates, shelves, boxes, furniture and other decaying goods. Don't expect to find anything of great value amongst this trash. Perhaps you can salvage at least something if you look careful enough"+(!global.flags.bsmntchstgt?', like that giant chest over there':''),true,'orange');
          if(!global.flags.bsmntchstgt)chs('"Seek significance of a massive container"',false).addEventListener('click',()=>{ 
            chs("It looks like an ordinary coffer, except it's unusually big and has a padlock, which thankfully isn't locked. You get a brilliant idea to carry this hunk-a-junk upstairs",true);
            chs('"Do exactly that"',false,'lime').addEventListener('click',()=>{ 
              global.flags.bsmntchstgt=true;giveFurniture(furniture.strgbx);move_to_area(chss.home,false); 
              msg('Phew! That felt like a workout! You won\'t need to descend into that awful basement anymore if you wish to access the Big Box','orange');
              msg('Your muscles feel stronger!','lime'); msg('STR increased by +1 permanently','lime'); you.sat*=.5; you.stra++; you.stat_r();
            });
          });
          if(!global.flags.bsmntsctgt)chs('"Rummage through rubble"',false).addEventListener('click',()=>{ 
            chs("Indeed, simply glancing over the rubble won\'t reveal you any hidden secrets, you think you better investigate everything carefully",true); 
            chs('"Prepare for further examination"',false).addEventListener('click',()=>{ 
              global.flags.bsmntsctgt=true; giveAction(act.scout); global.current_a.deactivate(); global.current_a=act.default; move_to_area(chss.bsmnthm1,false)
            });
          });
          chs('"<= Return"',false).addEventListener('click',()=>{ 
            move_to_area(chss.bsmnthm1,false);
          });
        }});}
      }
      chs('"<= Return"',false).addEventListener('click',()=>{ 
        move_to_area(chss.home,false);
      });
    }
    chss.bsmnthm1.data={scoutm:900,scout:0,scoutf:false,gets:[false,false],gotmod:0}
    chss.bsmnthm1.scout=[
      {c:.01,f:()=>{msg('You found a pouch with some coins!','lime');giveItem(item.cp,rand(1,5));giveItem(item.cn,rand(1,5));giveItem(item.cq,rand(1,5));chss.bsmnthm1.data.gets[0]=true;},exp:40},
      {c:.03,f:()=>{msg('You found a pile of scattered firewood, some logs seem useful but others have rotted completely. You decide to grab them anyway');giveItem(item.fwd1,rand(2,4));giveItem(item.wdc,(45,90));chss.bsmnthm1.data.gets[1]=true;},exp:10},
      {c:.03,f:()=>{
        chs('Among the rabble and remains of collapsed bookshelves you decide to confirm if anything survived. Rotten and soaked in basement juices books seems unsalvagable, bookshelves as well, you can\'t even tell if they are made of wood anymore. One of the books was incased into a small mound formed by rocks and sand, it seems surprisingly fine',true);
        chs('"<= I\'m taking this"',false).addEventListener('click',()=>{chss.bsmnthm1.data.gets[2]=true;giveItem(item.jnlbk);deactivateAct(global.current_a);move_to_area(chss.bsmnthm1,false)})
      },exp:15},
    ]; 
    chss.bsmnthm1.onScout=function(){scoutGeneric(this)}

    chss.home_bed = new Chs();
    chss.home_bed.id = 112;
    add_to_sector(sector.home, chss.home_bed)
    chss.home_bed.sl=()=>{
        u_loc('Bed, Your Home');
        let extra='';
        if(you.alive===false) {
            chs(select(['You lost consciousness...','You have been knocked out...','You passed out...']),true);
            you.alive=true}
        else {
            if(global.flags.catget) extra=select(['. Your cat is resting next to you', '. You feel warm']);
            chs('Great way to pass time'+extra,true);
        }
        achs('<= Get up', ()=>{ 
            move_to_area(chss.home); 
        });
    }
    chss.home_bed.onStay = function(){ 
        let hpr = (skl.sleep.use(home.bed)+(global.flags.catget ? 5 : 1)+1) << 0;  
        if (!effect.fei1.active && you.hp < you.hpmax) {
            you.hp + hpr <= you.hpmax ? you.hp += hpr : you.hp = you.hpmax;
            dom.d5_1_1.update();
        }
        // if(global.current_z.id!==-666&&random()<.00001){
        //   let ta = new Zone(); ta.id=-666;
        //   ta.name = 'Nightmare';
        //   ta.pop = [{crt:creature.ngtmr1,lvlmin:you.lvl,lvlmax:you.lvl,c:1}]; ta.protected=true;
        //   ta.onEnd=function(){zone_init(zone.nwh);global.flags.civil=true; global.flags.btl=false;}; global.flags.civil=false; global.flags.btl=true;
        //   ta.size = 1; z_bake(ta); zone_init(ta); dom.d7m.update(); msg('Your sins are crawling up on you','red')
        //}
    }
    chss.home_bed.onEnter=function(){
        global.flags.sleepmode=true;
        if (effect.slep.active===false) giveEff(you,effect.slep);
        global.timescale = you.timescale_sleeping;;
    }
    chss.home_bed.onLeave=function(){
        global.flags.sleepmode=false;
        global.timescale=1;
        removeEff(effect.slep); 
    }

    chss.ofrplc = new Chs(); chss.ofrplc.id = 117; add_to_sector(sector.home,chss.ofrplc)
        chss.ofrplc.sl=()=>{u_loc('Your Home, Fireplace'); let fire = findbyid(furn,furniture.frplc.id); 
        //dom.location_text.innerHTML+='<span style="color:orange;font-size:1.2em">&nbspⓞ<span>'
        let its = []
        if(findbyid(inv,item.fwd1.id)) its.push([findbyid(inv,item.fwd1.id),'some firewood',30])
        if(findbyid(inv,item.coal1.id)) its.push([findbyid(inv,item.coal1.id),'some coal',300])
        if(findbyid(inv,item.coal2.id)) its.push([findbyid(inv,item.coal2.id),'some charcoal',300])
        if(findbyid(inv,wpn.stk1.id)) its.push([findbyid(inv,wpn.stk1.id),'a stick',15])
        if(!global.text.fplcextra)global.text.fplcextra=['You\'ll need fire if you want to get some cooking done','You can warm up here if you light it up'];
        if(!global.text.frplcfrextra) global.text.frplcfrextra=["You notice the fire flickering slightly","Tiny fire is warming up the room","Comfy fire lights up the surroundings","Bright flame is roaring inside the Fireplace"];
        let textra0; if(fire.data.fuel===0) textra0='';else if(fire.data.fuel<=60) textra0=global.text.frplcfrextra[0]
        else if (fire.data.fuel>=130&&fire.data.fuel<=300) textra0=global.text.frplcfrextra[1];
        else if (fire.data.fuel>=300&&fire.data.fuel<=540) textra0=global.text.frplcfrextra[2];
        else if (fire.data.fuel>=540) textra0=global.text.frplcfrextra[3];
        dom.frpls=chs('Comfy fireplace. '+(select(global.text.fplcextra)+'<br>'+textra0),true);
        if(!global.flags.fplcgtwd) chs('"Retrieve spare firewood. You have a feeling you\'ll need it"',false).addEventListener('click',function(){
        msg("You have some lying around nearby",'orange'); global.flags.fplcgtwd=true;
        giveItem(item.fwd1,3); move_to_area(chss.ofrplc,false);
        });
        for(let a in its){
            chs('"'+(select(["Toss ","Throw "]))+its[a][1]+' into the fireplace"',false).addEventListener('click',function(){
            its[a][0].amount--; fire.data.fuel=fire.data.fuel+its[a][2]>its[a][2]?its[a][2]:fire.data.fuel+its[a][2]; 
            if(fire.data.fuel<=its[a][2]) dom.frpls.innerHTML=global.text.frplcfrextra[0]
            else if (fire.data.fuel>=130&&fire.data.fuel<=300) dom.frpls.innerHTML=global.text.frplcfrextra[1];
            else if (fire.data.fuel>=300&&fire.data.fuel<=540) dom.frpls.innerHTML=global.text.frplcfrextra[2];
            else if (fire.data.fuel>=540) dom.frpls.innerHTML=global.text.frplcfrextra[3];
            if (its[a][0].amount<=0) {removeItem(its[a][0]);dom.ctr_2.removeChild(this)} else if(global.sm===1) updateInv(inv.indexOf(its[a][0])); else if(global.sm===its[a][0]) updateInv(global.sinv.indexOf(its[a][0]));  
            });
        } ; 
        let afire = findbyid(furn,furniture.fwdpile.id); if(afire&&afire.data.fuel>0){
            chs('"Light a fire"',false,'orange').addEventListener('click',()=>{ 
            if(effect.fplc.active) msg('Fire is already on','orange'); else {afire.data.fuel--; fire.data.fuel+=16}
            });
        }
        chs('"<= Step away"',false).addEventListener('click',()=>{ 
            move_to_area(chss.home,false);
      });
      
    }

    chss.sboxhm = new Chs(); chss.sboxhm.id = 131; add_to_sector(sector.home,chss.sboxhm)
    chss.sboxhm.sl=()=>{ u_loc('Your Home, Storage Box'); 
    //  chs('"Your botomless storage container, full of your belongings"',true)
      chs_spec(3,home.trunk)
      chs('"<= Step Away"',false,'','',null,null,null,true).addEventListener('click',()=>{ 
        move_to_area(chss.home,false);
      });
    }

    global.text.catasound=['You are hearing weird sounds','Crunching sound echoes','Your feet sink into the muddy ground','You hear wailing',
    'Something growls in the distance','Damp stagnant air of the underground makes it difficult to breathe','You hear bones','You notice something move in the darkness',
    'You feel sinister aura','Aged walls have something written on them, but you are unable to decipher what it is','Bone bits are littered on the ground','Old rotting cloth is hanging from the walls','Something rusty sparkes from below','old stale air fills your lungs'];

    chss.catamn = new Chs(); chss.catamn.id = 132; add_to_sector(sector.cata1,chss.catamn); 
    chss.catamn.sl=()=>{ u_loc('Catacombs, The Entryway'); 
      chs('"You have entered the Catacombs"',true,'lightgrey','black')
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata1);
      });
      chs('"<= Exit"',false).addEventListener('click',()=>{ 
        move_to_area(chss.village_center);
      });
    }

    chss.cata1 = new Chs(); chss.cata1.id = 133; add_to_sector(sector.cata1,chss.cata1)
    chss.cata1.sl=()=>{ u_loc('Catacombs, The Casket Service');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata13);
      });
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata2);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.catamn);
      });
    }

    chss.cata2 = new Chs(); chss.cata2.id = 134; add_to_sector(sector.cata1,chss.cata2)
    chss.cata2.sl=()=>{ u_loc('Catacombs, The Mourning Hall');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata1);
      });
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata3);
      });
    }

    chss.cata3 = new Chs(); chss.cata3.id = 135; add_to_sector(sector.cata1,chss.cata3)
    chss.cata3.sl=()=>{ u_loc('Catacombs, The Last Breath');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata4);
      });
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata2);
      });
    }

    chss.cata4 = new Chs(); chss.cata4.id = 136; add_to_sector(sector.cata1,chss.cata4)
    chss.cata4.sl=()=>{ u_loc('Catacombs, Tunnel of the Dead');  
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata5);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata3);
      });
    }

    chss.cata5 = new Chs(); chss.cata5.id = 137; add_to_sector(sector.cata1,chss.cata5)
    chss.cata5.sl=()=>{ u_loc('Catacombs, Movement Below');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata6,false);
      });
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata12);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata4);
      });
    }

    chss.cata6 = new Chs(); chss.cata6.id = 138; add_to_sector(sector.cata1,chss.cata6)
    chss.cata6.sl=()=>{ u_loc('Catacombs, The Web Corridor');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata7);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata5);
      });
    }

    chss.cata7 = new Chs(); chss.cata7.id = 139; add_to_sector(sector.cata1,chss.cata7)
    chss.cata7.sl=()=>{ u_loc('Catacombs, Grievance'); 
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata8);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata6);
      });
    }

    chss.cata8 = new Chs(); chss.cata8.id = 140; add_to_sector(sector.cata1,chss.cata8)
    chss.cata8.sl=()=>{ u_loc('Catacombs, Forgotten Post');  
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata9);
      });
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata7);
      });
    }

    chss.cata9 = new Chs(); chss.cata9.id = 141; add_to_sector(sector.cata1,chss.cata9)
    chss.cata9.sl=()=>{ u_loc('Catacombs, Withered Hand');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata8);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata10);
      });
    }

    chss.cata10 = new Chs(); chss.cata10.id = 142; add_to_sector(sector.cata1,chss.cata10)
    chss.cata10.sl=()=>{ u_loc('Catacombs, The Rusted Arc');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata9);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata11);
      });
    }

    chss.cata11 = new Chs(); chss.cata11.id = 143; add_to_sector(sector.cata1,chss.cata11)
    chss.cata11.sl=()=>{ u_loc('Catacombs, Old One\'s Destination');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata10);
      });
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata12);
      });
    }

    chss.cata12 = new Chs(); chss.cata12.id = 144; add_to_sector(sector.cata1,chss.cata12)
    chss.cata12.sl=()=>{ u_loc('Catacombs, Thawing Candles'); 
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata11);
      });
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata5);
      });
    }

    chss.cata13 = new Chs(); chss.cata13.id = 145; add_to_sector(sector.cata1,chss.cata13)
    chss.cata13.sl=()=>{ u_loc('Catacombs, The Endless Echoes'); 
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata14);
      });
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata1);
      });
    }

    chss.cata14 = new Chs(); chss.cata14.id = 146; add_to_sector(sector.cata1,chss.cata14)
    chss.cata14.sl=()=>{ u_loc('Catacombs, The Dusty Underpass');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata15);
      });
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata13);
      });
    }

    chss.cata15 = new Chs(); chss.cata15.id = 147; add_to_sector(sector.cata1,chss.cata15)
    chss.cata15.sl=()=>{ u_loc('Catacombs, Light\'s Corner');  
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata16);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata14);
      });
    }

    chss.cata16 = new Chs(); chss.cata16.id = 148; add_to_sector(sector.cata1,chss.cata16)
    chss.cata16.sl=()=>{ u_loc('Catacombs, Son\'s Last Visit');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata17);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata15);
      });
    }

    chss.cata17 = new Chs(); chss.cata17.id = 149; add_to_sector(sector.cata1,chss.cata17)
    chss.cata17.sl=()=>{ u_loc('Catacombs, The Stone Plate');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata18);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata16);
      });
    }

    chss.cata18 = new Chs(); chss.cata18.id = 150; add_to_sector(sector.cata1,chss.cata18)
    chss.cata18.sl=()=>{ u_loc('Catacombs, Cracked Passageway');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata19);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata17);
      });
    }

    chss.cata19 = new Chs(); chss.cata19.id = 151; add_to_sector(sector.cata1,chss.cata19)
    chss.cata19.sl=()=>{ u_loc('Catacombs, The Limited Leeway'); 
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata20);
      });
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata18);
      });
    }

    chss.cata20 = new Chs(); chss.cata20.id = 152; add_to_sector(sector.cata1,chss.cata20)
    chss.cata20.sl=()=>{ u_loc('Catacombs, The Brittle Turn');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata19);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata21);
      });
    }

    chss.cata21 = new Chs(); chss.cata21.id = 153; add_to_sector(sector.cata1,chss.cata21)
    chss.cata21.sl=()=>{ u_loc('Catacombs, Bright Ray Above');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata20);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata22);
      });
    }

    chss.cata22 = new Chs(); chss.cata22.id = 154; add_to_sector(sector.cata1,chss.cata22)
    chss.cata22.sl=()=>{ u_loc('Catacombs, Nowhere To Run');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata21);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata23);
      });
    }

    chss.cata23 = new Chs(); chss.cata23.id = 155; add_to_sector(sector.cata1,chss.cata23)
    chss.cata23.sl=()=>{ u_loc('Catacombs, The Aging Room'); 
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata22);
      });
      chs('"↓ Move South"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata24);
      });
    }

    chss.cata24 = new Chs(); chss.cata24.id = 156; add_to_sector(sector.cata1,chss.cata24)
    chss.cata24.sl=()=>{ u_loc('Catacombs, Eleven Wisemen');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"↑ Move North"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata23);
      });
      chs('"← Move West"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata25);
      });
    }

    chss.cata25 = new Chs(); chss.cata25.id = 157; add_to_sector(sector.cata1,chss.cata25)
    chss.cata25.sl=()=>{ u_loc('Catacombs, The End Of Journey');
      chs(select(global.text.catasound),true,'lightgrey','black');
      chs('"→ Move East"',false).addEventListener('click',()=>{ 
        move_to_area(chss.cata24);
      });
    }


    chss.rock_path = new Chs();
    chss.rock_path.id = 702;
    chss.rock_path.sl = function() {
        clr_chs();
        u_loc('Village, Rock Path');
        
        // insert weather conditions here

        achs('=> Enter Training Grounds', () => {
            move_to_area(chss.training_grounds);
        }, 'yellow');

        /*
        if (!global.flags.catget && (global.flags.rockpath_showcat)) {
            achs('Approach the cat', () => {
                move_to_area(chss.cat1);
                if (!global.stat.cat_c) global.stat.cat_c = 0;
            });
        }
        */

        achs('Approach the river =>', () => {
            move_to_area(chss.river);
        })

        achs('=> Enter shack', () => {
            move_to_area(chss.shack);
        }, '#D9CBB0');
    };

    chss.training_grounds = new Chs();
    chss.training_grounds.id = 706;
    chss.training_grounds.sl = () => {
        u_loc('Training Grounds');

        chs("There are disciples meditating nearby. Their eyes are closed and they seem to be intently focusing.", true);

        achs('<= Return to Rock Path', () => {
            move_to_area(chss.rock_path);
        })
    }

    chss.river = new Chs();
    chss.river.id = 801;
    chss.river.sl = () => {
        u_loc('Village, River');

        chs("There is a quaint body of flowing water at the end of the path, behind some trees. The water seems to glisten underneath the world's light.", true);

        if (global.flags.spoken_to_river_man) {
            achs('=> Speak to the old man', () => {
                move_to_area(chss.riverman);
            })
        }

        if (!global.flags.drunk_from_river) {
            achs('=> Take a closer look', () => {
                move_to_area(chss.river_closer);
            })
        }

        achs('<= Go back to the Rock Path', () => {
            move_to_area(chss.rock_path);
        });
    }

    chss.river_closer = new Chs();
    chss.river_closer.id = 802;
    chss.river_closer.sl = () => {
        u_loc('Village, River');

        chs("As you get closer, the rushing of the stream begins to sound like a low whisper. The surface of the water seems to twinkle in an odd manner, as if both possessing and reflecting some sort of internal light.", true);

        if (!global.flags.drunk_from_river) {
            achs('Take a sip', () => {
                global.flags.drunk_from_river = true;
                move_to_area(chss.river_drink);
            });
        }

        //@Todo add option for water qi meditation

        achs('<= Back away', () => {
            move_to_area(chss.river);
        });
    }

    chss.river_drink = new Chs();
    chss.river_drink.id = 803;
    chss.river_drink.sl = () => {
        u_loc('Village, River');

        if (you.hp >= 7) {
            you.hp -= 5;
        } else {
            you.hp -= 1;
        }
        giveSkExp(skl.painr, 5);
        giveSkExp(skl.poisr, 5);

        dom.d5_1_1.update()

        chs('You crouch down by the water and reach underneath it with cupped hands. You take a sip of it, almost immediately puking. This was a bad idea. After some coughing and hacking, you wipe your mouth and stand upright.', true);
        achs('"Upsy-daisy..."', () => {
            if (global.flags.spoken_to_river_man) {
                move_to_area(chss.river);
            } else {
                move_to_area(chss.charintro_riverman);
            }
        });
    }

    chss.charintro_riverman = new Chs();
    chss.charintro_riverman.id = 804;
    chss.charintro_riverman.sl = () => {
        u_loc('Village, River');

        chs('Old Man: "Hey! You didn\'t drink the water, did you?!"');
        
        achs('"I have... Just a sip."', () => {
            chs('Old Man: "Are you serious? Don\'t you know you have to watch out for rivers like this?!"');
            achs('"No... why?"', () => {
                chs('Old Man: "*Sigh* ...it\'s the Qi in it. Bodies of water like rivers possess quite a lot of it... it\'s not good for the body."');
                achs('"Not good for the body?"', () => {
                    chs('Old Man: "No... not with your familiarity of it, anyway. It can mess you up, make you forget things, throw you off-balance from your goals. Of course, there are specialists all over that know how to properly purify the water for drinking."');
                    achs('"Since when did this start happening?"', () => {
                        chs('Old Man: "Heh... I remember it being like this for a little while when I was young, too. The energy present in all things in nature runs its course and finds its cycle disrupted. Nature mutates and evolves on its own, and sometimes it gives rise to something like this contamination. There are different things that can spur it on... its effects started getting stronger a couple months ago."');
                        achs('"Is there any way to stop it?"', () => {
                            chs('Old Man: "Why yes but, an endeavour like that might take the peace of living out of a young person with potential like yourself. Nature will run its course, and it\'ll all dissipate eventually, I\'m sure. For now, focus on saving your strength and growing stronger. You might need some rest after ingesting some of that water."');
                            achs('"I\'m not going to die, am I?"', () => {
                                chs('Old Man: "No, of course not. With just a sip, you should be fine. But, I will leave you with a special charm that should negate any onset implications from the river\'s Qi. Be careful out there. You never know what kind of power lies where, until it leaps out at you on a rest day."');
                                achs('"Thank you." *Take the charm*', () => {
                                    giveItem(acc.river_charm);
                                    global.flags.gotten_river_charm = true;
                                    move_to_area(chss.river);
                                })
                            });
                        })
                    })
                });
            });
        });
        
        achs('"No... I was only looking."', () => {
            chs('Old Man: "Thank goodness. You have to watch out for rivers like this..!"');
            achs('"Why is that?"', () => {
                chs('Old Man: "*Sigh* you don\'t know?...it\'s the Qi in it. Bodies of water like rivers possess quite a lot of it... it\'s not good for the body."');
                achs('"Not good for the body?"', () => {
                    chs('Old Man: "No... not with your familiarity of it, anyway. It can mess you up, make you forget things, throw you off-balance from your goals. Of course, there are specialists all over that know how to properly purify the water for drinking."');
                    achs('"Since when did this start happening?"', () => {
                        chs('Old Man: "Heh... I remember it being like this for a little while when I was young, too. The energy present in all things in nature runs its course and finds its cycle disrupted. Nature mutates and evolves on its own, and sometimes it gives rise to something like this contamination. There are different things that can spur it on... its effects started getting stronger a couple months ago."');
                        achs('"Is there any way to stop it?"', () => {
                            chs('Old Man: "Why yes but, an endeavour like that might take the peace of living out of a young person with potential like yourself. Nature will run its course, and it\'ll all dissipate eventually, I\'m sure. For now, focus on saving your strength and growing stronger. You might need some rest after ingesting some of that water."');
                            achs('"Thank you for the advice."', () => {
                                move_to_area(chss.river);
                            });
                        })
                    })
                });
            });
        });
    }

    chss.riverman = new Chs();
    chss.riverman.id = 805;
    chss.riverman.sl = () => {
        u_loc('Village, River');

        chs('Old Man: "You can never be too careful out there."', true)

        if (!global.flags.gotten_river_charm) {
            achs('"I drank some of the water."', () => {
                chs('Old Man: "Ugh, you\'re killing me!.. Why are so many youngsters trying to get themselves killed these days... For now, please just focus on saving your strength and growing stronger. You might need some rest after ingesting some of that water."');
                achs('I\'m not going to die, am I?', () => {
                    chs('Old Man: "No, of course not. With just a sip, you should be fine. But, I will leave you with a special charm that should negate any onset implications from the river\'s Qi. Be careful out there. You never know what kind of power lies where, until it leaps out at you on your worst day."');
                    achs('"Thank you." Take the charm', () => {
                        giveItem(acc.river_charm);
                        global.flags.gotten_river_charm = true;
                        move_to_area(chss.river);
                    })
                });
            })
        }

        achs('<= Leave the man', () => {
            move_to_area(chss.river);
        });
    }
}

window.listen_k = listen_k;
window.descsinfo = descsinfo;
window.renderItem = renderItem;
window.updateInv = updateInv;
window.removeItem = removeItem;
window.m_update = m_update;
window.chs = chs;
window.chs_spec = chs_spec;
window.renderFurniture = renderFurniture;
window.recshop = recshop;
window.rendershopitem = rendershopitem;
window.buycbs = buycbs;
window.rendertrunkitem = rendertrunkitem;
window.updateTrunkItem = updateTrunkItem;
window.updateTrunkLeftItem = updateTrunkLeftItem;
window.iftrunkopen = iftrunkopen;
window.iftrunkopenc = iftrunkopenc;
window.addToContainer = addToContainer;
window.removeFromContainer = removeFromContainer;
window.clr_chs = clr_chs;
window.move_to_area = move_to_area;
window.giveFurniture = giveFurniture;
window.activatef = activatef;
window.deactivatef = deactivatef;
window.Chs = Chs;
window.define_areas = define_areas;
