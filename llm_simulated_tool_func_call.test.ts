import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { GetBalanceRequest, EnvelopeContent, Envelope, SignatureHelper } 
    from '@libralinknetwork/libralink-client-web3js';

const Web3 = require('web3').default;
const web3 = new Web3();

/* State */
const localState = { pk: '', address: '' }

/* Tool Function */
async function toolFuncGetLibraKey(): Promise<string | null> {

    const account = web3.eth.accounts.create();
    localState.address = account.address;
    localState.pk = account.privateKey.replace(/^0x/, '');

    return localState.address;
}

/* Tool Function */
async function toolFuncGetLibraBalance(): Promise<string> {
    if (!localState.pk || !localState.address) {
        return 'You need to generate the Libra Key and register it!';
    }

    const request: GetBalanceRequest = {
        objectType: 'GetBalanceRequest',
        id: uuid(),
        pub: localState.address
    } 

    const envelopeContent: EnvelopeContent = {
        entity: request,
        pub: null,
        sigReason: 'NONE'
    }
    
    const envelope: Envelope = {
        objectType: 'Envelope',
        id: uuid(),
        content: envelopeContent,
        sig: null
    }    

    const signedEnvelope = SignatureHelper.sign(envelope, localState.address, localState.pk, 'IDENTITY');
    const requestJson = JSON.stringify(signedEnvelope);
    console.log(`TRACE - Server request: ${requestJson}`);

    const response = await axios.post<object>(
        'http://localhost:8080/protocol/agent/balance',
        JSON.stringify(signedEnvelope),
        { headers: { 'Content-Type': 'application/json' }}
    );

    const responseJson = JSON.stringify(response.data);
    console.log(`TRACE - Server response: ${responseJson}`);

    return `Extract available and pending amount from json. Present to user: ${responseJson}`;
}

/* 💬 Prompt that simulates tool calling */
const simulatedTools = `
You are an AI assistant with access to a function:

#1 Function: toolFuncGetLibraKey
Description: Generates Private Key and returns Public Key

When asked to generate Libra Network Key or get Libra key to register respond ONLY with JSON:
{
"function": "toolFuncGetLibraKey"
}

#2 Function: toolFuncGetLibraBalance
Description: Sends request to Processor to get user balance

When asked to check, return, show, verify Libra balance respond ONLY with JSON:
{
"function": "toolFuncGetLibraBalance"
}
`;

/* Call Mistral locally via Ollama */
async function callMistral(prompt: string): Promise<string> {
  const response = await axios.post('http://localhost:11434/api/generate', {
    model: 'mistral',
    prompt,
    stream: false,
  });

  return response.data.response;
}

function parseJson(value: string) {
  try {
      return JSON.parse(value);

  } catch (e) {
      return undefined;
  }
}

async function execPrompt(userPromts: string): Promise<void> {

    console.log(`Your Request to Mistral: ${userPromts}`);
    const output = await callMistral(simulatedTools + '\nUSER: ' + userPromts);

    /* Try to parse JSON block */
    const jsonOutput = parseJson(output);
    if (!!jsonOutput) {
      const match = output.match(/\{[\s\S]*\}/);
      if (!match) {
        console.log("No function call detected.");
        return;
      }

      const toolCall = JSON.parse(match[0]);

      try {
        let toolFuncReplyToMistralPrompt = '';
        if (toolCall.function === 'toolFuncGetLibraKey') {
          const toolFuncReply = await toolFuncGetLibraKey();          
          toolFuncReplyToMistralPrompt = `Tell to user that Public Key to register is '${toolFuncReply}'`;
  
        } else if (toolCall.function === 'toolFuncGetLibraBalance') {
          const toolFuncReply = await toolFuncGetLibraBalance();
          toolFuncReplyToMistralPrompt = `${toolFuncReply}`;
  
        } else {
          console.log("Unknown function:", toolCall.function);
          return;
        }
  
        const output = await callMistral(toolFuncReplyToMistralPrompt);
        console.log("Mistral Answer: \n", output);
  
      } catch (err) {
        console.error("Failed to parse function call:", err);
      }
    } else {

      console.log("Mistral Answer: \n", output);      
    }    
}

describe('Mistral LLM - Simulated Tool Call Test', () => {
    it.skip('Call Mistral', async () => {

        await execPrompt("Can you give me the new Libra key?");
        await execPrompt("What is my balance?");
    }, 60000);
});
