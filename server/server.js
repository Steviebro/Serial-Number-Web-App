//Author: Steven Gingras (40098045)

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//var loggedUser;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//+++++++++ LICENSES REQUESTS ====================================================================================================
app.post('/processThirdPartyLicenseForm', (req, res) => {
    const { clientEmail, serialNumber, expiryDate } = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });

    //check the input
    const getQuery = "SELECT * FROM license WHERE serialNumber=? AND clientEmail IS NULL";

    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
    
        con.query(getQuery, [serialNumber], (error,results) => {
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 1) { //if the query returns 1 row, then we can update
    
                const updateQuery = "UPDATE license SET clientEmail=? WHERE serialNumber=? AND expiryDate=? AND clientEmail IS NULL";
                
                con.query(updateQuery, [clientEmail, serialNumber, expiryDate], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("License associated", results);
                    }
                        
                });
                res.send("success");    
            } else { //license already associated or serial number not existant
                res.send("failure");
            }
            con.end();
        });
    });
    
});

app.post('/processClientAssociationForm', (req, res) => {
    const {clientEmail, serialNumber} = req.body;
  
    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
  
    //check the input
    const getQuery = "SELECT * FROM license WHERE serialNumber=? AND clientEmail IS NULL";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [serialNumber], (error,results) => {
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 1) { //if the query returns 1 row, then we can update
      
                const updateQuery = "UPDATE license SET clientEmail=? WHERE serialNumber=? AND clientEmail IS NULL";
                  
                con.query(updateQuery, [clientEmail, serialNumber], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("License associated", results);
                    }
                          
                });
                res.send("success");    
            } else { //license already associated or serial number not existant
                res.send("failure");
            }
            con.end();
        });
    });
      
});

//Working
app.post('/processProductAssociationForm', (req, res) => {
    const {serialNumber, product} = req.body;
  
    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
  
    //check the input
    const getQuery = "SELECT * FROM license WHERE serialNumber=? AND product IS NULL";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [serialNumber, product], (error,results) => {
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 1) { //if the query returns 1 row, then we can update
      
                const updateQuery = "UPDATE license SET product=? WHERE serialNumber=? AND product IS NULL";
                  
                con.query(updateQuery, [product, serialNumber], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("License associated", results);
                    }
                          
                });
                res.send("success");    
            } else { //license already associated or serial number not existant
                res.send("failure");
            }
            con.end();
        });
    });
      
});


//Working
app.post('/processTerminateLicenseForm', (req, res) => {
    const {clientEmail, product} = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
  
    //check the input
    const getQuery = "SELECT * FROM license WHERE clientEmail=? AND product=?";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [clientEmail, product], (error,results) => {
            console.log("clientEmail: ",clientEmail);
            console.log("Product: ",product);
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 1) { //if the query returns 1 row, then we can remove the row
      
                const updateQuery = "DELETE FROM license WHERE clientEmail=? AND product=?";
                  
                con.query(updateQuery, [clientEmail, product], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    console.log("Product: ",product);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("Product Terminated from the client", results);
                    }
                          
                });
                res.send("success");    
            } else { //client does not have this product
                res.send("failure");
            }
            con.end();
        });
    });
      
});

//Working
app.post('/processRenewLicenseForm', (req, res) => {
    const {clientEmail, product, years} = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
  
    //check the input
    const getQuery = "SELECT * FROM license WHERE clientEmail=? AND product=?";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [clientEmail, product], (error,results) => {
            console.log("clientEmail: ",clientEmail);
            console.log("Product: ",product);
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 1) { //if the query returns 1 row, then we can increase the expiry date
            
                const updateQuery = "UPDATE license SET expiryDate=? WHERE clientEmail=? AND product=?";
                
                //add appropriate amount of years
                let newExpiryDate = new Date(results[0].expiryDate);
                let yearsNum = new Number(years);

                newExpiryDate.setFullYear(newExpiryDate.getFullYear() + yearsNum);
                console.log(newExpiryDate);

                con.query(updateQuery, [newExpiryDate, clientEmail, product], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    console.log("Date: ",newExpiryDate);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("Product Terminated from the client", results);
                    }
                          
                });
                res.send("success");    
            } else { //client does not have this product
                res.send("failure");
            }
            con.end();
        });
    });
      
});

