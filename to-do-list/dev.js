function addtask(){
    
    let input=document.querySelector(".in");
    console.log(input);
    console.log(input.value);
    if (input.value.trim()=== "") {
        alert("Task cannot be empty!");
        return;
    }
    let lis=document.createElement("li");
    lis.className="lis";
    let para=document.createElement("p");
    para.className="para";
    para.innerText=input.value;
    let div=document.createElement("div");
    div.className="but";
    let bt1=document.createElement("button");
    bt1.className="comp";
    bt1.innerText="Completed";
    let bt2=document.createElement("button");
    bt2.className="rem";
    bt2.innerText="Remove";
    let unl=document.querySelector(".unl");
    div.appendChild(bt1);
    div.appendChild(bt2);
    lis.appendChild(para);
    lis.appendChild(div);
    unl.appendChild(lis);
    bt1.onclick=function(){
        para.style.textDecoration= "line-through";
    }
    bt2.onclick = function () {
        lis.remove();
    };
    input.value="";
}