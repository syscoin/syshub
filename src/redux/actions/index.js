import appActions from './appActions';
import sysStatsActions from './sysStatsActions';
import proposalActions from './proposalActions';
import mediumActions from './mediumActions';
import sysGovernanceActions from './sysGovernanceActions';
import cancelXHRActions from './cancelXHRActions';

export default {
  ...appActions,
  ...sysStatsActions,
  ...proposalActions,
  ...mediumActions,
  ...sysGovernanceActions,
  ...cancelXHRActions
};
