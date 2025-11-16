import { Avatar, Button, Form, Input, Modal, Rate, Space, Table, Typography, message } from "antd";
import { useState } from "react";
import { useData } from "../../context/DataContext";

function Customers() {
  const { customers, loading, addCustomer } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newCustomer = {
        id: customers.length + 1,
        image: values.image || 'https://via.placeholder.com/150',
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        address: {
          address: values.address,
          city: values.city,
        },
      };

      addCustomer(newCustomer);
      message.success('მომხმარებელი წარმატებით დაემატა!');
      setIsModalOpen(false);
      form.resetFields();
    }).catch((error) => {
      console.log('Validation Failed:', error);
    });
  };

  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={4}>მომხმარებელი</Typography.Title>
        <Button type="primary" onClick={showModal}>
          ახალი მომხმარებლის დამატება
        </Button>
      </div>

      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "First Name",
            dataIndex: "firstName",
          },
          {
            title: "LastName",
            dataIndex: "lastName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "address",
            dataIndex: "address",
            render: (address) => {
              return (
                <span>
                  {address.address}, {address.city}
                </span>
              );
            },
          },
        ]}
        dataSource={customers}
        pagination={{
          pageSize: 5,
        }}
      />

      <Modal
        title="ახალი მომხმარებლის დამატება"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="დამატება"
        cancelText="გაუქმება"
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          name="addCustomerForm"
        >
          <Form.Item
            name="image"
            label="ფოტო URL"
          >
            <Input placeholder="https://example.com/photo.jpg" />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="სახელი"
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ სახელი!' }]}
          >
            <Input placeholder="სახელი" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="გვარი"
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ გვარი!' }]}
          >
            <Input placeholder="გვარი" />
          </Form.Item>

          <Form.Item
            name="email"
            label="ელ-ფოსტა"
            rules={[
              { required: true, message: 'გთხოვთ შეიყვანოთ ელ-ფოსტა!' },
              { type: 'email', message: 'გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა!' }
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="ტელეფონი"
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ტელეფონი!' }]}
          >
            <Input placeholder="+995 555 123 456" />
          </Form.Item>

          <Form.Item
            name="address"
            label="მისამართი"
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ მისამართი!' }]}
          >
            <Input placeholder="ქუჩა, სახლის ნომერი" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}
export default Customers;