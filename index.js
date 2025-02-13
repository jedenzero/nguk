const input = document.getElementById('input');
const output = document.getElementById('output');
let block = '';

input.oninput = convert;

function convert(){
    output.innerHTML = '';
    const arr = input.value.split(/[- ]/);
    for(const [index, value] of arr.entries()){
        if(value.includes(':')){
            block = '';
            value.split(':').forEach(row=>{
                el.split('*').forEach(el=>{
                    block += convertThis(el);
                });
                block += '<br>';
            });
            output.innerHTML += `<div class="block"><div class="grid">${block}</div></div>`;
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
    return `<img${className.length > 0 ? ' class="' + className + '"' : ''} src="imgs/${str}.PNG">`;
}