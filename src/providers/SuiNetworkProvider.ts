import { JsonRpcProvider, mainnetConnection} from '@mysten/sui.js';

export const suiNetworkProvider = new JsonRpcProvider(mainnetConnection);
