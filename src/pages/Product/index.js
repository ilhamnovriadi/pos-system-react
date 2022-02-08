import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaTags } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Loader from "../../components/Loader";
import { fetchDetailProduct } from "../../redux/actions/product";
import "./index.scss";

const Product = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dataProduct, setDataProduct] = useState();
  let { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      fetchDetailProduct(
        id,
        function (response) {
          setDataProduct(response);
          setIsLoading(false);
        },
        function (error) {
          console.log(error);
          setIsLoading(false);
        }
      )
    );
  }, []);
  return (
    <Loader isActive={isLoading} text={"Tunggu yah"}>
      <div className="product">
        <div className="product__header">
          <img
            alt="product-img"
            className="product__image"
            src="https://cdn.eraspace.com/pub/media/catalog/product/m/a/macbook-pro-2020-2port-spacegray-3_8_1.jpg"
          />
        </div>
        <div className="product__body">
          <div className="product__title">{dataProduct?.name}</div>
          <div className="product__desc">
            <p>{dataProduct?.description}</p>
          </div>
          <small>Category</small>
          <div className="card__category">
            <p>{dataProduct?.category.name}</p>
          </div>
          <small>Tags</small>
          <div className="card__tagscontainer">
            {dataProduct?.tags.map((item, i) => {
              return (
                <div key={i} className="card__tags">
                  <FaTags size={10} color="#fff" className="card__icon" />
                  <p>{item.name}</p>
                </div>
              );
            })}
          </div>
          <div className="product__button">
            <FaShoppingCart size={18} color="#fff" />
            <p>Masukan Keranjang</p>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default Product;
