import MultipleSelect from "../muiComponents/MultipleSelect";
import { useEffect, useState } from "react";
import { getYears, getCoinsGivenYear, getCoinsGivenYearAndMint, getComments, getCoinByPK, addCoins, removeCoins, addToUserProfile } from "../api/api_calls";
import ControlledCheckboxes from "../muiComponents/CheckBox";
import Button from '@mui/material/Button';
import DollarInput from "../muiComponents/DollarInput";
import TextField from '@mui/material/TextField';
import CustomizedTables from "../muiComponents/CustomizedTables";
import { Navigate } from "react-router-dom";
import React, { useContext } from 'react';
import { CoinContext } from '../App';
import './css/hunt_log.css'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';



export default function HuntLog({coinData, userToken}) {
  const { foundCoins, setFoundCoins } = useContext(CoinContext);

//year array being generated below by generateYearArray with useEffect
    const [yearArray, setYearArray] = useState([]);
// stores the users selected year
    const [selectedYear, setSelectedYear] = useState('');
// for testing purposes
    const [mintMarks, setMintMarks] = useState([])
// coins given a specific year
    const [coins, setCoins] = useState([])
// stores All coins given a year and mint mark
    const [filteredCoins, setFilteredCoins] = useState([])
// lifted state for radio buttons in the controlled checkbox component in CheckBox.jsx
    const [selectedMintValue, setSelectedMintValue] = useState('');
// stores all unique comments extracted from filteredCoins
    const [commentsWithPK, setCommentsWithPK] = useState([])
// stores an array with the values of commentsWithPK (just the comments without the primary key)
    const [commentsArray, setCommentsArray] = useState([])
//stores selected comment
    const [selectedComment, setSelectedComment] = useState('')
//stores boolean for the 'add coin' button to be toggled on or off
    const [addCoinButton, setAddCoinButton] = useState(false)
// stores the final coin the user selected
    const [selectedCoin, setSelectedCoin] = useState('')
// stores quantity of coins found
    const [quantity, setQuantity] = useState(1)
// stores found coins
    // const [foundCoins, setFoundCoins] = useState([])
// add to coin collection
    const [addToCollection, setAddToCollection] = useState('')
// stores the type of coin the user selects ex ('Proof', 'Doubled Die')
    const [coinType, setCoinType] = useState('')
// stores the variety value of the coin
    const [coinVariety, setCoinVariety] = useState([])
// stores coins that users add to the hunt
    const [addedCoins, setAddedCoins] = useState([])
// stores the primary key for the specific coin the user selects
    const [testPK, setTestPK] = useState('')
// stores total points for hunt
    const [totalPoints, setTotalPoints] = useState(0)
// If finished button has been clicked
    const [finished, setFinished] = useState(false)
// stores total dollar amount of hunt
    const [dollarValue, setDollarValue] = useState(0)

//names for dropdowns 
  const selectorNames = ["Year", "Type"]

//fetches all years from the backend
useEffect(() => {
  const fetchYears = async () => {
    const years = await getYears()
    setYearArray(years.years.reverse())
  }
  fetchYears()
},[])

//fetches all coins from a given year
useEffect(() => {
  const fetchCoins = async () => {
    const coinData = await getCoinsGivenYear(selectedYear)
    setCoins(coinData)
  }
  fetchCoins()
},[selectedYear])

// grabs all unique mint marks from a given year for the fetched coins above
useEffect(() => {
  const mintMarkData = getUniqueMintMarks(coins)
  setMintMarks(mintMarkData)
},[coins])

// fetches all coins given year and mint mark
useEffect(() => {
  const fetchCoinsByYearAndMint = async () => {
    const coinData = await getCoinsGivenYearAndMint(selectedYear, selectedMintValue);
    // if coinData is length of one with null comment
    //set addCoinButton to true
    //setSelected coin to the value of coin data (should not trigger use effect to create drop down)
    if (coinData.length === 1 && coinData[0].comment === null) {
      setAddCoinButton(true); // Use the logical NOT operator here
      setSelectedCoin(coinData[0]); // LOOK RIGHT HERE
    } else {
      setAddCoinButton(false); // Clear the addCoinButton when conditions don't match
      setFilteredCoins(coinData);
    }
  }
  fetchCoinsByYearAndMint();
}, [selectedMintValue]);

//grabs all unique comments from filteredCoins given a specific year and mint mark
useEffect(() => {
  const fetchComments = async () => {
    const unique_comments = await getComments(selectedYear, selectedMintValue);
    // Filter out null comments and only include non-null comments in the array
    const unique_comment_values = Object.values(unique_comments || {}).filter(comment => comment !== null);
    setCommentsWithPK(unique_comments)
    setCommentsArray(unique_comment_values);
  }
  // Call fetchComments only when there's a selectedYear and selectedMintValue
  if (selectedYear && selectedMintValue) {
    fetchComments();
  }
}, [selectedYear, selectedMintValue]);

// iterates through commentsWithPK dictionary and finds the primary key assoiciated with the comment
useEffect(() => {
  const fetchCoinPrimaryKey = () => {
    let foundKey = null;
    // Iterate through the object properties
    for (let key in commentsWithPK) {
      if (commentsWithPK[key] === selectedComment) {
        foundKey = key;
        setTestPK(foundKey);
      }
    }
    
  }
  fetchCoinPrimaryKey();
}, [selectedComment]);

//fetches coin by primary key from backend
useEffect(() => {
  const fetchCoinByPK = async () => {
    if (testPK) { // Check if testPK is not null or empty
      const coinObject = await getCoinByPK(testPK)
      // if (coinObject.variety) {
      //   setCoinVariety(coinObject.variety)
        
        setSelectedCoin(coinObject)
      //   console.log(selectedCoin)
      // }
      setAddCoinButton(true)
    }
  } 
  fetchCoinByPK()
},[testPK])

useEffect(() => {
  const postCoin = async () => { 
    // console.log(addToCollection)
    const postedCoin = await addCoins(addToCollection)
    setAddCoinButton(false)
    setSelectedYear('')
    setCommentsArray([])
  }
  if (addToCollection != '')
  {postCoin()}
},[addToCollection])

useEffect(() => {
  tallyPointValue();
}, [foundCoins]);

// takes in all coin data fetched for a given year and returns unique mint mark values
const getUniqueMintMarks = (data) => {
  const uniqueMintMarks = new Set();
  data.forEach(item => {
      const mintMark = item.mint_mark;
      uniqueMintMarks.add(mintMark);
  });
  return Array.from(uniqueMintMarks);
}

const tallyPointValue = () => {
  let points = 0
  foundCoins.map((coin) => {
    points += coin.point_value * coin.quantity
  })
  setTotalPoints(points)
}

// handle change for year drop down
  const handleYearChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedYear(value);
    setSelectedMintValue('')
    setSelectedComment('')
    setCommentsArray([])
  };

