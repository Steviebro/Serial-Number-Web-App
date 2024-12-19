//Author: Steven Gingras (40098045)

document.addEventListener('DOMContentLoaded', function () {

  //Licenses
  let thirdPartyLicenseForm = document.getElementById("thirdPartyLicense");
  let clientAssociationForm = document.getElementById("clientAssociationForm");
  let productAssociationForm = document.getElementById("productAssociationForm");
  let terminateLicenseForm = document.getElementById("terminateLicenseForm");
  let renewLicenseForm = document.getElementById("renewLicenseForm");
  let enableOrDisableLicenseForm = document.getElementById("enableOrDisableLicenseForm");
  let newLicenseForm = document.getElementById("newLicenseForm");
  let adminNewLicenseForm = document.getElementById("adminNewLicenseForm");
  let manageClientsForm = document.getElementById("manageClientsForm");
  let listClientSerialNumbersForm = document.getElementById("listClientSerialNumbersForm");

  //Accounts
  let createAccountForm = document.getElementById("createAccountForm");
  let loginForm = document.getElementById("loginForm");
  let manageAccountForm = document.getElementById("manageAccountForm");
  let deleteAccountForm = document.getElementById("deleteAccountForm");
  


  

//+++++++++ LICENSES REQUESTS ==========================================================================================================  
if (thirdPartyLicenseForm != null) {
thirdPartyLicenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let clientEmail = document.getElementById("email").value;
    let serialNumber = document.getElementById("serialNumber").value;
    let expiryDate = document.getElementById("expiryDate").value;

    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processThirdPartyLicenseForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `clientEmail=${encodeURIComponent(clientEmail)}&serialNumber=${encodeURIComponent(serialNumber)}&expiryDate=${encodeURIComponent(expiryDate)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "success") {
            console.log("Form submitted successfully");

            document.getElementById("form").innerHTML = "<p>You have sucessfully associated this license to your account! You may now exit this page.</p>";

          } else {
            console.log("Form NOT submitted successfully");
            document.getElementById("article").innerHTML += "<section><p>Either this license does not exist or someone has already claimed this license. Please check your inputs and try again.</p></section>";

          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
});
}

if (clientAssociationForm !=null) {
clientAssociationForm.addEventListener("submit", function(event) {
  event.preventDefault();
  

  let clientEmail = document.getElementById("clientEmail").value;
  let serialNumber = document.getElementById("serialNumber").value;

  // Make a request to the server to process the form data
  fetch('http://localhost:3000/processClientAssociationForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `clientEmail=${encodeURIComponent(clientEmail)}&serialNumber=${encodeURIComponent(serialNumber)}`
    })
      .then(response => response.text())
      .then(data => {
        
        if (data == "success") {
          console.log("Form submitted successfully");

          document.getElementById("form").innerHTML = "<p>You have sucessfully associated this license with the client! You may now exit this page.</p>";

        } else {
          console.log("Form NOT submitted successfully");
          document.getElementById("article").innerHTML += "<section><p>Either this license does not exist or it already belongs to a client. Please check your inputs and try again.</p></section>";

        }
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
});
}

if (productAssociationForm !=null) {
  productAssociationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    let serialNumber = document.getElementById("serialNumber").value;
    let product = document.getElementById("product").value;
  
    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processProductAssociationForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `serialNumber=${encodeURIComponent(serialNumber)}&product=${encodeURIComponent(product)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "success") {
            console.log("Form submitted successfully");
  
            document.getElementById("form").innerHTML = "<p>You have sucessfully associated this license with the product! You may now exit this page.</p>";
  
          } else {
            console.log("Form NOT submitted successfully");
            document.getElementById("article").innerHTML += "<section><p>Either this license does not exist or it already has an associated product. Please check your inputs and try again.</p></section>";
  
          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });

}

if (terminateLicenseForm !=null) {
  terminateLicenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
  
    let clientEmail = document.getElementById("email").value;
    let product = document.getElementById("product").value.trim();
  
    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processTerminateLicenseForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `clientEmail=${encodeURIComponent(clientEmail)}&product=${encodeURIComponent(product)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "success") {
            console.log("Form submitted successfully");
  
            document.getElementById("form").innerHTML = "<p>Your subscription was successfully terminated, you may now exit this page.</p>";
  
          } else {
            console.log("Form NOT submitted successfully");
            document.getElementById("article").innerHTML += "<section><p>You do not have this product. Please check your inputs and try again.</p></section>";
  
          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });
}

if (renewLicenseForm !=null) {
  renewLicenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
  
    let clientEmail = document.getElementById("email").value;
    let product = document.getElementById("product").value;
    let years = document.getElementById("years").value;
  
    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processRenewLicenseForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `clientEmail=${encodeURIComponent(clientEmail)}&product=${encodeURIComponent(product)}&years=${encodeURIComponent(years)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "success") {
            console.log("Form submitted successfully");
  
            document.getElementById("form").innerHTML = "<p>Your subscription was successfully renewed, you may now exit this page.</p>";
  
          } else {
            console.log("Form NOT submitted successfully");
            document.getElementById("article").innerHTML += "<section><p>You do not have this product. Please check your inputs and try again.</p></section>";
  
          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });
}

