export async function generateSection(prompt){
    const res=await fetch('/api/generate',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({prompt})
    })
    if(!res.ok){
        const err=await res.json();
        throw new Error(err.error||"Generation failed");
    }
    const data=await res.json();
    return data.text;
}