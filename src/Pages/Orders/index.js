import { Avatar, Button, Form, Input, InputNumber, Modal, Rate, Space, Table, Typography, message } from "antd";
import { useState } from "react";
import { useData } from "../../context/DataContext";
import "../../App.css";

function Orders() {
  const { orders, loading, addOrder } = useData();
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
      const newOrder = {
        key: orders.length + 1,
        id: orders.length + 1,
        title: values.title,
        price: values.price,
        discountedPrice: values.discountedPrice,
        quantity: values.quantity,
        total: values.quantity * (values.discountedPrice || values.price),
      };

      addOrder(newOrder);
      message.success('Order წარმატებით დაემატა!');
      setIsModalOpen(false);
      form.resetFields();
    }).catch((error) => {
      console.log('Validation Failed:', error);
    });
  };

  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={4}>შეკვეთა</Typography.Title>
        <Button type="primary" onClick={showModal}>
          ახალი შეკვეთის დამატება
        </Button>
      </div>

      <Table
        loading={loading}
        dataSource={orders}
        columns={[
          {
            title: "დასახელება",
            dataIndex: "title",
          },
          {
            title: "ფასი",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "ფასდაკლება",
            dataIndex: "discountedPrice",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "რაოდენობა",
            dataIndex: "quantity",
          },
          {
            title: "ჯამი",
            dataIndex: "total",
            render: (value) => <span>${value}</span>,
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />

      <Modal
        title="ახალი Order-ის დამატება"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="დამატება"
        cancelText="გაუქმება"
      >
        <Form
          form={form}
          layout="vertical"
          name="addOrderForm"
        >
          <Form.Item
            name="title"
            label="დასახელება"
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ დასახელება!' }]}
          >
            <Input placeholder="პროდუქტის დასახელება" />
          </Form.Item>

          <Form.Item
            name="price"
            label="ფასი"
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ფასი!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              prefix="$"
              placeholder="0.00"
            />
          </Form.Item>

          <Form.Item
            name="discountedPrice"
            label="ფასდაკლებული ფასი"
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ფასდაკლებული ფასი!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              prefix="$"
              placeholder="0.00"
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="რაოდენობა"
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ რაოდენობა!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              placeholder="1"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}
export default Orders;