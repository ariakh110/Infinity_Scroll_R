import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useInfiniteQuery } from "react-query";
//components
import Uesr from "./User";
//styles
import { Content, Loading } from "./App.styles";
//Api
import { getUsers } from "./API";

function App() {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery("users", getUsers, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.page < lastPage.total_pages) {
          return { page: lastPage.page + 1 };
        }
        return false;
      },
      refetchOnWindowFocus: false,
    });
  // const handleScroll = (e) => {
  //   const { scrollHeight, scrollTop, clientHeight } = e.target;
  //   if (scrollHeight - scrollTop === clientHeight) {
  //     setPage(page + 1);
  //   }
  // };
  console.log(`has :${hasNextPage}`);

  //for react query
  const handleScrollRQ = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      fetchNextPage();
    }
  };

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     setLoading(true);
  //     const newUsers = await getUsers(page);
  //     setUsers((prev) => [...prev, ...newUsers]);
  //     setLoading(false);
  //   };
  //   loadUsers();
  // }, [page]);

  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }
  console.log(data);
  return (
    <div className="App">
      {/* {loading && <Loading>Loading...</Loading>} */}
      {
        <Content onScroll={handleScrollRQ}>
          {data.pages &&
            _.map(data.pages, (page) =>
              _.map(page, (user) => <Uesr key={user.cell} user={user} />)
            )}
        </Content>
      }
      {isFetching && <Loading>Loading...</Loading>}
    </div>
  );
}

export default App;