//Working
app.post('/processEnableOrDisableLicenseForm', (req, res) => {
    const {clientEmail, serialNumber, actionType} = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
  
    //check the input
    const getQuery = "SELECT * FROM license WHERE clientEmail=? AND serialNumber=?";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [clientEmail, serialNumber], (error,results) => {
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 1) { //if the query returns 1 row, then we can change the disabled status
                let disabledStatus;

                if(actionType == "enable") {
                    disabledStatus = 0;
                } else if (actionType == "disable") {
                    disabledStatus = 1;
                }

                const updateQuery = "UPDATE license SET disabled=? WHERE clientEmail=? AND serialNumber=?";

                con.query(updateQuery, [disabledStatus, clientEmail, serialNumber], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    console.log("Action type: ",disabledStatus);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("Product Terminated from the client", results);
                    }
                    
                    if (results.changedRows == 1) {
                        res.send("success");
                    } else {
                        res.send("unchanged");
                    }
                });   
            } else { //This client does not have this serial number
                res.send("failure");
            }
            con.end();
        });
    });
      
});


app.post('/processUniqueSerialNumber', (req, res) => {
    const {serialNumber} = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
    console.log(serialNumber);



    const getQuery = "SELECT * FROM license WHERE serialNumber=?";

    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
    
        con.query(getQuery, [serialNumber], (error,results) => {
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 0) { //if the query returns no row, then we can use the serial number
                res.send("success");    
            } else { //license already associated or serial number not existant
                res.send("failure");
            }
            con.end();
        });
    });
    
});

app.post('/processNewLicenseForm', (req, res) => {
    const {serialNumber, clientEmail, product, years} = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
    console.log(serialNumber);

    
    //check to make sure the client doesnt already have the product
    const getQuery = "SELECT * FROM license WHERE clientEmail=? AND product=?";

    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
    
        con.query(getQuery, [clientEmail, product], (error,results) => {
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 0) { //if the query returns no row, then we can add the product
                
                const updateQuery = "INSERT INTO license (serialNumber,clientEmail,product,expiryDate) VALUES (?,?,?,?)";
                
                //set appropriate expiryDate
                let yearsNum = new Number(years);
                let expiryDate = new Date();
                console.log(expiryDate);

                expiryDate.setFullYear(expiryDate.getFullYear() + yearsNum);
                console.log(expiryDate);

                con.query(updateQuery, [serialNumber, clientEmail, product, expiryDate], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("New license created", results);
                    }
                          
                });
                res.send("success");    
            } else { //license already associated or serial number not existant
                res.send("failure");
            }
            con.end();
        });
    });
    
});

app.post('/processAdminNewLicenseForm', (req, res) => {
    const {serialNumber, clientEmail, product, years} = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
    console.log(serialNumber);

    
    //check to make sure the client doesnt already have the product
    const getQuery = "SELECT * FROM license WHERE clientEmail=? AND product=?";

    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
    
        con.query(getQuery, [clientEmail, product], (error,results) => {
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 0 || clientEmail === "" || product === "") { //if the query returns no row, then we can add the product
                
                const updateQuery = "INSERT INTO license (serialNumber,expiryDate) VALUES (?,?)";
                
                //set appropriate expiryDate
                let yearsNum = new Number(years);
                let expiryDate = new Date();
                console.log(expiryDate);

                expiryDate.setFullYear(expiryDate.getFullYear() + yearsNum);
                console.log(expiryDate);
                console.log(serialNumber);
                con.query(updateQuery, [serialNumber, expiryDate], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("New License created", results);
                    }
                          
                });
                res.send("success");    
            } else { //license already associated or serial number not existant
                res.send("failure");
            }
            con.end();
        });
    });
    
});

app.post('/processListClientSerialNumbers', (req, res) => {

    const {clientEmail} = req.body;

    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ProjectDB'
        });

    //check the input
    const getQuery = "SELECT * FROM license WHERE clientEmail=?";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [clientEmail], (error,results) => {
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else {
                res.send(results);
            }
            con.end();
        });
    });    
})

