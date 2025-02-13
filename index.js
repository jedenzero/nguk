const input = document.getElementById('input');
const output = document.getElementById('output');
let block = '';

input.oninput = convert;

function convert(){
    output.innerHTML = '';
    const arr = input.value.split(/[- ]/);
    for(const [index, value] of arr.entries()){
        if(value.includes(':')){
            value.split(':').forEach(row=>{
                row.split('*').forEach(el=>{
                    block += convertThis(el,row.split('*').length);
                });
                block += '<br>';
            });
            output.innerHTML += `<div class="block"><div class="grid">${block.slice(0,-4)}</div></div>`;
            block = '';
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
                    output.innerHTML += `<div class="block"><div class="grid">${convertThis(value,0)}</div></div>`;
                    break;
            }
        }
    }
}

function convertThis(str,h){
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
    return `<img${className.length > 0 ? ' class="' + className + '"' : ''} ${h>0 ? 'style="height:' + 32/h + 'px;"' : ''} src="imgs/${str}.PNG">`;
}