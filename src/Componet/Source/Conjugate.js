var math = require('mathjs');

export function Conjugates(a,b,x,err){
    let r = math.multiply(-1,b);
    let coss = 1;
    let data = [];

    let d = math.multiply(-1,r)
    let ramda = math.multiply(math.multiply(-1,math.transpose(d)),r)/math.multiply(math.transpose(d),math.multiply(a,d));

    console.log("ramda : " + ramda.toString());

    for(let i = 0;i < x.length;i++){
        x[i] = x[i] + (d[i]*ramda);
    }

    let aws = [];
    aws.push(<div key={coss}>Iteration {coss}</div>)
    for(let i = 0;i < x.length;i++){
        aws.push(<div key={coss}>x{i+1} : {x[i]}</div>);
    }
    data.push(aws);
    coss++;
    let error_ = 99999999999999
    
    while(error_ > err){
        let error_old = error_;
        let temp = math.multiply(a,x);
        
        for(let i = 0;i < b.length;i++){
            r[i] = temp[i] - b[i];
        }

        let alpha =  math.multiply(math.multiply(math.transpose(r),a),d)/math.multiply(math.multiply(math.transpose(d),a),d)

        for(let i = 0;i < b.length;i++){
            d[i] = (r[i]*-1)+(alpha*d[i]);
        }
        let ramda = math.multiply(math.multiply(-1,math.transpose(d)),r)/math.multiply(math.transpose(d),math.multiply(a,d));


        for(let i = 0;i < x.length;i++){
            x[i] = x[i] + (d[i]*ramda);
        }

        aws = [];
        aws.push(<div key={coss}>Iteration {coss}</div>)
        for(let i = 0;i < x.length;i++){
            aws.push(<div key={coss}>x{i+1} : {x[i]}</div>);
        }
        data.push(aws);
        coss++;

        error_ = math.sqrt(math.multiply(math.transpose(r),r))
        if(error_ > error_old){
            return <div>ไม่มีคำตอบ</div>;
        }

    }
    return data;
}

export default Conjugates;