app.post('/processManageClientsForm', (req, res) => {

    const {product} = req.body;

    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ProjectDB'
        });

    //check the input
    const getQuery = "SELECT * FROM license WHERE product=?";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [product], (error,results) => {
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else {
                res.send(results);
            }
            con.end();
        });
    });    
})

//+++++++++ ACCOUNTS REQUESTS ====================================================================================================

app.post('/processCreateAccountForm', (req, res) => {
    const {email, password, fullName, userType} = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
  
    //check if the account already exists
    const getQuery = "SELECT * FROM account WHERE email=?";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [email], (error,results) => {
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 0) { //if the query returns no rows, then we can add the account
                
                let userTypeBool;
                if (userType == "client") {
                    userTypeBool = 0;
                } else if (userType == "admin") {
                    userTypeBool = 1;
                }
                console.log(email,password,fullName,userTypeBool);

                const updateQuery = "INSERT INTO account (email,password,fullName,userType) VALUES (?,?,?,?)";

                con.query(updateQuery, [email, password, fullName, userTypeBool], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("Account registered", results);
                    }
                }); 
                res.send("success");  
            } else { //This client is already registered
                res.send("failure");
            }
            con.end();
        });
    });
      
});

app.post('/processLoginForm', (req, res) => {
    const {email, password} = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
  
    //check if the account already exists
    const getQuery = "SELECT * FROM account WHERE email=? AND password=?";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [email, password], (error,results) => {
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 1) { //if the query returns one, then we can authenticate the user
                
                //loggedUser = email;

                console.log(email,password);

                let userType = results[0].userType;

                if (userType == 1) {
                    res.send("admin");
                } else if (userType == 0) {
                    res.send("client");
                } 
            } else { //Invalid credentials
                res.send("failure");
            }
            con.end();
        });
    });
      
});

app.post('/processManageAccountForm', (req, res) => {
    const {email, oldPassword, newPassword} = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
  
    //check if the account is valid
    const getQuery = "SELECT * FROM account WHERE email=? AND password=?";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [email, oldPassword], (error,results) => {
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 1) {  //if the query returns 1 row, then we can change the password
      
                const updateQuery = "UPDATE account SET password=? WHERE email=? AND password=?";
                  
                con.query(updateQuery, [newPassword, email, oldPassword], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("Password updated", results);
                    }
                          
                });
                res.send("success");    
            } else { //Invalid credentials
                res.send("failure");
            }
            con.end();
        });
    });
      
});

app.post('/processDeleteAccountForm', (req, res) => {
    const {email, password} = req.body;

    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectDB'
    });
  
    //check if the account is valid
    const getQuery = "SELECT * FROM account WHERE email=? AND password=?";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [email, password], (error,results) => {
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 1) { //if the query returns 1 row, then we can remove the account
      
                const updateQuery = "DELETE FROM account WHERE email=? AND password=?";
                  
                con.query(updateQuery, [email, password], (error,results) => {
                    console.log("SQL Query:", updateQuery);
                    if (error) {
                        console.error("SQL error: ",error);
                    } else {
                        console.log("Account deleted", results);
                    }
                          
                });
                res.send("success");    
            } else { //Invalid credentials
                res.send("failure");
            }
            con.end();
        });
    });
      
});






//Broken: check password for double assign
app.post('/processLogin', (req, res) => {

    const {clientEmail, password} = req.body;

    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ProjectDB'
        });

    //check the input
    const getQuery = "SELECT * FROM account WHERE clientEmail=? AND password=?";
  
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to DB',err);
            return;
        }
        console.log("Connected to DB");
      
        con.query(getQuery, [clientEmail, password], (error,results) => {
            console.log("SQL Query:", getQuery);
            if (error) {
                console.error("SQL error: ",error);
            } else if (results.length === 1) { //if the query returns 1 row, then the account credentials are valid  
                
                res.send("success");    
            } else { //no user with credentials
                res.send("failure");
            }
            con.end();
        });
    });    

    //loggedUser = req.body;
    //console.log(loggedUser);
})

//broken, needs fixing



//+++++++++ SERVER LISTENER ====================================================================================================
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});