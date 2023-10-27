async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }
  
  
  export async function signup(context) {
    console.log("before fetch")
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch("http://localhost:8000/api/accounts/signup",payload)
    console.log(body, "API CALL")
    return body
  }
  
  export async function login(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch("http://localhost:8000/api/accounts/get-token", payload)
    console.log(body.token)
    return body.token
  }

  export async function getYears() {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
        // "Authorization": `Token ${localStorage.getItem("token")}`
      }  }
    const body = await basicFetch(`http://localhost:8000/api/coin/years/`, payload)
    return body
  }

  export async function getCoinsGivenYear(coin_year) {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
        // "Authorization": `Token ${localStorage.getItem("token")}`
      }  }
    const body = await basicFetch(`http://localhost:8000/api/coin/list/?year=${coin_year}`, payload)
    return body
  }

  export async function getCoinsGivenYearAndMint(coin_year, mint_mark) {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
        // "Authorization": `Token ${localStorage.getItem("token")}`
      }  }
    const body = await basicFetch(`http://localhost:8000/api/coin/list/?year=${coin_year}&mintmark=${mint_mark}`, payload)
    return body
  }

  export async function getComments(coin_year, mint_mark) {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
        // "Authorization": `Token ${localStorage.getItem("token")}`
      }  }
    const body = await basicFetch(`http://localhost:8000/api/coin/list/?year=${coin_year}&mintmark=${mint_mark}&comment=true`, payload)
    return body
  }

  export async function getCoinByPK(primaryKey) {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
        // "Authorization": `Token ${localStorage.getItem("token")}`
      }  }
    const body = await basicFetch(`http://localhost:8000/api/coin/${primaryKey}/`, payload)
    return body
  }

  export async function addCoins(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch("http://localhost:8000/api/coincollection/add/", payload)
    return body
  }

  export async function removeCoins(context) {
    const payload = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch("http://localhost:8000/api/coincollection/remove/", payload)
    return body
  }

  export async function addToUserProfile(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch("http://localhost:8000/api/accounts/add-hunt-value/", payload)
    return body
  }


  export async function getCollection() {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
        // "Authorization": `Token ${localStorage.getItem("token")}`
      }  }
    const body = await basicFetch(`http://localhost:8000/api/coincollection/`, payload)
    return body
  }

  export async function getProfile() {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
        // "Authorization": `Token ${localStorage.getItem("token")}`
      }  }
    const body = await basicFetch(`http://localhost:8000/api/accounts/user-profile/`, payload)
    return body
  }


  export async function getPCGSCoin(cert_num) {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
      }  }
    const body = await basicFetch(`http://localhost:8000/api/coin/pcgs/?cert=${cert_num}`, payload)
    return body
  }


  export async function updateUserScore(context) {
    console.log(context)
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch("http://localhost:8000/api/accounts/update-score/", payload)
    return body
  }