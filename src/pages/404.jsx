import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Mohon maaf, Halaman yang anda cari tidak tersedia."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Kembali
      </Button>
    }
  />
);

export default NoFoundPage;
