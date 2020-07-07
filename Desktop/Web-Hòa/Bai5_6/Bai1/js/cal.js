let num1 = document.getElementById("firstNum");
let num2 = document.getElementById("secondNum");
let op = document.getElementById("operator");
let result = document.getElementById("result");
let err1 = document.getElementById("error-num1");
let err2 = document.getElementById("error-num2");
let btn = document.getElementById("btn-submit");
let checkError1 = false;
let checkError2 = false;

num1.addEventListener("focusin", function () {
  err1.style.display = "none";
  err1.innerHTML = "";
  num1.style.border = "3px solid #007bff";
});

num1.addEventListener("focusout", function () {
  if (isNaN(num1.value)) {
    err1.style.display = "block";
    err1.innerHTML = "Cái bạn vừa nhập không phải là số!";
    num1.style.border = "3px solid red";
    checkError1 = true;
  }
  else {
    err1.style.display = "none";
    err1.innerHTML = "";
    num1.style.border = "3px solid #ccc";
    checkError1 = false;
  }
});

num2.addEventListener("focusin", function () {
  err2.style.display = "none";
  err2.innerHTML = "";
  num2.style.border = "3px solid #007bff";
});

num2.addEventListener("focusout", function () {
  if (isNaN(num2.value)) {
    err2.style.display = "block";
    err2.innerHTML = "Cái bạn vừa nhập không phải là số!";
    num2.style.border = "3px solid red";
    checkError2 = true;
  }
  else {
    err2.style.display = "none";
    err2.innerHTML = "";
    num2.style.border = "3px solid #ccc";
    checkError2 = false;
  }
});

btn.addEventListener("click", function () {
  if (checkError1 || checkError2) {
    return;
  }
  if (num1.value == "") {
    num1.style.border = "3px solid red";
    err1.style.display = "block";
    err1.innerHTML = "Bạn phải nhập số vào ô này";
    return;
  }
  if (num2.value == "") {
    num2.style.border = "3px solid red";
    err2.style.display = "block";
    err2.innerHTML = "Bạn phải nhập số vào ô này";
    return;
  }
  switch (op.value) {
    case "+":
      result.value  = Number(num1.value) + Number(num2.value);
      break;
    case "-":
      result.value  = Number(num1.value) - Number(num2.value);
      break;
    case "*":
      result.value  = Number(num1.value) * Number(num2.value);
      break;
    case "/":
      result.value  = Number(num1.value) / Number(num2.value);
      break;
    default:
      result.value  = Math.pow(Number(num1.value), Number(num2.value));
      break;
  }
});