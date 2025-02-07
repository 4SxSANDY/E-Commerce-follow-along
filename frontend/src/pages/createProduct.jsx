import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";

const CreateProduct = () => {
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    // const [imageUrl, setImageUrl] = useState(""); 
    const [email, setEmail] = useState("");


    const categoriesData = [
        { title: "Electronics" },
        { title: "Fashions" },
        { title: "Books" },
        { title: "Home Appliance" },
    ];

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(imagePreviews);
    };

    useEffect(() => {
        return () => {
            previewImages.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previewImages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!images.length) {
            alert("Please select at least one image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("category", category);
        formData.append("tags", tags);

        images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            const response = await axios.post("http://localhost:8000/api/products/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Success:", response.data);
            alert("Product created successfully!");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("Failed to create product.");
        }
    };

    return (
        <div className="w-[90%] max-w-[500px] bg-white shadow h-auto rounded-[4px] p-4 mx-auto">
            <h5 className="text-[24px] font-semibold text-center">Create Product</h5>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label className="pb-1 block">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        className="w-full p-2 border rounded"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label className="pb-1 block">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        className="w-full p-2 border rounded"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="pb-1 block">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={description}
                        className="w-full p-2 border rounded"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="mt-4">
                    <label className="pb-1 block">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full p-2 border rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Choose a category</option>
                        {categoriesData.map((i) => (
                            <option value={i.title} key={i.title}>
                                {i.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label className="pb-1 block">Tags</label>
                    <input
                        type="text"
                        value={tags}
                        className="w-full p-2 border rounded"
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter product tags"
                    />
                </div>
                <div className="mt-4">
                    <label className="pb-1 block">
                        Price <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        value={price}
                        className="w-full p-2 border rounded"
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="pb-1 block">
                        Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        value={stock}
                        className="w-full p-2 border rounded"
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Enter stock quantity"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="pb-1 block">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        id="upload"
                        className="hidden"
                        multiple
                        onChange={handleImageChange} 
                        required
                    />
                    <label htmlFor="upload" className="cursor-pointer">
                        <AiOutlinePlusCircle size={30} color="#555" />
                    </label>
                    <div className="flex flex-wrap mt-2">
                        {previewImages.map((img, index) => ( 
                            <img
                                src={img}
                                key={index}
                                alt="Preview"
                                className="w-[100px] h-[100px] object-cover m-2"
                            />
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;