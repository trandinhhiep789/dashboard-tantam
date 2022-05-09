

export function GetNewRsaProvider(dwKeySize) {
    if (!dwKeySize) dwKeySize = 512;
    return new RSA.System.Security.Cryptography.RSACryptoServiceProvider(dwKeySize);
}
export function GenRSAKey(dwKeySize)
{
	var rsa = GetNewRsaProvider(dwKeySize);
	const publicKey= rsa.ToXmlString(false);
	const privateKey = rsa.ToXmlString(true);
	return {PublicKey: publicKey, PrivateKey: privateKey};

}

export default {GetNewRsaProvider, GenRSAKey};