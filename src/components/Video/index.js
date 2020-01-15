import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import helper from '../../utils/helper';
import config from '../../config/main';

import './index.scss';

class Video extends Component {
    componentDidMount() {
        this.startVideo();
    }

    startVideo = () => {
        const video = this.refs.video;
        const webCamPromise = navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    facingMode: 'user',
                    width: config.width,
                    height: config.height
                }
            })
            .then(stream => {
                video.srcObject = stream;
                return new Promise((resolve, reject) => {
                    video.onloadedmetadata = () => {
                        video.play();
                        resolve();
                    };
                });
            });
        const modelPromise = cocoSsd.load();
        Promise.all([modelPromise, webCamPromise]).then(values => {
            this.cropFrame(video, values[0]);
        });
    };

    cropFrame = (video, model) => {
        const { coordinates } = this.props;

        const canvas = this.refs.crop;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, config.width, config.height);

        if (coordinates.length > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(coordinates[0].x, coordinates[0].y);
            coordinates.map(item => ctx.lineTo(item.x, item.y));
            ctx.lineWidth = 1;
            ctx.clip();
        }

        ctx.drawImage(video, 0, 0);

        ctx.restore();

        this.detectFrame(canvas, model);

        requestAnimationFrame(() => {
            this.cropFrame(video, model);
        });
    };

    detectFrame = (video, model) => {
        const { status } = this.props;

        if (status) {
            model.detect(video).then(predictions => {
                this.renderPredictions(predictions);
            });
        } else {
            const ctx = this.refs.predict.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
    };

    renderPredictions = predictions => {
        const ctx = this.refs.predict.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Font options.
        const font = '16px sans-serif';
        ctx.font = font;
        ctx.textBaseline = 'top';
        predictions.forEach(prediction => {
            const x = prediction.bbox[0];
            const y = prediction.bbox[1];
            const width = prediction.bbox[2];
            const height = prediction.bbox[3];

            const name =
                typeof helper[prediction.class] !== 'undefined'
                    ? helper[prediction.class].ru
                    : prediction.class;

            const color =
                typeof helper[prediction.class] !== 'undefined'
                    ? helper[prediction.class].color
                    : '#00FFFF';

            const text = `${name}: ${prediction.score.toFixed(2)}`;

            // Draw the bounding box.
            ctx.strokeStyle = color;
            ctx.lineWidth = 4;
            ctx.strokeRect(x, y, width, height);
            // Draw the label background.
            ctx.fillStyle = color;
            const textWidth = ctx.measureText(text).width;
            const textHeight = parseInt(font, 10); // base 10
            ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

            const xt = prediction.bbox[0];
            const yt = prediction.bbox[1];
            // Draw the text last to ensure it's on top.
            ctx.fillStyle = '#000000';
            ctx.fillText(text, xt, yt);
        });
    };

    render() {
        return (
            <React.Fragment>
                <video
                    id="video"
                    ref="video"
                    width={config.width}
                    height={config.height}
                />
                <canvas
                    id="predict"
                    ref="predict"
                    width={config.width}
                    height={config.height}
                />
                <canvas
                    id="crop"
                    ref="crop"
                    width={config.width}
                    height={config.height}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    status: state.app.status,
    coordinates: state.app.coordinates
});

export default connect(mapStateToProps)(Video);
