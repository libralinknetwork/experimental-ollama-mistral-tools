# experimental-ollama-mistral-tools

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/3mRSbP89jqQQqkK78hQhCE/KLVNQAapD8pwdaV4jm7XYa/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/3mRSbP89jqQQqkK78hQhCE/KLVNQAapD8pwdaV4jm7XYa/tree/main)

## Install Ollama & Pull Mistral model
```
brew install ollama
brew services start ollama
ollama pull mistral
```

## Testing Instructions
Unskip test in `llm_simulated_tool_func_call.test.ts`, i.e. replace `it.skip() -> it()`

```
nvm use 20
npm i
npm test
```

## Test
```
npm test
```

Output:
```
  console.log
    Your Request to Mistral: Can you give me the new Libra key?

  console.log
    Mistral Answer: 
      The public key you need for registration is:
    
    0x8d03099b4E8596eA533031731266b2307e947300
    
    Please make sure to use this key when registering on the platform. If you encounter any issues, feel free to ask for further assistance.

  console.log
    Your Request to Mistral: What is my balance?

  console.log
    TRACE - Server request: {"id":"29bcd0ea-c574-4250-92b2-450c0ae31b26","objectType":"Envelope","content":{"entity":{"objectType":"GetBalanceRequest","id":"f8dcc8dd-a32e-4124-8616-716a8552a0e4","pub":"0x8d03099b4E8596eA533031731266b2307e947300"},"pub":"0x8d03099b4E8596eA533031731266b2307e947300","sigReason":"IDENTITY"},"sig":"0x66f353751a93351388679ef119d9f69c2a67aa906751c73e8387b7b81f926347644553ba13894ba1091291153a7da940b456834919c9712361915bb09aaa1e011c"}    

  console.log
    TRACE - Server response: {"objectType":"Envelope","id":"f9f54669-892b-49b2-b994-70d59aacdcd5","content":{"entity":{"objectType":"GetBalanceResponse","id":"48a6d6c3-8683-4772-99cd-a722dcc50f6d","pub":"0x8d03099b4E8596eA533031731266b2307e947300","available":0,"pending":0,"total":0},"pub":null,"sigReason":"NONE"},"sig":null}

  console.log
    Mistral Answer: 
      Available amount: 0
    
       Pending amount: 0
```
