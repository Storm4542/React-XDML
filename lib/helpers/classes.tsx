function classes(...names: (string | undefined)[]) {
    return names.filter(Boolean).join(' ');
}

function scopedClassMaker(prefix: string) {
    return function x(name?: string) {
        return [prefix, name].filter(Boolean).join('-');
    };
}

export  {classes, scopedClassMaker};
