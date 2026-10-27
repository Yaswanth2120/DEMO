import {scrypt,timingSafeEqual,createHash} from 'node:crypto';
import {promisify} from 'node:util';
const derive=promisify(scrypt);
const salt='4ae5bc51fccce4b409c7b9c8ef16a71e785aafe6904e870b';
const expected=Buffer.from('58295613763ac49b6c248dd29bec8ad1d8498d19fd931ef6cfcb660abad563e03fce79d6a226f30ef08c2cb79b16ad5995105ca6f93a4b3305b791fe7ead5e7b','hex');
const username=createHash('sha256').update('nexafivellc').digest();

// Fixed review account. Only a salted password hash is stored on the server.
export async function verifySiteCredentials(name,password){
 if(typeof name!=='string'||typeof password!=='string'||name.length>128||password.length>128)return false;
 const candidate=await derive(password,salt,64);
 const candidateName=createHash('sha256').update(name).digest();
 return timingSafeEqual(candidate,expected)&&timingSafeEqual(candidateName,username);
}
