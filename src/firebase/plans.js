import {db} from './config';
import { addDoc, collection, serverTimestamp, query, where, getDocs, doc, getDoc,updateDoc } from "firebase/firestore";

export async function savePlan(userId,formData){
    const docRef=await addDoc(collection(db,"plans"),{
        userId,
        inputs:formData,
        sections:{},
        createdAt:serverTimestamp(),
    });
    return docRef.id;
}

export async function getPlan(userId){
    const planRef=await query(collection(db,"plans"),where("userId","==",userId));
    const snapshot=await getDocs(planRef);
   return snapshot.docs.map((doc)=>({id:doc.id, ...doc.data()}));
}

export async function getPlanById(id){
    const ref=doc(db,'plans',id);
    const snapshot=await getDoc(ref);
    if (snapshot.exists()){ return {id:snapshot.id, ...snapshot.data()}}
    return null;
}

export async function updateSection(planId,sectionKey,text){
    const ref=doc(db,"plans",planId);
    await updateDoc(ref,{[`sections.${sectionKey}`]: text});

}