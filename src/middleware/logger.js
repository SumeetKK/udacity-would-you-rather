const logger = (store) => (next) => (action) => {
    console.group()
        console.log('Action: ', action)
        const returnValue = next(action)
        console.log('The New State Is: ', store.getState())
    console.groupEnd()
    return returnValue
}

export default logger