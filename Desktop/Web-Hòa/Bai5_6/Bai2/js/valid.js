let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let passWord = document.getElementById("password");
let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
let sex = document.querySelector(".form-check-input:checked");
let country = document.getElementById("country");
let about = document.getElementById("about");

//----------------------Variables for Notification Error--------------------------
let invalidFirstName = document.getElementById("invalid-firstname");
let invalidLastName = document.getElementById("invalid-lastname");
let invalidEmail = document.getElementById("invalid-email");
let invalidPassWord = document.getElementById("invalid-password");
let invalidAbout = document.getElementById("invalid-about");
let regValidName = /^[a-zA-Z]+( [a-zA-Z]+ )*[a-zA-Z ]*$/;
let regVaildEmail = /\S+@\S+\.\S+/;

/*---------------------Variables for Check Error--------------------------------- */
let checkErrorFN = false;
let checkErrorLN = false;
let checkErrorEM = false;
let checkErrorPW = false;
let checkErrorAB = false;


/**
 * invalidNotiBox: Element notification error of object current
 * ObjectCur: Object want to check Error
 * reg: regular Expresstion check valid requirement
 * type: type of input[name, password, email,...]
 */
const invalidInputText = function (invalidNotiBox, ObjectCur, reg, type = "text") {
  if (type == "text") {
    if (!reg.test(ObjectCur.value)) {
      invalidNotiBox.style.display = "block";
      invalidNotiBox.innerHTML = "Name contains numbers or special characters";
      ObjectCur.style.border = "1px solid #dc3545";
      return true;
    }
    else {
      if (ObjectCur.value.length < 2 || ObjectCur.value.length > 30) {
        invalidNotiBox.style.display = "block";
        invalidNotiBox.innerHTML = "Length of name must greater than 2 and less than 30 characters";
        ObjectCur.style.border = "1px solid #dc3545";
        return true;
      }
    }
  }
  else if (type == "email") {
    if (!reg.test(ObjectCur.value)) {
      invalidNotiBox.style.display = "block";
      invalidNotiBox.innerHTML = "Wrong Format [Vaild format is sth@sth.sth].";
      ObjectCur.style.border = "1px solid #dc3545";
      return true;
    }
  }
  else if (type == "password") {
    if (ObjectCur.value.length < 2 || ObjectCur.value.length > 30) {
      invalidNotiBox.style.display = "block";
      invalidNotiBox.innerHTML = "Length of name must greater than 2 and less than 30 characters";
      ObjectCur.style.border = "1px solid #dc3545";
      return true;
    }
  }
  else {
    if (ObjectCur.value.length > 10000) {
      invalidNotiBox.style.display = "block";
      invalidNotiBox.innerHTML = "Length of about must less than 10.000 characters";
      ObjectCur.style.border = "1px solid #dc3545";
      return true;
    }
  }
  return false;
};

const resetErrorNoti = function (invalidNotiBox, ObjectCur) {
  invalidNotiBox.style.display = "none";
  invalidNotiBox.innerHTML = ""
  ObjectCur.style.border = "1px solid #ced4da";
};

/*-----------------------Event for elements----------------------- */
firstName.addEventListener("focusin", function () {
  resetErrorNoti(invalidFirstName, firstName);
});

firstName.addEventListener("focusout", function () {
  checkErrorFN = invalidInputText(invalidFirstName, firstName, regValidName);
});

lastName.addEventListener("focusin", function () {
  resetErrorNoti(invalidLastName, lastName);
});

lastName.addEventListener("focusout", function () {
  checkErrorLN = invalidInputText(invalidLastName, lastName, regValidName);
});

email.addEventListener("focusin", function () {
  resetErrorNoti(invalidEmail, email);
});

email.addEventListener("focusout", function () {
  checkErrorEM = invalidInputText(invalidEmail, email, regVaildEmail, "email");
});

