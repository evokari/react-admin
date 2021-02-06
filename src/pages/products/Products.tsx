import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { Product } from "../../models/Product";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products?page=${page}`);
      setProducts(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const del = async (id: number) => {
    if (window.confirm("Sure?")) {
      await axios.delete(`products/${id}`);
      setProducts(products.filter((product: Product) => product.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link
          to="/products/create"
          className="btn btn-sm btn-outline-secondary"
        >
          Add
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img src={product.image} width="50" />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    <Link
                      to={`/products/${product.id}/edit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <div className="btn-group mr-2">
                      <a
                        href="#"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(product.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </Wrapper>
  );
};
export default Products;
