import home from './pages/home/index';
import banner from './parts/banner/index';
import header from './parts/header/index';
import doughnut from './partials/doughnut/index';
import income from './partials/income/index';
import investment from './partials/investment/index';
import price from './partials/price/index';
import priceLineChart from './partials/priceLineChart/index';
import worldMap from './partials/worldMap/index';

export default {
  ...home,
  ...banner,
  ...header,
  ...doughnut,
  ...income,
  ...investment,
  ...price,
  ...priceLineChart,
  ...worldMap,
}
