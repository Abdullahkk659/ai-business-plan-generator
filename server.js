import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

const anthropic=new Anthropic({
    apiKey:process.env.VITE_ANTHROPIC_API_KEY,
});

app.post("/api/generate",async(req,res)=>{
    try{
        const{prompt}=req.body;
        const message=await anthropic.messages.create({
            model:"claude-sonnet-4-6",
            max_tokens:1000,
            messages:[{role:"user",content:prompt}]
        })
        res.json({ text:message.content[0].text });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
const PORT = 3001;
app.listen(PORT, () => console.log(`✅ API server running on http://localhost:${PORT}`));