import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExchangeRate.scss";
import CurrentRateInterface from "../../utils/CurrenRateInterface";

const currencyNames: { [key: number]: string } = {
  840: "USD",
  978: "EUR",
  826: "Gsp",
};

const ExchangeRate: React.FC = () => {
  const [rates, setRates] = useState<CurrentRateInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/mono/currency"
        );

        const formattedRates = response.data.map((rate: any) => {
          if (rate.rateCross) {
            return {
              currencyCodeA: rate.currencyCodeA,
              rateBuy: rate.rateCross,
              rateSell: rate.rateCross,
            };
          } else {
            return {
              currencyCodeA: rate.currencyCodeA,
              rateBuy: rate.rateBuy,
              rateSell: rate.rateSell,
            };
          }
        });
        setRates(formattedRates);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="exchange-rate">
      {rates.map((rate) => (
        <div
          key={rate.currencyCodeA}
          className={`currency ${currencyNames[rate.currencyCodeA]}`}
        >
          <div>Валюта: {currencyNames[rate.currencyCodeA]}</div>
          <div>Купівля: {rate.rateBuy}</div>
          <div>Продажи: {rate.rateSell}</div>
        </div>
      ))}
    </div>
  );
};

export default ExchangeRate;
