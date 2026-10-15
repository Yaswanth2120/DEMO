// Shared FormSubmit integration used by both designs. Field names match the original website form.
export const FORM_ENDPOINT='https://formsubmit.co/ajax/info@nexafiveglobal.com';
export const subjects=['Engineering consultation','Corrosion testing and mitigation','Energy / BEV engineering','AI/ML platform inquiry','Manufacturing and tooling support','General inquiry'];
export async function sendEnquiry(data){
 try{
  const response=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(20000)});
  const result=await response.json();
  return response.ok&&(result.success===true||result.success==='true');
 }catch{return false}
}
