const fields = document.querySelectorAll("[required]");


function validateField(field) {
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    console.log(foundError);
    return foundError;
  }



  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");
    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function() {
    if (verifyErrors()) {
      field.style.borderColor = "red"
      setCustomMessage("Campo inválido!")
    } else {
      field.style.borderColor = "green"
      
      setCustomMessage()
    }
  }
}

function customValidation(event) {
  const field = event.target;
  const validation = validateField(field);
  validation()
}

for (field of fields) {
  field.addEventListener("invalid", (event) => {
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}
