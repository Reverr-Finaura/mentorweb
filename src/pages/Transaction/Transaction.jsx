import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import styles from "./Transaction.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/search/Search";
import TransactionBar from "../../components/TransactionBar/TransactionBar";
import { fetchTransactionsFromDatabase } from "../../firebase/firebase";

const Transaction = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [transactions, setTransactions] = useState([]);
  var currentBalance = 0;

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const fetchTransactions = async () => {
    let transactions = await fetchTransactionsFromDatabase(
      "jatin.dsquare@gmail.com"
    );
    setTransactions(
      transactions.filter((transaction) => transaction.txStatus === "SUCCESS")
    );
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (transactions.length !== 0) {
    transactions.forEach((transaction) => {
      currentBalance += +transaction.orderAmount;
    });
  }

  return (
    <>
      <PhnSidebar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
            <Search />
            <h2>
              <img
                src="/images/wallet.svg"
                alt="wallet"
                style={{ WebkitUserDrag: "none" }}
              />
              &nbsp;&nbsp;Your current Balance - Rs{" "}
              {transactions.length === 0 ? "..." : currentBalance}
            </h2>

            <h1>Transactions</h1>

            <div className={styles["transaction-list"]}>
              {transactions.length === 0 ? (
                <div className={styles.loader}></div>
              ) : (
                transactions.map((transaction) => (
                  <TransactionBar
                    key={transaction.orderId}
                    receivedFrom={transaction.user}
                    amount={+transaction.orderAmount}
                    date={transaction.txTime}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
