/**
 * from: https://github.com/mckaywrigley/ai-code-translator/blob/main/utils/index.ts
 */
import endent from 'endent'

export const createPrompt = (from: string, to: string, inputCode: string) => {
  if (from === 'Natural Language') {
    return endent`
    You are an expert programmer in all programming languages. Translate the natural language to "${to}" code. Do not include \`\`\`.

    Example translating from natural language to JavaScript:

    Natural language:
    Print the numbers 0 to 9.

    JavaScript code:
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }

    Natural language:
    ${inputCode}

    ${to} code (no \`\`\`):
    `
  } else if (to === 'Natural Language') {
    return endent`
      You are an expert programmer in all programming languages. Translate the "${from}" code to natural language in plain English that the average adult could understand. Respond as bullet points starting with -.
  
      Example translating from JavaScript to natural language:
  
      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
  
      Natural language:
      Print the numbers 0 to 9.
      
      ${from} code:
      ${inputCode}

      Natural language:
     `
  } else {
    return endent`
      You are an expert programmer in all programming languages. Translate the "${from}" code to "${to}" code. Do not include \`\`\`.
  
      Example translating from JavaScript to Python:
  
      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
  
      Python code:
      for i in range(10):
        print(i)
      
      ${from} code:
      ${inputCode}

      ${to} code (no \`\`\`):
     `
  }
}
