let activeType = "Length";
let activeAction = "Conversion";

const units = {
  Length: ["meter", "km", "cm", "feet", "inch"],
  Weight: ["kg", "gram"],
  Temperature: ["celsius", "fahrenheit"],
  Volume: ["litre", "ml", "gallon"]
};

function setType(type) {
  activeType = type;
  document.getElementById("activeType").innerText = type;
  populateUnits();
}

function setAction(action) {
  activeAction = action;
  document.getElementById("activeAction").innerText = action;

  let val2 = document.getElementById("val2");
  let from = document.getElementById("fromUnit");
  let to = document.getElementById("toUnit");

  if (action === "Conversion") {
    val2.style.display = "none";
    from.style.display = "block";
    to.style.display = "block";
  }
  else if (action === "Comparison") {
    val2.style.display = "block";
    from.style.display = "block";   // ✅ show
    to.style.display = "block";     // ✅ show
  }
  else {
    val2.style.display = "block";
    from.style.display = "block";
    to.style.display = "block";
  }
}

function populateUnits() {
  let from = document.getElementById("fromUnit");
  let to = document.getElementById("toUnit");

  from.innerHTML = "";
  to.innerHTML = "";

  units[activeType].forEach(unit => {
    from.add(new Option(unit, unit));
    to.add(new Option(unit, unit));
  });
}

/* ===== CONVERSION ===== */

function convertLength(v, f, t) {
  let m = v * {meter:1, km:1000, cm:0.01, feet:0.3048, inch:0.0254}[f];
  return m / {meter:1, km:1000, cm:0.01, feet:0.3048, inch:0.0254}[t];
}

function convertWeight(v, f, t) {
  let kg = v * {kg:1, gram:0.001}[f];
  return kg / {kg:1, gram:0.001}[t];
}

function convertTemperature(v, f, t) {
  if (f==="celsius" && t==="fahrenheit") return (v*9/5)+32;
  if (f==="fahrenheit" && t==="celsius") return (v-32)*5/9;
  return v;
}

function convertVolume(v, f, t) {
  let l = v * {litre:1, ml:0.001, gallon:3.78541}[f];
  return l / {litre:1, ml:0.001, gallon:3.78541}[t];
}

/* ===== MAIN ===== */

function calculate() {
  let v1 = parseFloat(document.getElementById("val1").value);
  let v2 = parseFloat(document.getElementById("val2").value || 0);

  let from = document.getElementById("fromUnit").value;
  let to = document.getElementById("toUnit").value;

  let result = "";

  if (activeAction === "Conversion") {
    if (activeType === "Length") result = convertLength(v1, from, to);
    else if (activeType === "Weight") result = convertWeight(v1, from, to);
    else if (activeType === "Temperature") result = convertTemperature(v1, from, to);
    else if (activeType === "Volume") result = convertVolume(v1, from, to);
  }

  else if (activeAction === "Arithmetic") {

  let baseValue;

  if (activeType === "Length") {
    baseValue = convertLength(v2, to, from);
  }
  else if (activeType === "Weight") {
    baseValue = convertWeight(v2, to, from);
  }
  else if (activeType === "Temperature") {
    baseValue = convertTemperature(v2, to, from);
  }
  else if (activeType === "Volume") {
    baseValue = convertVolume(v2, to, from);
  }

  result = v1 + baseValue;
}

else if (activeAction === "Comparison") {

  let convertedV2;

  if (activeType === "Length") {
    convertedV2 = convertLength(v2, to, from);
  }
  else if (activeType === "Weight") {
    convertedV2 = convertWeight(v2, to, from);
  }
  else if (activeType === "Temperature") {
    convertedV2 = convertTemperature(v2, to, from);
  }
  else if (activeType === "Volume") {
    convertedV2 = convertVolume(v2, to, from);
  }

  if (v1 > convertedV2) result = "Value 1 Greater";
  else if (v1 < convertedV2) result = "Value 2 Greater";
  else result = "Equal";
}

  document.getElementById("resultText").innerText = result;
}

function logout() {
  localStorage.removeItem("currentUser"); // only remove session
  window.location.href = "index.html";
}

populateUnits();