// sets selectedComment to the comment value chosen by the user
  const handleCommentChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedComment(value);
    setAddCoinButton(true);
  };  

  //sets selectedMintValue to the mint_mark value chosen by the user
  const handleMintMarkChange = (event) => {
    setSelectedMintValue(event.target.value);
  };

//add the coin the user selected to the users coin collection and the addedCoins array
const addCoinHandler = async () => {
  // console.log(quantity)
  const add_to_collection = {
    "quantity": parseInt(quantity), 
    "coin_id": testPK,
    "denomination": selectedCoin["denomination"],
    "comment": selectedCoin["comment"],
    "mint_mark": selectedCoin["mint_mark"],
    "mintage": selectedCoin["mintage"],
    "pcgs_cert_num": selectedCoin["pcgs_cert_num"],
    "point_value": selectedCoin["point_value"],
    "variety": selectedCoin["variety"],
    "year": selectedCoin["year"]
  };
  setAddToCollection(add_to_collection)
  selectedCoin["quantity"] = parseInt(quantity)
  // console.log(selectedCoin["quantity"])
  setFoundCoins([...foundCoins, selectedCoin]) 
}

  const finishLoggingHandler = async () => {
    const userProfileData = {"coin_hunt_value": parseInt(dollarValue), "points_earned": parseInt(totalPoints)}
    if (dollarValue == 0) {
      alert('A dollar value must be entered')
    }
    else {
    const updateProfile = await addToUserProfile(userProfileData)
    setFoundCoins([])
    setFinished(true)

  }
}

  const quantityChangeHandler = (e) => {
    const selectedQuantity = e.target.value
    setQuantity(selectedQuantity)
  } 

  const dollarChangeHandler = (e) => {
    const dollarInput = e.target.value
    setDollarValue(dollarInput)
  }

  const removeCoinHandler = async (index, quantity, coin) => {
    // Create a new array without the coin to be removed
    const updatedFoundCoins = foundCoins.filter((_, i) => i !== index);
    setFoundCoins(updatedFoundCoins);
    
    const removedCoin = {"coin_id": coin.id, "quantity": quantity}
    console.log(removedCoin)
    const deleteCoin = await removeCoins(removedCoin)
  };
  // console.log(commentsWithPK)
