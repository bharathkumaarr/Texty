function generateRoomCode(length=6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''


    for (let i=0; i<length; i++) {
        const index = Math.floor(Math.random()*characters.length)
        result+=characters[index]
    }
    return result
}

module.exports = generateRoomCode;