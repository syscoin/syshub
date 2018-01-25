import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';



// import style
import { newsCardStyle } from './styles'
// import components
import { Stats, WelcomeBox } from '../functionals';



class NewsCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      news: [
        {
          newsHeading: 'Price of BitCoin Decrease',
          newsContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus!'
        }, {
          newsHeading: 'Price of BitCoin Increase',
          newsContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus!'
        },
        {
          newsHeading: 'SysCoin is Best',
          newsContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus!'
        },
        {
          newsHeading: 'Mujhe Kuin Nikala',
          newsContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus!'
        },
        {
          newsHeading: 'Mujhe Kuin Nikala',
          newsContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus!'
        },
        {
          newsHeading: 'Mujhe Kuin Nikala',
          newsContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus!'
        },
        {
          newsHeading: 'Mujhe Kuin Nikala',
          newsContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim animi suscipit laudantium itaque necessitatibus harum incidunt iure qui rerum fugit repellendus esse ea, beatae impedit facilis deserunt! Ab, ducimus!'
        }
      ]
    }
  }





  render() {

    const { classes, selectNews } = this.props;
    const noImage = require('../../assets/img/no-user-image.gif')
    return (
      <div className={classes.root}>

        {
          this.state.news.map((data, index) => (
            <div className="card-item" key={index}>
              {/* news card */}
              <Grid item className="news-card-grid" >
                {/* news image grid */}
                <Grid md={2} inline="true" className='newsCardImage-grid inline-block' >
                  <img src={noImage} alt="news image" />
                </Grid>
                {/* News Content Grid */}
                <Grid md={10} className='newsCardContent-grid inline-block'>
                  <Card className='card'>
                    <CardContent>
                      {/* content heading */}
                      <Typography type="headline" component="h2" className='news-heading'>
                        1 Jan ,2018 - <span className='cardSubHeading'>{data.newsHeading}</span>
                      </Typography>
                      {/* content text */}
                      <Typography component="p" className="newsContent">
                        {data.newsContent}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                {/* show more button */}
                <Grid md={12} className='showMoreButton-grid'>
                  <Button raised onClick={(index)=> selectNews(index)}> Show More </Button>
                </Grid>
              </Grid>
              <Divider className={classes.divider}/>
            </div>
          ))

        }

      </div >
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {

  };
};

export default connect(stateToProps, dispatchToProps)(withStyles(newsCardStyle)(NewsCard));
