const input = document.getElementById('input');
const output = document.getElementById('output');
const blockers = ['*', ':'];
let isBlocking = 0;

input.oninput = convert;

function convert(){
    const arr = input.value.split(/[- ]/);
    for(const [i, n] of arr.entries()){
        if(isBlocking == 0){
            if(n < arr.length-1 && blockers.includes(arr[n+1])){
                isBlocking = 1;
                // block starts here
            }
            else{
                output.innerHTML += convertThis(i);
            }
        }
        else{
            if(n == arr.length-1 || !blockers.includes(arr[n+1])){
                // block ends here
            }
        }
    }
}

function convertThis(str){
    let className = '';
    switch(str){
        case '!':
            return '<br>';
        case '.':
            return '<div class="half-space"></div>';
        case '..':
            return '<div class="half-space"></div>';
        default:
            break;
    }
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
            break;
    }
    str.pop();
    return `<img${className.length > 0 ? ' class="' + className + '"' : ''} src="${str}.png">`;
}