'use strict';

exports.createPayload = (_id, username) =>{
    return {
        _id: _id,
        username: username,
        encripted_at: getCurrentDate()
    };
};

exports.createPayloadVerifiedPromise = (_id, username) =>{
	return new Promise((resolve, reject) => {
		let payload = this.createPayload(_id,username);
		if(this.checkPayload(payload)){
			resolve(payload);
		}else{
			reject(
				new Error(__('Something is going wrong with the data of the payload'))
			);
		}
	});
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
