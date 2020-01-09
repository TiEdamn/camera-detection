import React, { Component } from 'react';

import config from '../../config/main';
import './index.scss';

// https://stackoverflow.com/questions/29441389/how-to-draw-polygon-on-canvas-with-mouse-clicks-pure-js

export default class Zone extends Component {
    render() {
        return <canvas id="zone" width={config.width} height={config.height} />;
    }
}
