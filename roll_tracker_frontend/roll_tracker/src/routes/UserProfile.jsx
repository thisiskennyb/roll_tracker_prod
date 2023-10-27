import { getCollection, getProfile, updateUserScore } from "../api/api_calls"
import CustomizedTables from "../muiComponents/CustomizedTables"
import { useState, useEffect } from "react"
import { removeCoins } from "../api/api_calls"
import { Navigate } from "react-router-dom"
import './css/profile.css'

export default function UserProfile({userToken}) {

    const [coinData, setCoinData] = useState([])
    const [profileData, setProfileData] = useState([])
    const [buttonClick, setButtonClick] = useState(true)

    useEffect(() => {
        const fetchCoins = async () => {
            const coins = await getCollection()
            setCoinData(coins)
        }
         const fetchProfile = async () => {
            const profile = await getProfile()
            setProfileData(profile)
         }
        fetchCoins()
        fetchProfile()
    },[buttonClick])

    const removeCoinHandler = async (index, quantity, coin) => {
        // Create a new array without the coin to be removed
        // console.log(coinData[index].point_value)
        const updatedFoundCoins = coinData.filter((_, i) => i !== index);
        
        const removedCoin = {"coin_id": coin.coin, "quantity": quantity}
        // console.log(removedCoin)
        const deleteCoin = await removeCoins(removedCoin)
        const updateScore = await updateUserScore({"new_score": (coinData[index].point_value * quantity)})
        setCoinData(updatedFoundCoins);
        setButtonClick(!buttonClick)
        // console.log(coin)
      };

    console.log(coinData)
    
    if (userToken) {
    
    return (
        <div className="profile-container">
            <div className="stats-title-container">
                <span className="stats-title-container-item">Score</span>
                <span className="stats-title-container-item stats-item-two">Dollar Value Searched</span>
            </div>
            <div className="stats-container">
                <span className="stats-item">{profileData.user_score}</span>
                <span className="stats-item">${profileData.dollar_value_searched}</span>
            </div>
                {/* <div className="stats-item">
                <div><span className="num-value">{profileData.user_score}</span></div>
                </div>
                <div className="stats-item">
                    
                    <div>Total Dollar Value Searched: <span className="num-value">${profileData.dollar_value_searched}</span></div>
                </div> */}
            
            <div className="collection-display-container">
                <div className="collection-display-item">
                    <CustomizedTables foundCoins={coinData} removeCoinHandler={removeCoinHandler} />
                </div>
            </div>
        </div>
    )
    } else {
        return <Navigate to="/login" />
    }
}