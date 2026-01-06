// engine.js - Advanced Output + Variables + Plugins
const ALLOWED_SCREENS = new Set(["home","note","list"]);
const VARIABLES = {};

function normalize(cmd){
    if(typeof cmd!=="string") return "";
    return cmd.toLowerCase()
        .replace(/صفحه/g,"screen")
        .replace(/یادداشت/g,"note")
        .replace(/لیست/g,"list")
        .replace(/برو/g,"go")
        .trim();
}

function runEngine(input){
    let screen="home";
    let output=[];
    let pluginCommand=null;

    const lines=(input||"").split("\n").map(normalize).filter(Boolean);

    lines.forEach(line=>{
        const parts=line.split(" ");
        const cmd=parts[0];

        if((cmd==="screen"||cmd==="go") && ALLOWED_SCREENS.has(parts[1])) screen=parts[1];

        if(cmd==="print"){
            const val=parts.slice(1).join(" ");
            if(val.startsWith("$")) output.push(VARIABLES[val.substring(1)]||"undefined");
            else output.push(val);
        }

        if(cmd==="set" && parts[1]){
            const varName=parts[1];
            const val=parts.slice(2).join(" ");
            VARIABLES[varName]=val;
        }

        if(cmd==="clear") output=[];

        if(cmd==="plugin" && parts[1]){
            pluginCommand=parts.slice(1).join(" ");
        }
    });

    return {screen, output, pluginCommand};
}

window.runEngine=runEngine;
window.VARIABLES=VARIABLES;
