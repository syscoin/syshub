import appActions from './appActions';
import sysStatsActions from './sysStatsActions';
import proposalActions from './proposalActions';
import mediumActions from './mediumActions';

export default {
  ...appActions,
  ...sysStatsActions,
  ...proposalActions,
  ...mediumActions
};
