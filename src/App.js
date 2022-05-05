import React, { useState, useEffect } from "react";
import _ from "lodash";
//components
import Uesr from "./User";
//styles
import { Content, Loading } from "./App.styles";
//Api
import { getUsers } from "./API";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const newUsers = await getUsers(page);
      setUsers((prev) => [...prev, ...newUsers]);
      setLoading(false);
    };
    loadUsers();
  }, [page]);
  return (
    <div className="App">
      {loading && <Loading>Loading...</Loading>}
      <Content>
        {users && _.map(users, (user) => <Uesr key={user.cell} user={user} />)}
      </Content>
    </div>
  );
}

export default App;
