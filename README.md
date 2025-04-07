# experimental-ollama-mistral-tools

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/3mRSbP89jqQQqkK78hQhCE/KLVNQAapD8pwdaV4jm7XYa/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/3mRSbP89jqQQqkK78hQhCE/KLVNQAapD8pwdaV4jm7XYa/tree/main)

## Testing Instructions

```
brew install ollama
brew services start ollama
ollama pull mistral

nvm 20
npm i

/* Unskip test in llm_simulated_tool_func_call.test.ts, i.e. replace it.skip() -> it() */
npm test
```

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
        The public key you need for registration is '0x4D0BF923363a7459F44EC309c1f276fB11dc2b25'. Please ensure that you use this exact key during the registration process. Good luck with your registration!

console.log
    Mistral Output: 
        {
            "function": "toolFuncGetLibraBalance"
        }

  console.log
    Server request: {"id":"715fb9bb-bf34-49e0-b8ac-1d6af067add6","objectType":"Envelope","content":{"entity":{"objectType":"GetBalanceRequest","id":"91b03faa-d048-42bd-85fc-9c005662109d","pub":"0x4D0BF923363a7459F44EC309c1f276fB11dc2b25"},"pub":"0x4D0BF923363a7459F44EC309c1f276fB11dc2b25","sigReason":"IDENTITY"},"sig":"0x3c22274b34e0b38e4723c53d3bfe773bb9891d7fb3b548d33ecf6a54667c910942793bfda0792813789fcf9ae3516b44db2cf876f80fb782d4e4fe4054a9955a1c"}        

console.log
    Server response: {"objectType":"Envelope","id":"b1f3807b-c1ee-41ec-adf8-16833e000e86","content":{"entity":{"objectType":"GetBalanceResponse","id":"6b2dcee5-8de1-49df-97bc-fd3dedfd96aa","pub":"0x75458AcA7d8fA9697DA452FC0DFb8E1DAF4Ac3D0","available":10,"pending":0,"total":10},"pub":null,"sigReason":"NONE"},"sig":null}

  console.log
    Mistral Output: 
     Here is the information displayed in a user-friendly format:
    
    **Envelope Details:**
    - ID: c2bbf72c-c9b3-42ce-9d07-bdaa1e99412e
    
    **GetBalanceResponse Details:**
    - Public Address: 0x4D0BF923363a7459F44EC309c1f276fB11dc2b25
    - Available Balance: 10
    - Pending Balance: 0
    - Total Balance: 10
    - Signature Reason: NONE (This indicates that the signature for this response is not required)
```
