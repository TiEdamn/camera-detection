import React, { Component } from 'react';

import config from '../../config/main';
import './index.scss';

// https://stackoverflow.com/questions/29441389/how-to-draw-polygon-on-canvas-with-mouse-clicks-pure-js

export default class Zone extends Component {
    state = {
        coordinates: [],
        isDone: false,
        canvasOffset: []
    };

    componentDidMount() {
        const canvas = this.refs.zone;
        const client = canvas.getBoundingClientRect();

        this.setState({ canvasOffset: [client.left, client.top] });
    }

    componentDidUpdate() {
        this.drawZone();
    }

    handleClickDone = () => {
        this.setState({ isDone: true });
    };

    handleClickCanvas = event => {
        if (this.isDone) return;

        const { canvasOffset, coordinates } = this.state;

        const mouseX = parseInt(event.clientX - canvasOffset[0]);
        const mouseY = parseInt(event.clientY - canvasOffset[1]);

        this.setState({
            coordinates: [...coordinates, { x: mouseX, y: mouseY }]
        });
    };

    drawZone = () => {
        const { coordinates } = this.state;

        if (coordinates.length > 0) {
            const ctx = this.refs.zone.getContext('2d');

            ctx.lineWidth = 2;
            ctx.strokeStyle = config.colors.green;

            ctx.clearRect(0, 0, config.width, config.height);
            ctx.beginPath();
            ctx.moveTo(coordinates[0].x, coordinates[0].y);
            coordinates.map(item => ctx.lineTo(item.x, item.y));
            ctx.closePath();
            ctx.stroke();
        }
    };

    render() {
        return (
            <canvas
                id="zone"
                ref="zone"
                width={config.width}
                height={config.height}
                onClick={this.handleClickCanvas}
            />
        );
    }
}
