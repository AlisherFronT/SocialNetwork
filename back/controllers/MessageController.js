import MessagesModel from '../models/Messages.js'

export const sendMessage = async (req, res) => {
    try {

        const doc = await new MessagesModel (req.body)

        const message = await doc.save()

        res.json(message)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Ошибка'
        })
    }
}

export const getMessages = async (req, res) => {
    try {

        const chats = await MessagesModel.find({
            chatId: req.params.id
        })

        res.json(chats)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Ошибка'
        })
    }
}