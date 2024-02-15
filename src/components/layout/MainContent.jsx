import React, { useCallback, useEffect, useState } from "react";
import { Popconfirm, Form, Space, Table, Button } from "antd";
import { EditableCell } from "./table/EditableCell";
import { useMounted } from "../../hooks/useMounted";
import { getAllAccounts } from "../../api/table.api";
import { useSelector } from "react-redux";
import api from "../../api/resource.api";
import {
  fetchAuthenticatedUser,
  getAuthenticatedHttpClient,
  getAuthenticatedUser,
  hydrateAuthenticatedUser,
  ensureAuthenticatedUser,
  getAuthService,
} from "@edx/frontend-platform/auth";

const initialPagination = {
  current: 1,
  pageSize: 4,
};

export default function MainContent() {
  ensureAuthenticatedUser();
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { isMounted } = useMounted();
  // const fetch = useCallback(
  //   async (pagination) => {
  //     setTableData((tableData) => ({ ...tableData, loading: true }));
  //     if (auth?.accessToken) {
  //       const response = await api.get("/courses/v1/courses/");
  //       console.log("🚀 ~ api:", api.getUri());
  //       const data = response.data;
  //       console.log("🚀 ~ data:", data);
  //       if (Array.isArray(data?.results)) {
  //         if (isMounted.current) {
  //           const results = data.results.map((item) => {
  //             return {
  //               key: item.id,
  //               name: item.name,
  //               start_display: item.start_display,
  //               image: item.media.banner_image.uri_absolute,
  //               hidden: item.hidden,
  //             };
  //           });
  //           setTableData({
  //             data: results,
  //             pagination: {
  //               ...pagination,
  //               ...data?.pagination,
  //             },
  //             loading: false,
  //           });
  //         }
  //       }
  //     } else {
  //       setTableData((tableData) => ({ ...tableData, loading: false }));
  //     }
  //   },
  //   [isMounted, auth?.accessToken]
  // );

  // useEffect(() => {
  //   fetch(initialPagination);
  // }, [fetch]);

  useEffect(async () => {
    const authenticatedUser = await fetchAuthenticatedUser(); // validates and decodes JWT token
    console.log("🚀 ~ useEffect ~ authenticatedUser:", authenticatedUser);

    await getAuthenticatedHttpClient()
      .get(`http://local.edly.io/api/courses/v1/courses/`)
      .then((data) => console.log(data));
  }, []);

  // const handleTableChange = (pagination) => {
  //   fetch(pagination);
  // };

  // const isEditing = (record) => record.key === editingKey;

  // const edit = (record) => {
  // 	form.setFieldsValue({ name: '', age: '', address: '', ...record });
  // 	setEditingKey(record.key);
  // };

  // const save = async (key) => {
  // 	try {
  // 		const row = await form.validateFields();

  // 		const newData = [...tableData.data];
  // 		const index = newData.findIndex((item) => key === item.key);
  // 		if (index > -1) {
  // 			const item = newData[index];
  // 			newData.splice(index, 1, {
  //   console.log("🚀 ~ useEffect ~ response:", response);
  // 				...item,
  // 				...row,
  // 			});
  // 		} else {
  // 			newData.push(row);
  // 		}
  // 		setTableData({ ...tableData, data: newData });
  // 		setEditingKey(0);
  // 	} catch (errInfo) {
  // 		console.log('Validate Failed:', errInfo);
  // 	}
  // };

  // const handleDeleteRow = (rowId) => {
  // 	setTableData({ ...tableData, data: tableData.data.filter((item) => item.key !== rowId) });
  // };
  // const handleShowMember = async (courseId) => {
  //   const response = await api.get(`/courses/v1/courses/${courseId}/`);
  //   const data = response.data?.overview ?? null;
  //   console.log("🚀 ~ handleShowMember ~ data:", data);
  // };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Start Time",
      dataIndex: "start_display",
      width: "15%",
    },
    {
      title: "Banner image",
      dataIndex: "image",
      width: "25%",
      render: (value) => {
        return (
          <img
            src={value}
            alt="banner"
            style={{
              objectFit: "cover",
              width: "150px",
              aspectRatio: "16/9",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        );
      },
    },
    {
      title: "Hidden",
      dataIndex: "hidden",
      width: "15%",
      render: function (value) {
        return value ? "Yes" : "No";
      },
    },
    {
      title: "Actions",
      width: "20%",
      render: (text, record) => {
        return (
          <Space>
            <Button type="primary" onClick={() => handleShowMember(record.key)}>
              Show members
            </Button>
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
        inputType: col.dataIndex === "age" ? "number" : "text",
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
        }}
        // onChange={handleTableChange}
        loading={tableData.loading}
        scroll={{ x: 800 }}
      />
    </Form>
  );
}
