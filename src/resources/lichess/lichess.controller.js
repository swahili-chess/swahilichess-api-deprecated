import getTopTenHelper from "../../utils/utils.js"
import getUserNames from "../../utils/db.js"

export const getTopTen = async (req, res) => {
    let results = await getUserNames()
    const lichess_ids = results.map(item => item.lichess_id).join(',');
    const response= await getTopTenHelper(lichess_ids)
    res.status(200).json(response)
}


