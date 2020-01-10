import React, { Component } from 'react';
import { connect } from 'react-redux';

import config from '../../config/main';
import './index.scss';
import { addCoordinate } from '../../actions';

class Zone extends Component {
    state = {
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

    handleClickCanvas = event => {
        const { status, addCoordinate } = this.props;

        if (status) return;

        const { canvasOffset } = this.state;

        const mouseX = parseInt(event.clientX - canvasOffset[0]);
        const mouseY = parseInt(event.clientY - canvasOffset[1]);

        addCoordinate({ x: mouseX, y: mouseY });
    };

    drawZone = () => {
        const { coordinates } = this.props;

        const ctx = this.refs.zone.getContext('2d');
        ctx.lineWidth = 2;
        ctx.strokeStyle = config.colors.green;
        ctx.clearRect(0, 0, config.width, config.height);

        if (coordinates.length > 0) {
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

const mapStateToProps = state => ({
    status: state.app.status,
    coordinates: state.app.coordinates
});

const mapDispatchToProps = dispatch => ({
    addCoordinate: coord => dispatch(addCoordinate(coord))
});

export default connect(mapStateToProps, mapDispatchToProps)(Zone);
