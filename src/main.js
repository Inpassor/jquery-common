const functions = [
    'isUndefined',
];

for (let i = 0, l = functions.length; i < l; i++) {
    let f = functions[i],
        fn = require('./functions/' + f);
    $[f] = fn[f];
}
