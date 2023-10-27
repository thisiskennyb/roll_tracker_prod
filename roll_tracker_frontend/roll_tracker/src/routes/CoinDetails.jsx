import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPCGSCoin } from '../api/api_calls';
import { useState, useEffect } from 'react';
import { getCoinByPK } from '../api/api_calls';
import './css/coin_detail.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function CoinDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pcgsCoinData, setPcgsCoinData] = useState(null);
  const [coin, setCoin] = useState(null);
  const [certNum, setCertNum] = useState(null)

  const handleGoBack = () => {
    // Use the state to navigate back to the previous page
    navigate(-1, { state: { prevPath: '/hunt-log' } });
  };

  useEffect(() => {
    const fetchCoinObj = async () => {
      const coinObj = await getCoinByPK(id);
      setCoin(coinObj);
      setCertNum(coinObj.pcgs_cert_num)
    };
    fetchCoinObj();
  }, []);

  useEffect(() => {
    if (coin && coin.pcgs_cert_num && !pcgsCoinData) {
      const fetchPCGSCoin = async () => {
        const pcgsCoin = await getPCGSCoin(coin.pcgs_cert_num);
        setPcgsCoinData(pcgsCoin);
      };
      fetchPCGSCoin();
    }
  }, [coin]);

  // console.log(coin.pcgs_cert_num);
  console.log(pcgsCoinData);


  return (
    
    <div className="coin-detail-container">
      <div className="back-button-container">
        <div class="round-button" onClick={handleGoBack}>
          <ArrowBackIcon />
        </div>
      </div>
      <div className="coin-detail-title-box">
      {coin && coin.comment ? (        
        <h1 className="coin-detail-title">
          {coin.year} {coin.mint_mark}
        </h1>
        ) : (<></>)}

        {coin && coin.comment ? (<h2>{coin.comment}</h2>) : (<></>)}
      </div>
      {coin && coin.pcgs_cert_num ? (
        pcgsCoinData && pcgsCoinData.Images[0] ? (
          <img className="coin-photo" src={pcgsCoinData.Images[0].Thumbnail} alt="Coin Thumbnail" />
        ) : (
          <div>no pcgs data available</div>
        )
      ) : (
        <div>No pcgs data available</div>
      )}
      {/* {pcgsCoinData && pcgsCoinData.Images[0] ? (
        <img src={pcgsCoinData.Images[0].Thumbnail} />
      ) :
      (<div>no pcgs data available</div>)
      } */}
    
    </div> 

  ); 
    // } else {
    //   return ( <div>This works</div>)
    // }
}