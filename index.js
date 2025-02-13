const input = document.getElementById('input');
const output = document.getElementById('output');

input.oninput = convert;

function convert(){
    const arr = input.value.split(/[- ]/);
    for(const [i, n] of arr.entries()){
        // converting
    }
}