if (enableOrDisableLicenseForm !=null) {
  enableOrDisableLicenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
  
    let clientEmail = document.getElementById("email").value;
    let serialNumber = document.getElementById("serialNumber").value;
    let actionType = document.getElementById("actionType").value;
  
    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processEnableOrDisableLicenseForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `clientEmail=${encodeURIComponent(clientEmail)}&serialNumber=${encodeURIComponent(serialNumber)}&actionType=${encodeURIComponent(actionType)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "success") {
            console.log("Form submitted successfully");
  
            document.getElementById("form").innerHTML = "<p>The serial number was successfully updated, you may now exit this page.</p>";
  
          } else if (data == "unchanged") {
            document.getElementById("article").innerHTML += "<section><p>This serial number is already assigned as "+actionType+"d. Please check your inputs and try again.</p></section>";

          } else {
            console.log("Form NOT submitted successfully");
            document.getElementById("article").innerHTML += "<section><p>This client does not own this serial number. Please check your inputs and try again.</p></section>";
  
          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });
}

if (newLicenseForm !=null) {
  newLicenseForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    let clientEmail = document.getElementById("email").value;
    let product = document.getElementById("product").value;
    let years = document.getElementById("years").value;

    var uniqueSerialVar = false;
    let serialNumber = generateSerial1();
    console.log(serialNumber);

    //Make sure the serial number is not already in use
    while (!uniqueSerialVar) {
      // Make a request to the server to process the form data
      await fetch('http://localhost:3000/processUniqueSerialNumber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `serialNumber=${encodeURIComponent(serialNumber)}`
      })
      .then(response => response.text())
      .then(data => {
        
        if (data == "success") {
          console.log("Serial number is unique");
          uniqueSerialVar = true;
          console.log(uniqueSerialVar);
        } else {
          console.log("Serial number is NOT unique, generating a new one and trying again");
          serialNumber = generateSerial1();
        }
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }
    
    console.log("Unique serial number found", serialNumber);
    
    // Make a request to the server to create a new license
    fetch('http://localhost:3000/processNewLicenseForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `serialNumber=${encodeURIComponent(serialNumber)}&clientEmail=${encodeURIComponent(clientEmail)}&product=${encodeURIComponent(product)}&years=${encodeURIComponent(years)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "success") {
            console.log("Form submitted successfully");
  
            document.getElementById("form").innerHTML = "<p>Your license was successfully acquired, you may now exit this page.</p>";
  
          } else {
            console.log("Form NOT submitted successfully");
            document.getElementById("article").innerHTML += "<section><p>You already have this product or your email is invalid. Please check your inputs and try again.</p></section>";
  
          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  
    });
}

if (adminNewLicenseForm !=null) {
  adminNewLicenseForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    let clientEmail = document.getElementById("email").value;
    
    let product = document.getElementById("product").value;

    let years = document.getElementById("years").value;

    console.log(product);
    console.log(clientEmail);

    var uniqueSerialVar = false;
    let serialNumber = generateSerial1();
    console.log(serialNumber);

    //Make sure the serial number is not already in use
    while (!uniqueSerialVar) {
      // Make a request to the server to process the form data
      await fetch('http://localhost:3000/processUniqueSerialNumber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `serialNumber=${encodeURIComponent(serialNumber)}`
      })
      .then(response => response.text())
      .then(data => {
        
        if (data == "success") {
          console.log("Serial number is unique");
          uniqueSerialVar = true;
          console.log(uniqueSerialVar);
        } else {
          console.log("Serial number is NOT unique, generating a new one and trying again");
          serialNumber = generateSerial1();
        }
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }
    
    console.log("Unique serial number found", serialNumber);
    
    // Make a request to the server to create a new license
    fetch('http://localhost:3000/processAdminNewLicenseForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `serialNumber=${encodeURIComponent(serialNumber)}&clientEmail=${encodeURIComponent(clientEmail)}&product=${encodeURIComponent(product)}&years=${encodeURIComponent(years)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "success") {
            console.log("Form submitted successfully");
  
            document.getElementById("form").innerHTML = "<p>The license was successfully generated, you may now exit this page.</p>";
  
          } else {
            console.log("Form NOT submitted successfully");
            document.getElementById("article").innerHTML += "<section><p>The client already has this product or the email is invalid. Please check your inputs and try again.</p></section>";
  
          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  
    });
}

if (manageClientsForm !=null) {
  manageClientsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    let product = document.getElementById("product").value;
  
    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processManageClientsForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `product=${encodeURIComponent(product)}`
      })
        .then(response => response.json())
        .then(data => {
          document.getElementById("article").innerHTML = "<section><h4>Here is a list of your active Licenses for EditHub "+product+":</h4></section>";
          if (data.length != 0) {

            data.forEach(row => {
              let clientEmail = row.clientEmail;
              let expiryDate = new Date(row.expiryDate).toLocaleDateString('en-US');
              let serialNumber = row.serialNumber;

              document.getElementById("article").innerHTML += "<section><p><a href='mailto:'>Email Client: "+clientEmail+"</a></p><p>Expiry Date: "+expiryDate+"</p><p>SerialNumber: "+serialNumber+"</p></section>";
  
            });
          } else {
            document.getElementById("article").innerHTML = "<section><p>It looks like you don't have any clients for this product...</p></section>";

          }
          
          
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });

}

