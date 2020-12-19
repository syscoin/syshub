import home from './pages/home/index';
import about from './pages/about/index';
import setup from './pages/setup/index';
import check from './pages/check/index';
import governance from './pages/governance/index';
import login from './pages/login/index';
import signup from './pages/signup/index';
import recover from './pages/recover/index';
import profile from './pages/profile/index';
import proposal from './pages/proposal/index';
import error from './pages/error/index';
import banner from './parts/banner/index';
import header from './parts/header/index';
import doughnut from './partials/doughnut/index';
import income from './partials/income/index';
import investment from './partials/investment/index';
import price from './partials/price/index';
import priceLineChart from './partials/priceLineChart/index';
import worldMap from './partials/worldMap/index';
import govlist from './partials/govlist/index';
import superblocks from './partials/superblocks';

const index = {
  ...home,
  ...about,
  ...setup,
  ...check,
  ...governance,
  ...login,
  ...signup,
  ...recover,
  ...profile,
  ...proposal,
  ...error,
  ...banner,
  ...header,
  ...doughnut,
  ...income,
  ...investment,
  ...price,
  ...priceLineChart,
  ...worldMap,
  ...govlist,
  ...superblocks
}

export default index;