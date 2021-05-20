export function Gauss_jodan(Matrix_in){

    let Matrix = [];
    for (let i = 0; i < Matrix_in.length; i++)
        Matrix[i] = Matrix_in[i].slice();
        


    for(let k = 0; k < Matrix.length-1; k++){

        for (let j = k; j < Matrix.length-1; j++){
    
            // copy array
            let temp = [];
            for (let i = 0; i < Matrix.length; i++)
                temp[i] = Matrix[i].slice();

            let tem = temp[k][k];
            for(let i = k; i < Matrix[0].length;i++){
               temp[k][i] = temp[k][i]/tem*temp[j+1][k];
               Matrix[j+1][i] = Matrix[j+1][i]-temp[k][i];
            }
        }

    }

    for(let k = 0; k < Matrix.length-1; k++){

        for (let j = 0+k; j < Matrix.length-1; j++){
        
            // copy array
            let temp = [];
            for (let i = 0; i < Matrix.length; i++)
                temp[i] = Matrix[i].slice();

            let tem = temp[Matrix.length-1-k][Matrix.length-1-k];
            for(let i = Matrix.length;i >= 0;i--){
                temp[Matrix.length-1-k][i] = temp[Matrix.length-1-k][i]/tem*temp[Matrix.length-1-(1+j)][Matrix.length-1-k];
                Matrix[Matrix.length-1-(1+j)][i] = Matrix[Matrix.length-1-(1+j)][i]-temp[Matrix.length-1-k][i];
            }

        }
    }
    
    let answer = [];

    for(let i =0;i < Matrix.length;i++){
        answer.push(Matrix[i][Matrix.length]/Matrix[i][i]);
    }

    return answer;
}

export default Gauss_jodan