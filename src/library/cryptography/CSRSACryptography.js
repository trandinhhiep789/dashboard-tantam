import { System } from "~/utils/dotNetJS/System";

export function GetNewRsaProvider(dwKeySize = 512) {
  return new System.Security.Cryptography.RSACryptoServiceProvider(dwKeySize);
}
export function GenRSAKey(dwKeySize) {
  var rsa = GetNewRsaProvider(dwKeySize);
  const publicKey = rsa.ToXmlString(false);
  const privateKey = rsa.ToXmlString(true);
  return { PublicKey: publicKey, PrivateKey: privateKey };
}

export function GetRSAKey(rsaKey, includePrivateParameters) {
  var rsa = GetNewRsaProvider();
  // Import parameters from xml.
  rsa.FromXmlString(rsaKey);
  // Export RSA key to RSAParameters and include:
  //    false - Only public key required for encryption.
  //    true  - Private key required for decryption.
  return rsa.ExportParameters(includePrivateParameters);
}

export function encryptData2(rsaKey, dwKeySize, plainText) {
  let bytes = System.Text.Encoding.Unicode.GetBytes(plainText);
  let doOaepPadding = true;
  // ------------------------------------------------
  // Encrypt
  // ------------------------------------------------
  let rsa = GetNewRsaProvider();
  // Import the RSA Key information.
  rsa.ImportParameters(GetRSAKey(rsaKey, false));
  const keySize = dwKeySize / 8;
  const maxLength = keySize - 42;
  const dataLength = bytes.length;
  const iterations = dataLength / maxLength;
  let sb = new System.Text.StringBuilder();
  for (let i = 0; i <= iterations; i++) {
    const tempLength = (dataLength - maxLength * i > maxLength) ? maxLength : dataLength - maxLength * i;
    let tempBytes = new Array(tempLength);
    System.Buffer.BlockCopy(bytes, maxLength * i, tempBytes, 0, tempBytes.length);
    let encryptedBytes = rsa.Encrypt(tempBytes, doOaepPadding);
    System.Array.Reverse(encryptedBytes);
    sb.Append(System.Convert.ToBase64String(encryptedBytes));
  }
  return sb.ToString();
}