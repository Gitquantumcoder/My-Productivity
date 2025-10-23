var display = document.getElementById("calc-display");
var buttons = document.querySelectorAll(".calculator button");

var input = "";

// Loop through all buttons
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    var value = this.textContent;

    if (value === "AC") {
      input = "";
      display.value = "";
    } 
    else if (value === "=") {
      try {
        display.value = eval(input);
        input = display.value; // allow continuous calculations
      } catch (e) {
        display.value = "Error";
        input = "";
      }
    } 
    else {
      input += value;
      display.value = input;
    }
  });
}