passWord.addEventListener("focusin", function () {
  resetErrorNoti(invalidPassWord, passWord);
});

passWord.addEventListener("focusout", function () {
  checkErrorPW = invalidInputText(invalidPassWord, passWord, regValidName, "password");
});

about.addEventListener("focusin", function () {
  resetErrorNoti(invalidAbout, about);
});

about.addEventListener("focusout", function () {
  checkErrorAB = invalidInputText(invalidAbout, about, regValidName, "about");
});

/*--------------------------Customer for Birthday--------------------- */
let Days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let option = '';
let selected = 1;
for (let i = 1; i <= Days[0]; i++) {
  option += '<option value="' + i + '">' + i + '</option>';
}
day.innerHTML = option;
day.value = selected;

option = '';
selected = 1;
for (let i = 1; i <= 12; i++) {
  option += '<option value="' + i + '">' + i + '</option>';
}
month.innerHTML = option;
month.value = selected;

option = '';
selected = 1991;
var today = new Date();
let yearCur = today.getFullYear();
for (let i = yearCur; i >= 1991; i--) {
  option += '<option value="' + i + '">' + i + '</option>';
}
year.innerHTML = option;
year.value = selected;

function change_year(select) {
  if (isLeapYear(select.value)) {
    Days[1] = 29;
  }
  else {
    Days[1] = 28;
  }
  if (month.value == 2) {
    let selected_day = day.value;
    day.innerHTML = '';
    let option = '';
    for (let i = 1; i <= Days[1]; i++) {
      option += '<option value="' + i + '">' + i + '</option>';
    }
    day.innerHTML = option;
    if (selected_day > Days[1]) {
      selected_day = 1;
    }
    day.value = selected_day;
  }
}
function change_month(select) {
  let selected_day = day.value;
  day.innerHTML = '';
  let option = '';
  let selected_month = parseInt(select.value) - 1;
  for (let i = 1; i <= Days[selected_month]; i++) {
    option += '<option value="' + i + '">' + i + '</option>';
  }
  day.innerHTML = option;
  if (selected_day > Days[selected_month]) {
    selected_day = 1;
  }
  day.value = selected_day;
}

/* -------------------------No Decriptions---------------------------- */

function isLeapYear(year) {
  return (year % 400 == 0) || ((year % 4) == 0 && (year % 100) != 0);
}

function checkValid() {
  if (firstName.value == "") {
    invalidFirstName.style.display = "block";
    invalidFirstName.innerHTML = "Name must not be null or empty";
    firstName.style.border = "1px solid #dc3545";
    checkErrorFN = true;
  }
  if (lastName.value == "") {
    invalidLastName.style.display = "block";
    invalidLastName.innerHTML = "Name must not be null or empty";
    lastName.style.border = "1px solid #dc3545";
    checkErrorLN = true;
  }
  if (email.value == "") {
    invalidEmail.style.display = "block";
    invalidEmail.innerHTML = "Name must not be null or empty";
    email.style.border = "1px solid #dc3545";
    checkErrorEM = true;
  }
  if (passWord.value == "") {
    invalidPassWord.style.display = "block";
    invalidPassWord.innerHTML = "Name must not be null or empty";
    passWord.style.border = "1px solid #dc3545";
    checkErrorPW = true;
  }
  if (checkErrorFN || checkErrorLN || checkErrorEM || checkErrorPW || checkErrorAB) {
    alert("Form have some error about format, try again!")
  }
  else {
    alert("Form valid! Congratulation sign up success ^^");
  }
}

function resetall() {
  resetErrorNoti(invalidFirstName, firstName);
  resetErrorNoti(invalidLastName, lastName);
  resetErrorNoti(invalidEmail, email);
  resetErrorNoti(invalidPassWord, passWord);
  resetErrorNoti(invalidAbout, about);
  checkErrorFN = false;
  checkErrorLN = false;
  checkErrorPW = false;
  checkErrorEM = false;
  checkErrorAB = false;
}