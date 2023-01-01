import getTopTenHelper from "../../utils/utils.js"

export const getTopTen = async (req, res) => {
    
    const response= await getTopTenHelper()
    res.status(200).json(response)
}



