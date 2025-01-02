import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$", // Fixed capitalization of "symbol"
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-uSiiC2aaUqPHqv7aCdPAxXRC",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error("Error fetching coins:", err);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;

// import { createContext, useEffect, useState } from "react";

// export const CoinContext = createContext();

// const CoinContextProvider = (props) => {
//   const [allCoin, setAllCoin] = useState([]);
//   const [currency, setCurrency] = useState({
//     name: "usd",
//     Symbol: "$"
//   });

//   const fetchAllCoin = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "x-cg-demo-api-key": "CG-uSiiC2aaUqPHqv7aCdPAxXRC	",
//       },
//     };

//     fetch(
//       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
//       options
//     )
//       .then((res) => res.json())
//       .then((res) => setAllCoin(res))
//       //   .then((res) => setAllCoin(Response))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchAllCoin();
//   }, [currency]);

//   const contextValue = {
//     allCoin,currency,setCurrency
//   };

//   return (
//     <CoinContext.Provider value={contextValue}>
//       {props.children}
//     </CoinContext.Provider>
//   );
// };

// export default CoinContextProvider;
