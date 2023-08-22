import getTopTenHelper from "../../utils/utils.js"
import getUserNames from "../../utils/db.js"

export const getTopTen = async (req, res) => {
    let users = await getUserNames()
    const usersText = users.map(item => item.lichess_id).join(',');
    const response= await getTopTenHelper(usersText)
    res.status(200).json(response)
}


