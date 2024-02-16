// Import the Express framework
const express = require("express");
const isValidPan = require("pancardjs");
const validSouthAfricanId = require("valid-south-african-id");

// Create an Express application
const app = express();
const port = 3000; // Set the port for the server to run on

// Middleware to parse incoming JSON data
app.use(express.json());

// Function to validate CPF (Brazilian Individual Taxpayer Registry)
function validateCpf(cpf) {
  const cleanCpf = cpf.replace(/\D/g, ""); // Remove non-numeric characters from CPF

  // Check if CPF length is not 11 or if it contains repeated digits
  if (cleanCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanCpf)) {
    return false;
  }

  let sum = 0;
  let remainder;

  // Perform CPF validation algorithm for the first 9 digits
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCpf[i - 1]) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  // Adjust remainder for special cases
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  // Check if the calculated remainder matches the 10th digit of CPF
  if (remainder !== parseInt(cleanCpf[9])) {
    return false;
  }

  sum = 0;

  // Perform CPF validation algorithm for the last 10th digit
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCpf[i - 1]) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  // Adjust remainder for special cases
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  // Check if the calculated remainder matches the 11th digit of CPF
  return remainder === parseInt(cleanCpf[10]);
}

// Function to validate CNPJ (Brazilian National Registry of Legal Entities)
function validateCnpj(cnpj) {
  const cleanCnpj = cnpj.replace(/\D/g, ""); // Remove non-numeric characters from CNPJ

  // Check if CNPJ length is not 14 or if it contains repeated digits
  if (cleanCnpj.length !== 14 || /^(\d)\1{13}$/.test(cleanCnpj)) {
    return false;
  }

  let sum = 0;
  let position = 5;

  // Perform CNPJ validation algorithm for the first 12 digits
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCnpj[i]) * position--;

    if (position < 2) {
      position = 9;
    }
  }

  let remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  // Check if the calculated remainder matches the 13th digit of CNPJ
  if (remainder !== parseInt(cleanCnpj[12])) {
    return false;
  }

  sum = 0;
  position = 6;

  // Perform CNPJ validation algorithm for the last 13th digit
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCnpj[i]) * position--;

    if (position < 2) {
      position = 9;
    }
  }

  remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  // Check if the calculated remainder matches the 14th digit of CNPJ
  return remainder === parseInt(cleanCnpj[13]);
}

// Endpoint to handle POST requests to validate a document (CPF or CNPJ)
app.post("/validate", (req, res) => {
  const { document } = req.body;

  if (!document) {
    return res.status(400).json({ error: "Document is required." });
  }

  // Remove any non-alphanumeric characters from the document
  const cleanDocument = document.replace(/[^a-zA-Z0-9]/g, "");

  let isValid;
  let documentType;

  // Check the length of the cleaned document to determine its type and validate
  if (cleanDocument.length === 10) {
    isValid = isValidPan.pan(cleanDocument);
    documentType = "PAN";
  } else if (cleanDocument.length === 11) {
    isValid = validateCpf(cleanDocument);
    documentType = "CPF";
  } else if (cleanDocument.length === 14) {
    isValid = validateCnpj(cleanDocument);
    documentType = "CNPJ";
  } else if (cleanDocument.length === 13) {
    isValid = validSouthAfricanId(cleanDocument)
    documentType = "South Africa National ID";
  } else {
    isValid = false;
    documentType = "Unknown";
  }

  // Respond with validation result
  if (isValid) {
    res.json({ valid: true, documentType, message: "Document is valid." });
  } else {
    res.json({ valid: false, documentType, message: "Document is not valid." });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
