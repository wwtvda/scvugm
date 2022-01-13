import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from './service';

/**
 * Add Node
 *
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('Menambahkan data');

  try {
    await addRule({ ...fields });
    hide();
    message.success('Data berhasil ditambahkan');
    return true;
  } catch (error) {
    hide();
    message.error('Data gagal ditambahkan, silahkan coba lagi');
    return false;
  }
};
/**
 * Update Node
 *
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('Merubah data');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Data berhasil diubah');
    return true;
  } catch (error) {
    hide();
    message.error('Data gagal diubah, silahkan coba lagi');
    return false;
  }
};
/**
 * Delete node
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('Menghapus data');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Data berhasil dihapus');
    return true;
  } catch (error) {
    hide();
    message.error('Data gagal dihapus, silahkan coba lagi');
    return false;
  }
};

const TableList = () => {
  /** New Window Popup */
  const [createModalVisible, handleModalVisible] = useState(false);
  /** Popup for distribution update window */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /** Configuration */

  const columns = [
    {
      title: 'Nama Pasien',
      dataIndex: 'name',
      sorter: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'NIK',
      dataIndex: 'idnumber',
      valueType: 'number',
    },
    {
      title: 'Nomor Telepon',
      dataIndex: 'callNo',
      hideInForm: true,
      renderText: (val) => `${val}万`,
    },
    {
      title: 'Jenis Kelamin',
      dataIndex: 'jk',
      valueEnum: {
        0: {
          text: 'Laki-laki',
          status: 'male',
        },
        1: {
          text: 'Perempuan',
          status: 'Female',
        },
      },
    },
    {
      title: 'Status Epidemiologi',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: 'Suspek',
          status: 'Suspek',
        },
        1: {
          text: 'Probable',
          status: 'Probable',
        },
        2: {
          text: 'Konfirmasi',
          status: 'Konfirmasi',
        },
        3: {
          text: 'Kontak Erat',
          status: 'Kontak Erat',
        },
        4: {
          text: 'Pelaku Perjalanan',
          status: 'Pelaku Perjalanan',
        },
        5: {
          text: 'Discarded',
          status: 'Discarded',
        },
        6: {
          text: 'Selesai Isolasi',
          status: 'Selesai Isolasi',
        },
        7: {
          text: 'Meninggal',
          status: 'Meninggak',
        }
      },
    },
    {
      title: 'Tanggal Onset',
      sorter: true,
      dataIndex: 'onsetDate',
      valueType: 'date',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: 'Konfigurasi',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          Edit data
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          订阅警报
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="Data Pasien Positif Covid-19"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> Tambah Pasien
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="新建规则"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={1000}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
