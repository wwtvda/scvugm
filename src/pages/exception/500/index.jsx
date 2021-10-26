import { Link } from 'umi';
import { Result, Button } from 'antd';
export default () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle="Galat pada jaringan"
    extra={
      <Link to="/">
        <Button type="primary">Kembali ke Halaman awal</Button>
      </Link>
    }
  />
);
