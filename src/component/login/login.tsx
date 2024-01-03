import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { useState } from 'react';
import { fromB64 } from "@mysten/bcs";
import GoogleLogo from "./google.svg";


import { SuiClient } from "@mysten/sui.js/client";
import {
  CLIENT_ID,
  FULLNODE_URL,
  KEY_PAIR_SESSION_STORAGE_KEY,
  MAX_EPOCH_LOCAL_STORAGE_KEY,
  RANDOMNESS_SESSION_STORAGE_KEY,
  REDIRECT_URI,
  STEPS_LABELS_TRANS_KEY,
  SUI_DEVNET_FAUCET,
  SUI_PROVER_DEV_ENDPOINT,
  USER_SALT_LOCAL_STORAGE_KEY,
} from "./constant";
import {
    genAddressSeed,
    generateNonce,
    generateRandomness,
    getExtendedEphemeralPublicKey,
    getZkLoginSignature,
    jwtToAddress,
  } from "@mysten/zklogin";
import { Stack } from "@mui/material";




  const resetstate =() => {
    setEphemeralKeyPair(undefined);
    setNonce("");

  };
  
  const MAX_EPOCH_LOCAL_STORAGE_KEY = "demo_max_epoch_key_pair";
  const [maxEpoch, setMaxEpoch] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState("");
  const [nonce, setNonce] = useState("");
  

  const suiClient = new SuiClient({ url: FULLNODE_URL });
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "id_token",
    scope: "openid",
    nonce: nonce,
  });


    const RANDOMNESS_SESSION_STORAGE_KEY = "demo_randomness_key_pair";
    const KEY_PAIR_SESSION_STORAGE_KEY = "demo_ephemeral_key_pair";
    const [ephemeralKeyPair, setEphemeralKeyPair] = useState<Ed25519Keypair>();
    const [randomness, setRandomness] = useState("");
    const privateKey = window.sessionStorage.getItem(
      KEY_PAIR_SESSION_STORAGE_KEY
    );


    // if (privateKey) {
    //     const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(
    //       fromB64(privateKey)
    //     );
    //     setEphemeralKeyPair(ephemeralKeyPair);
    //   }
    return (
        <div>
             <button
                onClick={() => {
                  const randomness = generateRandomness();
                  window.sessionStorage.setItem(
                    RANDOMNESS_SESSION_STORAGE_KEY,
                    randomness
                  );
                  setRandomness(randomness);
                }}
              >
               'Generate randomness'
              </button>
              <button
                
                
                onClick={async () => {
                  const { epoch } = await suiClient.getLatestSuiSystemState();

                  setCurrentEpoch(epoch);
                  window.localStorage.setItem(
                    MAX_EPOCH_LOCAL_STORAGE_KEY,
                    String(Number(epoch) + 10)
                  );
                  setMaxEpoch(Number(epoch) + 10);
                }}
              >
              Fetch current Epoch
              </button>
            <button
                onClick={() => {
                    const ephemeralKeyPair = Ed25519Keypair.generate();
                    window.sessionStorage.setItem(
                      KEY_PAIR_SESSION_STORAGE_KEY,
                      ephemeralKeyPair.export().privateKey
                  );
                    setEphemeralKeyPair(ephemeralKeyPair);
                }}
            >
                Create random ephemeral KeyPair{" "}
                
            </button>
            
  

            <button
                
                color="error"
                disabled={!ephemeralKeyPair}
                onClick={() => {
                  window.sessionStorage.removeItem(
                    KEY_PAIR_SESSION_STORAGE_KEY
                  );
                  setEphemeralKeyPair(undefined);
                }}
              >
                Clear ephemeral KeyPair{" "}
              </button>
              <button
                  
                  disabled={
                    !ephemeralKeyPair ||
                    !maxEpoch ||
                    !currentEpoch ||
                    !randomness
                  }
                  onClick={() => {
                    if (!ephemeralKeyPair) {
                      return;
                    }
                    const nonce = generateNonce(
                      ephemeralKeyPair.getPublicKey(),
                      maxEpoch,
                      randomness
                    );
                    setNonce(nonce);
                  }}
                >
                  Generate Nonce
                </button>
                
              <button
                
                disabled={!nonce}
                
                onClick={() => {
                 
                  const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
                  window.location.replace(loginURL);
                }}
              >
                <img
                  src={GoogleLogo}
                  width="16px"
                  style={{
                    marginRight: "8px",
                  }}
                  alt="Google"
                />{" "}
                Sign In With Google
              </button>

              
      
        </div>
    );
}
