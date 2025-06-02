import { useEffect, useState } from "react";
import axios from "axios";

function ProductForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    category_id: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories/")
      .then(res => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = new FormData();
    for (const key in formData) {
      postData.append(key, formData[key]);
    }

    axios.post("http://127.0.0.1:8000/api/products/", postData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      onSuccess?.();
      setFormData({
        name: "",
        description: "",
        price: "",
        rating: "",
        category_id: "",
        image: null,
      });
    })
    .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Product</h3>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} required />
      <input name="rating" placeholder="Rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} />
      <select name="category_id" value={formData.category_id} onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <input name="image" type="file" onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;