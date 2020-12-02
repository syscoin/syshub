import React, { Component } from 'react';
import Datamaps from 'datamaps';
import { withTranslation } from "react-i18next";
import SubTitle from '../global/SubTitle';

/**
 * Component to show the worldMap and it's masternodes
 * @component
 * @subcategory Stats
 * @param {*} props t from withTranslation and mapData, mapFills from stats
 * @example
 * const mapData = {}
 * const mapFills = {}
 * return (
 *  <WorldMap mapFills={mapFills} mapData={mapData} />
 * )
 */
class WorldMap extends Component {
    /**
     * To add an event to the window resize
     * @constructor
     */
    constructor(props){
        super(props);
        window.addEventListener('resize', this.resize);
    }

    /**
     * function to resize the map
     * @function
     */
    resize = () => {
        if (this.map) {
            this.map.resize();
        }
    }

    /**
     * DidMount that will create the map when the component mounts
     * @function
     */
    componentDidMount() {
        this.drawMap(this.props.mapData,this.props.mapFills);
    }

    /**
     * DidUpdate that will update the map with the latest props
     * @function
     */
    componentDidUpdate() {
        this.clear();
        this.drawMap();
    }

    /**
     * WillUnmount that will remove the map from the dom when the react component is unmounted
     * @function
     */
    componentWillUnmount() {
        this.clear();
        window.removeEventListener('resize', this.resize);
    }

    /**
     * function to clear the map and remove it
     * @function
     */
    clear = () => {
        const container = this.refs.world_map_container;

        for (const child of Array.from(container.childNodes)) {
            container.removeChild(child);
        }
    }

    /**
     * function to draw the map
     * @function
     */
    drawMap = (mapdata, mapfill) => {
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
                        return ['<div class="hoverinfo" style="color:black;"><strong>',
                        `${t('worldMap.noMasternodes')} ` + geo.properties.name + '</strong></div>'].join('')
                    }else{
                        // console.log(geo.properties.name,data.masternodes)
                        return ['<div class="hoverinfo" style="color:black;"><strong>',
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