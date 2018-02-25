import React, { Component } from 'react';
import { Equalizer } from 'material-ui-icons';

import GridList from 'material-ui/GridList';
import Card, {
  CardHeader,
  CardContent,

} from 'material-ui/Card';
import { withStyles } from 'material-ui';

import { connect } from 'react-redux'; //to pass functions
import { bindActionCreators } from 'redux';

// import style
import { statsStyle } from './styles';

class Stats extends Component {

  getValue(field) {
    const { sysStatsValue } = this.props;
    const { sysPrice, totMn, regMn, users } = sysStatsValue;

    const value = {
      changeRate: sysPrice ? sysPrice.price_btc : 0,
      masternodes: totMn ? `${regMn} / ${totMn}` : '0/0',
      totUsers: users ? users : 0,
    }[field];
    return value;
  }

  render() {
    const { classes, deviceType } = this.props;

    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={style}>
        <h1 className="statsHeading">
          <Equalizer className="headingIcon" /> SYSHub Stats
        </h1>
        <div className="statsMainDiv">
          <GridList cols={deviceType === 'mobile' ? 3 : 4} cellHeight={300} className="statsGridDiv">
            {this.props.cards.map((item, key) => {
              return (
                <Card key={key} className="statsCard" >
                  <CardHeader
                    className="statsCardHeader"
                    title={
                      <img
                        alt="a"
                        src={require('./../../assets/img/' + item.img)}
                        height="40"
                      />
                    }
                  />
                  <CardContent height={'50%'} style={{ position: 'relative', }}>
                    <div className={'statsTextHeading'}>
                      <h1> {this.getValue(item.key)} </h1>
                    </div>
                    <div className="statsText">{item.text}</div>

                  </CardContent>
                </Card>
              );
            })}
          </GridList>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //pass the providers
  return {
    cards: state.sysStats.cards,
    sysStatsValue: {
      sysPrice: state.sysStats.sysPrice,
      totMn: state.sysStats.totMn,
      regMn: state.sysStats.regMn,
      users: state.sysStats.users,
    }
  };
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(statsStyle)(Stats)
);
