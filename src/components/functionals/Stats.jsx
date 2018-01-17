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
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="stats__container">
        {/* <Icon color="accent">add_circle</Icon> */}
        <h1 className={classes.statsHeading}>
          <Equalizer className={classes.headingIcon} /> SYSHub Stats
        </h1>
        <div className={classes.statsMainDiv}>
          <GridList cols={4} cellHeight={300} className={classes.statsGridDiv}>
            {this.props.SysStats.map((item, key) => {
              return (
                <Card key={key} className={classes.statsCard}>
                  <CardHeader
                    className={classes.statsCardHeader}
                    title={
                      <img
                        src={require('./../../assets/img/' + item.img)}
                        height="40"
                      />
                    }
                  />
                  <CardContent style={{ position: 'relative' }}>
                    <Typography className={classes.statsTextHeading}>
                      <h1 style={{ color: '#3498db' }}> {item.num} </h1>
                    </Typography>
                    <Typography className={classes.statsText}>
                      {item.text}
                    </Typography>
                    <Typography className={classes.statsPercentage}>
                      <img
                        src={require('./../../assets/img/' + item.arrow)}
                        height="20"
                      />
                      {item.percentage}
                    </Typography>
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
    SysStats: state.sysStats.values,
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
