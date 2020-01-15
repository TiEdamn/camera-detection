import React from 'react';
import Start from './Start';
import Reset from './Reset';
import Zone from './Zone';
import Video from './Video';
import './App.scss';

export default () => {
    return (
        <React.Fragment>
            <Video />
            <Zone />
            <Start />
            <Reset />
        </React.Fragment>
    );
};
