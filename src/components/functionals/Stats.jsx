import React, { Component } from 'react';
import { Equalizer, AccountCircle, Usb, TrendingUp } from 'material-ui-icons';
import injectSheet from 'react-jss';

import GridList, { GridListTile } from 'material-ui/GridList';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux'; //to pass functions
import { bindActionCreators } from 'redux';

// import style
import { statsStyle } from './styles';

class Stats extends Component {
  getValue(field) {
    const value = {
      changeRate: (1000 / this.props.value.exchange_rates.btc_usd).toFixed(5),

      masternodes: `${
        this.props.value.general.registered_masternodes_verified
      } / ${this.props.value.general.registered_masternodes}`,
      totUsers: this.props.value.general.all_user,
    }[field];
    return value;
  }

  percentages(field) {
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
  render() {
    const { classes, deviceType } = this.props;

    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={style}>
        {/* <Icon color="accent">add_circle</Icon> */}
        <h1 className="statsHeading">
          <Equalizer className="headingIcon" /> SYSHub Stats
        </h1>
        <div className="statsMainDiv">
          <GridList cols={4} cellHeight={300} className="statsGridDiv">
            {this.props.sysStats.map((item, key) => {
              return (
                <Card key={key} className="statsCard">
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
                  <CardContent style={{ position: 'relative' }}>
                    <div className={'statsTextHeading'}>
                      <h1> {this.getValue(item.key)} </h1>
                    </div>
                    <div className="statsText">{item.text}</div>
                    <div className="statsPercentage">
                      <img
                        alt="a"
                        src={require('./../../assets/img/' +
                          this.percentages(item.key).arrow)}
                        height="20"
                      />
                      {`${this.percentages(item.key).value}%`}
                    </div>
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
    deviceType: state.app.platform.deviceType,
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
