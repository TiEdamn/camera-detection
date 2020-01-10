import React from 'react';
import { connect } from 'react-redux';
import { resetCoordinates } from '../../actions';

import './index.scss';

const Reset = ({ status, onClick }) => (
    <button onClick={onClick} className={status ? 'disabled' : ''}>
        Сбросить
    </button>
);

const mapStateToProps = state => ({
    status: state.app.status
});

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(resetCoordinates())
});

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
