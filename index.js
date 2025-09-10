const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";


let dropdown = document.querySelectorAll(".dropdown select")
let btn = document.querySelector(".btn")
let msg = document.querySelector(".msg")


let fromcu = document.querySelector("select[name='from']");
let tocu = document.querySelector("select[name='to']");


  for(let select of dropdown){
    for(let currCode in countryList){
        let newOption=document.createElement("option")
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected"
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected="selected"
        }
         select.append(newOption);
    }
    select.addEventListener("change" , (evt)=>{
        updateFlag(evt.target)
    })
  }

  const updateFlag=(Element)=>{
    let currCode = Element.value;
    let countryCode = countryList[currCode]
    let newScr= `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = Element.parentElement.querySelector("img")
    img.src=newScr;
  };


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amtvl = amount.value;
    if(amtvl === "" || amtvl < 1){
        amtvl = 1;
        amount.value = "1";
    }
                
const URL = `${BASE_URL}/currencies/${fromcu.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromcu.value.toLowerCase()][tocu.value.toLowerCase()];
    let finalamt = amtvl*rate;

    msg.innerText= `${amtvl} ${fromcu.value} = ${finalamt} ${tocu.value}`;
});





