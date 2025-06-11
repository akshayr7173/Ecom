import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, Tabs, Tab, Avatar, InputAdornment, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

export default function SellerPage() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
    quantity: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [sellerProducts, setSellerProducts] = useState(
    JSON.parse(localStorage.getItem("sellerProducts") || "[]")
  );
  const [tab, setTab] = useState(0);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from server
  const fetchProducts = async () => {
    const response = await axios.get("https://localhost:7051/api/Product");
    setSellerProducts(response.data);
  };

  // Handle text and number input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submit (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      // Edit mode
      try {
        const response = await axios.put(
          `https://localhost:7051/api/Product/${editId}`,
          {
            title: form.title,
            price: form.price,
            quantity: form.quantity,
            description: form.description,
            category: form.category,
            imageUrl: form.image,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setSuccess("Product updated successfully!");
        fetchProducts(); // Refresh product list
      } catch (err) {
        setSuccess("Failed to update product!");
      }
    } else {
      // Add mode
      try {
        const response = await axios.post(
          "https://localhost:7051/api/Product",
          {
            title: form.title,
            price: form.price,
            quantity: form.quantity,
            description: form.description,
            category: form.category,
            imageUrl: form.image, // assuming form.image is the URL or base64
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setSuccess("Product added successfully!");
        fetchProducts(); // Refresh product list
      } catch (err) {
        setSuccess("Failed to add product!");
      }
    }
    setForm({ title: "", price: "", description: "", image: "", category: "", quantity: "" });
    setImageFile(null);
    setEditId(null);
    setTimeout(() => setSuccess(""), 2000);
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      quantity: product.quantity,
    });
    setEditId(product.id);
    setTab(1); // Switch to Add/Edit tab
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7051/api/Product/${id}`);
      setSuccess("Product deleted successfully!");
      fetchProducts(); // Refresh product list
    } catch (err) {
      setSuccess("Failed to delete product!");
    }
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="80vh" gap={4} sx={{ background: "#f7f7f7", py: 4 }}>
      <Paper elevation={4} sx={{ width: 600, mb: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Dashboard" />
          <Tab label={editId ? "Edit Product" : "Add Product"} />
        </Tabs>
        {tab === 0 && (
          <Box p={3}>
            <Typography variant="h5" mb={2}>Seller Dashboard</Typography>
            {sellerProducts.length === 0 ? (
              <Typography color="text.secondary">No products added yet.</Typography>
            ) : (
              <Box display="flex" flexDirection="column" gap={2}>
                {sellerProducts.map((product) => (
                  <Paper key={product.id} elevation={2} sx={{ p: 2, mb: 2 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        variant="rounded"
                        src={product.image}
                        alt={product.title}
                        sx={{ width: 64, height: 64, bgcolor: "#eee" }}
                      />
                      <Box flex={1}>
                        <Typography fontWeight="bold">{product.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${product.price} | Qty: {product.quantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.category}
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(product)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        )}
        {tab === 1 && (
          <Box p={3}>
            <Typography variant="h6" mb={2}>{editId ? "Edit Product" : "Add Seller Product"}</Typography>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Title" name="title" margin="normal" value={form.title} onChange={handleChange} />
              <TextField fullWidth label="Price" name="price" type="number" margin="normal" value={form.price} onChange={handleChange} />
              <TextField fullWidth label="Quantity" name="quantity" type="number" margin="normal" value={form.quantity} onChange={handleChange} />
              <TextField fullWidth label="Description" name="description" margin="normal" value={form.description} onChange={handleChange} />
              <TextField fullWidth label="Category" name="category" margin="normal" value={form.category} onChange={handleChange} />
              <Box display="flex" alignItems="center" gap={2} mt={2}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton component="label">
                          <CloudUploadIcon />
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageUpload}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {form.image && (
                  <Avatar
                    variant="rounded"
                    src={form.image}
                    alt="preview"
                    sx={{ width: 48, height: 48, border: "1px solid #eee" }}
                  />
                )}
              </Box>
              <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
                {editId ? "Update Product" : "Add Product"}
              </Button>
              {editId && (
                <Button
                  fullWidth
                  variant="text"
                  color="secondary"
                  sx={{ mt: 1 }}
                  onClick={() => {
                    setEditId(null);
                    setForm({ title: "", price: "", description: "", image: "", category: "", quantity: "" });
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </form>
            {success && <Typography color="success.main" mt={2}>{success}</Typography>}
          </Box>
        )}
      </Paper>
    </Box>
  );
}