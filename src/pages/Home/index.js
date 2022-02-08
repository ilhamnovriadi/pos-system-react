import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import Navigate from "../../components/Navigate";
import Tags from "../../components/Tags";
import { fetchProduct } from "../../redux/actions/product";
import "./index.scss";

const Home = ({ tags, search, category }) => {
  const [tagsSelect, setTagsSelect] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetching === false) {
      setIsLoading(true);
      setIsFetching(true);
      setNotFound(false);
      let attribute = {};
      if (tagsSelect !== "") {
        attribute = { ...attribute, tags: tagsSelect };
      }
      if (category !== "") {
        attribute = { ...attribute, category: category };
      }
      if (search !== "") {
        attribute = { ...attribute, q: search };
      }
      dispatch(
        fetchProduct(
          attribute,
          function (response) {
            if (response.count === 0) {
              setNotFound(true);
            }
            setDataProduct(response.data);
            setIsFetching(false);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          },
          function (error) {
            console.log(error);
            setIsLoading(false);
            setIsFetching(false);
          }
        )
      );
    }
  }, [search, tagsSelect, category]);

  return (
    <Loader isActive={isLoading} text={"Tunggu yah"}>
      <div className={`home`}>
        <Tags
          tags={tags}
          value={tagsSelect}
          onChange={(e) => {
            if (tagsSelect.includes(e)) {
              setTagsSelect((oldArray) => [
                ...oldArray.filter((item) => item !== e),
              ]);
            } else {
              setTagsSelect((oldArray) => [...oldArray, e]);
            }
          }}
        />
        <div className={`home__card`}>
          {notFound && <h3>Pencarian tidak ditemukan</h3>}
          {dataProduct.map((item, i) => {
            return <Card key={i} data={item} />;
          })}
        </div>
        {/* <div className="home__navigate">
          <Navigate />
        </div> */}
      </div>
    </Loader>
  );
};

export default Home;
