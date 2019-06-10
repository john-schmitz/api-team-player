import { handleCors, handleBodyRequestParsing, handleCompression } from './common';
import { handleExpressJwt } from './auth';
import { reqLogger } from './reqLogger';

export default [handleCors, reqLogger, handleBodyRequestParsing, handleExpressJwt, handleCompression];
