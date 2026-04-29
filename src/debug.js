function __dbggiveeverything() {
    for(let a in item) giveItem(item[a], 99);
    for(let a in wpn) giveItem(wpn[a]);
    for(let a in eqp) giveItem(eqp[a]);
    for(let a in sld) giveItem(sld[a]);
    for(let a in acc) giveItem(acc[a]);
    for(let a in ttl) giveTitle(ttl[a]);
    for(let a in rcp) giveRcp(rcp[a]);
    
    return "All items attempted to be given to the player.";
}

function __dbggivewpn() {
    giveItem(wpn.scspt2);
    return "Blue Hand given to player.";
}

function __dbggiveeveryskill() {
    for(let a in skl) giveSkExp(skl[a], 51); // 51 is the cut-off for displaying skills
    dom.d5_1_1.update();
    return "All skills attempted to be given to the player.";
}

function get_cat() {
    global.flags.cat_g = true;
    let cat = giveFurniture(furniture.cat, true, false);
    cat.data.sex = rand(1);
    cat.data.c = rand(global.text.cfc.length - 1);
    cat.data.p = rand(global.text.cfp.length - 1);
    cat.data.l1 = rand(global.text.cln.length - 1);
    let tg = rand(global.text.cln.length - 1);
    do {
        tg = rand(global.text.cln.length - 1)
    } while (tg === cat.data.l1);
    cat.data.l2 = rand(global.text.cln.length - 1);
    global.flags.catget = true;
}

function __heal() {
    you.hp = you.hpmax;
    dom.d5_1_1.update();
}

// create a new choice and add an event listener to it that triggers an action
function achs(txt, action, color=null) {
    let chs_elem = chs(txt, false, color);
    chs_elem.addEventListener('click', () => {
        action();
    });
    return chs_elem;
}

function check_if_money_should_appear() {
    if (global.flags.m_un) {
        appear(dom.mn_2,
              dom.mn_3,
              dom.mn_4);
    }
}

function __dbgsp() { // debug : send placeholder message in message log
    msg('PLACEHOLDER : TO BE ADDED', 'red');
}

function __dbgqs() { // quickstart, reveal all the menus/alter flags to show info that would be revealed after intro
    empty(dom.mscont)     // clear message log  

    appear(dom.d_weather, dom.d_weathert); // show weather
    appear(dom.location); // show location
    appear(dom.d0);       // show player menu
    appear(dom.gmsgs);    // show message log
    appear(dom.d1m);      // monsta
    appear(dom.d_time);
    appear(dom.inv_ctx);  // show inventory
    appear(dom.ct_ctrl);  // center-bottom clickables

    global.flags.aw_u  = true;
    global.flags.dm1ap = true;
    global.flags.asbu  = true;
    global.flags.sklu  = true;
    global.flags.actsu = true;
    global.flags.jnlu  = true;

    m_update();
}


window.__dbggiveeverything = __dbggiveeverything;
window.__dbggivewpn = __dbggivewpn;
window.__dbggiveeveryskill = __dbggiveeveryskill;
window.get_cat = get_cat;
window.__heal = __heal;
window.achs = achs;
window.check_if_money_should_appear = check_if_money_should_appear;
window.__dbgsp = __dbgsp;
window.__dbgqs = __dbgqs;
