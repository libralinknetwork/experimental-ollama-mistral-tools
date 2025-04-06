## Testing Instructions

brew install ollama
brew services start ollama

ollama pull mistral

nvm 20
npm i
npm test

## Test

```
npm test

console.log
    Mistral Output: 
        {
            "function": "toolFuncGetLibraKey"
        }

console.log
    Mistral Output: 
        The public key you need for registration is '0x75458AcA7d8fA9697DA452FC0DFb8E1DAF4Ac3D0'. Please ensure that you use this exact key during the registration process. Good luck with your registration!

console.log
    Mistral Output: 
        {
            "function": "toolFuncGetLibraBalance"
        }

console.log
    Server response: {"objectType":"Envelope","id":"b1f3807b-c1ee-41ec-adf8-16833e000e86","content":{"entity":{"objectType":"GetBalanceResponse","id":"6b2dcee5-8de1-49df-97bc-fd3dedfd96aa","pub":"0x75458AcA7d8fA9697DA452FC0DFb8E1DAF4Ac3D0","available":10,"pending":0,"total":10},"pub":null,"sigReason":"NONE"},"sig":null}

console.log
    Mistral Output: 
     Here is the information presented in a user-friendly format:
    
    You have received an Envelope with ID 'b1f3807b-c1ee-41ec-adf8-16833e000e86'. Inside this envelope, there is a GetBalanceResponse for the public address 0x75458AcA7d8fA9697DA452FC0DFb8E1DAF4Ac3D0.
    
    - Your available balance is: 10 units
    - Your pending balance is: 0 units
    - Your total balance is: 10 units (available + pending)
    
    Since there was no signature reason specified, the transaction status is 'NONE'.
```
