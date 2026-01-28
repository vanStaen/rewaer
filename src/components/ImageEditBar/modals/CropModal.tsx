import React, { useState } from "react";
import { Modal, Form, Input, Button, Row, Col } from "antd";
import { CropValues } from "../types/cropTypes";

interface CropModalProps {
  visible: boolean;
  onCropSubmit: (cropValues: CropValues) => void;
  onCancel: () => void;
}

export const CropModal: React.FC<CropModalProps> = ({
  visible,
  onCropSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      onCropSubmit({
        left: Number(values.left),
        top: Number(values.top),
        width: Number(values.width),
        height: Number(values.height),
      });
      form.resetFields();
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title="Crop Image"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Crop
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          left: 50,
          top: 50,
          width: 400,
          height: 300,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Left (px)"
              name="left"
              rules={[
                { required: true, message: "Please enter left position" },
                { pattern: /^\d+$/, message: "Must be a positive number" },
              ]}
            >
              <Input placeholder="e.g., 50" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Top (px)"
              name="top"
              rules={[
                { required: true, message: "Please enter top position" },
                { pattern: /^\d+$/, message: "Must be a positive number" },
              ]}
            >
              <Input placeholder="e.g., 50" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Width (px)"
              name="width"
              rules={[
                { required: true, message: "Please enter width" },
                { pattern: /^\d+$/, message: "Must be a positive number" },
              ]}
            >
              <Input placeholder="e.g., 400" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Height (px)"
              name="height"
              rules={[
                { required: true, message: "Please enter height" },
                { pattern: /^\d+$/, message: "Must be a positive number" },
              ]}
            >
              <Input placeholder="e.g., 300" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
