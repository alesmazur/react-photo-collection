import React from "react";
import "./App.scss";
import Collection from "./Collection";

const categories = [
  { name: "All" },
  { name: "Sea" },
  { name: "Mountains" },
  { name: "Architecture" },
  { name: "Cities" },
];

function App() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(0);
  const onCategoryClick = (id) => {
    setCategoryId(id);
  };
  const [isLoading, setIsLoading] = React.useState(true);
  const category = !categoryId ? "" : categoryId;

  React.useEffect(() => {
    setIsLoading(isLoading);
    fetch(
      `https://64d869615f9bf5b879ce3e9a.mockapi.io/Photos?page=${page}&limit=3&category=${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>My photo library</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, index) => (
            <li
              onClick={() => onCategoryClick(index)}
              className={categoryId == index ? "active" : ""}
              key={index}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          type="search"
          className="search-input"
          placeholder="Search by category ..."
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>
            <i>loading ...</i>{" "}
          </h2>
        ) : (
          items
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, i) => (
              <Collection key={i} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((elem, i) => (
          <li
            key={i}
            onClick={() => setPage(i + 1)}
            className={page == i + 1 ? "active" : ""}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
