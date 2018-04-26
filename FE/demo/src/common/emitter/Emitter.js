export default class Emitter {
    on(event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks[event] = this._callbacks[event] || [])
            .push(fn);
        return this;
    }

    once(event, fn) {
        var self = this;
        this._callbacks = this._callbacks || {};

        function on() {
            self.off(event, on);
            fn.apply(this, arguments);
        }

        on.fn = fn;
        this.on(event, on);
        return this;
    }

    off(event, fn) {
        this._callbacks = this._callbacks || {};

        // all
        if (0 == arguments.length) {
            this._callbacks = {};
            return this;
        }

        // specific event
        var callbacks = this._callbacks[event];
        if (!callbacks) return this;

        // remove all handlers
        if (1 == arguments.length) {
            delete this._callbacks[event];
            return this;
        }

        // remove specific handler
        var cb;
        for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
                callbacks.splice(i, 1);
                break;
            }
        }
        return this;
    }

    emit(event){
        this._callbacks = this._callbacks || {};
        var args = [].slice.call(arguments, 1)
            , callbacks = this._callbacks[event];

        if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0, len = callbacks.length; i < len; ++i) {
                callbacks[i].apply(this, args);
            }
        }

        return this;
    }

    listeners(event){
        this._callbacks = this._callbacks || {};
        return this._callbacks[event] || [];
    }
    
    hasListeners(event){
        return !! this.listeners(event).length;
    }
}

Emitter.prototype.addEventListener = Emitter.prototype.on;
Emitter.prototype.removeEventListener = Emitter.prototype.off;
