
import React from "react";
import { Link } from "react-router-dom";

import Page from "../../components/page";

import { useNavigate } from "react-router-dom";

import "./index.css";

import settings_logo from "./settings.svg";
import notifications_logo from "./notifications.svg";
import receive_logo from "./receive.svg";
import send_logo from "./send.svg";
import Transaction from "../../components/transaction";
import { formatAmount } from "../../components/format-amount";
import BackendSimulation from "../../utils/BackEnd";

const BalancePage = () => {
  // const { state, dispatch } = useAuth();
  const [transactions, setTransactions] = React.useState([]);
  const navigate = useNavigate();
  const backend = BackendSimulation();

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const userTransactions = await backend.getusertransactions();
      setTransactions(userTransactions.slice(0, 8));
    };

    fetchTransactions();
  }, []);

  const calculateBalance = () => {
    //const { transactions } = {};
    return transactions
      ? transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
      : 0;
  };

  console.log(transactions);

  return (
    <Page>
      <div className="rectangle1">
        <div className="mesh1"></div>
      </div>
      <h1 className="balance__title">Main Wallet</h1>
      {formatAmount(calculateBalance(), "balance__amount")}
      <div
        className="settings"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/settings")}
      >
        <img src={settings_logo} alt="icon" />
      </div>
      <div
        className="notifications"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/notifications")}
      >
        <img src={notifications_logo} alt="icon" />
      </div>
      <div
        className="receive"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/receive")}
      >
        <img src={receive_logo} alt="icon" />
      </div>
      <div
        className="send"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/send")}
      >
        <img src={send_logo} alt="icon" />
      </div>

      <Link to="/receive" className="receive-link">
        Receive{" "}
      </Link>
      <Link to="/send" className="send-link">
        Send{" "}
      </Link>

      <ul className="transactions">
        {transactions &&
          transactions.map((transaction) => (
            <li key={transaction.id}>
              <Link
                to={`/transaction/${transaction.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {transaction.amount > 0 ? (
                  <>
                    <Transaction
                      contragent={transaction.paymentSystem}
                      time={transaction.time}
                      type={transaction.type}
                      amount={transaction.amount}
                    />
                  </>
                ) : (
                  <>
                    <Transaction
                      contragent={transaction.recipient}
                      time={transaction.time}
                      type={transaction.type}
                      amount={transaction.amount}
                    />
                  </>
                )}
              </Link>
            </li>
          ))}
      </ul>
    </Page>
  );
};

export default BalancePage;
