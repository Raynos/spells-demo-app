module.exports = Observable

/*  type Observable<T> := {
        () => T &
        (Function<T>) => void,
        set: (T) => void
    }

    Observable := (T) => Observable<T>
*/
function Observable(value) {
    var listeners = []
    observable.set = function (v) {
        value = v
        listeners.forEach(function (f) {
            return f(v)
        })
    }

    return observable

    function observable(listener) {
        if (!listener) {
            return value
        }

        listeners.push(listener)

        return function remove() {
            listeners.splice(listeners.indexOf(listener), 1)
        }
    }
}
