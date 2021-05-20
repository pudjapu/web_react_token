export function Jacobi(a,b,x,error_,_error) {

    let wow = false;
    let coss = 1;
    let data = [];
    let aws = [];

    let x_old = [...x];

    for(let i = 0;i < error_.length;i++){
        if(error_[i] > _error){
            wow = true;
        }
    }

    while(wow){
        
        x_old = [...x];

        for(let i = 0;i < a.length;i++){
            x[i] = b[i];
            for(let j = 0;j < a[0].length;j++){
                if(i !== j){
                    x[i] = x[i]- (a[i][j]*x_old[j])
                }
            }
            x[i] = x[i]/a[i][i];
            error_[i] = (x[i]-x_old[i])/x[i]
        }

        for(let i = 0;i < error_.length;i++){
            if(error_[i] > 10){
                return <div>ไม่มีคำตอบ</div>
            }
        }
        aws = [];
        aws.push(<div key={coss}>Iteration {coss}</div>)
        for(let i = 0;i < x.length;i++){
            aws.push(<div key={coss}>x{coss} : {x[i]} error : {error_[i]}</div>);
        }
        data.push(aws);

        wow = false;

        for(let i = 0;i < error_.length;i++){
            if(error_[i] > _error){
                wow = true;
            }
        }

    }

    return data;
}

export default Jacobi;