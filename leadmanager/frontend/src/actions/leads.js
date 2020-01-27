import axios from 'axios';

import { GET_LEADS, ADD_LEAD, DELETE_LEAD, GET_ERRORS } from './types';
import { createMessage, returnErrors } from './message';

import { tokenConfig } from './auth';


//Configure CSRF Token for React axios
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

//Get leads
export const getLeads = () => (dispatch, getState) => {
    axios.get('/api/leads/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Add Lead
export const addLead = (lead) => (dispatch, getState) => {
    axios.post(`/api/leads/`, lead, tokenConfig(getState))
        .then(res => {

            dispatch(createMessage({ addLead: 'Lead Added' }));
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Delete Leads
export const deleteLead = (id) => (dispatch, getState) => {
    axios.delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
            dispatch({
                type: DELETE_LEAD,
                payload: id
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

