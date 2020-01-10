import React from 'react';
import { connect } from 'react-redux';
import { appStatus } from '../../actions';

import './index.scss';

const Start = ({ status, onClick }) => (
    <button onClick={onClick}>{status ? 'Остановить' : 'Начать'}</button>
);

const mapStateToProps = state => ({
    status: state.app.status
});

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(appStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(Start);
