import Home from './Home';
import Menu from './Menu';
import PizzaPage from './PizzaPage';
import OrderedPage from './OrderedPage';
import History from './History';
import Create from './Create';
import CreatedPizza from './CreatedPizza';

export interface IRoute {
  route: string;
  module: (props: any) => JSX.Element;
}

export const routes: IRoute[] = [
  {
    route: '/',
    module: Home,
  },
  {
    route: '/menu',
    module: Menu,
  },
  {
    route: '/menu/:name',
    module: PizzaPage,
  },
  {
    route: '/menu/:name/order',
    module: OrderedPage,
  },
  {
    route: '/history',
    module: History,
  },
  {
    route: '/create',
    module: Create,
  },
  {
    route: '/create/order',
    module: CreatedPizza,
  },
];
