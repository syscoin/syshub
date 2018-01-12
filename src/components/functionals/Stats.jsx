import React, { Component } from 'react';
import { Equalizer, AccountCircle, Usb, TrendingUp } from 'material-ui-icons';
import { GridList, GridListTile } from 'material-ui/GridList';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
// import style
import './styles/stats.css';

const stats = [
  {
    img: 'png_stasts_sys.png',
    num: '0.00022',
    text: 'BTC 1000 USD',
    percentage: '9%',
    arrow: 'png_button_down.png',
  },
  {
    img: 'png_menu_masternodes_selected.png',
    num: '0415/0430',
    text: 'REGISTERED MASTER NODES',
    percentage: '10%',
    arrow: 'png_button_up.png',
  },
  {
    img: 'png_stats_users.png',
    num: '2000',
    text: 'ALL USERS',
    percentage: '9%',
    arrow: 'png_button_down.png',
  },
];

class Stats extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="stats__container">
        {/* <Icon color="accent">add_circle</Icon> */}
        <h1 className="stats-heading">
          <Equalizer /> SYSHub Stats
        </h1>
        <div className="stats-div">
          <GridList cols={4} cellHeight={300}>
            {stats.map((item, key) => {
              return (
                <Card
                  key={key}
                  style={{ textAlign: 'center', borderRadius: '10px' }}
                >
                  <CardHeader
                    title={
                      <img
                        src={require('./../../assets/img/' + item.img)}
                        height="40"
                      />
                    }
                  />
                  <CardContent>
                    <Typography>
                      {' '}
                      <h1> {item.num} </h1>{' '}
                    </Typography>
                    <Typography style={{ color: '#bdc3c7' }}>
                      {' '}
                      {item.text}{' '}
                    </Typography>
                    <Typography style={{ color: '#3498db' }}>
                      {' '}
                      <img
                        src={require('./../../assets/img/' + item.arrow)}
                        height="20"
                      />{' '}
                      {item.percentage}{' '}
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

export default Stats;
