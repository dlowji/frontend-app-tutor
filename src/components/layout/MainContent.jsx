import React, { useCallback, useEffect, useState } from 'react';
import { Popconfirm, Form, Space, Table, Button } from 'antd';
import { EditableCell } from './table/EditableCell';
import { useMounted } from '../../hooks/useMounted';
import { getEditableTableData } from '../../api/table.api';

const initialPagination = {
	current: 1,
	pageSize: 4,
};

export default function MainContent() {
	const [form] = Form.useForm();
	const [tableData, setTableData] = useState({
		data: [],
		pagination: initialPagination,
		loading: false,
	});
	const [editingKey, setEditingKey] = useState(0);
	const { isMounted } = useMounted();

	const fetch = useCallback(
		(pagination) => {
			setTableData((tableData) => ({ ...tableData, loading: true }));
			getEditableTableData(pagination).then((res) => {
				if (isMounted.current) {
					setTableData({ data: res.data, pagination: res.pagination, loading: false });
				}
			});
		},
		[isMounted]
	);

	useEffect(() => {
		fetch(initialPagination);
	}, [fetch]);

	const handleTableChange = (pagination) => {
		fetch(pagination);
		cancel();
	};

	const isEditing = (record) => record.key === editingKey;

	const edit = (record) => {
		form.setFieldsValue({ name: '', age: '', address: '', ...record });
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey(0);
	};

	const save = async (key) => {
		try {
			const row = await form.validateFields();

			const newData = [...tableData.data];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
			} else {
				newData.push(row);
			}
			setTableData({ ...tableData, data: newData });
			setEditingKey(0);
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const handleDeleteRow = (rowId) => {
		setTableData({ ...tableData, data: tableData.data.filter((item) => item.key !== rowId) });
	};

	const columns = [
		{
			title: 'name',
			dataIndex: 'name',
			width: '25%',
			editable: true,
		},
		{
			title: 'age',
			dataIndex: 'age',
			width: '15%',
			editable: true,
		},
		{
			title: 'address',
			dataIndex: 'address',
			width: '30%',
			editable: true,
		},
		{
			title: 'actions',
			dataIndex: 'actions',
			width: '15%',
			render: (text, record) => {
				const editable = isEditing(record);
				return (
					<Space>
						{editable ? (
							<>
								<Button type="primary" onClick={() => save(record.key)}>
									{'save'}
								</Button>
								<Popconfirm title={'Cancel info'} onConfirm={cancel}>
									<Button ghost type="primary">
										{'cancel'}
									</Button>
								</Popconfirm>
							</>
						) : (
							<>
								<Button
									ghost
									type="primary"
									disabled={editingKey !== 0}
									onClick={() => edit(record)}
								>
									{'edit'}
								</Button>
								<Popconfirm
									title={'Delete this row?'}
									onConfirm={() => handleDeleteRow(record.key)}
								>
									<Button type="default" danger>
										{'delete'}
									</Button>
								</Popconfirm>
							</>
						)}
					</Space>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === 'age' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	return (
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				bordered
				dataSource={tableData.data}
				columns={mergedColumns}
				rowClassName="editable-row"
				pagination={{
					...tableData.pagination,
					onChange: cancel,
				}}
				onChange={handleTableChange}
				loading={tableData.loading}
				scroll={{ x: 800 }}
			/>
		</Form>
	);
}
