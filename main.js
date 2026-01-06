// main.js - Advanced App Runner
let currentScreen="home";
let currentOutput=[];
let currentPluginOutput=null;

window.addEventListener("DOMContentLoaded",()=>{ renderScreen("home"); });

function runApp(command){
    const result=window.runEngine(command||"");

    if(result.screen) currentScreen=result.screen;
    if(Array.isArray(result.output)) currentOutput=result.output;
    if(result.pluginCommand && window.PluginSystem)
        currentPluginOutput=window.PluginSystem.execute(result.pluginCommand);

    renderScreen(currentScreen);
}

function renderScreen(screen){
    const app=document.getElementById("app");
    if(!app) return;
    app.innerHTML="";

    const outputBox=document.createElement("div");
    outputBox.id="outputBox";
    outputBox.style.marginBottom="20px";
    app.appendChild(outputBox);

    // ===== HOME =====
    if(screen==="home"){
        const textarea=document.createElement("textarea");
        textarea.id="commandInput";
        textarea.placeholder="دستور بنویس…";
        app.appendChild(textarea);

        const btn=document.createElement("button");
        btn.textContent="اجرا";
        btn.onclick=()=>runApp(textarea.value);
        app.appendChild(btn);
    }

    // ===== NOTE =====
    if(screen==="note"){
        const textarea=document.createElement("textarea");
        textarea.id="noteText";
        textarea.placeholder="یادداشت…";
        textarea.value=localStorage.getItem("note")||"";
        app.appendChild(textarea);

        const saveBtn=document.createElement("button");
        saveBtn.textContent="ذخیره";
        saveBtn.onclick=()=>{
            localStorage.setItem("note",textarea.value);
            alert("ذخیره شد ✅");
        };
        app.appendChild(saveBtn);

        const backBtn=document.createElement("button");
        backBtn.textContent="بازگشت";
        backBtn.onclick=()=>runApp("screen home");
        app.appendChild(backBtn);
    }

    // ===== LIST =====
    if(screen==="list"){
        const input=document.createElement("textarea");
        input.id="itemInput";
        input.placeholder="آیتم جدید…";
        app.appendChild(input);

        const addBtn=document.createElement("button");
        addBtn.textContent="اضافه";
        addBtn.onclick=()=>{
            const val=input.value.trim();
            if(!val) return;
            const list=JSON.parse(localStorage.getItem("items")||"[]");
            if(list.length>=100) return alert("حداکثر ۱۰۰ آیتم مجاز است");
            list.push(val);
            localStorage.setItem("items",JSON.stringify(list));
            renderScreen("list");
        };
        app.appendChild(addBtn);

        const ul=document.createElement("ul");
        const items=JSON.parse(localStorage.getItem("items")||"[]");
        items.forEach((item,i)=>{
            const li=document.createElement("li");
            li.textContent=`${i+1}. ${item}`;
            ul.appendChild(li);
        });
        app.appendChild(ul);

        const backBtn=document.createElement("button");
        backBtn.textContent="بازگشت";
        backBtn.onclick=()=>runApp("screen home");
        app.appendChild(backBtn);
    }

    renderOutput();
}

function renderOutput(){
    const box=document.getElementById("outputBox");
    if(!box) return;
    box.innerHTML="";

    currentOutput.forEach(line=>{
        const p=document.createElement("p");
        p.textContent=line;
        p.style.padding="6px 0";
        p.style.borderBottom="1px solid #333";
        box.appendChild(p);
    });

    if(currentPluginOutput){
        const p=document.createElement("p");
        p.textContent=`[PLUGIN]: ${currentPluginOutput}`;
        p.style.padding="6px 0";
        p.style.borderBottom="1px solid #555";
        p.style.color="#4CAF50";
        box.appendChild(p);
        currentPluginOutput=null;
    }
}

// ===== LANGUAGE SWITCH (basic) =====
function handleLanguageChange(event){
    const val=event.target.value;
    alert("زبان به "+val+" تغییر کرد!");
        }
