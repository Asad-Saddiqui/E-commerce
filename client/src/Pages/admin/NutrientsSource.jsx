import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';

const { Title } = Typography;

const NutrientsSource = () => {
    const [data, setData] = useState([]);
    const pro = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Jammu and Kashmir'];

    useEffect(() => {
        // Fetch data from the API
        fetch(process.env.REACT_APP_API_BASE_URL+'/api/all')
            .then(response => response.json())
            .then(result => {
                setData(result.data);
                console.log({ result });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Helper function to get the price for a given province
    const getPriceByProvince = (prices, provinceName) => {
        const priceEntry = prices.find(price => price.province === provinceName);
        return priceEntry ? priceEntry.price : '-';
    };

    // Columns configuration for Ant Design Table
    const columns = [
        {
            title: 'Source Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Nutrient Name',
            dataIndex: 'nid',
            key: 'nid',
        },
        ...pro.map(province => ({
            title: province,
            key: province,
            render: (_, record) => getPriceByProvince(record.price, province),
        })),
    ];

    return (
        <div>
            <Title level={2}>Nutrients Source</Title>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
                bordered
            />
        </div>
    );
};

export default NutrientsSource;
