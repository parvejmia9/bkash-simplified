import { Request, Response } from 'express';
import { Provider } from '../models/provider.models';

async function showProviderBalance(req:Request,res:Response){
    try{
        const providerId=req.params.id;
        if(!providerId || isNaN(Number(providerId))){
            res.status(400).json({ error: 'Invalid provider ID' });
            return
        }
        const provider=await Provider.findByPk(providerId);
        if(!provider){
            res.status(404).json({ error: 'Provider not found' });
            return
        }
        res.json({balance:provider.providerBalance});
    }catch(error){
        res.status(500).json({ error: 'An error occurred while fetching the provider balance' });
    }
}
async function getProvider(req:Request,res:Response){
    try{
        const providerId=req.params.id;
        const provider=await Provider.findByPk(providerId);
        if(!provider){
            res.status(404).json({ error: 'Provider not found' });
            return
        }
        res.json(provider);
    }catch(error){
        res.status(500).json({ error: 'An error occurred while fetching the provider' });
    }
}
async function getAllProviders(req:Request,res:Response){
    try{
        const providers=await Provider.findAll();
        res.json(providers);
    }catch(error){
        res.status(500).json({ error: 'An error occurred while fetching the providers' });
    }
}
export {showProviderBalance,getProvider,getAllProviders};