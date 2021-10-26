import { Link } from 'umi';
import { Result, Button } from 'antd';
export default () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle="Mohon maaf, Halaman yang anda cari tidak tersedia."
    extra={
      <Link to="/">
        <Button type="primary">Kembali ke halaman awal</Button>
      </Link>
    }
  />
);
