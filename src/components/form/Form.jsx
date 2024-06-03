import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function CreateCoinForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        ticker: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = () => {
        e.preventDefault();
        // Handle form submission
        console.log('Form Data:', formData);
    };

    const handleNavHome = () => {
        navigate('/');
    }

    return (
        <div className='flex flex-col min-h-screen space-y-20'>
            <div className='ml-5 mt-4'>
                <button className='p-2 bg-blue-800 rounded-md' onClick={handleNavHome}>
                    Go back
                </button>
            </div>
            <div className='justify-center items-center'>
                <form onSubmit={handleSubmit} className="  create-coin-form">
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ticker">ticker</label>
                        <input
                            type="text"
                            id="ticker"
                            name="ticker"
                            value={formData.ticker}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                        //required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Create Coin
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateCoinForm;
