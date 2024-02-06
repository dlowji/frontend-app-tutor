import React from 'react';
import { Typography, Form, Input, Button } from 'antd';
import TextEditor from '../components/text-editor/TextEditor';

const FormItem = Form.Item;

export default function SendEmailPage() {
	const [form] = Form.useForm();
	const handleFormSubmit = (values) => {
		console.log('🚀 ~ handleFormSubmit ~ values:', values);
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '12px',
			}}
		>
			<div
				style={{
					margin: 'auto',
					width: '50%',
				}}
			>
				<Typography.Title level={3}>Send an email</Typography.Title>
				<Form
					name="email-form"
					form={form}
					layout="vertical"
					autoComplete="off"
					onFinish={handleFormSubmit}
				>
					<FormItem
						label="Title"
						name="title"
						rules={[
							{
								required: true,
								message: 'Please enter title',
							},
						]}
					>
						<Input placeholder="Enter title" />
					</FormItem>
					<FormItem
						label="Content"
						name="Body"
						rules={[
							{
								required: true,
								message: 'Please enter content',
							},
						]}
					>
						<TextEditor />
					</FormItem>

					<FormItem
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Button
							type="primary"
							htmlType="submit"
							style={{
								width: '300px',
							}}
						>
							Send
						</Button>
					</FormItem>
				</Form>
			</div>
		</div>
	);
}
