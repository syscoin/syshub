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
    const value = {
      changeRate: this.props.value ? ((this.props.value.exchange_rates.btc_dash).toFixed(5)) : 0,

      masternodes: this.props.value ? (`${
        this.props.value.general.registered_masternodes_verified
        } / ${this.props.value.general.registered_masternodes}`) : '0/0',
      totUsers: this.props.value ? (this.props.value.general.all_user) : 0,
    }[field];
    return value;
  }

  percentages(field) {
    if (this.props.value || false) {
      const changeRateNew = parseFloat(this.props.value.exchange_rates.btc_usd);
      const changeRateOld = parseFloat(
        this.props.valueOld.exchange_rates.btc_usd
      );

      const masternodeNew =
        parseFloat(this.props.value.general.registered_masternodes_verified) /
        parseFloat(this.props.value.general.registered_masternodes);
      const masternodeOld =
        parseFloat(this.props.valueOld.general.registered_masternodes_verified) /
        parseFloat(this.props.valueOld.general.registered_masternodes);
      const usersNew = parseFloat(this.props.value.general.all_user);
      const usersOld = parseFloat(this.props.valueOld.general.all_user);

      const value = {
        changeRate: (changeRateNew - changeRateOld) / changeRateOld * 100,
        masternodes: (masternodeNew - masternodeOld) / masternodeOld * 100,
        totUsers: (usersNew - usersOld) / usersOld * 100,
      }[field];

      let arrow = value > 0 ? 'png_button_up.png' : 'png_button_down.png';
      arrow = value === 0 ? 'png_button_updown.png' : arrow;
      return { arrow, value: Math.abs(value).toFixed(2) };
    }
    const value = { changeRate: 0, masternodes: 0, totUsers: 0, }[field];
    let arrow = 'png_button_updown.png';
    return { arrow, value: Math.abs(value).toFixed(2) };


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
            {this.props.sysStats.map((item, key) => {
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
    sysStats: state.sysStats.cards,
    value: state.sysStats.value,
    valueOld: state.sysStats.valueOld,
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
