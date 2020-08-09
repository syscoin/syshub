import home from './home/index';
import banner from './banner/index';
import doughnut from './partials/doughnut/index';
import income from './partials/income/index';
import investment from './partials/investment/index';
import price from './partials/price/index';
import priceLineChart from './partials/priceLineChart/index';
import worldMap from './partials/worldMap/index';

export default {
  ...home,
  ...banner,
  ...doughnut,
  ...income,
  ...investment,
  ...price,
  ...worldMap,
}
