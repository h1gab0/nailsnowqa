import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const SetupContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const UserSetup = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [instanceDetails, setInstanceDetails] = useState({ id: username, name: '', phoneNumber: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInstanceDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateInstance = async (e) => {
        e.preventDefault();
        if (!instanceDetails.name || !instanceDetails.phoneNumber) {
            alert('Please provide an instance name and a phone number.');
            return;
        }
        try {
            const response = await fetch('/api/instances', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(instanceDetails),
                credentials: 'include'
            });
            if (response.ok) {
                const createdInstance = await response.json();
                alert(`Instance "${createdInstance.name}" created successfully!`);
                navigate(`/${username}`);
            } else {
                const errorData = await response.json();
                alert(`Failed to create instance: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Failed to create instance", error);
            alert('An error occurred while creating the instance.');
        }
    };

    return (
        <SetupContainer>
            <Title>Setup Your Instance</Title>
            <Form onSubmit={handleCreateInstance}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Instance Name (e.g., Jane's Nail Salon)"
                    value={instanceDetails.name}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="id"
                    placeholder="Instance URL ID"
                    value={instanceDetails.id}
                    disabled
                />
                <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Your Phone Number (e.g., +1234567890)"
                    value={instanceDetails.phoneNumber}
                    onChange={handleInputChange}
                />
                <Button type="submit">Create Instance</Button>
            </Form>
        </SetupContainer>
    );
};

export default UserSetup;