if (listClientSerialNumbersForm !=null) {
  listClientSerialNumbersForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
  
    let clientEmail = document.getElementById("email").value;
  
    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processListClientSerialNumbers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `clientEmail=${encodeURIComponent(clientEmail)}`
      })
        .then(response => response.json())
        .then(data => {
          document.getElementById("article").innerHTML = "<section><h4>Here is a list of your active Licenses:</h4></section>";
          if (data.length != 0) {

            data.forEach(row => {
              let product = row.product;
              let expiryDate = new Date(row.expiryDate).toLocaleDateString('en-US');
              console.log(product);
              console.log(expiryDate);

              if (product != null) {
                document.getElementById("article").innerHTML += "<section><p>EditHub "+product+"</p><p>Expiry Date: "+expiryDate+"</p></section>";
              }  
            });
          } else {
            document.getElementById("article").innerHTML = "<section><p>It looks like you don't have any Licenses... try acquiring one!</p></section>";

          }
          
          
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });

}


//+++++++++ ACCOUNTS REQUESTS ====================================================================================================
if (createAccountForm !=null) {
  createAccountForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
  
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let fullName = document.getElementById("fullName").value;
    let userType = document.getElementById("userType").value;
  
    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processCreateAccountForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&fullName=${encodeURIComponent(fullName)}&userType=${encodeURIComponent(userType)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "success") {
            console.log("Form submitted successfully");
  
            document.getElementById("form").innerHTML = "<p>The account was succesfully created, you may now go to the login page.</p>";
            document.getElementById("form").innerHTML += "<section><a href='accLogin.html'>Login Page</a></section>";

          } else {
            console.log("Form NOT submitted successfully");
            document.getElementById("article").innerHTML += "<section><p>This account is already registered. Please check your inputs and try again.</p></section>";
  
          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });
}

if (loginForm !=null) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
  
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
  
    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processLoginForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "client") {
            console.log("User is client");
  
            document.getElementById("form").innerHTML = "<p>You have successfully logged in to your account, you may now go to your home page.</p>";
            document.getElementById("form").innerHTML += "<section><a href='../Client/Userhome.html'>Home Page</a></section>";
  
          } else if (data == "admin") {
            console.log("User is admin");

            document.getElementById("form").innerHTML = "<p>You have successfully logged in to your account, you may now go to your home page.</p>";
            document.getElementById("form").innerHTML += "<section><a href='../SoftwareProvider/Adminhome.html'>Home Page</a></section>";

          } else {
            console.log("Form NOT succesful");

            document.getElementById("article").innerHTML += "<section><p>These credentials are invalid. Please check your inputs and try again.</p></section>";
          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });
}

if (manageAccountForm !=null) {
  manageAccountForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
  
    let email = document.getElementById("email").value;
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
  
    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processManageAccountForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&oldPassword=${encodeURIComponent(oldPassword)}&newPassword=${encodeURIComponent(newPassword)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "success") {
            console.log("Form submitted successfully");
  
            document.getElementById("form").innerHTML = "<p>Your password was successfully changed, you may now exit this page.</p>";
  
          } else {
            console.log("Form NOT submitted successfully");
            document.getElementById("article").innerHTML += "<section><p>There are no registered accounts with this email and old password. Please check your inputs and try again.</p></section>";
  
          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });
}

if (deleteAccountForm !=null) {
  deleteAccountForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
  
    // Make a request to the server to process the form data
    fetch('http://localhost:3000/processDeleteAccountForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      })
        .then(response => response.text())
        .then(data => {
          
          if (data == "success") {
            console.log("Form submitted successfully");
  
            document.getElementById("form").innerHTML = "<p>Your account was successfully deleted, you may now return to the home page.</p>";
            document.getElementById("form").innerHTML += "<section><a href='../index.html'>Home Page</a></section>";

          } else {
            console.log("Form NOT submitted successfully");
            document.getElementById("article").innerHTML += "<section><p>There are no registered accounts with this email and password. Please check your inputs and try again.</p></section>";
  
          }
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });
}



//+++++++++ SERIAL GENERATION ====================================================================================================
function generateSerial1() {
  //some parts referenced from https://codepen.io/Al-Yasa/pen/ENWYow
  //done by Sang Hyun Hong
  var chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      serialLength = 10,
      randomSerial = "",
      randomNumber;
  
  for (let i = 0; i < serialLength; i = i + 1) {
      
      randomNumber = Math.floor(Math.random() * chars.length);
      
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
      
  }

  return randomSerial;
  
  //document.getElementById('serial1').innerHTML = randomSerial;
  //document.getElementById("button1").onclick = null;
  
}


//broken, needs fixing


});

