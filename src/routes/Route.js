import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';


export default function RouteWrapper({
    component: Component
}) {
    let { id } = useParams();
    const navigate = useNavigate();

    
    return (
        <Component  id={id} navigate={navigate}/>
    );
}
RouteWrapper.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
RouteWrapper.defaultProps = {};