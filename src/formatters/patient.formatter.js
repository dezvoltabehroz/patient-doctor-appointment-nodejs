'use strict'

exports.formatPatientObj = (user) => {
    return {
        userId: user?.userId || '',
        name: user?.name || '',
        gender: user?.gender || '',
        age: user?.age || '',
        phoneNumber: user?.phoneNumber || '',
        isApproved: user?.isApproved || '',
        isActivated: user?.isActivated || '',
        userType: user?.userType || '',
    }
}