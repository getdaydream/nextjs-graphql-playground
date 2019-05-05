import * as createRoutes from 'next-routes';
import Routes from 'next-routes';

// @ts-ignore Types are broken
export const routes: Routes = createRoutes();

routes.add('/post/edit/:id?', 'post');
