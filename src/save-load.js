function save(verbose=false) {  
    if (verbose===true) console.log("saving game...");

    const storage = window.localStorage;
    global.flags.savestate = true;
    global.stat.gsvs++;
    
    const now = new Date();
    global.last_save =
        now.getFullYear() + '/' +
        (now.getMonth() + 1) + '/' +
        now.getDate() + ' ' +
        now.getHours() + ':' +
        (now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes()) + ':' +
        (now.getSeconds() >= 10 ? now.getSeconds() : '0' + now.getSeconds());
    dom.save_load_extra.innerHTML = 'last save: ' + global.last_save;

    const freeze_previous = global.flags.m_freeze;
    global.flags.m_freeze = true;

    global.current_a.deactivate();
    dom.ct_bt3.style.backgroundColor = 'inherit';

    if (inSector(sector.home)) {
        for (let i in furn) deactivatef(furn[i]);
    }

    const equipped = [];
    if (you.eqp) {
        for (const k in you.eqp) {
            equipped.push(you.eqp[k]);
            unequip(you.eqp[k], { save: true });
        }
        you.stat_r();
    }

    if (you.eff) {
        for (const e of you.eff) {
            if (e?.type === 5 && e.onRemove) {
                e.onRemove();
            }
        }
    }
    
    let yu = {
        name:   you.name,
        title:  you.title.id,
        lvl:    you.lvl,
        exp:    you.exp,
        exp_t:  you.exp_t,
        sat:    you.sat,
        satmax: you.satmax,
        sat_r:  you.sat_r,
        hp:     you.hp,
        hpmax:  you.hpmax,
        hp_r:   you.hp_r,
        str:    you.str,
        str_r:  you.str_r,
        agl:    you.agl,
        agl_r:  you.agl_r,
        int:    you.int,
        int_r:  you.int_r,
        spd:    you.spd,
        spd_r:  you.spd_r,
        luck:   you.luck,
        stat_per_lvl: you.stat_per_lvl,
        wealth: you.wealth,
        crt:    you.crt,
        res:    you.res,
        mods:   you.mods,
        stra:   you.stra,
        strm:   you.strm,
        inta:   you.inta,
        intm:   you.intm,
        agla:   you.agla,
        aglm:   you.aglm,
        spda:   you.spda,
        spdm:   you.spdm,
        hpa:    you.hpa,
        hpm:    you.hpm,
        sata:   you.sata,
        satm:   you.satm,
        cls:    you.cls,
        ccls:   you.ccls,
        aff:    you.aff,
        maff:   you.maff,
        caff:   you.caff,
        cmaff:  you.cmaff,
        karma:  you.karma,
        ki:     you.ki
    };
    
    const effs = [];
    for (let i in you.eff) {
        if (you.eff[i].id) {
            effs.push({
                a: you.eff[i].id,
                b: you.eff[i].duration,
                c: you.eff[i].power || 1
            })
        }
        if (you.eff[i].type === 5) {
            you.eff[i].onGive();
        }
    }

    const skls = [];
    for (let i in you.skls) {
        const s = you.skls[i];
        skls.push({
            id:  s.id,
            lvl: s.lvl,
            mst: s.mlstn.map(m => m.g)
        });
    }

    const sklexp = [];
    for (let i in skl) {
        sklexp.push([
            skl[i].exp,
            skl[i].p
        ]);
    }

    const datasi = [];
    const datare = [];
    for (let i in item) {
        if (item[i].data.tried) datasi.push(item[i].id);
        if (item[i].data.finished) datare.push(item[i].id);
    }

    const a1 = {
        uid: global.uid,
        jj: global.stat,
        x: global.current_z.id,
        a: global.rm,
        b: global.sm,
        e: global.flags,
        f: global.spirits,
        g: global.msgs_max,
        j: time.minute,
        k: w_manager.duration,
        l: w_manager.curr.id,
        m: global.last_save,
        n: global.bg_r,
        o: global.bg_g,
        p: global.bg_b,
        q: global.bestiary,
        r: global.timehold,
        r2: global.timewold,
        datas: datasi,
        u: global.timescale,
        datar: datare,
        z: global.offline_evil_index,
        drdata: global.drdata
    };

    const rec = global.rec_d.map(r => ({ id: r.id, data: r.data }));

    const invsave = [[], [], [], [], [], []];
    for (let i in inv) {
        const idx = Math.max(0, Math.min(4, Math.floor(inv[i].id / 10000)));
        if (idx === 0) {
            invsave[0].push({ id: inv[i].id, amt: inv[i].amount, data: inv[i].data });
        } else {
            invsave[idx].push({
                id: inv[i].id,
                dp: inv[i].dp,
                toeq: !!scanbyuid(equipped, inv[i].data.uid),
                data: inv[i].data
            });
        }
    }

    for (let i in item) {
        if (item[i].save) {
            invsave[5].push({
                item: item[i].id,
                data: item[i].data
            });
        }
    }

    const zonesz = Object.values(zone).map(z => z.size);
    const furns = furn.map(f => ({ id: f.id, data: f.data }));

    const vendors = {};
    for (let v in vendor) {
        vendors[v] = {
            stock: vendor[v].stock.map(s => [s[0].id, s[1], s[2]]),
            data: vendor[v].data
        };
    }

    const titles = global.titles.map(t => t.id);

    const homef = {};
    for (let k in home) homef[k] = home[k].id;

    const quests = qsts.map(q => ({ id: q.id, data: q.data }));
    acts = acts.map(a => ({ id: a.id, data: a.data }));
    const sects = Object.values(sector).map(s => ({ id: s.id, data: s.data }));

    const conts = Object.values(container).map(c => ({
        id: c.id,
        c: c.c.map(i => ({
            id: i.item.id,
            data: i.data,
            amt: i.amt,
            dp: i.dp
        }))
    }));

    const chdata = [];
    for (let c in chss) {
        if (!objempty(chss[c].data)) {
            chdata.push({ id: chss[c].id, data: chss[c].data });
        }
    }

    const ttlg = [];
    for (let i in ttl) if (ttl[i].tget) ttlg.push(ttl[i].id);

    let str = [
        JSON.stringify(yu),
        JSON.stringify(effs),
        JSON.stringify(skls),
        JSON.stringify(sklexp),
        JSON.stringify(a1),
        JSON.stringify(rec),
        JSON.stringify(invsave),
        JSON.stringify(zonesz),
        JSON.stringify(dar),
        JSON.stringify(furns),
        JSON.stringify(vendors),
        JSON.stringify(titles),
        JSON.stringify(homef),
        JSON.stringify(quests),
        JSON.stringify(acts),
        JSON.stringify(sects),
        JSON.stringify(conts),
        JSON.stringify(chdata),
        'savevalid',
        JSON.stringify(ttlg)
    ].join('|');

    for (let i = 0; i < equipped.length; i++) {
        equip(equipped[i], { save: true });
    }
    you.stat_r();

    if (inSector(sector.home)) {
        for (let i in furn) activatef(furn[i]);
    }

    global.flags.m_freeze = freeze_previous;
    const raw_save = utf8_to_b64(str);
    storage.setItem("v0.3", raw_save);
    global.flags.savestate = false;

    //if (verbose===true) msg('Game Saved', 'cyan');
    if (verbose===true) console.log(`SAVE DATA (DEC): ${str}`)

    return raw_save;
}

