import userRoutes from './user/routes';
import matchRoutes from './match/routes';
import updateRoutes from './update/routes';

export default [...userRoutes, ...matchRoutes, ...updateRoutes];
