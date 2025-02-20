const input = document.getElementById('input');
const output = document.getElementById('output');
let block = '';
let grid = [];
let mul = 1; // multiplied result

input.oninput = convert;

function convert(){
    output.innerHTML = '';
    const arr = input.value.split(/[- ]/);
    for(const [index, value] of arr.entries()){
        if(value.includes(':')){
            let i = 0;
            value.split(':').forEach(row=>{
                grid.push(0);
                row.split('*').forEach(el=>{
                    grid[grid.length - 1]++;
                    block += `<div style="grid-area:a${i};width:${32/row.split('*').length}px;height:${32/value.split(':').length}px;">${convertThis(el)}</div>`;
                    i++;
                });
            });
            mul = 1;
            grid.forEach(n=>{mul *= n;});
            output.innerHTML += `<div class="block"><div class="grid" style="grid-template-columns:repeat(${mul},minmax(16px,32px));grid-template-areas:${readGrid(grid)}">${block}</div></div>`;
            block = '';
            grid = [];
        }
        else{
            switch(value){
                case '!':
                    output.innerHTML += '<br>';
                    break;
                case '.':
                    output.innerHTML += '<div class="half-space"></div>';
                    break;
                case '..':
                    output.innerHTML += '<div class="space"></div>';
                    break;
                default:
                    output.innerHTML += `<div class="block"><div class="grid">${convertThis(value)}</div></div>`;
                    break;
            }
        }
    }
}

function convertThis(str){
    let className = '';
    switch(str.slice(-1)){
        case '\\':
            className = 'x-reversed';
            break;
        case '/':
            className = 'y-reversed';
            break;
        case 'L':
            className = 'left-rotated';
            break;
        case 'R':
            className = 'right-rotated';
            break;
        default:
            str += '0';
            break;
    }
    str = str.slice(0, -1);
    
    return `<img class="img${className.length > 0 ? ' ' + className : ''}" src="imgs/${str}.svg">`;
}

function readGrid(arr){
    let css = '';
    let row = '';
    let i = 0;
    
    arr.forEach(n=>{
        row = '';
        for(let j=0;j<n;j++){
            row += `a${i+j} `.repeat(mul/n);
        }
        i += n;
        css += `'${row.trim()}' `;
    });
    
    return css.trim();
}