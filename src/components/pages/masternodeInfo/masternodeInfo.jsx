import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

// import Material components
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

// import style
import masterNodeInfoStyle from './masternodeInfo.style';

const cardDim = {
  h: 250,
  w: 180,
};

class MasternodeInfo extends Component {

  componentDidMount() {
    this.props.cancelXHR();
  }

   render() {
    const { classes, deviceType, tilesData } = this.props;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={style}>
        <h1 className="title">Masternode Resources</h1>
        <div className="masternode-div">
          <div className="heading">
            <GridList cellHeight={cardDim.h} spacing={50}>
              {tilesData.map(tile => (
                <GridListTile key={tile.key} className="girdCard" cols={deviceType === 'mobile' ? 2 : 1}>
                  <a href={tile.url} target="_blank" rel="noopener noreferrer" className="linkWrapper">
                    <img className="image" src={tile.img} height={cardDim.h-20} width={'95%'} alt={tile.title}/>
                    <GridListTileBar
                      title={<span style={{color: 'white'}}>{tile.title}</span>}
                    />
                  </a>
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    tilesData: state.mnInfo.tilesData
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(injectSheet(masterNodeInfoStyle)(MasternodeInfo));
