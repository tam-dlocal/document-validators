# Document Validator API

This repository contains a simple Express.js application for validating various types of documents, including Brazilian CPF (Individual Taxpayer Registry), CNPJ (National Registry of Legal Entities), PAN (Permanent Account Number), and South African National ID.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/document-validator-api.git
   ```

2. Install dependencies:

    ```bash
    cd document-validator-api
    npm install
    ```

## Usage
1. Start the server:

    ```bash
    npm start
    ```

2. The server will be running on http://localhost:3000.

3. Send a POST request to the **`/validate`** endpoint with a JSON payload containing the document to be validated. Example:

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"document": "12345678909"}' http://localhost:3000/validate
    ```

Replace **`"12345678909"`** with the document you want to validate.

## Endpoints
### POST **`/validate`**
* **Input**: JSON payload with a **`document`** field containing the document to be validated.

    ```bash
    {
    "document": "12345678909"
    }
    ```

* **Output**: JSON response indicating whether the document is valid or not, along with the document type.

    ```bash
    {
    "valid": true,
    "documentType": "CPF",
    "message": "Document is valid."
    }
    ```

## Supported Document Types
* PAN (Permanent Account Number)
* CPF (Brazilian Individual Taxpayer Registry)
* CNPJ (Brazilian National Registry of Legal Entities)
* South Africa National ID

## Examples
### Valid Examples

CPF
* Valid CPF: "123.456.789-09"

CNPJ
* Valid CNPJ: "25.021.356/0001-32"

PAN
* Valid PAN: "AAACT2727Q"

South Africa National ID
* Valid South Africa National ID: "9202295029188"

### Invalid Examples
CPF
* Invalid CPF: "123.456.789-12"

CNPJ
* Invalid CNPJ: "12.345.678/0001-91"

PAN
* Invalid PAN: "ABCDE12345"

South Africa National ID
* Invalid South Africa National ID: "85010150090876"

## Dependencies
* [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js
* [pancardjs](https://www.jsdelivr.com/package/npm/pancardjs): Library for PAN (Permanent Account Number) validation
* [valid-south-african-id](https://github.com/tiaanduplessis/valid-south-african-id): Library for South African National ID validation

## Contributing
Feel free to contribute by opening issues or submitting pull requests.

## License
This project is licensed under the MIT License.