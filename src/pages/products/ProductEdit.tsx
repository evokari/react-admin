import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import Wrapper from "../../components/Wrapper";

const ProductEdit = (props: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products/${props.match.params.id}`);
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
      setPrice(data.price);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`products/${props.match.params.id}`, {
      title,
      description,
      image,
      price,
    });
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/products" />;
  }
  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            className="form-control"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            placeholder="Description"
            required
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Image</label>
          <div className="imput-group">
            <input
              className="form-control"
              placeholder="Image"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <ImageUpload uploaded={setImage} />
          </div>
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button className="btn btn-outline-secondary" type="submit">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};
export default ProductEdit;