function load(save_data, verbose=false) {
    if (verbose===true) console.log("Loading game...");

    if (!window.localStorage.getItem("v0.3")) {
        you.stat_r();
        //save(true);
        save();
    }

    let raw_data = save_data ?? window.localStorage.getItem("v0.3");
    if (!raw_data) {
        console.log("No save data was found.");
        return;
    }

    let dec_data = b64_to_utf8(raw_data);
    if (!dec_data) {
        console.log("Decoded save data is an empty string.");
        display_load_error();
        return;
    }

    let seg = dec_data.split('|');
    if (seg.length < 10) {
        console.log("Save data appears to be improperly truncated.");
        return;
    }

    if (verbose===true) console.log(`DECODED DATA STRING : ${dec_data}`);

    global.flags.loadstate = true;
    global.flags.rptbncgtf = false;
    global.flags.rptbncgt = false;
    global.menuo = 0;
    
    Object.values(timers).forEach(timer=>clearInterval(timer));

    empty(dom.d101);
    empty(dom.d101m);
    empty(dom.mscont);

    for (let a in ttl)    { ttl[a].have = false; ttl[a].tget = false; }
    for (let obj in item) { item[obj].amount = 0; item[obj].have = false; }
    for (let ab in skl)   { skl[ab].lvl = 0; skl[ab].exp = 0; }

    global.titles=[];
    inv=[];
    you.eff.forEach(e => e.active = false);
    you.eff = [];

    const yu_s = JSON.parse(seg[0]);
    Object.assign(you, {
        name: yu_s.name,
        exp: yu_s.exp,
        exp_t: yu_s.exp_t,
        sat: yu_s.sat,
        satmax: yu_s.satmax,
        hp: yu_s.hp,
        hpmax: yu_s.hpmax,
        wealth: yu_s.wealth,
        karma: yu_s.karma || 0,
        luck: yu_s.luck,
        crt: yu_s.crt,
        wealth: yu_s.wealth

    });
    you.expnext_t = you.expnext();

    you.sat_r = yu_s.sat_r;
    you.sata = yu_s.sata || 0;
    you.satm = yu_s.satm || 1;

    you.hp = yu_s.hp;
    you.hpmax = yu_s.hpmax;
    you.hp_r = yu_s.hp_r;
    you.hpa = yu_s.hpa || 0;
    you.hpm = yu_s.hpm || 1;
    you.hp = you.hp > you.hpmax ? you.hpmax : you.hp;
    ['str', 'agl', 'int', 'spd'].forEach(s => {
        you[s + '_r'] = yu_s[s + '_r'] || 1;
        you[s + 'a'] = yu_s[s + 'a'] || 0;
        you[s + 'm'] = yu_s[s + 'm'] || 1;
    });

    you.cls = yu_s.cls  || [0,0,0];
    you.ccls = yu_s.ccls || [0,0,0];
    you.aff = yu_s.aff  || [0,0,0,0,0,0,0];
    you.maff = yu_s.maff || [0,0,0,0,0,0,0];
    you.caff = yu_s.caff || [0,0,0,0,0,0,0];
    you.cmaff = yu_s.cmaff || [0,0,0,0,0,0,0];
    you.stat_per_lvl = yu_s.stat_per_lvl;
    you.karma = yu_s.karma || 0;
    you.ki = yu_s.ki || {};

    if (yu_s.title) {
        const ottl = Object.values(ttl).find(t=>t.id===yu_s.title);
        if (ottl) {
            you.title=ottl;
            you.lvl=yu_s.lvl;
        }
    }

    if (yu_s.res)  Object.assign(you.res, yu_s.res);
    if (yu_s.mods) Object.assign(you.mods, yu_s.mods);

    you.skls = [];
    const saved_skills = JSON.parse(seg[2]);
    const saved_skill_exp = JSON.parse(seg[3]);

    saved_skills.forEach(saved => {
          const skill_ref = Object.values(skl).find(s => s.id === saved.id);
          if (skill_ref) {
              you.skls.push(skill_ref);
              skill_ref.lvl = saved.lvl;
              if (saved.mst) {
                  saved.mst.forEach((gotten, i) => {
                      if (skill_ref.mlstn[i]) skill_ref.mlstn[i].g = gotten;
                  });
              }
              check_skill_milestone(skill_ref);
          }
    });

    let exp_idx=0;
    for (let s in skl) {
        if (saved_skill_exp[exp_idx]) {
            skl[s].exp = saved_skill_exp[exp_idx][0] || 0;
            skl[s].p = (saved_skill_exp[exp_idx][1] || 1);
            if (skl[s].p < 0.99) skl[s].p += 1;
            skl[s].expnext_t = skl[s].expnext();
        }
        exp_idx++;
    }

    let saved_eff = [];
    try {
        const parsed = JSON.parse(seg[1]);
        if (Array.isArray(parsed)) {
            saved_eff = parsed;
        } else if (parsed && typeof parsed === 'object') {
            saved_eff = Object.values(parsed);
        }
    } catch (e) {
        console.warn("Could not parse segment 1, will use an empty effects array as fallback.", e);
        saved_eff = [];
    }

    global.flags.loadstate = true;
    saved_eff.forEach(effData => {
        if (!effData || typeof effData.a !== 'number') return;

        const eff_t = Object.values(effect).find(e => e.id === effData.a);
        if (eff_t) {
            if (eff_t.save !== false) {
                giveEff(you, eff_t, effData.b ?? 0, effData.c ?? 0);
            } else {
                eff_t.onRemove?.();
            }
        }
    });
    global.flags.loadstate = false;

    const d_global = JSON.parse(seg[4]);
    global.sm = d_global.b;
    global.rm = d_global.a;
    global.spirits = d_global.f;
    global.uid = d_global.uid;
    global.msgs_max = d_global.g || 300;
    global.bestiary = d_global.q;
    global.timehold = d_global.r || Math.floor(time.minute / DAY);
    global.timewold = d_global.r2 || Math.floor(time.minute / WEEK);
    global.last_save = d_global.m;
    global.timescale = d_global.u || 1;
    global.offline_evil_index = d_global.z || 1;
    global.drdata = d_global.drdata || {};

    global.bg_r = d_global.n;
    global.bg_g = d_global.o;
    global.bg_b = d_global.p;

    time.minute = d_global.j;
    timeConv(time);

    if (d_global.l) {
        const oweather = Object.values(weather).find(w => w.id === d_global.l);
        if (oweather) setWeather(oweather, d_global.k);
    }

    for (let key in global.stat) {
        global.stat[key] = d_global.jj?.[key] || 0;
    }
    if (global.stat.sttime === 0) {
        const now = new Date();
        global.stat.sttime = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        if (global.stat.msts === 0) global.stat.msts = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
        if (global.stat.msks === 0) global.stat.msks = [0,0,0,0,0,0,0];
    }

    d_global.datas?.forEach(id => {
        const itm = Object.values(item).find(i => i.id === id);
        if (itm) itm.data.tried = true;
    });
    d_global.datar?.forEach(id => {
        const itm = Object.values(item).find(i => i.id === id);
        if (itm) itm.data.finished = true;
    });

    global.rec_d = [];
    for (let key in rcp) rcp[key].have = false;

    const saved_rec = JSON.parse(seg[5]);
    saved_rec.forEach(saved => {
        const recipe = Object.values(rcp).find(r => r.id === saved.id);
        if (recipe) {
            global.rec_d.push(recipe);
            recipe.have = true;
            recipe.data = saved.data || {};
        }
    });

    const d_inv = JSON.parse(seg[6]);
    you.eqp = Array(10).fill(eqp.dummy);

    const load_item_group = (group, d_arr, is_equip=false) => {
        d_arr.forEach(e => {
            const template = Object.values(group).find(obj=>obj.id===e.id);
            if (template) {
                const itm = giveItem(template, e.amt??1, true);
                itm.new=false;
                itm.dp=e.dp;
                if (e.data) Object.assign(itm.data, e.data);
                if  (is_equip&&e.toeq) {
                    if (itm.slot === 5 && you.eqp[5].id === 10000) itm.slot=6;
                    equip(itm, {save:true});
                }
            }
        })
    }

    if (d_inv[0]) load_item_group(item, d_inv[0]);
    if (d_inv[1]) load_item_group(wpn, d_inv[1], true);
    if (d_inv[2]) load_item_group(eqp, d_inv[2], true);
    if (d_inv[3]) load_item_group(sld, d_inv[3], true);
    if (d_inv[4]) load_item_group(acc, d_inv[4], true);

    if (d_inv[5]) {
        d_inv[5].forEach(e => {
            const itm = Object.values(item).find(i=>i.id===e.item);
            if (itm) itm.data = e.data;
        })
    }

    if (you.eqp[0].id === 10000) {
        you.eqp[0].cls[2] = Math.floor(you.lvl / 4);
        you.eqp[0].aff[0] = Math.floor(you.lvl / 5);
        you.eqp[0].ctype = 2;
    }

    const zone_sizes = JSON.parse(seg[7]);
    let zone_idx=0;
    for (let z in zone) {
        if (zone_sizes[zone_idx] !== undefined) {
            zone[z].size = zone_sizes[zone_idx++];
        }
    }

    /* @Todo  is this even needed?  */
    const discoveries = JSON.parse(seg[8]);
    const set_discovered = (group, ids) => ids.forEach(id => {
        const obj = Object.values(group).find(o => o.id === id);
        if (obj) obj.data.dscv = true;
    });
    if (discoveries[0]) set_discovered(item, discoveries[0]);
    if (discoveries[1]) set_discovered(wpn, discoveries[1]);
    if (discoveries[2]) set_discovered(eqp, discoveries[2]);
    if (discoveries[3]) set_discovered(sld, discoveries[3]);
    if (discoveries[4]) set_discovered(acc, discoveries[4]);

    furn = [];
    const saved_furn = JSON.parse(seg[9]);
    saved_furn.forEach(saved => {
        if (saved.data?.amount > 0) {
            const template = Object.values(furniture).find(f => f.id === saved.id);
            if (template) {
                const inst = template;
                inst.data = saved.data;
                furn.push(inst);
            }
        }
    });

    const d_vendor = JSON.parse(seg[10]);
    for (let v in vendor) {
        if (d_vendor[v]?.stock) {
            const vd = d_vendor[v];
            vendor[v].stock = vd.stock.map(stockitm => {
                const group = itemgroup[Math.floor((stockitm[0] + 1) / 10000)];
                return [Object.values(group).find(i => i.id === stockitm[0]) || stockitm[0], stockitm[1]];
            });
            vendor[v].data = vd.data || {};
            if (!vendor[v].data.time || vendor[v].data.time < 0) vendor[v].data.time = 1;
        } else {
            restock(vendor[v]);
        }
    }

    const earned_titles = JSON.parse(seg[11]);
    earned_titles.forEach(id => {
        const title = Object.values(ttl).find(t => t.id === id);
        if (title) {
            global.titles.push(title);
            title.have = true;
        }
    });

    let home_layout_raw;
    try {
        home_layout_raw = JSON.parse(seg[12] || '[]');
    } catch (e) {
        console.warn("Invalid home layout data has been parsed, will reset to empty.", e);
        home_layout_raw = [];
    }

    let home_ids = [];
    if (Array.isArray(home_layout_raw)) {
        home_ids = home_layout_raw;
    } else if (home_layout_raw && typeof home_layout_raw === 'object') {
        home_ids = Object.values(home_layout_raw);
    } else if (home_layout_raw != null) {
        home_ids = [home_layout_raw];
    }

    home = [];
    home_ids.forEach(id => {
        const furnitm = furn.find(f => f.id === id);
        if (furnitm) home.push(furnitm);
    });

    if (!home.trunk) home.trunk = container.home_strg;

    qsts = [];
    const d_quests = JSON.parse(seg[13]);
    d_quests.forEach(saved => {
        const template = Object.values(quest).find(q => q.id === saved.id);
        if (template) {
            const inst = Object.assign({}, template);
            inst.data = saved.data;
            if (inst.callback) inst.callback();
            qsts.push(inst);
        }
    });

    acts = [];
    for (let a in act) {
        act[a].have = false;
        act[a].data = {};
        act[a].active = false;
    }
    const d_action = JSON.parse(seg[14]);
    d_action.forEach(saved => {
        const template = Object.values(act).find(a => a.id === saved.id);
        if (template) {
            acts.push(template);
            template.have = true;
            template.data = saved.data;
        }
    });

    for (let s in sectors) sectors[s].onLeave?.();
    sectors = [];
    const d_sector = JSON.parse(seg[15]);
    d_sector.forEach(saved => {
        const sec = Object.values(sector).find(s => s.id === saved.id);
        if (sec) {
            if (!objempty(saved.data)) {
                Object.assign(sec.data, saved.data);
            } else if (sec.default_data) {
                sec.data = sec.default_data;
            }
        }
    });

    clearInterval(timers.vndrstkchk);
    if (d_global.i) {
        const location = Object.values(chss).find(c => c.id === d_global.i);
        if (location) {
            global.current_location = location;
            move_to_area(location, false);
        }
    }

    let d_container = JSON.parse(seg[16]);
    if (d_container[0] && !d_container[0].c) {
        d_container = [{ id: 1, c: d_container }];
    }
    for (let c in container) container[c].c = [];
    d_container.forEach(cont => {
        const target = Object.values(container).find(cn => cn.id === cont.id);
        if (target) {
            cont.c.forEach(entry => {
                const group = itemgroup[Math.floor((entry.id + 1) / 10000)];
                const template = Object.values(group).find(i => i.id === entry.id);
                if (template) {
                    target.c.push({
                        item: template,
                        amt: entry.amt,
                        dp: entry.dp,
                        data: entry.data || {}
                    });
                }
            });
        }
    });

    const d_area = JSON.parse(seg[17]);
    d_area.forEach(saved => {
        const area = Object.values(chss).find(a => a.id === saved.id);
        if (area && !objempty(saved.data)) {
            area.data = saved.data;
        }
    });

    if (seg[19]) {
        const titles_gotten = JSON.parse(seg[19]);
        titles_gotten.forEach(id => {
            const title = Object.values(ttl).find(t => t.id === id);
            if (title) title.tget = true;
        });
    }

    for (let t in ttl) {
        if (ttl[t].have && ttl[t].talent && !ttl[t].tget) {
            ttl[t].talent();
            ttl[t].tget = true;
        }
    }

    isort(global.sm);
    rsort(global.rm);
    rstcrtthg();
    if (global.rm) global.spbtsr[global.rm].style.color = 'yellow';

    dom.d2.innerHTML = you.name;
    eqpres();
    unequip(you.eqp[4], { save: true });
    unequip(you.eqp[5], { save: true });
    you.stat_r();

    dom.d5_1_1.update();
    dom.d5_2_1.update();
    dom.d6.update();
    update_db();
    update_d();
    dom.d3.update();
    update_m();
    m_update();
    dom.d7m.update();
    dom.d5_3_1.update();

    global.flags = d_global.e || {};
    global.flags.rdng = false;
    global.flags.civil = true;
    global.flags.btl = false;
    global.flags.sleepmode = false;
    global.flags.loadstate = false;
    global.flags.savestate = false;
    global.flags.m_freeze = false;
    global.timescale = d_global.u || 1;
    global.current_z = zone.nwh;
    global.current_m = creature.default;
    global.current_a = act.default;

    wManager();
    dom.d_moon.innerHTML = global.text.lunarp[getLunarPhase()][0];
    addDesc(dom.d_moon, null, 2, 'Lunar Phase', global.text.lunarp[getLunarPhase()][1]);
    wdrseason(global.flags.ssngaijin);
    dom.d_moon.style.display = global.flags.isday ? 'none' : '';

    if (global.last_save) dom.save_load_extra.innerHTML = 'last save: ' + global.last_save;
    dom.nthngdsp.style.display = 'none';
    dom.ctrwin6.style.display = 'none';
    invbtsrst();

    dom.d_time.innerHTML = '<small>' + getDay(global.flags.tmmode || 2) + '</small> ' + timeDisp(time);

    if (!global.flags.stbxinifld) {
        addToContainer(home.trunk, eqp.gnt);
        addToContainer(home.trunk, acc.fmlim);
        addToContainer(home.trunk, wpn.bdsrd);
        addToContainer(home.trunk, item.toolbx);
        addToContainer(home.trunk, sld.tge);
        addToContainer(home.trunk, item.bonig);
        global.flags.stbxinifld = true;
    }

    if (global.flags.bgspc) {
        document.body.style.background = 'linear-gradient(180deg,#000,#123)';
    } else {
        document.body.style.backgroundColor = `rgb(${global.bg_r},${global.bg_g},${global.bg_b})`;
    }

    if (dom.bkssttbd) {
        empty(dom.bkssttbd);
        document.body.removeChild(dom.bkssttbd);
        global.flags.bksstt = false;
    }

    if (global.flags.autosave === true) {
        dom.autosves_checkbox.checked = true;
        timers.autos = setInterval(() => save(false), 30000);
    }

    if (skl.pet.lvl >= 10) giveTitle(ttl.pet3);
    if (item.amrthsck.data.finished) giveRcp(rcp.appljc);

    if (dom.loading) fade(dom.loading, 5, true);
    if (dom.loadingt) fade(dom.loadingt, 5, true);

    global.flags.loadstate = false;
    global.flags.savestate = false;

    if (verbose) console.log("Loaded.");
}



function display_load_error() {
    dom.error = addElement(document.body,'div', 'terror', 'error');
    dom.error.style.width='100%';
    dom.error.style.height='auto';
    dom.error.style.position='absolute';
    dom.error.style.fontSize='2em';
    dom.error.style.color='red';
    dom.error.style.zIndex=4000;
    dom.error.style.lineHeight='normal';
    dom.error.style.opacity=0;

    setTimeout(function() {
        appear(dom.error)}, 500);

    dom.error.style.textAlign='center';
    dom.error.innerHTML='SOMETHING BROKE<br>PERHAPS DUE TO STUPIDITY OR DATA STRUCTURE CHANGES<br>⋗1 DELETING THE SAVE IS ADVISED<br>⋗2 OR WAITING FOR SOME TIME TIL FIXED<br>⋗3 OR CHECKING IN DIFFERENT BROWSER, MIGHT WORK THERE(MEANS THE SAVE IS BORKED(REFER TO 1))';
}


window.save = save;
window.load = load;
window.display_load_error = display_load_error;
