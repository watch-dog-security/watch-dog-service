'use strict';

exports.createPayload = (_id, username) =>{
    return {
        _id: _id,
        username: username,
        encripted_at: new Date()
    };
};

exports.createPayloadVerifiedPromise = (_id, username) =>{
	return new Promise((resolve, reject) => {
		let payload = this.createPayload(_id,username);
		if(this.checkUndefinedPayload(payload)){
			resolve(payload);
		}else{
			reject(
				new Error(__('Something is going wrong with the data of the payload'))
			);
		}
	});
};

exports.checkUndefinedPayload = (payload) => {
    return !!(payload._id !== undefined &&
    payload.username !== undefined &&
    payload.encripted_at !== undefined);
};
