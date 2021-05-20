function identityMatrix(n) {
    var matrix = [];

    for (var i = 0; i < n; i++) {
        matrix.push([]);
        for (var j = 0; j < n; j++) {
            matrix[i][j] = (i === j) ? 1 : 0;
        }
    }

    return matrix;
}

function emptyMatrix(n, m) {
    var matrix = [];
    m = m || n;

    for (var i = 0; i < n; i++) {
        matrix.push([]);
        for (var j = 0; j < m; j++) {
            matrix[i][j] = 0;
        }
    }

    return matrix;
}

function matrixMultiply(A, B) {
    var C = [],
        j, k, sum, i;

    for (j = 0; j < A.length; j++) {
        C[j] = [];
        for (k = 0; k < B[0].length; k++) {
            sum = 0;
            for (i = 0; i < B.length; i++) {
                sum += B[i][k] * A[j][i];
            }
            C[j].push(sum);
        }
    }

    return C;
}

export function lu_de(A, b, usePivoting) {

    var m = A.length,
        L = emptyMatrix(m),
        U = [...A],
        P = identityMatrix(m),
        x = [],
        y = [],
        currentRow, pivotRow, rowToKill, column, factor, maximumValue, maximumRow, pivotValue, partialP, sum;

    // factorize A = L * U
    for (currentRow = 0; currentRow < m; currentRow++) {

        if (usePivoting) {

            // determinte row with maximum pivot element
            for (maximumValue = 0, maximumRow = currentRow, pivotRow = currentRow; pivotRow < m; pivotRow++) {

                pivotValue = Math.abs(U[pivotRow][currentRow]);

                if (pivotValue > maximumValue) {
                    maximumValue = pivotValue;
                    maximumRow = pivotRow;
                }
            }

            // swap rows
            partialP = identityMatrix(m);
            partialP[currentRow][currentRow] = 0;
            partialP[maximumRow][maximumRow] = 0;
            partialP[maximumRow][currentRow] = 1;
            partialP[currentRow][maximumRow] = 1;

            P = matrixMultiply(partialP, P);
            U = matrixMultiply(partialP, U);
            L = matrixMultiply(partialP, L);

        }

        L[currentRow][currentRow] = 1;

        for (rowToKill = currentRow + 1; rowToKill < m; rowToKill++) {

            factor = U[rowToKill][currentRow] / U[currentRow][currentRow];
            L[rowToKill][currentRow] = factor;

            for (column = currentRow; column < m; column++) {
                U[rowToKill][column] -= U[currentRow][column] * factor;
            }
        }
    }

    if (b) {
        // adjust b
        if (usePivoting) {
            b = b.map(function (element) {
                return [element];
            });
            b = matrixMultiply(P, b);
            b = b.map(function (element) {
                return element[0];
            });
        }

        // forward substitute L * y = b
        for (currentRow = 0; currentRow < m; currentRow++) {

            for (sum = 0, column = 0; column < currentRow; column++) {
                sum += L[currentRow][column] * y[column];
            }

            y[currentRow] = b[currentRow] - sum;
        }

        // backward substitute U * x = y
        for (currentRow = m - 1; currentRow >= 0; currentRow--) {

            for (sum = 0, column = currentRow + 1; column < m; column++) {
                sum += U[currentRow][column] * x[column];
            }

            x[currentRow] = (y[currentRow] - sum) / U[currentRow][currentRow];
        }
    }

    return {
        L: L,
        U: U,
        P: P,
        x: x,
        y: y,
    };
}

export default lu_de