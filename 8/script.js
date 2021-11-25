const th = document.querySelectorAll('th');
const min = 10;
const max = 100;
const mass= [];
const massvozr = [];
const massformat = [];
 th.forEach(item=>{
item.innerHTML=(Math.random() * (max - min + 1) + min).toFixed(2);
mass.push(item);
massvozr.push(parseFloat(item.innerHTML));

 });
 
const format = document.querySelector('.buttonformat');
format.addEventListener('click',()=>{
// const chek = document.querySelectorAll('.checkbox');
const chek = document.getElementById('select-format').value;
const data = [chek];
// chek.forEach(item=>{
//     if(item.checked){
//         data.push(item.value);
//     }
// });
mass.forEach(item=>{  
    item.innerHTML = parseFloat(item.innerHTML).toFixed(chek);
    massformat.push(parseFloat(item.innerHTML));
});
});
const sortvozr= document.querySelector('.buttonsortvozr');
sortvozr.addEventListener('click',()=>{
    massvozr.sort();
      mass.forEach((item,i)=>{
          item.innerHTML = massvozr[i];
      })
});
const sortubiv = document.querySelector('.buttonsortybiv');
sortubiv.addEventListener('click',()=>{
    massvozr.sort((a, b) => b - a);
    mass.forEach((item,i)=>{
        item.innerHTML = massvozr[i];
    })
});
const write1 = document.querySelector('.buttonsavedo');
write1.addEventListener('click',()=>{ 
    document.querySelector('.forminput').value = massvozr;
    document.querySelector('.formcheck').value = true;
    
});
const write2 = document.querySelector('.buttonsaveposle');
write2.addEventListener('click',()=>{ 
    document.querySelector('.forminput').value = massformat;
    document.querySelector('.formcheck').value = false;
});



