import React, { useEffect, useState } from 'react';
import { Col, Divider, Row, Select, Alert, Spin } from 'antd';
import './Nutrients.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function Nutrients() {
    const [provinces, setProvinces] = useState([]);
    const [nutrients, setNutrients] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [error, setError] = useState(null); // State for error messages
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [showProvinceNutrents, setshowProvinceNutrents] = useState(false); // State for loading indicator
    const Navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            setError(null); // Clear previous errors

            try {
                // Fetch provinces
                const provincesResponse = await fetch(process.env.REACT_APP_API_BASE_URL+'/api/provience', {
                    method: "GET"
                });
                if (!provincesResponse.ok) {
                    throw new Error('Failed to fetch provinces');
                }
                const provincesData = await provincesResponse.json();
                console.log('Provinces Data:', provincesData);

                if (provincesData.status === 200) {
                    setProvinces(provincesData.data);
                } else {
                    throw new Error(provincesData.message || 'Failed to fetch provinces');
                }

                // Fetch nutrients
                const nutrientsResponse = await fetch(process.env.REACT_APP_API_BASE_URL+'/api/nutrient', {
                    method: "GET"
                });
                if (!nutrientsResponse.ok) {
                    throw new Error('Failed to fetch nutrients');
                }
                console.log({ nutrientsResponse })
                const nutrientsData = await nutrientsResponse.json();
                if (nutrientsData.status === 200) {
                    setNutrients(nutrientsData.data);
                } else {
                    throw new Error(nutrientsData.message || 'Failed to fetch nutrients');
                }

            } catch (error) {
                console.error("There was an error fetching the data!", error);
                setError(error.message); // Set error message to state
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);

    const handleProvinceChange = value => {
        setSelectedProvince(value);
    };
    const handleChange = (name) => {
        console.log({ provinces, selectedProvince })
        const pro = provinces.filter((item, i) => item.name === selectedProvince);
        // console.log({ pro })
        if (pro[0]?._id) {
            Navigate(`/province-Nutrients/${pro[0]?._id}/${name}`)
        }
    }

    return (
        <div>
            <h1 className="nutrients-heading">Nutritional Information</h1>
            <div className="select-container">
                <Select
                    placeholder="Select Province"
                    showSearch
                    style={{ minWidth: "30%" }}
                    onChange={handleProvinceChange}
                    loading={loading} // Show loading state in the select
                >
                    {provinces.map(province => (
                        <Select.Option key={province._id} value={province.name}>
                            {province.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <Divider />
            {loading && <Spin size="large" />} {/* Show a loading spinner */}
            {error && <Alert message="Error" description={error} type="error" showIcon />} {/* Show error message */}
            {!loading && !error && (
                <Row gutter={[16, 16]}>
                    {nutrients.map(nutrient => (
                        <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={6}
                            xl={6}
                            xxl={6}
                            key={nutrient._id}

                        >
                            <div
                                className="nutrient-col"
                                onClick={() => handleChange(nutrient._id)}
                                style={{ height: "100px" }}> <div className="nutrient-text">{nutrient.name}</div></div>

                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default Nutrients;
