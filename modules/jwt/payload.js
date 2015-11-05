'use strict';

exports.createPayload = (_id, username) =>{
    return {
        _id: _id,
        username: username,
        encripted_at: getCurrentDate()
    };
};

exports.checkPayload = (payload) => {
    let bDate = checkDatePayloadWithServerDate(payload);
    let bUndefined = checkUndefinedPayload(payload);
    return !!(bUndefined && bDate);
};

let checkDatePayloadWithServerDate = (payload) => {
    return (payload.encripted_at === getCurrentDate());
};

let getCurrentDate = () => {
    return new Date();
};

let checkUndefinedPayload = (payload) => {
    return !!(payload._id !== undefined &&
    payload.username !== undefined &&
    payload.updated_at !== undefined);
};
