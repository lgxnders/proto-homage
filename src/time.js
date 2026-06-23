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


window.Time = Time;
window.callbackManager = callbackManager;
window.attachCallback = attachCallback;
window.detachCallback = detachCallback;