import React from 'react';
import Start from './Start';
import Reset from './Reset';
import Zone from './Zone';
import './App.scss';

export default () => {
    return (
        <React.Fragment>
            <Zone />
            <Start />
            <Reset />
        </React.Fragment>
    );
};
