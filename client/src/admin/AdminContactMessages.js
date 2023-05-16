import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import Loading from "../components/Loading";
import Error from "../components/Error";
const AdminContactMessages = () => {
  let [contactMessages, setContactMessages] = useState([]);
  let { error, loading, dispatch } = useContext(ProductsContext);
  let fetchContactMessages = async () => {
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    let res = await fetch("/contact");
    let response = await res.json();
    if (res.status === 200) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error: null } });
      let { messages } = response;
      console.log(messages)
      setContactMessages([...messages]);
    } else {
      let { error } = response;
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error: error } });
    }
  };
  useEffect(() => {
    fetchContactMessages();
  }, []);
  return (
    <div className="admin-contact-messages main-div">
      <div className="admin-contact-messages-body center-div">
        {loading && <Loading />}
        <table className="table">
          {error && <Error error={error} />}
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {contactMessages.map((message, index) => {
              return <tr>
                <td>{message.date}</td>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContactMessages;
