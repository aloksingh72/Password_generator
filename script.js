// humne attributes set kiya  tha toh uska syntax ye hai otherwise hum class ya  id se nhi element  ko fetch kar sakte the
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-strengthIndicator]");
const generateBtn = document.querySelector(".generateButton");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '!@#$%^&*()_+|:{}<>,.~;?/[]'

// starting case scnerio
// ----------starting me password empty hai---------
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set strength circle color to grey
setIndicator("#ccc");
//set password length
//handle slider ka kaaam itna hai ki password ki length ko UI ke upar reflect karwata hai...
function handleSlider() {
    // input slider ki value  password ke  length ke barbar hogi
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
// ---------------slider colorout----------
    // const min = inputSlider.min;
    // const max = inputSlider.max;
    // inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max - min)) + "% 100%"

}
function setIndicator(color) {
    // ------background color-------
    indicator.style.backgroundColor = color;
    //-----shadow------
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;


}
function getRndInteger(min, max) {
    //math.random se 0 aur 1 ke beech me random random number aa jayenge.
    //but ho sakta hai woh value float  value ho that why we use floor to roundoff 
    // multiplied  by max-min means max-min   
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
    //issse 0 to 9 ke beech me random number generate hogaa
    return getRndInteger(0, 9);
}
function generateLowerCase() {
    //ASCII value of small a is 97 and small Z is  123
    //String.fromCharCode se ascii value ko char me badal sakhte hai...
    return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
    //ASCII value of Capital A  is 65 and capital Z is 90
    //String.fromCharCode se ascii value ko char me badal sakhte hai...
    return String.fromCharCode(getRndInteger(65, 90));
}
function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    //charAt uss paricular index pe jo symbol pada hoga usko return karega 
    return symbols.charAt[random];
}
// password ki strength find karne ke liye
function clacStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    //.Checked property ka use karte hai box ko check verify  karne ke liye
    if (uppercaseCheck.Checked) hasUpper = true;
    if (lowercaseCheck.Checked) hasLower = true;
    if (numbersCheck.Checked) hasNum = true;
    if (symbolsCheck.Checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator["#0f0"];
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#AAFF00");
    }
}



async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
     catch (e) {
        copyMsg.innerText = "Failed";
     }
    // to make copy wala span visible 
     copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}
// shuffle function ---------
function shufflePassword(array){
    // we have fisher Yates Method
    for(let i=array.length - 1; i>0; i--){
        const j =Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str ="";
    array.forEach((el) => (str += el));
    return str;
}



function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });
    //special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
//aab  event listner  lagayenge
//event listner for allcheckboxes 
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})



//slider ke upar listner
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})
//copyBtn ke upar event listner lagane hai
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)
        copyContent();
})
//generate password button ke upar event listner
generateBtn.addEventListener('click', () => {
    if (checkCount <= 0) return;
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the journey to find new password
    //remove old passworld
    password = "";

    // let make password accordingly to ticked checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }


    let funcArr = [];
    if (uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if (lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if (numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);

    // compulsory addition
    //matlab jo checkboxes checked hai woh case hona compulsory  hai
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    //remaining addition
    for (i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    //shuffle the password
    password = shufflePassword(Array.from(password));
    //show in UI
    passwordDisplay.value = password;
    //calculate strength
    clacStrength();

});













