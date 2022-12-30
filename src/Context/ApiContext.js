import React, {createContext, useMemo, useContext, useState, useEffect} from 'react';

const ApiContext = createContext({})

export const ApiProvider = ({children}) => {

    
    const [coinsData, setCoinsData] = useState([])
    const [loader, setLoader] = useState(false)
    
    const fetchData = async (page=1, per_page=10) => {
        
        setLoader(true)

        const Api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&amp;order=market_cap_desc&amp;per_page=${per_page}&amp;page=${page}&amp;sparkline=false&amp;price_change_percentage=24h%2C7d`
        // const Api = ""
        const res = await fetch(Api)
        const json = await res.json()

        console.log(json)

        setCoinsData([...json])

        setLoader(false)

    }

    const memo = useMemo(() => ({
        coinsData,
        loader,
        fetchData
    }), [coinsData, loader])

    return <ApiContext.Provider value={memo}>
        {children}
    </ApiContext.Provider>
}

export default function useApi() {
    return useContext(ApiContext)
}