// console.log(testPK, "hope that worked")
// console.log(selectedCoin)
// console.log(foundCoins)
// console.log(totalPoints)
console.log(foundCoins)
if (finished) {
  return <Navigate to="/FinishLog" /> 
}

if (userToken) {
  // console.log(foundCoins)
  return (
    <div className="huntlog-container">
        <div className="scoring-title-box">
            <h1 className="scoring-title">Hunt Log</h1>
        </div>
        <div className="points-container">
          <div className="points-item">
            Total Points: 
          </div>
          <div className="points-item score-item">
            {totalPoints} 
          </div>  
        </div>
        <div className="dollar-input-container">
          <div className="dollar-input-item">
            <DollarInput id="dollar-input" onChangeHandler={dollarChangeHandler}/>
          </div>
          <div className="dollar-input-item">
            <ArrowCircleLeftIcon id="arrow-icon" />
          </div>
          <span className="dollar-input-item enter-total">Enter total dollar value of searched coin rolls</span>       
        </div>
        <div className="add-coins-title">Add Coins</div>
        <hr className="divider"></hr>
        <div className="add-coin-container">
          <div className="add-coin-item">
            <MultipleSelect data={yearArray} selectorName={selectorNames[0]} handleChange={handleYearChange} selectedValue={selectedYear}/>
          </div>
          <div className="add-coin-item">
            {selectedYear != '' ? (<ControlledCheckboxes data={mintMarks} handleChange={handleMintMarkChange} selectedValue={selectedMintValue} />) : (<></>)}
          </div>
          <div className="add-coin-item">
            {commentsArray.length > 0 ? (<MultipleSelect data={commentsArray} selectorName={selectorNames[1]} handleChange={handleCommentChange} selectedValue={selectedComment}/>) : (<></>)}
          </div>
        </div>
    
      
          <div className="add-button-container">
              {addCoinButton ? (<TextField
                value={quantity} 
                onChange={(event) => setQuantity(event.target.value)}
                label="Quantity"
                id="standard-size-normal"
                variant="standard"
                type="number"/>
                ) : 
                (<></>)
                }
                {addCoinButton ? (<Button id="add-coin-button" sx={{ m: 1 }}onClick={addCoinHandler} variant="contained">Add Coin</Button>) : (<></>)}
          </div>
          <div className="log-display-container">
            <div className="log-display-item">
            {foundCoins.length > 0 ? (<CustomizedTables foundCoins={foundCoins} removeCoinHandler={removeCoinHandler}/>) : (<></>)}
            </div>
          </div>
      
      
      {foundCoins.length > 0 ? (<Button sx={{ m: 1 }}onClick={finishLoggingHandler} variant="contained">Finish Logging</Button>) : (<></>)}  
      
    </div>
  );
      } else {
        return <Navigate to="/login" />
      }
}