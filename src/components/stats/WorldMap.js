import React, { Component } from 'react';
import Datamaps from 'datamaps';
import { withTranslation } from "react-i18next";
import SubTitle from '../global/SubTitle';

class WorldMap extends Component {
    constructor(props){
        super(props);
        window.addEventListener('resize', this.resize);
    }
    resize = () => {
        if (this.map) {
            this.map.resize();
        }
    }
    //this will create the map when the component mounts
    componentDidMount() {
        this.drawMap(this.props.mapData,this.props.mapFills);
    }

    //this will remove the map from the dom when the react component is unmounted
    // componentWillReceiveProps() {
    // }

    //this will update the map with the latest props
    componentDidUpdate() {
        this.clear();

        this.drawMap();
    }

    componentWillUnmount() {
        this.clear();
        window.removeEventListener('resize', this.resize);
    }
    clear = () => {
        const container = this.refs.world_map_container;

        for (const child of Array.from(container.childNodes)) {
            container.removeChild(child);
        }
    }
    drawMap = (mapdata,mapfill) => {
        const { t } = this.props;
        var map = new Datamaps(Object.assign({}, {
            ...this.props
        }, {
            element: this.refs.world_map_container, // this is the place where the react dom and the Datamaps dom will be wired
            projection: 'mercator', // this is hardcoded here as we want the projection to be constant
            fills: mapfill,
            data: mapdata,
            geographyConfig: {
                popupTemplate: function(geo, data) {
                    if(data === null){
                        // console.log(geo.properties.name)
                        return ['<div class="hoverinfo"><strong>',
                        `${t('worldMap.noMasternodes')} ` + geo.properties.name + '</strong></div>'].join('')
                    }else{
                        // console.log(geo.properties.name,data.masternodes)
                        return ['<div class="hoverinfo"><strong>',
                        geo.properties.name + ': ' + data.masternodes,
                        '</strong></div>'].join('');
                    }

                }
            }
        }));

        this.map = map;

    }
    render() {
        const { t } = this.props;
        return (
            <>
                <SubTitle heading={t('worldMap.title')} />
                <div ref="world_map_container" className="world_map" style={{width:'100%', height:'550px', position: 'relative'}}></div>
            </>
        )

    }
}

export default withTranslation()(WorldMap);
