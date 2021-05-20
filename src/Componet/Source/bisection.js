const Parser = require('expr-eval').Parser;

export function bisection( in_xl, in_xr, in_err,in_equa) {

    let arr = [];

    let Equation = in_equa;
    let XL = in_xl;
    XL = parseFloat(XL);
    let XR = in_xr;
    XR = parseFloat(XR);
    let ERROR = in_err;
    ERROR = parseFloat(ERROR);

    let Xmid = (XL+XR)/2;
    let XM = 0;
    let errer_sum = 1;

    var expression = Parser.parse(Equation);
    let result = expression.evaluate({ x: Xmid }) * expression.evaluate({ x: XR });

    (result < 0) ? (XL = Xmid) : XR = Xmid;

        while(errer_sum > ERROR){
            XM = (XL+XR)/2;

            result = expression.evaluate({ x: XM }) * expression.evaluate({ x: XR });

            (result < 0) ? (XL = XM) : (XR = XM);

            errer_sum = Math.abs((XM-Xmid)/XM);
            Xmid = XM;
            arr.push([XM,errer_sum]);
        }
        return arr;
}