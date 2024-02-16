# panjs
## Validators

---------------------------------------
#### This package provides validation of PAN Card of an individual. (Made in India)
## Installation

### NodeJS
```javascript
    npm i pancardjs
```
In your .js file add following code

```javascript
    const isValid = require('pancardjs')
```

## Usage

#### 1. PAN (Permanent Account Number):
validates => Input must be in format `AAAAA####A`, and have length 10 and fourth character must be either A, B, C, F, G, H, L, J, P, T, E.
```javascript
isValid.pan('AAACT2727Q')  /* returns true  */
isValid.pan('11ACT2727Q')  /* returns false */
```
You can also obtain PAN holder type by -
```javascript
isValid.pan.holder('AAACT2727Q')  /* returns 'Company'  */
```
possible values are -
```
A: Association Of Persons (AOP),
B: Body Of Individuals (BOI),
C: Company,
F: Firm,
G: Government,
H: Hindu Undivided Family (HUF),
L: Local Authority,
J: Artificial Juridical Person,
P: Individual (Proprietor),
T: Trust (AOP),
E: Limited Liability Partnership (LLP),
```

------------------------------------

#### For Feature requests and Error reporting:
create an issue on [github repository](https://github.com/tazimmadre/panjs/issues) or contact directly to [tazimmadre5041@gmail.com](mailto:tazimmadre5041@gmail.com)

##### **Don't Forget to add a star to [github repo](https://github.com/tazimmadre/panjs). Please provide your comments, suggest improvements and other codes which are not covered in this package.
