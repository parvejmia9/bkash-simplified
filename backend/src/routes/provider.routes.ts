import express from 'express';
import { getAllProviders ,getProvider} from '../controllers/provider.controller';
import { showProviderBalance } from '../controllers/provider.controller';


const router = express.Router();
router.get('/providers', getAllProviders);
router.get('/providers/:id', getProvider);
router.get('/providers/:id/balance', showProviderBalance);

export default router;