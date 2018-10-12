import React, { Component } from 'react';
import { Equalizer } from '@material-ui/icons';

import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { connect } from 'react-redux'; //to pass functions
import { bindActionCreators } from 'redux';

// import style
import injectSheet from 'react-jss';
import { statsStyle } from './styles';

class Stats extends Component {

  getValue(field) {
    return {
      changeRate: this.props.sysInfo.sysPrice ? (parseFloat(this.props.sysInfo.sysPrice.price_btc).toFixed(5)) : 0,
      masternodes: this.props.sysInfo.mnCount ? (`${this.props.sysInfo.mnRegistered} / ${this.props.sysInfo.mnCount.qualify}`) : '0/0',
      totUsers: this.props.sysInfo ? (this.props.sysInfo.users) : 0,
    }[field];
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
    sysInfo: {
      mnCount: state.sysStats.mnCount,
      mnRegistered: state.sysStats.mnRegistered,
      sysPrice: state.sysStats.sysPrice,
      users: state.sysStats.users,
    },
  };
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(statsStyle)(Stats)
);
