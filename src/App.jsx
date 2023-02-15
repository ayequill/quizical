import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./sass/App.scss";
import Homepage from "./components/Homepage";
import axios from "axios";

const queryClient = new QueryClient();

function App() {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
      )
      .then((res) => res.data)
  );

  // if (isLoading) return 'Loading'
  // if (error) return 'An error has occured:' + error.message

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <main className="main">
          <Homepage quiz={data} />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
