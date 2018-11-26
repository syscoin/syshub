import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import injectSheet from 'react-jss';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// import style
import { newsCardStyle } from '../styles';

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
      deviceType,
    } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const image = post.image;
    const noImage = require('../../../assets/img/no-user-image.gif');

    return (
      <div className={style} onClick={() => selectNews(post.guid)}>
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
              {<img
                src={image ? image.url : noImage}
                alt={image ? image.title : 'No Image'}
                title={image ? image.title : 'No Image'} />
              }
            </Grid>
            {/* News Content Grid */}
            <Grid item md={10} xs={10} className="newsCardContent-grid inline-block">
              <Card className="card">
                <CardContent>
                  {/* content heading */}
                  <Typography
                    component="h2"
                    variant="headline"
                    className={`news-heading ${
                      this.props.readed ? 'readed' : ''
                      }`}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body1"
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
              <Button raised="true" onClick={index => selectNews(post.guid)}>
                {' '} Show More {' '}
              </Button>
            </Grid>
          </Grid>
        </div>
          <Divider className="divider" />
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
  injectSheet(newsCardStyle)(NewsCard)
);
