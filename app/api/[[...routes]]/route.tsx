/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

// create a new app frame with the path /logo-quiz and a callback function that takes in a context object c
app.frame('/logo', (c) => {
  // destructure the context object c to get the buttonValue, inputText, and status
  const { buttonValue, inputText, status } = c
  
  // set the wallet to the inputText or buttonValue
  const wallet = inputText || buttonValue
  
  // return the response object
  return c.res({
    // set the image to a div element
    action: '/logo-check',
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'white',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV7jOYaocjy-HsTkKp8Xg4dhRqRpc0_PVeDBxWqPBK2g&s" width="400" height="400" />
      </div>
    ),
    // set the intents to an array of Button components
    intents: [
      <TextInput placeholder="Name the chain" />,
      <Button value="phantom">Submit</Button>,
    ],
  })
})


app.frame('/okto', (c) => {
  const { buttonValue, inputText, status } = c
  
  const wallet = inputText || buttonValue
  
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {/* render by default Choose your wallet of choice but if wallet is metamask then render Metamask only supports EVM chains and if wallet is phantom then render Phantom only supports Solana chains and if wallet is okto then render Okto supports EVM, Solana, Cosmos with paymasters and native cross chain bridges and much more! Okto FTW! */}
          {status === 'response' ? (
            wallet == 'metamask' ? (
              `Metamask only supports EVM chains`
            ) : wallet == 'phantom' ? (
              `Phantom only supports Solana chains`
            ) : wallet == 'okto' ? (
              `Okto supports EVM, Solana, Cosmos with paymasters and native cross chain bridges and much more! Okto FTW!`
            ) : (
              'Bad Life Choices'
            )
          ) : (
            'Choose your wallet of choice'
          )}
          

          {/* {status === 'response'
            ? `${result == true ? ` Okto WTF!!` : 'Bad Life Choices'}`
            : 'Choose your wallet of choice'} */}

          {/* {status === 'response'
            ? `${result == true ? ` Okto WTF!!` : 'Bad Life Choices'}`
            : 'Choose your wallet of choice'} */}
        </div>
      </div>
    ),
    intents: [
      // <TextInput placeholder="Wallet of choice" />,
      <Button value="phantom">Phantom</Button>,
      <Button value="metamask">Metamask</Button>,
      <Button value="okto">Okto</Button>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
