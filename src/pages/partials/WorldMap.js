import React, { Component } from 'react';
import Datamaps from 'datamaps';

export class WorldMap extends Component {
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
    componentWillReceiveProps() {
        this.clear();
    }

    //this will update the map with the latest props
    componentDidUpdate() {
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
                        console.log(geo.properties.name)
                        return ['<div class="hoverinfo"><strong>',
                        'No masternodes in ' + geo.properties.name + '</strong></div>'].join('')
                    }else{
                        console.log(geo.properties.name,data.masternodes)
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
        return(
            <section className="section__map gradient_box2 pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-12" data-animation="fadeInUp" data-animation-delay="1s">
                            <div className="Heading__Bar mb-5 text-center">
                                <h1 className="text-white display-4 font-weight-bold">Masternode Locations</h1>
                            </div>
                            <div ref="world_map_container" className="world_map"></div>
                        </div>
                    </div>
                </div>
            </section>
        )
        
    }
}

export default WorldMap;