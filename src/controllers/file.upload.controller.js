'use strict'

// Getting Dependencies
const { s3 } = require('../services/aws');

// Get Signed URL
exports.getSignedUrl = async (req, res, next) => {
    try {
        const { user_id, type, extension, content_type } = req.query;
        generateUrl(`${user_id}/${type.replace(/\s+/g, '')}/${Date.now()}${extension}`, content_type)
            .then(uploadURL => {
                const actualUrl = uploadURL?.split('?')[0]
                return res.reply({ statusCode: 200, data: { actualUrl, uploadURL } })
            });
    } catch (error) {
        console.error(error);
        return res.reply({ statusCode: 400, message: error.message, data: error });
    }
};

// ==================== Helper Function ====================

/**
 * Generate a URL based on the given parameters.
 *
 * @param {string} key - The unique identifier or key for the resource.
 * @param {string} content_type - The content type or format of the resource.
 * @returns {string} The generated URL for the resource.
 */
const generateUrl = (key, content_type) => {
    return new Promise(async (resolve, reject) => {
        var ContentType = ''
        switch (content_type) {
            case 'mp3':
                ContentType = 'audio/mpeg'
                break;

            case 'pdf':
                ContentType = 'application/pdf'
                break;

            case 'image':
                ContentType = 'image/jpeg'
                break;
        }

        let s3Params = {
            Bucket: process.env.AWS_BUCKET,
            Key: key,
            ContentType: ContentType,
            ACL: 'public-read',
        };

        const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
        resolve(uploadURL);
    })
};