const response = (msg, outputContext) => {
    const response = {}

    response.fulfillmentMessages = [{ "text": { "text": [msg] } }]
    if (outputContext) {
        response.outputContext = [outputContext]
    }

    return response
}

export default { response }

