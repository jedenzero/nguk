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
                switch(str){
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
                        output.innerHTML += convertThis(i);
                        break;
                }
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
    str.pop();
    return `<img${className.length > 0 ? ' class="' + className + '"' : ''} src="imgs/${str}.png">`;
}