import {Router} from 'express';
import {getConfig} from '../config.js';
const api=Router();
api.get('/health',(_req,res)=>res.json({status:'ok'}));
api.get('/config',(_req,res)=>{res.setHeader('Cache-Control','no-store');res.json(getConfig())});
api.use((_req,res)=>res.status(404).json({error:'API endpoint not found'}));
export default api;
