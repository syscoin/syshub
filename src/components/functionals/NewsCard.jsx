import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Grid, withStyles } from 'material-ui';

import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

// import style
import { newsCardStyle } from './styles';

class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      classes,
      post,
      selectNews,
      image,
      deviceType,
    } = this.props;
    console.log(post.pubDate.slice(0, -12),"data-------------")
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const noImage = require('../../assets/img/no-user-image.gif');

    return (
      <div className={style} onClick={()=>{this.props.deviceType === 'mobile'?selectNews(post.guid) : null}}>
        <div className='card-item' key={post.guid}>
          {/* news card */}
          <Grid container spacing={24} className="news-card-grid">
            {/* news image grid */}
            <Grid
            item
              md={2}
              xs={2}
              inline="true"
              className="newsCardImage-grid inline-block"
            >
              { <img
                  src={image ? image.url : noImage}
                  alt={image ? image.title : 'No Image'}
                  title={image ? image.title : 'No Image'}/>
              }
            </Grid>
            {/* News Content Grid */}
            <Grid item md={10} xs={10} className="newsCardContent-grid inline-block">
              <Card className="card">
                <CardContent>
                  {/* content heading */}
                  <Typography
                    type="headline"
                    component="h3"
                    className={`news-heading ${
                      this.props.readed ? 'readed' : ''
                      }`}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    type="subheading"
                    component="p"
                    className="cardSubHeading"
                  >
                    {post.pubDate.slice(0, -12)}
                  </Typography>
                  {/* content text */}
                  <Typography component="p" className="newsContent">
                    {post.newsContent}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* show more button */}
            <Grid item md={12} xs={12} className="showMoreButton-grid">
              <Button raised onClick={index => selectNews(post.guid)}>
                {' '} Show More {' '}
              </Button>
            </Grid>
          </Grid>
          <Divider className="divider" />
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(newsCardStyle)(NewsCard)
);
