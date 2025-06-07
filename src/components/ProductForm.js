import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosDefaults";
import "../styles/ProductForm.module.css"; // Assuming you have some styles for the form

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
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoadingCategories(true);
        setError(null);
        const res = await axiosInstance.get("/categories/");
        setCategories(res.data);
      } catch (err) {
        setError("Failed to load categories.");
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const postData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          postData.append(key, value);
        }
      });

      await axiosInstance.post("/products/", postData);

      onSuccess?.();

      setFormData({
        name: "",
        description: "",
        price: "",
        rating: "",
        category_id: "",
        image: null,
      });
    } catch (err) {
      setError("Failed to add product.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Product</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />
      <input
        name="rating"
        placeholder="Rating"
        type="number"
        step="0.1"
        min="0"
        max="5"
        value={formData.rating}
        onChange={handleChange}
      />
      <select
        name="category_id"
        value={formData.category_id}
        onChange={handleChange}
        required
        disabled={loadingCategories}
      >
        <option value="">
          {loadingCategories ? "Loading Categories..." : "Select Category"}
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        name="image"
        type="file"
        onChange={handleChange}
        accept="image/*"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
