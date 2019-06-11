interface Options {
    extra?: string | undefined
}

interface ClassToggles {
    [Key: string]: boolean,
}

function classes(...names: (string | undefined)[]) {
    return names.filter(Boolean).join(' ');
}

function scopedClassMaker(prefix: string) {

    return function (name?: string | ClassToggles, options?: Options) {
        let newName;
        // name = {hasAside:true,active :false}
        let result;
        if (typeof name === 'string' || typeof name === 'undefined') {
            newName = name;
            result = [prefix, newName].filter(Boolean).join('-');
        } else {
            newName = Object.entries(name).filter(kv => kv[1]).map(kv => kv[0]);
            // name2 = ['hasAside']
            result = newName.map(kv => [prefix, kv].filter(Boolean).join('-')).join(' ');
        }

        if (options && options.extra) {
            return [result, options && options.extra].filter(Boolean).join(' ');
        } else {
            return result;
        }
    };
}

export {classes, scopedClassMaker};
